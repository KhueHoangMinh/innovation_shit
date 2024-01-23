import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { CarouselCard } from './Card';
import { useTheme } from '@emotion/react';

function Slider() {
    const theme = useTheme();
    // const isLG = useMediaQuery(theme.breakpoints.up("lg"))
    // const isMD = useMediaQuery(theme.breakpoints.up("md"))
    // const isSM = useMediaQuery(theme.breakpoints.up("sm"))
    // const isXS = useMediaQuery(theme.breakpoints.up("xs"))

    
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }
    
    function handleResize() {
        setWindowDimensions(getWindowDimensions());
        }

    useEffect(() => {

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        {[...Array(10)].map(()=>(
          <SwiperSlide style={{backgroundColor: "#121212", height: "fit-content", position: "relative", overflow: "hidden"}}>
            <CarouselCard/>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default Slider