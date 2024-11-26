import Head from 'next/head';
function Advertisseo(){
    return (
        <Head>
            <title>{`Advertise with WeedX.io - Cannabis Industry Advertising Solutions`}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name='description' content={` Advertise your cannabis business on WeedX.io. Choose from banner ads, sponsored listings, or blog posts to reach a targeted cannabis audience. Contact info@weedx.io to get started.`} />
            <link rel="canonical" href={`https://weedx.io/advertise`} />
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={`Advertise with WeedX.io - Cannabis Industry Advertising Solutions`} />
            <meta property="og:description" content={`  Advertise your cannabis business on WeedX.io. Choose from banner ads, sponsored listings, or blog posts to reach a targeted cannabis audience. Contact info@weedx.io to get started.`} />
            <meta property="og:image" content={'/weedxlogo.webp'} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:title" content={`Advertise with WeedX.io - Cannabis Industry Advertising Solutions`} />
            <meta name="twitter:description" content={` Advertise your cannabis business on WeedX.io. Choose from banner ads, sponsored listings, or blog posts to reach a targeted cannabis audience. Contact info@weedx.io to get started.`} />
        </Head>
    )
}

export default Advertisseo