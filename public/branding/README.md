# Official Dilshad Art Studio assets

The official logo supplied as `1000123233.jpg` is integrated at `dilshad-art-studio-logo.jpg`. It is a byte-for-byte copy, measuring 740 × 758 pixels. The source JPEG remains unchanged. A circular CSS viewport hides the dark/grey outer corners in the website header and footer; the lettering and colours are untouched. No generated replacement or raster retouching is used.

`assets.logo` in `src/config/assets.ts` supplies the public path and intrinsic dimensions. Header and footer share `BrandWordmark`, displaying the official logo alongside readable business text. Equal-width/height frames with `border-radius: 50%` and hidden overflow keep the displayed logo round. A small uniform scale masks the original outer margin without distorting the design. A missing-image error falls back to the text wordmark.

The artist portrait is still pending. Add an authentic file here and set `assets.artistPortrait` to its public path when supplied; until then keep it null.

If an official transparent or alternate-background logo is supplied later, integrate that approved file rather than removing or rebuilding its background without instructions.
