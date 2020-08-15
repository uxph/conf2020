import React from "react";
import { Container, Row, Col } from "reactstrap";
import testimonies from "../../data/testimonies.json";

const testimonials = testimonies.map((test, index) => {
  return (
    <Col md={4} xs={12} className="margin-bottom-32" key={index}>
      <p className="testimonial text-center margin-bottom-16">{test.body}</p>
      <p className="author text-center">{test.author}</p>
    </Col>
  );
});

const Testimonials = () => {
  return (
    <section className="testimonials-section padding-top-192 padding-bottom-128">
      <Container>
        <Row>{testimonials}</Row>
      </Container>
    </section>
  );
};

export default Testimonials;
