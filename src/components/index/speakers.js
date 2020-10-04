import React from "react";
import { Container } from "reactstrap";
import speakers from "../../data/speakers.json";
//import SpeakerModal from "./speakerModal";
import Button from "../atoms/button";

const Speakers = () => {
  // const [modal, setModal] = useState(false);
  // const toggle = () => setModal(!modal);
  // const [speakerVal, setSpeakerVal] = useState(-1);

  const list_speakers = speakers.map((speaker) => {
    if (!speaker.disabled) {
      return (
        <div
          key={speaker.id}
          style={{
            cursor: "pointer",
          }}
          className="margin-y-16 speakers-thumbnail rounded-circle"
        >
          <div className="speakers-avatar text-center margin-bottom-24">
            <img
              src={speaker.image_url}
              alt={speaker.name}
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <h3
            className="text-center text-uppercase"
            style={{
              fontSize: "1rem",
              margin: "0",
            }}
          >
            {speaker.name}
          </h3>
          <p
            className="text-center font-size-16"
            style={{
              fontSize: "0.875rem",
            }}
          >
            {speaker.position} <br />
            {/* <span>{speaker.company}</span> */}
          </p>
          <div className="text-center padding-bottom-32">
            <img
              src={speaker.company_logo}
              alt={speaker.company}
              style={{
                width: "96px",
              }}
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  });

  return (
    <section
      className="speakers-section padding-y-64"
      data-aos="fade-up"
      data-aos-once={true}
      data-aos-offset={500}
    >
      <Container>
        <h2 className="text-center margin-bottom-64 font-size-32">
          OUR SPEAKERS
        </h2>
        <div className="margin-bottom-32 speakers-list">{list_speakers}</div>
        <div className="btn-container">
          <Button className="mx-auto" href="/schedule">
            See Full Program
          </Button>
        </div>
        {/* <SpeakerModal val={speakerVal} modal={modal} toggle={toggle} /> */}
      </Container>
    </section>
  );
};

export default Speakers;
