import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';
import Script from 'next/script';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

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
