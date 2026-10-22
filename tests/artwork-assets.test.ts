import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { getArtworks } from "../src/lib/catalogue";
interface ImportRecord {
  sourceFilename: string;
  archivedPath: string;
  sha256: string;
  artworkId: string | null;
  publicPath: string | null;
}
const manifest: ImportRecord[] = JSON.parse(
  readFileSync(
    new URL("../assets/artwork-imports.json", import.meta.url),
    "utf8",
  ),
);
const hash = (bytes: Buffer) =>
  createHash("sha256").update(bytes).digest("hex");
test("archived originals retain their recorded upload bytes", () => {
  assert.equal(
    new Set(manifest.map((row) => row.sourceFilename)).size,
    manifest.length,
  );
  for (const row of manifest)
    assert.equal(
      hash(readFileSync(new URL(`../${row.archivedPath}`, import.meta.url))),
      row.sha256,
      row.sourceFilename,
    );
});
test("each published painting uses its mapped, unchanged source photograph", () => {
  for (const art of getArtworks()) {
    const row = manifest.find((entry) => entry.artworkId === art.id);
    assert.ok(row?.publicPath, art.id);
    assert.equal(art.images[0], row.publicPath);
    assert.equal(
      hash(
        readFileSync(new URL(`../public${row.publicPath}`, import.meta.url)),
      ),
      row.sha256,
      art.title,
    );
    assert.ok(!art.description.includes("photograph has not been supplied"));
  }
});
test("unidentified uploads remain separate from priced catalogue items", () => {
  for (const row of manifest.filter((entry) => !entry.artworkId))
    assert.equal(row.publicPath, null);
  assert.equal(
    new Set(manifest.filter((row) => row.artworkId).map((row) => row.artworkId))
      .size,
    getArtworks().length,
  );
});
