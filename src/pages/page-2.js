import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import ComingSoon from "../components/comingSoon";
import { coming_soon } from "../data/info.json";

const SecondPage = () => {
  if (coming_soon) {
    return <ComingSoon />;
  } else {
    return (
      <Layout>
        <SEO title="Page two" />
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
};

export default SecondPage;
