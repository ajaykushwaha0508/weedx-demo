import React from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';

const Chartbot = () => {
  React.useEffect(() => {
    const chatbox = document.querySelector('.whatsappcharboxcustom');
    if (chatbox?.getAttribute('aria-hidden') === 'true') {
      const focusableElements = chatbox.querySelectorAll('input, button, [tabindex]');
      focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));
    }
  }, []);

  return (
    <div
      className="col-10"
      style={{
        textAlign: "end",
        position: "sticky",
        bottom: 0,
        zIndex: 3,
      }}
    >
      <FloatingWhatsApp
        phoneNumber="15303858664"
        accountName="WeedX.io support"
        avatar="/WEEDX(1).png" // Ensure this path is correct or replace with your avatar URL
        statusMessage="Typically replies in less than a minute"
        chatMessage="Hello! How can we help you today?" // Initial chat message
        allowEsc
        allowClickAway
        className="whatsappbox"
        notification
        notificationDelay={60000}
        buttonClassName="whatsappbutton"
        chatboxClassName="whatsappcharboxcustom"
        notificationClassName="nottywhatsapp"
        notificationSound
        styles={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default Chartbot;
