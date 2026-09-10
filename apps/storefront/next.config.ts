import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: ["@eyewear/types", "@eyewear/ui"],
  typedRoutes: true,
};

export default nextConfig;
