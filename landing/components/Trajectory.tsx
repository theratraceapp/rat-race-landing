/*
 * Trajectory — the hero teaser visual (also the HeroArt fallback).
 * An animated SVG: an ultraviolet trajectory curve that draws itself on
 * load, league milestone ticks, and a traveler dot riding the line.
 * Pure SVG + CSS (+ SMIL for the dot). Decorative but labeled for AT.
 */

const PATH =
  "M 48 208 C 200 202, 300 188, 400 148 S 620 62, 752 34";

const TICKS = [
  { x: 300, label: "$1M" },
  { x: 520, label: "$10M" },
  { x: 668, label: "$100M" },
];

export default function Trajectory() {
  return (
    <figure className="trajectory" aria-label="An animated chart showing a net-worth trajectory curving upward through the $1M, $10M and $100M league milestones toward 2030">
      <svg viewBox="0 0 800 260" role="img" aria-hidden="true" focusable="false">
        {/* faint grid */}
        {[60, 110, 160].map((y) => (
          <line key={y} x1="40" y1={y} x2="760" y2={y} className="traj-grid" />
        ))}

        {/* league milestone ticks */}
        {TICKS.map((t, i) => (
          <g key={t.label} className="traj-tick" style={{ animationDelay: `${1.2 + i * 0.35}s` }}>
            <line x1={t.x} y1={46} x2={t.x} y2={224} className="traj-tick-line" />
            <text x={t.x} y={244} textAnchor="middle" className="traj-tick-label">
              {t.label}
            </text>
          </g>
        ))}

        {/* the trajectory itself */}
        <path d={PATH} className="traj-line" fill="none" />

        {/* traveler dot riding the line */}
        <circle r="5.5" className="traj-dot">
          <animateMotion dur="7s" begin="2.4s" repeatCount="indefinite" path={PATH} />
        </circle>
        <circle r="11" className="traj-halo">
          <animateMotion dur="7s" begin="2.4s" repeatCount="indefinite" path={PATH} />
        </circle>

        {/* endpoints */}
        <text x="48" y="232" className="traj-end-label traj-start">
          today
        </text>
        <text x="752" y="22" textAnchor="end" className="traj-end-label traj-future">
          2030
        </text>
      </svg>
      <figcaption className="traj-caption">
        Your trajectory, drawn. <span>Watch your dates move closer as you climb.</span>
      </figcaption>
    </figure>
  );
}
