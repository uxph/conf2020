import React from "react";
import { Row, Col } from "reactstrap";
import sponsors from "../../data/sponsors.json";
import Button from "../../components/atoms/button";

const all_sponsors = sponsors["Premium Sponsors"]
  .concat(sponsors["Major Sponsors"])
  .concat(sponsors["Community Partners"])
  .filter((sponsor) => sponsor.featured)
  .map((sponsor, index) => {
    return (
      <Col
        md={3}
        sm={6}
        xs={6}
        key={index}
        className="community-partner sponsor-img"
      >
        <center>
          <img
            src={sponsor["image_url"]}
            alt={sponsor.name}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
          />
        </center>
      </Col>
    );
  });

const Partners = () => {
  return (
    <section
      className="padding-y-64 partners-section"
      data-aos="fade-up"
      data-aos-offset={200}
      data-aos-once={true}
    >
      <div className="wrapper">
        <h2 className="text-center text-uppercase margin-bottom-64 font-size-32">
          Proudly supported by
        </h2>
        <Row className="partners-list mb-5">{all_sponsors}</Row>
        <div className="btn-container">
          <Button href="/sponsors" className="mx-auto">
            View all sponsors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Partners;
