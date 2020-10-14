import React from "react";

const Form = () => {
  return (
    <section>
      <div
        className="wrapper"
        id="form-wrapper"
        style={{
          marginTop: "-250px",
        }}
      >
        <div className="shadow rounded">
          <iframe
            className="airtable-embed border-radius-8"
            src="https://airtable.com/embed/shrpCtPWfS4exUzdJ?backgroundColor=blue"
            width="100%"
            height="3000px"
            title="Speak at the UXPH Conference 2020"
            style={{
              background: "transparent",
              border: "none",
            }}
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Form;
