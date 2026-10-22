import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Netlify supplies URL at build time; only this public origin is inlined.
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "http://localhost:3000",
  },
  turbopack: { root: process.cwd() },
};
export default nextConfig;
