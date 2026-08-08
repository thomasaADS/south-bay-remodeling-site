import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FORMA Design + Build | South Bay Remodeling & Construction",
  description:
    "Full-service home remodeling, ADUs, additions, roofing, landscaping and painting across San Jose, Fremont, Santa Clara, Palo Alto, Milpitas, Sunnyvale, Saratoga and Los Gatos.",
  other: {
    "theme-color": "#173e32",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
