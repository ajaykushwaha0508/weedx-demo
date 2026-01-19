/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  images: {
    remotePatterns: [ 
      {
        protocol: 'https',
        hostname: 'selnew-selnoxnew.s3.amazonaws.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'selnoxmedia.s3.amazonaws.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'selnew.s3.amazonaws.com',
        pathname: '/media/**',
      },
    ],
  },
  sassOptions: {
    outputStyle: 'compressed', // Minify SCSS during build
  },
  productionBrowserSourceMaps: true, // Enable source maps in production

  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      // Disable source maps in production
      config.devtool = false;
  
      // Production-specific optimizations
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all', // Split large chunks into smaller parts
          maxSize: 250000, // Reduce the chunk size limit
        },
      };
    } else {
      // Ensure a good experience in development
      config.devtool = 'eval-source-map'; // Better for debugging
      delete config.optimization.splitChunks; // Avoid chunking in dev mode
    }
  
    // Suppress performance hints during development
    config.performance = {
      hints: dev ? false : 'warning', // Warnings only in production
    };
  
    return config;
  }
});
