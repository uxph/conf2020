import React, { useState } from "react";
import "../assets/sass/schedule.scss";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/schedule/hero";
import Schedule from "../components/schedule/schedule";

const IndexPage = () => {
  const [count, setCount] = useState(0);

  return (
    <Layout activeUrl="/schedule">
      <SEO title="Schedule" />
      <Hero setCount={setCount} />
      <Schedule count={count} />
    </Layout>
  );
};

export default IndexPage;
