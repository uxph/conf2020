import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/certificate/hero";
import Button from "../components/atoms/button";
import { jsPDF } from "jspdf";
// import InnerHTML from "dangerously-set-html-content";
// import $ from "jquery";

// PDF generator imports
// import blobStream from "blob-stream";
// import PDFDocument from "pdfkit";
// import SVGtoPDF from "svg-to-pdfkit";

const Certificate = () => {
  const [generate, setGenerate] = useState(false);

  useEffect(() => {
    if (generate) {
      const doc = new jsPDF("landscape");

      doc.text("Hello world!", 10, 10);
      doc.save("coa.pdf");
    }

    setGenerate(false);
  }, [generate, setGenerate]);

  return (
    <Layout>
      <SEO title="Certificate of Attendance" />
      <Hero />
      <section>
        <div className="wrapper">
          {/* This is where they'll download the certificate */}
          <Button onClick={() => setGenerate(true)}>Generate</Button>
        </div>
      </section>
    </Layout>
  );
};

export default Certificate;
