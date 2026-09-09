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

The form only confirms requests accepted by FormSubmit. The endpoint rejects invalid data before forwarding and enforces a 12 KB body limit and a 10-second upstream timeout. Submitted details stay in component memory during navigation; they are not written to browser storage or application logs. A page reload clears them. No requests are saved by this Next.js application itself.

## Checks

Run `npx --yes tsx@4.20.5 --test tests/consultation.test.ts` and the Sites build helper. Tests use a mocked receiver and never send external requests.

## Research informing the fields

- https://mdtinc.net/free-project-alignment-call — project scope, location, investment, timing and goals.
- https://www.w3.org/WAI/tutorials/forms/multi-page/ — logical steps, progress indication and preserving entered values when navigating between steps.
