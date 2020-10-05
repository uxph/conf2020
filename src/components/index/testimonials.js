import React, { useState } from "react";
import {
  Card,
  CardBody,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselControl,
} from "reactstrap";
import testimonies from "../../data/testimonies.json";

const testimonials = [[], [], [], []];

testimonies.forEach((test, index) => {
  testimonials[index % 4].push(
    <Card
      className="border-0 shadow margin-bottom-32 mx-auto card"
      key={index}
      style={{
        alignSelf: "flex-start",
      }}
    >
      <CardBody>
        <p className="testimonial margin-bottom-16">
          <em>"{test.body}"</em>
        </p>
      </CardBody>
    </Card>
  );
});

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const items = testimonials.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {item}
        </div>
      </CarouselItem>
    );
  });
  return (
    <section
      className="testimonials-section padding-top-192 padding-bottom-128"
      data-aos="fade-up"
      data-aos-offset={200}
      data-aos-once={true}
    >
      <h2 className="text-center margin-bottom-64 text-uppercase font-size-32">
        Why do people love UXPH Conf?
      </h2>
      <div className="wrapper">
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {items}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
            style={{
              backgroundColor: `red`,
              color: `red`,
            }}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
      </div>
    </section>
  );
};
export default Testimonials;
