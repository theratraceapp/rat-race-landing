"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "../../components/Logo";
import { shareUrl } from "@/lib/referral";
import { trackEvent, EVENTS } from "@/lib/analytics";

/**
 * /welcome — the post-signup share page (v1 referral layer, no backend).
 * Arrives as /welcome?code=<my_code> after Tally.FormSubmitted.
 * Shows the visitor's personal invite link + the referral reward tiers.
 * No queue position is shown: without a backend there is no live count,
 * and we don't fake one — positions go out by email from real data.
 */

const STEPS = [
  {
    n: "1",
    title: "Copy your link",
    body: "It's yours alone — every signup through it is credited to you.",
  },
  {
    n: "2",
    title: "Share it anywhere",
    body: "Group chats, X, Threads, that one friend who's always talking about money.",
  },
  {
    n: "3",
    title: "Climb the queue",
    body: "Referrals move you up. Launch invites go out in waves, top of the queue first.",
  },
] as const;

const TIERS = [
  {
    n: "1 referral",
    title: "Jump the queue",
    body: "Every referral moves you up — launch access goes out in waves, starting at the top.",
  },
  {
    n: "3 referrals",
    title: "Founding Racer",
    body: "Permanent Founding Racer status on your profile. The early believers get the badge.",
  },
  {
    n: "5 referrals",
    title: "Founders Wall",
    body: "Your name on the Founders Wall — plus a vote on what gets built first.",
  },
  {
    n: "10 referrals",
    title: "The Paddock",
    body: "A private channel with the build team. Watch the race get built, up close.",
  },
  {
    n: "Top 10 referrers",
    title: "Golden Ticket",
    body: "Day-one access before the public launch. The fastest racers run first.",
  },
] as const;

export default function WelcomeClient() {
  const params = useSearchParams();
  const code = (params.get("code") || "").trim().slice(0, 32);
  const link = useMemo(() => (code ? shareUrl(code) : ""), [code]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    trackEvent(EVENTS.WELCOME_VIEW, { has_code: Boolean(code) });
  }, [code]);

  const copy = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = link;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    trackEvent(EVENTS.REFERRAL_COPY, {});
    window.setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="welcome">
      <header className="nav">
        <nav className="nav-inner" aria-label="Primary">
          <Logo />
          <Link href="/" className="btn btn-ghost btn-sm">
            Back to the site
          </Link>
        </nav>
      </header>

      <main className="container welcome-inner">
        <p className="kicker">You&rsquo;re in the queue</p>
        <h1>
          You&rsquo;re on <span className="gold-word">the list.</span>
        </h1>
        <p className="lead">
          Now the fun part: every friend who joins through your link moves
          you up the launch queue.
        </p>

        {link ? (
          <div className="share-box">
            <p className="share-label">Your invite link</p>
            <div className="share-row">
              <code className="share-link">{link}</code>
              <button
                type="button"
                className="btn btn-gold btn-sm"
                onClick={copy}
              >
                {copied ? "Copied ✓" : "Copy link"}
              </button>
            </div>
          </div>
        ) : (
          <div className="share-box">
            <p className="share-label">Invite link</p>
            <p>
              Your personal invite link appears here right after you join the
              waitlist. Your queue position will arrive by email as launch
              approaches.
            </p>
          </div>
        )}

        <div className="grid grid-3 welcome-steps">
          {STEPS.map((s) => (
            <article className="card" key={s.n}>
              <span className="step-num" aria-hidden="true">
                {s.n}
              </span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>

        <h2>
          What referrals <span className="gold-word">unlock</span>
        </h2>
        <ul className="tier-list">
          {TIERS.map((t) => (
            <li className="card tier-card" key={t.title}>
              <p className="tier-n">{t.n}</p>
              <div>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="honest-note">
          Queue positions go out by email as launch approaches — counted from
          real signups, never a fake live counter.
        </p>
      </main>
    </div>
  );
}
