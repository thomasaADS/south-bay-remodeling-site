import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../app/api/consultation/route";
import {
  emptyConsultation,
  parseConsultation,
  validateConsultation,
} from "../lib/consultation";
import {
  classifyFormSubmit,
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

test("submission rejects unsafe requests and confirms only accepted delivery", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  const originalInfo = console.info;
  const logs: Array<Record<string, unknown>> = [];
  console.warn = console.info = (entry) => logs.push(entry);
  let called = 0;
  globalThis.fetch = async () => {
    called++;
    throw new Error("Unexpected external request");
  };
  try {
    await t.test("cross-origin request rejected", async () =>
      assert.equal(
        (await POST(request(valid, { origin: "https://other.example" })))
          .status,
        403,
      ),
    );
    await t.test("missing origin rejected", async () => {
      const req = request();
      req.headers.delete("origin");
      assert.equal((await POST(req)).status, 403);
    });
    await t.test("malformed JSON rejected", async () =>
      assert.equal((await POST(request("{"))).status, 400),
    );
    await t.test("unknown project type rejected", async () =>
      assert.equal(
        (await POST(request({ ...valid, projectTypes: ["Invalid"] }))).status,
        422,
      ),
    );
    await t.test("honeypot never reports success", async () =>
      assert.equal(
        (await POST(request({ ...valid, website: "spam" }))).status,
        400,
      ),
    );
    await t.test(
      "oversize stream rejected even without content-length",
      async () =>
        assert.equal(
          (await POST(request({ ...valid, description: "x".repeat(13000) })))
            .status,
          413,
        ),
    );
    await t.test("missing idempotency key rejected", async () =>
      assert.equal(
        (await POST(request(valid, { "idempotency-key": "" }))).status,
        400,
      ),
    );
    assert.equal(called, 0);
    assert.equal(logs.length, 0);
    await t.test("receiver failure produces no success", async () => {
      globalThis.fetch = async () => new Response(null, { status: 500 });
      const response = await POST(request());
      assert.equal(response.status, 502);
      assert.deepEqual(await response.json(), {
        status: "unconfirmed",
        accepted: false,
        requestId: id,
        error: deliveryMessages.unconfirmed,
      });
      assert.equal(logs.at(-1)?.errorType, "upstream_http");
      assert.equal(logs.at(-1)?.upstreamStatus, 500);
    });
    await t.test(
      "timeout or transport failure produces no success",
      async () => {
        globalThis.fetch = async () => {
          throw new DOMException("Timeout", "TimeoutError");
        };
        assert.equal((await POST(request())).status, 502);
        assert.equal(logs.at(-1)?.errorType, "timeout");
      },
    );
    await t.test(
      "accepted receiver gets sanitized fields and retry key",
      async () => {
        globalThis.fetch = async (url, init) => {
          assert.equal(url, "https://formsubmit.co/ajax/Office@formadpb.com");
          const headers = new Headers(init?.headers);
          assert.equal(headers.get("Idempotency-Key"), id);
          assert.equal(headers.get("Accept"), "application/json");
          assert.equal(init?.redirect, "error");
          const payload = JSON.parse(String(init?.body));
          assert.equal(payload.requestId, id);
          assert.equal(payload.propertyCity, "San Jose");
          assert.equal(payload.website, undefined);
          assert.equal(payload.unexpected, undefined);
          assert.equal(payload.projectTypes, valid.projectTypes.join(", "));
          assert.equal(payload.contactPermission, "Confirmed");
          assert.equal(payload._template, "table");
          return Response.json({ success: "true", message: "The form was submitted successfully." });
        };
        const response = await POST(
          request({ ...valid, city: " San Jose ", unexpected: "discard me" }),
        );
        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), { status: "accepted", accepted: true, requestId: id });
        assert.equal(response.headers.get("cache-control"), "no-store");
        assert.equal(logs.at(-1)?.status, "accepted");
      },
    );
    await t.test("boolean success is accepted", async () => {
      globalThis.fetch = async () => Response.json({ success: true });
      assert.equal((await POST(request())).status, 200);
    });
    await t.test("activation takes priority over a success flag", async () => {
      for (const success of [true, "true", false, "false"]) {
        globalThis.fetch = async () => Response.json({ success, message: "This form needs Activation." });
        const response = await POST(request());
        assert.equal(response.status, 503);
        assert.equal((await response.json()).status, "activation_required");
      }
    });
    await t.test("false, missing and malformed success never confirm acceptance", async () => {
      for (const payload of [{ success: false }, { success: "false" }, {}, null, [], "true", { success: 1 }, { success: "TRUE" }]) {
        globalThis.fetch = async () => Response.json(payload);
        const response = await POST(request());
        assert.equal(response.status, 502);
        assert.equal((await response.json()).accepted, false);
      }
    });
    await t.test("empty, malformed and HTML responses remain unconfirmed", async () => {
      for (const body of [null, "", "{", "<html>upstream error</html>"]) {
        globalThis.fetch = async () => new Response(body, { status: 202 });
        assert.equal((await POST(request())).status, 502);
        assert.equal(logs.at(-1)?.errorType, "invalid_json");
      }
    });
    await t.test("non-2xx cannot override status with success true", async () => {
      globalThis.fetch = async () => Response.json({ success: true }, { status: 429 });
      assert.equal((await POST(request())).status, 502);
      assert.equal(logs.at(-1)?.upstreamStatus, 429);
    });
    await t.test("403 diagnostics remain private and never change the delivery outcome", async () => {
      globalThis.fetch = async () => new Response("<title>Access denied</title>visitor@example.com Private Name token=secret", { status: 403, headers: { "content-type": "text/html", server: "cloudflare", "cf-ray": "private-ray" } });
      const response = await POST(request());
      assert.equal(response.status, 502);
      assert.equal((await response.json()).status, "unconfirmed");
      assert.equal(logs.at(-1)?.upstreamStatus, 403);
      assert.equal(logs.at(-1)?.errorType, "upstream_http");
      const diagnostic = logs.at(-1)?.upstreamDiagnostic as { hints: string[] };
      assert.deepEqual(diagnostic.hints, ["cloudflare_marker", "access_denied_marker"]);
      for (const value of ["visitor@example.com", "Private Name", "secret", "private-ray"]) assert.equal(JSON.stringify(logs.at(-1)).includes(value), false);
    });
    await t.test("a stalled rejection body preserves HTTP403 and the upstream_http category", async () => {
      const originalTimeout = AbortSignal.timeout;
      const controller = new AbortController();
      AbortSignal.timeout = () => controller.signal;
      let cancelled = false;
      globalThis.fetch = async () => {
        const stream = new ReadableStream({ pull() { controller.abort(); }, cancel() { cancelled = true; } });
        return new Response(stream, { status: 403 });
      };
      try {
        assert.equal((await POST(request())).status, 502);
        assert.equal(logs.at(-1)?.upstreamStatus, 403);
        assert.equal(logs.at(-1)?.errorType, "upstream_http");
        assert.equal((logs.at(-1)?.upstreamDiagnostic as { bodyRead: string }).bodyRead, "timeout");
        assert.equal(cancelled, true);
      } finally { AbortSignal.timeout = originalTimeout; }
    });
    await t.test("response-body timeout is unconfirmed", async () => {
      globalThis.fetch = async () => {
        const response = Response.json({ success: true });
        response.json = async () => { throw new DOMException("Private details", "TimeoutError"); };
        return response;
      };
      assert.equal((await POST(request())).status, 502);
      assert.equal(logs.at(-1)?.errorType, "timeout");
      assert.equal(logs.at(-1)?.upstreamStatus, 200);
    });
    await t.test("AbortError during body reading is classified by the timeout signal", async () => {
      const originalTimeout = AbortSignal.timeout;
      const controller = new AbortController();
      AbortSignal.timeout = (milliseconds) => {
        assert.equal(milliseconds, 10_000);
        return controller.signal;
      };
      try {
        globalThis.fetch = async () => {
          const response = Response.json({ success: true });
          response.json = async () => {
            controller.abort(new DOMException("Private timeout detail", "TimeoutError"));
            throw new DOMException("The operation was aborted", "AbortError");
          };
          return response;
        };
        assert.equal((await POST(request())).status, 502);
        assert.equal(logs.at(-1)?.errorType, "timeout");
        assert.equal(logs.at(-1)?.upstreamStatus, 200);
      } finally {
        AbortSignal.timeout = originalTimeout;
      }
    });
    await t.test("raw exception and provider message never enter logs", async () => {
      globalThis.fetch = async () => { throw new Error("Private details visitor@example.com"); };
      await POST(request());
      assert.equal(logs.at(-1)?.errorType, "transport");
      for (const log of logs) {
        assert.deepEqual(Object.keys(log).sort(), ["event", "requestId", "status", "upstreamStatus", "elapsedMs", ...(log.errorType ? ["errorType"] : []), ...(log.upstreamDiagnostic ? ["upstreamDiagnostic"] : [])].sort());
        assert.equal(log.requestId, id);
        assert.equal(typeof log.elapsedMs, "number");
        assert.ok(Number(log.elapsedMs) >= 0);
      }
      const serialized = JSON.stringify(logs);
      for (const privateValue of [valid.email, valid.name, valid.city, "Private details", "This form needs", "submitted successfully"])
        assert.equal(serialized.includes(privateValue), false);
    });
  } finally {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
    console.info = originalInfo;
  }
});

test("provider classifier distinguishes activation, acceptance and unknown", () => {
  assert.equal(classifyFormSubmit({ success: true }), "accepted");
  assert.equal(classifyFormSubmit({ success: "true" }), "accepted");
  assert.equal(classifyFormSubmit({ success: "true", message: "Please confirm your email." }), "activation_required");
  assert.equal(classifyFormSubmit({ success: true, message: "Email verification required." }), "activation_required");
  assert.equal(classifyFormSubmit({ success: true, message: "Please verify your email address." }), "activation_required");
  assert.equal(classifyFormSubmit({ success: "true", message: "Your email is not verified." }), "activation_required");
  assert.equal(classifyFormSubmit({ success: true, message: "Your email address has not been verified." }), "activation_required");
  assert.equal(classifyFormSubmit({ success: true, message: "Your email is verified. The form was submitted successfully." }), "accepted");
  for (const payload of [null, [], true, "true", {}, { success: false }, { success: "false" }])
    assert.equal(classifyFormSubmit(payload), "unconfirmed");
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
    await t.test("activation remains pending", async () => {
      globalThis.fetch = async () => Response.json({ status: "activation_required", accepted: false }, { status: 503 });
      assert.deepEqual(await sendConsultation(valid, id), { status: "activation_required", message: deliveryMessages.activation_required });
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
