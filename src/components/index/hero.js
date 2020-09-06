import React from "react";
import Button from "../atoms/button";
import home from "../../data/home.json";
import { Row, Col } from "reactstrap";

const Hero = () => {
  let time = 0;

  const figure_list = home["figures"].map((figure, index) => {
    time += 400;
    return (
      <Col
        xs={12}
        md={3}
        className="padding-y-128"
        key={index}
        data-aos="fade-in"
        data-aos-delay={time}
      >
        <h3 className="text-center text-white font-size-48">{figure.header}</h3>
        <p
          className="text-center margin-x-16 text-white"
          style={{
            fontSize: "1.125rem",
          }}
        >
          {figure.body}
        </p>
      </Col>
    );
  });
  return (
    <section
      className="padding-top-128 padding-bottom-128 text-center main-header"
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
      <div className="wrapper">
        <Row>{figure_list}</Row>
      </div>
    </section>
  );
};

export default Hero;
