import React, { useState } from "react";
import Button from "../components/atoms/button";
import info from "../data/info.json";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import InnerHTML from "dangerously-set-html-content";

const ComingSoon = () => {
  const titoEmbed = `
    <script src='https://js.tito.io/v1' async></script>
    <tito-widget event="uxph/uxph-conference-2020"></tito-widget>
  `;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <header
      style={{
        backgroundColor: "var(--black)",
        boxSizing: "border-box",
      }}
    >
      <Modal
        isOpen={modal}
        toggle={toggle}
        style={{
          zIndex: 9999,
        }}
      >
        <ModalHeader toggle={toggle}>Buy tickets</ModalHeader>
        <ModalBody>
          <InnerHTML html={titoEmbed} />
        </ModalBody>
      </Modal>
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
          zIndex: "400",
          opacity: "0.8",
        }}
      ></div>
      <div
        className="bg-video position-fixed"
        style={{
          top: 0,
        }}
      >
        <video className="bg-video__content" playsInline autoPlay muted loop>
          <source src="/videos/CONF20_BG_bnw.mp4" type="video/mp4" />
          <source src="/videos/CONF20_BG_bnw.webm" type="video/webm" />
        </video>
      </div>
      <div
        id="coming-soon-content"
        className="margin-top-32 margin-bottom-48 mx-auto"
        style={{
          position: "relative",
          zIndex: "500",
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
          className="d-block mx-auto margin-top-96"
          style={{
            width: "9.5rem",
          }}
        />
        <img
          src={"/images/logos/headline.svg"}
          alt="Designers as navigators of change"
          className="width-450 d-block mx-auto"
          id="coming-soon-headline"
        />
        <h1
          className="text-center text-white margin-bottom-48 font-size-24"
          style={{
            letterSpacing: "0.5rem",
          }}
        >
          November 14 - 15, 2020
        </h1>
        <div className="text-center">
          <hr
            className="margin-top-64 margin-bottom-32 d-block"
            style={{
              width: "2rem",
            }}
          />
          <Button
            className="margin-left-8 margin-right-8 margin-bottom-32"
            onClick={toggle}
            innerClassName="w-100"
            style={{
              padding: "12px 16px",
            }}
          >
            Tickets on Sale Soon
          </Button>
          <Button
            variant="outline"
            bgColor="rgba(0, 0, 0, 0.9)"
            className="margin-left-8 margin-right-8 margin-bottom-16"
            href="mailto:partnerships@uxph.org"
            target="blank"
            style={{
              padding: "12px 16px",
            }}
          >
            Sponsorship inquiries
          </Button>
        </div>
        <div className="text-center margin-top-4">
          <p
            style={{
              color: "#FFF",
            }}
          >
            Follow us for the announcement!
          </p>
        </div>
        <div className="d-flex justify-content-center margin-top-32">
          <a href={info.facebook_page} target="blank">
            <img
              src={"/images/icons/facebook-square.svg"}
              alt="UXPH Facebook Page"
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
          <a href={info.twitter} target="blank">
            <img
              src={"/images/icons/twitter.svg"}
              alt="UXPH Twitter Page"
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
