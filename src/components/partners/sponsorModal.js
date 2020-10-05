import React from "react";
import { Container, Modal, ModalHeader, ModalBody, Row } from "reactstrap";
import sponsors from "../../data/sponsors.json";

const SponsorModal = (props) => {
  if (props.val === -1) {
    return <div></div>;
  } else {
    const sponsorKey = sponsors[props.tier].filter(
      (sponsor) => sponsor.id === props.val
    )[0];

    const par = sponsorKey.description.map((item, index) => {
      return (
        <p className="margin-x-96 gray sponsor-description" key={index}>
          {item}
        </p>
      );
    });

    const socmeds = sponsorKey.social_media.map((item, index) => {
      return (
        <a href={item.url} className="gray" target="blank" key={index}>
          <i className={item.icon}></i>
        </a>
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
        contentClassName="sponsor-modal"
        isOpen={props.modal}
        toggle={props.toggle}
        zIndex={9999}
      >
        <ModalHeader className="overwrite-modal" close={closeBtn}></ModalHeader>
        <ModalBody
          className="custom-scrollbar"
          style={{
            overflowY: "scroll",
          }}
        >
          <Container>
            <Row
              className="margin-y-96 margin-y-64 text-center"
              style={{
                position: "relative",
                textAlign: "center",
                display: "block",
              }}
            >
              <img
                className="margin-bottom-64"
                src={sponsorKey.image_url}
                alt={sponsorKey.name}
                style={{
                  width: "192px",
                  objectFit: "contain",
                }}
              />
              <h3 className="gray">{sponsorKey.name}</h3>
              <p className="red">
                {props.tier.substring(0, props.tier.length - 1)}
              </p>
              <div className="modal-body">
                {par}
                <div className="socmedList">{socmeds}</div>
              </div>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    );
  }
};

export default SponsorModal;
