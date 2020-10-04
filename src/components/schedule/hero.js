import React from "react";
import { Card, CardBody } from "reactstrap";
import Button from "../atoms/button";

const Hero = ({ day, setDay }) => {
  return (
    <section
      className="padding-top-128 padding-bottom-256 text-center faq-hero"
      data-aos="fade"
      data-aos-duration={500}
      data-aos-once={true}
    >
      <div className="margin-x-64 wrapper">
        <h1 className="text-white margin-bottom-8">Conference Schedule</h1>
        <p className="margin-bottom-96">
          Our PACKED 2-day virtual conference includes exclusive pre-conference
          events. All talks will be streamed on our conference platform and
          available to ticket holders even after the event for a limited time.{" "}
          <a href="/tickets" className="red">
            Get your tickets now!
          </a>
        </p>
        <div
          style={{
            marginBottom: "-230px",
          }}
        >
          <Card className="border-0 shadow d-inline-block day-cards">
            <CardBody className="card-container">
              <div className="margin-bottom-8">
                <Button
                  className="margin-right-8"
                  innerClassName="pre-conf-button"
                  style={{
                    width: "120px",
                  }}
                  variant={day === 3 ? null : "outline"}
                  onClick={() => setDay(3)}
                >
                  Pre-conf
                  <br /> <small>(Sat, Oct 24)</small>
                </Button>
                <Button
                  className="margin-right-8"
                  innerClassName="pre-conf-button text-center"
                  style={{
                    width: "120px",
                  }}
                  variant={day === 4 ? null : "outline"}
                  onClick={() => setDay(4)}
                >
                  Pre-conf <br />
                  <small>(Sat, Oct 31)</small>
                </Button>
                <Button
                  className="margin-right-8"
                  innerClassName="pre-conf-button"
                  style={{
                    width: "120px",
                  }}
                  variant={day === 5 ? null : "outline"}
                  onClick={() => setDay(5)}
                >
                  Pre-conf <br />
                  <small>(Sat, Nov 7)</small>
                </Button>
                <Button
                  className="margin-right-8"
                  innerClassName="pre-conf-button"
                  style={{
                    width: "120px",
                  }}
                  variant={day === 1 ? null : "outline"}
                  onClick={() => setDay(1)}
                >
                  Day 1 <br />
                  <small>(Sat, Nov 14)</small>
                </Button>
                <Button
                  innerClassName="pre-conf-button"
                  style={{
                    width: "120px",
                  }}
                  variant={day === 2 ? null : "outline"}
                  onClick={() => setDay(2)}
                >
                  Day 2 <br />
                  <small>(Sun, Nov 15)</small>
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
