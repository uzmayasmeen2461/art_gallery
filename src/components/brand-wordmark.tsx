"use client";
import Image from "next/image";
import { useState } from "react";
import { brand } from "@/config/brand";
import { assets } from "@/config/assets";

export function BrandWordmark() {
  const [failed, setFailed] = useState(false);
  return (
    <>
      {assets.logo && !failed ? (
        <div className="brand-lockup">
          <div className="brand-logo-frame">
            <Image
              src={assets.logo.src}
              width={assets.logo.width}
              height={assets.logo.height}
              alt={`${brand.name} official logo`}
              className="brand-logo"
              onError={() => setFailed(true)}
            />
          </div>
          <div className="brand-text">
            {brand.logoText}
            <span>{brand.tagline}</span>
          </div>
        </div>
      ) : (
        <>
          {brand.logoText}
          <span>{brand.tagline}</span>
        </>
      )}
    </>
  );
}
