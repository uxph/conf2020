import React from "react";

const Button = ({
  children,
  href = null,
  variant = "",
  className = "",
  innerClassName = "",
  bgColor = "white",
  style = "",
  target = null,
  onClick = null,
  id = "",
  value = null,
}) => {
  if (href === null) {
    return (
      <div className={`button-outer-layer ${className}`} id={id}>
        <button
          className={`button ${variant} ${innerClassName}`}
          style={{
            backgroundColor: bgColor,
            ...style,
          }}
          target={target}
          value={value}
          onClick={onClick}
        >
          <span>{children}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`button-outer-layer ${className}`}>
      <a
        className={`button ${variant} ${innerClassName}`}
        href={href}
        style={{
          backgroundColor: bgColor,
          ...style,
        }}
        target={target}
        onClick={onClick}
      >
        <span>{children}</span>
      </a>
    </div>
  );
};

export default Button;
