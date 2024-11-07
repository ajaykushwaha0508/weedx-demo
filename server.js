const express = require('express');
const next = require('next');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const ip = '192.168.1.20';
const axios = require('axios');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




function modifystr(str) {
  if (typeof str !== 'string') {
    return ''

  }
  else {
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
      } else if (str?.includes("/")) {
        str = str?.replaceAll("/", "-")
      }

      else {
        a++
      }

    }
    if (str.toLowerCase().slice(-1) === '-') {
      str = str.slice(0, -1); // Remove the trailing hyphen
    }
    return str.toLowerCase()
  }
}
app.prepare().
  then(() => {
    const server = express();
    server.use(cookieParser());

    // Custom route example

    server.get('/custom-route', (req, res) => {
      // Get the origin from the request headers
      const origin = req.get('Origin') || req.headers.host;
      
      // Create the full origin URL
      const fullOrigin = `${req.protocol}://${origin}`;
      console.log(origin , fullOrigin , "fdgdgfd")
      // Return the origin as a response
      res.json({ origin: fullOrigin });
  });

    server.get("/sitemap/:category", async (req, res) => {
      switch (req.url) {
        case "/sitemap/dispensaries-location-sitemap.xml":
          const response1 = await axios.get(`https://api.cannabaze.com/UserPanel/Get-SitemapbyId/14`);
          if (response1.data[0].Xml) {
            // split(':')[0].trim()
            const sitemapXmll = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${response1.data[0].Xml.map((url) => `
              <url>
                <loc>${url.split(',')[0].trim()}</loc>
                <changefreq>daily</changefreq>
                <priority>0.8</priority>
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
        case "/sitemap/products-sitemap.xml":
          const response4 = await axios.get(`https://api.cannabaze.com/UserPanel/ListProductView/`);
          const responsecategory = await axios.get(`https://api.cannabaze.com/UserPanel/Get-Categories/`);
          const responseSubCategory = await axios.get(`https://api.cannabaze.com/UserPanel/Get-AllSubCategoriesForSitemap/`);
          if (response4) {
            const sitemapXml1 = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${response4.data.map((url) => `
                <url>
                    <loc>https://www.weedx.io/products/${modifystr(url.category_name)}/${modifystr(url.SubcategoryName)}/${modifystr(url.Product_Name)}/${url.id}</loc>
                    <changefreq>daily</changefreq>
                    <priority>0.8</priority>
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
            res.setHeader('Content-Type', 'text/xml');
            res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
            res.write(sitemapXml1);
            res.end();
          }
          break
        case "/sitemap/deliveries-location-sitemap.xml":
          const response2 = await axios.get(`https://api.cannabaze.com/UserPanel/Get-SitemapbyId/11`);

          if (response2.data[0].Xml) {

            const sitemapXmll = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${response2.data[0].Xml.map((url) => `
              <url>
                <loc>${url.split(',')[0].trim()}</loc>
                <changefreq>daily</changefreq>
                <priority>0.8</priority>
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
        case "/sitemap/news-sitemap.xml":
          try {
            const res1 = await axios.post('https://api.cannabaze.com/UserPanel/Get-GetNewsbycategory/', {
              category: 1,
              limit: 49000
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            });

            const data = res1.data;

            if (data) {
              const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
                  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                    ${data.map((url) => `
                      <url>
                        <loc>${`https://www.weedx.io/cannabis-news/${url.Url_slug === ("" || null || undefined) ? modifystr(url.Title) : modifystr(url.Url_slug)}/${url.id}`}</loc>
                        <changefreq>daily</changefreq>
                        <priority>0.8</priority>
                      </url>
                    `).join('')}
                  </urlset>`;

              res.setHeader('Content-Type', 'text/xml');
              res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
              res.write(sitemapXml);
              res.end();
            } else {
              res.statusCode = 500;
              res.end("Error generating sitemap");
            }
          } catch (error) {
            console.error('Error fetching news by category:', error);
            res.statusCode = 500;
            res.end("Error fetching news by category");
          }
          break
        case "/sitemap/blogs-sitemap.xml":
          try {
            const res1 = await axios.post('https://api.cannabaze.com/UserPanel/Get-GetNewsbycategory/', {
              category: 2,
              limit: 49000
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const data = res1.data;
            if (data) {
              const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
                    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                      ${data.map((url) => `
                        <url>
                          <loc>${`https://www.weedx.io/blogs/${url.Url_slug === ("" || null || undefined) ? modifystr(url.Title) : modifystr(url.Url_slug)}/${url.id}`}</loc>
                          <changefreq>daily</changefreq>
                          <priority>0.8</priority>
                        </url>
                      `).join('')}
                    </urlset>`;

              res.setHeader('Content-Type', 'text/xml');
              res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
              res.write(sitemapXml);
              res.end();
            } else {
              res.statusCode = 500;
              res.end("Error generating sitemap");
            }
          } catch (error) {
            console.error('Error fetching news by category:', error);
            res.statusCode = 500;
            res.end("Error fetching news by category");
          }
          break
        case "/sitemap/brand-sitemap.xml":
          const responsebrand = await axios.get(`https://api.cannabaze.com/UserPanel/Get-AllBrand/`);
          if (responsebrand) {
            const sitemapXmll = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${responsebrand.data.map((url) => `
                <url>
                  <loc>${`${"https://www.weedx.io/brands"}/${modifystr(url.name)}/${url.id}`}</loc>
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
        case "/sitemap/dispensaries-stores-sitemap.xml":
          const response5 = await axios.get(`https://api.cannabaze.com/UserPanel/Get-Stores/`);

          if (response5 && response5.data) {
            const dispensaryUrls = response5.data.filter(url => url.Store_Type === "dispensary")
              .map(url => `
                <url>
                  <loc>https://www.weedx.io/weed-dispensaries/${modifystr(url.Store_Name)}/${url.id}</loc>
                  <changefreq>daily</changefreq>
                  <priority>0.8</priority>
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
        case "/sitemap/delivery-stores-sitemap.xml":
          const response6 = await axios.get(`https://api.cannabaze.com/UserPanel/Get-Stores/`)
          if (response6 && response6.data) {
            const dispensaryUrls = response6.data.filter(url => url.Store_Type !== "dispensary")
              .map(url => `
                  <url>
                    <loc>https://www.weedx.io/weed-deliveries/${modifystr(url.Store_Name)}/${url.id}</loc>
                    <changefreq>daily</changefreq>
                    <priority>0.8</priority>
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
        case "/sitemap/allpages-sitemap.xml":

          res.setHeader('Content-Type', 'text/xml');
          res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
          res.write(`
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url>
          <loc>https://www.weedx.io</loc>
          <changefreq>daily</changefreq>
          <priority>1</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/blogs</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/brands</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/products</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/deals</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/learn</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/aboutus</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/faq</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/helpcenter</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/cannabis-news</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/terms-and-conditions</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/privacy-policy</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/cookies-policy</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          </urlset>
          `);
          res.end();

          break
        case "/sitemap/law-sitemap.xml":
          res.setHeader('Content-Type', 'text/xml');
          res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
          res.write(`<?xml version="1.0" encoding="UTF-8"?>
  <urlset
	xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-alabama/1</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-alaska/2</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-arizona/3</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-arkansas/4</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-california/5</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-colorado/6</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-connecticut/7</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-delaware/8</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-florida/9</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-georgia/10</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-guam/11</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-hawaii/12</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-idaho/13</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-illinois/14</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-indiana/15</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-kansas/16</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-kentucky/17</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-louisiana/18</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-lowa/19</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-maine/20</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-maryland/21</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-massachusetts/22</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-michigan/23</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-minnesota/24</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-new-york/25</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
  <url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-washington/26</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-west-virginia/27</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-wisconsin/28</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-wyoming/29</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-alberta/30</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-british-columbia/31</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-canada/32</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-manitoba/33</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-new-brunswickers/34</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-newfoundland-and-labrador/35</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-northwest-territories/36</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-nova-scotia/37</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-nunavut/38</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	<url>
		<loc>https://www.weedx.io/learn/laws-and-regulation/cannabis-law-in-ontario/39</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
  <url>
		<loc>http://localhost:3000/learn/laws-and-regulation/cannabis-law-in-yukon/40</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
</urlset>`);
          res.end();

          break
        // additional cases as needed
        default:
        // code block executed if expression doesn't match any case
      }
    // }
    })
    server.get('/robots.txt', (req, res) => {
      res.type('text/plain');
      res.send(`User-agent: *
Disallow:  
Sitemap: https://www.weedx.io/sitemap.xml`);
    });
    server.post('/weed-dispensaries/upload-csv', upload.single('csvFile'), async (req, res) => {
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
            const response = await axios.post(`https://api.cannabaze.com/UserPanel/UpdateSiteMapManual/14`, {
              j: `https://www.weedx.io/weed-dispensaries/in/${modifystr(data.country)}/${modifystr(data.state)}/${modifystr(data.city)}`
            });
            // Do something with the response if needed
          } catch (error) {
            res.status(200).send('CSV file received and processed successfully');
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
    server.post('/weed-deliveries/upload-csv', upload.single('csvFile'), async (req, res) => {
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
            const response = await axios.post(`https://api.cannabaze.com/UserPanel/Update-SiteMap/11`, {
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
    server.get('*', (req, res) => {

      return handle(req, res);
    });
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> woking on http://localhost:3000');
    });

  });


//   <loc>https://www.weedx.io/weed-dispensaries/in/romania/bucure-ti/bucure-ti-sectorul-1/calea-floreasca</loc>
// <changefreq>daily</changefreq>
// <priority>0.8</priority>
// </url>
// <url>
// <loc>https://www.weedx.io/weed-dispensaries/in/romania/bucure-ti/bucure-ti-sectorul-1/bulevardul-dinicu-golescu</loc>