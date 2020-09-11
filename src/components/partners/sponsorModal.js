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
          <Row className="margin-bottom-64">
            <p>{sponsorKey.name}</p>
          </Row>
        </Container>
      </Modal>
    );
  }
};

export default SponsorModal;
