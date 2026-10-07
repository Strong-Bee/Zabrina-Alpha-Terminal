import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  /* Allow dev server diakses dari origin tambahan (mis. IP LAN, WSL, tunnel) */
  allowedDevOrigins: [
    "169.254.83.107",
    // Tambahkan IP LAN Anda di sini jika develop dari device lain, contoh:
    // "192.168.1.*",
    // "*.ngrok-free.app",
  ],
};

export default nextConfig;