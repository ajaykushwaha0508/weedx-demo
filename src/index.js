import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Context } from "./Hooks/Context"
import { FloatingWhatsApp } from 'react-floating-whatsapp'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Context>
        <App />
    <div className='col-10 ' style={{
            textAlign: "end",
            position: "sticky",
            bottom: 0
        }}>
    <div >   <FloatingWhatsApp
      phoneNumber="15303858664"
      accountName="WeedX.io support"
      avatar="/WEEDX(1).png" // Ensure this path is correct or replace with your avatar URL
      statusMessage="Typically replies in less than a minute"
      chatMessage="Hello! How can we help you today?" // Correct prop for default message
      message="Hello! How can we help you today?" 
      allowEsc
      allowClickAway
      className='whatsappbox'
      notification
      notificationDelay={60000}
      buttonClassName='whatsappbutton'
      chatboxClassName='whatsappcharboxcustom'
      notificationClassName='nottywhatsapp'
      notificationSound
      styles={{ zIndex: 9999 }} 
    /></div>
    </div>
    </Context>
);