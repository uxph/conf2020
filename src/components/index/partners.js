import React from "react";
import { Container } from "reactstrap";
import sponsors from "../../data/sponsors.json";
import Button from "../../components/atoms/button";

const items = sponsors.map((sponsor) => {
  return (
    <div className="partners-list__item" key={sponsor.id}>
      <img src={sponsor["image_url"]} alt={sponsor.name} />
    </div>
  );
});

const Partners = () => {
  return (
    <section
      className="padding-y-64 partners-section"
      data-aos="fade-up"
      data-aos-offset={500}
    >
      <Container>
        <h2 className="text-center margin-bottom-64 font-size-32">
          OUR PARTNERS AND SPONSORS
        </h2>
        <div className="partners-list">{items}</div>
        <div className="btn-container">
          <Button href="/sponsors" className="mx-auto">
            View all sponsors
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Partners;
