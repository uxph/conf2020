import React, { useState } from "react";
import "../assets/sass/schedule.scss";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/schedule/hero";
import Schedule from "../components/schedule/schedule";
import SoonPage from "../components/soonPage";

const SchedulePage = () => {
  const [day, setDay] = useState(3);
  const isComingSoon = true;

  if (isComingSoon) {
    return (
      <Layout activeUrl="/schedule">
        <SEO title="Schedule" />
        <SoonPage />
      </Layout>
    );
  }

  return (
    <Layout activeUrl="/schedule">
      <SEO title="Schedule" />
      <Hero setDay={setDay} day={day} />
      <Schedule day={day} />
    </Layout>
  );
};

export default SchedulePage;
