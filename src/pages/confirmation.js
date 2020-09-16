import React, { useState, useEffect } from "react";
import SEO from "../components/seo";
import Button from "../components/atoms/button";
import ReactLoading from "react-loading";

import "../assets/sass/home.scss";
import info from "../data/info.json";

const ConfirmationPage = () => {
  const auth_sk = "Basic c2tfbGl2ZV9SdjdIeW5nZ0xNUlQ0TFQ2UndGZ1BEd3c6";

  // Paymongo API
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const fetchGcashConfirmation = () => {
    // values from Paymongo
    const id = localStorage.getItem("uxph_2020_confirm_number");
    const amount = urlParams.get("amount");
    const discountCode = urlParams.get("discount_code")
      ? urlParams.get("discount_code")
      : "none";
    const company = urlParams.get("company")
      ? urlParams.get("company")
      : "none";
    const tickets = [
      {
        name: "super_early_bird",
        quantity: parseInt(urlParams.get("super_early_bird")),
      },
    ]
      .filter((x) => x.quantity)
      .map((x) => `${x.name}: ${x.quantity}`)
      .join(", ");

    const data = JSON.stringify({
      data: {
        attributes: {
          amount: parseInt(amount),
          description: `{discount_code: ${
            discountCode ? discountCode : "none"
          }, company: ${company}, ${tickets}}`,
          source: {
            type: "source",
            id: id,
          },
          currency: "PHP",
        },
      },
    });

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        const responseText = JSON.parse(this.responseText);
        console.log("responseText", responseText);

        if (responseText.data) {
          setConfirmMessage("Payment successful!");
        } else {
          setConfirmMessage("Uh-oh! Something went wrong.");
        }

        setConfirmed(true);
      }
    });

    xhr.open("POST", "https://api.paymongo.com/v1/payments");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader(
      "authorization",
      "Basic c2tfbGl2ZV9SdjdIeW5nZ0xNUlQ0TFQ2UndGZ1BEd3c6"
    );

    xhr.send(data);
  };

  const fetchCardConfirmation = () => {
    const paymentIntentId = urlParams.get("payment_intent");
    const paymentMethodId = urlParams.get("payment_method");

    const data = JSON.stringify({
      data: {
        attributes: {
          payment_method: paymentMethodId,
        },
      },
    });

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        const responseText = JSON.parse(this.responseText);
        console.log("Attach paymentIntent", responseText);
        if (responseText.data) {
          setConfirmMessage("Payment successful!");
        } else {
          setConfirmMessage("Uh-oh! Something went wrong.");
        }

        setConfirmed(true);
      }
    });

    xhr.open(
      "POST",
      `https://api.paymongo.com/v1/payment_intents/${paymentIntentId}/attach`
    );
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("authorization", auth_sk);

    xhr.send(data);
  };

  useEffect(() => {
    // confirm the payments right off the bat
    if (!confirmed && !confirmMessage) {
      const method = urlParams.get("method");
      if (method === "gcash") {
        fetchGcashConfirmation();
      } else if (method === "card") {
        fetchCardConfirmation();
      }
    }
  });

  return (
    <>
      <SEO title="Ticket Confirmation" />
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
          id="coming-soon-content"
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
        >
          {confirmMessage ? (
            <>
              <h1
                className="text-white text-center"
                style={{
                  fontSize: "48px",
                }}
              >
                {confirmMessage}
              </h1>
              <center>
                <Button
                  style={{
                    padding: "8px 24px",
                  }}
                  className="margin-top-16"
                  href="/"
                >
                  Back to homepage
                </Button>
              </center>
            </>
          ) : (
            <center>
              <ReactLoading
                type="bubbles"
                color="#ffffff"
                height={96}
                width={128}
              />
            </center>
          )}

          {/* {confirmMessage ? (
            <>
              <h1
                className="text-white text-center"
                style={{
                  fontSize: "48px",
                }}
              >
                {confirmMessage}
              </h1>
              <center
                className={
                  confirmMessage.includes("successful") ? "d-none" : "d-block"
                }
              >
                <Button
                  style={{
                    padding: "8px 24px",
                  }}
                  onClick={() => setConfirmMessage(null)}
                  className="margin-top-16"
                >
                  Try again
                </Button>
              </center>
            </>
          ) : (
            <>
              <p className="text-white font-size-24">
                Your Confirmation Number:
              </p>
              <Row className="align-items-center">
                <Col md={9}>
                  <Input
                    type="text"
                    name="confirmNumber"
                    id="confirmNumber"
                    onChange={(event) => setConfirmNumber(event.target.value)}
                    style={{
                      fontFamily: "Work sans",
                    }}
                  />
                </Col>
                <Col>
                  <Button
                    className="w-100"
                    innerClassName="w-100"
                    style={{
                      padding: "8px 16px",
                    }}
                    onClick={() => fetchConfirmation(confirmNumber)}
                  >
                    Confirm
                  </Button>
                </Col>
              </Row>
            </>
          )} */}

          <div className="text-center margin-top-48">
            <p
              style={{
                color: "#FFF",
              }}
            >
              Follow us for the announcement!
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

export default ConfirmationPage;
