import React from "react";
import Button from "../components/atoms/button";

const Nav = (props) => {
  let navClass = props.isHomePage ? "home-nav" : "";
  return (
    <nav className={navClass}>
      <div className="wrapper">
        <div className="d-flex justify-content-between align-items-center">
          <a href="/">
            <img
              src={"/images/logos/uxph_conf_logo.svg"}
              className="width-64"
              alt="UXPH Conference 2020"
            />
          </a>
          <ul>
            <li>Home</li>
            <li>Schedule</li>
            <li>Sponsors</li>
            <li>About</li>
            <li>FAQ</li>
            <li>
              <Button
                style={{
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                }}
              >
                Get Tickets
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
