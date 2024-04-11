"use client"
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper as SwiperObject } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slideshow.css'

interface Props {
  images: string[];
  title: string;
  thumbsSwiper: SwiperObject | undefined;
  setThumbsSwiper: React.Dispatch<React.SetStateAction<SwiperObject | undefined>>;
  className?: string
}

const SlideshowDesktop = ({ images, title, thumbsSwiper, setThumbsSwiper, className }:Props) => {
  return (
    <div className={className}>
      {/* IMAGEN GRANDE */}
      <Swiper
        // style={{
        //   '--swiper-navigation-color': '#fff',
        //   '--swiper-pagination-color': '#fff',
        //   } as React.CSSProperties
        // }
        spaceBetween={10}
        navigation={true}
        autoplay={{delay:2500}}
        thumbs={{ 
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
         {
           images.map( image => ( 
            <SwiperSlide key={image}>
              <Image 
              width={300}
              height={300}
              src={`/products/${image}`} 
              alt={title}  
              className='rounded-lg object-fill'
              />
            </SwiperSlide>
          ))
         }
      </Swiper>


      {/* IMAGENES CHICAS */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
         {
           images.map( image => ( 
            <SwiperSlide key={image}>
              <Image 
              width={1024}
              height={800}
              src={`/products/${image}`} 
              alt={title}  
              className='rounded-lg object-fill'
              />
            </SwiperSlide>
          ))
         }
      </Swiper>
    </div>
  )
}

export default SlideshowDesktop