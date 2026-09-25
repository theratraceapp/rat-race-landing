/**
 * lib/referral.ts
 * V1 referral mechanics for the waitlist — no backend.
 *
 * Flow:
 *  1. Each visit to the landing page mints a random `my_code` (per page
 *     load), forwarded into the Tally embed as the hidden field `my_code`.
 *  2. An inbound `?ref=<code>` is forwarded into the embed as the hidden
 *     field `referred_by` (referral attribution).
 *  3. On Tally.FormSubmitted, the top window navigates to
 *     /welcome?code=<my_code>, where the visitor gets their share link:
 *     https://theratrace.app/?ref=<my_code>
 *  4. Weekly, a Tally CSV export is joined by scripts/referral-count.mjs:
 *     referrals(code) = responses with referred_by == code, excluding
 *     self-referrals (referred_by == own my_code).
 *
 * Client-only: uses crypto.getRandomValues — import from client components only.
 */

const CODE_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789"; // no lookalike chars
export const REFERRAL_CODE_LENGTH = 8;

/** Random, unguessable-enough referral code for this visit. */
export function generateReferralCode(): string {
  const buf = new Uint32Array(REFERRAL_CODE_LENGTH);
  crypto.getRandomValues(buf);
  let out = "";
  for (let i = 0; i < REFERRAL_CODE_LENGTH; i++) {
    out += CODE_ALPHABET[buf[i] % CODE_ALPHABET.length];
  }
  return out;
}

/** The share link a referrer hands out. */
export function shareUrl(code: string): string {
  return `https://theratrace.app/?ref=${encodeURIComponent(code)}`;
}
