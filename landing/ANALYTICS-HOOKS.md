# Analytics Hooks — Rat Race V0 landing

The page ships with stable, framework-agnostic hooks so an analytics plan
(PostHog, Plausible, Vercel Analytics, etc.) can be attached later without
touching component code. All hooks live in `landing/components/` and
`landing/app/page.tsx`.

## 1. Data attributes (recommended: bind events to these)

| Element | Attribute | Where |
|---|---|---|
| Waitlist form | `data-analytics="waitlist-submit"` | `components/WaitlistCapture.tsx` |
| Survey CTA ("Take the 3-minute survey") | `data-analytics="survey-start"` (+ `data-analytics-placement="help-shape"`) | "Building in public" section in `app/page.tsx`. Note: the button only renders once `SURVEY_URL` (top of `page.tsx`) is replaced with the real Tally survey link — no dead links while unbuilt. |
| X link | `data-analytics="social-x"` | Footer in `app/page.tsx` |
| Instagram link | `data-analytics="social-instagram"` | Footer in `app/page.tsx` |
| TikTok link | `data-analytics="social-tiktok"` | Footer in `app/page.tsx` |
| Threads link | `data-analytics="social-threads"` | Footer in `app/page.tsx` |
| YouTube link | `data-analytics="social-youtube"` | Footer in `app/page.tsx` |

A snippet to capture all of them with delegated listeners:

```js
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-analytics]");
  if (!el) return;
  track(el.dataset.analytics); // e.g. "social-x"
});

document.addEventListener("submit", (e) => {
  const form = e.target.closest?.('[data-analytics="waitlist-submit"]');
  if (form) track("waitlist-submit");
});
```

## 2. Window event name (custom event contract)

When a real waitlist signup completes (after the Tally embed is wired in),
fire this event:

```
ratrace:waitlist-submit
```

Canonical usage inside the signup success handler:

```js
window.dispatchEvent(new CustomEvent("ratrace:waitlist-submit", {
  detail: { source: "hero" }, // optional context
}));
```

The analytics layer listens once:

```js
window.addEventListener("ratrace:waitlist-submit", (e) => {
  track("waitlist-submit", e.detail);
});
```

Live wiring (2026-09-25): the single producer is
`components/WaitlistCapture.tsx` — it listens for Tally's postMessage
(`Tally.FormSubmitted`), fires this event with
`detail: { placement: "hero", referred: <bool> }` (`referred` = signup came
through a `?ref=` invite link), then navigates to `/welcome`. The single
listener lives in `components/Analytics.tsx` — do not add a second
postMessage listener or signups will double-count.

## 3. Suggested event taxonomy (for the future analytics plan)

- `waitlist-submit` — a signup was completed (primary conversion).
- `survey-start` — the "Take the 3-minute survey" CTA was clicked (validation funnel; see `docs/analytics-plan.md` §6 for UTM conventions).
- `social-x|instagram|tiktok|threads|youtube` — outbound social click.
- (future) `waitlist-view` — the capture block scrolled into view.
- (future) `faq-open` — which FAQ item was expanded.

## 4. Notes

- Attribute values are stable public API — do not rename them without
  updating the analytics plan.
- The current waitlist form is a styled placeholder (`components/WaitlistCapture.tsx`
  — see the TODO). Keep `data-analytics="waitlist-submit"` on the element that
  marks a signup when the Tally embed is pasted in, and fire
  `ratrace:waitlist-submit` from the embed's success callback if available.
