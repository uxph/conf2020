import React from "react";
import Layout from "../components/layout";
import Hero from "../components/callForSpeakers/hero";
import Form from "../components/callForSpeakers/form";
import SEO from "../components/seo";

import "../assets/sass/main.scss";

const callForSpeakersPage = () => {
  return (
    <Layout activeUrl="/call-for-speakers">
      <SEO title="Call for speakers" />
      <Hero />
      <Form />
    </Layout>
  );
};

export default callForSpeakersPage;
