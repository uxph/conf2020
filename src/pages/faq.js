import React from "react";
import "../assets/sass/faq.scss";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/faq/hero";
import Inquiries from "../components/faq/inquiries";

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="FAQ" />
      <Hero />
      <Inquiries />
    </Layout>
  );
};

export default IndexPage;
