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
      return (
        <p className="margin-x-48" key={index}>
          {item}
        </p>
      );
    });

    const socmeds = sponsorKey.social_media.map((item, index) => {
      if (item.includes("facebook"))
        return (
          <a href={item} className="gray" target="blank">
            <i class="fa fa-facebook-square" aria-hidden="true"></i>
          </a>
        );
      else if (item.includes("twitter"))
        return (
          <a href={item} className="gray" target="blank">
            <i class="fa fa-twitter-square" aria-hidden="true"></i>
          </a>
        );
      else if (item.includes("linkedin"))
        return (
          <a href={item} className="gray" target="blank">
            <i className="fa fa-linkedin"></i>
          </a>
        );
      else if (item.includes("github"))
        return (
          <a href={item} className="gray" target="blank">
            <i className="fa fa-github-square"></i>
          </a>
        );
      else return <></>;
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
            <a
              href={sponsorKey.website_url}
              style={{
                textDecoration: "none",
              }}
              target="blank"
            >
              <h3 className="gray">{sponsorKey.name}</h3>
            </a>
            <div className="modal-body custom-scrollbar">
              {par}
              <div className="socmedList">{socmeds}</div>
            </div>
          </Row>
        </Container>
      </Modal>
    );
  }
};

export default SponsorModal;
