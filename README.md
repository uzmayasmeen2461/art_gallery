# Dilshad Art Studio — Phase 1 prototype

A local, responsive boutique art gallery and enquiry storefront for an independent female acrylic artist in Hyderabad. Built with Next.js App Router, React, TypeScript, Tailwind CSS and Lucide, with self-hosted Cormorant Garamond and DM Sans fonts. No paid services or external font requests.

## Run locally

Use Node.js 22 LTS (minimum 20.9) and npm. Dependencies are pinned in `package-lock.json`.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://127.0.0.1:3000. Keep contact values blank for the demonstration. To restart on a different port use `npm run dev -- --port 3001`.

```sh
npm test
npm run typecheck
npm run lint
npm run build
npm start
# In another terminal, with the app running:
npm run test:smoke
```

Next.js 16 generates route types during builds; run a build first if a fresh checkout's type check needs them. The test runner uses Node's native runner with the `tsx` import hook and requires no browser or backend.

## Implemented

- Responsive editorial homepage, accessible mobile navigation with focus containment, keyboard support, visible focus states and reduced-motion behavior.
- Shop with URL-based search, category, price, availability and medium filters; featured, newest and price sorting; counts and empty states. The five supplied records only.
- Dynamic artwork pages, related works, actual-image support and labelled fallbacks, optional dimension handling, sold/reserved restrictions, artwork metadata and fact-only Product JSON-LD.
- Bag and wishlist, one of each original, INR totals, localStorage persistence with corrupt/stale ID recovery, cross-tab synchronization and a storage-disabled fallback.
- Correctly encoded `wa.me` enquiries with individual artwork names, IDs, prices and subtotal. Business number required; no placeholder contact destination. Bag membership never reserves stock.
- About, contact, custom portrait, shipping/care, draft returns/cancellations, privacy and terms pages. All unknown business information is visibly pending.
- Validated **demo-only** contact and commission forms with an on-screen draft. No form submission, customer storage or upload. After a portrait draft is previewed, a separate WhatsApp handoff includes only allowlisted portrait type and budget choices; names, contact details, free text and photographs stay off its URL. File selection validates type and size locally; share photographs separately with the artist.
- Per-page metadata and canonical URLs, sitemap and robots routes. Private demo defaults to **noindex/nofollow**, robots disallow-all, and an empty sitemap. This prevents indexing intent but is not access control.
- No payments, advertising pixels, analytics SDKs, fake newsletter submission, invented reviews or customer accounts.

## Customize the prototype

| Change                                                     | Location                                             |
| ---------------------------------------------------------- | ---------------------------------------------------- |
| Brand, artist name, tagline and location                   | `src/config/brand.ts`                                |
| Business contacts, site URL, indexing                      | `.env.local` (see `.env.example`)                    |
| Titles, prices, descriptions, statuses, sizes, image paths | `src/data/artworks.ts`                               |
| Artwork model                                              | `src/types/artwork.ts`                               |
| Future database repository boundary                        | `src/lib/catalogue.ts`                               |
| Colours, type and responsive layout                        | `src/app/globals.css`                                |
| Cart, storage and WhatsApp logic                           | `src/lib/commerce.ts`, `src/store/gallery-store.tsx` |

The artist's name is unknown; The approved business name is Dilshad Art Studio. Seed availability is **provisional demo data**, not confirmed inventory. Dates reflect prototype catalogue entry, not painting creation. All five currently share a date and featured flag, so “newest” and “featured” initially preserve catalogue order. Tests cover differing dates and flags.

### Add authentic photographs

Seventeen original photographs have now been supplied and archived unchanged in `assets/source-artworks/`. Five visually matched photographs are integrated into the existing catalogue, hero and collection previews. Twelve await confirmed catalogue details; see `assets/artwork-imports.json` and `assets/README.md` for the source-to-listing mapping. No stock or generated substitute artwork is used. The five public files are:

```
colourful-tulips.jpg
sunlit-ocean.jpg
sunset-flower-meadow.jpg
tropical-beach.jpg
forest-waterfall.jpg
```

Set its entry in `src/config/assets.ts`, e.g. `ART002: ['/artworks/sunlit-ocean.jpg']`. The catalogue reads this centralized map. Optional extra paths show detail photographs. Next Image handles responsive delivery, prioritizes the hero and lazy loads other images; broken images fall back visibly. Use sRGB files, preserve accurate colour and avoid unnecessarily large originals. The source photos and their colour fidelity need the artist's review.

Descriptions now reflect the visible subjects of the five matched photographs. The artist should review these inferred matches before launch. The artist's portrait and biography also need authentic content. Missing dimensions display “Dimensions available on request.” Catalogue artwork URLs are generated at build time; adding a record requires a rebuild. Unknown slugs return HTTP 404. The optional `width`, `height` and `dimensionUnit` fields support confirmed dimensions. Prices are provisional INR integers.

### WhatsApp and contact configuration

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the real **public business number**, including country code; recommended digits-only format `91…`. Do not use an example number belonging to an unknown recipient. Restart/rebuild after changing any `NEXT_PUBLIC_*` value. All such values are public build-time configuration, never secrets.

Set the actual Instagram URL and contact email in `.env.local`. Until configured, the UI displays honest pending states and disables WhatsApp actions. Enquiry URLs contain catalogue information only, never customer form fields or images. Opening a chat does not confirm an order. Commission/contact demo drafts stay in memory and clear on navigation/refresh. No PII is automatically included in URLs.

### Marketing / SEO

Category/search URLs can be shared. Shop filter changes preserve existing URL parameters, including UTMs. No attribution is recorded or transmitted; there is no analytics backend. Real product photos become Open Graph images once supplied. Product offers/reviews/ratings are intentionally omitted while prices and inventory remain provisional. Add verified Offer information and the final sale policies before seeking Merchant Center eligibility. Search Console verification and any consent-aware analytics are future configuration, not connected integrations.

## Deployment (future public launch)

This task is local-only; nothing was published and no hosting account is required. For a later commercial launch choose a Node-compatible host whose **current plan explicitly permits commercial use**, or self-host on an existing server. Do not assume a free personal/hobby plan permits business use. The prototype has no hosting subscription dependency.

1. Obtain artist-approved identity, original photographs, biography, descriptions, pricing, dimensions and inventory states.
2. Confirm business contacts and WhatsApp number; test with the artist's own business account.
3. Replace draft legal/shipping content with reviewed business policies. Confirm framing, shipping, payments, cancellations, returns and commission terms.
4. Set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS origin. Until the launch is ready, retain indexing disabled and protect any shared demo with the host's access controls. `robots.txt` is not privacy protection.
5. Run all checks and `npm run build`, then run `npm start` behind HTTPS on a commercial-use-compatible host. Configure the environment before building.
6. At approved launch set `NEXT_PUBLIC_ALLOW_INDEXING=true`, rebuild and verify robots, canonical URLs, sitemap and product sharing. Never expose service-role/database secrets in public variables.
7. Verify real devices, actual photos, accessibility, shipping wording, contact destinations and enquiries. No Lighthouse score is claimed.

## Validation

The unit suite covers catalogue integrity, composed filters, all sorts, INR formatting, unique originals, unavailable-item restrictions, storage serialization/corruption, stale IDs, totals, WhatsApp text/encoding and missing dimensions. HTTP/browser verification includes invalid artwork routes returning 404; see `QA.md` for executed results and manual checks.

## Known limitations / Phase 2

Inventory is a static catalogue. A bag does not reserve or decrement stock, so live double-sale prevention needs server-side inventory transactions. No payment, authentication, admin dashboard, database, saved enquiry, email delivery or secure image upload is implemented. WhatsApp checkout becomes usable after adding the real business number. No contact or artwork photo should be invented to make this demo appear live.

For Phase 2 replace repository functions with Supabase/PostgreSQL, enforce authorization server-side, use private object storage and secure image validation, and add transactional inventory, order/customer management and consent-aware analytics. Keep service-role credentials strictly server-only. Anonymous browser saves are not user accounts and do not sync between devices.

Dependency audit: production dependencies were checked with `npm audit --omit=dev` (zero findings at implementation). The current Next.js lint tooling transitively includes `braces` 3.0.3, with a high-severity deeply nested glob denial-of-service advisory; the registry has no newer release in that major at implementation. This development-only finding is not fixed by downgrading the application. Avoid linting untrusted generated glob configurations, and recheck/update tooling before public launch. ESLint 9 is pinned because Next's React/import/accessibility plugins do not yet declare ESLint 10 support; TypeScript 6 is pinned because the bundled typescript-eslint does not support TypeScript 7.

## Dilshad Art Studio identity and assets

Brand name: **Dilshad Art Studio**. Tagline: **Art That Speaks to the Soul**. The cream (#F8F2E8) gallery is framed by burgundy (#5B1835) header, footer and actions. Wine (#782B46), champagne (#E8D9C5), muted gold (#C5A46D), dark text (#2B2024) and white are reusable CSS tokens. Gold is decorative; readable text uses darker wine on cream or champagne on burgundy.

`src/config/assets.ts` is the single image mapping for all five catalogue records, the official logo and the artist portrait. The five artwork arrays now point to supplied original photographs. The official logo is supplied as `/branding/dilshad-art-studio-logo.jpg` (740 × 758); only the artist portrait remains `null` awaiting an authentic photograph. Put artwork files in `public/artworks/`, approved logo/portrait files in `public/branding/`, then populate only paths that really exist. See each folder's README. Header/footer share `BrandWordmark`, which falls back to the text name if an official logo fails to load. Both artist sections use the same portrait mapping. Multiple artwork paths enable thumbnails and an accessible native-dialog lightbox with full compositions preserved using `object-fit: contain`.

The rebrand retains existing browser saves: new `dilshad-*` storage keys fall back to legacy `atelier-*` keys when no new entry exists. The next bag/wishlist change writes the new keys; no saved artwork is discarded solely by the rebrand.

Product pages provide WhatsApp and email sharing links. Set the actual HTTPS `NEXT_PUBLIC_SITE_URL` before sharing the deployed site. Portrait handoff remains disabled until a real business number is configured. There are no invented contact destinations or uploaded photos.
