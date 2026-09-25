import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  // Variable weights cover optical sizing; 400–700 is plenty for display.
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theratrace.app"),
  title: {
    default: "Rat Race — A rat race you can win.",
    template: "%s | Rat Race",
  },
  description:
    "Rat Race is the MMO for money: a gamified wealth tracker that turns your net worth into a race you can actually win. Join the waitlist for early access.",
  openGraph: {
    title: "Rat Race — A rat race you can win.",
    description: "The MMO for money. Turn your net worth into a race you can actually win.",
    url: "https://theratrace.app",
    siteName: "Rat Race",
    type: "website",
    // TODO — copy ~/workspace/rat-race-v0/brand/logo/og-image.png into
    // landing/public/ before deploying, so share cards render.
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
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
