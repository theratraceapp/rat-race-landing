# Deploying the Rat Race V0 landing page to Vercel

The deployer needs: a Vercel account (the `rat-race` team, Hobby plan) and this
`landing/` directory pushed to a git repo (GitHub/GitLab/Bitbucket).

> Scope note: this doc covers deployment only. No DNS changes, no purchases,
> no git pushes were made while building — that's the deployer's job.

## One-time setup

1. **Copy logo assets** (optional but recommended):
   copy everything from `~/workspace/rat-race-v0/brand/logo/` into
   `landing/public/brand/`. The site works without them (text wordmark
   fallback), but the real logo should go live with the launch.
2. **Wire the Tally embed** in `components/WaitlistCapture.tsx` (see the
   `TODO` / `TALLY-START` markers), or ship with the styled placeholder.
3. Push the `landing/` directory to a git repository.

## Vercel project settings

| Setting | Value |
|---|---|
| Framework preset | **Next.js** (auto-detected — leave as-is) |
| Root directory | `landing` (the folder containing `package.json`) |
| Build command | `npm run build` (default) |
| Output directory | `.next` (default — do not change) |
| Install command | `npm install` (default) |
| Node.js version | 18.x or newer (20.x recommended; project engines: `>=18.18.0`) |

**Environment variables:** none required. The site has no backend, no API keys,
no secrets.

**Custom domain (optional, later):** `theratrace.app` is the intended domain.
Add it under Project → Settings → Domains when ready. DNS changes are out of
scope for this build.

## Verify after deploy

1. Open the production URL — hero renders immediately, no blocking loader.
2. Check the waitlist form section looks intentional (placeholder or Tally embed).
3. Confirm social links in the footer open the correct `@theratraceapp` profiles.
4. Quick mobile check: form stacks vertically, nav stays usable, no horizontal scroll.

## Rollback

Every Vercel deployment is immutable — roll back from the Deployments tab by
promoting a previous deployment. No database or state to worry about.
