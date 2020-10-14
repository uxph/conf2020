import React from "react";

const Hero = () => {
  return (
    <header
      className="padding-top-96 text-center partner-hero"
      style={{
        paddingBottom: "700px",
      }}
      data-aos="fade"
      data-aos-duration={500}
      data-aos-once={true}
    >
      <div className="wrapper" id="call-for-speakers-header">
        <h2 className="text-white margin-bottom-192">Call for speakers</h2>
      </div>
    </header>
  );
};

export default Hero;
