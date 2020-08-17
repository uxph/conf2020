import React from "react";
import sponsors from "../../data/sponsors.json";
import { Container } from "reactstrap";

const gold = sponsors.filter((sponsor) => sponsor.tier === "gold");
const silver = sponsors.filter((sponsor) => sponsor.tier === "silver");
const bronze = sponsors.filter((sponsor) => sponsor.tier === "bronze");

const ListSponsors = ({ list, className, contentClassName, heading }) => {
  const listTier = list.map((item, index) => {
    return (
      <div className="sponsor-item margin-bottom-32" key={index}>
        <div className="img-container">
          <img src={item.image_url} alt={item.name} />
        </div>
      </div>
    );
  });

  return (
    <div className={className}>
      <Container>
        <h3 className="margin-bottom-32 text-center">{heading}</h3>
        <div className={contentClassName}>{listTier}</div>
      </Container>
    </div>
  );
};

const Sponsors = () => {
  return (
    <section className="sponsor-section">
      <ListSponsors
        list={gold}
        className={"padding-y-128"}
        contentClassName={"sponsor"}
        heading={"Gold Sponsors"}
      />

      <ListSponsors
        list={silver}
        className={"silver-sponsor padding-y-256"}
        contentClassName={"sponsor"}
        heading={"Silver Sponsors"}
        style={{
          backgroundColor: "#F6F6F6",
        }}
      />

      <ListSponsors
        list={bronze}
        className={"padding-y-128"}
        contentClassName={"sponsor"}
        heading={"Bronze Sponsors"}
      />
    </section>
  );
};

export default Sponsors;
