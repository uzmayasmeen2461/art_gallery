"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { categories, categoryLabel } from "@/config/brand";
import { filterArtworks, type Sort } from "@/lib/catalogue";
import { formatINR } from "@/lib/commerce";
import type { Artwork } from "@/types/artwork";
import { ArtworkCard } from "./artwork-card";
export function Shop({ artworks }: { artworks: Artwork[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const [mobileFilters, setMobileFilters] = useState(false);
  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const availability = params.get("availability") || "";
  const medium = params.get("medium") || "";
  const rawPrice = Number(params.get("maxPrice") || 5000);
  const maxPrice = Number.isFinite(rawPrice) ? Math.max(0, rawPrice) : 5000;
  const sort = (params.get("sort") || "featured") as Sort;
  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`/shop${next.size ? `?${next}` : ""}`, { scroll: false });
  }
  const results = filterArtworks(artworks, {
    search,
    category,
    availability,
    medium,
    maxPrice,
    sort,
  });
  const active = !!(
    search ||
    category ||
    availability ||
    medium ||
    maxPrice < 5000
  );
  return (
    <div className="container shop-page">
      <div className="page-intro">
        <p className="eyebrow">FIND YOUR CONNECTION</p>
        <h1>
          The <em>collection.</em>
        </h1>
        <p>
          Original paintings. Individual stories. A piece to make your space
          your own.
        </p>
      </div>
      <div className="shop-toolbar">
        <label className="search-field">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search for an artwork…"
            aria-label="Search by artwork name"
            value={search}
            onChange={(e) => update("search", e.target.value)}
          />
        </label>
        <div className="toolbar-right">
          <button
            className="button button-outline filter-toggle"
            aria-expanded={mobileFilters}
            aria-controls="shop-filters"
            onClick={() => setMobileFilters(!mobileFilters)}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          <label className="sort-label">
            Sort by{" "}
            <select
              value={sort}
              onChange={(e) => update("sort", e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>
      <div className="shop-layout">
        <aside
          id="shop-filters"
          className={`shop-filters ${mobileFilters ? "filters-open" : ""}`}
          aria-label="Artwork filters"
        >
          <div className="filter-heading">
            <h2>Refine your view</h2>
            <button
              className="icon-button filters-close"
              aria-label="Close filters"
              onClick={() => setMobileFilters(false)}
            >
              <X size={18} />
            </button>
          </div>
          <fieldset>
            <legend>Subject</legend>
            <label className="radio-label">
              <input
                type="radio"
                name="category"
                value=""
                checked={!category}
                onChange={() => update("category", "")}
              />
              All artworks <span>{artworks.length}</span>
            </label>
            {categories.map((c) => (
              <label className="radio-label" key={c}>
                <input
                  type="radio"
                  name="category"
                  value={c}
                  checked={category === c}
                  onChange={() => update("category", c)}
                />
                {categoryLabel(c)}
                <span>{artworks.filter((a) => a.category === c).length}</span>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Price range</legend>
            <div className="range-label">
              <span>Up to {formatINR(maxPrice)}</span>
            </div>
            <input
              aria-label="Maximum price in rupees"
              type="range"
              min="0"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => update("maxPrice", e.target.value)}
            />
            <div className="range-ends">
              <span>₹0</span>
              <span>₹5,000</span>
            </div>
          </fieldset>
          <label className="filter-select">
            Availability
            <select
              value={availability}
              onChange={(e) => update("availability", e.target.value)}
            >
              <option value="">All artworks</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>
          </label>
          <label className="filter-select">
            Medium
            <select
              value={medium}
              onChange={(e) => update("medium", e.target.value)}
            >
              <option value="">All mediums</option>
              <option value="Acrylic">Acrylic</option>
            </select>
          </label>
          {active && (
            <button
              className="text-link clear-filters"
              onClick={() => router.replace("/shop", { scroll: false })}
            >
              <X size={14} /> Clear all filters
            </button>
          )}
          <p className="filter-note">
            A small first collection.
            <br />
            All prices are provisional.
            <br />
            Original artwork photographs.
          </p>
        </aside>
        <div>
          <div className="results-heading">
            <p aria-live="polite">
              {results.length} {results.length === 1 ? "artwork" : "artworks"}
              {category ? ` · ${categoryLabel(category)}` : ""}
            </p>
            <span className="small muted">Handmade in acrylic</span>
          </div>
          {results.length ? (
            <div className="shop-grid">
              {results.map((a) => (
                <ArtworkCard artwork={a} key={a.id} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={30} strokeWidth={1} />
              <h2>A little more to discover.</h2>
              <p>
                {category === "Portraits"
                  ? "No original portraits are listed in this first collection. Explore a custom portrait, or browse another subject."
                  : "No paintings match this view. Try a different subject, a higher price limit, or clear your filters."}
              </p>
              <button
                className="button"
                onClick={() => router.replace("/shop")}
              >
                See all artworks
              </button>
              {category === "Portraits" && (
                <a href="/custom-portraits" className="text-link">
                  Explore custom portraits →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
