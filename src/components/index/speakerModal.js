import React from "react";
import speakers from "../../data/speakers.json";
import { Container, Modal, ModalHeader, Row, Col } from "reactstrap";

const SpeakerModal = (props) => {
  if (props.val === -1) {
    return <div></div>;
  } else {
    const speakerKey = speakers.filter(
      (speaker) => speaker.id === props.val
    )[0];
    const socmeds = speakerKey.social_media.map((item, index) => {
      return (
        <a href={item.url} className="gray" target="blank" key={index}>
          <i class={item.icon} aria-hidden="true"></i>
        </a>
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
        className="close overwrite-btn-2 pos-fixed"
        onClick={props.toggle}
        style={{
          top: "32px",
          right: "40px",
        }}
      >
        &times;
      </button>
    );
    return (
      <Modal
        contentClassName="speaker-modal padding-top-96 padding-bottom-64 padding-x-64 custom-scrollbar"
        isOpen={props.modal}
        toggle={props.toggle}
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
        <Container>
          <Row className="speaker-content">
            <Col md={8} xs={12}>
              <h2 className="speaker-name">{speakerKey.name}</h2>
              <p className="font-size-24 speaker-position">
                {speakerKey.position} at {speakerKey.company}
              </p>
              <h3 className="font-size-24 margin-top-64 margin-bottom-24">
                Speaker Bio
              </h3>
              {bio}
              <div className="socmedList-speaker">{socmeds}</div>
            </Col>
            <Col md={{ size: 3, offset: 1 }} xs={12}>
              <div className="modal-avatar">
                <img
                  src={speakerKey && speakerKey.image_url}
                  alt={speakerKey.name}
                  style={{
                    width: "192px",
                    height: "192px",
                    borderRadius: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  }
};

export default SpeakerModal;
