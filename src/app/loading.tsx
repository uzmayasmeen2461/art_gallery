import { brand } from "@/config/brand";
export default function Loading() {
  return (
    <div className="container loading-state" role="status">
      <p className="eyebrow">{brand.name.toUpperCase()}</p>
      <h2 style={{ marginTop: 20 }}>Opening the gallery…</h2>
    </div>
  );
}
