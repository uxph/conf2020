import React, { useState, useEffect } from "react";
import SEO from "../components/seo";
import Button from "../components/atoms/button";
import ReactLoading from "react-loading";
import { Modal, ModalBody } from "reactstrap";
import axios from "axios";

import "../assets/sass/home.scss";
import info from "../data/info.json";

const ConfirmationPage = () => {
  const auth_sk = "Basic c2tfbGl2ZV9SdjdIeW5nZ0xNUlQ0TFQ2UndGZ1BEd3c6";

  // Paymongo API
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [authUrl, setAuthUrl] = useState(null);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // useEffect for confirmations
  useEffect(() => {
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
            setPaymentMessage(
              "Please check your email for your ticket and further instructions. We'll be sharing more updates on the event in the coming weeks. See you there!"
            );
          } else {
            setConfirmMessage("The payment didn't go through");
            setPaymentMessage(
              "There was a problem in processing your payment. Please double check the details and try again."
            );
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

    const refetchCardConfirmation = () => {
      const paymentIntentId = urlParams.get("payment_intent");
      const paymentMethodId = urlParams.get("payment_method");
      const client = urlParams.get("client");

      const data = JSON.stringify({
        data: {
          attributes: {
            payment_method: paymentMethodId,
            client_key: client,
          },
        },
      });

      const xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          const responseText = JSON.parse(this.responseText);
          console.log("Attach paymentIntent", responseText);
          if (responseText.data) {
            const paymentIntent = responseText.data;
            const paymentIntentStatus = paymentIntent.attributes.status;
            if (paymentIntentStatus === "awaiting_next_action") {
              setAuthUrl(paymentIntent.attributes.next_action.redirect.url);
              // setAuthUrl("https://2020.uxph.org");
              window.addEventListener(
                "message",
                (ev) => {
                  if (ev.data === "3DS-authentication-complete") {
                    // 3D Secure authentication is complete. You can requery the payment intent again to check the status.

                    axios
                      .get(
                        "https://api.paymongo.com/v1/payment_intents/" +
                          paymentIntentId +
                          "?client_key=" +
                          client,
                        {
                          headers: {
                            // Base64 encoded public PayMongo API key.
                            Authorization: auth_sk,
                          },
                        }
                      )
                      .then(function (response) {
                        var paymentIntent = response.data.data;
                        var paymentIntentStatus =
                          paymentIntent.attributes.status;

                        setModal(false);

                        if (paymentIntentStatus === "succeeded") {
                          setConfirmMessage("Payment successful!");
                          setPaymentMessage(
                            "Please check your email for your ticket and further instructions. We'll be sharing more updates on the event in the coming weeks. See you there!"
                          );
                        } else if (
                          paymentIntentStatus === "awaiting_payment_method"
                        ) {
                          setConfirmMessage("The payment didn't go through");
                          setPaymentMessage(
                            "There was a problem in processing your payment. Please double check the details and try again."
                          );
                        } else if (paymentIntentStatus === "processing") {
                          refetchCardConfirmation();
                        }
                      });
                  }
                },
                false
              );
            } else if (paymentIntentStatus === "succeeded") {
              setConfirmMessage("Payment successful!");
              setPaymentMessage(
                "Please check your email for your ticket and further instructions. We'll be sharing more updates on the event in the coming weeks. See you there!"
              );
            } else if (paymentIntentStatus === "awaiting_payment_method") {
              setConfirmMessage("The payment didn't go through");
              setPaymentMessage(
                "There was a problem in processing your payment. Please double check the details and try again."
              );
            } else if (paymentIntentStatus === "processing") {
              refetchCardConfirmation();
            }
          } else if (responseText.errors[0].code.includes("succeed")) {
            setConfirmMessage("Payment successful!");
            setPaymentMessage(
              "Please check your email for your ticket and further instructions. We'll be sharing more updates on the event in the coming weeks. See you there!"
            );
          } else {
            setConfirmMessage("The payment didn't go through");
            setPaymentMessage(
              "There was a problem in processing your payment. Please double check the details and try again."
            );
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

    const fetchCardConfirmation = () => {
      const paymentIntentId = urlParams.get("payment_intent");
      const paymentMethodId = urlParams.get("payment_method");
      const client = urlParams.get("client");

      const data = JSON.stringify({
        data: {
          attributes: {
            payment_method: paymentMethodId,
            client_key: client,
          },
        },
      });

      const xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          const responseText = JSON.parse(this.responseText);
          console.log("Attach paymentIntent", responseText);
          if (responseText.data) {
            const paymentIntent = responseText.data;
            const paymentIntentStatus = paymentIntent.attributes.status;
            if (paymentIntentStatus === "awaiting_next_action") {
              setAuthUrl(paymentIntent.attributes.next_action.redirect.url);
              // setAuthUrl("https://2020.uxph.org");
              window.addEventListener(
                "message",
                (ev) => {
                  if (ev.data === "3DS-authentication-complete") {
                    // 3D Secure authentication is complete. You can requery the payment intent again to check the status.

                    axios
                      .get(
                        "https://api.paymongo.com/v1/payment_intents/" +
                          paymentIntentId +
                          "?client_key=" +
                          client,
                        {
                          headers: {
                            // Base64 encoded public PayMongo API key.
                            Authorization: auth_sk,
                          },
                        }
                      )
                      .then(function (response) {
                        var paymentIntent = response.data.data;
                        var paymentIntentStatus =
                          paymentIntent.attributes.status;

                        setModal(false);

                        if (paymentIntentStatus === "succeeded") {
                          setConfirmMessage("Payment successful!");
                          setPaymentMessage(
                            "Please check your email for your ticket and further instructions. We'll be sharing more updates on the event in the coming weeks. See you there!"
                          );
                        } else if (
                          paymentIntentStatus === "awaiting_payment_method"
                        ) {
                          setConfirmMessage("The payment didn't go through");
                          setPaymentMessage(
                            "There was a problem in processing your payment. Please double check the details and try again."
                          );
                        } else if (paymentIntentStatus === "processing") {
                          refetchCardConfirmation();
                        }
                      });
                  }
                },
                false
              );
            } else if (paymentIntentStatus === "succeeded") {
              setConfirmMessage("Payment successful!");
              setPaymentMessage(
                "Please check your email for your ticket and further instructions. We'll be sharing more updates on the event in the coming weeks. See you there!"
              );
            } else if (paymentIntentStatus === "awaiting_payment_method") {
              setConfirmMessage("The payment didn't go through");
              setPaymentMessage(
                "There was a problem in processing your payment. Please double check the details and try again."
              );
            } else if (paymentIntentStatus === "processing") {
              refetchCardConfirmation();
            }
          } else if (responseText.errors[0].code.includes("succeed")) {
            setConfirmMessage("Payment successful!");
            setPaymentMessage(
              "Please check your email for your ticket and further instructions. We'll be sharing more updates on the event in the coming weeks. See you there!"
            );
          } else {
            setConfirmMessage("The payment didn't go through");
            setPaymentMessage(
              "There was a problem in processing your payment. Please double check the details and try again."
            );
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

  useEffect(() => {
    if (authUrl) {
      setModal(true);
    }
  }, [authUrl]);

  return (
    <>
      <SEO title="Ticket Confirmation" />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <iframe
            className="w-100 border-0"
            src={authUrl}
            title="3DS Transaction Authenticatoin"
            style={{
              height: "400px",
            }}
          ></iframe>
        </ModalBody>
      </Modal>
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
        >
          {confirmMessage ? (
            <>
              <h1
                className="text-white text-center"
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                }}
              >
                {confirmMessage}
                {/*  */}
              </h1>
              <p
                style={{
                  fontWeight: `light`,
                  fontFamily: "Work sans",
                }}
                className="text-center text-white"
              >
                {paymentMessage}
              </p>
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
              <div className="text-center margin-top-64">
                <p className="text-white margin-bottom-4">
                  If you have any questions or concerns, please contact{" "}
                  <a href="mailto:conference@uxph.org" className="red">
                    conference@uxph.org.
                  </a>
                  {/* Follow us for the announcement! */}
                </p>
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
            </>
          ) : (
            <center>
              <ReactLoading
                type="bubbles"
                color="#ffffff"
                height={96}
                width={128}
              />
              <p
                className="text-white text-center"
                style={{
                  fontSize: "1.125rem",
                }}
              >
                Please wait while we process your payment.
              </p>
            </center>
          )}
        </div>
      </header>
    </>
  );
};

export default ConfirmationPage;
