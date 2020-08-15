import React from "react";
import ComingSoon from "../components/comingSoon";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/index/hero";
import AboutConference from "../components/index/aboutConference";
import Figures from "../components/index/figures";
import Speakers from "../components/index/speakers";
import Testimonials from "../components/index/testimonials";
import Partners from "../components/index/partners";

import "../assets/sass/home.scss";
import { coming_soon } from "../data/info.json";

const IndexPage = () => {
  if (coming_soon) {
    return (
      <>
        <SEO title="Coming Soon!" />
        <ComingSoon />
      </>
    );
  } else {
    return (
      <Layout isHomePage={true}>
        <SEO title="Home" />
        <Hero />
        <AboutConference />
        <Figures />
        <Speakers />
        <Testimonials />
        <Partners />
      </Layout>
    );
  }
};

export default IndexPage;
