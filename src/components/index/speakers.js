import React from "react";
import { Container } from "reactstrap";
import speakers from "../../data/speakers.json";
// import SpeakerModal from "./speakerModal";
import Button from "../atoms/button";

const Speakers = () => {
  // const [modal, setModal] = useState(false);
  // const toggle = () => setModal(!modal);
  // const [speakerVal, setSpeakerVal] = useState(-1);

  const list_speakers = speakers.map((speaker) => {
    return (
      <div
        key={speaker.id}
        style={{
          cursor: "pointer",
        }}
        className="margin-y-16 speakers-thumbnail"
      >
        <div className="speakers-avatar text-center margin-bottom-24">
          <img src={speaker.image_url} alt={speaker.name} />
        </div>
        <h3
          className="text-center"
          style={{
            fontSize: "0.83rem",
            margin: "0",
          }}
        >
          {speaker.name}
        </h3>
        <p className="text-center font-size-16">
          {speaker.position} at <span>{speaker.company}</span>
        </p>
        <div className="text-center padding-bottom-32">
          <img src={speaker.company_logo} alt={speaker.company} />
        </div>
      </div>
    );
  });

  return (
    <section className="speakers-section padding-y-64">
      <Container>
        <h2 className="text-center margin-bottom-64 font-size-24">
          OUR SPEAKERS
        </h2>
        <div className="margin-bottom-32 speakers-list">{list_speakers}</div>
        <div className="btn-container">
          <Button className="mx-auto" href="/program">
            See Full Program
          </Button>
        </div>
        {/* <SpeakerModal val={speakerVal} modal={modal} toggle={toggle} /> */}
      </Container>
    </section>
  );
};

export default Speakers;
