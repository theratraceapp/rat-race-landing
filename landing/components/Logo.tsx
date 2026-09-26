"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Brand wordmark with graceful fallback.
 *
 * Logo files live at `public/brand/` (Emberline · Ultraviolet, locked
 * 2026-09-26). If they are not present yet, this component renders a text
 * wordmark in the display face — the page builds and looks intentional
 * either way.
 *
 * To wire the real logo: place `logo.svg` (dark-mode artwork, ~40px tall)
 * at `landing/public/brand/logo.svg`.
 */
export default function Logo() {
  const [hasLogo, setHasLogo] = useState(true);

  // Reset on remount; the error handler below flips to the text fallback.
  useEffect(() => {
    setHasLogo(true);
  }, []);

  return (
    <a href="#top" className="wordmark" aria-label="Rat Race — back to top">
      {hasLogo ? (
        <Image
          src="/brand/logo.svg"
          alt="Rat Race"
          width={132}
          height={34}
          priority
          onError={() => setHasLogo(false)}
        />
      ) : (
        <span>Rat&nbsp;Race</span>
      )}
    </a>
  );
}
