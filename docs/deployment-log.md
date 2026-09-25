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
