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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache for one year
          },
        ],
      },
    ]
  },
  productionBrowserSourceMaps: true,
};
