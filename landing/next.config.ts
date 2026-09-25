import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export is NOT used: keep the default Node serverless build for Vercel.
  // No custom image remote patterns; all imagery is local/self-hosted.
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
