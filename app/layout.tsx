import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FORMA Design + Build | South Bay Remodeling & Construction",
  description:
    "Full-service home remodeling, ADUs, additions, roofing, landscaping and painting across San Jose, Fremont, Santa Clara, Palo Alto, Milpitas, Sunnyvale, Saratoga and Los Gatos.",
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
