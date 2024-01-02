import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import img from '../../assets/images/images.png'

export default function Cart() {
const [cartDetails, setCartDetails] = useState(null)
const [IsLoading, setIsLoading] = useState(false)
  let {getLoggedUserCart,removeCart,updateQuantity,removeAll}=useContext(cartContext)

  async function getCart() {
   
 let response=  await getLoggedUserCart()
 if (response?.data?.status=="success") {
  setIsLoading(true)
  setCartDetails(response.data.data)
  setIsLoading(false)

 }
  }
  async function deleteItem(productId){
  
    let response=await removeCart(productId );

    setCartDetails(response.data.data);
 
    toast('The product was deleted successfully')

  }
  async function updateCart(productId,count){
  
    let response=await updateQuantity(productId,count );
 
     setCartDetails(response.data.data);
 
    toast(' product count updated ')

  }
  async function removeItems(){
    let response=await removeAll ( );
    setCartDetails(response.data.data);
 
    toast('All products were deleted successfully')

  }
  useEffect(()=>{
 
    getCart()
 
  },[])
  return <>

       
{cartDetails && IsLoading==false? <div className="bg-main-light p-4 my-4">
  
<div className='d-flex justify-content-between align-items-center border-bottom py-3'>
  <div>
  <h3>Shop Cart : </h3>
  <h6 className='text-main fw-bold'>Total Cart Price :{cartDetails.totalCartPrice} EGP</h6>
  </div>
  <div>
    <i><i onClick={removeItems} className="fa-shake fa-solid fa-trash deleteIcon"></i></i>
  </div>
</div>
  {cartDetails.products.map((product,index)=> <div key={index} className='row align-items-center border-bottom py-2' >
    <div className="col-md-1">
      <img src={product.product.imageCover} className='w-100' alt="" />
    </div>
    <div className="col-md-11 d-flex justify-content-between">
    <div>
        
    <h6>{product.product.title.split(' ').slice(0,2).join(' ')}</h6>
    <h6 className='text-main fw-bold'>Price : {product.price}</h6>
    <button onClick={()=>deleteItem(product.product._id)} className='btn m-0 p-0 '><i className='fa-regular fa-trash-can text-main fa-shake'></i> Remove</button>
    </div>
    <div className='d-flex align-items-center'>
      <button onClick={()=>updateCart(product.product._id,product.count+1)} className='btn border-main bt2-sm'>+</button>
      <span className='mx-2'>{product.count}</span>
      <button onClick={()=>updateCart(product.product._id,product.count-1)} className='btn border-main bt2-sm'>-</button>
    </div>
    </div>
   
  </div>)}
  <button className='btn bg-main mt-4 w-100'>
    <Link className='text-white' to={'/checkout'}>Checkout</Link>
  </button>
 </div>:

<div className='d-flex justify-content-center align-items-center mt-1 py-5'><span className="loader "></span></div>

}

  </>
}
