import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/about/hero";
import Intro from "../components/about/intro";
import Info from "../components/about/info";
import Team from "../components/about/team";
import "../assets/sass/about.scss";
import "../assets/sass/main.scss";

import ComingSoon from "../components/comingSoon";
import { coming_soon } from "../data/info.json";

const About = () => {
  if (coming_soon) {
    return <ComingSoon />;
  } else {
    return (
      <Layout>
        <SEO title="About" />
        <Hero />
        <Intro />
        <Info />
        <Team />
      </Layout>
    );
  }
};

export default About;
