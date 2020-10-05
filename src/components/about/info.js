import React from "react";
import Button from "../atoms/button";
import { Row, Col } from "reactstrap";

const Intro = () => {
  return (
    <section className="padding-y-96 info">
      <div className="wrapper">
        <Row data-aos="fade-up" data-aos-offset={500} data-aos-once={true}>
          <Col
            sm={{ order: 2 }}
            md={{ size: 6, order: 1 }}
            xs={{ size: 12, order: 2 }}
            className="margin-bottom-24 info-text"
          >
            <p
              className="line-height-32 margin-right-32 margin-bottom-32"
              style={{
                fontSize: "1.125rem",
              }}
            >
              This year we invite you to{" "}
              <strong>The UXPH 2020 Conference: Growth Beyond</strong>
              Borders, a fully online conference made to bring together hundreds
              of experience designers, enthusiasts, and problem-solvers of all
              levels, from all over the map. This 2-day event features keynotes,
              panels, and workshops from local and international design leaders,
              as well as social gatherings with the Filipino UX design
              community.
            </p>
            <Button className="info-btn" variant="outline">
              Get Tickets
            </Button>
          </Col>
          <Col
            md={{ size: 6, order: 2 }}
            xs={{ size: 12, order: 1 }}
            className="text-center margin-bottom-24"
          >
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
