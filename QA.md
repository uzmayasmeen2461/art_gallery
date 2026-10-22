# Executed validation — 22 October 2026

- `npm test`: 13 tests passed. Catalogue integrity; composed category/name/price/medium/availability filters; price, featured and newest sorting; missing records/empty data; Indian rupee formatting; unique originals; sold/reserved restrictions; storage serialization, corruption and stale inventory; subtotals; WhatsApp text and URL encoding; missing dimensions.
- `npm run typecheck`: passed, zero TypeScript errors.
- `npm run lint`: passed, zero errors or warnings.
- `npm run build`: passed. Nineteen static output pages, including five generated artwork routes. A repeat build in the restricted tool sandbox stalled while waiting for a compiler worker; the final build ran successfully with local compiler permissions.
- `TEST_ORIGIN=http://127.0.0.1:3001 npm run test:smoke`: all 19 route/indexing checks passed against the production build. Fifteen pages return 200 with unique titles, canonical links, main landmarks and demo noindex. Invalid artwork and unknown page return HTTP 404. Robots disallows crawling; the demo sitemap is empty.

## Interactive browser checks (Chrome)

- Desktop homepage visual review: editorial typography, framed and explicitly labelled image placeholder, working navigation and collection links.
- Landscape filter returns exactly Sunset Flower Meadow and Tropical Beach. Descending price puts Tropical Beach first.
- Saved Tropical Beach to wishlist; its pressed heart and persisted wishlist record appeared correctly.
- Added Tropical Beach to bag: quantity one, ₹4,499, repeat add disabled. Reload preserved the bag. Removing it returned the empty-bag view.
- WhatsApp action disabled with an explicit missing-business-number explanation. Real WhatsApp conversation was not opened; URL/message behavior is unit-tested.
- 390 × 844 mobile homepage visual review; 320px shop width check: document width equals viewport width, without horizontal overflow.
- Mobile menu opens with focus on Close; Shift+Tab wraps to the final link; Escape closes the menu. Mobile filter open/close works.
- An unmatched search displays zero artworks and a helpful reset action.
- Contact form and portrait form with synthetic demo inputs produce a visible “Draft preview only” result, explicitly saying nothing has been sent/saved. Portrait type, budget, optional size fallback and reference-image instructions appeared in the draft. No actual personal information or image was submitted.
- Temporary responsive overrides were reset and the test bag item was removed.

## Limits

No Lighthouse score, automated axe audit, real-device test, payment test, actual photo colour review, real contact destination check or file upload is claimed. Actual artist imagery and contact details are missing. A Chrome extension injected `data-scribe-recorder-ready` and `cz-shortcut-listen` attributes before hydration, producing a development-only hydration warning identifying those injected attributes; application state persisted and interacted correctly. Recheck in a clean browser profile before launch.

Production dependency audit: zero findings at implementation. Development lint tooling has a transitive `braces` denial-of-service advisory without a patched release available from the registry at implementation; see README for details. No forced framework downgrade was applied.

## Hydration compatibility fix — 22 October 2026

The root layout now sets `suppressHydrationWarning` on `<html>` and `<body>` only, to tolerate browser-extension attribute injection before React hydrates. Verified in Chrome with both `data-scribe-recorder-ready="true"` and `cz-shortcut-listen="true"` present: initial load and full reload produced no console errors or warnings. This supersedes the extension hydration warning noted above. TypeScript and lint checks passed. Gallery descendants retain normal hydration diagnostics.

## Dilshad Art Studio update — 22 October 2026

- Existing prototype enhanced in place; hydration compatibility retained.
- `npm test`: all 14 business-logic tests passed, including allowlisted portrait handoff choices and exclusion of personal/free-text input from enquiry URLs.
- `npm run typecheck`, `npm run lint`, and the final `npm run build`: passed. Twenty static output pages, including the new draft returns/cancellations page.
- Desktop visual review: Dilshad Art Studio wordmark, burgundy header, cream/champagne gallery, wine headings and burgundy primary actions. No actual artwork images or logo supplied; labelled placeholders retained.
- 320px homepage and artwork detail views: document width equals viewport width. Mobile menu and floral category filtering worked; exactly Colourful Tulips appeared at ₹2,199.
- Saved Colourful Tulips to wishlist and added it to bag. Full reload retained the artwork and disabled repeat additions. Browser console had zero errors/warnings, including hydration warnings.
- Portrait form with synthetic demo inputs produced a draft and an explicit disabled WhatsApp handoff pending the real business number. The UI explains that only selected portrait type and budget enter the handoff URL, with the image shared separately. The final browser cleanup check was interrupted when the browser debugger detached; no subsequent visual checks are claimed.
- Calculated contrast ratios for primary text pairs: cream/burgundy 11.59:1, wine/cream 8.45:1, muted text/cream 6.06:1, champagne/burgundy 9.32:1, muted text/soft surface 5.43:1. This is a token contrast check, not a full automated accessibility audit.
- Authentic-image lightbox, official-logo rendering and actual contact destinations require verification once those assets/details are supplied. No fixture painting or generated substitute was introduced for testing.
- Final production HTTP smoke suite: all 20 checks passed against port 3001. Sixteen pages returned 200 with the current brand and no obsolete brand name; unique metadata, canonical links, main landmarks and demo noindex were present. Unknown artwork and page URLs returned 404. Robots disallowed crawling and the demo sitemap stayed empty.

## Original artwork integration — 22 October 2026

Seventeen user-supplied JPEGs archived unchanged, with SHA-256 hashes in `assets/artwork-imports.json`. Five visually inferred source-to-listing matches populate the existing catalogue; twelve other paintings remain unpriced and outside `public/` pending confirmed catalogue details. The official logo is still pending.

All 17 unit tests passed, including three image-integrity/mapping checks. TypeScript and lint passed. The production build passed with all 20 static output pages. Chrome verified that all five shop photographs completed loading with `object-fit: contain`; the hero shows the actual Sunlit Ocean photograph. The enlargement dialog opened with a successfully loaded image, preserved the full composition, and closed with Escape. No source file cropping, recolouring, retouching or replacement took place. Existing provisional prices and dimensions-on-request behavior were retained.

Image loading uses the current Next.js eager/fetch-priority properties for above-the-fold work and lazy loading elsewhere. Actual image-to-title associations are visual matches for the artist's review, not a claim that filenames supplied those titles. The photograph containing social-interface overlays is retained in staging without publishing those overlays as website engagement data.

## Official logo integration — 22 October 2026

The supplied `1000123233.jpg` is now configured as the official logo in both header and footer, alongside readable business text. The original 740 × 758 JPEG was copied unchanged to `public/branding/dilshad-art-studio-logo.jpg`. Source and destination SHA-256 hashes match: `ebaa4cc5e0317b085a5e3729c19302181e897a04ac9027cd69b47723f21ff952`.

Chrome verified both images loaded with the original aspect ratio, at 68px header height and 104px footer height on desktop. The 320px mobile layout had no horizontal overflow, with the full logo visible. No image or hydration warnings appeared. The temporary viewport override was reset. The logo’s original dark background, lettering and colours remain intact; only the artist portrait is still pending among branding image assets. This supersedes earlier notes that the official logo was awaiting supply.

Final post-format production build, standalone TypeScript check and lint all passed for the logo update.

## Rounded logo presentation

Header and footer now use circular CSS frames with hidden overflow, masking the source JPEG’s grey/dark rectangular margin. The original image file and lettering remain unchanged. Desktop visual review confirmed no grey corners; computed frames are 68 × 68 and 104 × 104 with 50% corner radius. The 320px layout remains free of horizontal overflow. TypeScript and lint passed.
