import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import schedule from "../../data/schedule.json";
import speakers from "../../data/speakers.json";
import WorkshopModal from "./workshopModal";

import Button from "../atoms/button";
import Chip from "@material-ui/core/Chip";

const WorkshopChip = (workshop) => {
  if (workshop.workshop) {
    const workshopType = workshop.workshop.map((workType, index) => {
      return (
        <Chip
          key={index}
          label={workType}
          variant="outlined"
          className="margin-bottom-8 red"
          style={{
            borderColor: "#e8006f",
            fontFamily: "Karla",
          }}
        />
      );
    });

    return <>{workshopType}</>;
  } else {
    return null;
  }
};

const DayOne = ({
  workshopVal,
  setWorkshopVal,
  workshopVal2,
  setWorkshopVal2,
  modal,
  setModal,
  setSchedDay,
}) => {
  const times = [
    "9:30AM",
    "10:05AM",
    "10:35AM",
    "11:25AM",
    "12:10PM",
    "1:00PM",
    "1:45PM",
    "2:20PM",
    "2:50PM",
    "3:15PM",
    "3:40PM",
    "4:25PM",
    "5:15PM",
  ];

  const schedule_list = times.map((time, key) => {
    let aos_time = 100;

    const workshops = schedule["day_1"].map((workshop, index) => {
      if (workshop.time === time) {
        const target_speaker = speakers.filter(
          (x) => workshop["speaker_id"] === x.id
        )[0];
        return (
          <div
            key={index}
            className="workshop-item margin-bottom-96"
            data-aos="fade-up"
            data-aos-delay={aos_time}
            data-aos-once={true}
            data-aos-offset={100}
            style={{
              display: "flex",
            }}
          >
            <div>
              <img
                src={target_speaker.image_url}
                className="d-block margin-right-24 featured-image"
                style={{
                  width: "9rem",
                  height: "9rem",
                  objectFit: "cover",
                  borderRadius: "100%",
                }}
                alt={target_speaker.name}
              />
            </div>
            <div>
              <div className="margin-bottom-12">
                <Chip
                  label={workshop.type}
                  variant="outlined"
                  className="margin-bottom-8 margin-right-8 red"
                  style={{
                    borderColor: "#e8006f",
                    fontFamily: "Karla",
                  }}
                />
                <WorkshopChip workshop={workshop.workshop} />
              </div>

              <h3
                style={{
                  fontSize: "24px",
                  lineHeight: "2rem",
                }}
              >
                {workshop.title}
              </h3>
              <p className="red">
                <strong>by {target_speaker.name}</strong>
              </p>
              <p className="gray workshop-description">
                {workshop.description}
              </p>
              <Button
                variant="outline"
                style={{
                  padding: "0.75rem 1rem",
                }}
                href="/"
                onClick={(e) => {
                  setWorkshopVal(workshop.speaker_id);
                  setWorkshopVal2(workshop.id);
                  setSchedDay("day_1");
                  setModal(!modal);
                  e.preventDefault();
                }}
              >
                Read more
              </Button>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
    return (
      <Row key={key}>
        <Col md={2}>
          <div>
            <p className="gray margin-y-64">
              <strong>{time}</strong>
            </p>
          </div>
        </Col>
        <Col>{workshops}</Col>
        <hr />
      </Row>
    );
  });

  return <>{schedule_list}</>;
};

const DayTwo = ({
  workshopVal,
  setWorkshopVal,
  workshopVal2,
  setWorkshopVal2,
  modal,
  setModal,
  setSchedDay,
}) => {
  const times = [
    "9:30AM",
    "10:05AM",
    "10:50AM",
    "11:20AM",
    "12:05PM",
    "1:10PM",
    "1:55PM",
    "2:40PM",
    "3:20PM",
    "4:00PM",
    "4:40PM",
    "5:00PM",
  ];

  const schedule_list = times.map((time, key) => {
    let aos_time = 100;
    const workshops = schedule["day_2"].map((workshop, index) => {
      if (workshop.time === time) {
        const target_speaker = speakers.filter(
          (x) => workshop["speaker_id"] === x.id
        )[0];
        return (
          <div
            key={index}
            className="margin-bottom-96 workshop-item"
            data-aos="fade-up"
            data-aos-delay={aos_time}
            data-aos-once={true}
            data-aos-offset={100}
            style={{
              display: "flex",
            }}
          >
            <div>
              <img
                src={target_speaker.image_url}
                className="d-block margin-right-24"
                style={{
                  width: "9rem",
                  height: "9rem",
                  objectFit: "cover",
                  borderRadius: "100%",
                }}
                alt={target_speaker.name}
              />
            </div>

            <div>
              <div className="margin-bottom-12">
                <Chip
                  label={workshop.type}
                  variant="outlined"
                  className="margin-bottom-8 red"
                  style={{
                    borderColor: "#e8006f",
                    fontFamily: "Karla",
                  }}
                />
                <WorkshopChip workshop={workshop.workshop} />
              </div>

              <h3
                style={{
                  fontSize: "24px",
                  lineHeight: "2rem",
                }}
              >
                {workshop.title}
              </h3>
              <p className="red">
                <strong>by {target_speaker.name}</strong>
              </p>
              <p className="gray workshop-description">
                {workshop.description}
              </p>
              <Button
                variant="outline"
                style={{
                  padding: "0.75rem 1rem",
                }}
                href="/"
                onClick={(e) => {
                  setWorkshopVal(workshop.speaker_id);
                  setWorkshopVal2(workshop.id);
                  setSchedDay("day_2");
                  setModal(!modal);
                  e.preventDefault();
                }}
              >
                Read more
              </Button>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
    return (
      <div>
        <Row key={key}>
          <Col sm={12} md={2}>
            <div>
              <p className="gray margin-y-64">
                <strong>{time}</strong>
              </p>
            </div>
          </Col>
          <Col>{workshops}</Col>
        </Row>
        <hr />
      </div>
    );
  });

  return <>{schedule_list}</>;
};

const Schedule = ({ day }) => {
  const [workshopVal, setWorkshopVal] = useState(-1);
  const [workshopVal2, setWorkshopVal2] = useState(-1);
  const [schedDay, setSchedDay] = useState("day_1");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <section className="padding-y-96">
      <div className="wrapper">
        {day === 1 && (
          <DayOne
            workshopVal={workshopVal}
            setWorkshopVal={setWorkshopVal}
            workshopVal2={workshopVal2}
            setWorkshopVal2={setWorkshopVal2}
            modal={modal}
            setModal={setModal}
            toggle={toggle}
            setSchedDay={setSchedDay}
          />
        )}
        {day === 2 && (
          <DayTwo
            workshopVal={workshopVal}
            setWorkshopVal={setWorkshopVal}
            workshopVal2={workshopVal2}
            setWorkshopVal2={setWorkshopVal2}
            modal={modal}
            setModal={setModal}
            toggle={toggle}
            setSchedDay={setSchedDay}
          />
        )}
        <WorkshopModal
          val={workshopVal}
          val2={workshopVal2}
          schedDay={schedDay}
          modal={modal}
          toggle={toggle}
        />
      </div>
    </section>
  );
};

export default Schedule;
