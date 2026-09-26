# INTERACTIVE-SHOWCASE.md — "See the app" vision-preview section

**Status:** proposal only. **DIFFS/SPEC ONLY — do not edit, build, or deploy the live site.**
A morning review verifies and ships.

**Extends:** `SPARK-TWEAKS.md` (the existing tweak package). Nothing here
contradicts it: this section is the interactive companion to SPARK-TWEAKS
§3's "First look" art showcase. Placement order after both packages:
`HowItWorks → Showcase (art) → AppGlimpse (interactive) → Leagues`.

**Hard bans respected throughout:** no signup counts, no mention of the
1,000-email validation gate or kill rule, no user/traction claims, never
the phrasing "wealth is a rate, not a balance." **Gold/black is DEAD** —
this section never references the old `--gold*` tokens; all styling runs
through the new `--rr-*` contract below. Honesty rule
(`brand/voice-and-tone.md`): no fake users, no fake proof — every number
in the demo is explicitly labeled example data, and the section never
claims a live app exists.

---

## (a) Section rationale

**Founder's bar:** the site must feel like *the app expressed as a
website* — same design system, same energy — and the visitor should leave
feeling they've already touched the product. Static mockup images can't
do that. So this section ships a **live HTML/CSS mini-app inside a phone
frame**: a tappable trajectory chart, real unlock cards with animated
progress, and a streak/badge game layer. Everything responds to hover,
focus, and tap.

**Why a phone frame:** it makes the "vision preview" framing
self-evident (this is clearly a product sketch, not the marketing page
wearing a costume), and it constrains the demo to app-realistic density.
Beside it, three annotation cards narrate the systems for scanners.

**Rebrand-safe by construction:** the winner isn't picked, so the
section is styled *entirely* through the `--rr-*` token contract (§b).
The interim defaults use the lead-horse direction (playful-alive) —
which means, pre-pick, this section renders as a cream "step into the
app" band on the page: a deliberate early taste of the coming rebrand.
When the winner lands, one token swap re-skins it with zero structural
changes.

**Honesty architecture (load-bearing):**
- Section head carries a permanent `Vision preview · Coming soon` pill.
- The phone's app bar carries a `Sample race` pill; fine print under the
  phone reads *"Interactive sketch · example data — the app is still
  being built."*
- Demo persona is never a person — it's labeled "Sample race" (a
  scenario, not a user). No names, no avatars, no fake testimonials.
- Copy never says "try the app" / "the app" as if live — always
  "the coming app", "preview", "sketch".

**What the visitor can do (all real, all in the demo):**
1. **Trajectory chart** — SVG line draws itself on scroll into view;
   three unlock markers pop in along the curve; hover/focus/tap a
   marker reveals its projected date (CSS tooltip on hover/focus, rich
   pinned tooltip on tap for touch).
2. **Unlock cards** — real HTML/CSS trophy cards in a swipeable
   snap-row; progress bars sweep to their % on view; tapping a card
   expands a "what moves this date" pace line (grid-rows animation,
   same technique as the FAQ in SPARK-TWEAKS M7).
3. **Streak & badges** — tappable streak counter (tap cycles a
   motivational line with a springy bounce), 8-week dot strip, badge
   row with earned (tap → celebratory pop) vs locked (tap → gentle
   nudge + "locked" hint) states.

---

## (b) Token contract + per-direction values

### The contract

Every `--rr-*` token is set on the section root (`.app-glimpse`) and
inherited by everything inside. **Component code must never use a raw
hex, never touch the legacy `--gold*` tokens, and never assume a
direction.** `color-mix()` is allowed (already used in `globals.css`).

| Token | Role |
|---|---|
| `--rr-bg` | Section band background |
| `--rr-surface` | Cards, phone frame, tooltips' light surfaces |
| `--rr-surface-2` | Inset wells (chart backdrop, tracks) |
| `--rr-text` | Primary text |
| `--rr-muted` | Secondary text |
| `--rr-primary` | Primary accent: trajectory line, progress fills, active markers, key actions |
| `--rr-primary-ink` | Text/icons drawn *on* the primary accent |
| `--rr-primary-deep` | Darkened primary, derived for **text contrast** on light surfaces (kickers, medal glyphs, flag) |
| `--rr-secondary` | Celebration accent: active marker state, flame, tooltip highlights — used sparingly |
| `--rr-positive` | Growth/positive (week dots, earned states) |
| `--rr-hairline` | Borders |
| `--rr-track` | Progress-bar tracks, empty week dots |
| `--rr-radius` | Card radius |
| `--rr-shadow` | Card/phone shadow |
| `--rr-font-display` | Display face (headings, big numbers) |
| `--rr-font-body` | Body/UI face |
| `--rr-font-hand` | Handwritten annotation face (wildcard only; falls back to body elsewhere) |

### Interim defaults (playful-alive — the lead horse)

Applied on `.app-glimpse` in the shipped CSS. These are **interim**:
the morning pick either confirms them or swaps the block per §Rollout.

```css
.app-glimpse {
  --rr-bg: #fff6e5;
  --rr-surface: #fffdf8;
  --rr-surface-2: #f9ecd4;
  --rr-text: #23232b;
  --rr-muted: rgba(35, 35, 43, 0.64);
  --rr-primary: #f5b841;
  --rr-primary-ink: #23232b;
  --rr-primary-deep: #a86e0b;
  --rr-secondary: #f0857a;
  --rr-positive: #9dbe8c;
  --rr-hairline: rgba(35, 35, 43, 0.14);
  --rr-track: rgba(35, 35, 43, 0.1);
  --rr-radius: 18px;
  --rr-shadow: 0 18px 48px rgba(35, 35, 43, 0.14);
  --rr-font-display: "Baloo 2", "Nunito", var(--font-body);
  --rr-font-body: var(--font-body);
  --rr-font-hand: var(--font-body);
}
```

> Font note: `"Baloo 2"` / `"Nunito"` are **not** loaded in
> `app/layout.tsx` today — the stack degrades gracefully to Inter until
> the rebrand rollout adds the winner's faces (see §Rollout).

### Per-direction overrides

Set `data-rr-brand="refined-premium" | "playful-alive" | "wildcard"` on
`<html>` (or `<main>`) at rollout; the winner's block below re-skins the
section with no code changes. `playful-alive` matches the interim
defaults above and is listed for the record.

```css
/* refined-premium — "expensive, not flashy" */
[data-rr-brand="refined-premium"] .app-glimpse {
  --rr-bg: #faf7f0;
  --rr-surface: #fffdf8;
  --rr-surface-2: #f3ecdd;
  --rr-text: #1a1a18;
  --rr-muted: #8a8f98;
  --rr-primary: #b08d57;
  --rr-primary-ink: #fffdf8;
  --rr-primary-deep: #8a6a3b;
  --rr-secondary: #8a8f98;
  --rr-positive: #b08d57;
  --rr-hairline: #e9e2d2;
  --rr-track: #e9e2d2;
  --rr-radius: 14px;
  --rr-shadow: 0 18px 44px rgba(26, 26, 24, 0.1);
  --rr-font-display: var(--font-display);
  --rr-font-body: var(--font-body);
  --rr-font-hand: var(--font-body);
}

/* playful-alive — matches interim defaults (no override needed) */

/* wildcard — "the trajectory journal" */
[data-rr-brand="wildcard"] .app-glimpse {
  --rr-bg: #f4edde;
  --rr-surface: #fbf6e9;
  --rr-surface-2: #efe4cb;
  --rr-text: #14120e;
  --rr-muted: #6b6455;
  --rr-primary: #a67c3d;
  --rr-primary-ink: #fffdf6;
  --rr-primary-deep: #7e5c26;
  --rr-secondary: #c0392b;
  --rr-positive: #a67c3d;
  --rr-hairline: rgba(20, 18, 14, 0.16);
  --rr-track: rgba(20, 18, 14, 0.1);
  --rr-radius: 10px;
  --rr-shadow: 0 14px 36px rgba(20, 18, 14, 0.12);
  --rr-font-display: "Playfair Display", Georgia, serif;
  --rr-font-body: var(--font-body);
  --rr-font-hand: "Caveat", cursive;
}
```

**Direction-specific behavior notes (no extra code paths):**
- *refined-premium:* restraint does the work — the bronze line draws
  slowly, markers are quiet dots, the flame is bronze, nothing loops
  (see motion spec G7). Do **not** add `.motion-playful`.
- *playful-alive:* add `motion-playful` to `<main>` (per SPARK-TWEAKS
  §6) to enable the gentle looping micro-motion (G7) — flame float,
  current-week pulse.
- *wildcard:* the chart's "you are here" annotation renders in
  `--rr-font-hand` (Caveat) — the journal's margin-note voice. The
  signal-red `--rr-secondary` appears only on the finish flag.

---

## (c) Component code

### New file — `components/glimpse/useInView.ts`

One-shot IntersectionObserver hook (same pattern as `Reveal.tsx`, but
returns state for driving CSS class toggles like the chart draw-on).

```ts
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useInView — true the first time the element scrolls into view.
 * Attach the ref to the phone frame; `inView` flips `.is-in` on it,
 * which starts the trajectory draw, marker pops, and bar sweeps
 * (all CSS — see globals.css diff).
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
```

### New file — `components/AppGlimpse.tsx`

The full section. Sub-widgets are co-located (one file, ~340 lines) so
the demo reads as a single unit; styles live in `globals.css` per repo
convention. All demo data is behind the `Sample race` label — no fake
users, no fake proof.

```tsx
"use client";

import { useState, type CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { useInView } from "./glimpse/useInView";

/**
 * AppGlimpse — "See the app" vision-preview section.
 *
 * A live HTML/CSS mini-app in a phone frame: tappable trajectory chart,
 * unlock cards with animated progress, streak + badge game layer.
 * HONESTY: every number is example data (labeled "Sample race"); the
 * section never claims a live app exists.
 *
 * STYLING: exclusively via the --rr-* token contract (see
 * INTERACTIVE-SHOWCASE.md §b). No raw hex, no legacy --gold* tokens.
 */

/* ------------------------------- demo data ------------------------------- */
/* Example scenario only — explicitly labeled "Sample race" in the UI. */

const MARKERS = [
  {
    id: "m1",
    name: "First $100K",
    date: "Jun 2028",
    blurb: "The foundation unlock — momentum starts compounding here.",
    x: 43.6,
    y: 65.3,
    edge: false,
    flag: false,
  },
  {
    id: "m2",
    name: "Debt-Free",
    date: "Mar 2030",
    blurb: "Every dollar you earn stays yours.",
    x: 70.3,
    y: 37.2,
    edge: false,
    flag: false,
  },
  {
    id: "m3",
    name: "Work Optional",
    date: "Jun 2032",
    blurb: "The finish line this race is drawn toward.",
    x: 93.75,
    y: 17.2,
    edge: true,
    flag: true,
  },
] as const;

const UNLOCKS = [
  {
    id: "u1",
    name: "First $100K",
    pct: 72,
    date: "Jun 2028",
    pace: "At this pace — 14 months sooner with an extra $200/mo.",
  },
  {
    id: "u2",
    name: "Debt-Free",
    pct: 34,
    date: "Mar 2030",
    pace: "At this pace — the last stretch is the slowest, and it still counts.",
  },
  {
    id: "u3",
    name: "Work Optional",
    pct: 12,
    date: "Jun 2032",
    pace: "At this pace — this is the date the whole race is drawn toward.",
  },
] as const;

const BADGES = [
  { id: "b1", name: "First $10K", earned: true, glyph: "star" },
  { id: "b2", name: "3-Month Streak", earned: true, glyph: "flame" },
  { id: "b3", name: "Debt Slayer", earned: true, glyph: "bolt" },
  { id: "b4", name: "First $100K", earned: false, glyph: "lock" },
  { id: "b5", name: "1-Year Streak", earned: false, glyph: "lock" },
  { id: "b6", name: "Work Optional", earned: false, glyph: "lock" },
] as const;

const WEEKS = [true, true, true, true, true, true, true, false] as const;

const STREAK_LINES = [
  "12 weeks. The habit is the win.",
  "Tap in weekly to keep it alive.",
  "Streaks beat motivation — every time.",
] as const;

const NOTES = [
  {
    n: "01",
    title: "The trajectory, drawn",
    body: "One line with every goal on it. Hover or tap a marker to reveal its projected date — the whole app starts here.",
  },
  {
    n: "02",
    title: "Unlock cards",
    body: "Milestones with dates, not balances. Each card carries its projected date and progress — tap one to see what could move it sooner.",
  },
  {
    n: "03",
    title: "Streaks & badges",
    body: "The game layer. Weekly check-ins keep the streak alive; badges mark the moments worth celebrating. Go ahead — tap them.",
  },
] as const;

/* --------------------------------- icons --------------------------------- */

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2.5l2.85 6.1 6.65.75-4.95 4.5 1.35 6.55L12 17.25l-5.9 3.15 1.35-6.55-4.95-4.5 6.65-.75L12 2.5z"
      />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2c.9 3.8-4.2 5.9-4.2 10.6a4.2 4.2 0 008.4 0c0-1.9-1-3.4-2-4.8-.5 1.4-1.4 2-1.4 2 .1-2.4-.3-5.4-.8-7.8zM12 22a6.5 6.5 0 01-6.5-6.5c0-.4 0-.8.1-1.1C4.6 15.6 4 17 4 18.5A8 8 0 0012 22z"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M13 2L4.5 13.5H11L9.5 22 19 10h-6.5L13 2z"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2a4 4 0 00-4 4v3H7a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2v-9a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 7V6a2 2 0 114 0v3h-4z"
      />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg
      className="glimpse-flag"
      viewBox="0 0 16 20"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3.5 1.5v17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M3.5 2.5h9.5l-2.4 3.2 2.4 3.2H3.5z" fill="currentColor" />
    </svg>
  );
}

function glyphFor(glyph: string) {
  if (glyph === "flame") return <FlameIcon />;
  if (glyph === "bolt") return <BoltIcon />;
  return <StarIcon />;
}

/* ------------------------------ trajectory ------------------------------ */

const CHART_PATH = "M 40 300 C 180 290, 260 250, 340 200 S 500 100, 600 62";

function TrajectoryDemo({
  activeMarker,
  onMarker,
}: {
  activeMarker: string | null;
  onMarker: (id: string | null) => void;
}) {
  return (
    <figure className="glimpse-chart">
      <svg viewBox="0 0 640 360" aria-hidden="true" focusable="false">
        {[70, 140, 210, 280].map((y) => (
          <line key={y} x1="40" y1={y} x2="600" y2={y} className="glimpse-grid" />
        ))}
        <path d={`${CHART_PATH} L 600 360 L 40 360 Z`} className="glimpse-area" />
        <path d={CHART_PATH} className="glimpse-path" pathLength={1} fill="none" />
        <circle cx="40" cy="300" r="5" className="glimpse-origin" />
        <text x="40" y="328" className="glimpse-axis-label">
          today
        </text>
        <text x="40" y="120" className="glimpse-hand-note">
          you are here
        </text>
      </svg>

      {MARKERS.map((m, i) => (
        <button
          key={m.id}
          type="button"
          className={`glimpse-marker${m.flag ? " is-flag" : ""}${
            activeMarker === m.id ? " is-active" : ""
          }`}
          style={{ left: `${m.x}%`, top: `${m.y}%`, transitionDelay: `${0.9 + i * 0.18}s` }}
          data-tip={`${m.name} · ${m.date}`}
          aria-label={`${m.name} — projected ${m.date}. Activate to pin details.`}
          aria-expanded={activeMarker === m.id}
          onClick={() => onMarker(activeMarker === m.id ? null : m.id)}
          onKeyDown={(e) => {
            if (e.key === "Escape") onMarker(null);
          }}
          data-analytics="glimpse-interact"
          data-analytics-placement="trajectory-marker"
        >
          {m.flag && <FlagIcon />}
        </button>
      ))}

      {MARKERS.map(
        (m) =>
          activeMarker === m.id && (
            <div
              key={m.id}
              className={`glimpse-tip${m.edge ? " is-edge" : ""}`}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
              role="status"
            >
              <strong>{m.name}</strong>
              <span className="glimpse-tip-date">Projected · {m.date}</span>
              <span className="glimpse-tip-blurb">{m.blurb}</span>
            </div>
          ),
      )}
      <figcaption className="glimpse-chart-cap">
        Example trajectory — hover or tap a marker
      </figcaption>
    </figure>
  );
}

/* ------------------------------- unlocks -------------------------------- */

function UnlockCards({
  openCard,
  onCard,
}: {
  openCard: string | null;
  onCard: (id: string | null) => void;
}) {
  return (
    <div className="glimpse-unlocks" role="list" aria-label="Unlock cards — example data">
      {UNLOCKS.map((u, i) => (
        <div role="listitem" key={u.id}>
          <button
            type="button"
            className={`glimpse-card${openCard === u.id ? " is-open" : ""}`}
            aria-expanded={openCard === u.id}
            aria-label={`${u.name}, ${u.pct} percent, projected ${u.date}. Activate to see what moves this date.`}
            onClick={() => onCard(openCard === u.id ? null : u.id)}
            data-analytics="glimpse-interact"
            data-analytics-placement="unlock-card"
          >
            <span className="glimpse-medal" aria-hidden="true">
              <StarIcon />
            </span>
            <span className="glimpse-card-top">
              <span className="glimpse-card-name">{u.name}</span>
              <span className="glimpse-card-pct">{u.pct}%</span>
            </span>
            <span className="glimpse-bar" aria-hidden="true">
              <span
                className="glimpse-fill"
                style={
                  {
                    "--pct": u.pct / 100,
                    transitionDelay: `${0.15 + i * 0.14}s`,
                  } as CSSProperties
                }
              />
            </span>
            <span className="glimpse-card-date">Projected · {u.date}</span>
            <span className="glimpse-pace">
              <span>{u.pace}</span>
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------- streak + badges ---------------------------- */

function StreakAndBadges() {
  const [streakTaps, setStreakTaps] = useState(0);
  const [popped, setPopped] = useState<string | null>(null);
  const [nudged, setNudged] = useState<string | null>(null);

  return (
    <>
      <button
        type="button"
        className="glimpse-streak"
        onClick={() => setStreakTaps((t) => t + 1)}
        aria-label={`12-week streak. Activate to cycle streak notes. Currently: ${STREAK_LINES[streakTaps % STREAK_LINES.length]}`}
        data-analytics="glimpse-interact"
        data-analytics-placement="streak"
      >
        <span key={streakTaps} className="glimpse-burst">
          <span className="glimpse-flame" aria-hidden="true">
            <FlameIcon />
          </span>
          <strong className="glimpse-streak-num">12</strong>
          <span className="glimpse-streak-word">week streak</span>
        </span>
        <span className="glimpse-streak-line">
          {STREAK_LINES[streakTaps % STREAK_LINES.length]}
        </span>
        <span className="glimpse-weeks" aria-hidden="true">
          {WEEKS.map((done, i) => (
            <span
              key={i}
              className={`glimpse-week${done ? " is-done" : " is-now"}`}
            />
          ))}
        </span>
        <span className="sr-only">7 of the last 8 weeks logged</span>
      </button>

      <div className="glimpse-badges" role="list" aria-label="Achievements — 3 earned, 3 locked. Example data.">
        {BADGES.map((b) => (
          <div role="listitem" key={b.id}>
            <button
              type="button"
              className={`glimpse-badge${b.earned ? " is-earned" : " is-locked"}${
                popped === b.id ? " is-popped" : ""
              }${nudged === b.id ? " is-nudged" : ""}`}
              aria-label={b.earned ? `${b.name} — earned` : `${b.name} — locked`}
              onClick={() => {
                if (b.earned) setPopped(b.id);
                else setNudged(b.id);
              }}
              onAnimationEnd={() => {
                setPopped(null);
                setNudged(null);
              }}
              data-analytics="glimpse-interact"
              data-analytics-placement="badge"
            >
              <span className="glimpse-badge-glyph" aria-hidden="true">
                {b.earned ? glyphFor(b.glyph) : <LockIcon />}
              </span>
              <span className="glimpse-badge-name">{b.name}</span>
              {nudged === b.id && !b.earned && (
                <span className="glimpse-badge-hint">
                  Locked — hit the milestone to earn it
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

/* -------------------------------- section -------------------------------- */

export default function AppGlimpse() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [openCard, setOpenCard] = useState<string | null>(null);

  return (
    <section className="block app-glimpse" aria-labelledby="glimpse-heading">
      <div className="container">
        <Reveal>
          <div className="glimpse-kicker-row">
            <p className="kicker">See the app</p>
            <span className="glimpse-vision">Vision preview · Coming soon</span>
          </div>
          <div className="section-head">
            <h2 id="glimpse-heading">
              A glimpse of the <span className="glimpse-accent">race to come.</span>
            </h2>
            <p>
              An interactive sketch of the coming Rat Race app — the
              trajectory view, unlock cards, and streaks, running on example
              data. Poke around: everything here responds.
            </p>
          </div>
        </Reveal>

        <div className="glimpse-layout">
          <Reveal className="glimpse-phone-wrap">
            <div
              ref={ref}
              className={`glimpse-phone${inView ? " is-in" : ""}`}
            >
              <div className="glimpse-appbar">
                <span className="glimpse-appname">Rat Race</span>
                <span className="glimpse-sample">Sample race</span>
              </div>
              <StreakAndBadges />
              <TrajectoryDemo activeMarker={activeMarker} onMarker={setActiveMarker} />
              <UnlockCards openCard={openCard} onCard={setOpenCard} />
            </div>
            <p className="glimpse-fineprint">
              Interactive sketch · example data — the app is still being built.
            </p>
          </Reveal>

          <div className="glimpse-notes">
            {NOTES.map((n, i) => (
              <Reveal key={n.n} delay={i * 0.08}>
                <article className="glimpse-note">
                  <span className="glimpse-note-n" aria-hidden="true">
                    {n.n}
                  </span>
                  <div>
                    <h3>{n.title}</h3>
                    <p>{n.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## (d) Unified diffs

### Diff — `app/page.tsx` (import + placement)

```diff
--- a/app/page.tsx
+++ b/app/page.tsx
@@ imports
 import Logo from "../components/Logo";
 import WaitlistCapture from "../components/WaitlistCapture";
 import Trajectory from "../components/Trajectory";
+import AppGlimpse from "../components/AppGlimpse";
 import { Reveal, ScrollChrome } from "../components/Reveal";
```

```diff
--- a/app/page.tsx
+++ b/app/page.tsx
@@ Page()
       <main>
         <Hero />
         <Problem />
         <HowItWorks />
+        <AppGlimpse />
         <Leagues />
         <AloneTogether />
         <BuildingInPublic />
         <Faq />
       </main>
```

**Merge note with SPARK-TWEAKS:** that package inserts `<Showcase />`
between `<HowItWorks />` and `<Leagues />`. Apply both and order the
section as `HowItWorks → Showcase (concept art) → AppGlimpse
(interactive) → Leagues`: art first, then the thing you can touch.

### Diff — `app/globals.css` (append; no existing rules touched)

Append at end of file. All selectors are scoped under `.app-glimpse`
so nothing leaks into the rest of the page. Interim token defaults are
the playful-alive values (§b); `data-rr-brand` overrides re-skin them.

```diff
--- a/app/globals.css
+++ b/app/globals.css
@@ end of file
+/* ============================================================
+   INTERACTIVE-SHOWCASE — "See the app" vision-preview section.
+   Styled EXCLUSIVELY through the --rr-* token contract (§b of
+   INTERACTIVE-SHOWCASE.md). Interim defaults = playful-alive (lead
+   horse); the rebrand winner swaps them via [data-rr-brand].
+   Never reference legacy --gold* tokens here — gold/black is dead.
+   ============================================================ */
+
+.app-glimpse {
+  --rr-bg: #fff6e5;
+  --rr-surface: #fffdf8;
+  --rr-surface-2: #f9ecd4;
+  --rr-text: #23232b;
+  --rr-muted: rgba(35, 35, 43, 0.64);
+  --rr-primary: #f5b841;
+  --rr-primary-ink: #23232b;
+  --rr-primary-deep: #a86e0b;
+  --rr-secondary: #f0857a;
+  --rr-positive: #9dbe8c;
+  --rr-hairline: rgba(35, 35, 43, 0.14);
+  --rr-track: rgba(35, 35, 43, 0.1);
+  --rr-radius: 18px;
+  --rr-shadow: 0 18px 48px rgba(35, 35, 43, 0.14);
+  --rr-font-display: "Baloo 2", "Nunito", var(--font-body);
+  --rr-font-body: var(--font-body);
+  --rr-font-hand: var(--font-body);
+
+  background: var(--rr-bg);
+  color: var(--rr-text);
+  border-top-color: var(--rr-hairline);
+}
+
+/* per-direction re-skins — set data-rr-brand on <html> at rollout */
+[data-rr-brand="refined-premium"] .app-glimpse {
+  --rr-bg: #faf7f0;
+  --rr-surface: #fffdf8;
+  --rr-surface-2: #f3ecdd;
+  --rr-text: #1a1a18;
+  --rr-muted: #8a8f98;
+  --rr-primary: #b08d57;
+  --rr-primary-ink: #fffdf8;
+  --rr-primary-deep: #8a6a3b;
+  --rr-secondary: #8a8f98;
+  --rr-positive: #b08d57;
+  --rr-hairline: #e9e2d2;
+  --rr-track: #e9e2d2;
+  --rr-radius: 14px;
+  --rr-shadow: 0 18px 44px rgba(26, 26, 24, 0.1);
+  --rr-font-display: var(--font-display);
+  --rr-font-body: var(--font-body);
+  --rr-font-hand: var(--font-body);
+}
+
+[data-rr-brand="wildcard"] .app-glimpse {
+  --rr-bg: #f4edde;
+  --rr-surface: #fbf6e9;
+  --rr-surface-2: #efe4cb;
+  --rr-text: #14120e;
+  --rr-muted: #6b6455;
+  --rr-primary: #a67c3d;
+  --rr-primary-ink: #fffdf6;
+  --rr-primary-deep: #7e5c26;
+  --rr-secondary: #c0392b;
+  --rr-positive: #a67c3d;
+  --rr-hairline: rgba(20, 18, 14, 0.16);
+  --rr-track: rgba(20, 18, 14, 0.1);
+  --rr-radius: 10px;
+  --rr-shadow: 0 14px 36px rgba(20, 18, 14, 0.12);
+  --rr-font-display: "Playfair Display", Georgia, serif;
+  --rr-font-body: var(--font-body);
+  --rr-font-hand: "Caveat", cursive;
+}
+
+/* ---------- section chrome (scoped) ---------- */
+
+.app-glimpse h2 {
+  color: var(--rr-text);
+  font-family: var(--rr-font-display);
+}
+
+.app-glimpse .section-head > p {
+  color: var(--rr-muted);
+}
+
+.app-glimpse .kicker {
+  color: var(--rr-primary-deep);
+  margin-bottom: 0;
+}
+
+.app-glimpse :is(a, button):focus-visible {
+  outline-color: var(--rr-primary-deep);
+}
+
+.glimpse-kicker-row {
+  display: flex;
+  align-items: center;
+  gap: 14px;
+  flex-wrap: wrap;
+  margin-bottom: 18px;
+}
+
+.glimpse-vision {
+  display: inline-flex;
+  align-items: center;
+  gap: 8px;
+  font-size: 0.76rem;
+  font-weight: 700;
+  letter-spacing: 0.14em;
+  text-transform: uppercase;
+  color: var(--rr-primary-deep);
+  border: 1px solid color-mix(in srgb, var(--rr-primary) 55%, transparent);
+  background: color-mix(in srgb, var(--rr-primary) 14%, transparent);
+  padding: 8px 16px;
+  border-radius: 999px;
+}
+
+.glimpse-accent {
+  color: var(--rr-primary-deep);
+}
+
+.glimpse-layout {
+  display: grid;
+  gap: 48px;
+}
+
+@media (min-width: 960px) {
+  .glimpse-layout {
+    grid-template-columns: minmax(0, 400px) minmax(0, 1fr);
+    align-items: start;
+  }
+  .glimpse-phone-wrap {
+    position: sticky;
+    top: 96px;
+  }
+}
+
+.glimpse-fineprint {
+  margin: 14px 4px 0;
+  font-size: 0.82rem;
+  color: var(--rr-muted);
+  text-align: center;
+}
+
+/* ---------- phone frame ---------- */
+
+.glimpse-phone {
+  background: var(--rr-surface);
+  border: 1px solid var(--rr-hairline);
+  border-radius: 28px;
+  box-shadow: var(--rr-shadow);
+  padding: 18px;
+  display: grid;
+  gap: 16px;
+}
+
+.glimpse-appbar {
+  display: flex;
+  align-items: center;
+  justify-content: space-between;
+  padding: 2px 4px 0;
+}
+
+.glimpse-appname {
+  font-family: var(--rr-font-display);
+  font-weight: 700;
+  font-size: 1.05rem;
+  color: var(--rr-text);
+  letter-spacing: 0.01em;
+}
+
+.glimpse-sample {
+  font-size: 0.72rem;
+  font-weight: 700;
+  letter-spacing: 0.12em;
+  text-transform: uppercase;
+  color: var(--rr-primary-deep);
+  border: 1px dashed color-mix(in srgb, var(--rr-primary) 60%, transparent);
+  background: color-mix(in srgb, var(--rr-primary) 12%, transparent);
+  padding: 5px 12px;
+  border-radius: 999px;
+}
+
+/* ---------- streak ---------- */
+
+.glimpse-streak {
+  display: grid;
+  gap: 10px;
+  text-align: left;
+  width: 100%;
+  font: inherit;
+  color: inherit;
+  cursor: pointer;
+  background: linear-gradient(
+    180deg,
+    color-mix(in srgb, var(--rr-primary) 16%, var(--rr-surface)),
+    var(--rr-surface)
+  );
+  border: 1px solid var(--rr-hairline);
+  border-radius: var(--rr-radius);
+  padding: 16px;
+  transition: transform 0.18s ease, border-color 0.2s ease;
+}
+
+.glimpse-streak:hover {
+  border-color: color-mix(in srgb, var(--rr-primary) 60%, transparent);
+}
+
+.glimpse-streak:active {
+  transform: scale(0.985);
+}
+
+.glimpse-burst {
+  display: inline-flex;
+  align-items: center;
+  gap: 10px;
+  animation: glimpse-burst 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
+}
+
+@keyframes glimpse-burst {
+  0% { transform: scale(0.92); }
+  55% { transform: scale(1.05); }
+  100% { transform: scale(1); }
+}
+
+.glimpse-flame {
+  width: 30px;
+  height: 30px;
+  color: var(--rr-secondary);
+  display: inline-grid;
+  place-items: center;
+}
+
+.glimpse-flame svg {
+  width: 100%;
+  height: 100%;
+}
+
+.motion-playful .glimpse-flame {
+  animation: glimpse-float 3.2s ease-in-out infinite;
+}
+
+@keyframes glimpse-float {
+  0%, 100% { transform: translateY(0); }
+  50% { transform: translateY(-3px); }
+}
+
+.glimpse-streak-num {
+  font-family: var(--rr-font-display);
+  font-weight: 800;
+  font-size: 1.7rem;
+  line-height: 1;
+  color: var(--rr-text);
+}
+
+.glimpse-streak-word {
+  font-size: 0.9rem;
+  color: var(--rr-muted);
+  font-weight: 600;
+}
+
+.glimpse-streak-line {
+  font-size: 0.86rem;
+  color: var(--rr-muted);
+  font-style: italic;
+}
+
+.glimpse-weeks {
+  display: flex;
+  gap: 8px;
+}
+
+.glimpse-week {
+  width: 10px;
+  height: 10px;
+  border-radius: 50%;
+  background: var(--rr-track);
+}
+
+.glimpse-week.is-done {
+  background: var(--rr-positive);
+}
+
+.glimpse-week.is-now {
+  background: var(--rr-primary);
+  box-shadow: 0 0 0 3px color-mix(in srgb, var(--rr-primary) 30%, transparent);
+}
+
+.motion-playful .glimpse-week.is-now {
+  animation: glimpse-week-pulse 2.4s ease-out infinite;
+}
+
+@keyframes glimpse-week-pulse {
+  0% { box-shadow: 0 0 0 3px color-mix(in srgb, var(--rr-primary) 30%, transparent); }
+  70% { box-shadow: 0 0 0 8px transparent; }
+  100% { box-shadow: 0 0 0 3px color-mix(in srgb, var(--rr-primary) 30%, transparent); }
+}
+
+/* ---------- badges ---------- */
+
+.glimpse-badges {
+  display: grid;
+  grid-template-columns: repeat(3, 1fr);
+  gap: 10px;
+}
+
+.glimpse-badge {
+  position: relative;
+  display: flex;
+  flex-direction: column;
+  align-items: center;
+  gap: 8px;
+  padding: 14px 6px 12px;
+  font: inherit;
+  color: inherit;
+  cursor: pointer;
+  background: var(--rr-surface);
+  border: 1px solid var(--rr-hairline);
+  border-radius: var(--rr-radius);
+  transition: transform 0.16s ease, border-color 0.2s ease;
+}
+
+.glimpse-badge-glyph {
+  width: 40px;
+  height: 40px;
+  border-radius: 50%;
+  display: grid;
+  place-items: center;
+}
+
+.glimpse-badge-glyph svg {
+  width: 22px;
+  height: 22px;
+}
+
+.glimpse-badge.is-earned .glimpse-badge-glyph {
+  background: color-mix(in srgb, var(--rr-primary) 22%, var(--rr-surface));
+  border: 1px solid color-mix(in srgb, var(--rr-primary) 55%, transparent);
+  color: var(--rr-primary-deep);
+}
+
+.glimpse-badge.is-locked .glimpse-badge-glyph {
+  background: var(--rr-surface-2);
+  border: 1px dashed var(--rr-hairline);
+  color: var(--rr-muted);
+}
+
+.glimpse-badge.is-earned:hover {
+  transform: translateY(-2px);
+  border-color: color-mix(in srgb, var(--rr-primary) 60%, transparent);
+}
+
+.glimpse-badge-name {
+  font-size: 0.7rem;
+  line-height: 1.35;
+  text-align: center;
+  color: var(--rr-muted);
+  font-weight: 600;
+}
+
+.glimpse-badge.is-popped {
+  animation: glimpse-badge-pop 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
+}
+
+@keyframes glimpse-badge-pop {
+  0% { transform: scale(1); }
+  45% { transform: scale(1.12) rotate(-2deg); }
+  100% { transform: scale(1); }
+}
+
+.glimpse-badge.is-nudged {
+  animation: glimpse-badge-nudge 0.32s ease;
+}
+
+@keyframes glimpse-badge-nudge {
+  0%, 100% { transform: translateX(0); }
+  30% { transform: translateX(-4px); }
+  65% { transform: translateX(3px); }
+}
+
+.glimpse-badge-hint {
+  position: absolute;
+  bottom: calc(100% + 8px);
+  left: 50%;
+  translate: -50% 0;
+  white-space: nowrap;
+  z-index: 6;
+  font-size: 0.72rem;
+  font-weight: 600;
+  color: var(--rr-bg);
+  background: var(--rr-text);
+  padding: 7px 11px;
+  border-radius: 10px;
+  box-shadow: var(--rr-shadow);
+  animation: glimpse-rise 0.2s ease;
+}
+
+/* ---------- trajectory chart ---------- */
+
+.glimpse-chart {
+  position: relative;
+  margin: 0;
+  background: var(--rr-surface-2);
+  border: 1px solid var(--rr-hairline);
+  border-radius: var(--rr-radius);
+  padding: 14px 10px 6px;
+}
+
+.glimpse-chart svg {
+  width: 100%;
+  height: auto;
+  display: block;
+  overflow: visible;
+}
+
+.glimpse-grid {
+  stroke: var(--rr-hairline);
+  stroke-width: 1;
+}
+
+.glimpse-area {
+  fill: var(--rr-primary);
+  opacity: 0;
+}
+
+.glimpse-phone.is-in .glimpse-area {
+  opacity: 0.14;
+  transition: opacity 0.8s ease 1.4s;
+}
+
+.glimpse-path {
+  stroke: var(--rr-primary);
+  stroke-width: 3;
+  stroke-linecap: round;
+  stroke-dasharray: 1;
+  stroke-dashoffset: 1;
+}
+
+.glimpse-phone.is-in .glimpse-path {
+  stroke-dashoffset: 0;
+  transition: stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
+}
+
+.glimpse-origin {
+  fill: var(--rr-muted);
+}
+
+.glimpse-axis-label {
+  fill: var(--rr-muted);
+  font-family: var(--rr-font-body);
+  font-size: 13px;
+  letter-spacing: 0.08em;
+}
+
+.glimpse-hand-note {
+  fill: var(--rr-primary-deep);
+  font-family: var(--rr-font-hand);
+  font-size: 19px;
+  transform: rotate(-4deg);
+  transform-origin: 40px 120px;
+}
+
+.glimpse-marker {
+  position: absolute;
+  width: 22px;
+  height: 22px;
+  margin: -11px 0 0 -11px;
+  padding: 0;
+  border-radius: 50%;
+  background: var(--rr-surface);
+  border: 2px solid var(--rr-primary);
+  cursor: pointer;
+  z-index: 2;
+  opacity: 0;
+  transform: scale(0.4);
+  transition:
+    opacity 0.4s ease,
+    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
+    background 0.2s ease,
+    border-color 0.2s ease;
+}
+
+.glimpse-phone.is-in .glimpse-marker {
+  opacity: 1;
+  transform: scale(1);
+}
+
+.glimpse-marker.is-flag {
+  background: var(--rr-primary);
+  border-color: var(--rr-primary);
+}
+
+.glimpse-marker:hover,
+.glimpse-marker:focus-visible,
+.glimpse-marker.is-active {
+  transition-delay: 0s;
+}
+
+.glimpse-marker:hover,
+.glimpse-marker:focus-visible {
+  transform: scale(1.25);
+}
+
+.glimpse-marker.is-active {
+  transform: scale(1.2);
+  background: var(--rr-secondary);
+  border-color: var(--rr-secondary);
+}
+
+/* hover/focus tooltip (CSS-only, from data-tip); the pinned rich
+   tooltip below takes over on tap (.is-active hides this one) */
+.glimpse-marker::after {
+  content: attr(data-tip);
+  position: absolute;
+  bottom: calc(100% + 10px);
+  left: 50%;
+  transform: translateX(-50%) translateY(4px);
+  white-space: nowrap;
+  font-size: 0.74rem;
+  font-weight: 600;
+  color: var(--rr-bg);
+  background: var(--rr-text);
+  padding: 6px 10px;
+  border-radius: 8px;
+  opacity: 0;
+  pointer-events: none;
+  transition: opacity 0.18s ease, transform 0.18s ease;
+}
+
+.glimpse-marker:hover::after,
+.glimpse-marker:focus-visible::after {
+  opacity: 1;
+  transform: translateX(-50%) translateY(0);
+}
+
+.glimpse-marker.is-active::after {
+  display: none;
+}
+
+.glimpse-flag {
+  position: absolute;
+  bottom: calc(100% - 3px);
+  left: 50%;
+  transform: translateX(-50%);
+  width: 15px;
+  height: 19px;
+  color: var(--rr-secondary);
+  pointer-events: none;
+}
+
+/* pinned rich tooltip (tap / touch) */
+.glimpse-tip {
+  position: absolute;
+  z-index: 5;
+  width: max-content;
+  max-width: 190px;
+  transform: translate(-50%, calc(-100% - 20px));
+  display: grid;
+  gap: 2px;
+  text-align: left;
+  background: var(--rr-text);
+  color: var(--rr-bg);
+  border-radius: 12px;
+  padding: 10px 13px;
+  box-shadow: var(--rr-shadow);
+  animation: glimpse-rise 0.22s ease;
+}
+
+.glimpse-tip.is-edge {
+  transform: translate(calc(-100% + 26px), calc(-100% - 20px));
+}
+
+.glimpse-tip strong {
+  font-size: 0.86rem;
+  color: inherit;
+}
+
+.glimpse-tip-date {
+  font-size: 0.76rem;
+  font-weight: 700;
+  letter-spacing: 0.06em;
+  text-transform: uppercase;
+  color: var(--rr-primary);
+}
+
+.glimpse-tip-blurb {
+  font-size: 0.8rem;
+  opacity: 0.82;
+  line-height: 1.45;
+}
+
+@keyframes glimpse-rise {
+  from { opacity: 0; translate: 0 6px; }
+}
+
+.glimpse-chart-cap {
+  margin: 8px 0 4px;
+  text-align: center;
+  font-size: 0.78rem;
+  color: var(--rr-muted);
+}
+
+/* ---------- unlock cards ---------- */
+
+.glimpse-unlocks {
+  display: grid;
+  grid-auto-flow: column;
+  grid-auto-columns: 76%;
+  gap: 12px;
+  overflow-x: auto;
+  scroll-snap-type: x mandatory;
+  padding-bottom: 4px;
+  scrollbar-width: thin;
+  scrollbar-color: var(--rr-hairline) transparent;
+}
+
+.glimpse-card {
+  scroll-snap-align: start;
+  display: flex;
+  flex-direction: column;
+  gap: 10px;
+  width: 100%;
+  text-align: left;
+  font: inherit;
+  color: inherit;
+  cursor: pointer;
+  background: var(--rr-surface);
+  border: 1px solid var(--rr-hairline);
+  border-radius: var(--rr-radius);
+  padding: 16px;
+  transition: transform 0.18s ease, border-color 0.2s ease, box-shadow 0.25s ease;
+}
+
+.glimpse-card:hover {
+  transform: translateY(-3px);
+  border-color: color-mix(in srgb, var(--rr-primary) 60%, transparent);
+  box-shadow: var(--rr-shadow);
+}
+
+.glimpse-card.is-open {
+  border-color: color-mix(in srgb, var(--rr-primary) 65%, transparent);
+}
+
+.glimpse-medal {
+  width: 44px;
+  height: 44px;
+  border-radius: 50%;
+  display: grid;
+  place-items: center;
+  background: color-mix(in srgb, var(--rr-primary) 20%, var(--rr-surface));
+  border: 1px solid color-mix(in srgb, var(--rr-primary) 55%, transparent);
+  color: var(--rr-primary-deep);
+}
+
+.glimpse-medal svg {
+  width: 22px;
+  height: 22px;
+}
+
+.glimpse-card-top {
+  display: flex;
+  align-items: baseline;
+  justify-content: space-between;
+  gap: 10px;
+}
+
+.glimpse-card-name {
+  font-family: var(--rr-font-display);
+  font-weight: 700;
+  font-size: 1.02rem;
+  color: var(--rr-text);
+}
+
+.glimpse-card-pct {
+  font-family: var(--rr-font-display);
+  font-weight: 800;
+  font-size: 1.35rem;
+  color: var(--rr-primary-deep);
+}
+
+.glimpse-bar {
+  display: block;
+  height: 10px;
+  border-radius: 999px;
+  background: var(--rr-track);
+  overflow: hidden;
+}
+
+.glimpse-fill {
+  display: block;
+  height: 100%;
+  width: 100%;
+  border-radius: inherit;
+  background: linear-gradient(90deg, var(--rr-primary), var(--rr-secondary));
+  transform: scaleX(0);
+  transform-origin: left center;
+}
+
+.glimpse-phone.is-in .glimpse-fill {
+  transform: scaleX(var(--pct, 0));
+  transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
+}
+
+.glimpse-card-date {
+  font-size: 0.8rem;
+  font-weight: 700;
+  letter-spacing: 0.08em;
+  text-transform: uppercase;
+  color: var(--rr-muted);
+}
+
+/* pace-line expander (grid-rows technique, cf. FAQ M7) */
+.glimpse-pace {
+  display: grid;
+  grid-template-rows: 0fr;
+  transition: grid-template-rows 0.3s cubic-bezier(0.22, 1, 0.36, 1);
+}
+
+.glimpse-pace > span {
+  overflow: hidden;
+  min-height: 0;
+  display: block;
+  font-size: 0.84rem;
+  line-height: 1.5;
+  color: var(--rr-muted);
+}
+
+.glimpse-card.is-open .glimpse-pace {
+  grid-template-rows: 1fr;
+}
+
+.glimpse-card.is-open .glimpse-pace > span {
+  padding-top: 2px;
+}
+
+/* ---------- annotation notes ---------- */
+
+.glimpse-notes {
+  display: grid;
+  gap: 16px;
+  align-content: start;
+}
+
+@media (min-width: 960px) {
+  .glimpse-notes {
+    padding-top: 8px;
+  }
+}
+
+.glimpse-note {
+  display: grid;
+  grid-template-columns: auto 1fr;
+  gap: 18px;
+  background: var(--rr-surface);
+  border: 1px solid var(--rr-hairline);
+  border-radius: var(--rr-radius);
+  padding: 24px 26px;
+  box-shadow: var(--rr-shadow);
+}
+
+.glimpse-note-n {
+  font-family: var(--rr-font-display);
+  font-weight: 800;
+  font-size: 0.95rem;
+  letter-spacing: 0.1em;
+  color: var(--rr-primary-deep);
+  border: 1px solid color-mix(in srgb, var(--rr-primary) 50%, transparent);
+  background: color-mix(in srgb, var(--rr-primary) 12%, transparent);
+  width: 44px;
+  height: 44px;
+  border-radius: 50%;
+  display: inline-grid;
+  place-items: center;
+  flex: none;
+}
+
+.glimpse-note h3 {
+  font-family: var(--rr-font-display);
+  color: var(--rr-text);
+  margin-bottom: 6px;
+}
+
+.glimpse-note p {
+  color: var(--rr-muted);
+  font-size: 0.96rem;
+  margin-bottom: 0;
+}
+
+/* ---------- reduced motion: everything settles instantly ---------- */
+
+@media (prefers-reduced-motion: reduce) {
+  .glimpse-phone.is-in .glimpse-path,
+  .glimpse-phone.is-in .glimpse-area,
+  .glimpse-phone.is-in .glimpse-marker,
+  .glimpse-phone.is-in .glimpse-fill {
+    transition: none;
+  }
+  .glimpse-marker {
+    transition-delay: 0s;
+  }
+  .glimpse-burst,
+  .glimpse-badge.is-popped,
+  .glimpse-badge.is-nudged,
+  .motion-playful .glimpse-flame,
+  .motion-playful .glimpse-week.is-now {
+    animation: none;
+  }
+  .glimpse-tip,
+  .glimpse-badge-hint,
+  .glimpse-marker::after {
+    animation: none;
+    transition: none;
+  }
+  .glimpse-pace {
+    transition: none;
+  }
+  .glimpse-card:hover,
+  .glimpse-badge.is-earned:hover,
+  .glimpse-streak:active {
+    transform: none;
+  }
+}
```

### Analytics note

Interactive elements carry `data-analytics="glimpse-interact"` with
`data-analytics-placement` of `trajectory-marker` / `unlock-card` /
`streak` / `badge`. Per `components/Analytics.tsx` these normalize to a
`glimpse_interact` event automatically (no-op until Umami is configured).
Morning review: either add `glimpse_interact` to
`docs/analytics-plan.md` §3 or strip the attributes — both are one-line
changes.

---

## Motion spec

Shared principles with SPARK-TWEAKS §6: CSS-only (no new dependencies),
GPU-cheap (transform / opacity / `stroke-dashoffset` / `scaleX` only —
the bar fill uses `scaleX`, not `width`), every animation gated behind
`prefers-reduced-motion`, nothing loops unless it earns it.

| # | What animates | Trigger | Spec | Cost | Reduced-motion |
|---|---|---|---|---|---|
| G1 | Trajectory line draw-on | Phone scrolls into view (`.is-in`) | `stroke-dashoffset` 1→0 (`pathLength={1}` trick — no measuring), 1.8s `cubic-bezier(0.4,0,0.2,1)`, 0.2s delay; area wash fades in 0.8s at 1.4s | Trivial | Line + wash render complete |
| G2 | Unlock markers pop | `.is-in`, staggered 0.9/1.08/1.26s | opacity + `scale(0.4→1)`, 0.45s spring `cubic-bezier(0.34,1.56,0.64,1)`; inline `transition-delay` is zeroed on `:hover`/`:focus-visible`/`.is-active` so interaction is never delayed | Trivial | Visible immediately |
| G3 | Progress bars sweep | `.is-in`, staggered 0.15/0.29/0.43s | `scaleX(0→var(--pct))`, 1.2s `cubic-bezier(0.22,1,0.36,1)`, origin left | Trivial | Final widths instantly |
| G4 | Marker tooltips | Hover / focus (CSS `::after` from `data-tip`); tap pins rich tooltip | 0.18–0.22s ease rise; absolutely positioned — zero layout shift; pinned tip uses `role="status"`; `Escape` dismisses | Trivial | Instant |
| G5 | Unlock card pace-line | Tap toggles `.is-open` | `grid-template-rows` 0fr→1fr, 0.3s ease (same technique as FAQ M7) | Trivial | Instant |
| G6 | Badge pop / nudge | Tap earned / locked badge | Pop: `scale(1→1.12→1)` + −2° rotate, 0.38s spring; nudge: ±4px X, 0.32s; hint bubble on locked | Trivial | None |
| G7 | Streak tap burst | Tap streak counter | Inner span remounts (`key={taps}`) replaying 0.45s spring scale; caption cycles through 3 lines | Trivial | None |
| G8 ★ | Looping micro-motion — **playful-alive only** (requires `motion-playful` on `<main>`, cf. SPARK-TWEAKS §6) | Always on | Flame gentle float 3.2s; current-week dot soft pulse 2.4s | Trivial | Disabled |
| G9 | Card / badge / streak hover lifts | Hover | Existing 0.16–0.25s lifts, accent border — same language as `.card` | Trivial | Lifts disabled |
| G10 | Phone entrance | Scroll | Reuses existing `<Reveal>` (0.8s rise); sticky on desktop (`top: 96px`) so the demo stays touchable while notes scroll | Trivial | Instant |

**Deliberately excluded:** animated number counters (SPARK-TWEAKS
already ruled these out as fake-feeling), confetti bursts (tacky),
parallax, auto-advance carousels, sound. The playfulness lives in
springy easings and the tap responses, not in decoration.

---

## (e) Honesty labeling (explicit)

Baked into the section, not bolted on:

1. **Section head:** `Vision preview · Coming soon` pill next to the
   `See the app` kicker — visible before any interaction.
2. **Phone app bar:** `Sample race` pill — the demo scenario is named
   as a scenario, never as a person.
3. **Fine print under the phone:** *"Interactive sketch · example
   data — the app is still being built."*
4. **Chart caption:** *"Example trajectory — hover or tap a marker."*
5. **Unlock/badge lists:** `aria-label`s include "example data" for
   assistive tech.
6. **Copy discipline:** "the coming app", "preview", "sketch" — never
   "try the app", never present-tense claims about app functionality.
7. **No banned content anywhere:** no counts, no gate, no traction
   claims, no "wealth is a rate, not a balance", no gold/black identity.

---

## Post-pick rollout (after the rebrand winner lands)

1. Set `data-rr-brand="<winner>"` on `<html>` in `app/layout.tsx`
   (or move the winner's token values into the `.app-glimpse` default
   block and delete the overrides — one edit either way).
2. Add `motion-playful` to `<main>` **iff** playful-alive wins (wires
   up G8; refined-premium and wildcard omit it).
3. **Fonts:** add the winner's display face to `layout.tsx`
   (`next/font/google`): playful-alive → Baloo 2 (or Nunito ExtraBold);
   wildcard → Playfair Display + Caveat. Refined-premium needs nothing
   (Fraunces/Inter already loaded). The `--rr-font-*` stacks degrade to
   Inter until this is done.
4. Verify: `npm run build`; visual pass desktop + mobile (marker
   tooltips, snap-row, badge hints); contrast check of
   `--rr-primary-deep` text on `--rr-bg` per direction; tap-test on a
   real touch device; `prefers-reduced-motion` pass.
5. Optional: record `glimpse_interact` in `docs/analytics-plan.md` §3,
   or strip the `data-analytics` attributes.

## Could not verify

- **Diffs not compiled:** morning review should run `npm run build`
  in `landing/` after applying. TSX was written against the actual
  `page.tsx` / `Reveal.tsx` / `Analytics.tsx` APIs (read in full);
  CSS class names are new and collision-checked against `globals.css`.
- **Marker coordinates are computed, not eyeballed:** the three marker
  positions were calculated as points on the cubic path
  (`M 40 300 C 180 290, 260 250, 340 200 S 500 100, 600 62`) at
  t≈0.75 / t≈0.45 / endpoint — they sit on the curve by construction,
  but a visual pass should confirm.
- **Touch behavior not device-tested:** tap toggles rely on click
  (fine on mobile Safari/Chrome), CSS hover tooltips are desktop-only
  by design; verify no sticky-hover artifacts on iOS.
- **Icon glyphs unrendered:** the star/flame/bolt/lock/flag SVGs are
  hand-authored paths — standard shapes, but confirm they read well at
  22px in the visual pass.
- **`"Baloo 2"` / `"Nunito"` / `"Playfair Display"` / `"Caveat"` not
  loaded:** `layout.tsx` currently loads only Fraunces + Inter; the
  font stacks fall back to Inter until rollout step 3.
- **Interim-default risk:** pre-pick, the section renders in
  playful-alive cream on the still-dark page. This is intentional (an
  early taste of the rebrand), but if the morning pick goes another
  way the first impression briefly mismatches — acceptable for a
  vision-preview band, and one attribute flip fixes it.
