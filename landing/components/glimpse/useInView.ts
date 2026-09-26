"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useInView — true the first time the element scrolls into view.
 * Attach the ref to the phone frame; `inView` flips `.is-in` on it,
 * which starts the trajectory draw, marker pops, and bar sweeps
 * (all CSS — see globals.css).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.2,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}
