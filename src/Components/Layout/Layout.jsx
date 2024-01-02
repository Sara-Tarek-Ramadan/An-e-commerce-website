import React from 'react'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout({userData,clearUserData}) {
  return <>
 <div className='  mt-5'>
 <Navbar clearUserData={clearUserData} userData={userData}/>
<div className="container">
<Outlet/>
</div>
  <Footer/>

 </div>
  </>
}
