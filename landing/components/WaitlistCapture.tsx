"use client";

import { useEffect, useRef } from "react";
import { trackOnView, EVENTS } from "@/lib/analytics";

/**
 * WaitlistCapture — the email capture block used in the hero.
 *
 * WIRED (2026-09-24): renders the real Tally waitlist form
 * ("Rat Race — Waitlist", tally.so/r/4459X5) as an embedded iframe with
 * transparent background + dynamic height, so it inherits the page's dark
 * styling. Signup events reach analytics via Tally's postMessage
 * ("Tally.FormSubmitted") — see components/Analytics.tsx.
 */

const TALLY_EMBED_SRC =
  "https://tally.so/embed/4459X5?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";
const TALLY_WIDGET_JS = "https://tally.so/widgets/embed.js";

type TallyWindow = Window & { Tally?: { loadEmbeds: () => void } };

export default function WaitlistCapture({ id = "waitlist" }: { id?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackOnView(ref.current, EVENTS.WAITLIST_VIEW, { placement: "hero" });
  }, []);

  useEffect(() => {
    // Load Tally's embed script once; it hydrates the iframe (sets src from
    // data-tally-src) and auto-resizes it via dynamicHeight=1.
    const hydrate = () => {
      const Tally = (window as TallyWindow).Tally;
      if (Tally) {
        Tally.loadEmbeds();
      } else {
        document
          .querySelectorAll<HTMLIFrameElement>(
            'iframe[data-tally-src]:not([src])'
          )
          .forEach((frame) => {
            if (frame.dataset.tallySrc) frame.src = frame.dataset.tallySrc;
          });
      }
    };
    if (document.querySelector(`script[src="${TALLY_WIDGET_JS}"]`)) {
      hydrate();
      return;
    }
    const script = document.createElement("script");
    script.src = TALLY_WIDGET_JS;
    script.onload = hydrate;
    script.onerror = hydrate;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="waitlist" id={id} ref={ref}>
      <iframe
        data-tally-src={TALLY_EMBED_SRC}
        loading="lazy"
        width="100%"
        height={690}
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Rat Race — Waitlist"
        style={{ display: "block", width: "100%", border: 0 }}
      />
      <p className="microcopy" id={`${id}-hint`}>
        We&rsquo;re building in public — join the waitlist for early access.
      </p>
    </div>
  );
}
