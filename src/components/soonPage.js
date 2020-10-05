import React from "react";
import Button from "../components/atoms/button";
import InnerHTML from "dangerously-set-html-content";

import "../assets/sass/home.scss";
import info from "../data/info.json";

const SoonPage = () => {
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
    <>
      <InnerHTML html={messengerEmbed} />
      <header
        style={{
          backgroundColor: "var(--black)",
          boxSizing: "border-box",
        }}
      >
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
          className="margin-top-192 margin-bottom-48 mx-auto"
          style={{
            position: "relative",
            zIndex: "500",
            width: "700px",
            boxSizing: "border-box",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
          }}
          id="confirmation-content"
        >
          <h1
            className="text-white text-center"
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
            }}
          >
            Coming Soon!
          </h1>
          <center>
            <Button
              style={{
                padding: "8px 24px",
              }}
              className="margin-top-16"
              href="/"
            >
              Back to homepage
            </Button>
          </center>
          <div className="text-center margin-top-64">
            <p className="text-white margin-bottom-16">
              Join the community and follow us for updates!
            </p>
          </div>
          <div className="d-flex justify-content-center margin-top-16">
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
              <img
                src={"/images/icons/linkedin.svg"}
                alt="UXPH LinkedIn Page"
              />
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default SoonPage;
