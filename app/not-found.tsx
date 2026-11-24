import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "./site-interactions";
import { SeoFooter } from "./seo-footer";
import { services } from "./site-data";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | FORMA Design + Build" },
  description: "This page could not be found. Browse FORMA Design + Build remodeling services in San Jose.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="content-page planning-guide">
        <header>
          <p className="eyebrow">Error 404</p>
          <h1>We could not find that page.</h1>
          <p>The page may have moved or the address may be mistyped. These links will get you back on track.</p>
        </header>
        <section>
          <h2>Remodeling services in San Jose</h2>
          <ul>
            {services.map((service) => (
              <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.title} in San Jose</Link></li>
            ))}
            <li><Link href="/services">All remodeling services</Link></li>
          </ul>
        </section>
        <section>
          <h2>More places to start</h2>
          <ul>
            <li><Link href="/">FORMA Design + Build home page</Link></li>
            <li><Link href="/service-areas">South Bay service areas</Link></li>
            <li><Link href="/remodeling-planning-guide">Home remodeling planning guide</Link></li>
            <li><Link href="/guides">Remodeling guides</Link></li>
          </ul>
          <Link className="button button-primary" href="/#consultation">Book a free consultation</Link>
        </section>
      </main>
      <SeoFooter />
    </>
  );
}
