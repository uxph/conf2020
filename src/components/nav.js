import React, { useState } from "react";
import Button from "../components/atoms/button";
import { Badge } from "reactstrap";

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
        <a
          href={item.url}
          className={`${activeUrl === item.url ? "active" : null}`}
          onClick={(e) => {
            if (item.comingSoon) {
              e.preventDefault();
            }
          }}
        >
          {item.name}
          {item.comingSoon && (
            <Badge color="secondary" className="ml-2">
              Soon
            </Badge>
          )}
        </a>
      </li>
    );
  });

  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <>
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
            {theme === "light" ? (
              <>
                <a
                  href="/"
                  onClick={(e) => {
                    setShowMobileNav(true);
                    e.preventDefault();
                  }}
                  id="menu-options"
                >
                  <img
                    src={`/images/icons/menu_options.svg`}
                    alt="menu options"
                    style={{
                      height: "30px",
                    }}
                  />
                </a>
                <a href="/">
                  <img
                    src={"/images/logos/uxph_conf_logo_banner.svg"}
                    className={`width-96 mobile-logo-banner`}
                    alt="UXPH Conference 2020"
                  />
                </a>
              </>
            ) : (
              <>
                <a
                  href="/"
                  onClick={(e) => {
                    setShowMobileNav(true);
                    e.preventDefault();
                  }}
                  id="menu-options"
                >
                  <img
                    src={`/images/icons/menu_options_white.svg`}
                    alt="menu options"
                    style={{
                      height: "30px",
                    }}
                  />
                </a>
                <a href="/">
                  <img
                    src={"/images/logos/uxph_conf_logo_banner.svg"}
                    className={`width-96 mobile-logo-banner`}
                    alt="UXPH Conference 2020"
                  />
                </a>
              </>
            )}
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
                  className={`width-96 logo-banner ${
                    theme === "light" ? "" : "d-none"
                  }`}
                  alt="UXPH Conference 2020"
                />
              </a>
              <ul>
                {navItems}
                <li className="margin-left-16">
                  <Button
                    className="disabled"
                    style={{
                      padding: "0.75rem 1.2rem",
                    }}
                  >
                    sold out
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="wrapper">
            {theme === "light" ? (
              <>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowMobileNav(true);
                  }}
                  id="menu-options"
                >
                  <img
                    src={`/images/icons/menu_options.svg`}
                    alt="menu options"
                    style={{
                      height: "30px",
                    }}
                  />
                </a>
                <a href="/">
                  <img
                    src={"/images/logos/uxph_conf_logo_banner.svg"}
                    className={`width-96 mobile-logo-banner`}
                    alt="UXPH Conference 2020"
                  />
                </a>
              </>
            ) : (
              <>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowMobileNav(true);
                  }}
                  id="menu-options"
                >
                  <img
                    src={`/images/icons/menu_options_white.svg`}
                    alt="menu options"
                    style={{
                      height: "30px",
                    }}
                  />
                </a>
                <a href="/">
                  <img
                    src={"/images/logos/uxph_conf_logo_banner.svg"}
                    className={`width-96 mobile-logo-banner`}
                    alt="UXPH Conference 2020"
                  />
                </a>
              </>
            )}
            <div
              className={`d-flex align-items-center justify-content-between`}
            >
              <a href="/">
                <img
                  src={"/images/logos/uxph_conf_logo_banner.svg"}
                  className={`width-96 logo-banner`}
                  alt="UXPH Conference 2020"
                />
              </a>
              <ul>
                {navItems}
                <li className="margin-left-16">
                  <Button
                    className="disabled"
                    style={{
                      padding: "0.75rem 1.2rem",
                    }}
                  >
                    sold out
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile navigation */}
      <nav
        className={`shadow-sm ${theme} ${showMobileNav ? "show" : ""}`}
        id="mobile-nav"
      >
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setShowMobileNav(false);
          }}
        >
          <img
            src={`/images/icons/close.svg`}
            alt="Close navigation"
            style={{
              position: "fixed",
              width: "24px",
              top: "32px",
              right: "32px",
            }}
          />
        </a>
        <div className="wrapper">
          <div>
            <a href="/">
              <img
                src={"/images/logos/uxph_conf_logo_banner.svg"}
                className={`width-96`}
                alt="UXPH Conference 2020"
              />
            </a>
            <ul>
              {navItems}
              <li className="margin-top-32">
                <Button
                  className="disabled"
                  style={{
                    padding: "0.75rem 1.2rem",
                  }}
                >
                  sold out
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
