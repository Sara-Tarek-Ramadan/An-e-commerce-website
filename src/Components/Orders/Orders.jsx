
import styles from './Orders.module.css'
import React, {useEffect, useState } from 'react'
import axios from 'axios';
export default function Orders({userData}) {
const [AllOrder, setAllOrder] = useState(null);
const [IsLoading, setIsLoading] = useState(false)
const UserId = localStorage.getItem("currentUserId")
  async function getAllOrder(){

    try{
      setIsLoading(true)
const {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${UserId}`)
  setAllOrder(data)
  setIsLoading(false)


}catch (error){
  setIsLoading(false)

console.log('Err',error);
    }
  } 

useEffect(()=>{
  getAllOrder()
},[])
 
  return <>
 

{AllOrder!=null? <div className="container py-4"> 
   <div className="row ">
    {AllOrder.map((order,index)=><div key={index} className=" bg-main-light border-main my-4 col-md-12 py-2 d-flex justify-content-between">
      <div className="order d-flex align-items-center px-2  w-100">
        <div>
        <h4 > <span className='text-main'>Total price: </span> {order.totalOrderPrice} EGP</h4>
        <h4><span className='text-main'> Payment Method :</span>{order.paymentMethodType}</h4>
        <p><span className='text-main'> This order was delivered to</span> {order.shippingAddress.city} <span className='text-main'> with this number :</span> {order.shippingAddress.phone}</p>
    
        </div>
      </div>
      <div className="right">
        <div className="row d-flex justify-content-center">
          {order.cartItems.map((item,indx)=> <div key={indx} className='col-md-6 my-2 '>
          <div className="text-center">
          <img height={200} className='w-100' src={item.product.imageCover} alt="" />
          <h5><span className='text-main'> Count:</span>{item.count}</h5>
          <h5><span className='text-main'>price: </span> {item.price}EGP</h5>
          </div>
          </div>)}
         
        </div>
     
      </div>
    </div>)} 
  </div> 
</div> :  <div className='d-flex justify-content-center align-items-center my-5 py-5'><span className="loader "></span></div>}

 
  </>
}
