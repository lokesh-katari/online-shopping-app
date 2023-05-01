import React from 'react'
import Products from './Products'
import Carasol from './Carasol'
import MetaData from './MetaData';
const images = [
  'https://via.placeholder.com/500x250.png?text=Image+1',
  'https://via.placeholder.com/500x250.png?text=Image+2',
  'https://via.placeholder.com/500x250.png?text=Image+3',
];
export default function Home() {
  return (
   <>
   <MetaData title={'online-shopping-app'}/>
 <div className="container flex flex-col">
   <Carasol images ={images}/>
   <Products/>
 </div>
   </>
  )
}

