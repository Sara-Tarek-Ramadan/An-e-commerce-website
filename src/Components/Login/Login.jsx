import React, { useState } from 'react';
import styles from './Login.module.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function Login({saveUserData}) {
 const [isLoading, setIsLoading] = useState(false);
 const [messageError, setMessageError] = useState('');
let navigate=useNavigate()
 async function handelLogin(value){
  setIsLoading(true)
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,value).catch((errr)=>{
    setIsLoading(false)
    setMessageError(`${errr.response.data.message}`)
    })
  if(data.message=='success'){
   localStorage.setItem('userToken',data.token);
   saveUserData();
    setIsLoading(false)
    toast('Welcome Back!')
    navigate('/')
   
  }
  }
  let validationSchema=Yup.object({
    email:Yup.string().required('email is required').email('email is invalid'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/,'password must start with upperCase'),
  })
let formik=  useFormik({
initialValues:{
  email:'',
  password:'',
},
validationSchema
,
onSubmit:handelLogin
})
  return <>
  <div className="w-75 mx-auto py-4">
    <h3>Login Now :</h3>
    {messageError.length>0? <div className="alert alert-danger">
      {messageError}
    </div>:null}
   
    <form onSubmit={formik.handleSubmit}>

    <label htmlFor="email">Email :</label>
    <input className='form-control mb-2' type="email"  name='email' id='name' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    {formik.errors.email && formik.touched.email?  <div className="alert alert-danger">{formik.errors.email}</div>:null}

    <label htmlFor="password">Password :</label>
    <input className='form-control mb-2' type="password"  name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
     {formik.errors.password && formik.touched.password?  <div className="alert alert-danger">{formik.errors.password}</div>:null}

 
     {isLoading?<button  type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>:  <button disabled={!(formik.isValid&&formik.dirty)} type='submit' className='btn bg-main text-white'>Login</button>}
     <p className='my-3'>New to freshCart ? <Link to="/register">Sign Up</Link></p>
    </form>

  </div>

  </>
}
