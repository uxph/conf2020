import React from "react";
import Button from "../atoms/button";
import { Row, Col } from "reactstrap";

const Intro = () => {
  return (
    <section className="padding-y-96">
      <div className="wrapper">
        <Row data-aos="fade-up" data-aos-offset={500}>
          <Col md={6} xs={12} className="margin-bottom-24">
            <p className="font-size-16 line-height-32 margin-right-32 margin-bottom-32">
              This year we invite you to{" "}
              <strong>The UXPH 2020 Conference: Growth Beyond</strong>
              Borders, a fully online conference made to bring together hundreds
              of experience designers, enthusiasts, and problem-solvers of all
              levels, from all over the map. This 2-day event features keynotes,
              panels, and workshops from local and international design leaders,
              as well as social gatherings with the Filipino UX design
              community.
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
      </div>
    </section>
  );
};

export default Intro;
