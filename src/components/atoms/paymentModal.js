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
} from "reactstrap";
import Button from "./button";
import numeral from "numeral";
import discount_codes from "../../data/discounts.json";

// const public_key = "pk_live_BgwqPfGCXbdTYUnSJZwFGDLN";
// const secret_key = "sk_live_Rv7HynggLMRT4LT6RwFgPDww";
const auth_pk = "Basic cGtfbGl2ZV9CZ3dxUGZHQ1hiZFRZVW5TSlp3RkdETE46";
// const auth_sk = "Basic c2tfbGl2ZV9SdjdIeW5nZ0xNUlQ0TFQ2UndGZ1BEd3c6";

const bankTransferUrl = "https://airtable.com/shrcKP2TQ6xjrYnHx";

const PaymentModal = ({ isOpen, toggle }) => {
  const earlyBirdPrice = 2000;
  const [earlyBirdQuantity, setEarlyBirdQuantity] = useState(1);

  const [paymentMethod, setPaymentMethod] = useState("gcash");

  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [confirmNumber, setConfirmNumber] = useState(null);

  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  let total = subtotal - discount >= 0 ? subtotal - discount : 0;

  const [invalid, setInvalid] = useState(false);

  // Basic info
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);

  // Bank details
  // const [cardNumber, setCardNumber] = useState(null);
  // const [expiryMonth, setExpiryMonth] = useState(null);
  // const [expiryYear, setExpiryYear] = useState(null);
  // const [cvc, setCvc] = useState(null);

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

  useEffect(() => {
    let earlyBirdTotal = earlyBirdQuantity * earlyBirdPrice;
    setSubtotal(earlyBirdTotal);

    if (!subtotal) {
      setDiscountCode("");
      setDiscount(0);
    }
  }, [earlyBirdQuantity, setEarlyBirdQuantity, subtotal]);

  useEffect(() => {
    if (discount_codes[discountCode]) {
      setDiscount(subtotal * discount_codes[discountCode].percent);
    } else {
      setDiscount(0);
    }
  }, [discountCode, subtotal]);

  useEffect(() => {
    setCheckoutUrl(null);
  }, [subtotal]);

  const payWithGcash = (details) => {
    // parseInt(details.amount) * 100
    const successUrl = `http://localhost:8000/confirmation/?amount=${
      parseInt(details.amount) * 100
    }&discount_code=${details.discountCode}&early_bird=${details.earlyBird}`;

    const data = JSON.stringify({
      data: {
        attributes: {
          amount: parseInt(details.amount) * 100, // parseInt(details.amount) * 100
          redirect: {
            success: successUrl,
            failed: "http://localhost:8000/payment-error",
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
        } else {
          setInvalid(true);
        }
      }
    });

    xhr.open("POST", "https://api.paymongo.com/v1/sources");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("authorization", auth_pk);

    xhr.send(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      style={{
        zIndex: 9999,
      }}
      id="payment-modal"
    >
      <ModalHeader toggle={toggle} className="border-0">
        Buy tickets
      </ModalHeader>
      {checkoutUrl && paymentMethod === "gcash" ? (
        <>
          <ModalBody id="modal-body">
            <p
              className="font-weight-bold"
              style={{
                fontSize: "1.125rem",
              }}
            >
              Paying with GCash
            </p>
            <ol>
              <li>
                To proceed with your payment through GCash,{" "}
                <a href={checkoutUrl} target="blank">
                  Click here
                </a>
                .
              </li>
              <li>
                After the payment, fill in your{" "}
                <strong>confirmation number</strong> in our confirmation page:
              </li>
            </ol>
            <div className="px-3 py-2 mt-3 rounded bg-light border border-secondary">
              <p className="m-0 text-secondary">{confirmNumber}</p>
            </div>
          </ModalBody>
          <ModalFooter className="border-0">
            <Button
              variant="outline"
              onClick={toggle}
              style={{
                padding: "8px 16px",
              }}
            >
              Finish
            </Button>
          </ModalFooter>
        </>
      ) : (
        <>
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
                    <p>
                      You make bayad appropriate amount of pera with bank
                      details found sa baba. Tapos, make visit this link and
                      upload proof of payment para we give you ticket:{" "}
                      <a href={bankTransferUrl} traget="blank">
                        {bankTransferUrl}
                      </a>
                    </p>
                    <p className="m-0">
                      <strong>Account name:</strong> Janyl Tamayo <br />
                      <strong>Account number:</strong> 1094 2245 4557
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
                          onChange={(event) => setLastName(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for="email">
                      Email <span className="red">*</span>
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      required
                      onChange={(event) => setEmail(event.target.value)}
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
                      onChange={(event) => setMobileNumber(event.target.value)}
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
                    />
                  </FormGroup>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="expiryMonth">
                          Expiry month <span className="red">*</span>
                        </Label>
                        <CustomInput
                          type="select"
                          id="expiryMonth"
                          name="expiryMonth"
                          required
                        >
                          {monthOptions}
                        </CustomInput>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="expiryYear">
                          Expiry year <span className="red">*</span>
                        </Label>
                        <CustomInput
                          type="select"
                          id="expiryMonth"
                          name="expiryMonth"
                          required
                        >
                          {yearOptions}
                        </CustomInput>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="cvc">
                          CVC <span className="red">*</span>
                        </Label>
                        <Input type="text" name="cvc" id="cvc" required />
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
                      >
                        PHP {numeral(earlyBirdPrice).format("0,0.00")}
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
                    />
                  </Col>
                </FormGroup>
              )}

              <Row className="margin-top-32 px-2">
                <Col>
                  <p className="font-size-26 mb-0 gray">Subtotal</p>
                </Col>
                <Col>
                  <p className="font-size-26 mb-0 text-right">
                    PHP {numeral(subtotal).format("0,0.00")}
                  </p>
                </Col>
              </Row>
              <Row className="margin-bottom-12 px-2">
                <Col>
                  <p className="font-size-26 mb-0 gray">Discount price</p>
                </Col>
                <Col>
                  <p className="font-size-26 mb-0 text-right gray">
                    PHP {discount > 0 ? "-" : ""}
                    {numeral(discount).format("0,0.00")}
                  </p>
                </Col>
              </Row>
              <Row className="margin-top-32 margin-bottom-24 px-2">
                <Col>
                  <p className="font-size-24 mb-0 gray">Total</p>
                </Col>
                <Col>
                  <p className="font-size-24 mb-0 text-right">
                    PHP {numeral(total).format("0,0.00")}
                  </p>
                </Col>
              </Row>
            </Form>
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
              >
                Checkout
              </Button>
            )}
            {paymentMethod === "gcash" && (
              <Button
                className={invalid ? "disabled" : null}
                style={{
                  padding: "8px 16px",
                }}
                onClick={() =>
                  payWithGcash({
                    name: `${firstName} ${lastName}`,
                    email: email,
                    phone: mobileNumber,
                    amount: total,
                    earlyBird: earlyBirdQuantity,
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
