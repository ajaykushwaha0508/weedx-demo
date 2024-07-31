const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');

module.exports = {
  // Other Webpack configuration settings...

  plugins: [
    new PurifyCSSPlugin({
      paths: glob.sync([
        // Path to your React components
        path.join(__dirname, 'src/**/*.js'),
        // Path to your JSX/HTML files
        path.join(__dirname, 'src/**/*.jsx'),
        // Path to your CSS/SASS/SCSS files
        path.join(__dirname, 'src/**/*.css'),
        // Add more paths if needed
      ]),
      minimize: true, // Minimize the CSS output
      // Additional options...
    }),
    // Other plugins...
  ],
};
