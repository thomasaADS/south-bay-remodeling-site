# SEO and search-answer improvements

Implemented November 7, 2026 for formadpb.com.

## Changes

- Preserve the permanent www-to-non-www redirect and existing canonical URLs.
- Give each service a concise, specific search title and description; align Open Graph and Twitter metadata with each page rather than the homepage.
- Clarify San Jose service headings and the services hub heading.
- Expand the four existing service pages with practical scope guidance and relevant questions. No invented prices, construction durations, reviews or completed projects.
- Publish `/remodeling-planning-guide` with scope, proposal, permit, materials and consultation checklists, linked to services and official public resources.
- Add the guide to navigation, footer and sitemap; link city cards to the matching service-area section rather than generating repetitive city pages.
- Preserve existing service/FAQ structured data and clarify service identity/provider references. The guide has WebPage and BreadcrumbList markup. Markup does not guarantee search features or AI citations.
- Replace internal navigation anchors with framework Links. Public URLs and crawlable rendered links remain intact.

## Validation

- `npm run lint`
- `npm run build`
- `npx tsc --noEmit`
- `node tests/seo-http.mjs http://127.0.0.1:3100` against a local production server
- `python tests/seo-crawl.py http://127.0.0.1:3100` (or the production origin)
- Existing mocked consultation unit and DOM tests. No live inquiries sent.

## Measurement and remaining work

No Search Console performance dataset was available during implementation. There is no verified clicks, impressions, CTR or position baseline in this change. Compare equivalent periods after recrawling, separating branded and non-branded queries and checking individual service pages. A title change is a hypothesis, not a promise of higher CTR; search engines can rewrite snippets.

The published site contains conflicting 323 and 408 phone numbers. No number was changed without owner clarification. Confirm the current number before standardizing site content, schema and business profiles.

External authority requires genuine business evidence: authorized profile updates, real project examples and authentic customer reviews. This change does not buy links, create external listings, submit reviews or guarantee Google/AI placement.


## November 10, 2026 follow-up

### Implemented

- Put the San Jose remodeling topic first in the homepage title and visible H1 while preserving the existing design and inquiry flow.
- Add substantial kitchen and bathroom scope guidance: layout choices, coordinated selections, wet-area preparation, daily access and consultation checklists. These are planning considerations, not prices, duration promises or permit determinations.
- Link the kitchen and bathroom guidance to the existing official City of San Jose Building Division resource.
- Add service-page contents links to scope, planning, proposal preparation and questions. Keep the same ten indexable URLs; do not create repetitive city landing pages.
- Add explicit WebPage/CollectionPage identities connected to the website, business and services, with visible breadcrumbs on the service and area hubs.
- Centralize safe JSON-LD serialization and test that escaping closing script tags preserves the actual structured-data values.
- Match the gallery side-image responsive sizes to their smaller display columns, avoiding unnecessarily wide image requests. No measured Core Web Vitals improvement is claimed.
- Provide one keyboard skip link and a matching main-content target on all ten public pages.
- Expand SEO regression coverage for unique metadata, indexability, page/service relationships, keyboard targets, detailed content and true noindex 404s.

### Verified locally

- Production Next.js build, TypeScript check and ESLint.
- 39 unit tests covering structured data and existing consultation validation, diagnostics and sending adapter behavior.
- Mocked form DOM regressions covering repeat clicks, retained answers, navigation, explicit retries, unavailable/malformed outcomes and lead-event behavior.
- All ten sitemap URLs; 357 internal links and fragments; one H1, canonical URL and unique title/description per page; social metadata alignment; robots/sitemap; permanent www redirects preserving paths/queries; unknown routes return 404 and noindex.
- No external inquiry or live email sent. No phone, address, license, claims, payment, tracking configuration or delivery-provider settings changed.

### Verification limits and remaining priorities

Local Chromium launch is blocked by runtime socket restrictions. The included optional `tests/seo-ui.mjs` has not passed locally; do not report a browser or visual QA pass without a separate completed check. Rich Results Test and Search Console recrawling are separate from JSON syntax/entity regression tests. Schema cannot guarantee a rich result, ranking or AI citation.

The 323/408 phone discrepancy still needs owner verification before sitewide standardization. Obtain current Search Console and analytics data before reporting traffic gains, search positions or conversion changes. Genuine project examples, permitted client testimonials and authorized business-profile updates remain external follow-up work.
