import React from "react";
import Button from "../components/atoms/button";

const Nav = ({ activeUrl }) => {
  // let navClass = props.isHomePage ? "home-nav" : "";
  const nav_items = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Schedule",
      url: "/schedule",
    },
    {
      name: "Sponsors",
      url: "/sponsors",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "FAQ",
      url: "/faq",
    },
  ];
  const navItems = nav_items.map((item, key) => {
    return (
      <li>
        <a href={item.url} className={activeUrl === item.url ? "active" : null}>
          {item.name}
        </a>
      </li>
    );
  });

  return (
    <nav
      className="bg-white shadow-sm"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "9999",
      }}
    >
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
            {navItems}
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
