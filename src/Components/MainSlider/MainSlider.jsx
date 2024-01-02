import React from 'react'
import styles from './MainSlider.module.css';
import Slider from "react-slick";
import slider1 from"../../assets/images/slider-image-3.jpeg";
import slider2 from"../../assets/images/slider-image-2.jpeg";
import slider3 from"../../assets/images/slider-image-1.jpeg";
import slider4 from"../../assets/images/slider-2.jpeg";
import slider5 from"../../assets/images/grocery-banner-2.jpeg";
import slider6 from"../../assets/images/grocery-banner.png";
export default function MainSlider() {
  var settings = {
    dots:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    onSwipe:null
  };
  return <>
  <Slider className='cursor-pointer'   {...settings}>
  <img height={400} src={slider1} alt="" />
  <img height={400} src={slider2} alt="" />
  <img height={400} src={slider3} alt="" />
  <img height={400} src={slider4} alt="" />
  <img height={400} src={slider5} alt="" />
  <img height={400} src={slider6} alt="" />
    </Slider>
  </>
}
