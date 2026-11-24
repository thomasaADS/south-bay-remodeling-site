# Live Google reviews: setup and QA

The homepage section "What our clients say" (`app/google-reviews.tsx`) shows the live rating and
reviews from Google through the official Places UI Kit. The site stores no rating, no review text
and publishes no `AggregateRating` / `Review` schema for FORMA.

Verified listing: Place ID `ChIJJb2AUm0f-GARK3ZxLLE72pg` (`business.googlePlaceId`), matched by
the Maps feature ID `0x60f81f6d5280bd25:0x98da3bb12c71762b`, the pin and the address. It was not
matched by phone, because Maps still shows the old number.

## Owner: Google Cloud (about 10 minutes)

1. In https://console.cloud.google.com create or pick a project under FORMA's own Google account.
2. Link a billing account. Confirm who pays.
3. APIs & Services > Library: enable **Maps JavaScript API** and **Places UI Kit**.
4. APIs & Services > Credentials > Create credentials > API key. Name it `formadpb-web-reviews`.
5. Restrict the key:
   - Application restriction: Websites, with only `https://formadpb.com/*` and the preview
     hostname of the pull request branch (the developer provides the exact hostname).
     `www.formadpb.com` redirects to `formadpb.com`, so it needs no entry.
   - API restriction: Maps JavaScript API and Places UI Kit only.
6. Places UI Kit > Quotas: set a daily request cap. Billing > Budgets & alerts: add a budget alert.
7. Add the key yourself in Vercel > `south-bay-remodeling-site` > Settings > Environment
   Variables as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (Preview and Production), then redeploy.

Never put the key in chat, email, GitHub or screenshots. It is a browser key and is visible in the
page by design, which is why the referrer and API restrictions above are required. No server key
is used.

Production is enabled only after the owner confirms billing and the daily cap.

## Behaviour

- The section is a small strip with a "Show Google reviews" button. Google's script loads only
  when a visitor presses it, so most page views make no request to Google.
- Without the env var, or when the script is blocked, the key is rejected, Google reports an
  error, or nothing loads within 12 seconds: the widget area is removed and only
  "Read reviews on Google" remains. No star count is shown.
- New reviews appear without a deploy, once Google makes them available.

## QA on the Vercel preview

- [ ] Desktop and mobile: no horizontal scroll; the reviews scroll inside a fixed-height box
      (`.google-reviews-widget { height }` in `app/globals.css`)
- [ ] Rating and review count equal the Maps listing
- [ ] Google attribution and reviewer names are visible
- [ ] Keyboard: tab through the widget and the link with a visible focus
- [ ] Failure path: remove the env var or block `maps.googleapis.com`; only the link shows
- [ ] `gmp-load` and `gmp-error` fire as expected (check against the current Places UI Kit reference)
- [ ] Consultation form: all three steps and submit work; `#consultation` links land correctly
- [ ] No client street address appears in the section
- [ ] Lighthouse: no layout-shift regression; the Maps script is absent until the button is pressed
