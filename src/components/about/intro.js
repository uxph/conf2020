import React from "react";
import { Row, Col } from "reactstrap";

const Intro = () => {
  return (
    <section
      className="padding-y-128 padding-top-192 about-intro-section"
      data-aos="fade-up"
      data-aos-offset={500}
      data-aos-delay={300}
      data-aos-once={true}
    >
      <div className="wrapper">
        <Row id="about-intro" className="align-items-center">
          <Col md={6} xs={12} className="margin-bottom-8 text-center">
            <img
              src={"/images/visuals/collage-5.png"}
              alt="Placeholder"
              className="img-resizer"
              style={{
                borderRadius: "1rem",
              }}
            />
          </Col>
          <Col md={6} xs={12}>
            <p
              className="line-height-32"
              style={{
                fontSize: "1.125rem",
              }}
            >
              UXPH (User Experience Philippines) is a Filipino non-profit
              organization that hosts the largest network of design
              professionals, enthusiasts, and students in the Philippines. Since
              2012, we have been building towards a more mature, collaborative,
              and design-driven country through hosting online and offline
              community initiatives, conferences, and programs within local
              design and technology communities.
            </p>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Intro;
