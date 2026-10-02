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
  WELCOME_VIEW: "welcome_view",
  REFERRAL_COPY: "referral_copy",
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

/* ------------------------- PostHog product events ------------------------- */
/**
 * PostHog funnel events — exact names per the measurement plan.
 * Fires via posthog-js when initialized (see instrumentation-client.ts);
 * silently no-ops when the token is missing or the library failed to load.
 * Never put PII (emails, names) in event names or properties.
 */
import posthog from "posthog-js";

export const PH_EVENTS = {
  WAITLIST_STARTED: "waitlist_started",
  WAITLIST_JOINED: "waitlist_joined",
  UNLOCK_SELECTED: "unlock_selected",
  PROJECTION_VIEWED: "projection_viewed",
} as const;

/** True once posthog.init() has run with a token (client-side). */
function posthogReady(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const cfg = (posthog as unknown as { config?: { token?: string } }).config;
    return Boolean(cfg?.token);
  } catch {
    return false;
  }
}

/** Fire a PostHog product event. Safe anywhere client-side; no-ops otherwise. */
export function trackPostHog(
  name: string,
  props?: Record<string, unknown>,
): void {
  if (!posthogReady()) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.debug("[posthog:skip]", name, props ?? {});
    }
    return;
  }
  try {
    posthog.capture(name, props);
  } catch {
    /* analytics must never break the page */
  }
}

/** Current page's UTM params as a flat object ({} when none). */
export function currentUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  return out;
}

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
