# Consultation request delivery

The three-step questionnaire sends project inquiries to `Office@formadpb.com` through FormSubmit's HTTPS AJAX endpoint.

## Activate delivery

FormSubmit requires a one-time confirmation for a new destination. Open the activation message sent to `Office@formadpb.com`, verify that it references `formadpb.com`, and approve it. Until that confirmation is completed, FormSubmit sends another activation email instead of delivering the inquiry normally.

The server validates and reformats each inquiry before forwarding it. The email includes the visitor's name, email, phone, preferred contact method, project types, city, ZIP, planning stage, desired start, investment range, project notes, contact permission and a request ID.

Only request-related contact is authorized by the form. It does not request marketing consent.

## Verify delivery

1. Complete FormSubmit's one-time email confirmation.
2. Submit an authorized test request from the live site.
3. Verify that every answer arrives at `Office@formadpb.com` and that Reply targets the visitor's email.
4. Check the spam folder if the first delivered inquiry is not visible.

The form confirms **provider acceptance**, not receipt in the destination inbox. It requires a successful HTTP response and a JSON `success` value of boolean `true` or string `"true"`. An activation/verification message takes precedence and is shown as awaiting verification. Empty, malformed, false, or unknown responses remain unconfirmed. FormSubmit's public AJAX documentation demonstrates JSON handling but does not publish a versioned response schema; these compatibility cases must be checked against an authorized live submission before calling end-to-end delivery verified.

The endpoint rejects invalid data before forwarding and enforces a 12 KB body limit and a 10-second upstream timeout; the browser timeout remains 20 seconds. A timeout is an **unknown delivery outcome**, because FormSubmit may already have accepted the inquiry. Do not infer that a request was lost or immediately submit it again.

After an unconfirmed or activation-pending result, the form retains answers and shows direct contact links and a request reference. Editing answers or navigating between steps does not clear that notice. Sending is paused until the visitor explicitly chooses to allow another attempt after checking with FORMA. This is only a same-page duplicate-submission guard, not durable deduplication. A reload clears it. FormSubmit's public documentation does not promise support for the forwarded `Idempotency-Key` header.

Submitted details stay in component memory during navigation; they are not written to browser storage or application logs. A page reload clears them. No requests are saved by this Next.js application itself. Logs contain only a `consultation_delivery` event, validated request ID, outcome, upstream HTTP status, elapsed milliseconds, and a fixed error category. They never contain submitted details, raw provider messages, or raw exception text.

For a reported problem, match the request reference to the server log. A `timeout` category establishes a timed-out acknowledgement, not failed delivery. `upstream_http` records a non-2xx response; `invalid_json` or `upstream_response` indicates an unreadable or unrecognized acknowledgement. Check the destination inbox and FormSubmit activation status before retrying. Do not increase timeouts without measured evidence.

For non-2xx upstream responses only, `upstreamDiagnostic` adds a fixed response-format enum, body-read outcome, inspected byte count (at most 16,384), and allowlisted marker tags. Examples include `challenge_marker`, `activation_marker`, `origin_marker`, and `access_denied_marker`. A Cloudflare infrastructure marker is separate from a challenge marker. Tags are hints found in the response, not proof of the reason for rejection. No recognized marker does not establish that the response was safe or accepted.

Diagnostic inspection shares the existing upstream deadline, stops at the byte cap or after 1,024 reads, and does not await a stalled cancellation. `cap_reached` does not assert that more bytes exist; `read_limit` bounds pathological empty/tiny chunks. JSON inspection requires a complete bounded document and considers only top-level `error` and `message` strings. Provider text, header values, identifiers, cookies, URLs, and exception messages are never logged. A failed or timed-out diagnostic read preserves the original HTTP refusal and `upstream_http` classification. Nothing in this diagnostic change retries or resends an inquiry.

## Checks

Run `npx --yes tsx@4.20.5 --test tests/consultation.test.ts`. Tests use a mocked receiver and never send external requests.

Also run `npx --yes tsx@4.20.5 --test tests/consultation-diagnostics.test.ts` for marker classification, privacy, chunk/byte limits, partial JSON, stalled/erroring bodies, and cancellation. Both test files may be passed to the same command.

For this Vercel/Next.js checkout, run `npm run build`, `npx tsc --noEmit`, and `npm run lint` as well. The README's original Sites helper commands are not present in the current package scripts. If the `tsx` CLI cannot create its IPC socket in a restricted executor, use Node's `--import` with the installed `tsx` loader and `--test` instead.

The delivery tests cover explicit boolean/string success, activation pending, false/missing/unknown payloads, empty/HTML/malformed bodies, upstream HTTP errors, request and response-body timeouts, transport errors, privacy-safe diagnostics and client response handling. They do not prove mailbox delivery.

Optional UI regression checks:
- `tests/consultation-dom.mjs` runs against React with jsdom and mocked fetch. Use a TypeScript loader; install jsdom in the test environment or set `FORMA_JSDOM_PATH` to an isolated installation. It checks same-tick duplicate submits, retained answers and editing focus, Back/Continue, explicit retry, activation, malformed responses and analytics failure.
- `tests/consultation-ui.mjs` checks the same core flows in Playwright against a running local app (default `http://127.0.0.1:3100`). It requires Playwright and Chromium; set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` as needed. It refuses non-local URLs, mocks every consultation request and blocks other origins. Browser execution depends on the executor allowing Chromium's local sockets.

## Research informing the fields

- https://mdtinc.net/free-project-alignment-call — project scope, location, investment, timing and goals.
- https://www.w3.org/WAI/tutorials/forms/multi-page/ — logical steps, progress indication and preserving entered values when navigating between steps.
