import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../app/api/consultation/route";
import {
  emptyConsultation,
  parseConsultation,
  validateConsultation,
} from "../lib/consultation";
import {
  consultationAttempt,
  deliveryMessages,
  sendConsultation,
} from "../lib/consultation-delivery";

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
    headers: {
      origin: "https://formadpb.com",
      "content-type": "application/json",
      "idempotency-key": id,
      ...extra,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("form validation accepts uncertainty and requires a phone only when requested", () => {
  assert.deepEqual(validateConsultation(valid), {});
  assert.ok(validateConsultation({ ...valid, contactMethod: "Phone" }).phone);
  assert.deepEqual(
    validateConsultation({
      ...valid,
      contactMethod: "Phone",
      phone: "+1 (408) 555-0100",
    }),
    {},
  );
  assert.ok(validateConsultation({ ...valid, consent: false }).consent);
  assert.ok(
    validateConsultation({ ...valid, projectTypes: ["Unlisted"] }).projectTypes,
  );
  assert.ok(
    validateConsultation({ ...valid, description: "x".repeat(2001) })
      .description,
  );
  assert.deepEqual(validateConsultation({ ...valid, email: "" }, 0), {});
  assert.equal(parseConsultation({ ...valid, consent: "true" }), null);
  assert.equal(parseConsultation({ ...valid, projectTypes: [12] }), null);
});

test("route validates before sending and logs only fixed metadata", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  const originalInfo = console.info;
  const envNames = ["CONSULTATION_EMAIL_PROVIDER", "CONSULTATION_FROM_EMAIL", "RESEND_API_KEY"] as const;
  const saved = Object.fromEntries(envNames.map((key) => [key, process.env[key]]));
  const logs: Array<Record<string, unknown>> = [];
  let calls = 0;
  console.warn = console.info = (entry) => logs.push(entry);
  globalThis.fetch = async () => { calls++; throw new Error("Unexpected external request"); };
  try {
    for (const key of envNames) delete process.env[key];
    await t.test("unsafe requests never reach a provider", async () => {
      for (const [req, status] of [
        [request(valid, { origin: "https://other.example" }), 403],
        [request(valid, { origin: "" }), 403],
        [request(valid, { "content-type": "text/plain" }), 415],
        [request("{"), 400],
        [request({ ...valid, projectTypes: ["Invalid"] }), 422],
        [request({ ...valid, website: "spam" }), 400],
        [request({ ...valid, description: "x".repeat(13000) }), 413],
        [request(valid, { "idempotency-key": "" }), 400],
        [request({ ...valid, email: "<visitor@example.com>" }), 422],
        [request({ ...valid, email: "a@example.com,b@example.com" }), 422],
        [request({ ...valid, email: "visitor@example.com\r\nBcc: other@example.com" }), 422],
        [request({ ...valid, consent: false }), 422],
      ] as const) assert.equal((await POST(req)).status, status);
      assert.equal(calls, 0);
      assert.equal(logs.length, 0);
    });
    await t.test("unconfigured delivery fails clearly without falling back", async () => {
      const response = await POST(request());
      assert.equal(response.status, 503);
      assert.deepEqual(await response.json(), { status: "unavailable", accepted: false, error: deliveryMessages.unavailable, requestId: id });
      assert.equal(calls, 0);
      assert.equal(logs.at(-1)?.errorType, "configuration_missing");
    });
    process.env.CONSULTATION_EMAIL_PROVIDER = "resend";
    process.env.CONSULTATION_FROM_EMAIL = "inquiries@notify.formadpb.com";
    process.env.RESEND_API_KEY = "re_local_test_only";
    await t.test("configured route sends sanitized fields to fixed recipient", async () => {
      globalThis.fetch = async (url, init) => {
        calls++;
        assert.equal(url, "https://api.resend.com/emails");
        const payload = JSON.parse(String(init?.body));
        assert.deepEqual(payload.to, ["Office@formadpb.com"]);
        assert.equal(payload.reply_to, valid.email);
        assert.equal(payload.from, "FORMA Website <inquiries@notify.formadpb.com>");
        assert.equal(payload.html, undefined);
        assert.equal(payload.cc, undefined);
        assert.equal(payload.unexpected, undefined);
        assert.ok(payload.text.includes("Property city: San Jose"));
        assert.equal(new Headers(init?.headers).get("Idempotency-Key"), `forma-consultation/${id}`);
        return Response.json({ id: "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794" });
      };
      const response = await POST(request({ ...valid, city: " San Jose ", to: "attacker@example.com", unexpected: "private" }));
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { status: "accepted", accepted: true, requestId: id });
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.equal(logs.at(-1)?.providerId, "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794");
    });
    await t.test("provider errors stay private and never confirm acceptance", async () => {
      for (const [status, expected] of [[403, 503], [429, 503], [409, 502], [500, 502]]) {
        globalThis.fetch = async () => { calls++; return Response.json({ name: "PRIVATE_TOKEN", message: "visitor@example.com Private details" }, { status }); };
        const before = calls;
        const response = await POST(request());
        assert.equal(response.status, expected);
        assert.equal((await response.json()).accepted, false);
        assert.equal(calls, before + 1, "only one provider attempt");
      }
      globalThis.fetch = async () => { throw new Error("Private details re_local_test_only"); };
      assert.equal((await POST(request())).status, 502);
      assert.equal(logs.at(-1)?.errorType, "transport");
      for (const log of logs) {
        assert.deepEqual(Object.keys(log).sort(), ["event", "provider", "requestId", "status", "upstreamStatus", "elapsedMs", ...(log.errorType ? ["errorType"] : []), ...(log.providerId ? ["providerId"] : [])].sort());
        assert.equal(log.provider, "resend");
        assert.equal(log.requestId, id);
      }
      for (const privateValue of [valid.email, valid.name, valid.city, "Private details", "PRIVATE_TOKEN", "re_local_test_only"])
        assert.equal(JSON.stringify(logs).includes(privateValue), false);
    });
  } finally {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
    console.info = originalInfo;
    for (const key of envNames) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  }
});

test("unchanged explicit retry keeps its idempotency key; edits create a new attempt", () => {
  let generated = 0;
  const makeId = () => `id-${++generated}`;
  const first = consultationAttempt(null, valid, makeId);
  assert.equal(consultationAttempt(first, { ...valid }, makeId), first);
  assert.equal(generated, 1);
  const changed = consultationAttempt(first, { ...valid, name: "Changed" }, makeId);
  assert.notEqual(changed.requestId, first.requestId);
  assert.notEqual(changed.body, first.body);
});

test("client response handling never equates transport or provider ambiguity with delivery", async (t) => {
  const originalFetch = globalThis.fetch;
  try {
    await t.test("only explicit server acceptance succeeds", async () => {
      globalThis.fetch = async (url, init) => {
        assert.equal(url, "/api/consultation");
        assert.equal(new Headers(init?.headers).get("Idempotency-Key"), id);
        assert.deepEqual(JSON.parse(String(init?.body)), valid);
        return Response.json({ status: "accepted", accepted: true });
      };
      assert.deepEqual(await sendConsultation(valid, id), { status: "accepted" });
    });
    await t.test("unavailable service retains answers", async () => {
      globalThis.fetch = async () => Response.json({ status: "unavailable", accepted: false }, { status: 503 });
      assert.deepEqual(await sendConsultation(valid, id), { status: "unavailable", message: deliveryMessages.unavailable });
    });
    await t.test("only pre-forward validation permits an ordinary retry", async () => {
      globalThis.fetch = async () => Response.json({ status: "invalid", error: "Please check your request." }, { status: 422 });
      assert.deepEqual(await sendConsultation(valid, id), { status: "invalid", message: "Please check your request." });
    });
    await t.test("unknown, old-server and non-2xx acceptance are conservative", async () => {
      for (const [payload, status] of [[{}, 200], [null, 200], [{ accepted: true }, 200], [{ status: "accepted", accepted: true }, 502], [{ status: "invalid", error: "retry" }, 500]] as const) {
        globalThis.fetch = async () => Response.json(payload, { status });
        assert.deepEqual(await sendConsultation(valid, id), { status: "unconfirmed", message: deliveryMessages.unconfirmed });
      }
    });
    await t.test("transport, HTML and response-body errors preserve unknown outcome", async () => {
      for (const mock of [
        async () => { throw new DOMException("Timeout", "TimeoutError"); },
        async () => new Response("<html>error</html>", { status: 502 }),
        async () => { const response = Response.json({ accepted: true }); response.json = async () => { throw new Error("body failed"); }; return response; },
      ]) {
        globalThis.fetch = mock;
        assert.deepEqual(await sendConsultation(valid, id), { status: "unconfirmed", message: deliveryMessages.unconfirmed });
      }
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
