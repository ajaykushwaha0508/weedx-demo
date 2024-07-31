// const express = require("express");
// const path = require("path");
// const fs = require("fs");
// const app = express();
// const PORT = 3000;

// // Middleware to replace dynamic content in HTML
// const renderHTML = (req, res, next) => {
//     // Fetch dynamic content here
//     let dynamic_title = "Dynamic Title";
//     let dynamic_description = "Dynamic Description";
//     let dynamic_image = req.path === "/" ? "https://example.com/home-image.jpg" : "https://example.com/default-image.jpg";

//     // Read the index.html file asynchronously
//     fs.readFile("./build/index.html", "utf8", (err, htmlContent) => {
//         if (err) {
//             console.error("Error reading HTML file:", err);
//             res.status(500).send("Internal Server Error");
//             return;
//         }

//         // Replace dynamic content in the HTML
//         htmlContent = htmlContent.replace("__PAGE_TITLE__", dynamic_title);
//         htmlContent = htmlContent.replace("__OG_DESCRIPTION__", dynamic_description);
//         htmlContent = htmlContent.replace("__OG_IMAGE__", dynamic_image);

//         // Set modified HTML to response locals for use in routes
//         res.locals.modifiedHTML = htmlContent;
//         next(); // Proceed to the next middleware or route handler
//     });
// };

// // Serve static files from the build directory
// app.use(express.static(path.join(__dirname, "./build")));

// // Use the renderHTML middleware for all routes
// app.use(renderHTML);

// // Route to serve the modified HTML for all routes
// app.get("*", (req, res) => {
//     // Send the modified HTML as the response
//     res.send(res.locals.modifiedHTML);
// });

// // Start the server
// app.listen(PORT, () => {
// });




const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const multer = require('multer');
const app = express();
const csv = require('csv-parser');

// Middleware to serve static files
app.use(express.static(path.resolve(__dirname, 'build')));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function modifystr(str) {

  str = str?.replace(/[^a-zA-Z0-9/ ]/g, "-");
  str = str?.trim().replaceAll(' ', "-");
  let a = 0;
  while (a < 1) {
    if (str?.includes("--")) {
      str = str?.replaceAll("--", "-")
    } else if (str?.includes("//")) {
      str = str?.replaceAll("//", "/")
    } else if (str?.includes("//")) {
      str = str?.replaceAll("-/", "/")
    } else if (str?.includes("//")) {
      str = str?.replaceAll("/-", "/")
    } else {
      a++
    }
  }
  return str?.toLowerCase()
}


// API endpoint to fetch news post data
app.get('/cannabis-news/:news?/:postId', async (req, res) => {
  const postId = req.params.postId;
  try {
    // Make API call to fetch news post data including OG image URL
    const response = await axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-GetNewsById/${postId}`);
    const postData = response.data[0]; // Assuming response is an array

    // Generate dynamic meta tags and title
    const ogImageMetaTag = `<meta property="og:image" content="${postData.Image}">`;

    let indexHtml = fs.readFileSync(path.resolve(__dirname, 'build', 'index.html'), 'utf-8');
    indexHtml = indexHtml.replace(/<meta\s+property="og:image"\s+content="[^"]*">/, ogImageMetaTag);
    res.send(indexHtml);
  } catch (error) {
    // console.error('Error fetching news post data:', error);
    res.status(500).send('Error fetching news post data');
  }
});
app.get("/sitemap/:category", async (req, res) => {
  switch (req.url) {
    case "/sitemap/weed-dispensaries.xml":
      const response1 = await axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-SitemapbyId/14`);
      if (response1.data[0].Xml) {

        const sitemapXmll = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${response1.data[0].Xml.map((url) => `
              <url>
                <loc>${url}</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
              </url>
            `).join('')}
          </urlset>`;
        res.setHeader('Content-Type', 'text/xml');
        res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
        res.write(sitemapXmll);
        res.end();
        //   fs.writeFileSync('./build/Sitemap/weed-dispensaries.xml', sitemapXmll);
      }
      break;
    case "/sitemap/weed-deliveries.xml":
      const response2 = await axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-SitemapbyId/11`);

      if (response2.data[0].Xml) {

        const sitemapXmll = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${response2.data[0].Xml.map((url) => `
              <url>
                <loc>${url}</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
              </url>
            `).join('')}
          </urlset>`;
        res.setHeader('Content-Type', 'text/xml');
        res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
        res.write(sitemapXmll);
        res.end();
        //   fs.writeFileSync('./build/Sitemap/weed-dispensaries.xml', sitemapXmll);
      }
      break;
    case "/sitemap/news.xml":
      const response3 = await axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-News/`);
      if (response3) {
        const sitemapXmll = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${response3.data.map((url) => `
              <url>
                <loc>${`${"https://www.weedx.io/cannabis-news"}/${modifystr(url.Title)}/${url.id}`}</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
              </url>
            `).join('')}
          </urlset>`;
        res.setHeader('Content-Type', 'text/xml');
        res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
        res.write(sitemapXmll);
        res.end();
      }
      break
    case "/sitemap/brand-sitemap.xml":
      const responsebrand = await axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-AllBrand/`);
      if (responsebrand) {
        const sitemapXmll = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${responsebrand.data.map((url) => `
                <url>
                  <loc>${`${"https://www.weedx.io/cannabis-news"}/${modifystr(url.name)}/${url.id}`}</loc>
                  <changefreq>daily</changefreq>
                  <priority>0.7</priority>
                </url>
              `).join('')}
            </urlset>`;
        res.setHeader('Content-Type', 'text/xml');
        res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
        res.write(sitemapXmll);
        res.end();
      }
      break
    case "/sitemap/products-sitemap.xml":
      const response4 = await axios.get(`https://apiv2.cannabaze.com/UserPanel/ListProductView/`);
      const responsecategory = await axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-Categories/`);
      const responseSubCategory = await axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-AllSubCategoriesForSitemap/`);
      if (response4) {
        // Generate the first sitemap
        const sitemapXml1 = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${response4.data.map((url) => `
                <url>
                    <loc>https://www.weedx.io/products/${modifystr(url.category_name)}/${modifystr(url.SubcategoryName)}/${modifystr(url.Product_Name)}/${url.id}</loc>
                    <changefreq>daily</changefreq>
                    <priority>0.80</priority>
                </url>
            `).join('')}
            ${responsecategory.data.map((url) => `
            <url>
                <loc>https://www.weedx.io/products/${modifystr(url.name)}/${url.id}</loc>
                <changefreq>daily</changefreq>
                <priority>0.80</priority>
            </url>
        `).join('')}
        ${responseSubCategory.data.map((url) => `
        <url>
        <loc>https://www.weedx.io/products/${modifystr(url.category_name)}/${modifystr(url.name)}/${url.id}</loc>
            <changefreq>daily</changefreq>
            <priority>0.80</priority>
        </url>
    `).join('')}
        </urlset>`;
        // Set response headers
        res.setHeader('Content-Type', 'text/xml');
        res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours

        // Send the response
        res.write(sitemapXml1);
        res.end();
      }

      break
    case "/Sitemap/Dispensaries_stores.xml":
      const response5 = await axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-Stores/`);

      if (response5 && response5.data) {
        const dispensaryUrls = response5.data.filter(url => url.Store_Type === "dispensary")
          .map(url => `
                <url>
                  <loc>https://www.weedx.io/weed-dispensaries/${modifystr(url.Store_Name)}/${url.id}</loc>
                  <changefreq>daily</changefreq>
                  <priority>0.7</priority>
                </url>`).join('');

        const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${dispensaryUrls}
          </urlset>`;

        res.setHeader('Content-Type', 'text/xml');
        res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
        res.write(sitemapXml);
        res.end();
      }
      break
    case "/Sitemap/Delivery_stores.xml":
      const response6 = await axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-Stores/`);

      if (response6 && response6.data) {
        const dispensaryUrls = response6.data.filter(url => url.Store_Type !== "dispensary")
          .map(url => `
                  <url>
                    <loc>https://www.weedx.io/weed-deliveries/${modifystr(url.Store_Name)}/${url.id}</loc>
                    <changefreq>daily</changefreq>
                    <priority>0.7</priority>
                  </url>`).join('');

        const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${dispensaryUrls}
            </urlset>`;

        res.setHeader('Content-Type', 'text/xml');
        res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
        res.write(sitemapXml);
        res.end();
      }
      break
    // additional cases as needed

    default:
    // code block executed if expression doesn't match any case
  }
})
app.post('/weed-dispensaries/upload-csv', upload.single('csvFile'), async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      res.status(400).send('No CSV file uploaded');
      return;
    }

    // Parse CSV data into JSON
    const jsonData = req.file.buffer
      .toString('utf8')
      .split('\n')
      .map((line, index) => {
        // Skip empty lines
        if (!line.trim()) return null;

        // Split the line into columns
        const columns = line.split(',');

        // Skip headers (assuming they are in the first row)
        if (index === 0) return null;

        // Create an object for each row
        return {
          country: columns[0].trim(),
          state: columns[1].trim(),
          city: columns[2].trim()
        };
      })
      .filter(row => row !== null); // Remove null entries (headers or empty lines)

    // Array to store all HTTP request promises
    const requestPromises = [];

    // Send HTTP requests for each row of data
    for (const data of jsonData) {
      try {
        const response = await axios.post(`https://apiv2.cannabaze.com/UserPanel/Update-SiteMap/14`, {
          j: `https://www.weedx.io/weed-dispensaries/in/${modifystr(data.country)}/${modifystr(data.state)}/${modifystr(data.city)}`
        });
        // Do something with the response if needed
      } catch (error) {
        console.error('Error making HTTP request:', error);
      }
    }

    // Send the response after all requests have completed
    res.status(200).send('CSV file received and processed successfully');
  } catch (error) {
    console.error('Error processing CSV file:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/weed-deliveries/upload-csv', upload.single('csvFile'), async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      res.status(400).send('No CSV file uploaded');
      return;
    }

    // Parse CSV data into JSON
    const jsonData = req.file.buffer
      .toString('utf8')
      .split('\n')
      .map((line, index) => {
        // Skip empty lines
        if (!line.trim()) return null;

        // Split the line into columns
        const columns = line.split(',');

        // Skip headers (assuming they are in the first row)
        if (index === 0) return null;

        // Create an object for each row
        return {
          country: columns[0].trim(),
          state: columns[1].trim(),
          city: columns[2].trim()
        };
      })
      .filter(row => row !== null); // Remove null entries (headers or empty lines)

    // Array to store all HTTP request promises
    const requestPromises = [];

    // Send HTTP requests for each row of data
    for (const data of jsonData) {
      try {
        const response = await axios.post(`https://apiv2.cannabaze.com/UserPanel/Update-SiteMap/11`, {
          j: `https://www.weedx.io/weed-deliveries/in/${modifystr(data.country)}/${modifystr(data.state)}/${modifystr(data.city)}`
        });
        // Do something with the response if needed
      } catch (error) {
        console.error('Error making HTTP request:', error);
      }
    }

    // Send the response after all requests have completed
    res.status(200).send('CSV file received and processed successfully');
  } catch (error) {
    console.error('Error processing CSV file:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// Start the server
const ip = '192.168.1.20';
const PORT = process.env.PORT || 5000;
app.listen(PORT,  (err) => {
  if (err) throw err;
  console.log('> Ready on http://localhost:3000');
});
