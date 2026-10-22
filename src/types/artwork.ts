export type ArtworkStatus = "available" | "reserved" | "sold";
export type Category =
  "Landscapes" | "Seascapes" | "Florals" | "Portraits" | "Nature";
export interface Artwork {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: Category;
  medium: string;
  priceINR: number;
  images: string[];
  width?: number;
  height?: number;
  dimensionUnit?: "cm" | "in";
  status: ArtworkStatus;
  featured: boolean;
  createdAt: string;
  placeholderTone: string;
}
