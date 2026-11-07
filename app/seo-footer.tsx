import Link from "next/link";
import Image from "next/image";
import { services } from "./site-data";

export function SeoFooter() {
  return (
    <footer>
      <div className="footer-top">
        <Image
          src="/images/forma-logo-transparent.png"
          alt="FORMA Design + Build"
          width={240}
          height={60}
        />
        <p>Thoughtful design. Coordinated construction. Homes made for South Bay living.</p>
        <Link href="/#consultation">Start a project</Link>
      </div>
      <div className="footer-links">
        <div>
          <strong>Services</strong>
          {services.slice(0, 4).map((service) => (
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
          <Link href="/#approach">Our Approach</Link>
          <Link href="/#consultation">Start a Project</Link>
          <a href="https://www.instagram.com/formadpb/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
        <div>
          <strong>South Bay</strong>
          <span>San Jose · Fremont</span>
          <span>Santa Clara · Palo Alto</span>
          <span>Milpitas · Sunnyvale</span>
          <span>Saratoga · Los Gatos</span>
        </div>
        <div>
          <strong>Contact</strong>
          <address>
            <span>360 S Market St, Unit 1707</span>
            <span>San Jose, CA 95113</span>
          </address>
          <a href="tel:+14082347914">(408) 234-7914</a>
          <a href="mailto:Office@formadpb.com">Office@formadpb.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 FORMA Design + Build</span>
        <span>CA Contractor License #1162108</span>
        <nav aria-label="Legal">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-use">Terms of Use</Link>
        </nav>
      </div>
    </footer>
  );
}
