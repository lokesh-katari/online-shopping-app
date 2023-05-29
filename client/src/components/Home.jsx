import React from 'react'
import Products from './Products'
import CarasolHome from './Carasol'
import MetaData from './MetaData';
import img1 from "../Carousolimg/img1.jpg"
import img2 from "../Carousolimg/img2.jpg"
import img3 from "../Carousolimg/img3.jpg"
export default function Home() {
 const  images=[
    img1,img2,img3
  ]
  return (
   <>
   <MetaData title={'online-shopping-app'}/>
 <div className="container flex flex-col">
   <CarasolHome images ={images} />
   <Products/>
 </div>
   </>
  )
}

