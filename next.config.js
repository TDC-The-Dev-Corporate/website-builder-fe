/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@grapesjs/studio-sdk-plugins"],
  experimental: {
    esmExternals: "loose",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
