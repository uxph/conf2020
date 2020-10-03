/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Nav from "./nav";
import Footer from "./footer";
import "../assets/sass/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import InnerHTML from "dangerously-set-html-content";

import Aos from "aos";
import "aos/dist/aos.css";

const Layout = (props) => {
  const [navTheme, setNavTheme] = useState("dark");

  window.addEventListener(
    "scroll",
    () => {
      const pageOffset = window.pageYOffset;
      if (pageOffset > 300) {
        setNavTheme("light");
      } else {
        setNavTheme("dark");
      }
    },
    300
  ); //ms

  useEffect(() => {
    Aos.init({
      duration: 1500,
    });
  }, []);

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
    <div>
      <Nav
        isHomePage={props.isHomePage}
        activeUrl={props.activeUrl}
        theme={navTheme}
      />
      <main>{props.children}</main>
      <Footer />
      <InnerHTML html={messengerEmbed} />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
