// import React from 'react';
var fs = require('fs');
var axios = require('axios')
const cron = require("node-cron");
async function generateSitemap() {


  axios.get(`https://api.cannabaze.com/UserPanel/Get-Categories/`,
  ).then((respones) => {
     const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${respones.data.map((url) => `
        <url>
          <loc>https://www.weedx.io/products/${url.name.replace(/%20| /g, "-").toLowerCase()}/${url.id}</loc>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`;

  // Write the sitemap XML to a file
  fs.writeFileSync('../public/Sitemap/sitemapcategory.xml', sitemapXml);
  })
  axios.get(`https://api.cannabaze.com/UserPanel/Get-AllProduct/`,
  ).then((respones) => {
   
     const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${respones.data.map((url) => `
        
      <url>
          <loc>https://www.weedx.io/products/${url.category_name.replace(/\s/g, '-').toLowerCase()}/${url.SubcategoryName.replace(/\s/g, '-').toLowerCase()}/${url.Product_Name.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, '-').replace("--", '-').toLowerCase()}/${url.id}</loc>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`;

  // Write the sitemap XML to a file
  fs.writeFileSync('../public/Sitemap/sitemapproduct.xml', sitemapXml);
  })
  axios.get(`https://api.cannabaze.com/UserPanel/Get-AllBrand/`,
  ).then((respones) => {

     const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${respones.data.map((url) => `
        <url>
          <loc>https://www.weedx.io/brands/${url.name.replace(/%20| /g, "-").toLowerCase()}/${url.id}</loc>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`;

  // Write the sitemap XML to a file
  fs.writeFileSync('../public/Sitemap/sitemapbrand.xml', sitemapXml);
  })

}
cron.schedule("*/15 * * * * * ", function () {
  generateSitemap();
 
});