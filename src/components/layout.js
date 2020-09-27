/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Nav from "./nav";
import Footer from "./footer";
import "../assets/sass/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import InnerHTML from "dangerously-set-html-content";

import Aos from "aos";
import "aos/dist/aos.css";

const Layout = (props) => {
  useEffect(() => {
    Aos.init({
      duration: 1500,
    });
  }, []);

  return (
    <>
      <Nav isHomePage={props.isHomePage} activeUrl={props.activeUrl} />
      <main>{props.children}</main>
      <Footer />
      <InnerHTML html={(driftEmbed, messengerEmbed)} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
