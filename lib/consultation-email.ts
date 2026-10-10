import type { Consultation } from "./consultation";
import { isEmailAddress } from "./consultation";

// Server-only: imported by the route, never by a client component.
const ENDPOINT = "https://api.resend.com/emails";
export const CONSULTATION_RECIPIENT = "Office@formadpb.com";
const UUID = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i;
const RESPONSE_LIMIT = 16_384;

type EmailConfig = { apiKey: string; from: string };
type ErrorType =
  | "configuration_missing" | "configuration_invalid" | "provider_auth"
  | "provider_validation" | "provider_rate_limit" | "idempotency_conflict"
  | "provider_unavailable" | "upstream_http" | "invalid_response"
  | "timeout" | "transport";
export type EmailResult = {
  status: "accepted" | "unavailable" | "unconfirmed";
  upstreamStatus: number | null;
  errorType?: ErrorType;
  providerId?: string;
};

export function readEmailConfig(env: Record<string, string | undefined>): EmailConfig | ErrorType {
  if (env.CONSULTATION_EMAIL_PROVIDER !== "resend" || !env.RESEND_API_KEY || !env.CONSULTATION_FROM_EMAIL)
    return "configuration_missing";
  const apiKey = env.RESEND_API_KEY;
  const from = env.CONSULTATION_FROM_EMAIL;
  const domain = from.split("@")[1]?.toLowerCase();
  if (
    !/^re_[A-Za-z0-9_-]+$/.test(apiKey) || apiKey.length > 512 ||
    !isEmailAddress(from) ||
    !(domain === "formadpb.com" || domain?.endsWith(".formadpb.com")) ||
    !domain?.split(".").every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))
  ) return "configuration_invalid";
  // Syntax/ownership restriction is local; Resend enforces actual verification.
  return { apiKey, from: `FORMA Website <${from}>` };
}

export function consultationEmail(data: Consultation, requestId: string, from: string) {
  return {
    from,
    to: [CONSULTATION_RECIPIENT],
    reply_to: data.email,
    subject: "New FORMA project inquiry",
    text: [
      "New project consultation request from formadpb.com",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Preferred contact: ${data.contactMethod}`,
      `Project types: ${data.projectTypes.join(", ")}`,
      `Property city: ${data.city}`,
      `ZIP: ${data.zip || "Not provided"}`,
      `Planning stage: ${data.planningStage}`,
      `Desired start: ${data.timeline}`,
      `Investment range: ${data.budget}`,
      `Project notes: ${data.description || "Not provided"}`,
      `Contact permission: ${data.consent ? "Confirmed" : "Not confirmed"}`,
      `Request reference: ${requestId}`,
    ].join("\n"),
  };
}

async function readJson(response: Response, signal: AbortSignal): Promise<unknown> {
  if (!response.body) throw new SyntaxError("Empty response");
  const reader = response.body.getReader();
  let onAbort: (() => void) | undefined;
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    signal.throwIfAborted();
    const aborted = new Promise<never>((_, reject) => {
      onAbort = () => reject(new DOMException("Deadline", "TimeoutError"));
      signal.addEventListener("abort", onAbort, { once: true });
    });
    for (let reads = 0; reads < 1024; reads++) {
      signal.throwIfAborted();
      const { value, done } = await Promise.race([reader.read(), aborted]);
      signal.throwIfAborted();
      if (done) return JSON.parse(Buffer.concat(chunks).toString("utf8"));
      bytes += value.byteLength;
      if (bytes > RESPONSE_LIMIT) throw new SyntaxError("Response exceeds limit");
      chunks.push(value);
    }
    throw new SyntaxError("Response read limit");
  } finally {
    if (onAbort) signal.removeEventListener("abort", onAbort);
    void reader.cancel().catch(() => undefined);
  }
}

export async function sendConsultationEmail(
  data: Consultation,
  requestId: string,
  env: Record<string, string | undefined> = process.env,
): Promise<EmailResult> {
  const config = readEmailConfig(env);
  if (typeof config === "string")
    return { status: "unavailable", upstreamStatus: null, errorType: config };
  const signal = AbortSignal.timeout(10_000);
  let upstreamStatus: number | null = null;
  try {
    // Exactly one attempt. No automatic retry and no FormSubmit fallback.
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Idempotency-Key": `forma-consultation/${requestId}`,
      },
      body: JSON.stringify(consultationEmail(data, requestId, config.from)),
      signal,
      redirect: "error",
      cache: "no-store",
    });
    upstreamStatus = response.status;
    if (!response.ok) {
      // Error bodies are not needed and may contain private details.
      void response.body?.cancel().catch(() => undefined);
      // Only fixed categories leave this module. Never return error messages or
      // arbitrary provider codes, which could contain addresses or other data.
      if (response.status === 409)
        return { status: "unconfirmed", upstreamStatus, errorType: "idempotency_conflict" };
      if (response.status === 429)
        return { status: "unavailable", upstreamStatus, errorType: "provider_rate_limit" };
      if (response.status === 401 || response.status === 403)
        return { status: "unavailable", upstreamStatus, errorType: "provider_auth" };
      if (response.status === 400 || response.status === 422)
        return { status: "unavailable", upstreamStatus, errorType: "provider_validation" };
      return { status: "unconfirmed", upstreamStatus, errorType: response.status >= 500 ? "provider_unavailable" : "upstream_http" };
    }
    const payload = await readJson(response, signal);
    const record = payload && typeof payload === "object" && !Array.isArray(payload)
      ? payload as Record<string, unknown> : {};
    return typeof record.id === "string" && UUID.test(record.id) && !record.error && !record.name
      ? { status: "accepted", upstreamStatus, providerId: record.id }
      : { status: "unconfirmed", upstreamStatus, errorType: "invalid_response" };
  } catch (error) {
    return {
      status: "unconfirmed",
      upstreamStatus,
      errorType: signal.aborted || (error instanceof Error && ["TimeoutError", "AbortError"].includes(error.name))
        ? "timeout" : error instanceof SyntaxError ? "invalid_response" : "transport",
    };
  }
}
