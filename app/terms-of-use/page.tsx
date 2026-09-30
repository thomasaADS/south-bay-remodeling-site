import type { Metadata } from "next";
import { Navigation } from "../site-interactions";
import { SeoFooter } from "../seo-footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the FORMA Design + Build website and project consultation form.",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <>
      <Navigation />
      <main className="content-page legal-page">
        <header className="legal-hero">
          <p className="eyebrow">FORMA Design + Build</p>
          <h1>Website &amp; Form Terms of Use</h1>
          <p>
            These terms govern your use of formadpb.com and the information you
            submit through our project consultation form.
          </p>
          <div className="legal-meta">
            <span>Last updated: September 30, 2026</span>
            <span>CA Contractor License #1162108</span>
          </div>
        </header>

        <article className="legal-content">
          <section>
            <h2>Acceptance of these terms</h2>
            <p>
              By using this website or submitting a form, you agree to these
              Terms of Use and our <a href="/privacy-policy">Privacy Policy</a>.
              If you do not agree, please do not use the form.
            </p>
          </section>

          <section>
            <h2>Informational website</h2>
            <p>
              Website content is provided for general information and does not
              constitute architectural, engineering, legal, financial or other
              professional advice. Images labeled as design inspiration are not
              representations of completed FORMA projects. Project feasibility,
              price, timing, permit requirements and scope can be determined
              only after appropriate review.
            </p>
          </section>

          <section>
            <h2>Project consultation form</h2>
            <ul>
              <li>You must provide information that is accurate to the best of your knowledge.</li>
              <li>You may submit the form only for a genuine project inquiry.</li>
              <li>Do not submit confidential financial data or other sensitive personal information.</li>
              <li>Do not use the form to transmit unlawful, harmful or misleading material.</li>
            </ul>
            <p>
              Submitting a form authorizes FORMA to respond about your inquiry
              by the contact method you select. It does not create a
              contractor-client relationship, reserve a place on our schedule,
              guarantee a response or acceptance, or create an estimate,
              warranty or construction contract. Any project engagement must be
              documented in a separate written agreement signed by the parties.
            </p>
          </section>

          <section>
            <h2>License and service information</h2>
            <p>
              FORMA Design + Build identifies California Contractor License
              #1162108 on this site. License status, classifications and other
              official details should be confirmed through the California
              Contractors State License Board before contracting. Service
              availability depends on project scope, location, schedule and
              applicable requirements.
            </p>
          </section>

          <section>
            <h2>Permitted use</h2>
            <p>
              You may use the website for personal, noncommercial evaluation of
              FORMA&apos;s services. You may not interfere with site operation,
              attempt unauthorized access, scrape the site at disruptive scale,
              submit automated spam, impersonate another person or reuse site
              content in a misleading or unlawful way.
            </p>
          </section>

          <section>
            <h2>Content and third-party services</h2>
            <p>
              Unless otherwise stated, website text, branding, layout and
              original materials are owned by or licensed to FORMA. Third-party
              links and services are provided for convenience. FORMA does not
              control and is not responsible for their content, availability or
              privacy practices.
            </p>
          </section>

          <section>
            <h2>Availability and disclaimers</h2>
            <p>
              We may update, suspend or discontinue any part of the website
              without notice. The site is provided on an “as available” basis.
              To the fullest extent permitted by law, FORMA disclaims implied
              warranties relating to the website. Nothing in these terms
              excludes rights that cannot lawfully be excluded.
            </p>
          </section>

          <section>
            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, FORMA will not be liable
              for indirect, incidental, special or consequential losses arising
              solely from use of, or inability to use, this website. This does
              not limit liability that cannot legally be limited.
            </p>
          </section>

          <section>
            <h2>Governing law and changes</h2>
            <p>
              These terms are governed by the laws of California, without
              regard to conflict-of-law rules. We may revise them as our website
              or practices change. Continued use after an update means the
              revised terms apply from their stated effective date.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about these terms may be sent to{" "}
              <a href="mailto:Office@formadpb.com">Office@formadpb.com</a> or
              mailed to FORMA Design + Build, 360 S Market St, Unit 1707, San
              Jose, CA 95113.
            </p>
          </section>
        </article>
      </main>
      <SeoFooter />
    </>
  );
}
