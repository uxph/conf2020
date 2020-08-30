import React from "react";
import Button from "../atoms/button";

const Hero = () => {
  return (
    <section
      className="padding-top-128 padding-bottom-256 text-center main-header"
      data-aos="fade"
      data-aos-duration={500}
      data-aos-once={true}
    >
      <div className="main-header--logo">
        <img
          src={"/images/logos/uxph_conf_logo.svg"}
          alt="UXPH Conference 2020"
        />
      </div>
      <div>
        <img
          src={"./images/logos/headline.svg"}
          className="width-384"
          alt="Designers as navigators of change"
        />
      </div>
      <h2
        className="text-white margin-bottom-48"
        style={{
          fontSize: "1.25rem",
          letterSpacing: "3px",
        }}
      >
        NOVEMBER 7-8, 2020
      </h2>
      <div className="text-center">
        <Button className="mr-3">Get Tickets</Button>
        <Button variant="outline" bgColor="#000000">
          See full program
        </Button>
      </div>
    </section>
  );
};

export default Hero;
