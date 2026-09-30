import type { Metadata } from "next";
import { Navigation } from "../site-interactions";
import { SeoFooter } from "../seo-footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how FORMA Design + Build collects, uses and protects information submitted through formadpb.com.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main className="content-page legal-page">
        <header className="legal-hero">
          <p className="eyebrow">FORMA Design + Build</p>
          <h1>Privacy Policy</h1>
          <p>
            This policy explains what information we collect through this
            website, why we use it and the choices available to you.
          </p>
          <div className="legal-meta">
            <span>Last updated: September 30, 2026</span>
            <span>CA Contractor License #1162108</span>
          </div>
        </header>

        <article className="legal-content">
          <section>
            <h2>Who this policy applies to</h2>
            <p>
              This Privacy Policy applies to information collected by FORMA
              Design + Build through formadpb.com, including information you
              submit through our project consultation form or provide when you
              contact us by email or telephone.
            </p>
          </section>

          <section>
            <h2>Information we collect</h2>
            <h3>Information you provide</h3>
            <p>
              We may collect your name, email address, telephone number,
              preferred contact method, property city and ZIP code, project
              type, planning stage, anticipated timeline, budget range and any
              project details you choose to share.
            </p>
            <h3>Website and device information</h3>
            <p>
              We may automatically receive limited technical and usage
              information, such as browser and device type, pages viewed,
              referring page, approximate location based on IP address and
              interactions with website features.
            </p>
          </section>

          <section>
            <h2>How we use information</h2>
            <ul>
              <li>To review and respond to project inquiries.</li>
              <li>To communicate about the services you requested.</li>
              <li>To operate, secure and improve the website and its forms.</li>
              <li>To understand website performance and visitor activity.</li>
              <li>To prevent spam, fraud, abuse and technical problems.</li>
              <li>To meet applicable legal and recordkeeping obligations.</li>
            </ul>
            <p>
              We do not sell your personal information. We do not use form
              submissions for unrelated marketing unless you separately agree
              to receive it.
            </p>
          </section>

          <section>
            <h2>Project consultation form</h2>
            <p>
              Information submitted through the form is used to evaluate and
              respond to your inquiry. Submitting the form does not create a
              contractor-client relationship, guarantee project acceptance or
              constitute an estimate or contract. Please do not submit Social
              Security numbers, payment card data, financial account
              information or other sensitive personal information.
            </p>
            <p>
              When you submit the form, you authorize FORMA to contact you about
              that inquiry using the contact information and method you provide.
              See our <a href="/terms-of-use">Terms of Use</a> for the form-use
              rules.
            </p>
          </section>

          <section>
            <h2>Analytics, cookies and tags</h2>
            <p>
              This site uses Google Tag Manager and Google Analytics to measure
              website activity and form performance. These services may use
              cookies or similar technologies and may receive device,
              interaction and approximate location information. You can limit
              cookies through your browser settings. Blocking cookies may affect
              some website functions.
            </p>
            <p>
              Google&apos;s use of information is governed by its own privacy
              terms and controls.
            </p>
          </section>

          <section>
            <h2>When information may be shared</h2>
            <p>
              We may share information with service providers that help us host,
              secure, analyze or operate the website and respond to inquiries.
              They may use information only to provide services to us. We may
              also disclose information when required by law, to protect rights
              or safety, or in connection with a business transfer.
            </p>
          </section>

          <section>
            <h2>Retention and security</h2>
            <p>
              We keep information only as long as reasonably necessary for the
              purposes described above, including inquiry follow-up, business
              records, security and legal obligations. We use reasonable
              administrative and technical safeguards, but no online system can
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>Your choices and California privacy requests</h2>
            <p>
              You may ask to access, correct or delete personal information you
              submitted, subject to legal and operational exceptions. You may
              also ask us to stop contacting you about an inquiry. Send requests
              to <a href="mailto:Office@formadpb.com">Office@formadpb.com</a>.
              We may need to verify your identity before completing a request.
            </p>
          </section>

          <section>
            <h2>Children and external links</h2>
            <p>
              This website is intended for adults seeking residential
              construction services and is not directed to children under 13.
              The site may link to third-party services, whose privacy practices
              are governed by their own policies.
            </p>
          </section>

          <section>
            <h2>Updates and contact</h2>
            <p>
              We may update this policy as the website or our practices change.
              The date above shows the latest revision. Questions may be sent to{" "}
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
