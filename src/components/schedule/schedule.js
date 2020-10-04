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

const Programme = ({
  setWorkshopVal,
  setWorkshopVal2,
  modal,
  setModal,
  setSchedDay,
  sched,
}) => {
  const times = {
    day_1: [
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
    ],
    day_2: [
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
    ],

    pre_event_1: ["2:00PM", "2:45PM"],
    pre_event_2: ["10:10AM"],
    pre_event_3: ["2:05PM", "2:50PM"],
  };

  const schedule_list = times[sched].map((time, key) => {
    let aos_time = 50;
    const workshops = schedule[sched].map((workshop, index) => {
      if (workshop.time === time) {
        const target_speaker = speakers.filter(
          (x) => workshop["speaker_id"] === x.id
        )[0];
        return (
          <div
            key={index}
            className="margin-bottom-96 workshop-item"
            data-aos="fade-right"
            data-aos-delay={aos_time}
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
                  setSchedDay(sched);
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
      <div key={key}>
        <Row>
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

  const sched = {
    1: "day_1",
    2: "day_2",
    3: "pre_event_1",
    4: "pre_event_2",
    5: "pre_event_3",
  };

  return (
    <section className="padding-y-96">
      <div className="wrapper">
        <Programme
          setWorkshopVal={setWorkshopVal}
          setWorkshopVal2={setWorkshopVal2}
          modal={modal}
          setModal={setModal}
          toggle={toggle}
          setSchedDay={setSchedDay}
          sched={sched[day]}
        />
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
