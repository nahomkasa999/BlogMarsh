import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "geekswithblogs.net",
        protocol: "https",
        port: "",
      },
      {
        hostname: "www.speedreadinglounge.com",
        protocol: "https",
        port: "",
      }
    ],
  },
};

export default nextConfig;
