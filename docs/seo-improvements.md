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
