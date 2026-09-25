# Analytics snippet — paste instructions

Drop-in code for the Rat Race landing page (Next.js App Router). Zero paid
dependencies, zero new npm packages (uses `next/script` only). No cookie banner
needed — Umami is cookieless (see `PRIVACY-NOTICE.md`).

> ⚠️ The landing page is being built in parallel at `~/workspace/rat-race-v0/landing/`.
> These files live in `docs/` on purpose — copy them into `landing/` only when the
> build agent is done with the relevant files, or coordinate to avoid conflicts.

## Prerequisites (founder, ~10 min)

1. Sign up for **Umami Cloud** (free Hobby tier) at cloud.umami.is.
2. Add website → domain `theratrace.app` → copy the **Website ID**.
3. In Vercel → project → Settings → Environment Variables, add:
   `NEXT_PUBLIC_UMAMI_WEBSITE_ID = <your-website-id>` (Production + Preview).
4. Redeploy (env vars need a fresh deploy to take effect).

## Step 1 — copy the files

From this folder, copy into the landing app (paths are relative to `landing/`):

| This folder | → Copy to |
|---|---|
| `lib/analytics.ts` | `landing/lib/analytics.ts` |
| `components/Analytics.tsx` | `landing/components/Analytics.tsx` |

No `npm install` needed.

## Step 2 — mount the component

In `landing/app/layout.tsx`, inside `<body>`, after the page children:

```tsx
import { Analytics } from "@/components/Analytics";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

This loads the Umami script (pageviews, referrers, UTMs — automatic) and
activates the delegated `data-analytics` click listener. If the env var is
missing or the script is blocked, everything silently no-ops.

## Step 3 — tag the interactive elements

Add attributes — **no JS needed** on the elements themselves:

```tsx
{/* Waitlist form: view is tracked via trackOnView on the container (see Step 4) */}
<form data-analytics="waitlist-submit" data-analytics-placement="hero" onSubmit={...}>
  ...
</form>

{/* Survey CTAs → Tally (keep the UTM params on the href!) */}
<a
  href="https://tally.so/r/<form-id>?utm_source=ratrace-landing&utm_medium=cta&utm_campaign=survey-v1"
  data-analytics="survey-start"
  data-analytics-placement="hero"
>
  Take the 2-min survey
</a>

{/* Social icons/links in the footer */}
<a href="https://x.com/theratraceapp?utm_source=ratrace-landing&utm_medium=social-footer"
   data-analytics="social-x" aria-label="X">…</a>
<a href="https://instagram.com/theratraceapp?utm_source=ratrace-landing&utm_medium=social-footer"
   data-analytics="social-instagram" aria-label="Instagram">…</a>
<a href="https://tiktok.com/@theratraceapp?utm_source=ratrace-landing&utm_medium=social-footer"
   data-analytics="social-tiktok" aria-label="TikTok">…</a>
<a href="https://threads.com/@theratraceapp?utm_source=ratrace-landing&utm_medium=social-footer"
   data-analytics="social-threads" aria-label="Threads">…</a>
<a href="https://youtube.com/@theratraceapp?utm_source=ratrace-landing&utm_medium=social-footer"
   data-analytics="social-youtube" aria-label="YouTube">…</a>
```

## Step 4 — track the waitlist form *view*

In the component that renders the waitlist form:

```tsx
"use client";
import { useEffect, useRef } from "react";
import { trackOnView, EVENTS } from "@/lib/analytics";

export function WaitlistForm() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(
    () => trackOnView(ref.current, EVENTS.WAITLIST_VIEW, { placement: "hero" }),
    []
  );
  return (
    <div ref={ref}>
      <form data-analytics="waitlist-submit" data-analytics-placement="hero" onSubmit={...}>
        {/* email input, submit button — never send the email to Umami */}
      </form>
    </div>
  );
}
```

## Step 5 — privacy notice

Copy `PRIVACY-NOTICE.md`'s paragraph into the footer (or a `/privacy` page).
One paragraph, plain language — that's the whole "consent" story since no
cookies are set.

## Step 6 — verify (after deploy)

1. Visit the deployed `theratrace.app` (use a normal browser, ad-blocker off).
2. Umami dashboard → Realtime: you should see yourself, then click the social
   icons / survey CTA / submit the form and watch the custom events land.
3. Umami → Insights → save the two funnels from `docs/analytics-plan.md` §6.

## Event reference

| `data-analytics` value | Umami event | Properties |
|---|---|---|
| `waitlist-submit` | `waitlist_submit` | `placement` |
| `survey-start` | `survey_start` | `placement` |
| `social-x` / `social-instagram` / `social-tiktok` / `social-threads` / `social-youtube` | `social_click` | `network`, `url` |
| (via `trackOnView`) | `waitlist_view` | `placement` |

New events later? Just call `trackEvent("my_event", { ... })` from
`lib/analytics.ts` — no component changes needed.
