import React from "react";
import { Container, Modal, ModalHeader, Row } from "reactstrap";
import sponsors from "../../data/sponsors.json";

const SponsorModal = (props) => {
  if (props.val === -1) {
    return <div></div>;
  } else {
    const sponsorKey = sponsors.filter(
      (sponsor) => sponsor.id === props.val
    )[0];

    const par = sponsorKey.description.map((item, index) => {
      return <p key={index}>{item}</p>;
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
        <ModalHeader
          className="overwrite-modal"
          close={closeBtn}
          c
        ></ModalHeader>
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
              className="margin-bottom-32"
              src={sponsorKey.image_url}
              alt={sponsorKey.name}
            />
            <h3 className="gray">{sponsorKey.name}</h3>
            {par}
          </Row>
        </Container>
      </Modal>
    );
  }
};

export default SponsorModal;
