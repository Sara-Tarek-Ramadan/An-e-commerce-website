import React, { useState } from 'react';
import styles from './Register.module.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function Register() {
 const [isLoading, setIsLoading] = useState(false);
 const [messageError, setMessageError] = useState('');
let navigate=useNavigate()
 async function handelRegister(value){
  setIsLoading(true)
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,value).catch((errr)=>{
    setIsLoading(false)
    setMessageError(`${errr.response.data.message}`)
    })
  if(data.message=='success'){
   
    setIsLoading(false)
    toast('Register Successfully')
    navigate('/login')
   
  }
  }
  let validationSchema=Yup.object({
    name:Yup.string().required('name is required').min(3,'name minlength is 3').max(10,'name maxlength is 10'),
    email:Yup.string().required('email is required').email('email is invalid'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/,'password must start with upperCase'),
    rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')],'password and rePassword does not match'),
    phone:Yup.string().required('phone is required').matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/,'phone must be valid'),

  })
let formik=  useFormik({
initialValues:{
  name:'',
  email:'',
  phone:'',
  password:'',
  rePassword:''
},
validationSchema
,
onSubmit:handelRegister
})
  return <>
 
  <div className="w-75 mx-auto py-4">
    <h3>Register Now :</h3>
    {messageError.length>0? <div className="alert alert-danger">
      {messageError}
    </div>:null}
   
    <form onSubmit={formik.handleSubmit}>
    <label htmlFor="name">Name :</label>
    <input className='form-control mb-2' type="text"  name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
  {formik.errors.name && formik.touched.name?  <div className="alert alert-danger">{formik.errors.name}</div>:null}
 


    <label htmlFor="email">Email :</label>
    <input className='form-control mb-2' type="email"  name='email' id='name' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    {formik.errors.email && formik.touched.email?  <div className="alert alert-danger">{formik.errors.email}</div>:null}

    <label htmlFor="password">Password :</label>
    <input className='form-control mb-2' type="password"  name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
     {formik.errors.password && formik.touched.password?  <div className="alert alert-danger">{formik.errors.password}</div>:null}

    <label htmlFor="rePassword">RePassword :</label>
    <input className='form-control mb-2' type="password"  name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
     {formik.errors.rePassword && formik.touched.rePassword?  <div className="alert alert-danger">{formik.errors.rePassword}</div>:null}

    <label htmlFor="phone">Phone :</label>
    <input className='form-control mb-2' type="tel"  name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.phone && formik.touched.phone?  <div className="alert alert-danger">{formik.errors.phone}</div>:null}

     {isLoading?<button  type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>:  <button disabled={!(formik.isValid&&formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>}
     <p className='my-3'>Already have an account ? <Link to="/login">Sign in</Link></p>
    </form>
  </div>

  </>
}
