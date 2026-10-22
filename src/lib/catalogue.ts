import { artworks } from "@/data/artworks";
import type { Artwork } from "@/types/artwork";
export type Sort = "featured" | "newest" | "price-asc" | "price-desc";
export interface Filters {
  search?: string;
  category?: string;
  availability?: string;
  medium?: string;
  maxPrice?: number;
  sort?: Sort;
}
// Replace only these repository functions when introducing a database.
export function getArtworks(): Artwork[] {
  return [...artworks];
}
export function getArtwork(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}
export function filterArtworks(
  items: Artwork[],
  filters: Filters = {},
): Artwork[] {
  const query = filters.search?.trim().toLocaleLowerCase() || "";
  const result = items.filter(
    (a) =>
      (!query || a.title.toLocaleLowerCase().includes(query)) &&
      (!filters.category || a.category === filters.category) &&
      (!filters.availability || a.status === filters.availability) &&
      (!filters.medium || a.medium === filters.medium) &&
      (filters.maxPrice === undefined || a.priceINR <= filters.maxPrice),
  );
  return result.sort((a, b) =>
    filters.sort === "price-asc"
      ? a.priceINR - b.priceINR
      : filters.sort === "price-desc"
        ? b.priceINR - a.priceINR
        : filters.sort === "newest"
          ? b.createdAt.localeCompare(a.createdAt)
          : Number(b.featured) - Number(a.featured),
  );
}
export function dimensions(art: Artwork) {
  return art.width && art.height && art.dimensionUnit
    ? `${art.width} × ${art.height} ${art.dimensionUnit}`
    : "Dimensions available on request.";
}
