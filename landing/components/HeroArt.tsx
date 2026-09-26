"use client";

import { useState } from "react";
import Image from "next/image";
import Trajectory from "./Trajectory";

/**
 * HeroArt — the hero visual slot (SPARK-TWEAKS package).
 *
 * Renders the rebrand winner's hero art from `/showcase/hero.png`
 * (Emberline · Ultraviolet, locked 2026-09-26).
 * If the file is not there yet, falls back to the animated <Trajectory />
 * teaser so the hero never renders broken.
 */
export default function HeroArt() {
  const [missing, setMissing] = useState(false);
  if (missing) return <Trajectory />;
  return (
    <figure className="hero-art">
      <Image
        src="/showcase/hero.png"
        alt="Pip the rat racing along an ultraviolet trajectory toward a finish-line star — your money finally has a finish line"
        width={1600}
        height={900}
        priority
        onError={() => setMissing(true)}
      />
      <figcaption className="traj-caption">
        Your trajectory, drawn.{" "}
        <span>Watch your dates move closer as you climb.</span>
      </figcaption>
    </figure>
  );
}
