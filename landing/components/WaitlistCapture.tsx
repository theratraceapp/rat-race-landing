"use client";

import { useEffect, useRef, useState } from "react";
import {
  trackOnView,
  EVENTS,
  trackPostHog,
  PH_EVENTS,
  currentUtmParams,
} from "@/lib/analytics";
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

export default function WaitlistCapture({
  id = "waitlist",
  placement = "hero",
}: {
  id?: string;
  placement?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const codeRef = useRef<string>("");
  const [invited, setInvited] = useState(false);

  useEffect(() => {
    trackOnView(ref.current, EVENTS.WAITLIST_VIEW, { placement });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // waitlist_started — first real interaction with the form, once per mount.
  // IMPORTANT: the Tally form renders inside an <iframe>, and mouse/keyboard
  // events inside an iframe's document do NOT propagate to the parent page.
  // So pointerdown/focusin on the container only catch clicks on the
  // surrounding padding/microcopy — never clicks into the actual fields.
  // The reliable signal for "visitor clicked into the form" is the parent
  // window blurring with the iframe as document.activeElement.
  useEffect(() => {
    const el = ref.current;
    const frame = iframeRef.current;
    let fired = false;
    const onEngage = () => {
      if (fired) return;
      fired = true;
      trackPostHog(PH_EVENTS.WAITLIST_STARTED, {
        placement,
        source: "landing_page",
        ...currentUtmParams(),
      });
    };
    const onWindowBlur = () => {
      // activeElement updates asynchronously after blur in some browsers.
      window.setTimeout(() => {
        if (document.activeElement === frame) onEngage();
      }, 0);
    };
    el?.addEventListener("pointerdown", onEngage);
    el?.addEventListener("focusin", onEngage);
    window.addEventListener("blur", onWindowBlur);
    return () => {
      el?.removeEventListener("pointerdown", onEngage);
      el?.removeEventListener("focusin", onEngage);
      window.removeEventListener("blur", onWindowBlur);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // waitlist_joined — fires ONLY on Tally's confirmed successful
      // submission (Tally.FormSubmitted), never on mere button clicks.
      trackPostHog(PH_EVENTS.WAITLIST_JOINED, {
        placement,
        source: "landing_page",
        referred: Boolean(inbound),
        ...currentUtmParams(),
      });
      window.dispatchEvent(
        new CustomEvent("ratrace:waitlist-submit", {
          detail: { placement, referred: Boolean(inbound) },
        }),
      );
      window.setTimeout(() => {
        // Carry UTM params through to /welcome so attribution survives the
        // redirect (PostHog also persists them in-session, this is belt and
        // suspenders).
        const dest = new URL(
          `/welcome?code=${encodeURIComponent(codeRef.current)}`,
          window.location.origin,
        );
        for (const [k, v] of new URLSearchParams(window.location.search)) {
          if (k.startsWith("utm_")) dest.searchParams.set(k, v);
        }
        window.location.assign(dest.toString());
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
        title="Rat Race · Waitlist"
        style={{ display: "block", width: "100%", border: 0 }}
      />
      <p className="microcopy" id={`${id}-hint`}>
        {invited
          ? "You were invited by a fellow racer. Welcome to the queue."
          : "We\u2019re building in public. Join the waitlist for early access."}
      </p>
      <p className="microcopy microcopy-dim">
        Refer friends after you join to move up the launch queue.
      </p>
    </div>
  );
}
