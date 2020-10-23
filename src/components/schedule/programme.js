import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Row, Col } from "reactstrap";
import schedule from "../../data/schedule.json";
import speakers from "../../data/speakers.json";
import Button from "../atoms/button";
import { Chip } from "@material-ui/core";
import WorkshopModal from "../schedule/workshopModal";
import $ from "jquery";

const DaySegment = ({ segment, setSegmentName, setWorkshopId, toggle }) => {
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

    const facilitators = event.speaker_id.map((speaker_id, index) => {
      const currFacilitator = _.find(
        speakers,
        (speaker) => speaker.id === speaker_id
      );

      return (
        <div key={index} className="d-flex margin-bottom-32 speaker-container">
          <div className="margin-right-16 speaker-photo">
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
              {currFacilitator.position !== ""
                ? `${currFacilitator.position} at ${currFacilitator.company}`
                : null}
            </p>
            <div className="margin-bottom-16 margin-top-8">
              <img
                src={currFacilitator.company_logo}
                alt={currFacilitator.company}
                style={{
                  width: `${
                    currFacilitator.company_logo_type === "square"
                      ? "64px"
                      : "96px"
                  }`,
                  filter: "grayscale(100%)",
                }}
                className="company-img"
              />
            </div>
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

    // if (!isSpecialSegment && event.description[0] === "Coming Soon!") {
    //   return null;
    // } else {
    return (
      <div
        className={`padding-y-32`}
        style={{
          borderTop: isSameTime ? "none" : "thin solid #f3f3f3",
        }}
        key={event.id}
      >
        {/* {!isSpecialSegment && (
          <h6 className="gray mx-4 margin-bottom-32">
            <strong>{event.time}</strong>
          </h6>
        )} */}
        <a
          href="/"
          className={`${
            isSpecialSegment ? "" : "segment-item"
          } bg-white d-block pt-3`}
          style={{
            textDecoration: "none",
            cursor: isSpecialSegment ? "default" : "pointer",
          }}
          onClick={(e) => {
            e.preventDefault();
            if (!isSpecialSegment) {
              setSegmentName(segment);
              setWorkshopId(event.id);
              toggle();
              // console.log(segment + " " + event.id);
            }
          }}
        >
          <Row key={index} className={`mx-3 segment-container`}>
            {isSameTime ? (
              <Col md={2} sm={12}></Col>
            ) : (
              <Col md={2} sm={12}>
                <h6 className="gray">
                  <strong>{event.time}</strong>
                </h6>
              </Col>
            )}

            <Col md={4} sm={12}>
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
            </Col>
            <Col md={6} sm={12} className="pl-4 speaker-list">
              <div>{facilitators}</div>
              {!isSpecialSegment && (
                <Button
                  variant="outline"
                  className="d-none event-read-more"
                  style={{
                    padding: "0.7rem 0.7rem",
                  }}
                >
                  Read more
                </Button>
              )}
            </Col>
          </Row>
        </a>
      </div>
    );
    // }
  });

  return <>{currSegment}</>;
};

const Programme = () => {
  const [modal, setModal] = useState(false);
  const [workshopId, setWorkshopId] = useState(0);
  const [segmentName, setSegmentName] = useState("pre_event_1");

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    $("#pre_event_1-button").on("click", function () {
      let scrollAmount = $("#pre_event_1").offset().top - 170;
      $([document.documentElement, document.body]).animate(
        { scrollTop: scrollAmount },
        400
      );
    });

    $("#pre_event_2-button").on("click", function () {
      let scrollAmount = $("#pre_event_2").offset().top - 170;
      $([document.documentElement, document.body]).animate(
        { scrollTop: scrollAmount },
        400
      );
    });

    // $("#pre_event_3-button").on("click", function () {
    //   let scrollAmount = $("#pre_event_3").offset().top - 170;
    //   $([document.documentElement, document.body]).animate(
    //     { scrollTop: scrollAmount },
    //     400
    //   );
    // });

    $("#day_1-button").on("click", function () {
      let scrollAmount = $("#day_1").offset().top - 170;
      $([document.documentElement, document.body]).animate(
        { scrollTop: scrollAmount },
        400
      );
    });

    $("#day_2-button").on("click", function () {
      let scrollAmount = $("#day_2").offset().top - 170;
      $([document.documentElement, document.body]).animate(
        { scrollTop: scrollAmount },
        400
      );
    });
  }, []);

  return (
    <section id="top">
      <WorkshopModal
        segmentName={segmentName}
        modal={modal}
        toggle={toggle}
        workshopId={workshopId}
      />
      <div className="wrapper">
        <Row>
          <Col md={2} className="programme-nav margin-bottom-32">
            <div
              style={{
                position: "sticky",
                top: "100px",
              }}
            >
              <Button
                variant="outline"
                className="w-100 margin-bottom-12 d-block"
                innerClassName="font-size-8 w-100"
                id="pre_event_1-button"
              >
                Pre-Event 1
              </Button>
              <Button
                variant="outline"
                className="w-100 margin-bottom-12"
                innerClassName="w-100"
                id="pre_event_2-button"
              >
                Pre-Event 2
              </Button>
              <Button
                variant="outline"
                className="w-100 margin-bottom-12"
                innerClassName="w-100"
                id="day_1-button"
              >
                Day 1
              </Button>
              <Button
                variant="outline"
                className="w-100 margin-bottom-12"
                innerClassName="w-100"
                id="day_2-button"
              >
                Day 2
              </Button>
            </div>
          </Col>
          <Col md={10} className="p-0 pl-3">
            <div
              className="border p-4 bg-white shadow-sm margin-bottom-48"
              style={{
                borderRadius: "1rem",
              }}
              id="pre_event_1"
              data-aos="fade"
              data-aos-offset={100}
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
                    className="gray font-size-16 segment-date"
                    style={{
                      verticalAlign: "middle",
                    }}
                  >
                    (October 24, Saturday)
                  </small>
                </h3>
              </div>
              <DaySegment
                segment="pre_event_1"
                workshopId={workshopId}
                segmentName={segmentName}
                toggle={toggle}
                setSegmentName={setSegmentName}
                setWorkshopId={setWorkshopId}
              />
            </div>
            <div
              className="border p-4 bg-white shadow-sm margin-bottom-48"
              id="pre_event_2"
              style={{
                borderRadius: "1rem",
              }}
              data-aos="fade"
              data-aos-offset={150}
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
                    className="gray font-size-16 segment-date"
                    style={{
                      verticalAlign: "middle",
                    }}
                  >
                    (November 7, Saturday)
                  </small>
                </h3>
              </div>
              <DaySegment
                segment="pre_event_2"
                workshopId={workshopId}
                segmentName={segmentName}
                toggle={toggle}
                setSegmentName={setSegmentName}
                setWorkshopId={setWorkshopId}
              />
            </div>
            <div
              className="border p-4 bg-white shadow-sm margin-bottom-48"
              style={{
                borderRadius: "1rem",
              }}
              id="day_1"
              data-aos="fade"
              data-aos-offset={150}
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
                    className="gray font-size-16 segment-date"
                    style={{
                      verticalAlign: "middle",
                    }}
                  >
                    (November 14, Saturday)
                  </small>
                </h3>
              </div>
              <DaySegment
                segment="day_1"
                workshopId={workshopId}
                segmentName={segmentName}
                toggle={toggle}
                setSegmentName={setSegmentName}
                setWorkshopId={setWorkshopId}
              />
            </div>
            <div
              className="border p-4 bg-white shadow-sm margin-bottom-48"
              style={{
                borderRadius: "1rem",
              }}
              id="day_2"
              data-aos="fade"
              data-aos-offset={150}
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
                  <span className="red">Day 2</span>{" "}
                  <small
                    className="gray font-size-16 segment-date"
                    style={{
                      verticalAlign: "middle",
                    }}
                  >
                    (November 15, Sunday)
                  </small>
                </h3>
              </div>
              <DaySegment
                segment="day_2"
                workshopId={workshopId}
                segmentName={segmentName}
                toggle={toggle}
                setSegmentName={setSegmentName}
                setWorkshopId={setWorkshopId}
              />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Programme;
