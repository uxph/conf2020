import React from "react";
import ComingSoon from "../components/comingSoon";
import Layout from "../components/layout";
import SEO from "../components/seo";
import TicketForm from "../components/tickets/ticketForm";
import Hero from "../components/tickets/hero";

import "../assets/sass/home.scss";
import { coming_soon } from "../data/info.json";

const IndexPage = () => {
  if (coming_soon) {
    return (
      <>
        <SEO title="Coming Nov. 14-15" />
        <ComingSoon />
      </>
    );
  } else {
    return (
      <Layout isHomePage={true} activeUrl="">
        <SEO title="Buy Tickets" />
        <Hero />
        <section className="padding-bottom-96">
          <TicketForm />
        </section>
      </Layout>
    );
  }
};

export default IndexPage;
