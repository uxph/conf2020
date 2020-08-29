import React from "react";

const Hero = () => {
  return (
    <header className="padding-top-96 padding-bottom-256 text-center partner-hero">
      <div className="wrapper" id="call-for-speakers-header">
        <a href="/">
          <img
            src={"/images/logos/uxph_conf_logo.svg"}
            alt="UXPH Conference 2020"
            className="width-96 d-block mx-auto margin-bottom-32"
          />
        </a>
        <h2 className="text-white margin-bottom-24">Call for speakers</h2>
      </div>
    </header>
  );
};

export default Hero;
