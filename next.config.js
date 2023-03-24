/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        bufferutil: false,
      };  
    }
    return config;
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
