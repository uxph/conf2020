import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  CustomInput,
  Label,
  Input,
  Col,
  Row,
  Table,
  Alert,
} from "reactstrap";
import Button from "../atoms/button";
import numeral from "numeral";
import months from "months";
import discount_codes from "../../data/discounts.json";

// const public_key = "pk_live_BgwqPfGCXbdTYUnSJZwFGDLN";
// const secret_key = "sk_live_Rv7HynggLMRT4LT6RwFgPDww";
const auth_pk = "Basic cGtfbGl2ZV9CZ3dxUGZHQ1hiZFRZVW5TSlp3RkdETE46";
const auth_sk = "Basic c2tfbGl2ZV9SdjdIeW5nZ0xNUlQ0TFQ2UndGZ1BEd3c6";

const bankTransferUrl = "https://airtable.com/shryfMZM6wO4NKFDh";

const env = "production"; // TODO DO NOT FORGET TO CHANGE THIS
let url = null;
if (env === "test") {
  url = "https://loving-volhard-7197c7.netlify.app";
} else if (env === "production") {
  url = "https://2020.uxph.org";
} else if (env === "local") {
  url = "http://localhost:8000";
}

const TicketForm = () => {
  // getting the list of payments
  const [paymentList, setPaymentList] = useState(null);
  const fetchAllPayments = () => {
    const data = null;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        const responseText = JSON.parse(this.responseText);
        // console.log("fetchAllPayments", responseText);
        if (responseText.data) {
          setPaymentList(responseText.data);
        }
      }
    });

    xhr.open("GET", "https://api.paymongo.com/v1/payments?limit=100");
    xhr.setRequestHeader("authorization", auth_sk);

    xhr.send(data);
  };

  // tickets
  // const regularPrice = 2770; // TODO for discount calculations
  const earlyBirdPrice = 2500;
  const [earlyBirdQuantity, setEarlyBirdQuantity] = useState(1);

  // payment method
  const [paymentMethod, setPaymentMethod] = useState("gcash");

  // authentication variables
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [confirmNumber, setConfirmNumber] = useState(null);
  const [error, setError] = useState([]);

  // price calculations
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discountMessage, setDiscountMessage] = useState("You saved");
  let total = subtotal - discount >= 0 ? subtotal - discount : 0;

  // Basic info
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [company, setCompany] = useState("n/a");
  const [email, setEmail] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);

  // Bank details
  const [cardNumber, setCardNumber] = useState(null);
  const [expiryMonth, setExpiryMonth] = useState(1);
  const [expiryYear, setExpiryYear] = useState(2020);
  const [cvc, setCvc] = useState(null);

  // Paymongo API for card method
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [clientKey, setClientKey] = useState(null);

  // Other tracking values
  const [subscribed, setSubscribed] = useState(true);

  const monthOptions = new Array(12).fill(0).map((x, index) => (
    <option value={index + 1} key={index}>
      {index + 1}
    </option>
  ));

  const yearOptions = new Array(51).fill(2020).map((x, index) => (
    <option value={x + index} key={x + index}>
      {x + index}
    </option>
  ));

  const coc = (
    <small>
      By purchasing a ticket, you are agreeing to have read and will abide by
      the terms stated in{" "}
      <a href="http://bit.ly/UXPHCodeOfConduct" target="blank" className="red">
        UXPH’s Code of Conduct
      </a>
      .
      <br />
      <span className="margin-top-16 d-block">
        Please note that tickets are <strong>non-refundable</strong> and are
        only transferrable.
      </span>
    </small>
  );

  useEffect(() => {
    fetchAllPayments();
    // eslint-disable-next-line
  }, []);

  // useEffect for ticket pricing calculations
  useEffect(() => {
    let earlyBirdTotal = earlyBirdQuantity * earlyBirdPrice;
    setSubtotal(earlyBirdTotal);

    if (!subtotal) {
      setDiscountCode("");
      setDiscount(0);
    }
  }, [earlyBirdQuantity, setEarlyBirdQuantity, subtotal]);

  // useEffect for discount codes
  useEffect(() => {
    const lowerCasedCode = discountCode.toLowerCase();
    // secret code
    if (lowerCasedCode === "uxcult100") {
      setDiscount(subtotal - 100);
      setDiscountMessage("HOW DID YOU???");
    }

    // matched code
    else if (discount_codes[lowerCasedCode]) {
      setSubtotal(earlyBirdPrice * earlyBirdQuantity); // TODO verify
      if (discount_codes[lowerCasedCode].percent) {
        setDiscount(subtotal * discount_codes[lowerCasedCode].percent);
        setDiscountMessage(
          `Discount (${parseInt(
            discount_codes[lowerCasedCode].percent * 100
          )}% off)`
        );
      } else {
        setDiscount(discount_codes[lowerCasedCode].solid);
        setDiscountMessage(
          `PHP ${discount_codes[lowerCasedCode].solid}.00 off discount`
        );
      }
    }

    // invalid code
    else {
      setSubtotal(earlyBirdPrice * earlyBirdQuantity);
      setDiscount(0);
    }

    if (earlyBirdQuantity >= 5 && earlyBirdQuantity < 10) {
      setDiscount(earlyBirdPrice * earlyBirdQuantity * 0.1);
      setDiscountCode("Group of 5");
      setDiscountMessage("GROUP OF 5 (10% off) discount");
    } else if (earlyBirdQuantity >= 10) {
      setDiscount(earlyBirdPrice * earlyBirdQuantity * 0.15);
      setDiscountCode("Group of 10");
      setDiscountMessage("GROUP OF 10 (15% off) discount");
    } else if (earlyBirdQuantity < 5 && discountCode.includes("Group of")) {
      setDiscountCode("");
    }
  }, [discountCode, subtotal, earlyBirdPrice, earlyBirdQuantity, setSubtotal]);

  // useEffect for checkout URL
  useEffect(() => {
    setCheckoutUrl(null);
  }, [subtotal]);

  useEffect(() => {
    if (confirmNumber) {
      localStorage.setItem("uxph_2020_confirm_number", confirmNumber);
      // console.log(
      //   "uxph_2020_confirm_number",
      //   localStorage.getItem("uxph_2020_confirm_number")
      // );
    }
  }, [confirmNumber]);

  // error handling logic
  const errorChecking = () => {
    let errorList = [];
    setError([]);
    if (firstName === null || firstName === "") {
      // errorList.push(
      //   <small key="firstName" className="d-block">
      //     <strong>First name</strong> is required.
      //   </small>
      // );
      errorList.push(true);
      setFirstName("");
    }

    if (lastName === null || lastName === "") {
      // errorList.push(
      //   <small key="lastName" className="d-block">
      //     <strong>Last name</strong> is required.
      //   </small>
      // );
      errorList.push(true);
      setLastName("");
    }

    // if (company === null || company === "") {
    //   // errorList.push(
    //   //   <small key="company" className="d-block">
    //   //     <strong>Company</strong> is required.
    //   //   </small>
    //   // );
    //   errorList.push(true);
    //   setCompany("n/a");
    // }

    if (email === null || email === "") {
      // errorList.push(
      //   <small key="email" className="d-block">
      //     <strong>Email</strong> is required.
      //   </small>
      // );
      errorList.push(true);
      setEmail("");
    }

    if (mobileNumber === null || mobileNumber === "") {
      // errorList.push(
      //   <small key="mobileNumber" className="d-block">
      //     <strong>Mobile number</strong> is required.
      //   </small>
      // );
      errorList.push(true);
      setMobileNumber("");
    } else if (
      mobileNumber !== null &&
      mobileNumber
        .toLowerCase()
        .split("")
        .filter((x) => !"1234567890".includes(x)).length > 0
    ) {
      errorList.push(true);
    }

    // else if (mobileNumber.length !== 11) {
    //   // errorList.push(
    //   //   <small key="mobileNumber" className="d-block">
    //   //     <strong>Mobile number</strong> must be 11 digits.
    //   //   </small>
    //   // );
    //   errorList.push(true);
    // } else if (mobileNumber.substring(0, 2) !== "09") {
    //   // errorList.push(
    //   //   <small key="mobileNumber" className="d-block">
    //   //     <strong>Mobile number</strong> must start with "09".
    //   //   </small>
    //   // );
    //   errorList.push(true);
    // }

    if (paymentMethod === "card") {
      if (cardNumber === null || cardNumber === "") {
        // errorList.push(
        //   <small key="cardNumber" className="d-block">
        //     <strong>Card number</strong> is required.
        //   </small>
        // );
        errorList.push(true);
        setCardNumber("");
      }

      if (cvc === null || cvc === "") {
        // errorList.push(
        //   <small key="cvc" className="d-block">
        //     <strong>CVC</strong> is required.
        //   </small>
        // );
        errorList.push(true);
        setCvc("");
      }

      const currMonth = new Date().getMonth() + 1;
      const currYear = new Date().getFullYear();
      if (expiryYear < currYear) {
        errorList.push(
          <small key="expiryDate" className="d-block">
            Your card seems to be expired already.
          </small>
        );
      } else if (expiryMonth <= currMonth && expiryYear === currYear) {
        errorList.push(
          <small key="expiryDate" className="d-block">
            Your card seems to be expired already.
          </small>
        );
      }
    }

    if (subtotal <= 0) {
      errorList.push(
        <small key="noPurchase" className="d-block">
          You have not selected a ticket yet.
        </small>
      );
    }

    if (errorList.length > 0) {
      setError(errorList);
    }

    return errorList.length > 0;
  };

  // Paymongo API for paying with GCash
  const payWithGcash = (details) => {
    let errorFound = errorChecking();
    if (!errorFound) {
      // parseInt(details.amount) * 100
      const caseUrl = `${url}/confirmation/?method=${
        details.paymentMethod
      }&amount=${parseInt(details.amount) * 100}&company=${
        details.company
      }&discount_code=${
        discount > 0 ? details.discountCode : "none"
      }&early_bird=${details.earlyBird}&subscribed=${subscribed}`;

      const data = JSON.stringify({
        data: {
          attributes: {
            amount: parseInt(details.amount) * 100, // parseInt(details.amount) * 100
            redirect: {
              success: caseUrl,
              failed: caseUrl,
            },
            billing: {
              name: details.name,
              email: details.email,
              phone: details.phone,
            },
            type: "gcash",
            currency: "PHP",
          },
        },
      });

      const xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          const responseText = JSON.parse(this.responseText);
          // console.log(responseText);
          if (responseText.data) {
            setCheckoutUrl(responseText.data.attributes.redirect.checkout_url);
            setConfirmNumber(responseText.data.id);
            setError([]);
          } else {
            setError(responseText.errors[0].detail);
          }
        }
      });

      xhr.open("POST", "https://api.paymongo.com/v1/sources");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("authorization", auth_pk);

      xhr.send(data);

      // console.log("GCash link", caseUrl);
    }
  };

  // Paymongo API for paying with credit/debit card
  const payWithCard = (details) => {
    // Creating payment intent
    const createPaymentIntent = () => {
      const tickets = [
        {
          name: "early_bird",
          quantity: details.earlyBird,
        },
      ]
        .filter((x) => x.quantity)
        .map((x) => `${x.name}: ${x.quantity}`)
        .join(", ");

      const data = JSON.stringify({
        data: {
          attributes: {
            amount: parseInt(details.amount) * 100, // parseInt(details.amount) * 100
            payment_method_allowed: ["card"],
            payment_method_options: {
              card: {
                request_three_d_secure: "any",
              },
            },
            currency: "PHP",
            description: `{discount_code: ${
              discount > 0 ? discountCode : "none"
            }, subscribed: ${subscribed}, ${tickets}}`,
          },
        },
      });

      const xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          const responseText = JSON.parse(this.responseText);
          // console.log("Create paymentIntent", responseText);

          if (responseText.data) {
            setPaymentIntentId(responseText.data.id);
            setClientKey(responseText.data.attributes.client_key);
          }
        }
      });

      xhr.open("POST", "https://api.paymongo.com/v1/payment_intents");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("authorization", auth_sk);

      xhr.send(data);
    };

    // Creating payment method
    const createPaymentMethod = () => {
      const data = JSON.stringify({
        data: {
          attributes: {
            details: {
              card_number: details.cardNumber,
              exp_month: parseInt(details.expiryMonth),
              exp_year: parseInt(details.expiryYear),
              cvc: details.cvc,
            },
            billing: {
              name: details.name,
              email: details.email,
              phone: details.phone,
            },
            type: "card",
          },
        },
      });

      const xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          const responseText = JSON.parse(this.responseText);
          // console.log("Create paymentMethod", responseText);

          if (responseText.data) {
            setPaymentMethodId(responseText.data.id);
            setError([]);
          } else if (
            responseText.errors[0].detail.includes("details.card_number")
          ) {
            setPaymentMethodId(null);
            setError([
              <small key="cardNumber" className="d-block">
                Your card number seems to be invalid.
              </small>,
            ]);
          }
        }
      });

      xhr.open("POST", "https://api.paymongo.com/v1/payment_methods");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("authorization", auth_sk);

      xhr.send(data);
    };

    const errorFound = errorChecking();
    if (!errorFound) {
      createPaymentMethod();
      createPaymentIntent();
    }
  };

  return (
    <div
      className="rounded bg-white shadow px-4 py-4 mx-auto"
      id="payment-modal"
      style={{
        marginTop: "-250px",
        position: "relative",
        zIndex: 1000,
        maxWidth: "550px",
      }}
    >
      <div>
        {(checkoutUrl && paymentMethod === "gcash") ||
        (paymentIntentId && paymentMethodId && paymentMethod === "card") ? (
          <h4 className="margin-bottom-48">Review your information</h4>
        ) : (
          <>
            <span className="d-none">
              {paymentList ? paymentList.length : null}
            </span>
          </>
        )}
      </div>
      {checkoutUrl && paymentMethod === "gcash" ? (
        <>
          {/* GCash payment instructions */}
          <div id="modal-body">
            <p
              className="font-weight-bold"
              style={{
                fontSize: "1.125rem",
              }}
            >
              Basic Information
            </p>
            <Table className="basic-info">
              <tbody>
                <tr>
                  <td className="font-weight-bold">Name:</td>
                  <td>
                    {firstName} {lastName}
                  </td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Email:</td>
                  <td>{email}</td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Mobile number:</td>
                  <td>{mobileNumber}</td>
                </tr>
              </tbody>
            </Table>
            <br />
            <Table className="border-bottom">
              <thead>
                <tr>
                  <td className="font-weight-bolder">Tickets</td>
                  <td className="font-weight-bolder text-right">Quantity</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <small className="gray">Early bird</small> <br />
                  </td>
                  <td className="text-right">x {earlyBirdQuantity}</td>
                </tr>
              </tbody>
            </Table>
            <br />
            <Row className="px-2" id="total-label">
              <Col>
                <p className="font-size-24 mb-0 gray font-weight-bold">Total</p>
              </Col>
              <Col>
                <p className="font-size-24 mb-0 text-right font-weight-bold">
                  PHP {numeral(total).format("0,0.00")}
                </p>
              </Col>
            </Row>
            <br />
            {coc}
          </div>
          <div className="border-0 direction d-flex justify-content-between mt-4">
            <Button
              variant="outline"
              onClick={() => setCheckoutUrl(null)}
              style={{
                padding: "8px 16px",
              }}
            >
              Back
            </Button>
            <Button
              href={checkoutUrl}
              target="blank"
              style={{
                padding: "8px 16px",
              }}
            >
              Place order
            </Button>
          </div>
        </>
      ) : paymentIntentId && paymentMethodId && paymentMethod === "card" ? (
        <>
          {/* Credit/Debit card payment instructions */}
          <div id="modal-body">
            <p
              className="font-weight-bold"
              style={{
                fontSize: "1.125rem",
              }}
            >
              Basic Information
            </p>
            <Table className="basic-info">
              <tbody>
                <tr>
                  <td className="font-weight-bold">Name:</td>
                  <td>
                    {firstName} {lastName}
                  </td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Email:</td>
                  <td>{email}</td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Mobile number:</td>
                  <td>{mobileNumber}</td>
                </tr>
              </tbody>
            </Table>
            <br />
            <p
              className="font-weight-bold"
              style={{
                fontSize: "1.125rem",
              }}
            >
              Credit/Debit card details
            </p>
            <Table className="basic-info">
              <tbody>
                <tr>
                  <td className="font-weight-bold">Card number:</td>
                  <td>{cardNumber}</td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Expiry month & year:</td>
                  <td>
                    {months[expiryMonth - 1]} {expiryYear}
                  </td>
                </tr>
                <tr>
                  <td className="font-weight-bold">CVC:</td>
                  <td>{cvc}</td>
                </tr>
              </tbody>
            </Table>
            <br />
            <Table className="border-bottom">
              <thead>
                <tr>
                  <td className="font-weight-bolder">Tickets</td>
                  <td className="font-weight-bolder text-right">Quantity</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <small className="gray">Early bird</small> <br />
                  </td>
                  <td className="text-right">x {earlyBirdQuantity}</td>
                </tr>
              </tbody>
            </Table>
            <br />
            <Row className="px-2" id="total-label">
              <Col>
                <p className="font-size-24 mb-0 gray font-weight-bold">Total</p>
              </Col>
              <Col>
                <p className="font-size-24 mb-0 text-right font-weight-bold">
                  PHP {numeral(total).format("0,0.00")}
                </p>
              </Col>
            </Row>
            <br />
            {coc}
          </div>
          <div className="border-0 direction d-flex justify-content-between mt-4">
            <Button
              variant="outline"
              style={{
                padding: "8px 16px",
              }}
              onClick={() => setPaymentIntentId(null)}
            >
              Back
            </Button>
            <Button
              style={{
                padding: "8px 16px",
              }}
              // onClick={() => attachPayWithCard()}
              href={`${url}/confirmation/?method=${paymentMethod}&payment_intent=${paymentIntentId}&payment_method=${paymentMethodId}&client=${clientKey}&subscribed=${subscribed}`}
            >
              Place Order
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Payment details */}
          <div id="modal-body">
            <Form>
              <div>
                <FormGroup>
                  <Label for="paymentMethod">
                    Select payment method <span className="red">*</span>
                  </Label>
                  <CustomInput
                    type="select"
                    id="paymentMethod"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  >
                    <option value="gcash">GCash</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="bank">Bank Transfer</option>
                  </CustomInput>
                </FormGroup>
                {paymentMethod === "bank" && (
                  <div className="margin-y-24">
                    <p
                      className="margin-bottom-12"
                      style={{
                        fontSize: "18px",
                      }}
                    >
                      <strong>Bank transfer instructions</strong>
                    </p>
                    <ol>
                      <li>
                        If you have a code, enter it below and send the total
                        amount to the account details below:
                        <br />
                        <br />
                        <strong>Bank:</strong> Unionbank of the Philippines
                        <br />
                        <strong>Account Name:</strong> UXPH Design Society Inc.
                        <br />
                        <strong>Account number:</strong> 0014-9000-6014
                        <br />
                        <strong>Email:</strong> conference@uxph.org
                        <br />
                        <strong>Contact:</strong> +63 967 301 6561
                      </li>
                      <li>
                        Take a screenshot of the transfer and click CHECKOUT.
                        You'll be taken to a form where you need to upload your
                        order details and the screenshot.
                      </li>
                      <li>
                        When we confirm all the details are correct, you will be
                        sent a confirmation email, your tickets, and further
                        instructions for the event.
                      </li>
                    </ol>
                    <br />
                    <p>
                      If you have any questions, email{" "}
                      <a href="mailto:conference@uxph.org" className="red">
                        conference@uxph.org
                      </a>
                      .
                    </p>
                  </div>
                )}
              </div>
              <br />
              {paymentMethod !== "bank" && (
                <>
                  <p
                    className="margin-bottom-12"
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    <strong>About you</strong>
                  </p>
                  <Row>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label
                          for="firstName"
                          style={{
                            fontFamily: "Work sans",
                          }}
                        >
                          First name <span className="red">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="firstName"
                          id="firstName"
                          required
                          placeholder="e.g. Juan"
                          value={firstName ? firstName : ""}
                          onChange={(event) => setFirstName(event.target.value)}
                          onBlur={(event) => setFirstName(event.target.value)}
                          invalid={firstName === "" ? true : null}
                        />
                        {firstName === "" && (
                          <small className="red font-size-12">
                            This field is required
                          </small>
                        )}
                      </FormGroup>
                    </Col>
                    <Col sm={12} md={6}>
                      <FormGroup>
                        <Label for="lastName">
                          Last name <span className="red">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="lastName"
                          id="lastName"
                          required
                          placeholder="e.g. Dela Cruz"
                          value={lastName ? lastName : ""}
                          onChange={(event) => setLastName(event.target.value)}
                          onBlur={(event) => setLastName(event.target.value)}
                          invalid={lastName === "" ? true : null}
                        />
                        {lastName === "" && (
                          <small className="red font-size-12">
                            This field is required
                          </small>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup className="d-none">
                    <Label for="company">
                      Company <span className="red">*</span>
                    </Label>
                    <Input
                      type="company"
                      name="company"
                      id="company"
                      required
                      value={company ? company : ""}
                      onChange={(event) => setCompany(event.target.value)}
                      onBlur={(event) => setCompany(event.target.value)}
                      invalid={company === "" ? true : null}
                    />
                    {company === "" && (
                      <small className="red font-size-12">
                        This field is required
                      </small>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">
                      Email <span className="red">*</span>
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={email ? email : ""}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="sample@website.com"
                      onBlur={(event) => setEmail(event.target.value)}
                      invalid={email === "" ? true : null}
                    />
                    {email === "" && (
                      <small className="red font-size-12">
                        This field is required
                      </small>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="mobileNumber">
                      Mobile number <span className="red">*</span>
                    </Label>
                    <Input
                      type="phone"
                      name="mobileNumber"
                      id="mobileNumber"
                      required
                      value={mobileNumber ? mobileNumber : ""}
                      onChange={(event) => setMobileNumber(event.target.value)}
                      placeholder="e.g. 09171234567"
                      onBlur={(event) => setMobileNumber(event.target.value)}
                      invalid={
                        mobileNumber !== null &&
                        (mobileNumber === "" ||
                          mobileNumber
                            .toLowerCase()
                            .split("")
                            .filter((x) => !"1234567890".includes(x)).length >
                            0)
                          ? true
                          : null
                      }
                    />
                    {mobileNumber === "" ? (
                      <small className="red font-size-12">
                        This field is required
                      </small>
                    ) : mobileNumber !== null &&
                      mobileNumber
                        .toLowerCase()
                        .split("")
                        .filter((x) => !"1234567890".includes(x)).length > 0 ? (
                      <small className="red font-size-12">
                        Mobile number must not contain any letters.
                      </small>
                    ) : null}
                  </FormGroup>
                  <br />
                </>
              )}
              {paymentMethod === "card" && (
                <div className="border-top">
                  <br />
                  <p
                    className="margin-bottom-12"
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    <strong>Card details</strong>
                  </p>
                  <FormGroup>
                    <Label for="cardNumber">
                      Card number <span className="red">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="cardNumber"
                      id="cardNumber"
                      required
                      placeholder="16 digits"
                      value={cardNumber ? cardNumber : ""}
                      onChange={(event) => setCardNumber(event.target.value)}
                      onBlur={(event) => setCardNumber(event.target.value)}
                      invalid={cardNumber === "" ? true : null}
                    />
                    {cardNumber === "" && (
                      <small className="red font-size-12">
                        This field is required
                      </small>
                    )}
                  </FormGroup>
                  <Row className="align-items-baseline">
                    <Col sm={6} md={4}>
                      <FormGroup>
                        <Label for="expiryMonth">
                          Expiry month <span className="red">*</span>
                        </Label>
                        <CustomInput
                          type="select"
                          id="expiryMonth"
                          name="expiryMonth"
                          required
                          value={expiryMonth}
                          onChange={(event) =>
                            setExpiryMonth(event.target.value)
                          }
                        >
                          {monthOptions}
                        </CustomInput>
                      </FormGroup>
                    </Col>
                    <Col sm={6} md={4}>
                      <FormGroup>
                        <Label for="expiryYear">
                          Expiry year <span className="red">*</span>
                        </Label>
                        <CustomInput
                          type="select"
                          id="expiryYear"
                          name="expiryYear"
                          required
                          value={expiryYear}
                          onChange={(event) =>
                            setExpiryYear(event.target.value)
                          }
                        >
                          {yearOptions}
                        </CustomInput>
                      </FormGroup>
                    </Col>
                    <Col sm={6} md={4}>
                      <FormGroup>
                        <Label for="cvc">
                          CVC <span className="red">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="cvc"
                          id="cvc"
                          required
                          placeholder="3-digit code"
                          value={cvc ? cvc : ""}
                          onChange={(event) => setCvc(event.target.value)}
                          onBlur={(event) => setCvc(event.target.value)}
                          invalid={cvc === "" ? true : null}
                        />
                        {cvc === "" && (
                          <small className="red font-size-12">
                            This field is required
                          </small>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                </div>
              )}
              <Table className="border-bottom">
                <thead>
                  <tr>
                    <td className="font-weight-bolder">Tickets</td>
                    <td className="font-weight-bolder text-right">Quantity</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <small className="gray">Early Bird</small> <br />
                      <div>
                        <strong
                          style={{
                            fontSize: "20px",
                          }}
                          className="ticket-price"
                        >
                          PHP {numeral(earlyBirdPrice).format("0,0.00")}
                        </strong>{" "}
                        <small className="gray">/ USD $45 (18% off)</small>
                      </div>
                      <span
                        className="font-weight-normal d-block"
                        style={{
                          fontSize: "0.75rem",
                        }}
                      >
                        Regular Price:{" "}
                        <strike>PHP {numeral(2770).format("0,0.00")}</strike>
                      </span>
                    </td>
                    <td>
                      <Input
                        type="number"
                        style={{
                          width: "96px",
                        }}
                        className="ml-auto"
                        min="0"
                        value={earlyBirdQuantity}
                        onChange={(event) =>
                          setEarlyBirdQuantity(event.target.value)
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              {subtotal > 0 && (
                <FormGroup row>
                  <Label for="discountCode" className="px-4" sm={4}></Label>
                  <Col sm={7} className="ml-auto">
                    <Input
                      type="phone"
                      name="discountCode"
                      id="discountCode"
                      value={discountCode}
                      onChange={(event) => setDiscountCode(event.target.value)}
                      placeholder="Discount code (optional)"
                      style={{
                        fontSize: "14px",
                      }}
                      valid={discount !== 0 ? true : null}
                      invalid={
                        discount === 0 && discountCode !== "" ? true : null
                      }
                    />
                  </Col>
                </FormGroup>
              )}
              <Row
                className={`margin-top-32 px-2 ${
                  discount > 0 ? "" : "margin-bottom-12"
                }`}
              >
                <Col>
                  <p className="font-size-26 mb-0 gray">Subtotal</p>
                </Col>
                <Col>
                  <p className="font-size-26 mb-0 text-right">
                    PHP {numeral(subtotal).format("0,0.00")}
                  </p>
                </Col>
              </Row>
              {discount > 0 && (
                <Row className={`px-2 margin-bottom-12`}>
                  <Col>
                    <p className="font-size-26 mb-0 gray">{discountMessage}</p>
                  </Col>
                  <Col>
                    <p className="font-size-26 mb-0 text-right">
                      PHP -{numeral(discount).format("0,0.00")}
                    </p>
                  </Col>
                </Row>
              )}
              <Row className="margin-bottom-24 px-2" id="total-label">
                <Col>
                  <p className="font-size-24 mb-0 gray font-weight-bold">
                    Total
                  </p>
                </Col>
                <Col>
                  <p className="font-size-24 mb-0 text-right font-weight-bold">
                    PHP {numeral(total).format("0,0.00")}
                  </p>
                </Col>
              </Row>
              <FormGroup check inline className="px-2">
                <Label check>
                  <Input
                    checked={subscribed}
                    type="checkbox"
                    onChange={() => setSubscribed(!subscribed)}
                  />
                  <span>Send me emails about UXPH events and activities</span>
                </Label>
              </FormGroup>
            </Form>
            {error.filter((x) => x !== true).length > 0 && (
              <Alert color="danger">{error.filter((x) => x !== true)}</Alert>
            )}
            {paymentMethod === "bank" && coc}
          </div>
          <div className="border-0 d-flex justify-content-end mt-4">
            {paymentMethod === "bank" && (
              <Button
                className={!subtotal ? "disabled" : null}
                style={{
                  padding: "8px 16px",
                }}
                href={!subtotal ? null : bankTransferUrl}
                target="blank"
              >
                Checkout
              </Button>
            )}
            {paymentMethod === "gcash" && (
              <Button
                style={{
                  padding: "8px 16px",
                }}
                onClick={() =>
                  payWithGcash({
                    name: `${firstName} ${lastName}`,
                    company: company,
                    email: email,
                    phone: mobileNumber,
                    amount: total,
                    earlyBird: earlyBirdQuantity,
                    discountCode: discountCode,
                    paymentMethod: paymentMethod,
                    id: confirmNumber,
                  })
                }
              >
                Next
              </Button>
            )}
            {paymentMethod === "card" && (
              <Button
                style={{
                  padding: "8px 16px",
                }}
                onClick={() =>
                  payWithCard({
                    name: `${firstName} ${lastName}`,
                    company: company,
                    email: email,
                    phone: mobileNumber,
                    cardNumber: cardNumber,
                    expiryMonth: expiryMonth,
                    expiryYear: expiryYear,
                    cvc: cvc,
                    amount: total,
                    earlyBird: earlyBirdQuantity,
                    discountCode: discountCode,
                  })
                }
              >
                Next
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TicketForm;
