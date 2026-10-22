import { assets } from "@/config/assets";
import type { Artwork } from "@/types/artwork";
// The five supplied records only. Prices and availability are provisional demo data.
// Asset paths come from src/config/assets.ts once authentic photographs are supplied.
export const artworks: Artwork[] = [
  {
    id: "ART001",
    slug: "colourful-tulips",
    title: "Colourful Tulips",
    category: "Florals",
    priceINR: 2199,
    placeholderTone: "rose",
    description:
      "A gathering of pink, red and yellow tulips rises through long green leaves against a soft grey-blue background. Pale circular accents and visible brushwork give this floral acrylic its gentle sense of movement.",
    images: assets.artworks.ART001,
    medium: "Acrylic",
    status: "available",
    featured: true,
    createdAt: "2026-10-22",
  },
  {
    id: "ART002",
    slug: "sunlit-ocean",
    title: "Sunlit Ocean",
    category: "Seascapes",
    priceINR: 3499,
    placeholderTone: "blue",
    description:
      "White rays spread from a bright sun over a blue ocean, with a path of light running towards a sweeping bay. Curved white surf, deep green foliage and foreground palms frame the water.",
    images: assets.artworks.ART002,
    medium: "Acrylic",
    status: "available",
    featured: true,
    createdAt: "2026-10-22",
  },
  {
    id: "ART003",
    slug: "sunset-flower-meadow",
    title: "Sunset Flower Meadow",
    category: "Landscapes",
    priceINR: 1799,
    placeholderTone: "ochre",
    description:
      "A warm pink-and-orange sunset rests above a green meadow filled with slender pink and purple flowers. Dark trees trace the horizon, and the supplied photograph shows the white-bordered painting hanging by a cord.",
    images: assets.artworks.ART003,
    medium: "Acrylic",
    status: "available",
    featured: true,
    createdAt: "2026-10-22",
  },
  {
    id: "ART004",
    slug: "tropical-beach",
    title: "Tropical Beach",
    category: "Landscapes",
    priceINR: 4499,
    placeholderTone: "sand",
    description:
      "Two tall palms overlook layered blue water, a sandy shoreline and breaking white waves. Dense green foliage fills the right-hand slope beneath a pale blue, cloud-marked sky.",
    images: assets.artworks.ART004,
    medium: "Acrylic",
    status: "available",
    featured: true,
    createdAt: "2026-10-22",
  },
  {
    id: "ART005",
    slug: "forest-waterfall",
    title: "Forest Waterfall",
    category: "Nature",
    priceINR: 3999,
    placeholderTone: "sage",
    description:
      "A broad white waterfall spills over a dark ledge into a pale blue pool. Layers of green trees surround the falls, while darker banks lead the eye into the open water.",
    images: assets.artworks.ART005,
    medium: "Acrylic",
    status: "available",
    featured: true,
    createdAt: "2026-10-22",
  },
];
