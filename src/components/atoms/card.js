import React from "react";
import { Card as ReactStrapCard } from "reactstrap";

const Card = ({ children, className = "", style = "" }) => {
  return (
    <ReactStrapCard
      className={`card-outer-layer hero-card shadow border-0 ${className}`}
      style={style}
    >
      <div className="bg-white padding-y-32 padding-x-32 border-radius-4">
        <div className="line-height-32">{children}</div>
      </div>
    </ReactStrapCard>
  );
};

export default Card;
