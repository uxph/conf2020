import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
import Button from "./button";
import numeral from "numeral";
import months from "months";
import discount_codes from "../../data/discounts.json";

// const public_key = "pk_live_BgwqPfGCXbdTYUnSJZwFGDLN";
// const secret_key = "sk_live_Rv7HynggLMRT4LT6RwFgPDww";
const auth_pk = "Basic cGtfbGl2ZV9CZ3dxUGZHQ1hiZFRZVW5TSlp3RkdETE46";
const auth_sk = "Basic c2tfbGl2ZV9SdjdIeW5nZ0xNUlQ0TFQ2UndGZ1BEd3c6";

const bankTransferUrl = "https://airtable.com/shrcKP2TQ6xjrYnHx";

const env = "local"; // TODO DO NOT FORGET TO CHANGE THIS
let url = null;
if (env === "test") {
  url = "https://loving-volhard-7197c7.netlify.app";
} else if (env === "production") {
  url = "https://2020.uxph.org";
} else if (env === "local") {
  url = "http://localhost:8000";
}

const PaymentModal = ({ isOpen, toggle }) => {
  // getting the list of payments
  const [paymentList, setPaymentList] = useState(null);
  const fetchAllPayments = () => {
    const data = null;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        const responseText = JSON.parse(this.responseText);
        console.log("fetchAllPayments", responseText);
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
  const superEarlyBirdPrice = 2250;
  const [superEarlyBirdQuantity, setSuperEarlyBirdQuantity] = useState(1);

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
  let total = subtotal - discount >= 0 ? subtotal - discount : 0;

  // Basic info
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [company, setCompany] = useState(null);
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

  // useEffect for ticket pricing calculations
  useEffect(() => {
    let superEarlyBirdTotal = superEarlyBirdQuantity * superEarlyBirdPrice;
    setSubtotal(superEarlyBirdTotal);

    if (!subtotal) {
      setDiscountCode("");
      setDiscount(0);
    }
  }, [superEarlyBirdQuantity, setSuperEarlyBirdQuantity, subtotal]);

  // useEffect for discount codes
  useEffect(() => {
    const lowerCasedCode = discountCode.toLowerCase();
    // secret code
    if (lowerCasedCode === "uxcult100") {
      setDiscount(subtotal - 100);
    }

    // matched code
    else if (discount_codes[lowerCasedCode]) {
      if (discount_codes[lowerCasedCode].percent) {
        setDiscount(subtotal * discount_codes[lowerCasedCode].percent);
      } else {
        setDiscount(discount_codes[lowerCasedCode].solid);
      }
    }

    // invalid code
    else {
      setDiscount(0);
    }
  }, [discountCode, subtotal]);

  // useEffect for checkout URL
  useEffect(() => {
    setCheckoutUrl(null);
  }, [subtotal]);

  // useEffect for modal open/close
  useEffect(() => {
    if (!isOpen) {
      fetchAllPayments(); // initial fetching of all payments
      setError([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (confirmNumber) {
      localStorage.setItem("uxph_2020_confirm_number", confirmNumber);
      console.log(
        "uxph_2020_confirm_number",
        localStorage.getItem("uxph_2020_confirm_number")
      );
    }
  }, [confirmNumber]);

  // error handling logic
  const errorChecking = () => {
    let errorList = [];
    setError([]);
    if (firstName === null || firstName === "") {
      errorList.push(
        <small key="firstName" className="d-block">
          <strong>First name</strong> is required.
        </small>
      );
    }

    if (lastName === null || lastName === "") {
      errorList.push(
        <small key="lastName" className="d-block">
          <strong>Last name</strong> is required.
        </small>
      );
    }

    if (company === null || company === "") {
      errorList.push(
        <small key="company" className="d-block">
          <strong>Company</strong> is required.
        </small>
      );
    }

    if (email === null || email === "") {
      errorList.push(
        <small key="email" className="d-block">
          <strong>Email</strong> is required.
        </small>
      );
    }

    if (mobileNumber === null || mobileNumber === "") {
      errorList.push(
        <small key="mobileNumber" className="d-block">
          <strong>Mobile number</strong> is required.
        </small>
      );
    } else if (mobileNumber.length !== 11) {
      errorList.push(
        <small key="mobileNumber" className="d-block">
          <strong>Mobile number</strong> must be 11 digits.
        </small>
      );
    } else if (mobileNumber.substring(0, 2) !== "09") {
      errorList.push(
        <small key="mobileNumber" className="d-block">
          <strong>Mobile number</strong> must start with "09".
        </small>
      );
    }

    if (paymentMethod === "card") {
      if (cardNumber === null || cardNumber === "") {
        errorList.push(
          <small key="cardNumber" className="d-block">
            <strong>Card number</strong> is required.
          </small>
        );
      }

      if (cvc === null || cvc === "") {
        errorList.push(
          <small key="cvc" className="d-block">
            <strong>CVC</strong> is required.
          </small>
        );
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
      }&super_early_bird=${details.superEarlyBird}`;

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
          console.log(responseText);
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
    }
  };

  // Paymongo API for paying with credit/debit card
  const payWithCard = (details) => {
    // Creating payment intent
    const createPaymentIntent = () => {
      const tickets = [
        {
          name: "super_early_bird",
          quantity: details.superEarlyBird,
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
            }, company: ${company}, ${tickets}}`,
          },
        },
      });

      const xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          const responseText = JSON.parse(this.responseText);
          console.log("Create paymentIntent", responseText);

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
          console.log("Create paymentMethod", responseText);

          if (responseText.data) {
            setPaymentMethodId(responseText.data.id);
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
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      style={{
        zIndex: 9999,
        marginBottom: "115px",
      }}
      id="payment-modal"
    >
      <ModalHeader toggle={toggle} className="border-0">
        {(checkoutUrl && paymentMethod === "gcash") ||
        (paymentIntentId && paymentMethodId && paymentMethod === "card") ? (
          <span
            style={{
              fontSize: "1rem",
            }}
          >
            Review your information
          </span>
        ) : (
          <>
            Buy tickets{" "}
            <span className="d-none">
              {paymentList ? paymentList.length : null}
            </span>
          </>
        )}
      </ModalHeader>
      {checkoutUrl && paymentMethod === "gcash" ? (
        <>
          {/* GCash payment instructions */}
          <ModalBody id="modal-body">
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
                    <small className="gray">Super early bird</small> <br />
                  </td>
                  <td className="text-right">x {superEarlyBirdQuantity}</td>
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
          </ModalBody>
          <ModalFooter className="border-0 direction">
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
          </ModalFooter>
        </>
      ) : paymentIntentId && paymentMethodId && paymentMethod === "card" ? (
        <>
          {/* Credit/Debit card payment instructions */}
          <ModalBody id="modal-body">
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
                    <small className="gray">Super early bird</small> <br />
                  </td>
                  <td className="text-right">x {superEarlyBirdQuantity}</td>
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
          </ModalBody>
          <ModalFooter className="border-0 direction">
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
              href={`${url}/confirmation/?method=${paymentMethod}&payment_intent=${paymentIntentId}&payment_method=${paymentMethodId}&client=${clientKey}`}
            >
              Place Order
            </Button>
          </ModalFooter>
        </>
      ) : (
        <>
          {/* Payment details */}
          <ModalBody id="modal-body">
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
                        amount the account details below:
                        <br />
                        <br />
                        <strong>Bank:</strong> Unionbank of the Philippines
                        <br />
                        <strong>Account Name:</strong> Janyl Tamayo
                        <br />
                        <strong>Account number:</strong> 1094 2245 4557
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
                          value={firstName ? firstName : ""}
                          onChange={(event) => setFirstName(event.target.value)}
                        />
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
                          value={lastName ? lastName : ""}
                          onChange={(event) => setLastName(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
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
                    />
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
                    />
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
                    />
                  </FormGroup>
                  <br />
                </>
              )}
              {paymentMethod === "card" && (
                <div className="border-top">
                  <br />
                  <FormGroup>
                    <Label for="cardNumber">
                      Card number <span className="red">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="cardNumber"
                      id="cardNumber"
                      required
                      value={cardNumber ? cardNumber : ""}
                      onChange={(event) => setCardNumber(event.target.value)}
                    />
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
                          value={cvc ? cvc : ""}
                          onChange={(event) => setCvc(event.target.value)}
                        />
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
                      <small className="gray">Super early bird</small> <br />
                      <strong
                        style={{
                          fontSize: "20px",
                        }}
                        className="ticket-price"
                      >
                        PHP {numeral(superEarlyBirdPrice).format("0,0.00")}
                      </strong>
                    </td>
                    <td>
                      <Input
                        type="number"
                        style={{
                          width: "96px",
                        }}
                        className="ml-auto"
                        min="0"
                        value={superEarlyBirdQuantity}
                        onChange={(event) =>
                          setSuperEarlyBirdQuantity(event.target.value)
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
              <Row className={`margin-top-32 px-2 margin-bottom-12`}>
                <Col>
                  <p className="font-size-26 mb-0 gray">Subtotal</p>
                </Col>
                <Col>
                  {discount <= 0 ? (
                    <p className="font-size-26 mb-0 text-right">
                      PHP {numeral(subtotal).format("0,0.00")}
                    </p>
                  ) : (
                    <p className="font-size-26 mb-0 text-right">
                      PHP {numeral(subtotal).format("0,0.00")}
                    </p>
                  )}
                </Col>
              </Row>
              <Row className="margin-bottom-24 px-2" id="total-label">
                <Col md={3}>
                  <p className="font-size-24 mb-0 gray font-weight-bold">
                    Total
                  </p>
                </Col>
                <Col md={9}>
                  <p className="font-size-24 mb-0 text-right font-weight-bold">
                    <span
                      className="font-weight-normal d-block"
                      style={{
                        fontSize: "0.875rem",
                      }}
                    >
                      Regular Price:{" "}
                      <strike>PHP {numeral(2770).format("0,0.00")}</strike>
                    </span>
                    PHP {numeral(total).format("0,0.00")}
                  </p>
                </Col>
              </Row>
            </Form>
            {error.length > 0 && <Alert color="danger">{error}</Alert>}
          </ModalBody>
          <ModalFooter className="border-0">
            <Button
              variant="outline"
              onClick={toggle}
              style={{
                padding: "8px 16px",
              }}
            >
              Cancel
            </Button>
            {paymentMethod === "bank" && (
              <Button
                className={!subtotal ? "disabled" : null}
                style={{
                  padding: "8px 16px",
                }}
                href={!subtotal ? null : bankTransferUrl}
                target="blank"
                // onClick={toggle}
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
                    superEarlyBird: superEarlyBirdQuantity,
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
                    superEarlyBird: superEarlyBirdQuantity,
                    discountCode: discountCode,
                  })
                }
              >
                Next
              </Button>
            )}
          </ModalFooter>
        </>
      )}
    </Modal>
  );
};

export default PaymentModal;
