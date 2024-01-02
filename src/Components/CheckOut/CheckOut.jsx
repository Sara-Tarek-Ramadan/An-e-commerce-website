import React, { useContext, useState } from 'react'
import styles from './CheckOut.module.css'
import { useFormik } from 'formik'
import { cartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
export default function CheckOut() {
   
  let {onlinePayment,cartId}=useContext(cartContext)

  async function handelSubmit(values){
 
let response=await onlinePayment(cartId,values);

if(response?.data?.status=='success'){
  console.log(response);
  
  window.location.href=response.data.session.url
  console.log(response);
}
else{
  console.log('error');
 }

  }
  let formik=useFormik({ 
    initialValues:{
      details:"",
      city:"",
      phone:''
    },
    onSubmit:handelSubmit
  })
  return <>
  <div className="bg-main-light my-5">
    
 <div className="w-50 py-5 mx-auto">

<form  onSubmit={formik.handleSubmit}>
  <label htmlFor="details">details:</label>
  <input type="text" className='form-control mb-3' value={formik.values.details} onChange={formik.handleChange} name='details' id='details'/>

  <label htmlFor="city">city:</label>
  <input type="text" className='form-control mb-3' value={formik.values.city} onChange={formik.handleChange} name='city' id='city'/>

  <label htmlFor="phone">phone:</label>
  <input type="tel" className='form-control mb-3' value={formik.values.phone} onChange={formik.handleChange} name='phone' id='phone'/>

<button type='submit' className='border-main btn w-100'>Pay With Cart</button>

</form>
</div>
  </div>
  </>
}
