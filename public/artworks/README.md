# Authentic artwork photographs

The five listed JPEGs are unchanged copies of user-supplied originals:

| Public file              | Supplied original | Listing |
| ------------------------ | ----------------- | ------- |
| colourful-tulips.jpg     | 1000123048.jpg    | ART001  |
| sunlit-ocean.jpg         | 1000123039.jpg    | ART002  |
| sunset-flower-meadow.jpg | 1000123014.jpg    | ART003  |
| tropical-beach.jpg       | 1000123029.jpg    | ART004  |
| forest-waterfall.jpg     | 1000123058.jpg    | ART005  |

These visual matches await the artist’s review. All 17 originals are archived in `assets/source-artworks/`, with integrity hashes in `assets/artwork-imports.json`. The other 12 are outside public until their catalogue details are supplied.

Image paths live in `src/config/assets.ts`. Append multiple authentic photographs of the **same painting** there for gallery thumbnails. Do not attach different paintings as alternate views.

Next Image generates responsive delivery versions while the source files remain untouched. Layouts use contain rather than crop, preserve aspect ratios and signatures, and provide an enlargement dialog. Real backgrounds, hanging cords and any source-photo borders are retained. No cropping, colour adjustment, perspective correction or retouching was applied.

Only set paths after files exist. Failed image loads still show labelled placeholders. Official logo and artist portrait remain separate pending branding assets.
