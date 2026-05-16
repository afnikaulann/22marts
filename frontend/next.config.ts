import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dzjwaqyxfsqglneuwuds.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pqcexuqenjfudrwefnql.supabase.co",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 31536000,
    formats: ["image/avif", "image/webp"],
  },

  reactStrictMode: true,
};

export default nextConfig;