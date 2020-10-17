import React, { useState, useEffect } from "react";
import SEO from "../components/seo";
import Button from "../components/atoms/button";
import { Input, Row, Col } from "reactstrap";
import { jsPDF } from "jspdf";
import _ from "lodash";

import attendees from "../data/attendees.json";
import info from "../data/info.json";

const Certificate = () => {
  const [generate, setGenerate] = useState(false);
  const [orderNo, setOrderNo] = useState("");
  const [isValidOrderNo, setIsValidOrderNo] = useState(null);
  const [validMessage, setValidMessage] = useState(null);

  // COA information
  const [certName, setCertName] = useState("");

  const verify = () => {
    if (!_.isNil(attendees[orderNo])) {
      setIsValidOrderNo(true);
      setCertName(attendees[orderNo].name);
      setValidMessage(null);
    } else {
      setIsValidOrderNo(false);
      setValidMessage(
        <p className="red text-center">
          Order No. <strong>{orderNo}</strong> is invalid.
        </p>
      );
    }
  };

  // useEffect to generate the certificate
  useEffect(() => {
    if (generate) {
      const doc = new jsPDF("landscape");

      // doc.addImage("/images/logos/uxph_conf_logo.png", "PNG", 15, 40, 180, 180);
      // TODO add the certificate visuals to the export
      doc.text(certName, 10, 10);
      doc.save(`UXPH Conf 2020 Certificate of Attendance - ${certName}.pdf`);
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
          className="margin-top-256 margin-bottom-48 mx-auto"
          style={{
            position: "relative",
            zIndex: "500",
            width: "700px",
            boxSizing: "border-box",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
          }}
          id="confirmation-content"
        >
          {isValidOrderNo ? (
            <div id="generate-certificate">
              <center>
                {/* This is where they'll download the certificate */}
                {/* Add a preview certificate template with an editable name field */}
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
                    className="w-100 my-2"
                    placeholder="Order No."
                    onChange={(event) => setOrderNo(event.target.value)}
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
          )}
        </div>
      </header>
    </>
  );
};

export default Certificate;
