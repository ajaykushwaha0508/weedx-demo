
import Head from "next/head"
import React from "react"
function DealsSeo() {
    return (
        <Head>
            <title>Get the best marijuana Deals Near You | weedx.io</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta name='description' content={`Get the best marijuana Deals Near You on weedx.io. Find special sales, promo codes, coupons, and discounts from cannabis dispensaries in your neighborhood`} />
            <link rel="canonical" href={`http://www.weedx.io/deals`} /> 
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            <meta property="og:image" content={'/weedxlogo.webp'} />
            {/* Facebook tags */}
            <meta property="og:type" content="website"/>
            <meta property="og:title" content={"Get the best marijuana Deals Near You | weedx.io "} />
            <meta property="og:description" content={"Get the best marijuana Deals Near You on weedx.io. Find special sales, promo codes, coupons, and discounts from cannabis dispensaries in your neighborhood"} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"website Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Get the best marijuana Deals Near You | weedx.io "} />
            <meta name="twitter:description" content={"Get the best marijuana Deals Near You on weedx.io. Find special sales, promo codes, coupons, and discounts from cannabis dispensaries in your neighborhood"} />
        </Head>
    )
}

function SitemapSeo() {
    return (
        <Head>
            <title> {`WeedX Sitemap - Complete Site Navigation`}</title>
            <meta name='description' content={`View the WeedX HTML sitemap to quickly access all website pages, categories, and resources. Navigate our site effortlessly.`} />
            <link rel="canonical" href={`http://www.weedx.io/sitemap   `} /> 
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            <meta property="og:image" content={'/weedxlogo.webp'} />
            {/* Facebook tags */}
            <meta property="og:type" content="website"/>
            <meta property="og:title" content={"Get the best marijuana Deals Near You | weedx.io "} />
            <meta property="og:description" content={"View the WeedX HTML sitemap to quickly access all website pages, categories, and resources. Navigate our site effortlessly."} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"website Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Get the best marijuana Deals Near You | weedx.io "} />
            <meta name="twitter:description" content={"View the WeedX HTML sitemap to quickly access all website pages, categories, and resources. Navigate our site effortlessly."} />
        </Head>
    )
}


export  {DealsSeo  , SitemapSeo} 