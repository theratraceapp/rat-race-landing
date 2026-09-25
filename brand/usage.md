# Rat Race — Logo & Color Usage

Applies to every surface: landing page, product, social, og images, decks.

## The assets

| File | Use |
|---|---|
| `logo/logo-mark-gold-on-ink.png` | Primary mark. 1600×1600, gold on ink. Headers, hero, social avatars. |
| `logo/logo-wordmark.png` | Wordmark lockup: "Rat Race" + tagline. 1920×1280, gold on ink. Landing hero, og-adjacent placements, decks. |
| `logo/favicon.svg` | Vector mark (simplified geometry for small sizes). Browser tab, app icon source. |
| `logo/favicon-512.png` | 512×512 raster of the SVG geometry, transparent. PWA / touch icons. |
| `logo/og-image.png` | 1200×630 social share image: mark + wordmark + theratrace.app on ink. |

## Dark-first

Rat Race is a dark brand. The primary presentation of every logo asset is on
ink (`#0A0A0B`) or a dark surface. Design dark first; light surfaces are the
exception and must be justified per surface.

On light backgrounds: do not use the gold-on-ink rasters. Recolor the
`favicon.svg` geometry to ink (`#0A0A0B`) — never set gold type or the gold
mark on white (contrast fails and it reads cheap). If a light placement needs
the full wordmark, typeset it fresh in Fraunces, ink color, rather than
inverting the PNG.

## Clearspace & minimum size

- **Clearspace:** on all sides, at least the height of the rat's diamond body
  (the "x-height" of the mark). Nothing enters this zone — no type, no rules,
  no photography edges.
- **Minimum size, mark:** 24 px digital / 8 mm print. Below this, use
  `favicon.svg` (it was drawn for small sizes).
- **Minimum size, wordmark lockup:** 120 px wide digital. Below this, use the
  mark alone — never shrink the lockup until the tagline is illegible.
- The tagline is part of the lockup. Never separate "A rat race you can win."
  from the wordmark, reset it in another font, or use it as a standalone
  headline without the mark nearby.

## Gold discipline — gold is jewelry, not paint

Gold (`#C9A15C` / `#E5C87E`) earns attention by being rare. Aim for gold to
cover **no more than ~5% of any viewport**. Allowed uses:

1. **The mark itself** — always gold on ink, never recolored.
2. **The wordmark lockup** — as supplied.
3. **One display headline per screen**, maximum. Supporting headlines stay
   warm white (`#F4F1E8`). If everything is gold, nothing is.
4. **Interactive accents:** the active nav item, selected segment, focus ring,
   or the single hero number on a dashboard. One accent per component.
5. **Achievement moments:** milestone reached, goal completed, league
   promotion. Gold marks the moment — then goes quiet again.
6. **Primary CTA:** gold fill *or* gold text — never both on one screen, and
   never more than one gold button per view.

Never use gold for:

- Body copy, captions, or muted text (contrast and restraint both fail).
- Large fills: no gold section backgrounds, no gold cards, no gold page areas.
- Decorative patterns, dividers everywhere, or "premium-feeling" texture.
- Chart area fills — the highlight series may use `gold-wash`
  (`rgba(201,161,92,0.12)`) at most; lines stay thin.
- Borders on every card. Hairlines (`rgba(244,241,232,0.10)`) do the
  structural work; gold borders are reserved for the single featured element.

**League accents** (`#B08D57` → `#EDE6D6` across Climb / Freedom / Empire /
Dynasty) are even quieter: small markers, progress ticks, and labels only.
Never full-section backgrounds, never large type.

## Do's and don'ts

**Do**
- Place the mark on ink or dark photography with breathing room.
- Let whitespace do the premium work — generous spacing is part of the brand.
- Pair Fraunces headlines with Inter body; never substitute another serif for
  the wordmark's voice.
- Use `gold-wash` behind a highlighted stat instead of a gold fill.

**Don't**
- Don't rotate, stretch, outline, or add shadows/glow to the mark (the
  supplied glow in the artwork is part of the art, not a license to add more).
- Don't recolor the mark — no white version, no gradient version, no
  "fun" campaign colors.
- Don't place the mark on busy photography or clashing colors.
- Don't add cartoon elements, faces, or whiskers. The rat is abstract
  geometry; keep it that way.
- Don't typeset "Rat Race" in another font and call it the wordmark.
- Don't use ™ or ® anywhere — the name is not legally cleared.
- Don't imply the mark carries meaning it doesn't. It's a rat leaving a maze.
  That's the whole story, and it's enough.
