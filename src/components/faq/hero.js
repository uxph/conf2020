import React from "react";
import { Container } from "reactstrap";

const Hero = () => {
  return (
    <section
      className="padding-top-128 padding-bottom-256 text-center faq-hero"
      data-aos="fade"
      data-aos-duration={500}
      data-aos-once={true}
    >
      <Container className="margin-x-64">
        <h1 className="text-white">Frequently Asked Questions</h1>
      </Container>
    </section>
  );
};

export default Hero;
