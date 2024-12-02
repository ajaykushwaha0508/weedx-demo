import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import "@/styles/globals.css";
import "@/styles/customstyle.module.min.css"
import layout from "../layout/layout"
import React from "react";
import layout1 from "../layout/layout1"
import { Context } from "../hooks/context"
import dynamic from 'next/dynamic';
// import CheckAgeEligbilityPopup from "@/component/CheckAgeEligblityPopup/CheckAgeEligbilityPopup"
// const CheckAgeEligbilityPopup = dynamic(() => import("@/component/CheckAgeEligblityPopup/CheckAgeEligbilityPopup"), { ssr: false });
const Currentlocation = dynamic(() => import("@/component/currentlocation/CurrentLocation"), { ssr: false });
// import CheckAgeEligbilityPopup from "@/component/CheckAgeEligblityPopup/CheckAgeEligbilityPopup";
import { useRouter } from "next/router";
import Router from 'next/router';
import NProgress from 'nprogress';
import Cookies from 'universal-cookie';
import 'nprogress/nprogress.css';
// import CookieConsent from "react-cookie-consent";
const layouts = {
  default: layout,
  layout1: layout1,
};
export default function App({ Component, pageProps }) {
  const router = useRouter()
    const cookies = new Cookies();
  const Layout = layouts[Component.layout] || layouts.default;
  const isNotWeedPath = React.useMemo(
    () => !/^\/weed-(deliveries|dispensaries)\/in\/.+/.test(router.pathname),
    [router.pathname]
  );
  React.useEffect(() => {
    NProgress.configure({ showSpinner: false });
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleStop);
    Router.events.on('routeChangeError', handleStop);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleStop);
      Router.events.off('routeChangeError', handleStop);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId="418178406595-vqsd5staarqh0pibnho4l4s63gio1bm4.apps.googleusercontent.com">
      <Context>
        <Layout>
          {/* { isNotWeedPath &&  <CheckAgeEligbilityPopup  value={(cookies.get("CheckAge") && cookies.get("fetchlocation") )=== undefined ? true : false}></CheckAgeEligbilityPopup>} */}
          {isNotWeedPath && <Currentlocation></Currentlocation>}
          <Component {...pageProps} />
        </Layout>
      </Context>
    </GoogleOAuthProvider>
  );
}
// import "bootstrap/dist/css/bootstrap-grid.min.css"; // Reduced bootstrap CSS
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import "@/styles/globals.css";
// import "@/styles/customstyle.module.min.css";
// import React from "react";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/router";
// import Router from "next/router";
// import NProgress from "nprogress";
// import Cookies from "universal-cookie";
// import "nprogress/nprogress.css";
// import { Context } from "../hooks/context";
// import layout from "../layout/layout";
// import layout1 from "../layout/layout1";

// // Dynamic imports
// const Currentlocation = dynamic(() => import("@/component/currentlocation/CurrentLocation"), { ssr: false });

// const layouts = {
//   default: layout,
//   layout1: layout1,
// };

// export default function App({ Component, pageProps }) {
//   const router = useRouter();
//   const cookies = new Cookies();
//   const Layout = layouts[Component.layout] || layouts.default;

//   const isNotWeedPath = React.useMemo(
//     () => !/^\/weed-(deliveries|dispensaries)\/in\/.+/.test(router.pathname),
//     [router.pathname]
//   );

//   React.useEffect(() => {
//     NProgress.configure({ showSpinner: false, trickleSpeed: 200 });
//     const handleStart = () => NProgress.start();
//     const handleStop = () => NProgress.done();

//     Router.events.on("routeChangeStart", handleStart);
//     Router.events.on("routeChangeComplete", handleStop);
//     Router.events.on("routeChangeError", handleStop);

//     return () => {
//       Router.events.off("routeChangeStart", handleStart);
//       Router.events.off("routeChangeComplete", handleStop);
//       Router.events.off("routeChangeError", handleStop);
//     };
//   }, []);

//   return (
//     <GoogleOAuthProvider clientId="418178406595-vqsd5staarqh0pibnho4l4s63gio1bm4.apps.googleusercontent.com">
//       <Context>
//         <Layout>
//           {isNotWeedPath && <Currentlocation />}
//           <Component {...pageProps} />
//         </Layout>
//       </Context>
//     </GoogleOAuthProvider>
//   );
// }
