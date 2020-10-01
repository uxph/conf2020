import React from "react";
import { Container, Card, CardBody } from "reactstrap";
import Button from "../atoms/button";

const Hero = ({ day, setDay }) => {
  return (
    <section
      className="padding-top-128 padding-bottom-256 text-center faq-hero"
      data-aos="fade"
      data-aos-duration={500}
      data-aos-once={true}
    >
      <Container className="margin-x-64">
        <h1 className="text-white margin-bottom-8">Conference Schedule</h1>
        <p className="text-white margin-bottom-96">
          Program details and speakers to be finalized closer to the event.
        </p>
        <div
          style={{
            marginBottom: "-230px",
          }}
        >
          <Card className="border-0 shadow d-inline-block day-cards">
            <CardBody className="card-container">
              <Button
                className="margin-right-8"
                style={{
                  width: "170px",
                }}
                variant={day === 1 ? null : "outline"}
                onClick={() => setDay(1)}
              >
                Day 1 (Sat)
              </Button>
              <Button
                className="margin-left-8"
                style={{
                  width: "170px",
                }}
                variant={day === 2 ? null : "outline"}
                onClick={() => setDay(2)}
              >
                Day 2 (Sun)
              </Button>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
