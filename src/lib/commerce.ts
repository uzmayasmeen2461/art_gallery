import { brand } from "@/config/brand";
import type { Artwork } from "@/types/artwork";
export const formatINR = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
export const subtotal = (items: Artwork[]) =>
  items.reduce((sum, item) => sum + item.priceINR, 0);
export function addUniqueArtwork(ids: string[], art: Artwork): string[] {
  return art.status !== "available" || ids.includes(art.id)
    ? ids
    : [...ids, art.id];
}
export function restoreIds(
  raw: string | null,
  catalogue: Artwork[],
  availableOnly = false,
): string[] {
  try {
    const data: unknown = JSON.parse(raw || "[]");
    return Array.isArray(data)
      ? [
          ...new Set(
            data.filter(
              (id): id is string =>
                typeof id === "string" &&
                catalogue.some(
                  (a) =>
                    a.id === id && (!availableOnly || a.status === "available"),
                ),
            ),
          ),
        ]
      : [];
  } catch {
    return [];
  }
}
export function enquiryMessage(items: Artwork[]): string {
  if (!items.length)
    return `Hello! I’d like to enquire about the original paintings at ${brand.name}. Could you share availability and shipping details?`;
  return `Hello! I'm interested in ${items.length === 1 ? "purchasing this artwork" : "these artworks"}:\n\n${items.map((a) => `${a.title} (${a.id}) — ${formatINR(a.priceINR)}`).join("\n")}\n\nSubtotal: ${formatINR(subtotal(items))}.\nCould you please confirm availability, shipping charges, and payment details?`;
}
export function whatsappUrl(number: string, message: string): string | null {
  const normalized = number.replace(/[\s+()-]/g, "");
  return /^[1-9]\d{7,14}$/.test(normalized)
    ? `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`
    : null;
}

export const portraitTypes = [
  "Individual portrait",
  "Couple portrait",
  "Family portrait",
  "Pet portrait",
  "Other — to discuss",
] as const;
export const portraitBudgets = [
  "Under ₹5,000",
  "₹5,000–₹10,000",
  "₹10,000–₹20,000",
  "Over ₹20,000",
  "Prefer to discuss",
] as const;
// Only allowlisted, non-personal form selections enter the public WhatsApp URL.
export function portraitEnquiryMessage(type: string, budget: string): string {
  const safeType =
    portraitTypes.find((value) => value === type) || "To discuss";
  const safeBudget =
    portraitBudgets.find((value) => value === budget) || "To discuss";
  return `Hello ${brand.name}! I'd like to discuss a custom portrait.\nPortrait type: ${safeType}\nBudget preference: ${safeBudget}\nPlease confirm commission availability, style options, dimensions, pricing and timing. I will share my reference photograph and other details separately. This is an enquiry, not a confirmed order.`;
}
