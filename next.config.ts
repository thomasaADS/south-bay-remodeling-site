import type { NextConfig } from "next";

const origin = "https://formadpb.com";

// Service pages that have been permanently removed. They must 301 to /services, never 404.
// TODO(owner): roofing is not currently offered as a service page. If FORMA does offer roofing,
// remove "roofing" from this list and add the service to app/site-data.ts and
// app/service-content.ts instead.
const retiredServiceSlugs = ["roofing"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Retired service URLs go straight to the canonical /services URL in one hop,
      // whichever host they were requested on.
      ...retiredServiceSlugs.map((slug) => ({
        source: `/services/${slug}`,
        destination: `${origin}/services`,
        statusCode: 301 as const,
      })),
      // www -> non-www, preserving the path and query string.
      // http -> https is enforced by the hosting platform (Vercel) before this runs.
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.formadpb.com" }],
        destination: `${origin}/:path*`,
        statusCode: 301 as const,
      },
    ];
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
