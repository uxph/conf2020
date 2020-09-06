import React from "react";
import { Row, Col } from "reactstrap";
import schedule from "../../data/schedule.json";
import speakers from "../../data/speakers.json";
import Button from "../atoms/button";
import Chip from "@material-ui/core/Chip";

const DayOne = () => {
  const times = [
    "9:30AM",
    "10:00AM",
    "11:00AM",
    "11:30AM",
    "12:00NN",
    "1:00PM",
    "2:00PM",
    "3:00PM",
    "3:30PM",
    "4:30PM",
    "5:00PM",
  ];

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
              fontFamily: "Work Sans",
            }}
          />
        );
      });

      return <>{workshopType}</>;
    } else {
      return null;
    }
  };

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
            data-aos-offset={300}
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
                  borderRadius: "100%",
                }}
                alt={target_speaker.name}
              />
            </div>
            <div>
              <Chip
                label={workshop.type}
                variant="outlined"
                className="margin-bottom-8 margin-right-8 red"
                style={{
                  borderColor: "#e8006f",
                  fontFamily: "Work Sans",
                }}
              />
              <WorkshopChip workshop={workshop.workshop} />

              <h3
                style={{
                  fontSize: "20px",
                }}
              >
                {workshop.title}
              </h3>
              <p className="red">
                <strong>by {target_speaker.name}</strong>
              </p>
              <p className="gray">{workshop.description}</p>
              <Button
                variant="outline"
                style={{
                  padding: "1rem 1rem",
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
          <div
            style={{
              position: "sticky",
              top: 116,
            }}
          >
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

const DayTwo = () => {
  const times = [
    "9:30AM",
    "10:00AM",
    "11:00AM",
    "11:30AM",
    "12:00NN",
    "1:00PM",
    "2:00PM",
    "3:00PM",
    "3:30PM",
    "4:30PM",
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
            data-aos="fade-down"
            data-aos-delay={aos_time}
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
                  borderRadius: "100%",
                }}
                alt={target_speaker.name}
              />
            </div>

            <div>
              <Chip
                label={workshop.type}
                variant="outlined"
                className="margin-bottom-8 red"
                style={{
                  borderColor: "#e8006f",
                  fontFamily: "Work Sans",
                }}
              />
              <WorkshopChip workshop={workshop.workshop} />

              <h3
                style={{
                  fontSize: "20px",
                }}
              >
                {workshop.title}
              </h3>
              <p className="red">
                <strong>by {target_speaker.name}</strong>
              </p>
              <p className="gray">{workshop.description}</p>
              <Button
                variant="outline"
                style={{
                  padding: "1rem 1rem",
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
        <Col sm={12} md={2}>
          <div
            style={{
              position: "sticky",
              top: 116,
            }}
          >
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

const Schedule = ({ day }) => {
  return (
    <section className="padding-y-96">
      <div className="wrapper">
        {day === 1 && <DayOne />}
        {day === 2 && <DayTwo />}
      </div>
    </section>
  );
};

export default Schedule;
