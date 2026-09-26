# SPARK-TWEAKS.md — Rat Race landing tweak package

**Status:** proposal only. **DIFFS ONLY — do not edit, build, or deploy the live site.**
A morning review verifies and ships.

## How to use this document (read first)

1. **Morning sequence:** pick the rebrand direction first
   (`refined-premium` / `playful-alive` / `wildcard`), then apply this
   package on top. Copy, motion, and layout recommendations below are
   **direction-agnostic** and ship regardless of the winner.
2. **Visual tokens await the rebrand winner.** Every color, typeface, logo,
   and hero-art choice in the diffs below points at the *current* token
   system (`--gold`, Fraunces/Inter, current logo) as a placeholder. The
   winning direction replaces those tokens in one pass — see
   **§ Post-pick rollout**. Do not re-tune colors per direction here.
3. Hero/showcase art paths referenced: the per-direction mockups land at
   `~/workspace/rat-race-v0/content/showcase/<direction>/hero.png`.
   At rollout the winner is copied to `landing/public/showcase/hero.png`,
   which is the slot this package wires up.
4. **Hard bans respected throughout:** no signup counts, no mention of the
   1,000-email validation gate or kill rule, no use of the phrasing
   "wealth is a rate, not a balance." The honesty rule from
   `brand/voice-and-tone.md` (no fake users, no fake proof) is load-bearing
   in every recommendation.

## What this package answers (founder feedback)

| Feedback | Answer in this package |
|---|---|
| "Lacking spark" | Animated trajectory stays and gets company: a bolder hero visual slot, a "First look" showcase section, smooth FAQ motion, a closing CTA, sharper microcopy |
| "A bit tacky" / "too stiff and tacky" | De-duplicate the signature quote (it appears twice today), tone down or direction-gate the league flavor quotes, remove gimmicky repetition, keep gold as jewelry not paint |
| Target feeling: **modern, engaging, playful, inviting** | North-star items are flagged **★** — they lean hardest into this feeling and pair best with the **playful-alive** lead horse, but all are safe under any direction |
| Premium, never flashy | All motion is CSS-only, short, eased, and fully disabled under `prefers-reduced-motion` |

---

## 1. HERO — bolder, more alive

### Rationale
The current hero is correct but static-feeling: tagline H1, a good lead,
an SVG trajectory, the Tally embed. The spark gap is (a) the signature
quote appears **twice** (hero figcaption *and* the Problem blockquote —
tacky), (b) the lead buries the concrete payoff ("projected dates"),
(c) there is no visual slot for the rebrand's hero art.

### Exact copy changes

**Lead** — tighten, name the payoff (a projected date), keep the 1–3
framing consistent with step 1 of How-it-works:

> Rat Race turns your net worth into a game worth playing — pick 1–3
> goals, enter one rough number, and get a projected date for each.
> Then watch the dates move closer as you climb.

**Trajectory figcaption** — kill the duplicate quote; the Problem section
keeps the signature line. New caption (★ north-star):

> Your trajectory, drawn. *Watch your dates move closer as you climb.*

**H1** — unchanged: "A rat race you can win." It is the tagline; the
boldness comes from the visual and the lead, not from rewriting the brand.

### Diff — `app/page.tsx` (hero lead)

```diff
--- a/app/page.tsx
+++ b/app/page.tsx
@@ Hero()
         <p className="lead">
-          Rat Race turns your net worth into a game worth playing — pick your
-          goals, enter one rough number, and watch your projected dates move
-          closer as you climb.
+          Rat Race turns your net worth into a game worth playing — pick 1–3
+          goals, enter one rough number, and get a projected date for each.
+          Then watch the dates move closer as you climb.
         </p>
-        <Trajectory />
+        <HeroArt />
         <WaitlistCapture />
```

### Diff — `app/page.tsx` (imports)

```diff
--- a/app/page.tsx
+++ b/app/page.tsx
@@ imports
 import Logo from "../components/Logo";
 import WaitlistCapture from "../components/WaitlistCapture";
-import Trajectory from "../components/Trajectory";
+import HeroArt from "../components/HeroArt";
+import Showcase from "../components/Showcase";
 import { Reveal, ScrollChrome } from "../components/Reveal";
```

### Diff — `components/Trajectory.tsx` (figcaption only)

```diff
--- a/components/Trajectory.tsx
+++ b/components/Trajectory.tsx
@@ figcaption
       <figcaption className="traj-caption">
-        Your trajectory, drawn. <span>A number with a date is a plan.</span>
+        Your trajectory, drawn. <span>Watch your dates move closer as you climb.</span>
       </figcaption>
```

### New file — `components/HeroArt.tsx` (hero visual slot)

Direction-agnostic: renders the rebrand winner's hero art, with the
animated Trajectory as a graceful fallback while the art is absent.

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Trajectory from "./Trajectory";

/**
 * HeroArt — the hero visual slot (SPARK-TWEAKS package, direction-agnostic).
 *
 * Renders the rebrand winner's hero art from `/showcase/hero.png`
 * (copied at rollout from `content/showcase/<direction>/hero.png`).
 * If the file is not there yet, falls back to the animated <Trajectory />
 * teaser so the hero never renders broken.
 *
 * VISUAL-TOKEN NOTE: art choice awaits the rebrand winner.
 */
export default function HeroArt() {
  const [missing, setMissing] = useState(false);
  if (missing) return <Trajectory />;
  return (
    <figure className="hero-art">
      <Image
        src="/showcase/hero.png"
        alt="Rat Race — your net worth drawn as a trajectory toward your goals"
        width={1200}
        height={675}
        priority
        onError={() => setMissing(true)}
      />
      <figcaption className="traj-caption">
        Your trajectory, drawn.{" "}
        <span>Watch your dates move closer as you climb.</span>
      </figcaption>
    </figure>
  );
}
```

---

## 2. SOCIAL PROOF — honest, "building in public" framing

### Rationale
Per the HONESTY RULE there are no users, no counts, no testimonials —
and there shouldn't be. The honest proof available is *visible work*:
the build is happening in public on real accounts. The current
BuildingInPublic section tells; it should also *show* — one row of
follow links turns "building in public" from a claim into a checkable
fact. Also soften the "week-4 verdict" timeline item (the phrasing has
gone stale and over-commits).

### Exact copy changes

**Timeline "Next" item** — from:

> Weekly drops — short videos, league carousels, build-in-public threads
> — then the week-4 verdict on whether the race is real.

to:

> Weekly drops — short videos, league carousels, build-in-public threads
> — then a public verdict on whether the race is real.

**New "follow along" row** (★ north-star — inviting, checkable):

> The build happens in public — follow along:
> [X · @theratraceapp] [TikTok · @theratrace.app] [YouTube · @theratraceapp]

### Diff — `app/page.tsx` (BuildingInPublic: timeline + proof links)

```diff
--- a/app/page.tsx
+++ b/app/page.tsx
@@ BuildingInPublic() timeline
             <li className="is-next">
               <time>Next</time>
               Weekly drops — short videos, league carousels, build-in-public
-              threads — then the week-4 verdict on whether the race is real.
+              threads — then a public verdict on whether the race is real.
             </li>
           </ol>
           </Reveal>
+          <Reveal delay={0.2}>
+            <p className="proof-label">The build happens in public — follow along:</p>
+            <div className="proof-links">
+              <a
+                href="https://x.com/theratraceapp"
+                target="_blank"
+                rel="noopener noreferrer"
+                data-analytics="proof-x"
+              >
+                X · @theratraceapp
+              </a>
+              <a
+                href="https://tiktok.com/@theratrace.app"
+                target="_blank"
+                rel="noopener noreferrer"
+                data-analytics="proof-tiktok"
+              >
+                TikTok · @theratrace.app
+              </a>
+              <a
+                href="https://youtube.com/@theratraceapp"
+                target="_blank"
+                rel="noopener noreferrer"
+                data-analytics="proof-youtube"
+              >
+                YouTube · @theratraceapp
+              </a>
+            </div>
+          </Reveal>
           <div className="honesty-ctas">
```

---

## 3. SHOWCASE — new "First look" section (new file)

### Rationale
A pre-launch page needs one *striking* visual moment beyond the hero.
This section gives the winning direction's concept art a home without
coupling the layout to any direction's aesthetic: image slots with
graceful degradation (a missing file hides its figure; see rollout note
if the winner ships no companion art).

### Exact copy

- Kicker: `First look`
- H2: `The app is still a sketch. The idea isn't.`
- Sub: `Concept art from the build — the trajectory view, and the card that turns a goal into a date.`
- Captions: `Before / after — a balance becomes a plan.` /
  `The unlock card — a goal with a date.`

### New file — `components/Showcase.tsx`

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";

/**
 * Showcase — "First look" section (SPARK-TWEAKS package, direction-agnostic).
 *
 * Concept-art slots for the winning rebrand direction. Each figure hides
 * itself if its art file is absent, so the section degrades cleanly
 * pre-rollout. Art lives in `landing/public/showcase/` (see Post-pick
 * rollout). Slots below are PROVISIONAL names — if the winning direction
 * ships no companion art, comment out <Showcase /> in page.tsx rather
 * than shipping an empty grid.
 *
 * VISUAL-TOKEN NOTE: all art awaits the rebrand winner.
 */
function Art({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  const [missing, setMissing] = useState(false);
  if (missing) return null;
  return (
    <figure className="showcase-fig">
      <Image
        src={src}
        alt={alt}
        width={880}
        height={620}
        loading="lazy"
        onError={() => setMissing(true)}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function Showcase() {
  return (
    <section className="block showcase" aria-labelledby="showcase-heading">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="kicker">First look</p>
            <h2 id="showcase-heading">
              The app is still a sketch.{" "}
              <span className="gold-word">The idea isn&rsquo;t.</span>
            </h2>
            <p>
              Concept art from the build — the trajectory view, and the card
              that turns a goal into a date.
            </p>
          </div>
        </Reveal>
        <div className="showcase-grid">
          <Reveal>
            <Art
              src="/showcase/before-after.png"
              alt="Concept art: a net-worth balance shown with and without its projected trajectory"
              caption="Before / after — a balance becomes a plan."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <Art
              src="/showcase/unlock-card.png"
              alt="Concept art: an unlock card showing a goal, its progress, and its projected date"
              caption="The unlock card — a goal with a date."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

### Diff — `app/page.tsx` (place Showcase after HowItWorks)

```diff
--- a/app/page.tsx
+++ b/app/page.tsx
@@ Page()
       <main>
         <Hero />
         <Problem />
         <HowItWorks />
+        <Showcase />
         <Leagues />
         <AloneTogether />
         <BuildingInPublic />
         <Faq />
       </main>
```

---

## 4. FAQ — objection handling

### Rationale
Three real objections are unanswered today: **"Is this financial
advice?"** (trust/legal-adjacent — must be explicit), **"Why join a
waitlist for something that doesn't exist?"** (the core V0 objection),
and **"How is this different from my bank's dashboard?"**
(differentiation). The privacy answer also gets sharper ("we will never
sell it" — a plain, checkable commitment, no hype).

### Diffs — `app/page.tsx` (FAQS array)

```diff
--- a/app/page.tsx
+++ b/app/page.tsx
@@ FAQS
   {
-    q: "Is my money data private?",
-    a: "Privacy is a core design principle: raw balances are never shown to other users — comparisons are always % toward personal goals, never dollar amounts. Full privacy and security details will be published before launch.",
+    q: "Is my data private — and safe?",
+    a: "Privacy is a core design principle: raw balances are never shown to other users — comparisons are always % toward personal goals, never dollar amounts. Your data stays yours; we will never sell it. Full privacy and security details will be published before launch.",
+  },
+  {
+    q: "Is this financial advice?",
+    a: "No. Rat Race is a tracker, not an advisor. It shows your trajectory and projected dates from numbers you enter — it won't tell you what to buy, sell, or do with your money.",
+  },
+  {
+    q: "Why join a waitlist for an app that doesn't exist yet?",
+    a: "Because the waitlist is the vote. We're measuring real interest before writing the app — joining gets you early access when there's something to try, and a direct say in what gets built first.",
+  },
+  {
+    q: "How is this different from my bank's dashboard?",
+    a: "Your bank shows a balance. Rat Race draws the line: your league, your progress, and the dates your goals land — wrapped in a game layer that makes the climb worth checking.",
   },
```

---

## 5. FINAL CTA — closing conversion block (new section)

### Rationale
The page currently ends on the FAQ — a dead end. A short closing CTA
recaptures scrollers. Copy is warm and honest (★ north-star), no urgency
tricks (voice guide: no fake scarcity).

### Exact copy

- Kicker: `Early access`
- H2: `The race is forming.` (★)
- Sub: `Join the waitlist for early access — and a say in what gets built first.`

### Diff — `app/page.tsx` (new FinalCta + placement in Page)

```diff
--- a/app/page.tsx
+++ b/app/page.tsx
@@ after Faq()
+function FinalCta() {
+  return (
+    <section className="block final-cta" aria-labelledby="final-cta-heading">
+      <div className="container">
+        <Reveal>
+          <p className="kicker">Early access</p>
+          <h2 id="final-cta-heading">
+            The race is <span className="gold-word">forming.</span>
+          </h2>
+          <p>
+            Join the waitlist for early access — and a say in what gets built
+            first.
+          </p>
+        </Reveal>
+        <WaitlistCapture id="waitlist-final" placement="final" />
+      </div>
+    </section>
+  );
+}
+
 /* ---------------------------------- footer ---------------------------------- */
```

```diff
--- a/app/page.tsx
+++ b/app/page.tsx
@@ Page()
         <BuildingInPublic />
         <Faq />
+        <FinalCta />
       </main>
```

### Diff — `components/WaitlistCapture.tsx` (placement prop)

The component currently hardcodes `placement: "hero"` in both the view
tracking and the `ratrace:waitlist-submit` event. Make it a prop so the
second instance attributes correctly.

```diff
--- a/components/WaitlistCapture.tsx
+++ b/components/WaitlistCapture.tsx
-export default function WaitlistCapture({ id = "waitlist" }: { id?: string }) {
+export default function WaitlistCapture({
+  id = "waitlist",
+  placement = "hero",
+}: {
+  id?: string;
+  placement?: string;
+}) {
```

```diff
--- a/components/WaitlistCapture.tsx
+++ b/components/WaitlistCapture.tsx
@@ WaitlistCapture()
   useEffect(() => {
-    trackOnView(ref.current, EVENTS.WAITLIST_VIEW, { placement: "hero" });
-  }, []);
+    trackOnView(ref.current, EVENTS.WAITLIST_VIEW, { placement });
+    // eslint-disable-next-line react-hooks/exhaustive-deps
+  }, []);
```

```diff
--- a/components/WaitlistCapture.tsx
+++ b/components/WaitlistCapture.tsx
@@ onMessage
       window.dispatchEvent(
         new CustomEvent("ratrace:waitlist-submit", {
-          detail: { placement: "hero", referred: Boolean(inbound) },
+          detail: { placement, referred: Boolean(inbound) },
         }),
       );
```

---

## 6. MOTION / ANIMATION SPEC

Design principles: CSS-only (no new dependencies), GPU-cheap
(transform/opacity only), every animation gated behind
`prefers-reduced-motion`, nothing loops unless it earns it. Per-direction
motion character is in §7 — the spec below is the shared base.

| # | What animates | Trigger | Spec | Cost | Reduced-motion |
|---|---|---|---|---|---|
| M1 | Hero entrance cascade (pitch → H1 → lead → art → form) | On load | `rise-in` 0.9s `cubic-bezier(0.22,1,0.36,1)`, staggered 0.05/0.16/0.28/0.42/0.6s (existing) | Trivial | Already disabled |
| M2 | Trajectory line draw-on | On load, 0.5s delay | `stroke-dashoffset` 1100→0, 2.6s ease (existing) | Trivial | Line renders complete |
| M3 | League milestone ticks pop | On load, staggered 1.2/1.55/1.9s | `tick-in` 0.8s (existing) | Trivial | Visible immediately |
| M4 | Traveler dot + halo ride the line | After draw (2.4s), SMIL `animateMotion` 7s loop (existing) | — | Trivial | Hidden (existing) |
| M5 ★ | Hero art spring entrance (**playful-alive** opt-in) | On load, via `.motion-playful` on `<main>` | NEW `pop-in` keyframes (below): 0.85s, settle with slight overshoot | Trivial | Disabled (added) |
| M6 | Scroll reveals | IntersectionObserver, once | Existing `.reveal` 0.8s ease | Trivial | Already instant |
| M7 | FAQ accordion open/close | `<details>` toggle | NEW: `grid-template-rows` 0fr→1fr, 0.35s ease (below) | Trivial | Transition disabled |
| M8 | Card hover lift + border glow | Hover | Existing 0.18–0.25s (keep) | Trivial | Already none |
| M9 | Live dot pulse (building-in-public) | Infinite | Existing 2.2s pulse (keep — it's the "alive" heartbeat) | Trivial | Already disabled |
| M10 | Nav intensify on scroll | `scrollY > 24` | Existing `.is-scrolled` (keep) | Trivial | Unaffected |
| M11 | Showcase figures | Scroll reveal (M6) | Reuse `.reveal`; no extra motion | Trivial | Instant |

**Deliberately excluded:** number counters (would be fake), confetti or
celebration bursts (tacky), parallax beyond 8px (motion-sickness risk,
cost), auto-playing video in hero (bandwidth, Vercel Hobby limits).

### Diff — `app/globals.css` (new styles for this package)

```diff
--- a/app/globals.css
+++ b/app/globals.css
@@ append to motion layer
+/* ============================================================
+   SPARK-TWEAKS — hero art slot, showcase, proof links, final CTA,
+   FAQ motion, playful opt-in. All visual tokens below are the
+   CURRENT system; the rebrand winner swaps :root in one pass.
+   ============================================================ */
+
+/* ---------- hero art slot ---------- */
+
+.hero-art {
+  margin: 44px auto 0;
+  max-width: 880px;
+}
+
+.hero-art img {
+  width: 100%;
+  height: auto;
+  display: block;
+  border-radius: var(--radius);
+  border: 1px solid var(--hairline);
+  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.55);
+}
+
+/* ---------- showcase: first look ---------- */
+
+.showcase-grid {
+  display: grid;
+  gap: 20px;
+}
+
+@media (min-width: 860px) {
+  .showcase-grid {
+    grid-template-columns: 1fr 1fr;
+  }
+}
+
+.showcase-fig {
+  margin: 0;
+  background: var(--surface);
+  border: 1px solid var(--hairline);
+  border-radius: var(--radius);
+  overflow: hidden;
+  transition: transform 0.18s ease, border-color 0.2s ease, box-shadow 0.25s ease;
+}
+
+.showcase-fig:hover {
+  transform: translateY(-3px);
+  border-color: rgba(201, 161, 92, 0.35);
+  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.45);
+}
+
+.showcase-fig img {
+  width: 100%;
+  height: auto;
+  display: block;
+}
+
+.showcase-fig figcaption {
+  padding: 18px 22px;
+  color: var(--muted);
+  font-size: 0.95rem;
+}
+
+/* ---------- proof links (building in public) ---------- */
+
+.proof-label {
+  margin: 30px 0 12px;
+  color: var(--muted);
+  font-size: 0.95rem;
+}
+
+.proof-links {
+  display: flex;
+  flex-wrap: wrap;
+  gap: 10px;
+}
+
+.proof-links a {
+  display: inline-flex;
+  align-items: center;
+  gap: 8px;
+  color: var(--text);
+  border: 1px solid var(--hairline);
+  border-radius: 999px;
+  padding: 10px 18px;
+  font-size: 0.92rem;
+  font-weight: 500;
+  transition: border-color 0.2s ease, background 0.2s ease;
+}
+
+.proof-links a:hover {
+  border-color: rgba(201, 161, 92, 0.55);
+  background: var(--gold-wash);
+  text-decoration: none;
+}
+
+/* ---------- final CTA ---------- */
+
+.final-cta {
+  text-align: center;
+}
+
+.final-cta .container {
+  max-width: 720px;
+}
+
+.final-cta .waitlist {
+  margin-top: 8px;
+}
+
+/* ---------- FAQ: smooth open/close ---------- */
+
+.faq-item .faq-answer {
+  display: grid;
+  grid-template-rows: 0fr;
+  transition: grid-template-rows 0.35s cubic-bezier(0.22, 1, 0.36, 1);
+  padding: 0 26px;
+  color: var(--muted);
+}
+
+.faq-item .faq-answer > * {
+  overflow: hidden;
+  min-height: 0;
+}
+
+.faq-item .faq-answer p {
+  padding-bottom: 24px;
+}
+
+.faq-item[open] .faq-answer {
+  grid-template-rows: 1fr;
+}
+
+/* ---------- playful motion opt-in (★ north-star) ----------
+   Add class="motion-playful" to <main> when the playful-alive
+   direction wins. Refined-premium simply omits it. */
+
+@keyframes pop-in {
+  0% { opacity: 0; transform: translateY(18px) scale(0.97); }
+  60% { opacity: 1; transform: translateY(-4px) scale(1.008); }
+  100% { opacity: 1; transform: none; }
+}
+
+.motion-playful .hero-art {
+  animation: pop-in 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.42s both;
+}
```

**Replaces** the existing rule (the old `padding: 0 26px 24px` breaks the
0fr collapse):

```diff
--- a/app/globals.css
+++ b/app/globals.css
@@ faq answer (old rule — replaced by the block above)
-.faq-item .faq-answer {
-  padding: 0 26px 24px;
-  color: var(--muted);
-}
```

### Diff — `app/globals.css` (cleanup: duplicate `.honesty-ctas` block)

The file contains the `.honesty-ctas` rule twice (harmless but sloppy —
part of the "tacky" cleanup):

```diff
--- a/app/globals.css
+++ b/app/globals.css
@@ honesty CTAs
-.honesty-ctas {
-  display: flex;
-  flex-wrap: wrap;
-  gap: 14px;
-  margin-top: 36px;
-}
-
 .honesty-ctas {
   display: flex;
   flex-wrap: wrap;
   gap: 12px;
-  margin-top: 8px;
+  margin-top: 36px;
 }
```

### Diff — `app/globals.css` (extend reduced-motion to new classes)

```diff
--- a/app/globals.css
+++ b/app/globals.css
@@ prefers-reduced-motion
 @media (prefers-reduced-motion: reduce) {
   html { scroll-behavior: auto; }
-  .hero .pitch, .hero h1, .hero .lead, .hero .trajectory, .hero .waitlist {
+  .hero .pitch, .hero h1, .hero .lead, .hero .trajectory, .hero .hero-art, .hero .waitlist {
     animation: none;
   }
+  .motion-playful .hero-art {
+    animation: none;
+  }
+  .faq-item .faq-answer {
+    transition: none;
+  }
   .traj-line {
```

---

## 7. PER-DIRECTION NOTES — how hero/showcase treatment differs

The package above is identical under all three. What changes per winner:

### refined-premium (muted gold, restraint, whitespace)
- **Imagery:** minimal line work on near-black, generous whitespace. The
  existing `content/social-batch-1/visuals/trajectory-hero.webp` (gold
  curve on dark grid, "a number with a date is a plan") is the closest
  current reference for this register — superseded by the winner's
  `content/showcase/refined-premium/hero.png`.
- **Type feel:** serif display stays (or the winner's equivalent),
  restrained scale; league flavor quotes ("Winners keep going" etc.)
  should be **cut or set in quiet roman** — they read as the tacky edge
  under this direction.
- **Motion character:** slow, long eases, nothing loops. Traveler dot:
  change SMIL to `repeatCount="1"` (one ride, then park at the end of the
  line). Do **not** add `.motion-playful`. Keep reveals + FAQ motion only.
- **Showcase:** before/after trajectory pair in the same restrained
  style; captions stay factual.

### playful-alive ★ (lead horse — north star: modern, engaging, playful, inviting)
- **Imagery:** rat character + Duolingo energy; the winner's
  `content/showcase/playful-alive/hero.png` is expected to carry
  character + trajectory together. Brighter accent usage is welcome —
  still jewelry, not paint.
- **Type feel:** rounder, friendlier display; the pitch pill can carry
  more color.
- **Motion character:** springy overshoot entrances — add
  `class="motion-playful"` to `<main>` (wires up the `pop-in` keyframes
  in §6). The traveler dot **keeps looping** — under this direction it
  reads as the character running the race, which is the spark. Milestone
  tick pops stay. Gentle looping micro-motion is on-brand here.
- **Copy:** keep the league flavor quotes — they're the playful voice.
- **What leans into the north star most:** M5 pop-in hero entrance ★,
  the looping traveler dot as a "runner" ★, hero caption "Watch your
  dates move closer as you climb." ★, final CTA "The race is forming." ★,
  and the "follow along" proof row ★ (inviting > impressing).

### wildcard
- Unknown until the morning pick. This package stays compatible: the hero
  slot (`/showcase/hero.png` + Trajectory fallback), the motion hooks
  (reveal, tick-in, draw-line, FAQ), and the copy are all art-agnostic.
- Decide at pick: flavor quotes keep/cut, dot loops or parks, whether
  `.motion-playful` applies. No structural changes needed either way.

---

## 8. POST-PICK ROLLOUT — applying the winning rebrand to the site

One pass, in this order (tokens first, then this package's diffs):

1. **Hero art:** copy `content/showcase/<winner>/hero.png` →
   `landing/public/showcase/hero.png` (new directory). Companion art
   (before-after, unlock-card) → same folder with matching names; update
   the two `src`s in `components/Showcase.tsx`, or comment out
   `<Showcase />` in `page.tsx` if the winner ships no companion art.
2. **Color tokens:** `brand/tokens.json` + `landing/app/globals.css`
   `:root` (`--gold`, `--gold-bright`, `--gold-wash`, `--hairline`,
   `--surface`, `--surface-2`, `--text`, `--muted`, shadows). Every diff
   in this doc references these vars — one swap propagates.
3. **League accents:** `LEAGUES` array in `app/page.tsx` (currently
   `#B08D57 / #C9A15C / #E5C87E / #EDE6D6`) → winner's palette (or move to
   CSS vars at that time).
4. **Type:** `app/layout.tsx` font imports + `--font-display` /
   `--font-body` in `globals.css`; display scale per winner.
5. **Logo & share cards:** winner's `logo.svg` (dark-mode artwork) →
   `landing/public/brand/logo.svg`; regenerate `favicon.svg`,
   `favicon-512.png`, `og-image.png`. **Pre-existing bug:** `layout.tsx`
   metadata points at `/og-image.png` but the file lives at
   `public/brand/og-image.png` — fix by copying to `public/og-image.png`
   or changing the metadata path to `/brand/og-image.png`.
6. **Direction toggles:** `motion-playful` class on `<main>` iff playful
   wins; SMIL `repeatCount="1"` on the traveler dot iff refined wins;
   flavor quotes keep/cut per §7.
7. **Verify:** `npm run build`; full-page visual pass (desktop + mobile);
   contrast check text vs new surfaces; OG card render test;
   `prefers-reduced-motion` pass.
8. **Out of scope here:** socials rollout (banners, avatars) is the
   parallel stream's lane — the site only needs the logo/OG refresh.

---

## 9. OTHER HIGH-LEVERAGE ITEMS (kept / noted, no diff)

- **Survey CTA** (`SURVEY_URL` in `page.tsx`) already renders — leave as is.
- **Referral microcopy** in `WaitlistCapture` is honest and consistent —
  unchanged.
- **Nav** stays minimal (logo + "Join the waitlist") — correct for V0.
- **Section order** (Hero → Problem → HowItWorks → Showcase → Leagues →
  AloneTogether → BuildingInPublic → FAQ → FinalCta) follows
  problem → mechanism → proof → objection-handling → ask. No reorder
  proposed.
- **Name "Rat Race" stays** per the rebrand brief; no ™/® anywhere
  (HONESTY RULE).

---

## 10. COULD NOT VERIFY

- **Showcase mockups absent:** `~/workspace/rat-race-v0/content/showcase/`
  exists but was **empty** at check (~01:00 EDT, Sep 26). All hero/showcase
  art references are designed as drop-in slots; nothing here depends on
  the art existing.
- **Interim art reviewed:** `content/social-batch-1/visuals/trajectory-hero.webp`
  viewed — strong gold-trajectory-on-dark-grid visual, usable as an
  interim/refined-premium-adjacent reference, superseded by the rebrand
  winner.
- **Diffs not compiled:** morning review should run `npm run build` in
  `landing/` after applying. Diffs were grounded line-by-line in the
  current `page.tsx`, `globals.css`, `Trajectory.tsx`, and
  `WaitlistCapture.tsx` (read in full); context lines were copied
  verbatim.
- **Live-site parity:** fetched `https://theratrace.app` — rendered copy
  matches the repo source; no drift found.
- **SMIL `animateMotion`** (traveler dot) is Chromium-supported and fine
  for the pre-launch page; the refined-premium "park" variant is a
  one-attribute change (`repeatCount="1"`).
