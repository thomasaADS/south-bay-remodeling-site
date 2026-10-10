import { parseConsultation, validateConsultation } from "@/lib/consultation";
import { sendConsultationEmail } from "@/lib/consultation-email";
import { deliveryMessages } from "@/lib/consultation-delivery";

export const runtime = "nodejs";
const MAX_BYTES = 12_000;
const reply = (body: object, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const invalid = (error: string, status: number, fields?: object) =>
  reply({ status: "invalid", error, ...(fields ? { fields } : {}) }, status);

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    return invalid("Please submit from the FORMA website.", 403);
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return invalid("Expected JSON.", 415);
  if (Number(request.headers.get("content-length")) > MAX_BYTES)
    return invalid("This request is too large.", 413);

  let input: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return invalid("Missing request.", 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        return invalid("This request is too large.", 413);
      }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return invalid("The request could not be read.", 400);
  }
  const data = parseConsultation(input);
  if (!data || data.website)
    return invalid("Please check your request.", 400);
  const errors = validateConsultation(data);
  if (Object.keys(errors).length)
    return invalid("Please check the highlighted fields.", 422, errors);
  const requestId = request.headers.get("idempotency-key") ?? "";
  if (
    !/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(
      requestId,
    )
  )
    return invalid("Please refresh and try again.", 400);

  const started = performance.now();
  const result = await sendConsultationEmail(data, requestId);
  // Fixed categories and opaque request/provider IDs only; never log lead
  // fields, credentials, provider messages, or raw exceptions.
  const diagnostic = {
    event: "consultation_delivery",
    provider: "resend",
    requestId,
    ...result,
    elapsedMs: Math.round(performance.now() - started),
  };
  if (result.status === "accepted") console.info(diagnostic);
  else console.warn(diagnostic);
  if (result.status === "accepted")
    return reply({ status: "accepted", accepted: true, requestId }, 200);
  return reply({
    status: result.status,
    accepted: false,
    error: deliveryMessages[result.status],
    requestId,
  }, result.status === "unavailable" ? 503 : 502);
}
