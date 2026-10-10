export const deliveryMessages = {
  unavailable:
    "Email sending is temporarily unavailable. Your answers are still here. Please contact FORMA.",
  unconfirmed:
    "We couldn’t confirm email delivery. Your request may already have reached FORMA. Your answers are still here; please contact FORMA before submitting again to avoid a duplicate.",
} as const;

export type ConsultationAttempt = { requestId: string; body: string };

// In-memory only. A deliberate retry of identical answers retains its key;
// changed answers form a new attempt. Resend deduplicates for 24 hours, not
// forever. No automatic retry, browser storage, or cross-reload guarantee.
export function consultationAttempt(
  previous: ConsultationAttempt | null,
  data: unknown,
  createId: () => string = () => crypto.randomUUID(),
): ConsultationAttempt {
  const body = JSON.stringify(data);
  return previous?.body === body ? previous : { requestId: createId(), body };
}

export type SubmissionResult =
  | { status: "accepted" }
  | { status: "unavailable" | "unconfirmed"; message: string }
  | { status: "invalid"; message: string };

// Kept separate from the component so transport and malformed-response paths
// can be tested without sending a real inquiry.
export async function sendConsultation(
  data: unknown,
  requestId: string,
): Promise<SubmissionResult> {
  try {
    const response = await fetch("/api/consultation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": requestId,
      },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(20_000),
    });
    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload))
      return { status: "unconfirmed", message: deliveryMessages.unconfirmed };
    const result = payload as Record<string, unknown>;
    if (
      response.ok &&
      result.status === "accepted" &&
      result.accepted === true
    )
      return { status: "accepted" };
    if (response.status === 503 && result.status === "unavailable")
      return {
        status: "unavailable",
        message: deliveryMessages.unavailable,
      };
    // Only our own pre-forward validation responses are safe to edit/retry.
    if (
      [400, 403, 413, 415, 422].includes(response.status) &&
      result.status === "invalid" &&
      typeof result.error === "string"
    )
      return { status: "invalid", message: result.error };
  } catch {
    // A transport or response-body failure cannot prove non-delivery.
  }
  return { status: "unconfirmed", message: deliveryMessages.unconfirmed };
}
