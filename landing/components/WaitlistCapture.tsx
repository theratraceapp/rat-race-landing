"use client";

/**
 * WaitlistCapture — the email capture block used in the hero (and
 * anywhere else the page needs it).
 *
 * PLACEHOLDER STATE (current):
 *   This renders a polished, on-brand inline email form so the page
 *   looks intentional while the real signup mechanism is being set up.
 *   It does NOT submit anywhere yet.
 *
 * ================================================================
 * TODO — wire the real form backend (Tally embed):
 * ---------------------------------------------------------------
 * 1. In Tally, open the waitlist form and copy the embed snippet
 *    (the `<iframe data-tally-src="https://tally.so/embed/…">` block,
 *    or the popup/prefill script if a popup is preferred).
 * 2. Replace the contents of the <form> below (between the
 *    TALLY-START / TALLY-END markers) with the Tally embed code.
 * 3. Keep the surrounding wrapper and the microcopy, and keep the
 *    `data-analytics="waitlist-submit"` attribute on the element that
 *    marks a signup, so the analytics plan keeps working.
 * 4. If the embed includes its own submit button, remove the
 *    placeholder <button> here to avoid a double CTA.
 * 5. Delete this comment block once wired.
 *    — TALLY-START —
 *    (paste Tally embed here)
 *    — TALLY-END —
 * ================================================================
 *
 * Analytics contract (see landing/ANALYTICS-HOOKS.md):
 * - The form carries data-analytics="waitlist-submit".
 * - On a real signup, fire: window.dispatchEvent(new CustomEvent("ratrace:waitlist-submit"))
 */

export default function WaitlistCapture({ id = "waitlist" }: { id?: string }) {
  return (
    <div className="waitlist" id={id}>
      {/*
        ================================================================
        <!-- RAT-RACE-WAITLIST-FORM -->
        TALLY-START — paste the real Tally embed code here.
        Keep data-analytics="waitlist-submit" on the wrapper below.
        (Embed notes: forms/waitlist-tally.md — use transparent background
        so the form inherits this page's dark styling.)
        ================================================================
      */}
      <form
        className="waitlist-form"
        data-analytics="waitlist-submit"
        data-analytics-placement="hero"
        action="#"
        method="post"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Join the Rat Race waitlist"
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-describedby={`${id}-hint`}
        />
        <button type="submit" className="btn btn-gold">
          Join the waitlist
        </button>
      </form>
      {/*
        ================================================================
        TALLY-END
        ================================================================
      */}
      <p className="microcopy" id={`${id}-hint`}>
        We&rsquo;re building in public — join the waitlist for early access.
      </p>
      {/* Placeholder form — the Tally embed replaces the <form> above when ready. */}
    </div>
  );
}
