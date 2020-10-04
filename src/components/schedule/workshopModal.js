import React from "react";
import speakers from "../../data/speakers.json";
import schedule from "../../data/schedule.json";
import { Container, Modal, ModalHeader, Row, Col } from "reactstrap";

const WorkshopModal = (props) => {
  const currentWorkshop = schedule[props.schedDay][props.val2];

  if (props.val === -1) {
    return <div></div>;
  } else {
    const speakerKey = speakers.filter(
      (speaker) => speaker.id === props.val
    )[0];
    const socmeds = speakerKey.social_media.map((item, index) => {
      return (
        <a href={item.url} className="gray" target="blank" key={index}>
          <i className={item.icon}></i>
        </a>
      );
    });
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
    const bio = speakerKey.bio.map((item, index) => {
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
    const closeBtn = (
      <button
        className="close overwrite-btn"
        style={{
          backgroundColor: "transparent",
        }}
        onClick={props.toggle}
      >
        &times;
      </button>
    );
    return (
      <Modal
        contentClassName="speaker-modal padding-bottom-64"
        isOpen={props.modal}
        toggle={props.toggle}
      >
        <ModalHeader
          className="overwrite-modal"
          style={{
            fontSize: "48px !important",
          }}
          close={closeBtn}
        ></ModalHeader>
        <Container className="padding-top-128 padding-x-64">
          <Row className="margin-bottom-32">
            <Col md={8} xs={12}>
              {" "}
              <h3 className="font-size-24 gray margin-bottom-16">
                {currentWorkshop.type}
              </h3>
              <h2 className="workshop-title margin-bottom-24">
                {currentWorkshop.title}
              </h2>
              <p className="font-size-24">by {speakerKey.name}</p>
            </Col>
            <Col md={{ size: 3, offset: 1 }} xs={12}>
              <div className="modal-avatar">
                <img
                  src={speakerKey && speakerKey.image_url}
                  alt={speakerKey.name}
                  style={{
                    width: "192px",
                    height: "192px",
                    objectFit: "cover",
                    borderRadius: "100%",
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className="modal-container custom-scrollbar">
            <Col md={8} xs={12}>
              <h3 className="font-size-24 margin-bottom-24">Talk Abstract</h3>
              {abstract}
              <h3 className="font-size-24  margin-top-32 margin-bottom-24">
                Speaker Bio
              </h3>
              {bio}
              <div className="socmedList-speaker">{socmeds}</div>
            </Col>
          </Row>
        </Container>
        <div className="workshop-modal"></div>
      </Modal>
    );
  }
};

export default WorkshopModal;
