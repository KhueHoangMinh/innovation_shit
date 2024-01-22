import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Stack, Chip } from '@mui/material'
import styled from '@emotion/styled';


function CarouselCard(props) {
  const imgAPI = `https://picsum.photos/200?random=${Math.random(1,10)}`
  const CardContainer = styled.div`
    position: relative;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;

    &::after {
      content: "";
      display: block;
      padding-bottom:
       100%;
    }

    & > div {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;

      img {
        position: absolute;
        transition: 0.2s ease-in-out;
        transform-origin: middle middle;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
      }
    }

    &:hover {
      cursor: pointer;
      img {
        transform: scale(1.1);
      }
    }
  `

  return(
    <CardContainer>
      <div>
        <img src={imgAPI}/>
        <Box sx={{position: "absolute", height: "fit-content", width: "100%", bottom: 0, padding: "10px", background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))"}}>
          <Typography variant='h6'>Product 1</Typography>
          <Typography variant='body1'>abcd</Typography>
        </Box>
      </div>
    </CardContainer>
  )

}

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
    <Box>
      <Stack direction={"row"} sx={{mb: "30px"}}>
        {chips.map((chip)=>(
          <>
            <Chip label={chip} color={"primary"} variant="outlined" onClick={()=>{console.log("click chip")}} sx={{marginRight: "10px", fontWeight: "600px"}}/>
          </>
        ))}
      </Stack>
      <Carousel duration={800} animation={"slide"} indicators={false} sx={{mb: "30px"}}>
        <Stack spacing={"20px"} direction={"row"} sx={{width: "100%", height: "fit-content"}}>
          <CarouselCard/>
          <CarouselCard/>
          <CarouselCard/>
          <CarouselCard/>
        </Stack>
        <Stack spacing={"20px"} direction={"row"} sx={{width: "100%", height: "fit-content"}}>
          <CarouselCard/>
          <CarouselCard/>
          <CarouselCard/>
          <CarouselCard/>
        </Stack>
        <Stack spacing={"20px"} direction={"row"} sx={{width: "100%", height: "fit-content"}}>
          <CarouselCard/>
          <CarouselCard/>
          <CarouselCard/>
          <CarouselCard/>
        </Stack>
        <Stack spacing={"20px"} direction={"row"} sx={{width: "100%", height: "fit-content"}}>
          <CarouselCard/>
          <CarouselCard/>
          <CarouselCard/>
          <CarouselCard/>
        </Stack>
      </Carousel>
    </Box>
  );
}

export default HomePage