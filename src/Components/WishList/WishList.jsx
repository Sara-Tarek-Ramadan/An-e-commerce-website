import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import img from '../../assets/images/empty-wishlist.png';
import { Link } from 'react-router-dom';
export default function WishList() {
    let {getLoggedUserWish,removeToWish}=useContext(cartContext);
    const [IsLoading, setIsLoading] = useState(false);
    const [WishDetails, setWishDetails] = useState(null)
async function getWishlist(){
    let response=await getLoggedUserWish();
    if(response?.data?.status=='success'){
        setIsLoading(true)
         setWishDetails(response.data.data)
         setIsLoading(false)
         console.log(response.data.data);
    }
}
async function deleteWish(productId){
   let response= await removeToWish(productId)
//    setWishDetails(response.data.data);
getWishlist()
toast('Product removed successfully to your wishlist')
    console.log('====================================');
    console.log(response.data.data);
    console.log('====================================');
 
  
}

    useEffect(()=>{
getWishlist()
    },[])
  return  <>

  <div className="container mt-5 pt-5">
    <div className="row">
{WishDetails?.length==0?<div ><img className='w-100 'height={400}  src={img} alt="" />
<div className='text-center my-2'><h3 className='text-danger'>Your Wishlist Is Empty</h3>
<h5 className='text-main'>Make A Wish !</h5>
<Link to={'/products'}>

<button  className='btn bg-main text-white'>Start Shopping</button>
</Link>
</div>

</div>

:<> {WishDetails?.map((pro,index)=><div key={index} className='col-md-4 py-3 text-center'>
 <img height={400} src={pro.imageCover} className='w-100' alt="" />
 <h3 className='text-main'>{pro.category.name}</h3>
 <h3 className='h6 fw-bolder py-1'>{pro.description.split(' ').slice(0,1).join(' ')}</h3>
  <div className="d-flex justify-content-between">
<span className='text-muted'>{pro.price} EGP</span>
<span>
  <i className='fas fa-star rating-color '></i>{pro.ratingsAverage}
</span>
  </div>
  <button onClick={()=>deleteWish(pro.id)} className='btn bg-danger text-white w-100'>Remove Item</button>
 </div>)
}</>}


 
    </div>
  </div>
  
  </>
}

  
