import React from "react";
import { Container, Row, Col, Media } from "reactstrap";
import schedule from "../../data/schedule";
import Button from "../atoms/button";

const ListSpeakers = ({ speakers }) => {
  const listSpeakers = speakers.map((speaker, index) => {
    return (
      <Media className="margin-bottom-48">
        <Media left href="#" className="mr-2">
          <Media object src={speaker.img} alt="Generic placeholder image" />
        </Media>
        <Media body className="ml-2">
          <Media heading className="margin-bottom-16">
            {speaker.title}
          </Media>
          <h6 className="margin-bottom-16">by {speaker.name}</h6>
          <p style={{ lineHeight: "30px" }}>{speaker.description}</p>
          <Button variant="outline">Read More</Button>
        </Media>
      </Media>
    );
  });

  return <div>{listSpeakers}</div>;
};

const ScheduleTime = ({ day }) => {
  const schedTime = schedule[day].map((sched, index) => {
    return (
      <div className="margin-bottom-96">
        <h2 style={{ color: "#777" }} className="margin-bottom-64 text-center">
          {sched.type}
        </h2>
        <Row key={index}>
          <Col md={3}>
            <p style={{ color: "#777" }}>{sched.time}</p>
          </Col>
          <Col md={9}>
            <ListSpeakers speakers={sched.speaker} />
          </Col>
        </Row>
      </div>
    );
  });

  return <>{schedTime}</>;
};

const Schedule = ({ count }) => {
  return (
    <section className="padding-x-128">
      <Container>
        <ScheduleTime day={count} />
      </Container>
    </section>
  );
};

export default Schedule;
