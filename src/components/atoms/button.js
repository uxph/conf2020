import React from "react";

const Button = ({
  children,
  href = "/",
  variant = "",
  className = "",
  bgColor = "white",
  style = "",
  target = "self",
}) => {
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
};

export default Button;
