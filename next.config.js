/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactRoot: true,
    runtime: "nodejs",
    serverComponents: true,
  },
  images: {
    domains: [
      "imagedelivery.net",
      "customer-m033z5x00ks6nunl.cloudflarestream.com",
    ],
  },
  swcMinify: true,
};

module.exports = nextConfig;
