'use client';

import './styles/App.css';
// import './styles/termconditions.css';
import "./styles/AppStyle.css";
import "./styles/Style.css";
import './styles/mediaQuery.css';
import 'bootstrap/dist/js/bootstrap.bundle';
// import "./styles/Blog.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from "react-error-boundary";
import ConfigRoute from "./Routes/ConfigRoute"
// const phoneNumber = "15303858664";
// const message = "Hello! How can we help you today?";
// const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

function App() {
  const router = createBrowserRouter(ConfigRoute);
  const helmetContext = {};
  return (


    <>
      {/* <ErrorBoundary fallback={<div>Something went wrong</div>}> */}
      <HelmetProvider context={helmetContext}>
        <GoogleOAuthProvider clientId="418178406595-vqsd5staarqh0pibnho4l4s63gio1bm4.apps.googleusercontent.com">
          <RouterProvider router={router} />
        </GoogleOAuthProvider>

      </HelmetProvider>
      {/* </ErrorBoundary> */}
{/* 
      <div className='col-10 ' style={{
        textAlign: "end",
        position: "sticky",
        bottom: 0
      }}>
        <a href={whatsappUrl} className="whatsapp-float" target="_blank" rel="noopener noreferrer">
          <img src="/WEEDX(1).png" alt="WhatsApp" />
        </a>
      </div> */}

    </>

  );
}
export default App;