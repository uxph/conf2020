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
      if (item.includes("facebook"))
        return (
          <a href={item} className="gray" target="blank" key={index}>
            <i class="fa fa-facebook-square" aria-hidden="true"></i>
          </a>
        );
      else if (item.includes("twitter"))
        return (
          <a href={item} className="gray" target="blank" key={index}>
            <i class="fa fa-twitter-square" aria-hidden="true"></i>
          </a>
        );
      else if (item.includes("linkedin"))
        return (
          <a href={item} className="gray" target="blank" key={index}>
            <i className="fa fa-linkedin"></i>
          </a>
        );
      else if (item.includes("github"))
        return (
          <a href={item} className="gray" target="blank" key={index}>
            <i className="fa fa-github-square"></i>
          </a>
        );
      else return <></>;
    });

    const closeBtn = (
      <button
        className="close overwrite-btn-2 pos-fixed"
        onClick={props.toggle}
      >
        &times;
      </button>
    );
    return (
      <Modal
        contentClassName="speaker-modal padding-top-256 padding-bottom-64 padding-x-64  custom-scrollbar"
        isOpen={props.modal}
        toggle={props.toggle}
        external={closeBtn}
      >
        <ModalHeader
          className="overwrite-modal"
          style={{
            fontSize: "48px !important",
          }}
        ></ModalHeader>
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
              <div className="socmedList-speaker">{socmeds} </div>
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  }
};

export default SpeakerModal;
