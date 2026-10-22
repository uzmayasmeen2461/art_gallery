import { WishlistContents } from "@/components/saved-pages";
import { pageMetadata } from "@/lib/seo";
export const metadata = {
  ...pageMetadata(
    "Your favourites",
    "An intimate collection of the original paintings you love, saved in your browser.",
    "/wishlist",
  ),
  robots: { index: false, follow: false },
};
export default function WishlistPage() {
  return (
    <div className="container">
      <div className="page-intro">
        <p className="eyebrow">THE ONES THAT STAY WITH YOU</p>
        <h1>
          Your <em>favourites.</em>
        </h1>
        <p>
          A little collection of possibilities. Save what speaks to you, and
          come back whenever inspiration calls.
        </p>
      </div>
      <WishlistContents />
    </div>
  );
}
