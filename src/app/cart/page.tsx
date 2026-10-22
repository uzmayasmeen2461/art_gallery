import { CartContents } from "@/components/saved-pages";
import { pageMetadata } from "@/lib/seo";
export const metadata = {
  ...pageMetadata(
    "Your bag",
    "Review your selection of original artwork and enquire directly with the artist.",
    "/cart",
  ),
  robots: { index: false, follow: false },
};
export default function CartPage() {
  return (
    <div className="container">
      <div className="page-intro">
        <p className="eyebrow">ONE OF A KIND, READY FOR A CONVERSATION</p>
        <h1>
          Your <em>bag.</em>
        </h1>
        <p>
          A place for the pieces you love. The next step is a personal
          conversation with the artist.
        </p>
      </div>
      <CartContents />
    </div>
  );
}
