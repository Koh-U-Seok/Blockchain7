import React from "react";
import img1 from "./src_assets/img1.jpg";
import img2 from "./src_assets/img2.jpg";
import img3 from "./src_assets/img3.jpg";
import img4 from "./src_assets/img4.jpg";
import img5 from "./src_assets/img5.jpg";
import img6 from "./src_assets/img6.jpg";
import img7 from "./src_assets/img7.jpg";
import img8 from "./src_assets/img8.jpg";
import img9 from "./src_assets/img9.jpg";
import img10 from "./src_assets/img10.jpg";
import img11 from "./src_assets/img11.jpg";
import img0 from "./src_assets/img0.jpg";

import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
function Slick() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const aaa = [
    { img: img0 },
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
    { img: img5 },
    { img: img6 },
    { img: img7 },
    { img: img8 },
    { img: img9 },
    { img: img10 },
    { img: img11 },
  ];
  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      data-interval={"true"}
      interval={3000}
    >
      {aaa.map((item, index) => {
        return (
          <Carousel.Item>
            <img
              className="d-block w-100"
              // src={img1}
              key={`img${index}`}
              src={aaa[index].img}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default Slick;
