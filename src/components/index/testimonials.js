import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import testimonies from "../../data/testimonies.json";

const testimonials = [[], [], []];
testimonies.forEach((test, index) => {
  testimonials[index % 3].push(
    <Card className="border-0 shadow margin-bottom-32">
      <CardBody>
        <p className="testimonial margin-bottom-16">{test.body}</p>
      </CardBody>
    </Card>
  );
});

const Testimonials = () => {
  return (
    <section
      className="testimonials-section padding-top-192 padding-bottom-128"
      data-aos="fade-up"
      data-aos-offset={400}
      data-aos-once={true}
    >
      <h2 className="text-center margin-bottom-64 text-uppercase font-size-32">
        Why do people love UXPH Conf?
      </h2>
      <div className="wrapper">
        <Row>
          <Col>{testimonials[0]}</Col>
          <Col>{testimonials[1]}</Col>
          <Col>{testimonials[2]}</Col>
        </Row>
      </div>
    </section>
  );
};

export default Testimonials;
