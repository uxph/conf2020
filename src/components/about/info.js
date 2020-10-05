import React from "react";
import Button from "../atoms/button";
import { Row, Col } from "reactstrap";

const Intro = () => {
  return (
    <section className="padding-y-96 about-info-section">
      <div className="wrapper">
        <Row
          data-aos="fade-up"
          data-aos-offset={500}
          data-aos-once={true}
          id="about-info"
        >
          <Col md={6} xs={12} className="margin-bottom-24">
            <p
              className="line-height-32 margin-right-32 margin-bottom-32"
              style={{
                fontSize: "1.125rem",
              }}
            >
              This year we invite you to{" "}
              <strong>The UXPH 2020 Conference: Growth Beyond Borders</strong>,
              a fully online conference made to bring together hundreds of
              experience designers, enthusiasts, and problem-solvers of all
              levels, from all over the map. This 2-day event features keynotes,
              panels, and workshops from local and international design leaders,
              as well as social gatherings with the Filipino UX design
              community.
            </p>
            <Button href="/tickets" variant="outline">
              Get Tickets
            </Button>
          </Col>
          <Col md={6} xs={12} className="text-center">
            <img
              src={"/images/visuals/collage-6.png"}
              alt="Placeholder"
              className="img-resizer"
              style={{
                borderRadius: "1rem",
              }}
            />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Intro;
