import assert from "node:assert/strict";
const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:3000";
const pages = [
  "/",
  "/shop",
  "/about",
  "/contact",
  "/custom-portraits",
  "/cart",
  "/wishlist",
  "/shipping",
  "/returns",
  "/privacy",
  "/terms",
  "/artwork/colourful-tulips",
  "/artwork/sunlit-ocean",
  "/artwork/sunset-flower-meadow",
  "/artwork/tropical-beach",
  "/artwork/forest-waterfall",
];
const titles = new Set();
for (const path of pages) {
  const response = await fetch(`${origin}${path}`);
  const html = await response.text();
  assert.equal(response.status, 200, path);
  assert.ok(html.includes("Dilshad Art Studio"), `${path} current branding`);
  assert.ok(!html.includes("Atelier Canvas"), `${path} no obsolete branding`);
  assert.match(html, /<main[^>]*id="main-content"/, `${path} main landmark`);
  assert.match(
    html,
    /name="robots" content="noindex, nofollow"/,
    `${path} demo noindex`,
  );
  assert.match(html, /rel="canonical"/, `${path} canonical`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title, `${path} title`);
  assert.ok(!titles.has(title), `${path} unique title`);
  titles.add(title);
  console.log(`PASS ${path}: 200, metadata and main landmark`);
}
for (const path of ["/artwork/does-not-exist", "/does-not-exist"]) {
  const response = await fetch(`${origin}${path}`);
  const html = await response.text();
  assert.equal(response.status, 404, `${path} must be a real HTTP 404`);
  assert.match(html, /This space is/);
  console.log(`PASS ${path}: 404`);
}
const robots = await (await fetch(`${origin}/robots.txt`)).text();
assert.match(robots, /Disallow: \//);
console.log("PASS robots: disallow all");
const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
assert.ok(!sitemap.includes("<url>"));
console.log("PASS sitemap: empty in demo mode");
console.log("All 20 route and indexing checks passed.");
