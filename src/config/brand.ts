export const brand = {
  artistName: "Artist name to be announced",
  name: "Dilshad Art Studio",
  logoText: "Dilshad Art Studio",
  tagline: "Art That Speaks to the Soul",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  location: "Hyderabad, India",
  currency: "INR",
  shippingRegion: "India",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
};
export const categories = [
  "Landscapes",
  "Seascapes",
  "Florals",
  "Portraits",
  "Nature",
] as const;
export const categoryLabel = (name: string) =>
  name === "Nature" ? "Nature & Waterfalls" : name;
