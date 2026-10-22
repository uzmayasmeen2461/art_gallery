"use client";
import Link from "next/link";
import { BrandWordmark } from "@/components/brand-wordmark";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { brand } from "@/config/brand";
import { useGallery } from "@/store/gallery-store";
const links = [
  ["Home", "/"],
  ["Shop all art", "/shop"],
  ["Landscapes", "/shop?category=Landscapes"],
  ["Florals", "/shop?category=Florals"],
  ["Portraits", "/shop?category=Portraits"],
  ["About the artist", "/about"],
  ["Contact", "/contact"],
];
export function Header() {
  const path = usePathname();
  const { cart, wishlist } = useGallery();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [open]);
  function close() {
    setOpen(false);
    menuRef.current?.focus();
  }
  return (
    <>
      <div className="announcement">
        A little colour. A lasting connection.{" "}
        <span>
          Discover original handmade art <ArrowUpRight size={12} />
        </span>
      </div>
      <header className="site-header">
        <div className="header-inner container">
          <Link href="/" className="wordmark" aria-label={`${brand.name} home`}>
            <BrandWordmark />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                aria-current={path === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              href="/shop?search="
              className="icon-button"
              aria-label="Search artworks"
            >
              <Search size={19} />
            </Link>
            <Link
              href="/wishlist"
              className="icon-button"
              aria-label={`Wishlist, ${wishlist.length} artworks`}
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="count">{wishlist.length}</span>
              )}
            </Link>
            <Link
              href="/cart"
              className="icon-button"
              aria-label={`Shopping bag, ${cart.length} artworks`}
            >
              <ShoppingBag size={19} />
              {cart.length > 0 && <span className="count">{cart.length}</span>}
            </Link>
            <button
              ref={menuRef}
              className="icon-button mobile-menu-button"
              aria-label="Open navigation"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(true)}
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="mobile-overlay" onClick={close}>
          <div
            ref={panelRef}
            className="mobile-panel"
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Escape") close();
              if (e.key === "Tab") {
                const focusable =
                  panelRef.current?.querySelectorAll<HTMLElement>("a,button");
                if (!focusable?.length) return;
                const first = focusable[0],
                  last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                  e.preventDefault();
                  last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                  e.preventDefault();
                  first.focus();
                }
              }
            }}
          >
            <div className="panel-top">
              <span className="serif">{brand.name}</span>
              <button
                ref={closeRef}
                className="icon-button"
                onClick={close}
                aria-label="Close navigation"
              >
                <X />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {links.map(([label, href]) => (
                <Link key={label} href={href} onClick={close}>
                  {label}
                  <ArrowUpRight size={18} />
                </Link>
              ))}
            </nav>
            <p className="eyebrow">MADE BY HAND. CHOSEN BY HEART.</p>
          </div>
        </div>
      )}
    </>
  );
}
