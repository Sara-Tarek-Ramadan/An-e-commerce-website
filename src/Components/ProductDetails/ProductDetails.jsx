import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
export default function ProductDetails() {
  const [IsLoading, setIsLoading] = useState(false)
let {id}=useParams();
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay:true

};


const [product, setProduct] = useState([])
let {addToCart,addToWish}=useContext(cartContext)
  
async function addProductToCart(productId){
  
  let response=await addToCart(productId)
  if (response?.data?.status=="success") {
    toast.success(response.data.message) 
  }
else{
  toast.error('Sorry, the product was not added to the cart') 
}
  console.log(response);
}
async function addProductToWishlist(productId){

  
  let response=await addToWish(productId)
  if (response?.data?.status=="success") {
    // setNumOfCartItems(response.data.numOfCartItems)
    toast.success(response.data.message) 
  }
else{
  toast.error('Sorry, the product was not added to the wishlist') 
}
  console.log(response);
}

async  function getProduct(){
  setIsLoading(true)
let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
setProduct(data.data)

setIsLoading(false)
  }
  useEffect(()=>{
    getProduct();
  },[])
  return <>
  
  <div className="container">
   <div className="row mt-5">
   
   {IsLoading? <div className='d-flex justify-content-center align-items-center mt-5'><span className="loader "></span></div>:<>
<div className="col-md-4">
<Slider  autoplaySpeed={1000} className='text-center' {...settings}>
{product?.images?.map((img,index)=> <img key={index} className='w-75 py-5 cursor-pointer' src={img}/>)}
</Slider>

{/* <img className='w-75 py-5' src={product.imageCover} alt="" /> */}

</div>
<div className="col-md-8  mt-5 pt-5  ">
 <div className="div align-bottom">
 <h3 className='fw-bolder'>{product.title}</h3>
  <p className='text-muted'>{product.description}</p>
 
  <div className='d-flex  justify-content-between mt-2'>
      <p>{product.price} EGP</p>
  <span>
<i className='fas fa-star rating-color '></i>{product.ratingsAverage}
</span>

  </div>
  <div className='  '>
<i onClick={()=>addProductToWishlist(product._id)} className="fa-regular fa-heart fa-lg  "></i>
  
  </div>

  <button onClick={()=>addProductToCart(product._id)  } className='btn bg-main text-white w-100 '>+ add to cart</button></div> 
</div>
</>}
   
   </div>
   
  </div>
  
  </>
}

