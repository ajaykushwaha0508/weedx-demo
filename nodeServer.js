// // var fs = require('fs');
// // var axios = require('axios')
// // const cron = require("node-cron");
// // var value = 0
// // async function generateSitemap() {

// //   axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-SitemapbyId/14`,
// //   ).then((respones) => {

// //     const sitemapXmll = `<?xml version="1.0" encoding="UTF-8"?>
// //     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// //       ${respones.data[0].Xml.map((url) => `
// //         <url>
// //           <loc>${url}</loc>
// //           <changefreq>daily</changefreq>
// //           <priority>0.7</priority>
// //         </url>
// //       `).join('')}
// //     </urlset>`;

// //     // Write the sitemap XML to a file
// //     return  fs.writeFileSync('./build/Sitemap/weed-dispensaries.xml', sitemapXmll);

// //   })

// //   axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-SitemapbyId/11`,
// //   ).then((respones) => {

// //     const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
// //   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// //     ${respones.data[0].Xml.map((url) => `
// //       <url>
// //         <loc>${url}</loc>
// //         <changefreq>daily</changefreq>
// //         <priority>0.7</priority>
// //       </url>
// //     `).join('')}
// //   </urlset>`;

// //     // Write the sitemap XML to a file
// //     return  fs.writeFileSync('./build/Sitemap/weed-deliveries.xml', sitemapXml);

// //   })

// //   axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-SitemapbyId/13`,
// //   ).then((respones) => {
// //     const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
// //   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// //     ${respones.data[0].Xml.map((url) => `
// //       <url>
// //         <loc>${url}</loc>
// //         <priority>0.7</priority>
// //       </url>
// //     `).join('')}
// //   </urlset>`;

// //     // Write the sitemap XML to a file
// //     fs.writeFileSync('./build/Sitemap/law.xml', sitemapXml);
// //     //  value = 0

// //   })

// //   axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-Categories/`,
// //   ).then((respones) => {
// //      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
// //     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// //       ${respones.data.map((url) => `
// //         <url>
// //           <loc>https://www.weedx.io/products/${url.name.replace(/%20| /g, "-").toLowerCase()}/${url.id}</loc>
// //           <changefreq>daily</changefreq>
// //           <priority>0.7</priority>
// //         </url>
// //       `).join('')}
// //     </urlset>`;

// //   // Write the sitemap XML to a file
// //   fs.writeFileSync('./build/Sitemap/sitemapcategory.xml', sitemapXml);
// //   })
// //   axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-AllProduct/`,
// //   ).then((respones) => {

// //      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
// //     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// //       ${respones.data.map((url) => `

// //       <url>
// //           <loc>https://www.weedx.io/products/${url.category_name.replace(/\s/g, '-').toLowerCase()}/${url.SubcategoryName.replace(/\s/g, '-').toLowerCase()}/${url.Product_Name.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, '-').replace("--", '-').toLowerCase()}/${url.id}</loc>
// //           <changefreq>daily</changefreq>
// //           <priority>0.7</priority>
// //         </url>
// //       `).join('')}
// //     </urlset>`;

// //   // Write the sitemap XML to a file
// //   fs.writeFileSync('./build/Sitemap/sitemapproduct.xml', sitemapXml);
// //   })
// //   axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-AllBrand/`,
// //   ).then((respones) => {

// //      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
// //     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// //       ${respones.data.map((url) => `
// //         <url>
// //           <loc>https://www.weedx.io/brands/${url.name.replace(/%20| /g, "-").toLowerCase()}/${url.id}</loc>
// //           <changefreq>daily</changefreq>
// //           <priority>0.7</priority>
// //         </url>
// //       `).join('')}
// //     </urlset>`;

// //   // Write the sitemap XML to a file
// //   fs.writeFileSync('./build/Sitemap/sitemapbrand.xml', sitemapXml);
// //   value = 0
// //   })

// // }
// // cron.schedule("*/5 * * * * *", function () {
// //   if (value === 0) {
// //     value = 1
// //     generateSitemap()
// //   }

// // });
// var fs = require('fs');
// var axios = require('axios')
// const cron = require("node-cron");
// var value = 0
// async function generateSitemap() {

//   axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-SitemapbyId/14`,
//   ).then((respones) => {

//     const sitemapXmll = `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//       ${respones.data[0].Xml.map((url) => `
//         <url>
//           <loc>${url}</loc>
//           <changefreq>daily</changefreq>
//           <priority>0.7</priority>
//         </url>
//       `).join('')}
//     </urlset>`;

//     // Write the sitemap XML to a file
//     return fs.writeFileSync('./build/Sitemap/weed-dispensaries.xml', sitemapXmll);

//   })

//   axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-SitemapbyId/11`,
//   ).then((respones) => {

//     const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
//   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     ${respones.data[0].Xml.map((url) => `
//       <url>
//         <loc>${url}</loc>
//         <changefreq>daily</changefreq>
//         <priority>0.7</priority>
//       </url>
//     `).join('')}
//   </urlset>`;

//     // Write the sitemap XML to a file
//     return fs.writeFileSync('./build/Sitemap/weed-deliveries.xml', sitemapXml);

//   })
//   axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-SitemapbyId/13`,
//   ).then((respones) => {
//     const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
//   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     ${respones.data[0].Xml.map((url) => `
//       <url>
//         <loc>${url}</loc>
//         <priority>0.7</priority>
//       </url>
//     `).join('')}
//   </urlset>`;

//     // Write the sitemap XML to a file
//     fs.writeFileSync('./build/Sitemap/law.xml', sitemapXml);
//     //  value = 0

//   })
//   axios.get(`https://apiv2.cannabaze.com/UserPanel/Get-Categories/`,
//   ).then((respones) => {
//     const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
//   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     ${respones.data.map((url) => `
//       <url>
//         <loc>https://www.weedx.io/products/${url.name.replace(/%20| /g, "-").toLowerCase()}/${url.id}</loc>
//         <changefreq>daily</changefreq>
//         <priority>0.7</priority>
//       </url>
//     `).join('')}
//   </urlset>`;

//     // Write the sitemap XML to a file
//     fs.writeFileSync('./build/Sitemap/sitemapcategory.xml', sitemapXml);
//   })
//   axios.get(`https://apiv2.cannabaze.com/UserPanel/ListProductView/`,
//   ).then((respones) => {

//     const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
//   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     ${respones.data.map((url) => `

//     <url>
//     <loc>https://www.weedx.io/products/${url.category_name.replace(/\s/g, '-').toLowerCase()}/${url.SubcategoryName.replace(/\s/g, '-').toLowerCase()}/${url.Product_Name.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, '><s/g, '-').replace("--", '-').toLowerCase()}/${url.id}</loc>
//         <changefreq>daily</changefreq>
//         <priority>0.7</priority>
//       </url>
//     `).join('')}
//   </urlset>`;

//     // Write the sitemap XML to a file
//     fs.writeFileSync('./build/Sitemap/sitemapproduct.xml', sitemapXml);
//   })




