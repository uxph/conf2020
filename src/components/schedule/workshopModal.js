import React from "react";
import _ from "lodash";
import pluralize from "pluralize";
import schedule from "../../data/schedule.json";
import speakers from "../../data/speakers.json";
import moderators from "../../data/moderators.json";
import { Container, Modal, ModalHeader, Row, Col } from "reactstrap";

const WorkshopModal = ({ workshopId, segmentName, toggle, modal }) => {
  const currentWorkshop = _.find(
    schedule[segmentName],
    (sched) => sched.id === workshopId
  );

  const dates = {
    pre_event_1: "Oct. 24",
    pre_event_2: "Oct. 31",
    pre_event_3: "Nov. 7",
    day_1: "Nov. 14",
    day_2: "Nov. 15",
  };

  const name = `${segmentName.replace(/_/g, " ")} (${dates[segmentName]})`;

  const abstract = currentWorkshop.description.map((item, index) => {
    return (
      <p
        className="font-size-16 margin-bottom-16"
        style={{ lineHeight: "30px" }}
        key={index}
      >
        {item}
      </p>
    );
  });

  const facilitators = currentWorkshop.speaker_id.map((speaker_id, index) => {
    const currFacilitator = _.find(
      speakers,
      (speaker) => speaker.id === speaker_id
    );

    return (
      <div>
        {currentWorkshop.speaker_id.length === 1 && (
          <div className="margin-bottom-48">
            <h3 className="font-size-24 margin-bottom-24">Speaker Bio</h3>
            {currFacilitator.bio.map((p, p_index) => (
              <p
                className="font-size-16 margin-bottom-16"
                style={{ lineHeight: "30px" }}
                key={p_index}
              >
                {p}
              </p>
            ))}
          </div>
        )}
        <div key={index} className="d-flex margin-bottom-32">
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
      </div>
    );
  });

  const mods = currentWorkshop.moderators
    ? moderators[currentWorkshop.moderators].map((currModerator, index) => {
        return (
          <div>
            <div key={index} className="d-flex margin-bottom-32">
              <div className="margin-right-16">
                <img
                  src={currModerator.image_url}
                  style={{
                    width: "72px",
                    height: "72px",
                    objectFit: "cover",
                    borderRadius: "100%",
                  }}
                  alt={currModerator.name}
                />
              </div>
              <div>
                <h5 className="mb-0 font-size-16">{currModerator.name}</h5>
                <p className="red mb-0">
                  {currModerator.position !== ""
                    ? `${currModerator.position} at ${currModerator.company}`
                    : null}
                </p>
                <div className="margin-bottom-16 margin-top-8">
                  <img
                    src={currModerator.company_logo}
                    alt={currModerator.company}
                    style={{
                      width: `${
                        currModerator.company_logo_type === "square"
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
          </div>
        );
      })
    : null;

  const closeBtn = (
    <button
      className="close overwrite-btn-2 pos-fixed"
      style={{
        backgroundColor: "transparent",
        top: "32px",
        right: "40px",
      }}
      onClick={toggle}
    >
      &times;
    </button>
  );
  return (
    <Modal
      contentClassName="speaker-modal padding-bottom-64 custom-scrollbar"
      isOpen={modal}
      toggle={toggle}
      zIndex={9999}
    >
      <ModalHeader
        className="overwrite-modal"
        style={{
          fontSize: "48px !important",
        }}
        close={closeBtn}
      >
        <img
          src="/images/section-transition.svg"
          className="w-100"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
          }}
          alt="modal aesthetic"
        />
      </ModalHeader>
      <Container className="margin-top-128 modal-speaker">
        <div className="padding-x-64 speaker-body">
          <Row className="margin-bottom-32">
            <Col md={9} sm={12}>
              {" "}
              <h3 className="workshop-type gray margin-bottom-16">
                {currentWorkshop.type}
              </h3>
              <h3 className="workshop-title red">{currentWorkshop.title}</h3>
              <h5
                className="margin-bottom-48 gray"
                style={{
                  textTransform: "capitalize",
                  fontSize: "1rem",
                }}
              >{`${name} - ${currentWorkshop.time}`}</h5>
              <h3 className="font-size-24 margin-bottom-24">Topic Overview</h3>
              {abstract}
              <br />
              <br />
              {facilitators.length > 0 && (
                <div>
                  {facilitators.length > 1 && (
                    <h3 className="font-size-24 margin-bottom-24">
                      {pluralize("Speaker", facilitators.length)}
                    </h3>
                  )}
                  <Row>
                    <Col md={11} sm={12}>
                      {facilitators}
                    </Col>
                  </Row>
                </div>
              )}
              {/* uncomment this when ilalagay na yung facilitators */}
              {currentWorkshop.moderators &&
                moderators[currentWorkshop.moderators].length > 0 && (
                  <div className="margin-top-32">
                    <h3 className="font-size-24 margin-bottom-24">
                      {pluralize("Facilitator", facilitators.length)}
                    </h3>
                    <Row>
                      <Col md={11} sm={12}>
                        {mods}
                      </Col>
                    </Row>
                  </div>
                )}
            </Col>
          </Row>
        </div>
      </Container>
      <div className="workshop-modal"></div>
    </Modal>
  );
};

export default WorkshopModal;
