import React from "react";
import speakers from "../../data/speakers.json";
import { Chip } from "@material-ui/core";
import _ from "lodash";
import Button from "../atoms/button";

const Parallel = ({ event }) => {
  const currWorkshops = event.workshop.map((item, index) => {
    return (
      <Chip
        key={index}
        label={item}
        variant="outlined"
        className="margin-bottom-8 red ml-2"
        style={{
          borderColor: "#e8006f",
          fontFamily: "Karla",
        }}
      />
    );
  });

  const facilitators = event.speaker_id.map((speaker_id, index) => {
    const currFacilitator = _.find(
      speakers,
      (speaker) => speaker.id === speaker_id
    );

    return (
      <div key={index} className="d-flex margin-bottom-32 speaker-container">
        <div className="margin-right-16 speaker-photo">
          <img
            src={currFacilitator.image_url}
            style={{
              width: "72px",
              height: "72px",
              objectFit: "cover",
              borderRadius: "100%",
            }}
            alt={currFacilitator.name}
          />
        </div>
        <div>
          <h5 className="mb-0 font-size-16">{currFacilitator.name}</h5>
          <p className="red mb-0">
            {currFacilitator.position !== ""
              ? `${currFacilitator.position} at ${currFacilitator.company}`
              : null}
          </p>
          <div className="margin-bottom-16 margin-top-8">
            <img
              src={currFacilitator.company_logo}
              alt={currFacilitator.company}
              style={{
                width: `${
                  currFacilitator.company_logo_type === "square"
                    ? "64px"
                    : "96px"
                }`,
                filter: "grayscale(100%)",
              }}
              className="company-img"
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <h5
        className={`margin-bottom-12`}
        style={{
          lineHeight: "1.5rem",
          fontSize: "1rem",
        }}
      >
        {event.title}
      </h5>
      <div className="mb-1">
        <Chip
          variant="outlined"
          label={event.type}
          className="margin-bottom-8"
          style={{
            borderColor: "#e8006f",
            color: "#e8006f",
            fontFamily: "Karla",
            fontSize: "0.7rem",
          }}
        />
        {currWorkshops}
      </div>
      <div className="speaker-list">
        <div className="mt-4">{facilitators}</div>
        <Button
          variant="outline"
          className="d-none event-read-more parallel"
          style={{
            padding: "0.7rem 0.7rem",
          }}
        >
          Read more
        </Button>
      </div>
    </>
  );
};

export default Parallel;
