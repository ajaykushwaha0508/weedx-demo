/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'selnew.s3.amazonaws.com',
        pathname: '/media/**',
      },
    ],
    domains: ['selnew.s3.amazonaws.com'], // Add domain for optimized images
    formats: ['image/avif', 'image/webp'], // Serve images in modern formats
  },
  sassOptions: {
    outputStyle: 'compressed', // Minify SCSS during build
  },
  headers: async () => {
    return [
      {
        source: '/(.*)', // Apply headers to all routes
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache for one year
          },
          {
            key: 'Content-Security-Policy',
            value: `
            default-src 'self';
            connect-src 'self' https://maps.googleapis.com;
            script-src 'self' 'unsafe-inline' https://maps.googleapis.com;
            style-src 'self' 'unsafe-inline';
            img-src 'self' https://*.googleapis.com data:;
            font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
            media-src 'self' data:;
          `.replace(/\s{2,}/g, ' '), // Minify the policy
          },
        ],
      },
    ];
  },
  productionBrowserSourceMaps: true, // Generate source maps for debugging
  compress: true, // Enable gzip compression
  experimental: {
    modern: true, // Use modern JavaScript syntax
    scrollRestoration: true, // Restore scroll position on navigation
  },
  webpack(config, { isServer }) {
    // Reduce bundle size by excluding server-side code from client builds
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Avoid bundling Node.js modules on the client-side
      };
    }
    return config;
  },
});
