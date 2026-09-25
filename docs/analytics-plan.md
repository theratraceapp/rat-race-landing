# Rat Race V0 — Analytics Plan

**Purpose:** Prove (or disprove) demand during market validation with the smallest
zero-cost, privacy-friendly analytics setup that answers the founder's real questions:
*Is anyone landing? Are they joining the waitlist? Are they finishing the survey?
Which social channels actually send people?*

**Status:** Implementation plan — the drop-in code lives in `docs/analytics-snippet/`.
The landing page is a Next.js app on the Vercel **rat-race** team (Hobby plan).
Survey lives on Tally (free account "theratrace app").

**Last verified:** 2026-09-24 (Vercel + Umami free-tier details checked against
current docs/pricing pages; Plausible, Umami, Vercel compared).

---

## 1. Recommended primary stack: Umami Cloud (free Hobby tier)

| Tool | Free-tier facts (2026) | What it covers for V0 | What it can't cover |
|---|---|---|---|
| **Umami Cloud (Hobby, free)** — **PRIMARY** | 100K events/mo, 1 website, 6 months retention, full reporting suite on free: pageviews, referrers, UTM, **custom events with properties, funnels, realtime, data export**. No credit card. | (a) Traffic: pageviews, unique visitors, referrers, countries/devices.<br>(b) Conversion: `waitlist_view` vs `waitlist_submit` events → waitlist conversion rate.<br>(c) Survey start (`survey_start` click event) + completion via Tally native stats (see §4).<br>(d) Social clicks: `social_click` event with `network` property per channel. | Only 1 website on free (fine — V0 is one landing page). 6-month retention (fine for a validation sprint; export monthly if you want history). Umami is server-side-hosted in the US by default — see §5 privacy note. |
| Vercel Web Analytics (Hobby, free) — OPTIONAL supplement | 50,000 events/mo free, cookieless, zero-config (one click in dashboard + `<Analytics/>`). | Pageviews + referrers as a second opinion. Nice because it's native to the deploy platform. | **Custom events (`track()`) are Pro-only — on Hobby the code runs and records nothing.** So it *cannot* measure waitlist conversion, survey starts, or social clicks. Also only 1 month reporting window on Hobby. Do not rely on it for the V0 validation questions. |
| Tally native stats (free) | Built-in: form views, submissions, completion rate, per-question drop-off. | (c) Survey **completion** — the only place a completion can be measured, since the survey form lives off-site. | Can't attribute completions back to landing-page sources by itself — pair with UTMs (see §4). |
| Plausible | No free cloud tier ($9+/mo); self-hosted CE is free but out of scope (no server). | — | Ruled out: zero-cost requirement. |
| GA4 / PostHog / Mixpanel | GA4 is free but cookie-based → consent banner required, and a compliance liability. PostHog/Mixpanel free tiers are generous but product-analytics-heavy (overkill, SDK weight, cookie concerns). | — | Ruled out: banner requirement / overkill for 4 questions. |

**Bottom line:** Umami Cloud free is the only zero-cost option where custom events,
funnels, and UTM attribution all work on the free tier — exactly the three things
the V0 validation questions need. Vercel Analytics Hobby is a reasonable *optional*
add-on for traffic cross-checking, but it cannot answer the conversion questions
(b) or (d), so it must not be the primary.

> **Action item (founder, ~10 min, can't be automated):** create a free Umami Cloud
> account, add `theratrace.app` as the one free website, copy the **Website ID**,
> and paste it as `NEXT_PUBLIC_UMAMI_WEBSITE_ID` in the Vercel project env vars
> (Production + Preview). No code can do this step — it needs the account signup.

---

## 2. What each V0 question gets measured with

### (a) Traffic — pageviews, referrers
- **Tool:** Umami automatic pageview tracking (script tag, zero code).
- **See:** Umami dashboard → Overview (unique visitors, pageviews), Sources
  (referrers, UTM campaigns), Devices/Browsers, Countries.
- **UTM:** append UTMs to every link you share *outward* (social bios, Reddit
  posts, comments, directories — see §6) so inbound source attribution works
  even when referrers are stripped by apps (Instagram/TikTok in-app browsers
  almost always strip referrers).

### (b) Visitor → waitlist conversion (form views vs submits)
- **Tool:** Umami custom events via the `data-analytics` attribute system
  (see `docs/analytics-snippet/`).
- **Events:**
  - `waitlist_view` — fired once when the waitlist form scrolls into view
    (IntersectionObserver helper in `lib/analytics.ts`).
  - `waitlist_submit` — fired on successful form submit (attribute on the
    `<form>` or submit handler).
- **Metrics to compute (Umami funnel):** Visitors → `waitlist_view` →
  `waitlist_submit`. The funnel gives you the two rates that matter:
  *form-view rate* (did the hero copy earn a scroll?) and *form-submit rate*
  (did the form itself convert?).
- **Why views AND submits:** if views are high but submits are low, the form
  (fields, friction, trust) is the problem; if views are low, the hero/value
  prop is the problem. One number can't tell you which.

### (c) Survey start / complete (Tally)
The survey form lives on Tally, off-site. Measure it in two halves:

- **Start — on the landing page:** `data-analytics="survey-start"` on every
  "Take the survey" / "Help us build it" CTA. This is a click event in Umami,
  equivalent to "visitor expressed intent and left for the survey."
- **Complete — on Tally:** Tally's built-in stats (free) show *form views*,
  *submissions*, and *completion rate* per form, plus per-question drop-off.
  Check it weekly — no integration needed.
- **Attribution glue — UTMs:** append the same UTM convention (§6) to the
  Tally survey link (e.g. `?utm_source=ratrace-landing&utm_medium=cta&utm_campaign=survey-v1`)
  so Tally's response metadata and Umami both know where completions came from.
  Tally records the URL params with each response.
- **Optional (stretch, not required):** enable Tally's "redirect on completion"
  to a landing-page URL like `/thanks?utm_source=tally&utm_medium=survey&utm_campaign=survey-v1`.
  That pageview in Umami becomes a `survey_complete` proxy you can funnel.
  Only worth it once baseline volume justifies it.

### (d) Outbound social clicks (X, Instagram, TikTok, Threads, YouTube)
- **Tool:** Umami custom event `social_click` with property `network`
  (`x | instagram | tiktok | threads | youtube`) and property `url` (the href).
- **How:** put `data-analytics="social-x"` (etc.) on each social icon/link —
  the `<Analytics/>` component's delegated click listener catches them all,
  so no per-link code is needed (see `docs/analytics-snippet/`).
- **Also add UTMs to the outbound hrefs** (e.g. `?utm_source=ratrace-landing&utm_medium=social-footer`)
  — belt-and-suspenders for any downstream attribution, and it costs nothing.
- **Watch-out:** some in-app browsers / privacy settings block outbound
  navigation or the event beacon. Keep `waitlist_submit` as the primary
  conversion metric and treat social clicks as directional, not exact.

---

## 3. Event taxonomy (canonical names)

| Event | Fires when | Properties |
|---|---|---|
| `waitlist_view` | waitlist form enters viewport (once per page load) | `placement` (e.g. `hero`, `footer`) |
| `waitlist_submit` | form successfully submitted | `placement` |
| `survey_start` | visitor clicks a survey CTA | `placement` |
| `social_click` | visitor clicks a social link | `network` (`x`,`instagram`,`tiktok`,`threads`,`youtube`), `url` |

Naming rules: lowercase snake_case, past tense, no PII in names or properties
(no emails, no names — the email collected by the form must never be sent as an
event property).

---

## 4. Privacy / cookie / consent notes

Goal: **no cookie banner, GDPR-light.**

- **Umami is cookieless by design.** No cookies, no localStorage, no
  fingerprinting; it aggregates from a salted hash that rotates. The snippet
  ships with `data-do-not-track` so visitors with DNT enabled are excluded.
- **This means: no consent banner is required** for analytics purposes in the
  EU/UK reading of GDPR as applied to cookieless, non-identifying measurement.
  (Not legal advice — but this is the standard configuration used by
  privacy-first sites.)
- **Still do:** add a one-paragraph disclosure to the footer/privacy page
  (template in `docs/analytics-snippet/PRIVACY-NOTICE.md`): what is collected
  (page paths, referrers, anonymized device/country, anonymous event counts),
  that no cookies are set and no personal data is stored.
- **Data residency:** Umami Cloud hosts data in the US by default. For a US
  founder validating a US product this is fine; note it in the privacy notice.
- **Tally:** survey responses (including the waitlist email) are stored by
  Tally — the survey itself, not the analytics, is where personal data lives.
  Keep emails out of Umami events (see §3 naming rules).
- **Ad-blockers will undercount.** Expect 10–30% of visitors to be invisible to
  any client-side analytics. Treat numbers as directional; compare week over
  week, not against absolute truth.

---

## 5. UTM conventions

Apply to: survey link (Tally), outbound social profile links, and any link
*you* share outward (social bios, posts, comments, directories).

```
utm_source   = where the click came from: x | instagram | tiktok | threads | youtube | tally | reddit | directory
utm_medium   = how: social | cta | bio | post | comment
utm_campaign = what push: waitlist-v1 | survey-v1 | launch
```

Examples:
- Survey CTA → `https://tally.so/r/<form-id>?utm_source=ratrace-landing&utm_medium=cta&utm_campaign=survey-v1`
- Social bio link → `https://theratrace.app?utm_source=x&utm_medium=bio&utm_campaign=waitlist-v1`
- Reddit comment → `https://theratrace.app?utm_source=reddit&utm_medium=comment&utm_campaign=waitlist-v1`

Keep the canonical set in one place (update this doc when a new campaign starts)
so Umami's Sources report stays readable instead of fragmenting into typos.

---

## 6. Weekly metrics checklist (founder, ~5 min every Monday)

Open the Umami dashboard (and Tally → survey stats) and write down **4 numbers**:

1. **Unique visitors (7d)** — is the top of the funnel growing? (Umami Overview)
2. **Waitlist conversion rate (7d)** — `waitlist_submit ÷ unique visitors`
   (and glance at `waitlist_view` to see if the drop is the hero or the form).
   Target for V0: you're looking for signal, not a specific number — but
   <1% submit rate after 500+ visitors = messaging problem, not a traffic problem.
3. **Survey completion rate (7d)** — Tally *submissions ÷ views*; and
   `survey_start` (Umami) vs Tally *views* to see the click→landing drop-off.
   Watch the per-question drop-off to cut or reorder questions.
4. **Top 3 traffic sources + social CTR** — which channel sends visitors
   (Umami Sources / UTM report), and `social_click` counts per `network`.
   Double down on what works; kill what doesn't.

**Funnels to save in Umami (one-time setup):**
- Funnel 1 "Waitlist": pageview `/` → `waitlist_view` → `waitlist_submit`
- Funnel 2 "Survey": pageview `/` → `survey_start` → (Tally submissions, checked manually)

**Guardrails:** if Umami's monthly event usage approaches the 100K free cap,
check *Settings → Usage*. V0 validation traffic won't get near it (a pageview
+ a few events per visitor = ~100K events only at ~20K+ visitors/mo), but
glance monthly. If you ever outgrow free: Vercel Pro ($20/mo) unlocks custom
events in Vercel Analytics, or Umami Pro ($20/mo) — decide then, not now.

---

## 7. Implementation status

- [x] Plan written (this doc)
- [x] Drop-in snippet written (`docs/analytics-snippet/` — README + `lib/analytics.ts` + `components/Analytics.tsx` + privacy notice template)
- [ ] Founder creates Umami Cloud account + website, copies Website ID
- [ ] `NEXT_PUBLIC_UMAMI_WEBSITE_ID` set in Vercel (Production + Preview)
- [ ] Snippet pasted into `landing/` per README (landing-page subagent)
- [ ] `data-analytics` attributes added to waitlist form, survey CTAs, social links
- [ ] UTMs added to survey link + outbound social hrefs
- [ ] Verify: visit the deployed site, confirm events in Umami Realtime view
- [ ] Funnels saved in Umami dashboard
