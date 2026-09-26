"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";

/**
 * Showcase — "First look" section (SPARK-TWEAKS package).
 *
 * Concept-art slots for the Emberline · Ultraviolet rebrand.
 * Each figure hides itself if its art file is absent, so the section
 * degrades cleanly. Art lives in `landing/public/showcase/`.
 */
function Art({
  src,
  alt,
  caption,
  width = 880,
  height = 620,
}: {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
}) {
  const [missing, setMissing] = useState(false);
  if (missing) return null;
  return (
    <figure className="showcase-fig">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onError={() => setMissing(true)}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function Showcase() {
  return (
    <section className="block showcase" aria-labelledby="showcase-heading">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <p className="kicker">First look</p>
            <h2 id="showcase-heading">
              The app is still a sketch.{" "}
              <span className="accent-word">The idea isn&rsquo;t.</span>
            </h2>
            <p>
              Concept art from the build — the trajectory view, and the card
              that turns a goal into a date.
            </p>
          </div>
        </Reveal>
        <div className="showcase-grid">
          <Reveal>
            <Art
              src="/showcase/before-after.png"
              alt="Concept art: a net-worth balance shown with and without its projected trajectory"
              caption="Before / after — a balance becomes a plan."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <Art
              src="/showcase/unlock-card.png"
              alt="Concept art: an unlock card showing a goal, its progress, and its projected date"
              caption="The unlock card — a goal with a date."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
