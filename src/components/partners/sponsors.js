import React, { useState } from "react";
import sponsors from "../../data/sponsors.json";
import { Container, Row, Col } from "reactstrap";
import SponsorModal from "./sponsorModal";
import "font-awesome/css/font-awesome.min.css";

//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const premium = sponsors["Premium Sponsors"];
const general = sponsors["General Sponsors"];
const community = sponsors["Community Partners"];

const ListSponsors = ({
  list,
  tier,
  className,
  contentClassName,
  heading,
  setModal,
  setSponsorVal,
  setSponsorTier,
  modal,
}) => {
  const listTier = list.map((item, index) => {
    return (
      <Col md={4} xs={6} className="margin-bottom-32" key={index}>
        <a
          href="/"
          onClick={(e) => {
            setSponsorVal(item.id);
            setSponsorTier(tier);
            setModal(!modal);
            e.preventDefault();
          }}
        >
          <div className="img-container text-center">
            <img
              src={item.image_url}
              alt={item.name}
              className={`${contentClassName} sponsor-page-img`}
            />
          </div>
        </a>
      </Col>
    );
  });

  return (
    <div
      className={className}
      data-aos="fade-up"
      data-aos-once={true}
      data-aos-offset={200}
    >
      <Container>
        <h3 className="margin-bottom-32 font-size-32 text-center">{heading}</h3>
        <Row className="justify-content-center">{listTier}</Row>
      </Container>
    </div>
  );
};

const Sponsors = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const [sponsorVal, setSponsorVal] = useState(-1);
  const [sponsorTier, setSponsorTier] = useState(null);

  return (
    <section className="sponsor-section">
      <ListSponsors
        list={premium}
        tier={"Premium Sponsors"}
        className={"padding-y-64"}
        contentClassName={"gen-sponsor"}
        heading={"Premium Sponsors"}
        setModal={setModal}
        modal={modal}
        setSponsorVal={setSponsorVal}
        setSponsorTier={setSponsorTier}
        style={{
          margin: "0 auto",
        }}
      />

      <ListSponsors
        list={general}
        tier={"General Sponsors"}
        className={"silver-sponsor padding-y-192"}
        contentClassName={"gen-sponsor"}
        heading={"Major Sponsors"}
        style={{
          backgroundColor: "#F6F6F6",
          margin: "0 auto",
        }}
        setModal={setModal}
        modal={modal}
        setSponsorVal={setSponsorVal}
        setSponsorTier={setSponsorTier}
      />

      <ListSponsors
        list={community}
        tier={"Community Partners"}
        className={"padding-y-64"}
        contentClassName={"comm-sponsor"}
        heading={"Media & Community Sponsors"}
        setModal={setModal}
        modal={modal}
        setSponsorVal={setSponsorVal}
        setSponsorTier={setSponsorTier}
        style={{
          margin: "0 auto",
        }}
      />
      <SponsorModal
        val={sponsorVal}
        tier={sponsorTier}
        modal={modal}
        toggle={toggle}
      />
    </section>
  );
};

export default Sponsors;
