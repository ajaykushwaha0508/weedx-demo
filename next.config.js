/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  compress: true, // Enables Gzip/Brotli compression
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'selnew.s3.amazonaws.com',
        pathname: '/media/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache static assets for 1 year
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, max-age=600', // Cache API responses for 10 minutes
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 200000, // Limit chunk size for better performance
    };
    return config;
  },
});
