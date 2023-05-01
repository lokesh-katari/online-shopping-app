// Carousel.js
import React, { useState } from 'react';
// import Image from './Image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

function Carousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const goToNextImage = () => {
    const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="relative w-full mx-auto bg-slate-800">
      <div className="absolute flex items-center justify-center">
        <ChevronLeftIcon className="h-12 w-12 text-black cursor-pointer" onClick={goToPreviousImage} />
      </div>
      <div className="absolute flex items-center justify-center">
        <ChevronRightIcon className="h-12 w-12 text-black cursor-pointer" onClick={goToNextImage} />
      </div>
      <div className='mx-9'>
      <img alt="imag" src={images[currentImageIndex]} />
      </div>
    </div>
  );
}

export default Carousel;
