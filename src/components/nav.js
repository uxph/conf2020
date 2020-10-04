import React from "react";
import Button from "../components/atoms/button";

const Nav = ({ activeUrl = "/", theme }) => {
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
      <li key={key} className="nav-item">
        <a href={item.url} className={activeUrl === item.url ? "active" : null}>
          {item.name}
        </a>
      </li>
    );
  });

  return (
    <nav
      className={`shadow-sm ${theme}`}
      id="main-nav"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: 9000,
      }}
    >
      {activeUrl === "/" ? (
        <div className="wrapper">
          <div
            className={`d-flex align-items-center ${
              theme === "light"
                ? "justify-content-between"
                : "justify-content-center"
            }`}
          >
            <a href="/">
              <img
                src={"/images/logos/uxph_conf_logo_banner.svg"}
                className={`width-96 ${theme === "light" ? "" : "d-none"}`}
                alt="UXPH Conference 2020"
              />
            </a>
            <ul>
              {navItems}
              <li className="margin-left-16">
                <Button
                  href="/tickets"
                  style={{
                    padding: "0.75rem 1.2rem",
                  }}
                >
                  Get Tickets
                </Button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <div className={`d-flex align-items-center justify-content-between`}>
            <a href="/">
              <img
                src={"/images/logos/uxph_conf_logo_banner.svg"}
                className={`width-96`}
                alt="UXPH Conference 2020"
              />
            </a>
            <ul>
              {navItems}
              <li className="margin-left-16">
                <Button
                  href="/tickets"
                  style={{
                    padding: "0.75rem 1.2rem",
                  }}
                >
                  Get Tickets
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
