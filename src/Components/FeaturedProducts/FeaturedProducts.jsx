import React, { useContext, useEffect, useState } from 'react'
import styles from './FeaturedProducts.module.css'
import axios, { Axios } from 'axios'
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function FeaturedProducts() {

  let {addToCart,setNumOfCartItems,addToWish}=useContext(cartContext)
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
    console.log('====================================');
  
    console.log('====================================');
  }
  
async function addProductToCart(productId){

  
  let response=await addToCart(productId)
  if (response?.data?.status=="success") {
    setNumOfCartItems(response.data.numOfCartItems)
    toast.success(response.data.message) 
  }
else{
  toast.error('Sorry, the product was not added to the cart') 
}
  console.log(response);
}
  const [products, setProducts] = useState([]);
  const [IsLoading, setIsLoading] = useState(false)
async  function getProducts(){
  setIsLoading(true)
let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
setProducts(data.data);
setIsLoading(false)
  }
  useEffect(()=>{
    getProducts();
  },[])
  return <>
 
  <div className="row">
    {IsLoading?<div className='d-flex justify-content-center align-items-center mt-5'><span className="loader "></span></div>:<>
    
      {products.map((product)=> <div key={product._id} className="col-md-3 py-2 ">

<Link to={'/product-details/'+product._id}>
<div className="product px-2 cursor-pointer py-3 text-center">
 
  <img className='w-100' src={product.imageCover} alt="" />
  <span className='text-main fw-bold font-sm'>{product.category.name}</span>
  <h3 className='h6 fw-bolder py-1'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
  <div className="d-flex justify-content-between">
<span className='text-muted'>{product.price} EGP</span>
<span>
  <i className='fas fa-star rating-color '></i>{product.ratingsAverage}
</span>
  </div>

</div>
</Link>
<button onClick={()=>addProductToCart(product._id)  } className='btn bg-main text-white w-100'>+ Add</button>
  
    </div>
    
    )}
    </>}
   
  </div>
  <></>
  </>
}
