import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/partners/hero";
import Sponsors from "../components/partners/sponsors";
import "../assets/sass/partners.scss";
import "../assets/sass/main.scss";

import ComingSoon from "../components/comingSoon";
import { coming_soon } from "../data/info.json";

const PartnersPage = () => {
  if (coming_soon) {
    return <ComingSoon />;
  } else {
    return (
      <Layout activeUrl="/sponsors">
        <SEO title="Partners" />
        <Hero />
        <Sponsors />
      </Layout>
    );
  }
};

export default PartnersPage;
