import React from "react";
import Button from "../atoms/button";
import { Row, Col } from "reactstrap";

const Intro = () => {
  return (
    <section className="padding-y-96 about-info-section">
      <div className="wrapper">
        <Row
          data-aos="fade-up"
          data-aos-offset={500}
          data-aos-once={true}
          id="about-info"
          className="align-items-center"
        >
          <Col md={6} xs={12} className="margin-bottom-24">
            <p
              className="line-height-32 margin-right-32 margin-bottom-32 text-block"
              style={{
                fontSize: "1.125rem",
              }}
            >
              UXPH has become the country’s hub for sharing information,
              resources, and building networks in the design community. As of
              2020, the UXPH community has over 5,000+ local and international
              members from a wide range of industries related to technology and
              even traditional businesses.
            </p>
            <Button href="/tickets" variant="outline">
              Get Tickets
            </Button>
          </Col>
          <Col md={6} xs={12} className="text-center margin-bottom-24">
            <img
              src={"/images/visuals/collage-6.png"}
              alt="Placeholder"
              className="img-resizer"
              style={{
                borderRadius: "1rem",
              }}
            />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Intro;
