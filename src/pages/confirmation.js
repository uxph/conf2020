import React, { useState, useEffect } from "react";
import SEO from "../components/seo";
import Button from "../components/atoms/button";
import ReactLoading from "react-loading";
import { Modal, ModalBody } from "reactstrap";
import axios from "axios";
import InnerHTML from "dangerously-set-html-content";

import "../assets/sass/home.scss";
import info from "../data/info.json";

const ConfirmationPage = () => {
  const auth_sk = "Basic c2tfbGl2ZV9SdjdIeW5nZ0xNUlQ0TFQ2UndGZ1BEd3c6";

  const successMessage = (
    <p
      style={{
        fontWeight: `light`,
        fontFamily: "Work sans",
      }}
      className="text-center text-white"
    >
      You will receive a payment confirmation email within the next 48 hours
      with your tickets and further instructions closer to the event. If you
      have any questions or concerns please email{" "}
      <a href="mailto:conference@uxph.org" className="red">
        conference@uxph.org
      </a>
      .<span className="d-block margin-top-16">See you there!</span>
    </p>
  );

  const failedMessage = (
    <p
      style={{
        fontWeight: `light`,
        fontFamily: "Work sans",
      }}
      className="text-center text-white"
    >
      There was a problem in processing your payment. Please double check the
      details and try again.
    </p>
  );

  // Paymongo API
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [authUrl, setAuthUrl] = useState(null);

  const [modal, setModal] = useState(false);
  // const toggle = () => setModal(!modal);

  const fetchGcashConfirmation = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // values from Paymongo
    const id = localStorage.getItem("uxph_2020_confirm_number");
    const amount = urlParams.get("amount");
    const discountCode = urlParams.get("discount_code")
      ? urlParams.get("discount_code")
      : "none";
    const subscribed = urlParams.get("subscribed");
    const tickets = [
      {
        name: "early_bird",
        quantity: parseInt(urlParams.get("early_bird")),
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
          }, subscribed: ${subscribed}, ${tickets}}`,
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
        // console.log("responseText", responseText);

        if (responseText.data) {
          setConfirmMessage("Payment successful!");
          setPaymentMessage(successMessage);
        } else {
          setConfirmMessage("The payment didn't go through");
          setPaymentMessage(failedMessage);
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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

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
        // console.log("Attach paymentIntent", responseText);
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
                      var paymentIntentStatus = paymentIntent.attributes.status;

                      setModal(false);

                      if (paymentIntentStatus === "succeeded") {
                        setConfirmMessage("Payment successful!");
                        setPaymentMessage(successMessage);
                      } else if (
                        paymentIntentStatus === "awaiting_payment_method"
                      ) {
                        setConfirmMessage("The payment didn't go through");
                        setPaymentMessage(failedMessage);
                      } else if (paymentIntentStatus === "processing") {
                        setTimeout(() => refetchCardConfirmation(), 5000);
                        // setConfirmMessage("Payment is still processing");
                        // setPaymentMessage(
                        //   "Please refresh this page in order to update the payment status."
                        // );
                      }
                    });
                }
              },
              false
            );
          } else if (paymentIntentStatus === "succeeded") {
            setConfirmMessage("Payment successful!");
            setPaymentMessage(successMessage);
          } else if (paymentIntentStatus === "awaiting_payment_method") {
            setConfirmMessage("The payment didn't go through");
            setPaymentMessage(failedMessage);
          } else if (paymentIntentStatus === "processing") {
            setTimeout(() => refetchCardConfirmation(), 5000);
            // setConfirmMessage("Payment is still processing");
            // setPaymentMessage(
            //   "Please refresh this page in order to update the payment status."
            // );

            // declined by the issuing bank
          }
        } else if (responseText.errors[0].code.includes("succeed")) {
          setConfirmMessage("Payment successful!");
          setPaymentMessage(successMessage);
        } else if (
          responseText.errors[0].code.includes("declined by the issuing bank")
        ) {
          setConfirmMessage("The card has been declined by the issuing bank");
          setPaymentMessage(failedMessage);
        } else {
          setConfirmMessage("The payment didn't go through");
          setPaymentMessage(failedMessage);
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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

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
      // console.log("before Readystate", this.readyState);
      if (this.readyState === this.DONE) {
        const responseText = JSON.parse(this.responseText);
        // console.log("Attach paymentIntent", responseText);
        if (responseText.data) {
          const paymentIntent = responseText.data;
          const paymentIntentStatus = paymentIntent.attributes.status;
          if (paymentIntentStatus === "awaiting_next_action") {
            setAuthUrl(paymentIntent.attributes.next_action.redirect.url);
            // setAuthUrl("https://uxph.org");
            window.addEventListener(
              "message",
              (ev) => {
                // console.log("ev.data", ev.data);
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
                      var paymentIntentStatus = paymentIntent.attributes.status;

                      // console.log("paymentIntentStatus", paymentIntentStatus);

                      setModal(false);

                      if (paymentIntentStatus === "succeeded") {
                        setConfirmMessage("Payment successful!");
                        setPaymentMessage(successMessage);
                      } else if (
                        paymentIntentStatus === "awaiting_payment_method"
                      ) {
                        setConfirmMessage("The payment didn't go through");
                        setPaymentMessage(failedMessage);
                      } else if (paymentIntentStatus === "processing") {
                        setTimeout(() => refetchCardConfirmation(), 5000);
                        // setConfirmMessage("Payment is still processing");
                        // setPaymentMessage(
                        //   "Please refresh this page in order to update the payment status."
                        // );
                      }
                    });
                }
              },
              false
            );
          } else if (paymentIntentStatus === "succeeded") {
            setConfirmMessage("Payment successful!");
            setPaymentMessage(successMessage);
          } else if (paymentIntentStatus === "awaiting_payment_method") {
            setConfirmMessage("The payment didn't go through");
            setPaymentMessage(failedMessage);
          } else if (paymentIntentStatus === "processing") {
            setTimeout(() => refetchCardConfirmation(), 5000);
            // setConfirmMessage("Payment is still processing");
            // setPaymentMessage(
            //   "Please refresh this page in order to update the payment status."
            // );
          }
        } else if (responseText.errors[0].code.includes("succeed")) {
          setConfirmMessage("Payment successful!");
          setPaymentMessage(successMessage);
        } else if (
          responseText.errors[0].code.includes("declined by the issuing bank")
        ) {
          setConfirmMessage("The card has been declined by the issuing bank");
          setPaymentMessage(failedMessage);
        } else {
          setConfirmMessage("The payment didn't go through");
          setPaymentMessage(failedMessage);
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

  // useEffect for confirmations
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // confirm the payments right off the bat
    if (!confirmed && !confirmMessage) {
      const method = urlParams.get("method");
      if (method === "gcash") {
        fetchGcashConfirmation();
      } else if (method === "card") {
        fetchCardConfirmation();
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (authUrl) {
      setModal(true);
    }
  }, [authUrl]);
  const messengerEmbed = `
  <div id="fb-root"></div>
  <script>
  window.fbAsyncInit = function() {
    FB.init({
      xfbml            : true,
      version          : 'v8.0'
    });
  };

  (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
  </script>
  <div
    class="fb-customerchat"
    attribution="setup_tool"
    page_id="314394185432326"
    theme_color="#e8006f"
  ></div>
  <script
    async
    defer
    crossorigin="anonymous"
    src="https://connect.facebook.net/en_US/sdk.js"
  ></script>
`;

  return (
    <>
      <SEO title="Ticket Confirmation" />
      <InnerHTML html={messengerEmbed} />

      <Modal isOpen={modal}>
        <ModalBody className="position-relative">
          <iframe
            className="w-100 border-0 rounded position-relative bg-transparent"
            src={authUrl}
            title="3DS Transaction Authenticatoin"
            style={{
              height: "400px",
              zIndex: 1000,
            }}
          ></iframe>
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "0",
              right: "0",
              zIndex: 900,
            }}
          >
            <ReactLoading
              type="bubbles"
              color="#182335"
              height={32}
              width={48}
              className="mx-auto"
            />
            <p className="text-center m-0">Waiting for authentication</p>
          </div>
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
          id="confirmation-content"
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
              </h1>
              {paymentMessage}
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
                <p
                  className={`text-white margin-bottom-4 ${
                    confirmMessage.toLowerCase().includes("successful")
                      ? "d-none"
                      : ""
                  }`}
                >
                  If you have any questions or concerns, please contact{" "}
                  <a href="mailto:conference@uxph.org" className="red">
                    conference@uxph.org.
                  </a>
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
                <br />
                This may take a few minutes.
              </p>
            </center>
          )}
        </div>
      </header>
    </>
  );
};

export default ConfirmationPage;
