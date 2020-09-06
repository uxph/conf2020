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
      <button className="close" onClick={props.toggle}>
        &times;
      </button>
    );
    return (
      <Modal
        contentClassName="speaker-modal padding-y-256 padding-x-64"
        isOpen={props.modal}
        toggle={props.toggle}
        fade={false}
      >
        <ModalHeader className="overwrite-modal" close={closeBtn}></ModalHeader>
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
