import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { CarouselCard } from './Card';

// the slider at home page
function Slider(props) {

  // store current window's dimension
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  //get the window's dimension
  function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height
      };
    }
  
  // resize the slider based on window's width
  function handleResize() {
      setWindowDimensions(getWindowDimensions());
      }

  useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  // define the number of items to display on each window's width range
  const getItemNum = () => {
      if(windowDimensions.width > 1500) {
          return 4
      } else 
      if(windowDimensions.width > 1200) {
          return 3
      } else 
      if(windowDimensions.width > 800) {
          return 2
      } else 
      if(windowDimensions.width > 600) {
          return 1
      } else {
          return 1
      }
  }

  return (
    <Box
        sx={{width: "100%"}}
    >
      <Swiper
        style={{width: "100%"}}
        loop={true}
        lazy={true}
        lazyPreloadPrevNext={4}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true
        }}
        slidesPerView={getItemNum()}
        spaceBetween={"20px"}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {props.items.map((item)=>(
          <SwiperSlide style={{backgroundColor: "#121212", height: "fit-content", position: "relative", overflow: "hidden"}}>
            <CarouselCard {...item}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default Slider