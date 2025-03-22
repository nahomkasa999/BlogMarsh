import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mzpzaz5m0ozohuhg.public.blob.vercel-storage.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },//lh3.google
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },// usercontent.com
    ],
  },
};

export default nextConfig;
