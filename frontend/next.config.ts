import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dzjwaqyxfsqglneuwuds.supabase.co",
      },
      {
        protocol: "https",
        hostname: "pqcexuqenjfudrwefnql.supabase.co",
      },
    ],
    minimumCacheTTL: 31536000,
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
