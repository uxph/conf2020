import React from "react";

const Hero = ({ day, setDay }) => {
  return (
    <section
      className="padding-top-128 padding-bottom-192 text-center faq-hero "
      data-aos="fade"
      data-aos-duration={500}
      data-aos-once={true}
    >
      <div className="margin-x-64 wrapper">
        <h1 className="text-white margin-bottom-8">Conference Schedule</h1>
        <p className="text-white text-block">
          Our PACKED 2-day virtual conference includes exclusive pre-conference
          events. All talks will be streamed on our conference platform and
          available to ticket holders even after the event for a limited time.{" "}
          <a href="/tickets" className="red">
            Get your tickets now!
          </a>
        </p>
        <p className="margin-bottom-96">
          <em>
            * Program details and speakers to be finalized closer to the event.
          </em>
        </p>
      </div>
    </section>
  );
};

export default Hero;
