"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container route-error">
      <h2>The gallery needs a moment.</h2>
      <p>We couldn’t load this view. Please try again.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
