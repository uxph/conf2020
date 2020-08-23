import React from "react";
import home from "../../data/home.json";
import { Row, Col } from "reactstrap";

const Figures = () => {
  const figure_list = home["figures"].map((figure, index) => {
    return (
      <Col xs={12} md={3} className="padding-y-128" key={index}>
        <h1 className="text-center text-white">{figure.header}</h1>
        <p className="text-center margin-x-16 text-white">{figure.body}</p>
      </Col>
    );
  });

  return (
    <section className="figures-section padding-y-64">
      <div className="wrapper">
        <Row>{figure_list}</Row>
      </div>
    </section>
  );
};

export default Figures;
