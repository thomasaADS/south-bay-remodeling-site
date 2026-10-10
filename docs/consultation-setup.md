# Consultation email delivery

## Local replacement, pending configuration and publication

The consultation route uses the official Resend HTTPS email API directly. It does not require a provider SDK or Marketplace installation. There is no FormSubmit fallback and no automatic retry. The destination is fixed in server code as `Office@formadpb.com`; visitor input cannot change the sender, recipients, CC/BCC, endpoint, or credentials.

The visitor's validated email is `reply_to`. All approved inquiry fields are included in a deterministic plain-text email, with a fixed subject and request reference. The existing three-step form, consent, field validation, honeypot, origin check, and 12 KB request limit remain. No website redesign is included.

## Operator setup required before publication

One setup outcome is required: connect an authenticated, verified sending identity to this Vercel project. This local code does not create an account, verify DNS, generate credentials, or establish that the sender is ready.

1. In an authorized Resend account, verify a sending domain owned by FORMA. Suggested dedicated subdomain: `notify.formadpb.com`. Keep Receiving disabled. Add only the exact sending records Resend generates at the domain's DNS host; preserve the existing Office mailbox MX/SPF/DKIM/DMARC. New Resend domains may use CNAME records rather than the older TXT/MX pattern.
2. With explicit authorization, create a Sending-access API key restricted to that verified domain. The owner must transfer/configure it directly through a secure provider/Vercel flow. Do not put it in chat, source control, screenshots, logs, or `NEXT_PUBLIC_*` variables.
3. Set these server-only environment variables on the intended Vercel project/environment:
   - `CONSULTATION_EMAIL_PROVIDER=resend`
   - `CONSULTATION_FROM_EMAIL=inquiries@notify.formadpb.com` (or another address on the verified FORMA domain)
   - `RESEND_API_KEY`: the domain-restricted secret, entered securely by the owner
4. After approval, publish and redeploy so the runtime uses that configuration. Production credentials should not automatically be shared with preview deployments. Local mocked tests do not need credentials.

The address restriction is checked locally, but actual domain verification is enforced by Resend. Without the three configured values, the route returns HTTP 503 with an unavailable status and makes no external call. `onboarding@resend.dev` is intentionally disallowed; Resend's test identity cannot be assumed to send to Office.

The destination is not an environment variable. Replies go to the visitor, while the authenticated From identity remains FORMA's verified sender.

## Acceptance and retries

The route makes one `POST https://api.resend.com/emails` call per valid submission. Its ten-second deadline covers the request and successful-response body. Success requires a 2xx response with a valid UUID-shaped email ID. This proves API acceptance, not destination inbox delivery. Unknown, malformed, oversized, stalled, or unfamiliar acknowledgements remain unconfirmed.

Successful response parsing is capped at 16 KiB and 1,024 reads. Error response bodies are discarded without logging or awaiting cancellation; only fixed HTTP error categories are recorded. Logs contain request ID, fixed provider/status/error categories, upstream HTTP status, elapsed time, and the provider's opaque email ID on acceptance. They never contain lead fields, API keys, request/response bodies, provider messages, or raw exceptions.

An explicit retry with identical answers on the same page retains its request ID and byte-identical request payload. The Resend idempotency key is `forma-consultation/<request-ID>`. Resend deduplicates identical keys and payloads for **24 hours only**. Edited answers form a new attempt after the existing explicit retry confirmation. The app does not silently change keys on provider conflicts or retry against another provider.

This is not durable lead storage or permanent deduplication. Reloading clears the form and its in-memory attempt; retries after 24 hours can duplicate an earlier email. Check with FORMA before resending an unconfirmed request. Provider conflict responses remain unconfirmed because an earlier attempt may already have been accepted. No submission is automatically sent to the visitor.

## Before activating production

- Verify domain status and exact project/environment configuration without exposing the key.
- Verify hosting-level abuse protection and available sending quota. The existing origin check and honeypot are not a distributed rate limiter; the repository has no such limiter or queue. Provider rate/quota refusals are handled without automatic resends.
- Obtain approval for publication and a clearly labelled live test to Office. Do not reuse real lead data for tests.
- Match the live request reference to its server log/provider email ID and check provider delivery status. Finally confirm actual receipt with Avihu, including field completeness and Reply-To. API acceptance alone is insufficient.
- If a test result is uncertain, do not send another without checking the first attempt.

## Local checks

- `node --import ./node_modules/tsx/dist/loader.mjs --test tests/consultation.test.ts tests/consultation-email.test.ts`
- `FORMA_JSDOM_PATH=/path/to/jsdom node --import ./node_modules/tsx/dist/loader.mjs tests/consultation-dom.mjs`
- `npm run build`
- `npx tsc --noEmit`
- `npm run lint`

Tests mock every sending request and do not transmit leads externally. DOM checks cover duplicate clicks, retained answers and focus, Back/Continue, changed/unchanged explicit retries, unavailable/malformed results, and analytics failure. The optional Playwright script remains local-only and mocked; running DOM tests is not a visual-browser pass.

## Official references

- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/dashboard/emails/idempotency-keys
- https://resend.com/docs/api-reference/errors
- https://resend.com/docs/create-an-api-key
- https://resend.com/docs/knowledge-base/how-do-i-avoid-conflicting-with-my-mx-records
