import React from "react";

const Button = ({
  children,
  href,
  variant = "",
  className = "",
  bgColor = "white",
  style = "",
  target = "self",
  onClick,
}) => {
  if (href) {
    return (
      <div className={`button-outer-layer ${className}`}>
        <a
          className={`button ${variant}`}
          href={href}
          style={{
            backgroundColor: bgColor,
            ...style,
          }}
          target={target}
        >
          <span>{children}</span>
        </a>
      </div>
    );
  } else {
    return (
      <div className={`button-outer-layer ${className}`}>
        <button
          className={`button ${variant}`}
          style={{
            backgroundColor: bgColor,
            ...style,
          }}
          target={target}
          onClick={onClick}
        >
          <span>{children}</span>
        </button>
      </div>
    );
  }
};

export default Button;
