# Rat Race — V0 Validation Survey: Tally Build Spec

**Status:** approved by founder, ready to build in Tally (free account: "theratrace app")
**Builder:** someone else will implement this in Tally — no browser actions taken
**Survey link destination:** shared from the waitlist confirmation page and socials (@theratraceapp)

---

## Builder's click-by-click summary

1. Tally → **Create form** → name it exactly: `Rat Race — Idea Validation Survey`
2. Form settings (⚙️):
   - **Show progress bar:** ON
   - **Estimated completion time:** set "3 min"
   - **Close on completion / redirect:** none (use the thank-you screen below)
   - **Notifications:** ON → send new submissions to **theratraceapp@gmail.com**
3. Add blocks in order, one per question (Q1–Q9 below). Use the **exact type, wording, and options** as specified — copy-paste from this doc.
4. Q4: set **Multiple choice** with multi-select ON and enable **"Other"** write-in option.
5. Q5: set **Multiple choice** with multi-select ON, limit selections to **2** ("Allow multiple answers, max 2").
6. Q9: **Short text**, enable **Email validation**, optional.
7. Thank-you page: paste the closing copy verbatim.
8. Publish → copy the share link → hand link to founder for waitlist confirmation page + socials.

**Total questions:** 9 (8–10 target; completable in under 3 minutes)

---

## Survey title

`Rat Race — Help shape a wealth-tracking app (3 min)`

## Intro copy (shown at top of form, before Q1)

> We're validating an idea — and your answers shape what we build.
>
> Rat Race is a gamified wealth-tracking app in its earliest stage. No app exists yet. We're doing research first, and this survey takes under 3 minutes. Nothing you share here implies anything about us other than that we're listening.
>
> **Tagline:** *A rat race you can win.*

---

## Questions

### Q1 — Age band
- **Tally type:** Multiple choice (single answer, vertical list)
- **Wording:** `What's your age?`
- **Options (in order):**
  1. 18–24
  2. 25–34
  3. 35–44
  4. 45–54
  5. 55+
  6. Prefer not to say
- **Required:** Yes
- **Logic:** none

### Q2 — Net-worth band
- **Tally type:** Multiple choice (single answer, vertical list)
- **Wording:** `Roughly, what's your current net worth? (Assets minus debts — a ballpark is fine.)`
- **Options (in order):**
  1. Under $100k
  2. $100k–$1M
  3. $1M–$10M
  4. $10M+
  5. Prefer not to say
- **Required:** Yes
- **Logic:** none

### Q3 — Which league resonates
- **Tally type:** Multiple choice (single answer, card layout if available, vertical list otherwise)
- **Wording:** `Rat Race is built around "leagues" — the wealth bracket you're playing in. Which one resonates most with where you are or where you're headed?`
- **Options (in order, with descriptions):**
  1. **The Climb** — $0–$1M
  2. **The Freedom** — $1M–$10M
  3. **The Empire** — $10M–$100M
  4. **The Dynasty** — $100M+
- **Required:** Yes
- **Logic:** none
- **Builder note:** In Tally, add the range as the option's description text if supported; otherwise format as `The Climb ($0–$1M)` etc.

### Q4 — Main frustration with tracking money
- **Tally type:** Multiple choice, **multi-select ON** (checkboxes), with **"Other" write-in enabled**
- **Wording:** `What's your main frustration with tracking your money today? (Pick all that apply.)`
- **Options (in order):**
  1. Spreadsheets are a chore
  2. Apps don't show me if I'm actually on track
  3. No clear projected dates for my goals
  4. Too much noise / social comparison
  5. I don't track at all
  6. Other (write-in)
- **Required:** Yes
- **Logic:** none

### Q5 — Desired weekly behavior
- **Tally type:** Multiple choice, **multi-select ON, max 2 selections**
- **Wording:** `What would make you actually open a money app every week? (Pick up to 2.)`
- **Options (in order):**
  1. Seeing my trajectory — am I on track or falling behind
  2. A clear projected date for reaching my goal
  3. Friendly competition or league standings
  4. Nudges when something needs my attention
  5. Nothing — I wouldn't open a money app weekly
- **Required:** Yes
- **Logic:** none
- **Builder note:** In Tally, set "Allow multiple answers" ON and "Maximum number of selections" = 2.

### Q6 — Willingness to enter data manually
- **Tally type:** Multiple choice (single answer)
- **Wording:** `Would you type in one number a week if it showed your trajectory toward your goal?`
- **Options (in order):**
  1. Yes
  2. Maybe
  3. No
- **Required:** Yes
- **Logic:** none

### Q7 — Interest in ~$99/year automatic sync
- **Tally type:** Multiple choice (single answer)
- **Wording:** `If Rat Race offered automatic account sync for around $99/year (no manual entry), would that interest you?`
- **Options (in order):**
  1. Yes
  2. Maybe at a lower price
  3. No — manual is fine
- **Required:** Yes
- **Logic:** none

### Q8 — Feature requests (open text, optional)
- **Tally type:** Long text (paragraph)
- **Wording:** `What should we build first? Any feature you wish existed for tracking your wealth?`
- **Required:** No (optional)
- **Placeholder text:** `Tell us anything — the more specific, the better.`
- **Logic:** none

### Q9 — Email for early access (optional)
- **Tally type:** Short text with **email validation ON**
- **Wording:** `Want early access when we start building? Drop your email — we'll add you to the waitlist.`
- **Required:** No (optional)
- **Logic:** none
- **Builder note:** this links to the waitlist; submissions also notify **theratraceapp@gmail.com** (set in form notifications).

---

## Closing / thank-you copy

> **Thank you — this genuinely shapes what we build.**
>
> Rat Race is still an idea being validated, and your answers just made it smarter. If you left your email, you're on the waitlist — we'll reach out when there's something real to show.
>
> *A rat race you can win.*

---

## Estimated completion time

**Under 3 minutes** (9 questions: 7 multiple-choice, 1 optional paragraph, 1 optional email). Display "3 min" in Tally's estimated-time setting.

---

## Honesty / brand-voice checklist (for builder reference)

- Never imply existing users, traction, or validation — copy above frames this as early research shaping what gets built.
- No trademark claims anywhere in the survey.
- Voice: confident, warm, precise, quietly ambitious; financially literate, never condescending; anti-hype.
- Tagline "A rat race you can win." appears in intro and thank-you copy.

---

## QA checklist (before publishing)

- [ ] All 9 questions present, exact wording and option order match this spec
- [ ] Q1–Q7 marked **required**; Q8 and Q9 **optional**
- [ ] Q4: multi-select ON, "Other" write-in enabled and working
- [ ] Q5: multi-select ON, **max 2** selections enforced (test selecting 3 — 3rd must be blocked or deselect)
- [ ] Q6 and Q7: single-answer only
- [ ] Q9: email validation rejects malformed addresses, accepts valid ones
- [ ] Progress bar visible; estimated time shows 3 min
- [ ] Test-submit the full form end-to-end on desktop and mobile; complete in under 3 minutes
- [ ] Test skipping Q8 and Q9 — submission must still succeed
- [ ] Confirm submission-notification email arrives at **theratraceapp@gmail.com**
- [ ] Thank-you page shows the closing copy verbatim
- [ ] Share link works in an incognito window (no login required to respond)
