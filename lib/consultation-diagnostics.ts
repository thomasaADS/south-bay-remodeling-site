// Never return provider text, header values, identifiers, or submitted fields.
// These fixed tags are observed markers, not confirmed reasons for rejection.
export const DIAGNOSTIC_BYTE_LIMIT = 16_384;

type Format = "json" | "html" | "text" | "other" | "absent";
type ReadOutcome = "complete" | "cap_reached" | "read_limit" | "timeout" | "read_error" | "unavailable";
type Hint =
  | "cloudflare_marker"
  | "challenge_marker"
  | "captcha_marker"
  | "activation_marker"
  | "validation_marker"
  | "access_denied_marker"
  | "rate_limit_marker"
  | "origin_marker";

export type UpstreamDiagnostic = {
  responseFormat: Format;
  bodyRead: ReadOutcome;
  inspectedBytes: number;
  hints: Hint[];
};

function formatOf(response: Response): Format {
  const type = response.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
  if (!type) return "absent";
  if (type === "application/json" || type.endsWith("+json")) return "json";
  if (type === "text/html" || type === "application/xhtml+xml") return "html";
  return type.startsWith("text/") ? "text" : "other";
}

function bodyHints(text: string, format: Format, complete: boolean): Hint[] {
  // JSON can echo the submitted lead. Inspect only explicit top-level error
  // fields, and only when the entire bounded document was read successfully.
  if (format === "json") {
    if (!complete) return [];
    try {
      const value: unknown = JSON.parse(text);
      if (!value || typeof value !== "object" || Array.isArray(value)) return [];
      const record = value as Record<string, unknown>;
      text = [record.error, record.message].filter((item) => typeof item === "string").join(" ");
    } catch {
      return [];
    }
  } else if (!["html", "text", "absent"].includes(format)) return [];

  const patterns: Array<[Hint, RegExp]> = [
    ["cloudflare_marker", /cloudflare|\/cdn-cgi\//i],
    ["challenge_marker", /cf-chl-|challenge-platform|<title>\s*just a moment|checking your browser|verify (?:that )?you are human/i],
    ["captcha_marker", /g-recaptcha|h-captcha|cf-turnstile|captcha (?:verification )?(?:failed|required|invalid)/i],
    ["activation_marker", /(?:form|email(?: address)?) (?:needs|requires?) activation|(?:activate|confirm|verify) (?:your|the) (?:form|email)|(?:email|form)(?: address)? (?:is |has )?(?:not (?:been )?verified|unverified)/i],
    ["validation_marker", /(?:invalid|missing|required) (?:email(?: address)?|form data|form field|parameter)|(?:email(?: address)?|form data|form field|parameter) (?:is )?(?:invalid|missing|required)/i],
    ["access_denied_marker", /access denied|request (?:has been |was )?blocked|permission denied|<title>\s*(?:403\s*)?forbidden/i],
    ["rate_limit_marker", /too many requests|rate limit(?:ed| exceeded)/i],
    ["origin_marker", /(?:invalid|missing|blocked|disallowed) (?:origin|referer|referrer)|(?:origin|referer|referrer) (?:is )?(?:invalid|missing|not allowed)/i],
  ];
  return patterns.filter(([, pattern]) => pattern.test(text)).map(([hint]) => hint);
}

export async function inspectUpstreamFailure(
  response: Response,
  signal: AbortSignal,
): Promise<UpstreamDiagnostic> {
  const diagnostic: UpstreamDiagnostic = {
    responseFormat: formatOf(response),
    bodyRead: "unavailable",
    inspectedBytes: 0,
    hints: [],
  };
  // Header contents never leave this function. A CDN marker is not a block.
  if (response.headers.get("server")?.toLowerCase() === "cloudflare" || response.headers.has("cf-ray"))
    diagnostic.hints.push("cloudflare_marker");
  if (response.headers.get("cf-mitigated") === "challenge")
    diagnostic.hints.push("challenge_marker");
  if (!response.body) return diagnostic;

  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  let onAbort: (() => void) | undefined;
  const decoder = new TextDecoder();
  let text = "";
  try {
    reader = response.body.getReader();
    signal.throwIfAborted();
    const aborted = new Promise<never>((_, reject) => {
      onAbort = () => reject(new DOMException("Diagnostic deadline", "AbortError"));
      if (signal.aborted) onAbort();
      else signal.addEventListener("abort", onAbort, { once: true });
    });
    // Also bound pathological immediately-ready empty/tiny chunks, which can
    // otherwise starve the timer callback without reaching the byte cap.
    for (let reads = 0; ; reads++) {
      if (reads === 1024) {
        diagnostic.bodyRead = "read_limit";
        break;
      }
      signal.throwIfAborted();
      const { value, done } = await Promise.race([reader.read(), aborted]);
      // A queued chunk can win the race in the same turn as cancellation.
      signal.throwIfAborted();
      if (done) {
        diagnostic.bodyRead = "complete";
        break;
      }
      const remaining = DIAGNOSTIC_BYTE_LIMIT - diagnostic.inspectedBytes;
      const chunk = value.subarray(0, remaining);
      diagnostic.inspectedBytes += chunk.byteLength;
      text += decoder.decode(chunk, { stream: true });
      if (diagnostic.inspectedBytes === DIAGNOSTIC_BYTE_LIMIT) {
        diagnostic.bodyRead = "cap_reached";
        break;
      }
    }
  } catch {
    diagnostic.bodyRead = signal.aborted ? "timeout" : "read_error";
  } finally {
    if (onAbort) signal.removeEventListener("abort", onAbort);
    // Never wait on an untrusted stream's cancellation implementation.
    if (reader) void reader.cancel().catch(() => undefined);
  }
  text += decoder.decode();
  diagnostic.hints = [...new Set([
    ...diagnostic.hints,
    ...bodyHints(text, diagnostic.responseFormat, diagnostic.bodyRead === "complete"),
  ])];
  return diagnostic;
}
