import { parseConsultation, validateConsultation } from "@/lib/consultation";

export const runtime = "nodejs";
const MAX_BYTES = 12_000;
const reply = (body: object, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    return reply({ error: "Please submit from the FORMA website." }, 403);
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return reply({ error: "Expected JSON." }, 415);
  if (Number(request.headers.get("content-length")) > MAX_BYTES)
    return reply({ error: "This request is too large." }, 413);

  let input: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: "Missing request." }, 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        return reply({ error: "This request is too large." }, 413);
      }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply({ error: "The request could not be read." }, 400);
  }
  const data = parseConsultation(input);
  if (!data || data.website)
    return reply({ error: "Please check your request." }, 400);
  const errors = validateConsultation(data);
  if (Object.keys(errors).length)
    return reply(
      { error: "Please check the highlighted fields.", fields: errors },
      422,
    );
  const requestId = request.headers.get("idempotency-key") ?? "";
  if (
    !/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(
      requestId,
    )
  )
    return reply({ error: "Please refresh and try again." }, 400);

  const endpoint = process.env.FORMA_LEADS_WEBHOOK_URL;
  if (!endpoint)
    return reply(
      {
        error: "Online requests are not available yet.",
      },
      503,
    );
  try {
    if (new URL(endpoint).protocol !== "https:")
      return reply(
        { error: "Online requests are temporarily unavailable." },
        503,
      );
  } catch {
    return reply(
      { error: "Online requests are temporarily unavailable." },
      503,
    );
  }

  const { website: _website, ...lead } = data;
  void _website;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": requestId,
        ...(process.env.FORMA_LEADS_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.FORMA_LEADS_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        id: requestId,
        source: "forma-website",
        submittedAt: new Date().toISOString(),
        ...lead,
      }),
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok)
      return reply(
        {
          error:
            "We couldn’t confirm your request. Your answers are still here; please try again or contact us on Instagram.",
        },
        502,
      );
    return reply({ accepted: true }, 200);
  } catch {
    return reply(
      {
        error:
          "We couldn’t confirm your request. Your answers are still here; please try again or contact us on Instagram.",
      },
      502,
    );
  }
}
