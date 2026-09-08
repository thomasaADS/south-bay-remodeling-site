import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../app/api/consultation/route";
import { emptyConsultation, parseConsultation, validateConsultation } from "../lib/consultation";

const valid = {
  ...emptyConsultation,
  projectTypes: ["Kitchen remodeling", "Bathroom remodeling"],
  city: "San Jose",
  zip: "95112",
  planningStage: "Exploring ideas",
  timeline: "Flexible / exploring",
  budget: "Not sure yet",
  name: "Test Visitor",
  email: "visitor@example.com",
  consent: true,
};
const id = "3f1c9677-0ce9-4c82-b4bb-141c1c5fb079";
function request(body: unknown = valid, extra: Record<string, string> = {}) {
  return new Request("https://formadpb.com/api/consultation", {
    method: "POST",
    headers: { origin: "https://formadpb.com", "content-type": "application/json", "idempotency-key": id, ...extra },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("form validation accepts uncertainty and requires a phone only when requested", () => {
  assert.deepEqual(validateConsultation(valid), {});
  assert.ok(validateConsultation({ ...valid, contactMethod: "Phone" }).phone);
  assert.deepEqual(validateConsultation({ ...valid, contactMethod: "Phone", phone: "+1 (408) 555-0100" }), {});
  assert.ok(validateConsultation({ ...valid, consent: false }).consent);
  assert.ok(validateConsultation({ ...valid, projectTypes: ["Unlisted"] }).projectTypes);
  assert.ok(validateConsultation({ ...valid, description: "x".repeat(2001) }).description);
  assert.deepEqual(validateConsultation({ ...valid, email: "" }, 0), {});
  assert.equal(parseConsultation({ ...valid, consent: "true" }), null);
  assert.equal(parseConsultation({ ...valid, projectTypes: [12] }), null);
});

test("submission rejects unsafe requests and confirms only accepted delivery", async t => {
  const originalFetch = globalThis.fetch;
  const originalEndpoint = process.env.FORMA_LEADS_WEBHOOK_URL;
  const originalToken = process.env.FORMA_LEADS_WEBHOOK_TOKEN;
  let called = 0;
  globalThis.fetch = async () => { called++; throw new Error("Unexpected external request"); };
  delete process.env.FORMA_LEADS_WEBHOOK_URL;
  try {
    await t.test("unconfigured receiver fails closed", async () => assert.equal((await POST(request())).status, 503));
    await t.test("cross-origin request rejected", async () => assert.equal((await POST(request(valid, { origin: "https://other.example" }))).status, 403));
    await t.test("missing origin rejected", async () => { const req = request(); req.headers.delete("origin"); assert.equal((await POST(req)).status, 403); });
    await t.test("malformed JSON rejected", async () => assert.equal((await POST(request("{"))).status, 400));
    await t.test("unknown project type rejected", async () => assert.equal((await POST(request({ ...valid, projectTypes: ["Invalid"] }))).status, 422));
    await t.test("honeypot never reports success", async () => assert.equal((await POST(request({ ...valid, website: "spam" }))).status, 400));
    await t.test("oversize stream rejected even without content-length", async () => assert.equal((await POST(request({ ...valid, description: "x".repeat(13000) }))).status, 413));
    await t.test("missing idempotency key rejected", async () => assert.equal((await POST(request(valid, { "idempotency-key": "" }))).status, 400));
    assert.equal(called, 0);
    process.env.FORMA_LEADS_WEBHOOK_URL = "http://receiver.example/lead";
    await t.test("insecure receiver rejected", async () => assert.equal((await POST(request())).status, 503));
    process.env.FORMA_LEADS_WEBHOOK_URL = "https://receiver.example/lead";
    process.env.FORMA_LEADS_WEBHOOK_TOKEN = "test-token";
    await t.test("receiver failure produces no success", async () => {
      globalThis.fetch = async () => new Response(null, { status: 500 });
      const response = await POST(request());
      assert.equal(response.status, 502);
      assert.equal((await response.json()).accepted, undefined);
    });
    await t.test("timeout or transport failure produces no success", async () => {
      globalThis.fetch = async () => { throw new DOMException("Timeout", "TimeoutError"); };
      assert.equal((await POST(request())).status, 502);
    });
    await t.test("accepted receiver gets sanitized fields and retry key", async () => {
      globalThis.fetch = async (url, init) => {
        assert.equal(url, "https://receiver.example/lead");
        const headers = new Headers(init?.headers);
        assert.equal(headers.get("Idempotency-Key"), id);
        assert.equal(headers.get("Authorization"), "Bearer test-token");
        assert.equal(init?.redirect, "error");
        const payload = JSON.parse(String(init?.body));
        assert.equal(payload.id, id);
        assert.equal(payload.city, "San Jose");
        assert.equal(payload.website, undefined);
        assert.equal(payload.unexpected, undefined);
        assert.deepEqual(payload.projectTypes, valid.projectTypes);
        assert.equal(payload.consent, true);
        return new Response(null, { status: 202 });
      };
      const response = await POST(request({ ...valid, city: " San Jose ", unexpected: "discard me" }));
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { accepted: true });
      assert.equal(response.headers.get("cache-control"), "no-store");
    });
  } finally {
    globalThis.fetch = originalFetch;
    if (originalEndpoint === undefined) delete process.env.FORMA_LEADS_WEBHOOK_URL;
    else process.env.FORMA_LEADS_WEBHOOK_URL = originalEndpoint;
    if (originalToken === undefined) delete process.env.FORMA_LEADS_WEBHOOK_TOKEN;
    else process.env.FORMA_LEADS_WEBHOOK_TOKEN = originalToken;
  }
});
