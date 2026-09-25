/**
 * components/Analytics.tsx
 * Mount once in the root layout. Loads the Umami tracking script and wires up
 * declarative click tracking via `data-analytics` attributes — so marketing
 * links need zero per-link code.
 *
 * Supported attributes (put on <a>, <button>, or <form>):
 *   data-analytics="waitlist-submit"   → event "waitlist_submit"
 *   data-analytics="survey-start"       → event "survey_start"
 *   data-analytics="social-x"           → event "social_click", { network: "x", url }
 *   data-analytics="social-instagram"  → event "social_click", { network: "instagram", url }
 *   data-analytics="social-tiktok"      → event "social_click", { network: "tiktok", url }
 *   data-analytics="social-threads"     → event "social_click", { network: "threads", url }
 *   data-analytics="social-youtube"     → event "social_click", { network: "youtube", url }
 *
 * Optional extras on the same element:
 *   data-analytics-placement="hero"     → added as the `placement` property
 *
 * For `waitlist_view`, use trackOnView() from lib/analytics.ts on the form
 * container (see snippet README) — clicks can't detect scrolling.
 */
"use client";

import Script from "next/script";
import { useEffect } from "react";

const SOCIAL_PREFIX = "social-";
const SOCIAL_NETWORKS = new Set([
  "x",
  "instagram",
  "tiktok",
  "threads",
  "youtube",
]);

function normalizeEvent(raw: string): {
  name: string;
  props: Record<string, unknown>;
} {
  const value = raw.trim().toLowerCase();
  if (value.startsWith(SOCIAL_PREFIX)) {
    const network = value.slice(SOCIAL_PREFIX.length);
    return {
      name: "social_click",
      props: SOCIAL_NETWORKS.has(network) ? { network } : { network: "unknown" },
    };
  }
  // "waitlist-submit" -> "waitlist_submit"
  return { name: value.replace(/-/g, "_"), props: {} };
}

export function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.(
        "[data-analytics]",
      ) as HTMLElement | null;
      if (!el || typeof window === "undefined") return;

      const raw = el.getAttribute("data-analytics");
      if (!raw) return;
      const { name, props } = normalizeEvent(raw);

      const placement = el.getAttribute("data-analytics-placement");
      if (placement) props.placement = placement;

      const href = el.getAttribute("href");
      if (href && name === "social_click") props.url = href;

      try {
        window.umami?.track(name, props);
      } catch {
        /* analytics must never break the page */
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Tally's embedded waitlist form announces submissions via postMessage
  // ({ event: "Tally.FormSubmitted" }) — clicks inside the iframe never reach
  // the document, so this is how waitlist_submit gets tracked.
  // The "ratrace:waitlist-submit" CustomEvent is the documented contract
  // (see landing/ANALYTICS-HOOKS.md) for any future non-iframe signup.
  useEffect(() => {
    const trackSubmit = (props: Record<string, unknown>) => {
      try {
        window.umami?.track("waitlist_submit", props);
      } catch {
        /* analytics must never break the page */
      }
    };

    const onMessage = (e: MessageEvent) => {
      let data: unknown = e.data;
      if (typeof data === "string") {
        if (!data.includes("Tally.FormSubmitted")) return;
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (
        typeof data === "object" &&
        data !== null &&
        (data as { event?: unknown }).event === "Tally.FormSubmitted"
      ) {
        trackSubmit({ placement: "hero" });
      }
    };

    const onCustomSubmit = (e: Event) => {
      const detail =
        (e as CustomEvent<Record<string, unknown>>).detail ?? {};
      trackSubmit({ placement: "hero", ...detail });
    };

    window.addEventListener("message", onMessage);
    window.addEventListener("ratrace:waitlist-submit", onCustomSubmit);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("ratrace:waitlist-submit", onCustomSubmit);
    };
  }, []);

  // No website ID configured (or ad-blocked) → render nothing, page still works.
  if (!websiteId) return null;

  return (
    <Script
      id="umami-analytics"
      strategy="afterInteractive"
      src="https://cloud.umami.is/script.js"
      data-website-id={websiteId}
      data-do-not-track
      data-auto-track="true"
    />
  );
}
