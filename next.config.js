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
};
