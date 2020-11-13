import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import TicketForm from "../components/tickets/ticketForm";
import Hero from "../components/tickets/hero";
import SoldOut from "../components/soldOut";

import "../assets/sass/home.scss";
import { ticket_shutdown } from "../data/info.json";

const TicketPage = () => {
  if (ticket_shutdown) {
    return <SoldOut />;
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

export default TicketPage;
