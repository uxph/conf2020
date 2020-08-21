import React from "react";
import "../assets/sass/faq.scss";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/faq/hero";
import Inquiries from "../components/faq/inquiries";
import ComingSoon from "../components/comingSoon";
import { coming_soon } from "../data/info.json";

const FaqPage = () => {
  if (coming_soon) {
    return <ComingSoon />;
  } else {
    return (
      <Layout activeUrl="/faq">
        <SEO title="FAQ" />
        <Hero />
        <Inquiries />
      </Layout>
    );
  }
};

export default FaqPage;
