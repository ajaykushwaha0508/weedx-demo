
// /** @type {import('next').NextConfig} */
// module.exports = {
//   target: 'tatic',
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**',
//       },
//     ],
//   },
//   // async redirects() {
//   //   return [

//   //     {
//   //       source: '/weed-deliveries/:details*',
//   //       destination: '/weed-dispensaries/:details*',
//   //       permanent: false,
//   //     },
//   //   ]
//   // },
// };


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
  compress: true,
  async headers() {
    return [
      {
        // Apply headers to all routes in the application
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate', // Adjust the value as needed
          },
        ],
      },
    ];
  },
};
