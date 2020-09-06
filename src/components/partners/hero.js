import React from "react";
import Button from "../atoms/button";

const Hero = () => {
  return (
    <section
      className="padding-top-128 padding-bottom-256 text-center partner-hero"
      data-aos="fade"
      data-aos-duration={500}
      data-aos-once={true}
    >
      <h2 className="text-white margin-bottom-24">Our Partners & Sponsors</h2>
      <p className="margin-bottom-48">
        Want to partner with us? Send us an email at <br />
        <span
          className="red"
          style={{
            fontWeight: 600,
          }}
        >
          partnerships@uxph.org!
        </span>
      </p>
      <div className="text-center">
        <Button className="mr-3" href="mailto:partnerships@uxph.org">
          Inquire for sponsorship
        </Button>
      </div>
    </section>
  );
};

export default Hero;
