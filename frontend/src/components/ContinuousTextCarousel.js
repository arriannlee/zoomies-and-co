import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const ContinuousTextCarousel = () => {
  const textItems = [
    'Free Delivery on all orders over £30',
    'Simple Returns - No Quibble 30 Day Refund Policy',
    "5 star service - Independently rated as 'Excellent' by customers worldwide",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the active index to show the next text item
      setActiveIndex((prevIndex) => (prevIndex + 1) % textItems.length);
    }, 4500); // Change the interval duration (in milliseconds) as needed

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [textItems]);

  return (
    <Carousel
      interval={null}
      activeIndex={activeIndex}
      className="carouselFade"
    >
      {textItems.map((item, index) => (
        <Carousel.Item key={index} className="carouselItem">
          <h5 className="carouselText">{item}</h5>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ContinuousTextCarousel;
