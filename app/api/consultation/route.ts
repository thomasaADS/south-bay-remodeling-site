import { parseConsultation, validateConsultation } from "@/lib/consultation";
import {
  classifyFormSubmit,
  deliveryMessages,
  type DeliveryStatus,
} from "@/lib/consultation-delivery";

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

  const { website: _website, ...lead } = data;
  void _website;
  const started = performance.now();
  const upstreamTimeout = AbortSignal.timeout(10_000);
  let upstreamStatus: number | null = null;
  const finish = (status: DeliveryStatus, errorType?: string) => {
    // Never log lead fields, provider bodies/messages, or raw exceptions.
    const diagnostic = {
      event: "consultation_delivery",
      requestId,
      status,
      upstreamStatus,
      elapsedMs: Math.round(performance.now() - started),
      ...(errorType ? { errorType } : {}),
    };
    if (status === "accepted") console.info(diagnostic);
    else console.warn(diagnostic);
    return status === "accepted"
      ? reply({ status, accepted: true, requestId }, 200)
      : reply(
          { status, accepted: false, error: deliveryMessages[status], requestId },
          status === "activation_required" ? 503 : 502,
        );
  };
  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/Office@formadpb.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Idempotency-Key": requestId,
        },
        body: JSON.stringify({
          _subject: `New FORMA project inquiry — ${lead.city}`,
          _template: "table",
          _url: "https://formadpb.com/#consultation",
          name: lead.name,
          email: lead.email,
          phone: lead.phone || "Not provided",
          preferredContact: lead.contactMethod,
          projectTypes: lead.projectTypes.join(", "),
          propertyCity: lead.city,
          zipCode: lead.zip || "Not provided",
          planningStage: lead.planningStage,
          desiredStart: lead.timeline,
          investmentRange: lead.budget,
          projectNotes: lead.description || "Not provided",
          contactPermission: lead.consent ? "Confirmed" : "Not confirmed",
          requestId,
        }),
        redirect: "error",
        signal: upstreamTimeout,
        cache: "no-store",
      },
    );
    upstreamStatus = response.status;
    if (!response.ok) return finish("unconfirmed", "upstream_http");
    const payload: unknown = await response.json();
    const status = classifyFormSubmit(payload);
    return finish(status, status === "unconfirmed" ? "upstream_response" : undefined);
  } catch (error) {
    const errorType =
      (upstreamTimeout.aborted && upstreamTimeout.reason?.name === "TimeoutError") ||
      (error instanceof Error && error.name === "TimeoutError")
        ? "timeout"
        : error instanceof SyntaxError
          ? "invalid_json"
          : "transport";
    return finish("unconfirmed", errorType);
  }
}
