import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://formadpb.com";
const title = "FORMA Design + Build | San Jose Remodeling Contractor";
const description =
  "FORMA Design + Build is a San Jose general contractor serving South Bay homeowners with kitchen and bathroom remodeling, ADUs, additions, roofing, landscaping and painting.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | FORMA Design + Build",
  },
  description,
  applicationName: "FORMA Design + Build",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: "FORMA Design + Build",
    locale: "en_US",
    images: [
      {
        url: "/images/hero-indoor-outdoor.png",
        width: 1536,
        height: 1024,
        alt: "FORMA Design + Build remodeling inspiration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-indoor-outdoor.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
      <body>{children}</body>
    </html>
  );
}
