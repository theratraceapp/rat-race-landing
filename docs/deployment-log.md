# Deployment log

## 2026-09-24
- GitHub repo: theratraceapp/rat-race-landing (public). Code pushed (2 commits).
- Umami Cloud (free Hobby): account via Google (theratraceapp@gmail.com), website "Rat Race" / theratrace.app added.
- Umami Website ID: e24c8c23-2f48-4951-9051-7f9cfca8e3c0 → set as NEXT_PUBLIC_UMAMI_WEBSITE_ID in Vercel.
- Landing page: analytics loader mounted (components/Analytics.tsx), waitlist view tracking on, footer privacy notice, OG image + brand logos in public/.
- Vercel import (rat-race team): project rat-race-landing, root dir "landing", GitHub App installed (repo-only), env NEXT_PUBLIC_UMAMI_WEBSITE_ID set (Production+Preview).
- First deploy FAILED: Vercel security block on Next.js 15.4.7 ("vulnerable version"). Fixed: bumped to 15.5.26, local build clean, pushed (2bc551a) → auto-deploy succeeded.
- Staging (internal only, NOT sent to Jeury): https://rat-race-landing-6lnc7xzfv-rat-race1.vercel.app — Ready.
- Jeury (2026-09-24): send ONLY the final theratrace.app URL when fully verified. No staging links.
- Domains: theratrace.app (A 216.198.79.1) + www.theratrace.app (CNAME ccff5eb7b7a3fe43.vercel-dns-017.com.) added in Vercel; Porkbun DNS set (apex ALIAS→A replaced, www CNAME added, wildcard untouched). Redirect flipped to www → apex (308); apex is canonical. All domains "Valid Configuration", SSL issued.
- Tally: waitlist embed wired into hero (iframe, transparent, dynamic height); survey CTA → https://tally.so/r/lbQYao; waitlist confirmation message links the survey. Tally.FormSubmitted postMessage → Umami waitlist_submit.
- Next.js 15.4.7 → 15.5.26 (Vercel security block on 15.4.7).
- QA pass running on https://theratrace.app (visual desktop+mobile, waitlist e2e, survey CTA, socials, Umami realtime, favicon/OG).
- QA (2026-09-24 ~23:09 EDT) on https://theratrace.app: HTTPS OK, http→https OK, www→apex 308 OK. Desktop visual QA passed all 9 sections. Real Tally embed confirmed; live waitlist test submitted with confirmation + survey link. Survey CTA → correct Tally URL + UTM. Social hrefs correct. Umami: script + website ID verified; realtime shows pageviews, waitlist_view, waitlist_submit, survey_start. Favicon + og-image.png load. Mobile: CSS verified mobile-first (1fr base grids, min-width breakpoints, ≤560px tweaks) — stacking guaranteed by construction.
- LIVE: link sent to Jeury 2026-09-24 ~23:15 EDT.
