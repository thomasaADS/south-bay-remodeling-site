import assert from "node:assert/strict";
import test from "node:test";
import { consultationEmail, readEmailConfig, sendConsultationEmail } from "../lib/consultation-email";
import { emptyConsultation } from "../lib/consultation";

const env = { CONSULTATION_EMAIL_PROVIDER: "resend", RESEND_API_KEY: "re_local_test_only", CONSULTATION_FROM_EMAIL: "inquiries@notify.formadpb.com" };
const requestId = "3f1c9677-0ce9-4c82-b4bb-141c1c5fb079";
const providerId = "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794";
const data = { ...emptyConsultation, projectTypes: ["Kitchen remodeling"], city: "San Jose", zip: "95112", planningStage: "Exploring ideas", timeline: "Flexible / exploring", budget: "Not sure yet", name: "Local Test", email: "visitor@example.com", phone: "", description: "<script>not html</script>", consent: true };

test("configuration is explicit, constrained and unavailable until operator setup", () => {
  for (const missing of [{}, { ...env, CONSULTATION_EMAIL_PROVIDER: undefined }, { ...env, CONSULTATION_EMAIL_PROVIDER: "formsubmit" }, { ...env, RESEND_API_KEY: "" }, { ...env, CONSULTATION_FROM_EMAIL: "" }])
    assert.equal(readEmailConfig(missing), "configuration_missing");
  for (const from of ["onboarding@resend.dev", "visitor@example.com", "a@formadpb.com.evil.test", "FORMA <a@formadpb.com>", "a@-bad.formadpb.com", "a@.formadpb.com", "a@formadpb.com\nBcc:x@example.com"])
    assert.equal(readEmailConfig({ ...env, CONSULTATION_FROM_EMAIL: from }), "configuration_invalid");
  for (const key of ["not_a_key", "re_key\nsecret", "re_" + "x".repeat(512)])
    assert.equal(readEmailConfig({ ...env, RESEND_API_KEY: key }), "configuration_invalid");
  assert.deepEqual(readEmailConfig(env), { apiKey: env.RESEND_API_KEY, from: "FORMA Website <inquiries@notify.formadpb.com>" });
});

test("email payload is deterministic, plaintext, complete and fixed-recipient", () => {
  const payload = consultationEmail(data, requestId, "FORMA Website <inquiries@notify.formadpb.com>");
  assert.deepEqual(payload.to, ["Office@formadpb.com"]);
  assert.equal(payload.reply_to, data.email);
  assert.equal(payload.subject, "New FORMA project inquiry");
  assert.equal("html" in payload, false);
  for (const value of [data.name, data.email, data.city, data.zip, data.planningStage, data.timeline, data.budget, data.description, requestId, "Phone: Not provided", "Preferred contact: Email", "Contact permission: Confirmed"])
    assert.ok(payload.text.includes(value));
  assert.equal(JSON.stringify(payload), JSON.stringify(consultationEmail({ ...data }, requestId, payload.from)));
});

test("Resend adapter sends once and validates provider acknowledgements", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalTimeout = AbortSignal.timeout;
  let calls = 0;
  try {
    globalThis.fetch = async () => { calls++; throw new Error("Unexpected fetch"); };
    await t.test("no network when configuration is missing or invalid", async () => {
      assert.equal((await sendConsultationEmail(data, requestId, {})).status, "unavailable");
      assert.equal((await sendConsultationEmail(data, requestId, { ...env, RESEND_API_KEY: "bad" })).status, "unavailable");
      assert.equal(calls, 0);
    });
    await t.test("unchanged attempts have identical provider key and body", async () => {
      const requests: Array<{ key: string | null; body: string }> = [];
      globalThis.fetch = async (url, init) => {
        calls++;
        assert.equal(url, "https://api.resend.com/emails");
        assert.equal(init?.method, "POST");
        assert.equal(init?.redirect, "error");
        assert.equal(init?.cache, "no-store");
        assert.equal(new Headers(init?.headers).get("Authorization"), `Bearer ${env.RESEND_API_KEY}`);
        requests.push({ key: new Headers(init?.headers).get("Idempotency-Key"), body: String(init?.body) });
        return Response.json({ id: providerId });
      };
      assert.deepEqual(await sendConsultationEmail(data, requestId, env), { status: "accepted", upstreamStatus: 200, providerId });
      await sendConsultationEmail({ ...data }, requestId, env);
      assert.deepEqual(requests[0], requests[1]);
      assert.equal(requests[0].key, `forma-consultation/${requestId}`);
    });
    await t.test("unfamiliar acknowledgements never become success", async () => {
      for (const payload of [null, [], {}, { success: true }, { id: "private@example.com" }, { id: providerId, error: "private" }, { id: providerId, name: "error" }]) {
        globalThis.fetch = async () => Response.json(payload);
        const result = await sendConsultationEmail(data, requestId, env);
        assert.equal(result.status, "unconfirmed");
        assert.equal(result.errorType, "invalid_response");
        assert.equal(result.providerId, undefined);
      }
    });
    await t.test("HTTP errors are fixed categories with no automatic retry or fallback", async () => {
      for (const [status, outcome, category] of [[400, "unavailable", "provider_validation"], [401, "unavailable", "provider_auth"], [403, "unavailable", "provider_auth"], [422, "unavailable", "provider_validation"], [429, "unavailable", "provider_rate_limit"], [409, "unconfirmed", "idempotency_conflict"], [500, "unconfirmed", "provider_unavailable"], [404, "unconfirmed", "upstream_http"]] as const) {
        globalThis.fetch = async () => { calls++; return Response.json({ id: providerId, name: "secret", message: "visitor@example.com" }, { status }); };
        const before = calls;
        assert.deepEqual(await sendConsultationEmail(data, requestId, env), { status: outcome, upstreamStatus: status, errorType: category });
        assert.equal(calls, before + 1);
      }
    });
    await t.test("empty, HTML, malformed, oversized and endless empty responses are bounded", async () => {
      for (const body of [null, "", "<html>403</html>", "{", "x".repeat(16_385)]) {
        globalThis.fetch = async () => new Response(body);
        assert.equal((await sendConsultationEmail(data, requestId, env)).errorType, "invalid_response");
      }
      let cancelled = false;
      globalThis.fetch = async () => new Response(new ReadableStream({ pull(controller) { controller.enqueue(new Uint8Array()); }, cancel() { cancelled = true; } }));
      assert.equal((await sendConsultationEmail(data, requestId, env)).errorType, "invalid_response");
      assert.equal(cancelled, true);
    });
    await t.test("non-JSON and stalled error bodies keep their HTTP category without parsing", async () => {
      for (const body of [null, "<html>private@example.com</html>", "{"]) {
        globalThis.fetch = async () => new Response(body, { status: 403 });
        assert.deepEqual(await sendConsultationEmail(data, requestId, env), { status: "unavailable", upstreamStatus: 403, errorType: "provider_auth" });
      }
      let cancelled = false;
      globalThis.fetch = async () => new Response(new ReadableStream({ cancel() { cancelled = true; return new Promise(() => undefined); } }), { status: 429 });
      assert.equal((await sendConsultationEmail(data, requestId, env)).errorType, "provider_rate_limit");
      assert.equal(cancelled, true);
    });
    await t.test("split response chunks decode before acknowledgement validation", async () => {
      const body = JSON.stringify({ id: providerId });
      globalThis.fetch = async () => new Response(new ReadableStream({ start(controller) { controller.enqueue(Buffer.from(body.slice(0, 12))); controller.enqueue(Buffer.from(body.slice(12))); controller.close(); } }));
      assert.equal((await sendConsultationEmail(data, requestId, env)).status, "accepted");
    });
    await t.test("the existing deadline covers stalled body reads", async () => {
      const controller = new AbortController();
      AbortSignal.timeout = (ms) => { assert.equal(ms, 10_000); return controller.signal; };
      let cancelled = false;
      globalThis.fetch = async () => new Response(new ReadableStream({ pull() { controller.abort(); }, cancel() { cancelled = true; } }));
      assert.deepEqual(await sendConsultationEmail(data, requestId, env), { status: "unconfirmed", upstreamStatus: 200, errorType: "timeout" });
      assert.equal(cancelled, true);
      AbortSignal.timeout = originalTimeout;
    });
    await t.test("transport errors never expose exception text or imply non-delivery", async () => {
      globalThis.fetch = async () => { throw new Error("PRIVATE_TOKEN visitor@example.com"); };
      assert.deepEqual(await sendConsultationEmail(data, requestId, env), { status: "unconfirmed", upstreamStatus: null, errorType: "transport" });
    });
  } finally {
    globalThis.fetch = originalFetch;
    AbortSignal.timeout = originalTimeout;
  }
});
