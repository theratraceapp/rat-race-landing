import { Suspense } from "react";
import type { Metadata } from "next";
import WelcomeClient from "./WelcomeClient";

export const metadata: Metadata = {
  title: "You're on the list — Rat Race",
  description:
    "Share your invite link and move up the Rat Race launch queue.",
  robots: { index: false, follow: false },
};

export default function WelcomePage() {
  return (
    <Suspense>
      <WelcomeClient />
    </Suspense>
  );
}
