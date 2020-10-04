import React from "react";
import { Container } from "reactstrap";
import sponsors from "../../data/sponsors.json";
import Button from "../../components/atoms/button";

const premium_sponsors = sponsors["Premium Sponsors"].map((sponsor) => {
  return (
    <div key={sponsor.id} className="mx-3">
      <img
        src={sponsor["image_url"]}
        alt={sponsor.name}
        style={{
          width: "180px",
          height: "180px",
          objectFit: "contain",
        }}
      />
    </div>
  );
});

const general_sponsors = sponsors["General Sponsors"].map((sponsor) => {
  return (
    <div key={sponsor.id} className="mx-3">
      <img
        src={sponsor["image_url"]}
        alt={sponsor.name}
        style={{
          width: "150px",
          height: "150px",
          objectFit: "contain",
        }}
      />
    </div>
  );
});

const community_partners = sponsors["Community Partners"].map((sponsor) => {
  return (
    <div key={sponsor.id} className="mx-3">
      <img
        src={sponsor["image_url"]}
        alt={sponsor.name}
        style={{
          width: "96px",
          height: "96px",
          objectFit: "contain",
        }}
      />
    </div>
  );
});

const Partners = () => {
  return (
    <section
      className="padding-y-64 partners-section"
      data-aos="fade-up"
      data-aos-offset={200}
    >
      <Container>
        <h2 className="text-center text-uppercase margin-bottom-64 font-size-32">
          Proudly supported by
        </h2>
        <div className="partners-list mb-5">{premium_sponsors}</div>
        <div className="partners-list mb-5">{general_sponsors}</div>
        <div className="partners-list mb-5">{community_partners}</div>
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
