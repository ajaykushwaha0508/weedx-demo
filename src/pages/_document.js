import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles'; // or @mui/material/styles depending on your version
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
        <Head >
        <link rel="preconnect" href="https://fonts.googleapis.com" strategy="lazyOnload" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" strategy="lazyOnload" />
        <noscript>
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
              rel="stylesheet"
            />
          </noscript>
        <link strategy="lazyOnload" rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" /> 
        <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M27MSTCW');
          `,
        }}
      />

        <script
            id="organization-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
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
                  "areaServed": ["US","GB","CA","AF","AX","AL","AS","AD","DZ","IN"],
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
              `,
            }}
          />

          {/* Website JSON-LD */}
          <script
            id="website-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
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
              `,
            }}
          />

        </Head>
        <body>
          <Main />
          <NextScript />
         
        </body>
      </Html>
    );
  }
}
