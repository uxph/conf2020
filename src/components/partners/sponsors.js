import React, { useState } from "react";
import sponsors from "../../data/sponsors.json";
import { Container } from "reactstrap";
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
      <div className="sponsor-item margin-bottom-32" key={index}>
        <a
          href="/"
          onClick={(e) => {
            setSponsorVal(item.id);
            setSponsorTier(tier);
            setModal(!modal);
            e.preventDefault();
          }}
        >
          <div className="img-container">
            <img
              src={item.image_url}
              alt={item.name}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
              }}
            />
          </div>
        </a>
      </div>
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
        <div className={contentClassName}>{listTier}</div>
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
        contentClassName={"sponsor"}
        heading={"Premium Sponsors"}
        setModal={setModal}
        modal={modal}
        setSponsorVal={setSponsorVal}
        setSponsorTier={setSponsorTier}
      />

      <ListSponsors
        list={general}
        tier={"General Sponsors"}
        className={"silver-sponsor padding-y-192"}
        contentClassName={"sponsor"}
        heading={"General Sponsors"}
        style={{
          backgroundColor: "#F6F6F6",
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
        contentClassName={"sponsor"}
        heading={"Media & Community Sponsors"}
        setModal={setModal}
        modal={modal}
        setSponsorVal={setSponsorVal}
        setSponsorTier={setSponsorTier}
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
