import React from "react";
import Button from "../atoms/button";
import { Row, Col, Container } from "reactstrap";

const Intro = () => {
  return (
    <section className="padding-y-256 about-info">
      <Container>
        <Row>
          <Col md={6} xs={12} className="margin-bottom-24">
            <p className="font-size-16 line-height-32 margin-right-32 margin-bottom-32">
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
            <Button variant="outline">Get Tickets</Button>
          </Col>
          <Col md={6} xs={12} className="text-center">
            <img
              src={"/images/undraw_group_video_el8e 1.svg"}
              alt="Placeholder"
              className="img-resizer"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Intro;
