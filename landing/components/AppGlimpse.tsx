"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { useInView } from "./glimpse/useInView";

/**
 * AppGlimpse — "See the app" vision-preview section.
 *
 * A live HTML/CSS mini-app in a phone frame: tappable trajectory chart,
 * unlock cards with animated progress, streak + badge game layer.
 * HONESTY: every number is example data (labeled "Sample race"); the
 * section never claims a live app exists.
 *
 * STYLING: exclusively via the --rr-* token contract (globals.css).
 * Pip (the mascot) lives in-product: streak banner (streak state),
 * the finish-line unlock card (milestone state), and riding the
 * phone's edge (idle state).
 */

/* ------------------------------- demo data ------------------------------- */
/* Example scenario only — explicitly labeled "Sample race" in the UI. */

const MARKERS = [
  {
    id: "m1",
    name: "First $100K",
    date: "Jun 2028",
    blurb: "The foundation unlock — momentum starts compounding here.",
    x: 43.6,
    y: 65.3,
    edge: false,
    flag: false,
  },
  {
    id: "m2",
    name: "Debt-Free",
    date: "Mar 2030",
    blurb: "Every dollar you earn stays yours.",
    x: 70.3,
    y: 37.2,
    edge: false,
    flag: false,
  },
  {
    id: "m3",
    name: "Work Optional",
    date: "Jun 2032",
    blurb: "The finish line this race is drawn toward.",
    x: 93.75,
    y: 17.2,
    edge: true,
    flag: true,
  },
] as const;

const UNLOCKS = [
  {
    id: "u1",
    name: "First $100K",
    pct: 72,
    date: "Jun 2028",
    pace: "At this pace — 14 months sooner with an extra $200/mo.",
  },
  {
    id: "u2",
    name: "Debt-Free",
    pct: 34,
    date: "Mar 2030",
    pace: "At this pace — the last stretch is the slowest, and it still counts.",
  },
  {
    id: "u3",
    name: "Work Optional",
    pct: 12,
    date: "Jun 2032",
    pace: "At this pace — this is the date the whole race is drawn toward.",
    pip: true,
  },
] as const;

const BADGES = [
  { id: "b1", name: "First $10K", earned: true, glyph: "star" },
  { id: "b2", name: "3-Month Streak", earned: true, glyph: "flame" },
  { id: "b3", name: "Debt Slayer", earned: true, glyph: "bolt" },
  { id: "b4", name: "First $100K", earned: false, glyph: "lock" },
  { id: "b5", name: "1-Year Streak", earned: false, glyph: "lock" },
  { id: "b6", name: "Work Optional", earned: false, glyph: "lock" },
] as const;

const WEEKS = [true, true, true, true, true, true, true, false] as const;

const STREAK_LINES = [
  "12 weeks. The habit is the win.",
  "Tap in weekly to keep it alive.",
  "Streaks beat motivation — every time.",
] as const;

const NOTES = [
  {
    n: "01",
    title: "The trajectory, drawn",
    body: "One line with every goal on it. Hover or tap a marker to reveal its projected date — the whole app starts here.",
  },
  {
    n: "02",
    title: "Unlock cards",
    body: "Milestones with dates, not balances. Each card carries its projected date and progress — tap one to see what could move it sooner.",
  },
  {
    n: "03",
    title: "Streaks & badges",
    body: "The game layer. Weekly check-ins keep the streak alive; badges mark the moments worth celebrating. Go ahead — tap them.",
  },
] as const;

/* --------------------------------- icons --------------------------------- */

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2.5l2.85 6.1 6.65.75-4.95 4.5 1.35 6.55L12 17.25l-5.9 3.15 1.35-6.55-4.95-4.5 6.65-.75L12 2.5z"
      />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2c.9 3.8-4.2 5.9-4.2 10.6a4.2 4.2 0 008.4 0c0-1.9-1-3.4-2-4.8-.5 1.4-1.4 2-1.4 2 .1-2.4-.3-5.4-.8-7.8zM12 22a6.5 6.5 0 01-6.5-6.5c0-.4 0-.8.1-1.1C4.6 15.6 4 17 4 18.5A8 8 0 0012 22z"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M13 2L4.5 13.5H11L9.5 22 19 10h-6.5L13 2z"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2a4 4 0 00-4 4v3H7a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2v-9a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 7V6a2 2 0 114 0v3h-4z"
      />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg
      className="glimpse-flag"
      viewBox="0 0 16 20"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3.5 1.5v17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M3.5 2.5h9.5l-2.4 3.2 2.4 3.2H3.5z" fill="currentColor" />
    </svg>
  );
}

function glyphFor(glyph: string) {
  if (glyph === "flame") return <FlameIcon />;
  if (glyph === "bolt") return <BoltIcon />;
  return <StarIcon />;
}

/* ------------------------------ trajectory ------------------------------ */

const CHART_PATH = "M 40 300 C 180 290, 260 250, 340 200 S 500 100, 600 62";

function TrajectoryDemo({
  activeMarker,
  onMarker,
}: {
  activeMarker: string | null;
  onMarker: (id: string | null) => void;
}) {
  return (
    <figure className="glimpse-chart">
      <svg viewBox="0 0 640 360" aria-hidden="true" focusable="false">
        {[70, 140, 210, 280].map((y) => (
          <line key={y} x1="40" y1={y} x2="600" y2={y} className="glimpse-grid" />
        ))}
        <path d={`${CHART_PATH} L 600 360 L 40 360 Z`} className="glimpse-area" />
        <path d={CHART_PATH} className="glimpse-path" pathLength={1} fill="none" />
        <circle cx="40" cy="300" r="5" className="glimpse-origin" />
        <text x="40" y="328" className="glimpse-axis-label">
          today
        </text>
        <text x="40" y="120" className="glimpse-hand-note">
          you are here
        </text>
      </svg>

      {MARKERS.map((m, i) => (
        <button
          key={m.id}
          type="button"
          className={`glimpse-marker${m.flag ? " is-flag" : ""}${
            activeMarker === m.id ? " is-active" : ""
          }`}
          style={{ left: `${m.x}%`, top: `${m.y}%`, transitionDelay: `${0.9 + i * 0.18}s` }}
          data-tip={`${m.name} · ${m.date}`}
          aria-label={`${m.name} — projected ${m.date}. Activate to pin details.`}
          aria-expanded={activeMarker === m.id}
          onClick={() => onMarker(activeMarker === m.id ? null : m.id)}
          onKeyDown={(e) => {
            if (e.key === "Escape") onMarker(null);
          }}
          data-analytics="glimpse-interact"
          data-analytics-placement="trajectory-marker"
        >
          {m.flag && <FlagIcon />}
        </button>
      ))}

      {MARKERS.map(
        (m) =>
          activeMarker === m.id && (
            <div
              key={m.id}
              className={`glimpse-tip${m.edge ? " is-edge" : ""}`}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
              role="status"
            >
              <strong>{m.name}</strong>
              <span className="glimpse-tip-date">Projected · {m.date}</span>
              <span className="glimpse-tip-blurb">{m.blurb}</span>
            </div>
          ),
      )}
      <figcaption className="glimpse-chart-cap">
        Example trajectory — hover or tap a marker
      </figcaption>
    </figure>
  );
}

/* ------------------------------- unlocks -------------------------------- */

function UnlockCards({
  openCard,
  onCard,
}: {
  openCard: string | null;
  onCard: (id: string | null) => void;
}) {
  return (
    <div className="glimpse-unlocks" role="list" aria-label="Unlock cards — example data">
      {UNLOCKS.map((u, i) => (
        <div role="listitem" key={u.id}>
          <button
            type="button"
            className={`glimpse-card${openCard === u.id ? " is-open" : ""}`}
            aria-expanded={openCard === u.id}
            aria-label={`${u.name}, ${u.pct} percent, projected ${u.date}. Activate to see what moves this date.`}
            onClick={() => onCard(openCard === u.id ? null : u.id)}
            data-analytics="glimpse-interact"
            data-analytics-placement="unlock-card"
          >
            <span className="glimpse-medal" aria-hidden="true">
              {"pip" in u && u.pip ? (
                <Image
                  src="/brand/pip/pip-milestone.png"
                  alt=""
                  width={88}
                  height={88}
                  loading="lazy"
                />
              ) : (
                <StarIcon />
              )}
            </span>
            <span className="glimpse-card-top">
              <span className="glimpse-card-name">{u.name}</span>
              <span className="glimpse-card-pct">{u.pct}%</span>
            </span>
            <span className="glimpse-bar" aria-hidden="true">
              <span
                className="glimpse-fill"
                style={
                  {
                    "--pct": u.pct / 100,
                    transitionDelay: `${0.15 + i * 0.14}s`,
                  } as CSSProperties
                }
              />
            </span>
            <span className="glimpse-card-date">Projected · {u.date}</span>
            <span className="glimpse-pace">
              <span>{u.pace}</span>
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------- streak + badges ---------------------------- */

function StreakAndBadges() {
  const [streakTaps, setStreakTaps] = useState(0);
  const [popped, setPopped] = useState<string | null>(null);
  const [nudged, setNudged] = useState<string | null>(null);

  return (
    <>
      <button
        type="button"
        className="glimpse-streak"
        onClick={() => setStreakTaps((t) => t + 1)}
        aria-label={`12-week streak. Activate to cycle streak notes. Currently: ${STREAK_LINES[streakTaps % STREAK_LINES.length]}`}
        data-analytics="glimpse-interact"
        data-analytics-placement="streak"
      >
        <span key={streakTaps} className="glimpse-burst">
          <span className="glimpse-flame" aria-hidden="true">
            <FlameIcon />
          </span>
          <strong className="glimpse-streak-num">12</strong>
          <span className="glimpse-streak-word">week streak</span>
          <Image
            className="glimpse-pip-streak"
            src="/brand/pip/pip-streak.png"
            alt=""
            aria-hidden="true"
            width={112}
            height={112}
            loading="lazy"
          />
        </span>
        <span className="glimpse-streak-line">
          {STREAK_LINES[streakTaps % STREAK_LINES.length]}
        </span>
        <span className="glimpse-weeks" aria-hidden="true">
          {WEEKS.map((done, i) => (
            <span
              key={i}
              className={`glimpse-week${done ? " is-done" : " is-now"}`}
            />
          ))}
        </span>
        <span className="sr-only">7 of the last 8 weeks logged</span>
      </button>

      <div className="glimpse-badges" role="list" aria-label="Achievements — 3 earned, 3 locked. Example data.">
        {BADGES.map((b) => (
          <div role="listitem" key={b.id}>
            <button
              type="button"
              className={`glimpse-badge${b.earned ? " is-earned" : " is-locked"}${
                popped === b.id ? " is-popped" : ""
              }${nudged === b.id ? " is-nudged" : ""}`}
              aria-label={b.earned ? `${b.name} — earned` : `${b.name} — locked`}
              onClick={() => {
                if (b.earned) setPopped(b.id);
                else setNudged(b.id);
              }}
              onAnimationEnd={() => {
                setPopped(null);
                setNudged(null);
              }}
              data-analytics="glimpse-interact"
              data-analytics-placement="badge"
            >
              <span className="glimpse-badge-glyph" aria-hidden="true">
                {b.earned ? glyphFor(b.glyph) : <LockIcon />}
              </span>
              <span className="glimpse-badge-name">{b.name}</span>
              {nudged === b.id && !b.earned && (
                <span className="glimpse-badge-hint">
                  Locked — hit the milestone to earn it
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

/* -------------------------------- section -------------------------------- */

export default function AppGlimpse() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [openCard, setOpenCard] = useState<string | null>(null);

  return (
    <section className="block app-glimpse" aria-labelledby="glimpse-heading">
      <div className="container">
        <Reveal>
          <div className="glimpse-kicker-row">
            <p className="kicker">See the app</p>
            <span className="glimpse-vision">Vision preview · Coming soon</span>
          </div>
          <div className="section-head">
            <h2 id="glimpse-heading">
              A glimpse of the <span className="glimpse-accent">race to come.</span>
            </h2>
            <p>
              An interactive sketch of the coming Rat Race app — the
              trajectory view, unlock cards, and streaks, running on example
              data. Poke around: everything here responds.
            </p>
          </div>
        </Reveal>

        <div className="glimpse-layout">
          <Reveal className="glimpse-phone-wrap">
            <div
              ref={ref}
              className={`glimpse-phone${inView ? " is-in" : ""}`}
            >
              <Image
                className="glimpse-pip-ride"
                src="/brand/pip/pip-idle.png"
                alt=""
                aria-hidden="true"
                width={184}
                height={184}
                loading="lazy"
              />
              <div className="glimpse-appbar">
                <span className="glimpse-appname">Rat Race</span>
                <span className="glimpse-sample">Sample race</span>
              </div>
              <StreakAndBadges />
              <TrajectoryDemo activeMarker={activeMarker} onMarker={setActiveMarker} />
              <UnlockCards openCard={openCard} onCard={setOpenCard} />
            </div>
            <p className="glimpse-fineprint">
              Interactive sketch · example data — the app is still being built.
            </p>
          </Reveal>

          <div className="glimpse-notes">
            {NOTES.map((n, i) => (
              <Reveal key={n.n} delay={i * 0.08}>
                <article className="glimpse-note">
                  <span className="glimpse-note-n" aria-hidden="true">
                    {n.n}
                  </span>
                  <div>
                    <h3>{n.title}</h3>
                    <p>{n.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
