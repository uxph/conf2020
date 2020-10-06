import React from "react";

import Card from "../atoms/card";
import Button from "../atoms/button";
import { Container } from "reactstrap";

// const useMediaQuery = (query) => {
//   const mediaMatch = window.matchMedia(query);
//   const [matches, setMatches] = useState(mediaMatch.matches);

//   useEffect(() => setMatches(mediaMatch.matches), [mediaMatch.matches]);

//   return matches;
// };

const Hero = () => {
  // const isDesktop = useMediaQuery("(min-width: 551px)");
  // const styles = {
  //   container: (isMobile) => ({
  //     width: isMobile ? "575px" : "90%",
  //     marginBottom: "-300px",
  //   }),
  // };

  return (
    <section
      className="padding-top-128 padding-bottom-256 text-center about-hero"
      data-aos="fade"
      data-aos-duration={500}
      data-aos-once={true}
    >
      <Container className="margin-x-64">
        <div>
          <img
            src={"/images/logos/headline.svg"}
            alt="Growth Beyond Borders"
            id="headline"
            className="width-512 margin-bottom-32"
          />
        </div>
        <h1 className="font-size-32 text-white margin-bottom-24">
          About the Conference
        </h1>
        <p className="margin-bottom-64 text-white">
          We designers are at the forefront of digital transformation <br />
          and inciting positive change that lasts.
        </p>
      </Container>
      <Card id="about-cta">
        <p className="margin-bottom-24">
          Join UXPH as we grow beyond our borders in a weekend packed with
          learning, inspiration, and collaboration–all within the comfort of
          your own screen.
        </p>
        <Button
          href="/tickets"
          style={{
            padding: "0.5rem 1.5rem",
          }}
        >
          Get Tickets
        </Button>
      </Card>
    </section>
  );
};

export default Hero;
