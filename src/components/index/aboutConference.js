import React from "react";
import { Container, Row, Col } from "reactstrap";
import Button from "../atoms/button";

//import members from "../../data/members.json";
import home from "../../data/home.json";

const AboutConference = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col xs={12} md={6} className="margin-bottom-32">
            <div className="video-placeholder"></div>
          </Col>
          <Col className="paragraph margin-bottom-32" xs={12} md={6}>
            <h2 className="margin-bottom-16">{home.about_conf["title"]}</h2>
            <p className="margin-bottom-32">
              This year we invite you to{" "}
              <span className="red">
                The UXPH 2020 Conference: Growth Beyond Borders
              </span>
              , a fully online conference made to bring together hundreds of
              experience designers, enthusiasts, and problem-solvers of all
              levels, from all over the map. This 2-day event features keynotes,
              panels, and workshops from local and international design leaders,
              as well as social gatherings with the Filipino UX design
              community.
            </p>
            <Button>Get Tickets</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutConference;
