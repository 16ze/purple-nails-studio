import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Configuration des images Next.js
   * Autorise les images depuis les domaines externes
   */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
