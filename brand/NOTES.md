# Brand kit — build notes (V0)

## What was cut or simplified

- **No extra logo color variants.** The brief's file list is shipped exactly:
  mark, wordmark lockup, favicon SVG + 512 PNG, og-image. Per the
  polish-over-quantity directive, I did not generate speculative extras
  (mono-white mark, light-background lockup, avatar crops). On light
  backgrounds, recolor the `favicon.svg` geometry to ink per `usage.md`.
- **No AI-generated favicon.** AI favicons render unpredictably at 16 px, so
  the favicon was hand-drawn as vector geometry (maze + faceted rat) and the
  512 PNG was rasterized from that same geometry programmatically
  (supersampled 4x, then downscaled). They match by construction.

## Font stand-ins

Fraunces and Inter are the brand typefaces, but neither is installed on this
machine and the V0 constraint is zero-cost / no font licensing actions from
here. Raster type in `og-image.png` uses the closest available stand-ins:
**Noto Serif Display** (headline) and **Noto Sans** (tagline/domain). Any
production surface (landing page, product) must load the real Fraunces +
Inter webfonts — see `tokens.json`. The AI-generated `logo-wordmark.png`
was art-directed toward a Fraunces-like high-contrast serif and is suitable
as the canonical lockup image.

## Asset provenance

- `logo-mark-gold-on-ink.png` — AI-generated (image pipeline), 1600×1600.
  Strong at screen sizes; for billboard/print scale, commission a vector
  redraw of this artwork before V1.
- `logo-wordmark.png` — AI-generated (image pipeline), 1920×1280. Typography
  inspected: spelling and letterspacing verified correct.
- `og-image.png` — composited locally (PIL): AI mark with its near-black
  background keyed out via corner-color distance, set in ink `#0A0A0B` with a
  restrained gold glow, Noto Serif Display / Noto Sans type, tagline
  auto-tracked to fit. 1200×630.
- `favicon.svg` / `favicon-512.png` — hand-authored geometry, no AI.

## Legal / honesty reminders (carried from the brief)

- The name "Rat Race" is **not legally cleared** — no ™/® anywhere, no
  trademark claims in copy or metadata.
- V0 honesty rule stands: no implied users, traction, or validation anywhere
  these assets appear. `og-image.png` carries only the mark, wordmark,
  tagline, and domain — no social proof.
