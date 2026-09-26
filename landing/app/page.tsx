import Image from "next/image";
import Logo from "../components/Logo";
import WaitlistCapture from "../components/WaitlistCapture";
import HeroArt from "../components/HeroArt";
import Showcase from "../components/Showcase";
import AppGlimpse from "../components/AppGlimpse";
import { Reveal, ScrollChrome } from "../components/Reveal";

/*
 * Survey CTA (added to support the validation survey in forms/survey-tally.md).
 *
 * TODO — replace with the real Tally survey link once the survey form is
 * built in Tally (see forms/survey-tally.md). UTMs follow docs/analytics-plan.md §6
 * so survey starts stay attributable in the analytics funnel.
 *
 * The "Take the 3-minute survey" button below renders ONLY when this URL has
 * been replaced with a real one (i.e. no longer contains "REPLACE-WITH").
 * This keeps the live page free of dead links while the survey is unbuilt.
 * The button carries data-analytics="survey-start" — keep it on the final URL.
 */
const SURVEY_URL =
  "https://tally.so/r/lbQYao?utm_source=ratrace-landing&utm_medium=cta&utm_campaign=survey-v1";

/* ---------------------------------- nav ---------------------------------- */

function Nav() {
  return (
    <header className="nav">
      <nav className="nav-inner" aria-label="Primary">
        <Logo />
        <a href="#waitlist" className="btn btn-primary btn-sm">
          Join the waitlist
        </a>
      </nav>
    </header>
  );
}

/* ---------------------------------- hero ---------------------------------- */

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <div className="container">
        <p className="pitch">The MMO for money</p>
        <h1 id="hero-heading">
          A rat race <span className="accent-word">you can win.</span>
        </h1>
        <p className="lead">
          Rat Race turns your net worth into a game worth playing — pick 1–3
          goals, enter one rough number, and get a projected date for each.
          Then watch the dates move closer as you climb.
        </p>
        <HeroArt />
        <WaitlistCapture />
      </div>
    </section>
  );
}

/* --------------------------------- problem --------------------------------- */

function Problem() {
  return (
    <section className="block" aria-labelledby="problem-heading">
      <div className="container">
        <p className="kicker">The problem</p>
        <Reveal>
          <blockquote className="problem-quote" id="problem-heading">
            &ldquo;A number without a trajectory is trivia; a number with a date
            is a <span className="accent-word">plan</span>.&rdquo;
          </blockquote>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="problem-body">
          <p>
            Most wealth tools show you a number and stop there. A balance is a
            snapshot — it tells you where you stand, not where you&rsquo;re
            headed or when you&rsquo;ll arrive.
          </p>
          <p>
            Rat Race gives every number a trajectory: your league, your
            progress, and the dates your goals actually land. Trivia becomes a
            plan. A plan becomes a race you can win.
          </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- how it works ------------------------------- */

const STEPS = [
  {
    n: "1",
    title: "Pick 1–3 unlocks",
    body: "Choose the goals that matter to you — a paid-off home, a sabbatical, generational wealth. Your race, your finish lines.",
  },
  {
    n: "2",
    title: "Enter one rough number",
    body: "No bank logins, no spreadsheets, no perfectionism. One honest estimate of your net worth is enough to start.",
  },
  {
    n: "3",
    title: "See your race",
    body: "Instantly get your league, your progress toward each unlock, and the projected dates you'll hit them.",
  },
] as const;

function HowItWorks() {
  return (
    <section className="block" aria-labelledby="how-heading">
      <div className="container">
        <Reveal>
        <div className="section-head">
          <p className="kicker">How it works</p>
          <h2 id="how-heading">
            Racing in <span className="accent-word">three steps</span>
          </h2>
          <p>
            No setup marathons. No financial degree required. You&rsquo;ll see
            your race in under a minute.
          </p>
        </div>
        </Reveal>
        <div className="grid grid-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <article className="card">
                <span className="step-num" aria-hidden="true">
                  {s.n}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- leagues --------------------------------- */

/* League accents — ultraviolet tints, rising in lightness as the race climbs. */

const LEAGUES = [
  {
    name: "The Climb",
    range: "$0 – $1M",
    accent: "#9D5CFF",
    body: "Building the foundation. Every dollar saved is experience points toward your first million.",
    flavor: "“Everyone starts here. Winners keep going.”",
  },
  {
    name: "The Freedom",
    range: "$1M – $10M",
    accent: "#B585FF",
    body: "Work becomes optional. Your money starts pulling its own weight — and then some.",
    flavor: "“The grind becomes a choice.”",
  },
  {
    name: "The Empire",
    range: "$10M – $100M",
    accent: "#D3B8FF",
    body: "Capital becomes a team. Businesses, portfolios, and assets working while you sleep.",
    flavor: "“Play at a bigger table.”",
  },
  {
    name: "The Dynasty",
    range: "$100M+",
    accent: "#F5F1FF",
    body: "Wealth that outlives you. The long game: legacy, philanthropy, and the next hundred years.",
    flavor: "“Win the race for generations.”",
  },
] as const;

function Leagues() {
  return (
    <section className="block" aria-labelledby="leagues-heading">
      <div className="container">
        <Reveal>
        <div className="section-head">
          <p className="kicker">The leagues</p>
          <h2 id="leagues-heading">
            Every wealth level, <span className="accent-word">one race</span>
          </h2>
          <p>
            Your league is set by your net worth — but the race is always
            against your own goals, never against anyone else&rsquo;s balance.
          </p>
        </div>
        </Reveal>
        <div className="grid grid-4">
          {LEAGUES.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.1}>
              <article
                className="card league-card"
                style={{ ["--accent" as string]: l.accent }}
              >
                <p className="league-range">{l.range}</p>
                <h3>{l.name}</h3>
                <p>{l.body}</p>
                <p className="flavor">{l.flavor}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- alone, together ------------------------------- */

const TOGETHER_POINTS = [
  {
    title: "Solo-first",
    body: "Your home screen shows YOUR race — your league, your unlocks, your dates. Not a social feed.",
  },
  {
    title: "Ambient multiplayer",
    body: "Built for atmosphere, not noise: a shared-arena feeling around your solo race — the sense that the climb is bigger than you, with none of the feed pressure.",
  },
  {
    title: "Compare progress, never wealth",
    body: "Leaderboards rank % toward personal goals, so a $50k racer can outrank a $5M one. Raw balances stay private.",
  },
  {
    title: "Lurker-friendly",
    body: "No posting required, ever. Watch, track, and climb quietly — the race works just as well in the shadows.",
  },
] as const;

function AloneTogether() {
  return (
    <section className="block" aria-labelledby="together-heading">
      <div className="container">
        <div className="split">
          <Reveal>
          <div>
            <p className="kicker">Alone, together</p>
            <h2 id="together-heading">
              Your race. <span className="accent-word">Everyone&rsquo;s arena.</span>
            </h2>
            <p>
              Money is personal. Rat Race is built for the way people actually
              relate to wealth: privately ambitious, quietly competitive, and
              allergic to bragging.
            </p>
          </div>
          </Reveal>
          <Reveal delay={0.12}>
          <ul className="feature-list">
            {TOGETHER_POINTS.map((p) => (
              <li key={p.title}>
                <span className="tick" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <strong>{p.title}</strong>
                  <span>{p.body}</span>
                </div>
              </li>
            ))}
          </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- building in public ---------------------------- */

const HONESTY_POINTS = [
  {
    title: "This is V0.",
    body: "We're validating the idea — this page exists to find out if people want Rat Race before we build the app.",
  },
  {
    title: "No fake numbers.",
    body: "You won't find invented user counts, testimonials, or “trusted by” logos here. When we have real users, we'll say so.",
  },
  {
    title: "Help shape it.",
    body: "Waitlist members get early access and a direct say in what gets built first. The race is being designed in the open.",
  },
] as const;

function BuildingInPublic() {
  return (
    <section className="block honesty" aria-labelledby="honesty-heading">
      <div className="container">
        <div className="honesty-inner">
          <Reveal>
            <p className="live-pill">
              <span className="live-dot" aria-hidden="true" />
              Live — validating now
            </p>
            <p className="kicker">Building in public</p>
            <h2 id="honesty-heading">
              No hype. <span className="accent-word">Just the build.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
          <p>
            We&rsquo;d rather earn your trust than manufacture it. Here&rsquo;s
            exactly where things stand:
          </p>
          <ul>
            {HONESTY_POINTS.map((p) => (
              <li key={p.title}>
                <span className="mark" aria-hidden="true">
                  —
                </span>
                <span>
                  <strong>{p.title}</strong> {p.body}
                </span>
              </li>
            ))}
          </ul>
          </Reveal>
          <Reveal delay={0.14}>
            <figure className="empty-fig">
              <Image
                src="/brand/pip/pip-empty.png"
                alt="Pip the rat waiting beside an empty leaderboard"
                width={168}
                height={168}
                loading="lazy"
              />
              <figcaption>
                <strong>The leaderboard today: empty.</strong>
                Honestly. No borrowed screenshots, no rented social proof —
                just Pip, waiting for the first real racers.
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.16}>
          <ol className="timeline">
            <li>
              <time dateTime="2026-09-24">Sep 24, 2026</time>
              The thesis lands: brand, leagues, and the trajectory-first idea
              take shape.
            </li>
            <li>
              <time dateTime="2026-09-25">Sep 25, 2026</time>
              theratrace.app goes live. The waitlist opens.
            </li>
            <li className="is-now">
              <time>Now</time>
              Validating. Every waitlist signup is a vote for the race.
            </li>
            <li className="is-next">
              <time>Next</time>
              Weekly drops — short videos, league carousels, build-in-public
              threads — then a public verdict on whether the race is real.
            </li>
          </ol>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="proof-label">The build happens in public — follow along:</p>
            <div className="proof-links">
              <a
                href="https://x.com/theratraceapp"
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="proof-x"
              >
                X · @theratraceapp
              </a>
              <a
                href="https://instagram.com/theratraceapp"
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="proof-instagram"
              >
                Instagram · @theratraceapp
              </a>
              <a
                href="https://tiktok.com/@theratrace.app"
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="proof-tiktok"
              >
                TikTok · @theratrace.app
              </a>
              <a
                href="https://threads.com/@theratraceapp"
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="proof-threads"
              >
                Threads · @theratraceapp
              </a>
              <a
                href="https://youtube.com/@theratraceapp"
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="proof-youtube"
              >
                YouTube · @theratraceapp
              </a>
            </div>
          </Reveal>
          <div className="honesty-ctas">
            <a href="#waitlist" className="btn btn-primary">
              Follow the build — join the waitlist
            </a>
            {/* Renders only when SURVEY_URL is a real link — no dead links while the survey is unbuilt. */}
            {!SURVEY_URL.includes("REPLACE-WITH") && (
              <a
                href={SURVEY_URL}
                className="btn btn-ghost"
                data-analytics="survey-start"
                data-analytics-placement="help-shape"
              >
                Take the 3-minute survey
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- faq ----------------------------------- */

const FAQS = [
  {
    q: "What is Rat Race?",
    a: "Rat Race is a gamified wealth tracker — “the MMO for money.” You set 1–3 financial goals (“unlocks”), enter a rough net-worth number, and Rat Race shows your league, your progress, and projected dates for each goal. The app itself is still being validated and built; this page is step one.",
  },
  {
    q: "When does it launch?",
    a: "TBD. We're in the validation phase right now (V0): measuring interest before writing the app. Join the waitlist and you'll be first in line for early access when there's something to try.",
  },
  {
    q: "Is my data private — and safe?",
    a: "Privacy is a core design principle: raw balances are never shown to other users — comparisons are always % toward personal goals, never dollar amounts. Your data stays yours; we will never sell it. Full privacy and security details will be published before launch.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Rat Race is a tracker, not an advisor. It shows your trajectory and projected dates from numbers you enter — it won't tell you what to buy, sell, or do with your money.",
  },
  {
    q: "Why join a waitlist for an app that doesn't exist yet?",
    a: "Because the waitlist is the vote. We're measuring real interest before writing the app — joining gets you early access when there's something to try, and a direct say in what gets built first.",
  },
  {
    q: "How is this different from my bank's dashboard?",
    a: "Your bank shows a balance. Rat Race draws the line: your league, your progress, and the dates your goals land — wrapped in a game layer that makes the climb worth checking.",
  },
  {
    q: "How much will it cost?",
    a: "Pricing is TBD. The direction we're committed to: manual tracking stays free. Anything paid would be for optional extras, decided with early users — not sprung on them.",
  },
  {
    q: "Do I have to connect my bank accounts?",
    a: "No. Manual entry will always be an option — one rough net-worth number is all you need to start. Whether we add optional account connections later is still TBD.",
  },
  {
    q: "Who is Rat Race for?",
    a: "Any wealth level, from $0 to $100M and beyond. The leagues (Climb, Freedom, Empire, Dynasty) meet you where you are, and the race is always against your own goals — never against someone else's balance.",
  },
] as const;

function Faq() {
  return (
    <section className="block" aria-labelledby="faq-heading">
      <div className="container">
        <Reveal>
        <div className="section-head" style={{ marginInline: "auto", textAlign: "center" }}>
          <p className="kicker">FAQ</p>
          <h2 id="faq-heading">
            Honest <span className="accent-word">answers</span>
          </h2>
          <p>
            No marketing fog. Where we don&rsquo;t know yet, we say so.
          </p>
        </div>
        </Reveal>
        <div className="faq-list">
          {FAQS.map((f) => (
            <details className="faq-item" key={f.q}>
              <summary>{f.q}</summary>
              <div className="faq-answer">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- final CTA --------------------------------- */

function FinalCta() {
  return (
    <section className="block final-cta" aria-labelledby="final-cta-heading">
      <div className="container">
        <Reveal>
          <Image
            className="final-pip"
            src="/brand/pip/pip-guide.png"
            alt="Pip the rat, ready to guide you into the race"
            width={256}
            height={256}
            loading="lazy"
          />
          <p className="kicker">Early access</p>
          <h2 id="final-cta-heading">
            The race is <span className="accent-word">forming.</span>
          </h2>
          <p>
            Join the waitlist for early access — and a say in what gets built
            first.
          </p>
        </Reveal>
        <WaitlistCapture id="waitlist-final" placement="final" />
      </div>
    </section>
  );
}

/* --------------------------------- socials --------------------------------- */

type Social = {
  name: string;
  handle: string;
  url: string;
  analytics: string;
  /** Either a fill `path` (brand glyph) or a `glyph` text fallback — never a faked logo. */
  path?: string;
  glyph?: string;
};

const SOCIALS: Social[] = [
  {
    name: "X",
    handle: "@theratraceapp",
    url: "https://x.com/theratraceapp",
    analytics: "social-x",
    path: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z",
  },
  {
    name: "Instagram",
    handle: "@theratraceapp",
    url: "https://instagram.com/theratraceapp",
    analytics: "social-instagram",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.15A3.99 3.99 0 1 1 16 12a3.99 3.99 0 0 1-4 3.99Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
  },
  {
    name: "TikTok",
    handle: "@theratrace.app",
    url: "https://tiktok.com/@theratrace.app",
    analytics: "social-tiktok",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z",
  },
  {
    name: "Threads",
    handle: "@theratraceapp",
    url: "https://threads.com/@theratraceapp",
    analytics: "social-threads",
    // No public-domain Threads glyph on hand — use an "@" mark rather
    // than a faked logo. Swap in real artwork later if desired.
    glyph: "@",
  },
  {
    name: "YouTube",
    handle: "@theratraceapp",
    url: "https://youtube.com/@theratraceapp",
    analytics: "social-youtube",
    path: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z",
  },
] as const;

/* ---------------------------------- footer ---------------------------------- */

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div>
            <Logo />
            <p className="footer-tagline">A rat race you can win.</p>
            <a
              className="footer-badge"
              href="https://tools.launchllama.co/products/rat-race?utm_source=badge&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="launch-llama-badge"
              aria-label="Featured on Launch Llama Tools"
            >
              <img
                src="https://tools.launchllama.co/featured-badge.png?v=2"
                alt="Featured on Launch Llama Tools"
                width="200"
                height="52"
              />
            </a>
          </div>
          <nav aria-label="Social media">
            <ul className="socials">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics={s.analytics}
                    aria-label={`Rat Race on ${s.name} (${s.handle})`}
                  >
                    {s.glyph ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <text
                          x="12"
                          y="17.5"
                          textAnchor="middle"
                          fontSize="15"
                          fontWeight="700"
                          fill="currentColor"
                          fontFamily="Inter, -apple-system, sans-serif"
                        >
                          {s.glyph}
                        </text>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d={s.path} />
                      </svg>
                    )}
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Rat Race</span>
          <span>The MMO for money.</span>
        </div>
        <p className="footer-privacy">
          Anonymous, cookieless analytics only: we measure page visits and
          link clicks in aggregate (no cookies, no fingerprinting, no personal
          data). Do-Not-Track is honored. Waitlist and survey details are
          handled separately by our providers.
        </p>
      </div>
    </footer>
  );
}

/* ----------------------------------- page ----------------------------------- */

export default function Page() {
  return (
    <>
      <ScrollChrome />
      <Nav />
      <main className="motion-playful">
        <Hero />
        <Problem />
        <HowItWorks />
        <Showcase />
        <AppGlimpse />
        <Leagues />
        <AloneTogether />
        <BuildingInPublic />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
