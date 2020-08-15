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
            <Col md={8} xs={12}>
              {" "}
              <h3 className="font-size-24 gray margin-bottom-16">Workshop</h3>
              <h2 className="workshop-title margin-bottom-24">
                Combating Memory Limitations through Simultaneous Triangulation
              </h2>
              <p className="font-size-24">by {speakerKey.name}</p>
            </Col>
            <Col md={{ size: 3, offset: 1 }} xs={12}>
              <div className="modal-avatar">
                <img
                  src={speakerKey && speakerKey.image_url}
                  alt={speakerKey.name}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={8} xs={12}>
              <h3 className="font-size-24 margin-bottom-24">Talk Abstract</h3>
              <p
                className="font-size-16 margin-bottom-16"
                style={{ lineHeight: "30px" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
                molestie eget rhoncus est, non turpis morbi morbi eu. Nunc,
                gravida convallis mattis id ullamcorper. Sem sem fringilla diam
                nibh. Quis risus nulla orci, pharetra, eu, massa malesuada duis.
              </p>
              <p
                className="font-size-16 margin-bottom-16"
                style={{ lineHeight: "30px" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
                molestie eget rhoncus est, non turpis morbi morbi eu. Nunc,
                gravida convallis mattis id ullamcorper. Sem sem fringilla diam
                nibh. Quis risus nulla orci, pharetra, eu, massa malesuada duis.
              </p>
              <h3 className="font-size-24  margin-top-32 margin-bottom-24">
                Speaker Bio
              </h3>
              <p
                className="font-size-16 margin-bottom-16"
                style={{ lineHeight: "30px" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
                molestie eget rhoncus est, non turpis morbi morbi eu. Nunc,
                gravida convallis mattis id ullamcorper. Sem sem fringilla diam
                nibh. Quis risus nulla orci, pharetra, eu, massa malesuada duis.
              </p>
              <div className="social-icons">
                <i class="fa fa-facebook-square margin-right-8">x</i>
                <i class="fa fa-linkedin-square margin-right-8">y</i>
                <i class="fa fa-twitter-square margin-right-8">z</i>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  }
};

export default SpeakerModal;
