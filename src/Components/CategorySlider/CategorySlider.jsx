import React, { useEffect, useState } from 'react'
import styles from './CategorySlider.module.css'
import Slider from "react-slick";
import axios from 'axios';
export default function CategorySlider() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true
  };
  const [Category, setCategory] = useState([])
  async  function getCategory(){
  let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  setCategory(data.data)
    }
    useEffect(()=>{
      getCategory();
    },[])  
  return <>

      
  <h3>Shop Popular Category</h3>
  <Slider autoplaySpeed={700} className='text-center' {...settings}>
  {Category.map((category)=><div key={category._id}>
    <img height={200} className='w-100 cursor-pointer' src={category.image} alt="" />
    {/* <h6>{category.name}</h6> */}
  </div>)}
    </Slider>
  </>
}
