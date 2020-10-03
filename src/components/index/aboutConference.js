import React from "react";
import { Row, Col } from "reactstrap";

const AboutConference = () => {
  return (
    <section>
      <div className="wrapper mb-5">
        <h2 className="text-center margin-bottom-32">What is UXPH CONF?</h2>
        <p className="text-center">
          <strong>The UXPH CONF</strong>, now in its 5th year, is a 2-day online
          event filled with talks and workshops for{" "}
          <strong>Experience Designers</strong>, <strong>enthusiasts</strong>,
          and <strong>problem-solvers</strong>.
        </p>
        <p className="text-center">
          This year, we look back at how designers adapted and thrived when the
          way we work and go about life was transformed. Looking to the future,
          what can we learn from their experience? How can we help our teams
          navigate the constant change in the world as we design products and
          services that have a lasting impact?
        </p>
        <p className="text-center">
          We invite you to join us this <strong>November 14</strong> and{" "}
          <strong>15, 2020</strong> in learning from and connecting with leaders
          in the local and international UX community, as we cover{" "}
          <strong>research methodologies</strong>,{" "}
          <strong>design management</strong>, <strong>design methods</strong>,
          and many other topics to help your teams grow as professionals.
        </p>
      </div>
      <div className="wrapper">
        <p className="text-center margin-bottom-48 font-weight-bold">
          Check out our past conferences:
        </p>
        <Row>
          <Col md={6} sm={12}>
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/EWZ5HRa2qf8"
                frameborder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                title="Last year's UXPH conference video"
                className="border-radius-8"
              ></iframe>
            </div>
          </Col>
          <Col md={6} sm={12}>
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/m4qL22eR0ok"
                frameborder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                title="Last year's UXPH conference video"
                className="border-radius-8"
              ></iframe>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutConference;
