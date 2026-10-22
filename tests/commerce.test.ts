import assert from "node:assert/strict";
import test from "node:test";
import {
  getArtworks,
  getArtwork,
  filterArtworks,
  dimensions,
} from "../src/lib/catalogue";
import {
  addUniqueArtwork,
  formatINR,
  restoreIds,
  subtotal,
  enquiryMessage,
  whatsappUrl,
} from "../src/lib/commerce";
const catalogue = getArtworks();
const first = catalogue[0];
test("catalogue contains precisely the five supplied records and prices", () => {
  assert.deepEqual(
    catalogue.map((a) => [a.id, a.priceINR]),
    [
      ["ART001", 2199],
      ["ART002", 3499],
      ["ART003", 1799],
      ["ART004", 4499],
      ["ART005", 3999],
    ],
  );
  assert.equal(new Set(catalogue.map((a) => a.slug)).size, 5);
});
test("category and name filters compose and ignore query case/whitespace", () => {
  assert.deepEqual(
    filterArtworks(catalogue, { category: "Landscapes" }).map((a) => a.id),
    ["ART003", "ART004"],
  );
  assert.equal(
    filterArtworks(catalogue, { category: "Landscapes", search: " BEACH " })[0]
      ?.id,
    "ART004",
  );
  assert.equal(
    filterArtworks(catalogue, { category: "Florals", search: "Ocean" }).length,
    0,
  );
});
test("price, medium, availability filters and exact price boundary", () => {
  assert.deepEqual(
    filterArtworks(catalogue, { maxPrice: 2199 }).map((a) => a.id),
    ["ART001", "ART003"],
  );
  assert.equal(filterArtworks(catalogue, { medium: "Oil" }).length, 0);
  assert.equal(filterArtworks(catalogue, { availability: "sold" }).length, 0);
  assert.equal(
    filterArtworks([{ ...first, status: "sold" }], { availability: "sold" })
      .length,
    1,
  );
});
test("sorts by price in both directions without mutating source", () => {
  const before = catalogue.map((a) => a.id);
  assert.deepEqual(
    filterArtworks(catalogue, { sort: "price-asc" }).map((a) => a.priceINR),
    [1799, 2199, 3499, 3999, 4499],
  );
  assert.deepEqual(
    filterArtworks(catalogue, { sort: "price-desc" }).map((a) => a.priceINR),
    [4499, 3999, 3499, 2199, 1799],
  );
  assert.deepEqual(
    catalogue.map((a) => a.id),
    before,
  );
});
test("newest and featured sorting use catalogue flags and timestamps", () => {
  const items = [
    { ...first, id: "old", createdAt: "2026-01-01", featured: true },
    { ...first, id: "new", createdAt: "2026-10-01", featured: false },
  ];
  assert.equal(filterArtworks(items, { sort: "newest" })[0].id, "new");
  assert.equal(filterArtworks(items, { sort: "featured" })[0].id, "old");
});
test("empty catalogue and missing artwork resolve safely", () => {
  assert.deepEqual(filterArtworks([]), []);
  assert.equal(getArtwork("not-an-artwork"), undefined);
  assert.equal(getArtwork("../../about"), undefined);
  assert.equal(getArtwork("sunlit-ocean")?.id, "ART002");
});
test("formats rupees using Indian digit grouping", () => {
  assert.equal(formatINR(2199), "₹2,199");
  assert.equal(formatINR(123456), "₹1,23,456");
});
test("cart originals have maximum quantity one and unavailable art cannot be added", () => {
  const ids = addUniqueArtwork([], first);
  assert.deepEqual(ids, ["ART001"]);
  assert.deepEqual(addUniqueArtwork(ids, first), ["ART001"]);
  assert.deepEqual(addUniqueArtwork([], { ...first, status: "sold" }), []);
  assert.deepEqual(addUniqueArtwork([], { ...first, status: "reserved" }), []);
});
test("browser-storage serialization roundtrip, corruption, stale IDs and duplicates", () => {
  const saved = JSON.stringify(addUniqueArtwork([], first));
  assert.deepEqual(restoreIds(saved, catalogue, true), ["ART001"]);
  for (const bad of [null, "broken", "{}", "123", "null"])
    assert.deepEqual(restoreIds(bad, catalogue), []);
  assert.deepEqual(
    restoreIds('["ART001","ART001","deleted",42,null]', catalogue),
    ["ART001"],
  );
});
test("restoring bag removes newly sold/reserved records while wishlist retains them", () => {
  const changed = [
    { ...first, status: "sold" as const },
    { ...catalogue[1], status: "reserved" as const },
  ];
  assert.deepEqual(restoreIds('["ART001","ART002"]', changed, true), []);
  assert.deepEqual(restoreIds('["ART001","ART002"]', changed), [
    "ART001",
    "ART002",
  ]);
});
test("subtotal and enquiries include all IDs, individual prices and confirmation language", () => {
  assert.equal(subtotal([]), 0);
  assert.equal(subtotal(catalogue.slice(0, 2)), 5698);
  const text = enquiryMessage(catalogue.slice(0, 2));
  for (const expected of [
    "Colourful Tulips (ART001)",
    "Sunlit Ocean (ART002)",
    "₹2,199",
    "₹3,499",
    "Subtotal: ₹5,698",
    "confirm availability",
    "shipping charges",
    "payment details",
  ])
    assert.ok(text.includes(expected));
  assert.ok(enquiryMessage([first]).includes("this artwork"));
  assert.ok(enquiryMessage([]).includes("enquire"));
});
test("WhatsApp URL uses wa.me with encoded message and rejects missing/invalid numbers", () => {
  const msg = enquiryMessage([first]);
  const url = whatsappUrl("+91 (98765) 43210", msg);
  assert.ok(url);
  assert.equal(new URL(url).host, "wa.me");
  assert.equal(new URL(url).pathname, "/919876543210");
  assert.equal(new URL(url).searchParams.get("text"), msg);
  for (const number of ["", "abc", "123", "0123456789", "91&bad=1"])
    assert.equal(whatsappUrl(number, msg), null);
});
test("unknown dimensions never become invented measurements", () => {
  assert.equal(dimensions(first), "Dimensions available on request.");
  assert.equal(
    dimensions({ ...first, width: 30, height: 40, dimensionUnit: "cm" }),
    "30 × 40 cm",
  );
});

test("portrait handoff includes only allowlisted non-personal selections", async () => {
  const { portraitEnquiryMessage } = await import("../src/lib/commerce");
  const text = portraitEnquiryMessage(
    "Individual portrait",
    "Prefer to discuss",
  );
  assert.ok(text.includes("Dilshad Art Studio"));
  assert.ok(text.includes("Individual portrait"));
  assert.ok(text.includes("Prefer to discuss"));
  assert.ok(text.includes("reference photograph and other details separately"));
  const untrusted = portraitEnquiryMessage(
    "private@example.com",
    "+91 1234567890",
  );
  assert.ok(!untrusted.includes("private@example.com"));
  assert.ok(!untrusted.includes("1234567890"));
  assert.ok(untrusted.includes("To discuss"));
});
