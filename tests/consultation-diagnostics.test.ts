import assert from "node:assert/strict";
import test from "node:test";
import { DIAGNOSTIC_BYTE_LIMIT, inspectUpstreamFailure } from "../lib/consultation-diagnostics";

const signal = () => new AbortController().signal;
const inspect = (body: string, type = "text/html", headers = {}) =>
  inspectUpstreamFailure(new Response(body, { status: 403, headers: { "content-type": type, ...headers } }), signal());

test("fixed diagnostic markers identify recognized provider error patterns", async () => {
  const cases = [
    ["<title>Just a moment...</title><script src='/cdn-cgi/challenge-platform/x'></script>", ["cloudflare_marker", "challenge_marker"]],
    ["CAPTCHA verification failed", ["captcha_marker"]],
    ["Please activate your form", ["activation_marker"]],
    ["Invalid email address", ["validation_marker"]],
    ["<title>403 Forbidden</title>Access denied", ["access_denied_marker"]],
    ["Too many requests", ["rate_limit_marker"]],
    ["Origin is not allowed", ["origin_marker"]],
    ["Your email is verified. Thank you.", []],
  ] as const;
  for (const [body, hints] of cases) {
    const result = await inspect(body);
    assert.deepEqual(result.hints, hints);
    assert.equal(result.bodyRead, "complete");
    assert.equal(result.inspectedBytes, Buffer.byteLength(body));
  }
});

test("Cloudflare presence is separate from challenge evidence; header values never leak", async () => {
  const result = await inspect("Ordinary page", "text/html", { server: "cloudflare", "cf-ray": "private-identifier", "set-cookie": "token=secret" });
  assert.deepEqual(result.hints, ["cloudflare_marker"]);
  assert.equal(JSON.stringify(result).includes("private-identifier"), false);
  assert.equal(JSON.stringify(result).includes("secret"), false);
  const challenge = await inspect("", "text/html", { "cf-mitigated": "challenge" });
  assert.deepEqual(challenge.hints, ["challenge_marker"]);
});

test("JSON inspection reads only top-level error/message strings without returning them", async () => {
  const result = await inspect(JSON.stringify({ message: "Invalid email address visitor@example.com", email: "secret@example.com", nested: { message: "Too many requests" }, name: "Access denied" }), "application/problem+json");
  assert.equal(result.responseFormat, "json");
  assert.deepEqual(result.hints, ["validation_marker"]);
  assert.equal(JSON.stringify(result).includes("@"), false);
  for (const body of ["{", "null", "[]", '"Access denied"', '{"lead":{"message":"Access denied"}}'])
    assert.deepEqual((await inspect(body, "application/json")).hints, []);
});

test("response format is an enum and arbitrary provider content never becomes output", async () => {
  const privateBody = "visitor@example.com +1-408-555-0100 SECRET_API_TOKEN Private Name\nFAKE_LOG_EVENT";
  for (const [type, format] of [["text/plain; charset=utf-8", "text"], ["application/octet-stream", "other"], ["text/html; charset=utf-8", "html"]]) {
    const result = await inspect(privateBody, type);
    assert.equal(result.responseFormat, format);
    assert.deepEqual(Object.keys(result).sort(), ["responseFormat", "bodyRead", "inspectedBytes", "hints"].sort());
    assert.deepEqual(result.hints, []);
    for (const value of privateBody.split(/\s+/)) assert.equal(JSON.stringify(result).includes(value), false);
  }
  const response = new Response(null, { status: 403 });
  assert.deepEqual(await inspectUpstreamFailure(response, signal()), { responseFormat: "absent", bodyRead: "unavailable", inspectedBytes: 0, hints: [] });
});

test("exactly capped and oversized bodies stay bounded regardless of content-length", async () => {
  for (const length of [DIAGNOSTIC_BYTE_LIMIT, DIAGNOSTIC_BYTE_LIMIT * 5]) {
    const result = await inspect("x".repeat(length) + " Access denied", "text/html", { "content-length": "1" });
    assert.equal(result.bodyRead, "cap_reached");
    assert.equal(result.inspectedBytes, DIAGNOSTIC_BYTE_LIMIT);
    assert.deepEqual(result.hints, []);
  }
  const exact = await inspect("x".repeat(DIAGNOSTIC_BYTE_LIMIT));
  assert.equal(exact.bodyRead, "cap_reached");
});

test("incomplete JSON is not parsed or classified", async () => {
  const result = await inspect('{"message":"Access denied","padding":"' + "x".repeat(DIAGNOSTIC_BYTE_LIMIT) + '"}', "application/json");
  assert.equal(result.bodyRead, "cap_reached");
  assert.deepEqual(result.hints, []);
});

test("split markers and malformed UTF-8 are safe across chunk boundaries", async () => {
  const stream = new ReadableStream<Uint8Array>({ start(controller) {
    controller.enqueue(new Uint8Array([0xff, 0xfe]));
    controller.enqueue(new TextEncoder().encode("Access de"));
    controller.enqueue(new TextEncoder().encode("nied"));
    controller.close();
  } });
  const result = await inspectUpstreamFailure(new Response(stream, { headers: { "content-type": "text/html" } }), signal());
  assert.equal(result.bodyRead, "complete");
  assert.deepEqual(result.hints, ["access_denied_marker"]);
});

test("endless streams stop at the byte cap without awaiting stuck cancellation", async () => {
  let cancelled = false;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) { controller.enqueue(new Uint8Array(1024)); },
    cancel() { cancelled = true; return new Promise(() => undefined); },
  });
  const result = await inspectUpstreamFailure(new Response(stream), signal());
  assert.equal(result.bodyRead, "cap_reached");
  assert.equal(result.inspectedBytes, DIAGNOSTIC_BYTE_LIMIT);
  assert.equal(cancelled, true);
});

test("stalled reads obey the existing deadline, cancel, and return no raw error", async () => {
  const controller = new AbortController();
  let cancelled = false;
  const stream = new ReadableStream<Uint8Array>({ cancel() { cancelled = true; } });
  const timer = setTimeout(() => controller.abort(new Error("visitor@example.com secret")), 10);
  try {
    const result = await inspectUpstreamFailure(new Response(stream), controller.signal);
    assert.equal(result.bodyRead, "timeout");
    assert.equal(result.inspectedBytes, 0);
    assert.equal(cancelled, true);
    assert.deepEqual(result.hints, []);
  } finally { clearTimeout(timer); }
});

test("immediately-ready empty chunks cannot spin forever or starve the deadline", async () => {
  let cancelled = false;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) { controller.enqueue(new Uint8Array()); },
    cancel() { cancelled = true; },
  });
  const result = await inspectUpstreamFailure(new Response(stream), signal());
  assert.equal(result.bodyRead, "read_limit");
  assert.equal(result.inspectedBytes, 0);
  assert.equal(cancelled, true);
});

test("already aborted and failed readers remain diagnostic-only outcomes", async () => {
  const controller = new AbortController();
  controller.abort();
  assert.equal((await inspectUpstreamFailure(new Response(new ReadableStream()), controller.signal)).bodyRead, "timeout");
  const readyBody = await inspectUpstreamFailure(new Response("Access denied"), controller.signal);
  assert.equal(readyBody.bodyRead, "timeout");
  assert.equal(readyBody.inspectedBytes, 0);
  assert.deepEqual(readyBody.hints, []);
  const stream = new ReadableStream({ start(controller) { controller.error(new Error("Private details")); } });
  const result = await inspectUpstreamFailure(new Response(stream), signal());
  assert.equal(result.bodyRead, "read_error");
  assert.equal(JSON.stringify(result).includes("Private"), false);
});
