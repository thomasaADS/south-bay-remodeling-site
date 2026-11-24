import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { MarketingEvents } from "./marketing-events";
import { QuickContact } from "./quick-contact";
import { businessGraph } from "./business";
import { serializeJsonLd } from "./seo";

const siteUrl = "https://formadpb.com";
const googleTagManagerId = "GTM-T3WRGP6K";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "FORMA Design + Build",
  category: "home improvement",
  other: {
    "theme-color": "#123d30",
  },
  icons: {
    icon: { url: "/favicon.svg?v=forma-1", type: "image/svg+xml" },
    shortcut: "/favicon.svg?v=forma-1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Sitewide GeneralContractor + WebSite structured data. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(businessGraph()) }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleTagManagerId}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <QuickContact />
        <MarketingEvents />
      </body>
    </html>
  );
}
