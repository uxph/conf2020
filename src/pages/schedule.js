import React, { useState } from "react";
import "../assets/sass/schedule.scss";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/schedule/hero";
import Schedule from "../components/schedule/schedule";

const IndexPage = () => {
  const [day, setDay] = useState(1);

  return (
    <Layout activeUrl="/schedule">
      <SEO title="Schedule" />
      <Hero setDay={setDay} day={day} />
      <Schedule day={day} />
    </Layout>
  );
};

export default IndexPage;
