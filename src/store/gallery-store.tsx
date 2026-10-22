"use client";
import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getArtworks } from "@/lib/catalogue";
import { addUniqueArtwork, restoreIds } from "@/lib/commerce";
import type { Artwork } from "@/types/artwork";

const catalogue = getArtworks();
const cartKey = "dilshad-cart-v1";
const wishlistKey = "dilshad-wishlist-v1";
interface Snapshot {
  cartIds: string[];
  wishlistIds: string[];
  ready: boolean;
  storageUnavailable: boolean;
}
const serverSnapshot: Snapshot = {
  cartIds: [],
  wishlistIds: [],
  ready: false,
  storageUnavailable: false,
};
let snapshot: Snapshot | null = null;
const listeners = new Set<() => void>();
function readStorage(): Snapshot {
  try {
    return {
      cartIds: restoreIds(
        localStorage.getItem(cartKey) ??
          localStorage.getItem("atelier-cart-v1"),
        catalogue,
        true,
      ),
      wishlistIds: restoreIds(
        localStorage.getItem(wishlistKey) ??
          localStorage.getItem("atelier-wishlist-v1"),
        catalogue,
      ),
      ready: true,
      storageUnavailable: false,
    };
  } catch {
    return {
      cartIds: [],
      wishlistIds: [],
      ready: true,
      storageUnavailable: true,
    };
  }
}
function getSnapshot() {
  if (!snapshot) snapshot = readStorage();
  return snapshot;
}
function getServerSnapshot() {
  return serverSnapshot;
}
function emit() {
  listeners.forEach((listener) => listener());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  function sync(event: StorageEvent) {
    if (!event.key || event.key === cartKey || event.key === wishlistKey) {
      snapshot = readStorage();
      emit();
    }
  }
  window.addEventListener("storage", sync);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", sync);
  };
}
function update(next: Snapshot) {
  snapshot = next;
  try {
    localStorage.setItem(cartKey, JSON.stringify(next.cartIds));
    localStorage.setItem(wishlistKey, JSON.stringify(next.wishlistIds));
  } catch {
    snapshot = { ...next, storageUnavailable: true };
  }
  emit();
}
interface GalleryState {
  cart: Artwork[];
  wishlist: Artwork[];
  ready: boolean;
  storageUnavailable: boolean;
  addToCart: (a: Artwork) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
}
const GalleryContext = createContext<GalleryState | null>(null);
export function GalleryProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const value: GalleryState = {
    cart: catalogue.filter(
      (a) => state.cartIds.includes(a.id) && a.status === "available",
    ),
    wishlist: catalogue.filter((a) => state.wishlistIds.includes(a.id)),
    ready: state.ready,
    storageUnavailable: state.storageUnavailable,
    addToCart: (art) => {
      const canonical = catalogue.find((a) => a.id === art.id);
      if (canonical) {
        const current = getSnapshot();
        update({
          ...current,
          cartIds: addUniqueArtwork(current.cartIds, canonical),
        });
      }
    },
    removeFromCart: (id) => {
      const current = getSnapshot();
      update({ ...current, cartIds: current.cartIds.filter((v) => v !== id) });
    },
    toggleWishlist: (id) => {
      if (!catalogue.some((a) => a.id === id)) return;
      const current = getSnapshot();
      update({
        ...current,
        wishlistIds: current.wishlistIds.includes(id)
          ? current.wishlistIds.filter((v) => v !== id)
          : [...current.wishlistIds, id],
      });
    },
  };
  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
}
export function useGallery() {
  const state = useContext(GalleryContext);
  if (!state) throw new Error("GalleryProvider is missing");
  return state;
}
