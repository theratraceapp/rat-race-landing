import posthog from "posthog-js";

/**
 * instrumentation-client.ts — PostHog client initialization (Next.js 15.3+).
 *
 * Env required:
 *   NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN — PostHog project token (phc_...)
 *   NEXT_PUBLIC_POSTHOG_HOST          — e.g. https://us.i.posthog.com
 *
 * No-ops (with a console note in dev) when the token is missing so the page
 * never breaks in environments without analytics configured.
 */
const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

if (typeof window !== "undefined" && token) {
  posthog.init(token, {
    api_host: host,
    defaults: "2026-05-30",
    // Keep standard web analytics: $pageview, referrer, UTM params, sessions.
    capture_pageview: true,
    capture_pageleave: true,
  });
} else if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-console
  console.debug("[posthog] no NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN — analytics disabled");
}

export { posthog };
