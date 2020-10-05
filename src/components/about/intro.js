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
        <Row id="about-intro">
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
              Despite the many challenges faced by the world this year, it has
              become even smaller, more connected, and more resourceful than
              ever. Being agents of change, we designers should continue to ask,
              "How might we mindfully drive digital transformation and inspire
              positive, lasting experiences?". As we continue to overcome
              technological and geographical limitations that separate us,
              human-centered design has become an emphasis for societal
              progress, and it all starts with learning how we can apply it to
              an everyday context.
            </p>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Intro;
