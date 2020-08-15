import React from "react";
import home from "../../data/home.json";
import { Container, Row, Col } from "reactstrap";

const Figures = () => {
  const figure_list = home["figures"].map((figure, index) => {
    return (
      <Col xs={12} md={3} className="padding-y-128 margin-x-32" key={index}>
        <h1 className="text-center">{figure.header}</h1>
        <p className="text-center margin-x-16">{figure.body}</p>
      </Col>
    );
  });

  return (
    <section className="figures-section padding-y-64">
      <Container>
        <Row>{figure_list}</Row>
      </Container>
    </section>
  );
};

export default Figures;
