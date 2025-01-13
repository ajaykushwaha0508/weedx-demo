import Head from "next/head"
const businesspageseo = () => {
  return (
    <Head>
            <title>{`Add Your Cannabis Business - Dispensary, Delivery Service, or Brand on WeedX.io
 `}</title>
 <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta name='description' content={`List your dispensary, delivery service, or cannabis brand on WeedX.io. Easily manage inventory and orders with Cannabaze, available on mobile. Get started now!
`} />
        
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            <link rel="canonical"  href={'http://www.weedx.io/add-business'} />
           {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={`Add Your Cannabis Business - Dispensary, Delivery Service, or Brand on WeedX.io
 `} />
            <meta property="og:description" content={`List your dispensary, delivery service, or cannabis brand on WeedX.io. Easily manage inventory and orders with Cannabaze, available on mobile. Get started now!
`} />
            <meta property="og:image" content={'/weedxlogo.webp'} />
            { /* End Facebook tags */}

            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={`Add Your Cannabis Business - Dispensary, Delivery Service, or Brand on WeedX.io
 `} />
            <meta name="twitter:description" content={`List your dispensary, delivery service, or cannabis brand on WeedX.io. Easily manage inventory and orders with Cannabaze, available on mobile. Get started now!
`} />
            <meta property="og:image" content={'/weedxlogo.webp'} />
       
        </Head>
  )
}

export default businesspageseo