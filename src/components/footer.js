import React from "react";
import { Container } from "reactstrap";
import info from "../data/info.json";

const Footer = () => {
  return (
    <footer className="padding-y-96 padding-bottom-48">
      <Container>
        <img
          src={"/images/logos/uxph_conf_logo.png"}
          className="width-128 d-block mx-auto margin-top-96 margin-bottom-24"
          alt="UXPH Conference 2020"
        />
        <div className="margin-bottom-24 d-flex justify-content-center">
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
        <div className="margin-bottom-24 d-flex justify-content-center">
          <ul className="footer-nav d-inline-block">
            <li>
              <a href="/">FAQ</a>
            </li>
            <li className="delimiter">
              <span>●</span>
            </li>
            <li>
              <a href="/">Terms & Conditions</a>
            </li>
            <li className="delimiter">
              <span>●</span>
            </li>
            <li>
              <a href="/">Code of Conduct</a>
            </li>
            <li className="delimiter">
              <span>●</span>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>
        </div>
        <p className="gray text-center">&copy; 2020 UX Philippines</p>
      </Container>
    </footer>
  );
};

export default Footer;
