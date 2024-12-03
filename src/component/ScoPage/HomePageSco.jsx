import Head from "next/head"

function HomePageSco({location  }) {
    return (
        <Head>
            
            <title>{"Find Weed Dispensaries & Delivery Near You - WeedX.io"}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name='description' content={" Find local marijuana dispensaries near you, browse menus for top-quality cannabis products, and enjoy fast delivery and easy pickup options"} />
            <link rel="canonical" href={`https://www.weedx.io`} /> 
            <meta itemProp="name" content="WeedX" />
            <meta name="keywords" content="Marijuana Dispensaries & Delivery Near Me,Marijuana Delivery Near Me,Marijuana Dispensary Near Me,Marijuana Dispensaries & Delivery Near You,Cannabis Dispensary Near You,Cannabis Delivery Near Me,Recreational Cannabis Delivery Near You,Weed Delivery Near Me,Medical Marijuana Near You,Recreational and Medical Marijuana Dispensaries & Delivery Near You,Recreational Weed Services,Trusted Weed Delivery Near Me,Speedy Marijuana Delivery Service,Convenient Cannabis Stores,High-Quality Marijuana Products,Marijuana Dispensaries Open Now  " />
            <meta itemProp="description" content=" Find local marijuana dispensaries near you, browse menus for top-quality cannabis products, and enjoy fast delivery and easy pickup options" />
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={"Find Weed Dispensaries & Delivery Near You - WeedX.io"} />
            <meta property="og:description" content={" Find local marijuana dispensaries near you, browse menus for top-quality cannabis products, and enjoy fast delivery and easy pickup options"} />
            <meta property="og:image" content={'/weedxlogo.webp'} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Find Weed Dispensaries & Delivery Near You - WeedX.io"} />
            <meta name="twitter:description" content={" Find local marijuana dispensaries near you, browse menus for top-quality cannabis products, and enjoy fast delivery and easy pickup options"} />
        </Head>
    )
}
export  default HomePageSco 
