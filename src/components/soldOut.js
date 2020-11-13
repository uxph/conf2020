import React, { useState } from "react";
import Button from "../components/atoms/button";
import info from "../data/info.json";
import PaymentModal from "../components/atoms/paymentModal";
import InnerHTML from "dangerously-set-html-content";

const SoldOut = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const messengerEmbed = `
  <div id="fb-root"></div>
  <script>
  window.fbAsyncInit = function() {
    FB.init({
      xfbml            : true,
      version          : 'v8.0'
    });
  };

  (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
  </script>
  <div
    class="fb-customerchat"
    attribution="setup_tool"
    page_id="314394185432326"
    theme_color="#e8006f"
  ></div>
  <script
    async
    defer
    crossorigin="anonymous"
    src="https://connect.facebook.net/en_US/sdk.js"
  ></script>
`;
  return (
    <header
      style={{
        backgroundColor: "var(--black)",
        boxSizing: "border-box",
      }}
    >
      <InnerHTML html={messengerEmbed} />
      <PaymentModal isOpen={modal} toggle={toggle} />
      {/* Video overlay */}
      <div
        id="coming-soon-overlay"
        style={{
          position: "fixed",
          backgroundColor: "var(--black)",
          width: "100%",
          height: "100%",
          left: "0",
          top: "0",
          zIndex: "400",
          opacity: "1",
        }}
      ></div>
      <div
        id="coming-soon-content"
        className="margin-top-192 margin-bottom-48 mx-auto"
        style={{
          position: "relative",
          zIndex: "500",
          width: "700px",
          boxSizing: "border-box",
        }}
      >
        <h1 className="text-center text-white margin-bottom-32 font-size-48">
          Sorry! Tickets have been sold out.
        </h1>
        <div className="text-center margin-bottom-48">
          <Button
            className="margin-left-8 margin-right-8 margin-bottom-16 cta-button"
            style={{
              padding: "12px 16px",
            }}
            href="/"
          >
            Back to homepage
          </Button>
        </div>
        <div className="text-center margin-top-4">
          <p
            style={{
              color: "#FFF",
            }}
          >
            Join the community and follow us for updates!
          </p>
        </div>
        <div className="d-flex justify-content-center margin-top-24">
          <a href={info.facebook_page} target="blank">
            <img
              src={"/images/icons/facebook-square.svg"}
              alt="UXPH Facebook Page"
              className="margin-right-24"
            />
          </a>
          <a href={info.instagram} target="blank">
            <img
              src={"/images/icons/ig-square.svg"}
              alt="UXPH Instagram Page"
              className="margin-right-24"
            />
          </a>
          <a href={info.twitter} target="blank">
            <img
              src={"/images/icons/twitter.svg"}
              alt="UXPH Twitter Page"
              className="margin-right-24"
            />
          </a>
          <a href={info.linkedin} target="blank">
            <img src={"/images/icons/linkedin.svg"} alt="UXPH LinkedIn Page" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default SoldOut;
