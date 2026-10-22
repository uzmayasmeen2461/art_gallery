"use client";
import Image from "next/image";
import { Brush } from "lucide-react";
import { useState } from "react";
import { assets } from "@/config/assets";
export function ArtistPortrait() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="artist-placeholder">
      {assets.artistPortrait && !failed ? (
        <Image
          src={assets.artistPortrait}
          alt="The artist behind Dilshad Art Studio"
          fill
          sizes="(max-width: 760px) 90vw, 45vw"
          className="actual-art"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <div className="portrait-outline">
            <Brush size={37} strokeWidth={1} />
          </div>
          <span className="eyebrow">THE PERSON BEHIND THE PAINTINGS</span>
          <p>Artist portrait to follow</p>
          <span className="small muted">
            An authentic studio photograph will appear here.
          </span>
        </>
      )}
    </div>
  );
}
