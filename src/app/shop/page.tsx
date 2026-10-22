import { Suspense } from "react";
import { Shop } from "@/components/shop";
import { getArtworks } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "The collection",
  "Browse original handmade acrylic paintings. Filter by subject, price and availability to find a piece for your space.",
  "/shop",
);
export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="container section">
          <h1>The collection</h1>
          <p>Opening the gallery…</p>
        </div>
      }
    >
      <Shop artworks={getArtworks()} />
    </Suspense>
  );
}
