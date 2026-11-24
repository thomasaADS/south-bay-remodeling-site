import Link from "next/link";
import Image from "next/image";
import { business } from "./business";
import { cities, services } from "./site-data";

const cityPairs = [0, 2, 4, 6].map((index) => cities.slice(index, index + 2));

export function SeoFooter({ home = false }: { home?: boolean }) {
  return (
    <footer>
      <div className="footer-top">
        <Image
          src="/images/forma-logo-transparent.webp"
          alt="FORMA Design + Build"
          width={240}
          height={60}
          loading="lazy"
        />
        <p>Thoughtful design. Coordinated construction. Homes made for South Bay living.</p>
        {home ? <a href="#top">Back to top</a> : <Link href="/#consultation">Start a project</Link>}
      </div>
      <div className="footer-links">
        <div>
          <strong>Services</strong>
          {services.map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug}>
              {service.title}
            </Link>
          ))}
          <Link href="/services">All Services</Link>
        </div>
        <div>
          <strong>Explore</strong>
          <Link href="/#about">About FORMA</Link>
          <Link href="/service-areas">Service Areas</Link>
          <Link href="/remodeling-planning-guide">Remodeling Planning Guide</Link>
          <Link href="/guides">Remodeling Guides</Link>
          <Link href="/#approach">Our Approach</Link>
          <Link href="/#consultation">Start a Project</Link>
          <a href={business.instagram} target="_blank" rel="noopener noreferrer" aria-label="FORMA on Instagram (opens in a new tab)">
            Instagram
          </a>
        </div>
        <div>
          <strong>South Bay</strong>
          {cityPairs.map((pair) => (
            <span key={pair[0].slug}>
              <Link href={`/service-areas/${pair[0].slug}`}>{pair[0].name}</Link>
              {" · "}
              <Link href={`/service-areas/${pair[1].slug}`}>{pair[1].name}</Link>
            </span>
          ))}
        </div>
        <div>
          <strong>Contact</strong>
          <address>
            <span>{business.street}</span>
            <span>{business.city}, {business.region} {business.postalCode}</span>
          </address>
          <a href={`tel:${business.phoneE164}`}>{business.phoneDisplay}</a>
          <a href={`mailto:${business.email}`}>{business.email}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 FORMA Design + Build</span>
        <a href={business.licenseUrl} target="_blank" rel="noopener noreferrer">
          CSLB License #{business.license} · B General Building
        </a>
        <nav aria-label="Legal">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-use">Terms of Use</Link>
        </nav>
      </div>
    </footer>
  );
}
