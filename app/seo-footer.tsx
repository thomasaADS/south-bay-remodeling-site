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
        <a href="/#consultation">Start a project</a>
      </div>
      <div className="footer-links">
        <div>
          <strong>Services</strong>
          {services.slice(0, 4).map((service) => (
            <a href={`/services/${service.slug}`} key={service.slug}>
              {service.title}
            </a>
          ))}
          <a href="/services">All Services</a>
        </div>
        <div>
          <strong>Explore</strong>
          <a href="/#about">About FORMA</a>
          <a href="/service-areas">Service Areas</a>
          <a href="/#approach">Our Approach</a>
          <a href="/#consultation">Start a Project</a>
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
          <a href="tel:+13239755574">(323) 975-5574</a>
          <a href="mailto:Office@formadpb.com">Office@formadpb.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 FORMA Design + Build</span>
        <span>San Jose · South Bay, California</span>
      </div>
    </footer>
  );
}
