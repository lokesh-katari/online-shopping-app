// Carousel.js
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
// import Image from './Image';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const CarouselHome=({ images })=> {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      <Carousel>
        {images.map((img, i) => (
          <div className="mt-14">
            <img src={img} alt="" key={i} style={{width:"100vw",height:"60vh"}} />
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default CarouselHome;
