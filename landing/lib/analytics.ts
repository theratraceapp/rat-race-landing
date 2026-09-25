/**
 * lib/analytics.ts
 * Tiny, provider-agnostic event helper for the Rat Race landing page.
 *
 * Primary provider: Umami Cloud (free Hobby tier). The global `umami` object
 * is injected by the Umami tracking script rendered by <Analytics/>.
 *
 * Design rules:
 * - All tracking is a no-op when the provider script isn't loaded
 *   (ad-blocker, DNT, script not configured) — the page never breaks.
 * - Never put PII (emails, names) in event names or properties.
 * - Keep event names aligned with docs/analytics-plan.md §3.
 */

export type SocialNetwork = "x" | "instagram" | "tiktok" | "threads" | "youtube";

/** Canonical event names — import these instead of hard-coding strings. */
export const EVENTS = {
  WAITLIST_VIEW: "waitlist_view",
  WAITLIST_SUBMIT: "waitlist_submit",
  SURVEY_START: "survey_start",
  SOCIAL_CLICK: "social_click",
} as const;

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void;
    };
  }
}

/**
 * Fire a custom event. Safe to call anywhere (client components only).
 * No-ops on the server and when Umami isn't loaded.
 */
export function trackEvent(
  name: string,
  data?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  try {
    window.umami?.track(name, data);
  } catch {
    /* analytics must never break the page */
  }
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", name, data ?? {});
  }
}

/** Convenience wrappers (optional — you can call trackEvent directly). */
export const trackWaitlistSubmit = (placement = "hero") =>
  trackEvent(EVENTS.WAITLIST_SUBMIT, { placement });

export const trackSurveyStart = (placement = "hero") =>
  trackEvent(EVENTS.SURVEY_START, { placement });

export const trackSocialClick = (network: SocialNetwork, url: string) =>
  trackEvent(EVENTS.SOCIAL_CLICK, { network, url });

/**
 * Fire `eventName` once when `el` first scrolls into view.
 * Use for `waitlist_view` on the waitlist form container.
 *
 * Example:
 *   const ref = useRef<HTMLDivElement>(null);
 *   useEffect(() => trackOnView(ref.current, EVENTS.WAITLIST_VIEW, { placement: "hero" }), []);
 */
export function trackOnView(
  el: HTMLElement | null,
  eventName: string,
  data?: Record<string, unknown>,
): () => void {
  if (!el || typeof window === "undefined") return () => {};
  let fired = false;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !fired) {
          fired = true;
          trackEvent(eventName, data);
          observer.disconnect();
        }
      }
    },
    { threshold: 0.25 },
  );
  observer.observe(el);
  return () => observer.disconnect();
}
