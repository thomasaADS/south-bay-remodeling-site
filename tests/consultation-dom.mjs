// Optional component regression check using React + jsdom, with fetch mocked.
// Run with a TypeScript loader (tsx) and jsdom installed. FORMA_JSDOM_PATH can
// point to an isolated jsdom installation, avoiding dependency/lockfile edits.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { JSDOM } = require(process.env.FORMA_JSDOM_PATH || "jsdom");
const dom = new JSDOM('<div id="root"></div>', { url: "https://local-test.invalid" });
for (const key of ["window", "document", "HTMLElement", "HTMLInputElement", "Event", "MouseEvent"])
  globalThis[key] = key === "window" ? dom.window : dom.window[key];
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const { act, createElement } = await import("react");
const { createRoot } = await import("react-dom/client");
const { ConsultationForm } = await import("../app/consultation-form.tsx");
const root = createRoot(document.getElementById("root"));
const originalFetch = globalThis.fetch;
let attempts = 0;
let mode = "unknown";
let release;
const keys = [];
globalThis.fetch = async (url, init) => {
  assert.equal(url, "/api/consultation", "Never send an external request");
  attempts++;
  keys.push(new Headers(init.headers).get("Idempotency-Key"));
  if (mode === "deferred") await new Promise((resolve) => { release = resolve; });
  if (mode === "html") return new Response("<html>error</html>", { status: 502 });
  if (mode === "success") return Response.json({ status: "accepted", accepted: true });
  return Response.json({ status: mode === "activation" ? "activation_required" : "unconfirmed", accepted: false }, { status: 502 });
};
const button = (text) => [...document.querySelectorAll("button")].find((element) => element.textContent === text);
const alertText = () => document.querySelector('[role="alert"]')?.textContent;
async function click(text) {
  const target = button(text);
  assert.ok(target, `Button exists: ${text}`);
  await act(async () => target.click());
}
async function change(id, value) {
  const target = document.getElementById(id);
  assert.ok(target, `Input exists: ${id}`);
  await act(async () => {
    if (target.type === "checkbox") { if (target.checked !== value) target.click(); }
    else {
      const prototype = target.tagName === "SELECT" ? dom.window.HTMLSelectElement.prototype : target.tagName === "TEXTAREA" ? dom.window.HTMLTextAreaElement.prototype : dom.window.HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(prototype, "value").set.call(target, value);
      target.dispatchEvent(new dom.window.Event(target.tagName === "SELECT" ? "change" : "input", { bubbles: true }));
    }
  });
}
async function completeForm() {
  await act(async () => root.render(createElement(ConsultationForm, { key: Math.random() })));
  window.dataLayer = [];
  await change("lead-projectTypes", true);
  await change("lead-city", "San Jose");
  await click("Continue");
  await change("lead-planningStage", "Not sure yet");
  await change("lead-timeline", "Flexible / exploring");
  await change("lead-budget", "Not sure yet");
  await change("lead-description", "Local automated test only");
  await click("Continue");
  await change("lead-name", "Local Test Visitor");
  await change("lead-email", "visitor@example.com");
  await change("lead-consent", true);
}
const events = () => window.dataLayer.filter((event) => event.event === "generate_lead").length;
try {
  await completeForm();
  mode = "deferred";
  await act(async () => {
    const form = document.querySelector("form");
    form.dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true }));
    form.dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true }));
  });
  assert.equal(attempts, 1);
  assert.equal(button("Sending your request…").disabled, true);
  await act(async () => { mode = "unknown"; release(); });
  assert.match(alertText(), /may already have reached FORMA/);
  assert.equal(document.getElementById("lead-name").value, "Local Test Visitor");
  assert.equal(events(), 0);
  document.getElementById("lead-name").focus();
  await change("lead-name", "Local Edited Visitor");
  assert.equal(document.activeElement, document.getElementById("lead-name"), "editing retained answers must not steal input focus");
  assert.equal(button("Check with FORMA before resending").disabled, true);
  await click("Back");
  assert.match(alertText(), /may already have reached FORMA/);
  await click("Continue");
  assert.equal(document.getElementById("lead-name").value, "Local Edited Visitor");
  await act(async () => document.querySelector("form").dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true })));
  assert.equal(attempts, 1, "hold survives edits, navigation and programmatic submit");
  await click("I’ve checked with FORMA; allow another attempt");
  mode = "success";
  await click("Request a consultation");
  assert.equal(attempts, 2);
  assert.notEqual(keys[0], keys[1]);
  assert.match(document.querySelector(".form-success").textContent, /accepted your request for delivery/);
  assert.equal(events(), 1);
  console.log("PASS: repeat-click guard, retained answers, navigation, explicit retry, accepted analytics");

  mode = "activation";
  await completeForm();
  await click("Request a consultation");
  assert.match(alertText(), /awaiting FORMA’s verification/);
  assert.equal(events(), 0);
  console.log("PASS: activation stays pending and produces no lead event");

  mode = "html";
  await completeForm();
  await click("Request a consultation");
  assert.match(alertText(), /couldn’t confirm email delivery/);
  assert.equal(document.getElementById("lead-email").value, "visitor@example.com");
  assert.equal(events(), 0);
  console.log("PASS: malformed response preserves answers and stays unconfirmed");

  mode = "success";
  await completeForm();
  window.dataLayer.push = () => { throw new Error("Analytics unavailable"); };
  await click("Request a consultation");
  assert.ok(document.querySelector(".form-success"));
  console.log("PASS: analytics failure cannot reverse provider acceptance");
} finally {
  globalThis.fetch = originalFetch;
  await act(async () => root.unmount());
  dom.window.close();
}
