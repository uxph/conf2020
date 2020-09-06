import React from "react";
import Card from "../atoms/card";
import Button from "../atoms/button";
import { Container } from "reactstrap";

const Hero = () => {
  return (
    <section
      className="padding-top-128 padding-bottom-256 text-center about-hero"
      data-aos="fade"
      data-aos-duration={500}
      data-aos-once={true}
    >
      <Container className="margin-x-64">
        <div>
          <img
            src={"/images/logos/headline.svg"}
            alt="Growth Beyond Borders"
            id="headline"
            className="margin-bottom-64"
          />
        </div>
        <h1 className="font-size-32 text-white margin-bottom-24">
          About the Conference
        </h1>
        <p className="margin-bottom-64">
          We designers are at the forefront of digital transformation <br />
          and inciting positive change that lasts
        </p>
      </Container>
      <Card
        id="about-cta"
        style={{
          width: "575px",
          marginBottom: "-300px",
        }}
      >
        <p className="margin-bottom-24">
          Join UXPH as we grow beyond our borders in a weekend packed with
          learning, inspiration, and collaboration–all within the comfort of
          your own screen.
        </p>
        <Button
          style={{
            padding: "0.5rem 1.5rem",
          }}
        >
          Get Tickets
        </Button>
      </Card>
    </section>
  );
};

export default Hero;
