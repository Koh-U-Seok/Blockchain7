import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "./src_assets/img1.jpg";
import img2 from "./src_assets/img2.jpg";
import img3 from "./src_assets/img3.jpg";
import img4 from "./src_assets/img4.jpg";
import img5 from "./src_assets/img5.jpg";
import img6 from "./src_assets/img6.jpg";
import img7 from "./src_assets/img7.jpg";

const MainBox = () => {
  let slides = document.querySelector(".main-slider-img"),
    slide = document.querySelectorAll(".main-slider-img li"),
    currentIdx = 1,
    slideCount = slide.length,
    slideWidth = 1920,
    slideMargin = 0,
    prevBtn = document.querySelector(".btn-left"),
    nextBtn = document.querySelector(".btn-right");

  makeClone();

  function makeClone() {
    for (let i = 0; i < slideCount; i++) {
      let cloneSlide = slide[i].cloneNode(true);
      cloneSlide.classList.add("clone");
      slides.appendChild(cloneSlide);
    }
    for (let i = slideCount - 1; i >= 0; i--) {
      let cloneSlide = slide[i].cloneNode(true);
      cloneSlide.classList.add("clone");
      slides.prepend(cloneSlide);
    }
    updateWidth();
    setInitialPos();

    setTimeout(function () {
      slides.classList.add("transition");
    }, 100);
  }

  function updateWidth() {
    let currentSlides = document.querySelectorAll(".prom-container li");
    let newSlideCount = currentSlides.length;
    let newWidth =
      (slideWidth + slideMargin) * newSlideCount - slideMargin + "px";
    slides.style.width = newWidth;
  }
  function setInitialPos() {
    let initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
    slides.style.transform = "translateX" + initialTranslateValue + "px";
  }

  nextBtn.addEventListener("click", function () {
    moveSlide(currentIdx + 1);
  });

  prevBtn.addEventListener("click", function () {
    moveSlide(currentIdx - 1);
  });
  // 이미지 슬라이드
  function moveSlide(num) {
    slides.style.left = -num * (slideWidth + slideMargin) + "px";
    currentIdx = num;
    if (currentIdx == slideCount || currentIdx == -slideCount) {
      setTimeout(function () {
        slides.classList.remove("transition");
        slides.style.left = "0px";
        currentIdx = 0;
      }, 300);
      setTimeout(function () {
        slides.classList.add("transition");
      }, 400);
    }
  }

  let slideImg = 0;

  slideImg = setInterval(reset, 3000);

  function reset() {
    moveSlide(currentIdx + 1);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
  };
  return (
    <div>
      <div id="main-slider">
        <div class="main-slider-img">
          <li>
            <img src={img1} alt="" />
          </li>
          <li>
            <img src={img2} alt="" />
          </li>
          <li>
            <img src={img3} alt="" />
          </li>
          <li>
            <img src={img4} alt="" />
          </li>
          <li>
            <img src={img5} alt="" />
          </li>
          <li>
            <img src={img6} alt="" />
          </li>
          <li>
            <img src={img7} alt="" />
          </li>
        </div>
        <div id="main-slider-btn">
          <div class="btn-inner">
            <div class="btn-left">
              <img src="/imges/angle-left-solid.svg" alt="left" />
            </div>
            <div class="btn-right">
              <img src="/imges/angle-right-solid.svg" alt="right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBox;
