# Rat Race — V0 landing page

Marketing site for **Rat Race** — *"A rat race you can win."* / *"The MMO for money."*

This is **V0**: a validation landing page only. No app code, no backend, no
real signup endpoint yet. Its job is to prove people want Rat Race.

## Stack

- Next.js 15 (App Router), React 19, TypeScript — zero paid dependencies
- Fonts via `next/font/google`: **Fraunces** (display) + **Inter** (body)
- Plain CSS design system in `app/globals.css` (no CSS framework, minimal JS)

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also runs type check)
npm start        # serve the production build
```

Node ≥ 18.18 required.

## Project layout

```
landing/
├── app/
│   ├── layout.tsx      # fonts, metadata, <html> shell
│   ├── page.tsx        # the whole single-page site (nav → footer)
│   ├── globals.css     # brand tokens + all styling
│   └── icon.svg        # placeholder favicon (replace with real logo art)
├── components/
│   ├── Logo.tsx            # wordmark; renders real logo if present, text fallback otherwise
│   └── WaitlistCapture.tsx # email capture — STYLED PLACEHOLDER (see below)
├── public/
│   ├── favicon.svg     # placeholder favicon
│   └── brand/          # ← drop real logo files here (see "Logo assets")
├── ANALYTICS-HOOKS.md  # data attributes + `ratrace:waitlist-submit` event contract
├── DEPLOY.md           # Vercel deploy settings
└── README.md           # this file
```

## Logo assets

Real logo files live (or will live) at `~/workspace/rat-race-v0/brand/logo/`.
Copy them into `landing/public/brand/` before deploying:

- `landing/public/brand/logo.svg` — dark-mode wordmark/logo, ~34px tall

`components/Logo.tsx` shows the file when it exists and falls back to a
Fraunces text wordmark otherwise, so the page builds and looks right either way.
(`app/icon.svg` / `public/favicon.svg` are placeholders — replace with real
favicon art when available.)

## Wiring the real waitlist form (Tally)

`components/WaitlistCapture.tsx` is a **styled placeholder**: a polished inline
email form that submits nowhere. A big `TODO` comment in the file marks exactly
where to paste the Tally embed code (`TALLY-START` / `TALLY-END` markers).
When wiring it:

1. Paste the Tally embed between the markers.
2. Keep `data-analytics="waitlist-submit"` on the signup element.
3. Fire `window.dispatchEvent(new CustomEvent("ratrace:waitlist-submit"))` on
   successful signup (see `ANALYTICS-HOOKS.md`).
4. Delete the placeholder comment block once wired.

## Brand tokens (do not change without founder approval)

| Token | Value |
|---|---|
| Background | `#0A0A0B` |
| Surface | `#141416` / `#1C1C1F` |
| Text | `#F4F1E8` |
| Muted | `#9A958A` |
| Gold | `#C9A15C` |
| Gold bright | `#E5C87E` |
| Gold wash | `rgba(201,161,92,0.12)` |
| Hairlines | `rgba(244,241,232,0.10)` |

Layout: max width 1120px · 14px card radius · section padding 96–128px desktop / 64px mobile.

## Honesty rules for this page (V0)

- No fake user counts, no testimonials, no "trusted by" logos. Ever.
- Unknowns (launch date, pricing) are marked **TBD** in the FAQ.
- No trademark claims in the footer — just `© 2026 Rat Race`.
