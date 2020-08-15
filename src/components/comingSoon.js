import React from "react";
import Button from "../components/atoms/button";
import info from "../data/info.json";

const ComingSoon = () => {
  return (
    <header
      style={{
        backgroundColor: "var(--black)",
        boxSizing: "border-box",
      }}
    >
      {/* Video overlay */}
      <div
        id="coming-soon-overlay"
        style={{
          position: "fixed",
          backgroundColor: "var(--black)",
          width: "100%",
          height: "100%",
          left: "0",
          top: "0",
          zIndex: "1100",
          opacity: "0.9",
        }}
      ></div>
      <iframe
        width="150%"
        height="100%"
        className="position-fixed"
        id="coming-soon-video"
        src="https://www.youtube.com/embed/EWZ5HRa2qf8?controls=0&loop=1&autoplay=1&mute=1&start=11&end=209&showinfo=0&playlist=EWZ5HRa2qf8"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        title="UXPH teaser video"
        style={{
          left: "-390px",
          filter: "grayscale(100%)",
          zIndex: "1000",
        }}
      ></iframe>
      <div
        id="coming-soon-content"
        className="margin-y-128 mx-auto"
        style={{
          position: "relative",
          zIndex: "1300",
          width: "700px",
          boxSizing: "border-box",
          // top: "50%",
          // left: "50%",
          // transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={"/images/logos/uxph_conf_logo.svg"}
          alt="UXPH Conference 2020"
          className="width-128 d-block mx-auto margin-bottom-32"
        />
        <h1 className="text-center text-white margin-bottom-48 font-size-48">
          Coming in October 2020
        </h1>
        <p className="text-center text-white margin-bottom-32 font-size-24 font-weight-bold">
          UXPH CONF 2020: Designers as Navigators of Change
        </p>
        <p className="text-white text-center margin-bottom-32">
          <strong>The UXPH CONF</strong>, now in its 5th year, will be an online
          event filled with talks and workshops for Experience Designers,
          enthusiasts, and creative problem-solvers.
        </p>
        <p className="text-white text-center margin-bottom-32">
          This year, we look back at how designers adapted and thrived when the
          way we work and enjoy our social freedoms was transformed. Looking to
          the future, what can we learn from their experience? How can we help
          our teams navigate the constant change in the world as we design
          products and services that have lasting impact?
        </p>
        <p className="text-white text-center margin-bottom-32">
          Join us in learning from leaders of the local and international UX
          community, as we cover research methodologies, design management and
          methods, and many other topics to further your design career.
        </p>
        <div className="text-center">
          <Button
            variant="outline"
            bgColor="#182335"
            className="margin-left-8 margin-right-8 margin-bottom-16"
            href="/call-for-speakers"
            target="blank"
          >
            Speaker inquiries
          </Button>
          <Button
            variant="outline"
            bgColor="#182335"
            className="margin-left-8 margin-right-8 margin-bottom-16"
          >
            Sponsor Inquiries
          </Button>
        </div>
        <div className="d-flex justify-content-center margin-top-64">
          <a href={info.twitter} target="blank">
            <img
              src={"/images/icons/twitter.svg"}
              alt="UXPH Twitter Page"
              className="margin-right-24"
            />
          </a>
          <a href={info.instagram} target="blank">
            <img
              src={"/images/icons/ig-square.svg"}
              alt="UXPH Instagram Page"
              className="margin-right-24"
            />
          </a>
          <a href={info.facebook_page} target="blank">
            <img
              src={"/images/icons/facebook-square.svg"}
              alt="UXPH Facebook Page"
              className="margin-right-24"
            />
          </a>
          <a href={info.linkedin} target="blank">
            <img src={"/images/icons/linkedin.svg"} alt="UXPH LinkedIn Page" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default ComingSoon;
