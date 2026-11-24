"use client";

/**
 * "What our clients say": the live Google rating and reviews of FORMA Design + Build.
 *
 * Rendered by Google's official Places UI Kit (gmp-place-details) for one Place ID.
 * - Nothing is requested from Google until the section is near the viewport.
 * - Height is reserved while it loads so the consultation form below does not jump.
 * - The plain "Read reviews on Google" link is always there.
 * - If the widget cannot load, only the link is shown. There is no stored rating to fall back to.
 * - The site keeps no rating, review text or AggregateRating/Review schema for these reviews.
 *
 * Setup and the key's restrictions: docs/google-reviews-setup.md.
 */

import { useEffect, useRef, useState } from "react";
import { business } from "./business";

// Browser key, restricted by HTTP referrer and to Maps JavaScript API + Places UI Kit.
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const loadTimeoutMs = 12_000;

const reviewsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "FORMA Design+Build San Jose",
)}&query_place_id=${business.googlePlaceId}`;

type Status = "idle" | "loading" | "ready" | "failed";

type MapsWindow = Window & {
  google?: { maps?: { importLibrary?: (name: string) => Promise<unknown>; __ib__?: () => void } };
  gm_authFailure?: () => void;
};

let mapsScript: Promise<void> | null = null;

/** Dynamic Library Import, which Places UI Kit requires. Same steps as Google's inline loader. */
function loadPlacesLibrary(key: string): Promise<unknown> {
  const w = window as MapsWindow;
  if (w.google?.maps?.importLibrary) return w.google.maps.importLibrary("places");
  if (!mapsScript) {
    mapsScript = new Promise<void>((resolve, reject) => {
      const google = (w.google ??= {});
      const maps = (google.maps ??= {});
      maps.__ib__ = () => resolve();
      const params = new URLSearchParams({
        key,
        v: "weekly",
        libraries: "places",
        loading: "async",
        callback: "google.maps.__ib__",
      });
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?${params}`;
      script.async = true;
      script.nonce = document.querySelector<HTMLScriptElement>("script[nonce]")?.nonce || "";
      script.onerror = () => {
        mapsScript = null;
        reject(new Error("Google Maps JavaScript API failed to load"));
      };
      document.head.append(script);
    });
  }
  return mapsScript.then(() => (window as MapsWindow).google!.maps!.importLibrary!("places"));
}

export function GoogleReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  // Without a key there is nothing to load, so go straight to the link-only state.
  const [status, setStatus] = useState<Status>(apiKey ? "idle" : "failed");

  // 1. Wait until the section is close to the viewport.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || status !== "idle") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          setStatus("loading");
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [status]);

  // 2. Load the library and mount Google's element.
  useEffect(() => {
    const mount = mountRef.current;
    if (status !== "loading" || !apiKey || !mount) return;

    let done = false;
    const fail = () => {
      if (done) return;
      done = true;
      mount.replaceChildren();
      setStatus("failed");
    };
    const succeed = () => {
      if (done) return;
      done = true;
      setStatus("ready");
    };

    // Google calls this global when the key is invalid or not allowed on this origin.
    const w = window as MapsWindow;
    const previousAuthFailure = w.gm_authFailure;
    w.gm_authFailure = () => {
      previousAuthFailure?.();
      fail();
    };
    const timer = window.setTimeout(fail, loadTimeoutMs);

    loadPlacesLibrary(apiKey)
      .then(() => {
        if (done) return;
        const details = document.createElement("gmp-place-details");
        const request = document.createElement("gmp-place-details-place-request");
        request.setAttribute("place", business.googlePlaceId);

        // Rating, reviews and Google attribution only. No address element. Content elements go
        // directly inside gmp-place-details (the gmp-place-content-config wrapper is deprecated).
        const attribution = document.createElement("gmp-place-attribution");
        attribution.setAttribute("light-scheme-color", "gray");
        attribution.setAttribute("dark-scheme-color", "white");
        // The site is light only, so keep Google's element light for visitors in dark mode.
        details.style.colorScheme = "light";
        details.append(
          request,
          document.createElement("gmp-place-rating"),
          document.createElement("gmp-place-reviews"),
          attribution,
        );
        details.addEventListener("gmp-load", succeed);
        details.addEventListener("gmp-error", fail);
        mount.replaceChildren(details);
      })
      .catch(fail);

    return () => {
      done = true;
      window.clearTimeout(timer);
      w.gm_authFailure = previousAuthFailure;
    };
  }, [status]);

  const failed = status === "failed";
  const pending = status === "idle" || status === "loading";

  return (
    <section ref={sectionRef} className="proof-section google-reviews" id="google-reviews" aria-labelledby="google-reviews-title">
      <p className="eyebrow">Google reviews</p>
      <h2 id="google-reviews-title">What our clients say</h2>
      <p className="google-reviews-note">
        Reviews of FORMA Design + Build as a business, shown live from Google. They are not
        reviews of the featured project above.
      </p>

      {!failed && (
        <div className="google-reviews-widget" data-status={status} aria-busy={pending}>
          {pending && (
            <div className="google-reviews-skeleton" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          )}
          <div ref={mountRef} className="google-reviews-mount" />
        </div>
      )}

      <p className="google-reviews-status" role="status">
        {status === "loading" && "Loading reviews from Google."}
        {failed && "Reviews could not be shown here. Use the link to read them on Google."}
      </p>

      <p className="proof-more">
        <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" aria-label="Read reviews on Google (opens in a new tab)">
          Read reviews on Google
        </a>
      </p>
    </section>
  );
}
