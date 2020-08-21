import React from "react";
import { Container, Card, CardBody } from "reactstrap";

const Hero = ({ setCount }) => {
  return (
    <section className="padding-top-128 padding-bottom-256 text-center faq-hero">
      <Container className="margin-x-64">
        <h1 className="text-white margin-bottom-24">Conference Schedule</h1>
        <p className="text-white margin-bottom-96">
          Program details and speakers to be finalized closer to the event.
        </p>
        <Card
          style={{
            width: "575px",
            margin: "0 auto -200px",
          }}
        >
          <CardBody className="card-container">
            <button
              style={{ width: "240px" }}
              className="button button-outer-layer"
              onClick={() => setCount(0)}
            >
              Day 1
            </button>
            <div className="button-outer-layer">
              <button
                style={{ width: "240px" }}
                className="button outline"
                onClick={() => setCount(1)}
              >
                <span>Day 2</span>
              </button>
            </div>
          </CardBody>
        </Card>
      </Container>
    </section>
  );
};

export default Hero;
