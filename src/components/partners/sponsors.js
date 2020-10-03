import React, { useState } from "react";
import sponsors from "../../data/sponsors.json";
import { Container } from "reactstrap";
import SponsorModal from "./sponsorModal";
import "font-awesome/css/font-awesome.min.css";

//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const gold = sponsors.filter((sponsor) => sponsor.tier === "gold");
const silver = sponsors.filter((sponsor) => sponsor.tier === "silver");
const bronze = sponsors.filter((sponsor) => sponsor.tier === "bronze");

const ListSponsors = ({
  list,
  className,
  contentClassName,
  heading,
  setModal,
  setSponsorVal,
  modal,
}) => {
  const listTier = list.map((item, index) => {
    return (
      <div className="sponsor-item margin-bottom-32" key={index}>
        <a
          href="/"
          onClick={(e) => {
            setSponsorVal(item.id);
            setModal(!modal);
            e.preventDefault();
          }}
        >
          <div className="img-container">
            <img src={item.image_url} alt={item.name} />
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

  return (
    <section className="sponsor-section">
      <ListSponsors
        list={gold}
        className={"padding-y-64"}
        contentClassName={"sponsor"}
        heading={"Premium Sponsors"}
        setModal={setModal}
        modal={modal}
        setSponsorVal={setSponsorVal}
      />

      <ListSponsors
        list={silver}
        className={"silver-sponsor padding-y-192"}
        contentClassName={"sponsor"}
        heading={"General Sponsors"}
        style={{
          backgroundColor: "#F6F6F6",
        }}
        setModal={setModal}
        modal={modal}
        setSponsorVal={setSponsorVal}
      />

      <ListSponsors
        list={bronze}
        className={"padding-y-64"}
        contentClassName={"sponsor"}
        heading={"Media & Community Sponsors"}
        setModal={setModal}
        modal={modal}
        setSponsorVal={setSponsorVal}
      />
      <SponsorModal val={sponsorVal} modal={modal} toggle={toggle} />
    </section>
  );
};

export default Sponsors;
