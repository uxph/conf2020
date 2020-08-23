import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import testimonies from "../../data/testimonies.json";

const testimonials = [[], [], []];
testimonies.forEach((test, index) => {
  testimonials[index % 3].push(
    <Card className="border-0 shadow margin-bottom-32">
      <CardBody>
        <p className="testimonial margin-bottom-16">{test.body}</p>
        <p className="author">{test.author}</p>
      </CardBody>
    </Card>
  );
});

const Testimonials = () => {
  return (
    <section className="testimonials-section padding-top-192 padding-bottom-128">
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
