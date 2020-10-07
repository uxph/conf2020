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
      <div
        className="wrapper"
        style={{
          width: "600px",
          paddingBottom: "128px",
        }}
      >
        <h2 className="text-white margin-bottom-24">Our Partners & Sponsors</h2>
        <p
          className="margin-bottom-48 text-white text-block"
          style={{
            fontSize: "1rem",
          }}
        >
          UXPH CONF 2020 is proudly supported by generous organizations and
          communities who support the mission and vision of UXPH and all of its
          initiatives, and want to help the design community grow beyond its
          borders. <br />
        </p>
        <p
          className="margin-bottom-48 text-white text-block"
          style={{
            fontSize: "1rem",
          }}
        >
          Conference attendees will also receive plenty of special benefits from
          our generous sponsors and partners.{" "}
          <a href="/tickets" className="red">
            Get your tickets now!
          </a>
        </p>
        <div className="text-center">
          <Button href="mailto:partnerships@uxph.org">
            Inquire for sponsorship
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
