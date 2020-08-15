import React from "react";
import { Container } from "reactstrap";
import sponsors from "../../data/sponsors.json";

const items = sponsors.map((sponsor, index) => {
  return (
    <div className="partners-list__item" key={index}>
      <img src={sponsor["image_url"]} alt={sponsor.name} />
    </div>
  );
});

const Partners = () => {
  return (
    <section className="padding-y-64 partners-section">
      <Container>
        <h2 className="text-center margin-bottom-64 font-size-24">
          OUR PARTNERS AND SPONSORS
        </h2>
        <div className="partners-list">{items}</div>
      </Container>
    </section>
  );
};

export default Partners;
