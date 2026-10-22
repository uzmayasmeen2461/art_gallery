import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { getArtworks } from "@/lib/catalogue";
export default function sitemap(): MetadataRoute.Sitemap {
  return brand.allowIndexing
    ? [
        "/",
        "/shop",
        "/about",
        "/contact",
        "/custom-portraits",
        "/shipping",
        "/returns",
        ...getArtworks().map((a) => `/artwork/${a.slug}`),
      ].map((path) => ({ url: `${brand.siteUrl}${path}` }))
    : [];
}
