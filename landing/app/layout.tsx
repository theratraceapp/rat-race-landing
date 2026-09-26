import type { Metadata } from "next";
import { Baloo_2, Nunito, Caveat } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

/*
 * Emberline · Ultraviolet type system (locked 2026-09-26):
 * Baloo 2 = display, Nunito = body/UI, Caveat = handwritten annotations.
 * Each `variable` exposes the family to the --rr-font-* contract in
 * globals.css (e.g. --rr-font-display: var(--font-baloo), ...).
 */

const baloo = Baloo_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-baloo",
  weight: ["500", "600", "700", "800"],
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theratrace.app"),
  title: {
    default: "Rat Race — A rat race you can win.",
    template: "%s | Rat Race",
  },
  description:
    "Rat Race is the MMO for money: a gamified wealth tracker that turns your net worth into a race you can actually win. Join the waitlist for early access.",
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/brand/favicon-512.png", sizes: "512x512", type: "image/png" }],
  },
  openGraph: {
    title: "Rat Race — A rat race you can win.",
    description: "The MMO for money. Turn your net worth into a race you can actually win.",
    url: "https://theratrace.app",
    siteName: "Rat Race",
    type: "website",
    // Regenerated from the Ultraviolet mark (2026-09-26). Lives at
    // public/og-image.png so this absolute path resolves.
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rat Race — a rat race you can win.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rat Race — A rat race you can win.",
    description: "The MMO for money. Join the waitlist for early access.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-rr-brand="ultraviolet"
      className={`${baloo.variable} ${nunito.variable} ${caveat.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
