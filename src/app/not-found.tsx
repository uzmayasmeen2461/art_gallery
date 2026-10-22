import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container not-found">
      <p className="eyebrow">404 / A DIFFERENT DIRECTION</p>
      <h1>
        This space is <em>still blank.</em>
      </h1>
      <p>
        We couldn’t find that page or artwork. There’s more to discover in the
        collection.
      </p>
      <Link href="/shop" className="button">
        Back to the collection →
      </Link>
    </div>
  );
}
