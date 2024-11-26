/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
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
      config.devtool = false; // Disable source maps in production
    }else {
      // Additional production optimizations
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all', // Split large chunks into smaller parts
          maxSize: 250000, // Reduce the chunk size limit

        },
      };
    }

    // Handle large files warnings during the build
    config.performance = {
      hints: false // Set max entrypoint size to 500 KB
    };

    // Ensure Webpack processes large JavaScript files


    return config;
  },
};
