import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Stack, Chip, Grid, Link } from '@mui/material'
import styled from '@emotion/styled';
import { Card, CarouselCard } from './common/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { List } from './common/List';


function HomePage(props) {

  const chips=[
    "All",
    "Art",
    "Gaming",
    "Memberships",
    "PFPs",
    "Photography",
    "Music"]

  return (
    <>
      <Stack direction={"row"} sx={{}}>
        {chips.map((chip)=>(
          <>
            <Chip label={chip} color={"primary"} variant="outlined" onClick={()=>{console.log("click chip")}} sx={{marginRight: "10px", fontWeight: "600px"}}/>
          </>
        ))}
      </Stack>
      
      <Box 
          sx={{width: "100%"}}>
        <Swiper
          style={{width: "100%"}}
          loop={true}
          lazy={true}
          lazyPreloadPrevNext={4}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true
          }}
          slidesPerView={4}
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
      
      <List title={"Category 1"} link={''} items={[...Array(10)]}/>
      <List title={"Category 2"} link={''} items={[...Array(6)]}/>
      <List title={"Category 3"} link={''} items={[...Array(6)]}/>
    </>
  );
}

export default HomePage