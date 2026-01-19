import Head from 'next/head';
import Createcontext from "../../hooks/context"
import React from "react"
function DispensariesSco({ location, format_Address }) {
    const { state } = React.useContext(Createcontext)
    return (
        <Head>
            <title>{` Weed Dispensaries in ${format_Address}| weedx.io |`}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta name='description' content={`Find Nearby Dispensaries in ${format_Address} for Recreational & Medical weed. Browse Top Cannabis Products and Place Orders from Trusted Local Dispensaries.`} />
            <link rel="canonical" href={`http://www.weedx.io${location}`} />
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={` Weed Dispensaries in ${format_Address}| weedx.io |`} />
            <meta property="og:description" content={` Find Nearby Dispensaries in ${format_Address} for Recreational & Medical weed. Browse Top Cannabis Products and Place Orders from Trusted Local Dispensaries.`} />
            <meta property="og:image" content={'/weedxlogo.webp'} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={`Weed Dispensaries in ${format_Address}| weedx.io |`} />
            <meta name="twitter:title" content={` Weed Dispensaries in ${format_Address}| weedx.io |`} />
            <meta name="twitter:description" content={`Find Nearby Dispensaries in ${format_Address} for Recreational & Medical weed. Browse Top Cannabis Products and Place Orders from Trusted Local Dispensaries.`} />

        </Head>
    )
}

export default DispensariesSco
