"use client";

import { useEffect, useRef, useState } from "react";
import { trackOnView, EVENTS } from "@/lib/analytics";
import { generateReferralCode } from "@/lib/referral";

/**
 * WaitlistCapture — the email capture block used in the hero.
 *
 * WIRED (2026-09-24): renders the real Tally waitlist form
 * ("Rat Race — Waitlist", tally.so/r/4459X5) as an embedded iframe with
 * transparent background + dynamic height, so it inherits the page's dark
 * styling.
 *
 * REFERRALS (2026-09-25): v1 referral layer, no backend.
 * - Inbound ?ref=<code> is forwarded into the embed as hidden field `referred_by`.
 * - A per-visit `my_code` is forwarded as hidden field `my_code`.
 * - On Tally.FormSubmitted this is the SINGLE producer of the documented
 *   "ratrace:waitlist-submit" CustomEvent (tracked once, in Analytics.tsx),
 *   then the top window navigates to /welcome?code=<my_code> where the
 *   visitor gets their share link. A short delay lets the analytics beacon
 *   flush before navigation. If the postMessage never arrives (blockers),
 *   the respondent simply sees Tally's native thank-you — signup still counts.
 */

const TALLY_EMBED_SRC =
  "https://tally.so/embed/4459X5?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";
const TALLY_WIDGET_JS = "https://tally.so/widgets/embed.js";

type TallyWindow = Window & { Tally?: { loadEmbeds: () => void } };

function isTallySubmitted(data: unknown): boolean {
  let d: unknown = data;
  if (typeof d === "string") {
    if (!d.includes("Tally.FormSubmitted")) return false;
    try {
      d = JSON.parse(d);
    } catch {
      return false;
    }
  }
  return (
    typeof d === "object" &&
    d !== null &&
    (d as { event?: unknown }).event === "Tally.FormSubmitted"
  );
}

export default function WaitlistCapture({ id = "waitlist" }: { id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const codeRef = useRef<string>("");
  const [invited, setInvited] = useState(false);

  useEffect(() => {
    trackOnView(ref.current, EVENTS.WAITLIST_VIEW, { placement: "hero" });
  }, []);

  // Referral attribution — runs before the Tally widget hydrates the iframe.
  useEffect(() => {
    if (!codeRef.current) codeRef.current = generateReferralCode();

    const params = new URLSearchParams(window.location.search);
    const inbound = (params.get("ref") || "").trim().slice(0, 32);
    if (inbound) setInvited(true);

    const frame = iframeRef.current;
    if (frame) {
      const src = new URL(TALLY_EMBED_SRC);
      if (inbound) src.searchParams.set("referred_by", inbound);
      src.searchParams.set("my_code", codeRef.current);
      const full = src.toString();
      // Set src directly AND keep data-tally-src in sync: Tally's hydrate
      // only touches iframes without src, so this wins the race either way.
      frame.dataset.tallySrc = full;
      frame.src = full;
    }

    const onMessage = (e: MessageEvent) => {
      if (!isTallySubmitted(e.data)) return;
      window.dispatchEvent(
        new CustomEvent("ratrace:waitlist-submit", {
          detail: { placement: "hero", referred: Boolean(inbound) },
        }),
      );
      window.setTimeout(() => {
        window.location.assign(
          `/welcome?code=${encodeURIComponent(codeRef.current)}`,
        );
      }, 350);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
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
            'iframe[data-tally-src]:not([src])',
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
        ref={iframeRef}
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
        {invited
          ? "You were invited by a fellow racer — welcome to the queue."
          : "We\u2019re building in public \u2014 join the waitlist for early access."}
      </p>
      <p className="microcopy microcopy-dim">
        Refer friends after you join to move up the launch queue.
      </p>
    </div>
  );
}
