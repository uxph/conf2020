import React, { useState, useEffect } from "react";
import SEO from "../components/seo";
import Button from "../components/atoms/button";
import { Input, Row, Col } from "reactstrap";
import { jsPDF } from "jspdf";
import _ from "lodash";

import attendees from "../data/attendees.json";
import info from "../data/info.json";
import bebas from "../data/bebas.json";
import $ from "jquery";

const Certificate = () => {
  const [generate, setGenerate] = useState(false);
  const [orderNo, setOrderNo] = useState("");
  const [isValidOrderNo, setIsValidOrderNo] = useState(null);
  const [validMessage, setValidMessage] = useState(null);

  // COA information
  const [certName, setCertName] = useState("");

  const verify = () => {
    if (!_.isNil(attendees[orderNo.toUpperCase()])) {
      setIsValidOrderNo(true);
      setCertName(attendees[orderNo.toUpperCase()].name);
      setValidMessage(null);
    } else {
      setIsValidOrderNo(false);
      setValidMessage(
        <p className="red text-center">
          Ticket No. <strong>{orderNo.toUpperCase()}</strong> is invalid.
        </p>
      );
    }
  };

  useEffect(() => {
    var callAddFont = function () {
      this.addFileToVFS("BebasNeue-normal.ttf", bebas.font);
      this.addFont("BebasNeue-normal.ttf", "BebasNeue", "normal");
    };
    jsPDF.API.events.push(["addFonts", callAddFont]);
  }, []);

  // useEffect to auto scroll to the certificate preview
  useEffect(() => {
    if (isValidOrderNo) {
      $("html, body").animate(
        {
          scrollTop: $("#generate-certificate").offset().top - 50,
        },
        400
      );
    }
  }, [isValidOrderNo, setIsValidOrderNo]);

  // useEffect to generate the certificate
  useEffect(() => {
    if (generate) {
      const doc = new jsPDF("l", "mm", "a4"); // todo compress PDF specs

      doc.addImage(
        "/images/certificates/uxph2020-certificate.jpg",
        "PNG",
        0,
        0,
        297,
        210
      );
      // TODO add proper font
      // TODO add the certificate visuals to the export
      doc.setFontSize(45);
      doc.setTextColor("#E8006F");
      doc.setFont("BebasNeue", "normal");
      doc.text(certName.toUpperCase(), 297 / 2, 210 / 2 + 20, "center"); // todo position the name properly
      doc.save(
        `UXPH Conf 2020 Certificate of Attendance - ${certName
          .split(" ")
          .map(
            (x) => x[0].toUpperCase() + x.substring(1, x.length).toLowerCase()
          )
          .join(" ")}.pdf`
      );
    }

    setGenerate(false);
  }, [generate, setGenerate, certName]);

  return (
    <>
      <SEO title="Certificate of Attendance" />
      <header
        style={{
          backgroundColor: "var(--black)",
          boxSizing: "border-box",
        }}
      >
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
            opacity: "1",
          }}
        ></div>
        <div
          className={`${
            isValidOrderNo ? "margin-top-96" : "margin-top-256"
          } margin-bottom-48 mx-auto`}
          style={{
            position: "relative",
            zIndex: "500",
            width: "700px",
            boxSizing: "border-box",
          }}
          id="confirmation-content"
        >
          {/* Shows up if the Order No. is valid */}
          {isValidOrderNo ? (
            <div id="generate-certificate" className="margin-top-192">
              <center>
                {/* This is where they'll download the certificate */}
                {/* Add a preview certificate template with an editable name field */}
                <small
                  className="text-uppercase text-white"
                  style={{
                    letterSpacing: "1px",
                  }}
                >
                  Your name on the certificate
                </small>
                <Input
                  type="text"
                  className="my-2 text-center font-weight-bold text-uppercase text-white"
                  placeholder="Fill out your name"
                  value={certName}
                  onChange={(event) => setCertName(event.target.value)}
                  id="certificate-name-input"
                />
                <br />
                <Button onClick={() => setGenerate(true)}>
                  Claim your certificate
                </Button>
              </center>
            </div>
          ) : (
            <div id="order-number-input">
              <h1
                className="text-white text-center"
                style={{
                  fontSize: "3rem",
                  marginBottom: "2rem",
                }}
              >
                Certificate of Attendance
              </h1>
              <Row>
                <Col md={9} sm={12}>
                  <Input
                    type="text"
                    id="order-no-field"
                    className="w-100 my-2 text-uppercase"
                    placeholder="Ticket No."
                    onChange={(event) => setOrderNo(event.target.value)}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        verify();
                      }
                    }}
                    style={{
                      height: "44px",
                    }}
                  />
                </Col>
                <Col md={3} sm={12}>
                  <Button
                    className="my-2 w-100"
                    innerClassName="w-100"
                    style={{
                      padding: "0.7rem 0.7rem",
                    }}
                    onClick={verify}
                  >
                    Verify
                  </Button>
                </Col>
              </Row>
              {validMessage}
            </div>
          )}

          <div className="text-center margin-top-64">
            <p className="text-white margin-bottom-16">
              Join the community and follow us for updates!
            </p>
          </div>
          <div className="d-flex justify-content-center margin-top-16">
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
              <img
                src={"/images/icons/linkedin.svg"}
                alt="UXPH LinkedIn Page"
              />
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Certificate;
