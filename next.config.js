/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    appDir: true,
    serverActions: true,
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
