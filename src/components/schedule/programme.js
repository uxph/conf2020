import React from "react";
import _ from "lodash";
import { Row, Col } from "reactstrap";
import schedule from "../../data/schedule.json";
import speakers from "../../data/speakers.json";
// import Button from "../atoms/button";
import { Chip } from "@material-ui/core";

const DaySegment = ({ segment }) => {
  const currSegment = schedule[segment].map((event, index) => {
    const currWorkshops = event.workshop.map((item, index) => {
      return (
        <Chip
          key={index}
          label={item}
          variant="outlined"
          className="margin-bottom-8 red ml-2"
          style={{
            borderColor: "#e8006f",
            fontFamily: "Karla",
          }}
        />
      );
    });

    const facilitators = event.speaker_id.map((speaker_id) => {
      const currFacilitator = _.find(
        speakers,
        (speaker) => speaker.id === speaker_id
      );

      return (
        <div className="d-flex align-items-center margin-bottom-32">
          <div className="margin-right-16">
            <img
              src={currFacilitator.image_url}
              style={{
                width: "72px",
                height: "72px",
                objectFit: "cover",
                borderRadius: "100%",
              }}
              alt={currFacilitator.name}
            />
          </div>
          <div>
            <h5 className="mb-0 font-size-16">{currFacilitator.name}</h5>
            <p className="red mb-0">
              {currFacilitator.position} at {currFacilitator.company}
            </p>
          </div>
        </div>
      );
    });

    const isSpecialSegment = [
      "Socials",
      "Break",
      "Team",
      "Remarks",
      "Concert",
    ].includes(event.type);

    const isSameTime =
      index - 1 >= 0
        ? schedule[segment][index].time === schedule[segment][index - 1].time
        : false;
    return (
      <div
        className={`padding-y-32`}
        style={{
          borderTop: isSameTime ? "none" : "thin solid #f3f3f3",
        }}
      >
        {/* {!isSpecialSegment && (
          <h6 className="gray mx-4 margin-bottom-32">
            <strong>{event.time}</strong>
          </h6>
        )} */}
        <Row key={index} className={`mx-3`}>
          {isSameTime ? (
            <Col md={2}></Col>
          ) : (
            <Col md={2}>
              {!isSpecialSegment && (
                <h6 className="gray">
                  <strong>{event.time}</strong>
                </h6>
              )}
            </Col>
          )}

          <Col md={4}>
            <h5
              className={`margin-bottom-12 ${isSpecialSegment ? "mb-0" : ""}`}
              style={{
                lineHeight: "1.5rem",
                fontSize: "1rem",
              }}
            >
              {event.title}
            </h5>
            {!isSpecialSegment && (
              <div className="mb-1">
                <Chip
                  variant="outlined"
                  label={event.type}
                  className="margin-bottom-8"
                  style={{
                    // color: "#ffffff",
                    // backgroundColor: "#e8006f",
                    borderColor: "#e8006f",
                    color: "#e8006f",
                    fontFamily: "Karla",
                    fontSize: "0.7rem",
                  }}
                />
                {currWorkshops}
              </div>
            )}
            {/* {!isSpecialSegment && (
              <Button
                variant="outline"
                style={{
                  padding: "0.7rem 0.7rem",
                }}
              >
                Read more
              </Button>
            )} */}
          </Col>
          <Col md={6} className="pl-4">
            {facilitators}
          </Col>
        </Row>
      </div>
    );
  });

  return <>{currSegment}</>;
};

const Programme = () => {
  return (
    <section>
      <div className="wrapper">
        <div
          className="border p-4 bg-white shadow-sm margin-bottom-48"
          style={{
            borderRadius: "1rem",
          }}
          data-aos="fade"
          data-aos-offset={50}
          data-aos-duration={600}
          data-aos-once={true}
        >
          <div
            className="margin-y-16"
            style={{
              position: "sticky",
              top: "71px",
              zIndex: 1000,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <h3 className="text-center">
              <span className="red text-uppercase">Pre-event</span>{" "}
              <small
                className="gray font-size-16"
                style={{
                  verticalAlign: "middle",
                }}
              >
                (October 24, Saturday)
              </small>
            </h3>
          </div>
          <DaySegment segment="pre_event_1" />
        </div>
        <div
          className="border p-4 bg-white shadow-sm margin-bottom-48"
          style={{
            borderRadius: "1rem",
          }}
          data-aos="fade"
          data-aos-offset={50}
          data-aos-duration={600}
          data-aos-once={true}
        >
          <div
            className="padding-y-16"
            style={{
              position: "sticky",
              top: "70px",
              zIndex: 1000,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <h3 className="text-center">
              <span className="red text-uppercase">Pre-event</span>{" "}
              <small
                className="gray font-size-16"
                style={{
                  verticalAlign: "middle",
                }}
              >
                (October 31, Saturday)
              </small>
            </h3>
          </div>
          <DaySegment segment="pre_event_2" />
        </div>
        <div
          className="border p-4 bg-white shadow-sm margin-bottom-48"
          style={{
            borderRadius: "1rem",
          }}
          data-aos="fade"
          data-aos-offset={50}
          data-aos-duration={600}
          data-aos-once={true}
        >
          <div
            className="padding-y-16"
            style={{
              position: "sticky",
              top: "70px",
              zIndex: 1000,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <h3 className="text-center">
              <span className="red text-uppercase">Pre-event</span>{" "}
              <small
                className="gray font-size-16"
                style={{
                  verticalAlign: "middle",
                }}
              >
                (November 7, Saturday)
              </small>
            </h3>
          </div>
          <DaySegment segment="pre_event_3" />
        </div>
        <div
          className="border p-4 bg-white shadow-sm margin-bottom-48"
          style={{
            borderRadius: "1rem",
          }}
          data-aos="fade"
          data-aos-offset={50}
          data-aos-duration={600}
          data-aos-once={true}
        >
          <div
            className="padding-y-16"
            style={{
              position: "sticky",
              top: "70px",
              zIndex: 1000,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <h3 className="text-center">
              <span className="red text-uppercase">Day 1</span>{" "}
              <small
                className="gray font-size-16"
                style={{
                  verticalAlign: "middle",
                }}
              >
                (November 14, Saturday)
              </small>
            </h3>
          </div>
          <DaySegment segment="day_1" />
        </div>
        <div
          className="border p-4 bg-white shadow-sm margin-bottom-48"
          style={{
            borderRadius: "1rem",
          }}
          data-aos="fade"
          data-aos-offset={50}
          data-aos-duration={600}
          data-aos-once={true}
        >
          <div
            className="padding-y-16"
            style={{
              position: "sticky",
              top: "70px",
              zIndex: 1000,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <h3 className="text-center text-uppercase">
              <span className="red">Day 2</span>{" "}
              <small
                className="gray font-size-16"
                style={{
                  verticalAlign: "middle",
                }}
              >
                (November 15, Sunday)
              </small>
            </h3>
          </div>
          <DaySegment segment="day_2" />
        </div>
      </div>
    </section>
  );
};

export default Programme;
