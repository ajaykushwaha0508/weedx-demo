import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';
import Script from 'next/script';
import countries from  "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {

    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    var code 
    if ( ctx.req.url.startsWith('/weed-dispensaries') || ctx.req.url.startsWith('/weed-deliveries') ) {
     if (ctx.req.url.startsWith('/weed-dispensaries')){
         const l =  ctx.req.url.split('/weed-dispensaries/in/')[1]
         code = "en-"+ countries.getAlpha2Code(l, "en") || "US"
     }
     else{
       const l =  ctx.req.url.split('/weed-deliveries/in/')[1]
         code = "en-"+ countries.getAlpha2Code(l, "en") || "US"
     }
    }
    else{
      code = ctx.req?.cookies?.locale || 'en-US'; // Default to English
    }
  // const code = ctx.req?.cookies?.locale || 'en-US'; // Default to English
  //   console.log(ctx.req.url.startsWith('/weed-dispensaries') , ctx.req.url.split('/weed-dispensaries/in/')[1]   )
    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
      code        
    };
  }
   

  render() {

    return (
      <Html lang={this.props.code}>
        <Head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'GA_MEASUREMENT_ID', {
                            cookie_flags: 'SameSite=None;Secure',
                            anonymize_ip: true 
                        });
                        `,
                    }}
                ></script>


          {/* Google Tag Manager */}
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M27MSTCW');
            `}
          </Script>

          {/* Organization JSON-LD */}
          <Script id="organization-jsonld" type="application/ld+json" strategy="afterInteractive">
            {`
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "weedx.io",
                "alternateName": "weedx.io",
                "url": "https://www.weedx.io/",
                "logo": "./WEEDX(1).png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+1 (209) 655-0360",
                  "contactType": "customer service",
                  "areaServed": ["US", "GB", "CA", "AF", "AX", "AL", "AS", "AD", "DZ", "IN"],
                  "availableLanguage": "en"
                },
                "sameAs": [
                  "https://www.facebook.com/profile.php?id=61550742531174",
                  "https://twitter.com/Weedx_io",
                  "https://www.youtube.com/@Weedx-io",
                  "https://www.instagram.com/weedx_io",
                  "https://www.linkedin.com/company/weedx-io/"
                ]
              }
            `}
          </Script>

          {/* Website JSON-LD */}
          <Script id="website-jsonld" type="application/ld+json" strategy="afterInteractive">
            {`
              {
                "@context": "http://schema.org",
                "@type": "WebSite",
                "url": "https://www.weedx.io/",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.weedx.io/search/?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            `}
          </Script>
        </Head>
        <body>
          {/* GTM Fallback for NoScript */}
          <noscript>
            <iframe
            
              src="https://www.googletagmanager.com/ns.html?id=GTM-M27MSTCW"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
