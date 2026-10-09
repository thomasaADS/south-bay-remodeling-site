export type DeliveryStatus = "accepted" | "activation_required" | "unconfirmed";

export const deliveryMessages = {
  activation_required:
    "Email delivery is awaiting FORMA’s verification. Your answers are still here. Please contact FORMA to check this request before submitting again.",
  unconfirmed:
    "We couldn’t confirm email delivery. Your request may already have reached FORMA. Your answers are still here; please contact FORMA before submitting again to avoid a duplicate.",
} as const;

// FormSubmit's AJAX examples return JSON, but its public docs do not specify
// a versioned response schema. Accept only explicit success flags, and fail
// closed for empty, malformed or unfamiliar responses. Acceptance is not an
// assertion that the message reached the destination inbox.
export function classifyFormSubmit(payload: unknown): DeliveryStatus {
  if (!payload || typeof payload !== "object" || Array.isArray(payload))
    return "unconfirmed";
  const result = payload as Record<string, unknown>;
  if (
    typeof result.message === "string" &&
    /\b(?:activat(?:e|ion)|verification|(?:confirm|verify) (?:your|the) (?:email|form)|(?:email|form)(?: address)? (?:is |has )?(?:not (?:been )?verified|unverified))\b/i.test(
      result.message,
    )
  )
    return "activation_required";
  return result.success === true || result.success === "true"
    ? "accepted"
    : "unconfirmed";
}

export type SubmissionResult =
  | { status: "accepted" }
  | { status: "activation_required" | "unconfirmed"; message: string }
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
    if (result.status === "activation_required")
      return {
        status: "activation_required",
        message: deliveryMessages.activation_required,
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
