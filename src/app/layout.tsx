import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { GalleryProvider } from "@/store/gallery-store";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: `${brand.name} | Original Art. Timeless Stories.`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Discover original handmade acrylic paintings from an independent artist in Hyderabad. Explore landscapes, seascapes, florals and nature paintings.",
  alternates: { canonical: "/" },
  robots: { index: brand.allowIndexing, follow: brand.allowIndexing },
  openGraph: {
    siteName: brand.name,
    locale: "en_IN",
    type: "website",
    title: brand.name,
    description: brand.tagline,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Extensions can add attributes before hydration (e.g. Scribe on <html>
    // and ColorZilla on <body>). Tolerate changes on these two elements only;
    // React still checks the gallery components for hydration mismatches.
    <html lang="en-IN" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <GalleryProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </GalleryProvider>
      </body>
    </html>
  );
}
