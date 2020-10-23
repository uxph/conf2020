import React, { useState } from "react";
import "../assets/sass/schedule.scss";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/schedule/hero";
import Programme from "../components/schedule/programme";
import SoonPage from "../components/soonPage";

const SchedulePage = () => {
  const [day, setDay] = useState(3);
  const isComingSoon = false;

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
      <Programme />
    </Layout>
  );
};

export default SchedulePage;
