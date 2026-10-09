// Optional local browser regression check. Requires Playwright and Chromium.
// Start the local app first. All non-local requests are blocked, and the
// consultation endpoint is always mocked; no inquiries or analytics are sent.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");

const baseURL = process.env.FORMA_TEST_BASE_URL || "http://127.0.0.1:3100";
const origin = new URL(baseURL).origin;
if (!["localhost", "127.0.0.1", "[::1]"].includes(new URL(origin).hostname))
  throw new Error("This test only supports a local mocked app.");
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
let mode = "unknown";
let attempts = 0;
const keys = [];
const consoleErrors = [];
page.on("pageerror", (error) => consoleErrors.push(error.message));
await page.route("**/*", async (route) => {
  const url = new URL(route.request().url());
  if (url.origin !== origin) return route.abort();
  if (url.pathname !== "/api/consultation") return route.continue();
  attempts++;
  keys.push(route.request().headers()["idempotency-key"]);
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (mode === "html")
    return route.fulfill({ status: 502, contentType: "text/html", body: "<h1>Unavailable</h1>" });
  const bodies = {
    unknown: { status: "unconfirmed", accepted: false },
    activation: { status: "activation_required", accepted: false },
    success: { status: "accepted", accepted: true },
  };
  return route.fulfill({
    status: mode === "success" ? 200 : mode === "activation" ? 503 : 502,
    contentType: "application/json",
    body: JSON.stringify(bodies[mode]),
  });
});

const form = page.locator("form.consultation-form");
const advance = () => form.getByRole("button", { name: "Continue", exact: true }).click();
async function completeForm() {
  await page.goto(baseURL);
  await form.getByLabel("Kitchen remodeling", { exact: true }).check();
  await form.getByLabel("Property city").fill("San Jose");
  await advance();
  await form.getByLabel("Where are you in the process?").selectOption("Not sure yet");
  await form.getByLabel("When would you like construction to begin?").selectOption("Flexible / exploring");
  await form.getByLabel("What investment range do you have in mind?").selectOption("Not sure yet");
  await form.locator("#lead-description").fill("Local automated test only");
  await advance();
  await form.getByLabel("Full name").fill("Local Test Visitor");
  await form.getByLabel("Email address").fill("visitor@example.com");
  await form.locator("#lead-consent").check();
}
const leadEvents = () => page.evaluate(() => (window.dataLayer || []).filter((event) => event.event === "generate_lead").length);
async function duplicateSubmit() {
  await form.evaluate((element) => {
    element.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    element.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
}
try {
  await completeForm();
  await duplicateSubmit();
  await form.getByRole("button", { name: "Check with FORMA before resending" }).waitFor();
  assert.equal(attempts, 1, "same-tick submits must send once");
  assert.equal(await form.getByLabel("Full name").inputValue(), "Local Test Visitor");
  assert.equal(await leadEvents(), 0);
  await form.getByLabel("Full name").fill("Local Edited Visitor");
  assert.equal(await form.getByRole("button", { name: "Check with FORMA before resending" }).isDisabled(), true);
  await form.getByRole("button", { name: "Back", exact: true }).click();
  assert.match(await form.getByRole("alert").innerText(), /may already have reached FORMA/);
  await advance();
  assert.equal(await form.getByLabel("Full name").inputValue(), "Local Edited Visitor");
  await duplicateSubmit();
  assert.equal(attempts, 1, "navigation and edits must not clear hold");
  await form.getByRole("button", { name: "I’ve checked with FORMA; allow another attempt" }).click();
  mode = "success";
  await form.getByRole("button", { name: "Request a consultation", exact: true }).click();
  await page.getByRole("heading", { name: "Your request has been submitted." }).waitFor();
  assert.equal(attempts, 2, "explicit retry can submit");
  assert.notEqual(keys[0], keys[1]);
  assert.equal(await leadEvents(), 1);
  assert.match(await page.locator(".form-success").innerText(), /accepted your request for delivery/);
  console.log("PASS: duplicate click guard, unknown outcome, retained fields, navigation, explicit retry and accepted analytics");

  mode = "activation";
  await completeForm();
  await form.getByRole("button", { name: "Request a consultation", exact: true }).click();
  await form.getByRole("button", { name: "Check with FORMA before resending" }).waitFor();
  assert.match(await form.getByRole("alert").innerText(), /awaiting FORMA’s verification/);
  assert.equal(await leadEvents(), 0);
  console.log("PASS: activation stays pending and generates no lead event");

  mode = "html";
  await completeForm();
  await form.getByRole("button", { name: "Request a consultation", exact: true }).click();
  await form.getByRole("button", { name: "Check with FORMA before resending" }).waitFor();
  assert.equal(await form.getByLabel("Email address").inputValue(), "visitor@example.com");
  assert.equal(await leadEvents(), 0);
  console.log("PASS: malformed response preserves answers and stays unconfirmed");

  mode = "success";
  await completeForm();
  await page.evaluate(() => { window.dataLayer = []; window.dataLayer.push = () => { throw new Error("Analytics unavailable"); }; });
  await form.getByRole("button", { name: "Request a consultation", exact: true }).click();
  await page.getByRole("heading", { name: "Your request has been submitted." }).waitFor();
  console.log("PASS: analytics failure cannot turn acceptance into failed submission");
  assert.deepEqual(consoleErrors, []);
} finally {
  await browser.close();
}
