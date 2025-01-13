import Head from "next/head"

function BrandSeo({ location }) {
    return (
        <Head>
            <title>Shop from Top Marijuana Brands Near You | weedx.io</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta name='description' content={`Shop high-quality Recreational and Medical Marijuana from top brands Near you. Order online and get the best delivery, dispensaries, and deals on weedx.io`} />
            <link rel="canonical" href={`http://www.weedx.io${location}`} />
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={"Shop from Top Marijuana Brands Near You | weedx.io | "} />
            <meta property="og:description" content={"Shop high-quality Recreational and Medical Marijuana from top brands Near you. Order online and get the best delivery, dispensaries, and deals on weedx.io"} />
            <meta property="og:image" content={'/weedxlogo.webp'} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"website Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Shop from Top Marijuana Brands Near You | weedx.io | "} />
            <meta name="twitter:description" content={"Shop high-quality Recreational and Medical Marijuana from top brands Near you. Order online and get the best delivery, dispensaries, and deals on weedx.io"} />
            <meta property="og:image" content={'/weedxlogo.webp'} />
        </Head>
    )
}

function BrandDetailsSeo({ brandname, location , image }) {
    return (
        <Head>
            <title>{`${brandname} | Top Marijuana Brand Near You | weedx.io`}</title>
            <meta name='description' content={`Shop high-quality Recreational and Medical Marijuana from top Brands Near you from ${brandname}. Online Order, delivery, dispensaries, and deals on weedx.io.`} />
            <link rel="canonical" href={`http://www.weedx.io${location}`} />
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={"Shop from Top Marijuana Brands Near You | weedx.io | "} />
            <meta property="og:description" content={`Shop high-quality Recreational and Medical Marijuana from top Brands Near you from ${brandname}. Online Order, delivery, dispensaries, and deals on weedx.io.`} />
            <meta property="og:image" content={image} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"website Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Shop from Top Marijuana Brands Near You | weedx.io | "} />
            <meta name="twitter:description" content={`Shop high-quality Recreational and Medical Marijuana from top Brands Near you from ${brandname}. Online Order, delivery, dispensaries, and deals on weedx.io.`} />
            <meta property="og:image" content={image} />

        </Head>
    )
}

export { BrandSeo, BrandDetailsSeo } 
