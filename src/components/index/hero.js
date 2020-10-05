import React from "react";
import Button from "../atoms/button";
import home from "../../data/home.json";
import { Row, Col } from "reactstrap";

const Hero = () => {
  let time = 0;

  const figure_list = home["figures"].map((figure, index) => {
    time += 200;
    return (
      <Col
        xs={12}
        md={4}
        key={index}
        data-aos="fade-in"
        data-aos-delay={time}
        data-aos-offset={100}
        data-aos-once={true}
      >
        <h3 className="text-center text-white font-size-64">{figure.header}</h3>
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
      <div>
        <img
          src={"/images/logos/uxph_conf_logo.svg"}
          alt="UXPH Conference 2020"
          style={{
            width: "170px",
          }}
        />
      </div>
      <div>
        <img
          src={"./images/logos/headline.svg"}
          className="width-512"
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
        NOVEMBER 14 - 15, 2020
      </h2>
      <div className="text-center">
        <Button className="mr-3 mb-3 main-btn" href="/tickets">
          Get Tickets
        </Button>
        <Button className="mr-3" variant="outline" bgColor="#000000">
          Full program (Coming soon)
        </Button>
      </div>
      <div className="wrapper">
        <Row className="justify-content-center padding-y-128">
          {figure_list}
        </Row>
      </div>
    </section>
  );
};

export default Hero;
