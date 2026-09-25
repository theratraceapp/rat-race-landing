# Rat Race — Waitlist Form Spec (Tally)

> Build-ready spec for the waitlist form embedded on theratrace.app. Deliverable of the waitlist-form copywriter task. File location: `~/workspace/rat-race-v0/forms/waitlist-tally.md`

---

## BUILDER QUICK-REFERENCE: click-by-click spec

- **Tool:** Tally (form builder — free account "theratrace app" already exists).
- **Form type:** Simple form (one page, no logic jumps).
- **Steps:**
  1. In Tally dashboard → **Create form** → choose **Simple form**.
  2. Rename form to: `Rat Race — Waitlist`.
  3. Set the **title block** to the title and description below.
  4. Add fields in the exact order listed in "Fields (build order)".
  5. For each field, set required/optional and options exactly as specified.
  6. **Settings → Notifications:** turn email notifications **ON** → recipient `theratraceapp@gmail.com`.
  7. **Settings → Post-submit:** set the confirmation message exactly as specified below (no redirect URL for V0).
  8. **Settings → Embed:** configure per "Embed notes" below; copy the embed snippet for the landing-page engineer.
  9. QA per the checklist at the bottom before handing off the embed snippet.

---

## Form title

**Rat Race — Waitlist**

## Form description

> We're building a gamified way to track your net worth — and we're building it in public. Join the waitlist for early access when we launch.

---

## Fields (build order)

**Field 1 — chosen**
- **Tally field type:** Email
- **Label:** Email
- **Help text:** We'll email you once early access opens — nothing else, no spam.
- **Required:** Yes (only required field on the form)

**Field 2 — chosen**
- **Tally field type:** Multiple choice (single select)
- **Label:** What best describes you?
- **Help text:** (none)
- **Required:** Optional
- **Options (exact):**
  1. Under $100k
  2. $100k–$1M
  3. $1M–$10M
  4. $10M+
  5. Prefer not to say

**Field 3 — chosen**
- **Tally field type:** Short text (single line)
- **Label:** If Rat Race existed today, what's the first thing you'd track?
- **Help text:** A sentence or two is plenty — it helps us build the right thing.
- **Required:** Optional

### Why these fields

1. **"What best describes you?" (net-worth band)** — For a validation phase, knowing *who* is signing up matters as much as *how many*. Net-worth bands tell us whether the waitlist matches the target audience (builders of real net worth) without asking anything sensitive like an exact number. "Prefer not to say" keeps it low-pressure and honest.
2. **"What's the first thing you'd track?" (short text)** — This is the single most valuable V0 research question: free-text answers reveal which features people actually want before we write a line of code. Together with the net-worth band, it lets us segment: do $1M+ signups want something different than <$100k signups?
- **Email stays the only required field** — every optional field must pull its weight, and both of these do. Two qualifying fields + email keeps the form under ~30 seconds while giving validation-grade signal.

---

## Validation notes

- **Email field:** use Tally's built-in Email field type — it enforces valid email format natively (rejects `not-an-email`, requires an `@` and a valid domain shape). No custom regex needed.
- **Short text field:** cap character count if Tally supports it (suggest 200 characters) to keep answers scannable.
- **Submit button text:** `Join the waitlist`

---

## Confirmation message (post-submit)

> You're on the list. We'll email you the moment early access opens — and if you'd like to shape what we build, here's a short research survey: **[SURVEY LINK PLACEHOLDER]**. Thanks for being early.

---

## Embed notes (for the landing-page engineer)

- **Background:** use transparent background so the form inherits the dark-first premium page styling. In Tally: **Settings → Embed / page appearance → transparent background** (if the option is labeled differently in the current Tally UI, choose whichever setting makes the form background transparent / blend with the parent page).
- **Alignment:** center the form on the section; constrain max width to roughly 480–560px so it reads well on desktop and mobile.
- **Form chrome:** hide Tally branding/badge if the plan allows; keep the submit button full-width within the form container. Ask the engineer to style the submit button to match the landing page's primary CTA (dark surface + high-contrast accent).
- **Placeholder:** the engineer should look for the embed marker `<!-- RAT-RACE-WAITLIST-FORM -->` in the landing page HTML — paste the Tally embed snippet there.
- **Do not** embed the form inside a modal or behind a click for V0 — it should be visible on page load in the hero/next section.

---

## QA checklist

1. Test-submit with a real email → confirm the confirmation message shows, the submission appears in Tally responses, and the email notification arrives at `theratraceapp@gmail.com`.
2. On the dark landing page, confirm the form renders readable (transparent background, no white box, labels legible) on desktop and mobile widths.
