# Consultation request delivery

The three-step questionnaire is published in preview mode so it can be reviewed on the live site. Visitors can complete the flow, but the preview completion screen clearly states that their answers were not submitted or saved. Connect an owner-approved delivery destination before switching the form to live delivery.

## Configure delivery in Vercel

Set the following server-only environment variables for the correct project and environment:

- `FORMA_LEADS_WEBHOOK_URL`: HTTPS endpoint belonging to the business’s lead system or email delivery workflow. Never put this in a `NEXT_PUBLIC_` variable.
- `FORMA_LEADS_WEBHOOK_TOKEN`: optional bearer token if required by the endpoint. Store the real value in Vercel, never in source control.

The receiving service must durably save or enqueue a lead **before** returning a 2xx response, handle the `Idempotency-Key` header to prevent duplicate delivery on retry, and apply durable abuse controls/rate limits. The local honeypot and same-origin check are basic filters, not sufficient abuse protection on their own. No database or email service is provisioned by this change.

The endpoint receives JSON containing `id`, `source`, `submittedAt`, `projectTypes`, `city`, `zip`, `planningStage`, `timeline`, `budget`, `description`, `name`, `email`, `phone`, `contactMethod`, and `consent`. Text fields must be treated as untrusted text by the receiver; escape them when rendering emails or CRM pages. Do not use submitted text as email headers. The source marker is `forma-website`.

Only request-related contact is authorized by the form. It does not request marketing consent. Configure access, retention, and the appropriate business privacy notice for the selected receiving system before launch.

## Verify before enabling production

1. Obtain the business owner’s intended destination and configure a receiver as above.
2. Set the variables for the Vercel preview environment and redeploy. Availability is determined when the page builds, so environment changes require a new deployment.
3. Submit an explicitly authorized test request. Verify that its complete contents actually arrive at the intended destination, and that retrying the same request ID does not duplicate it.
4. Verify receiver failure returns an error to the visitor without clearing their answers or showing a success message.
5. Configure the production variables, merge the reviewed branch, and verify delivery on the deployed site with an authorized test.

Without a destination, the final button completes the presentation flow and displays an explicit preview message. The server still returns 503 when unconfigured. Once configured, the form sends through the validated endpoint and only confirms requests accepted by the receiver. The endpoint rejects invalid data before forwarding and enforces a 12 KB body limit and a 10-second upstream timeout. Submitted details stay in component memory during navigation; they are not written to browser storage or application logs. A page reload clears them. No requests are saved by this Next.js application itself.

## Checks

Run `npx --yes tsx@4.20.5 --test tests/consultation.test.ts` and the Sites build helper. Tests use a mocked receiver and never send external requests.

## Research informing the fields

- https://mdtinc.net/free-project-alignment-call — project scope, location, investment, timing and goals.
- https://www.w3.org/WAI/tutorials/forms/multi-page/ — logical steps, progress indication and preserving entered values when navigating between steps.
