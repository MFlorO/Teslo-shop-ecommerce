"use client"
import { useState } from 'react';
import { Swiper as SwiperObject } from 'swiper';
import SlideshowDesktop from './SlideshowDesktop';
import SlideshowMobile from './SlideshowMobile';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slideshow.css'


interface Props {
  images: string[];
  title: string;
}


const ProductSlideshow = ({ images, title }:Props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()

  return (
    <>
      <SlideshowDesktop 
      images={images} 
      title={title} 
      thumbsSwiper={thumbsSwiper} 
      setThumbsSwiper={setThumbsSwiper}
      className='hidden md:block'
      />

      <SlideshowMobile 
      images={images} 
      title={title} 
      className="block md:hidden"
      />

    </>
  )
}

export default ProductSlideshow