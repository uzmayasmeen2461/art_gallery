import type { Metadata } from "next";
import { brand } from "@/config/brand";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: `${title} | ${brand.name}` },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${brand.name}`,
      description,
      url: path,
      type: "website",
      locale: "en_IN",
    },
  };
}
