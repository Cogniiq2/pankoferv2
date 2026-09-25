import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        // Private proposal: keep it out of search engines regardless of hosting.
        { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ],
};

export default nextConfig;

// Exposes Cloudflare bindings to `next dev` (no effect on production builds).
import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
