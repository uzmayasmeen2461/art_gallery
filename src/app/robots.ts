import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(brand.allowIndexing
        ? { allow: "/", disallow: ["/cart", "/wishlist"] }
        : { disallow: "/" }),
    },
    ...(brand.allowIndexing ? { sitemap: `${brand.siteUrl}/sitemap.xml` } : {}),
  };
}
