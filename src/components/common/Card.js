import styled from '@emotion/styled'
import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { createAvatar } from '@dicebear/core';
import { lorelei, botttsNeutral } from '@dicebear/collection';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TransitionContext } from '../TransitionProvider';
import { image_domain } from '../../constants';

// randomized an ID for dicebear image generator
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

// get random image from dicebear library
async function getImage() {
  const img = await createAvatar(botttsNeutral, {
    seed: makeid(5),
    size: 128,
  }).toDataUri()

  return img;
}

function CarouselCard(props) {
  
  // transition on click
  const navigate = useNavigate()
  const Transition = useContext(TransitionContext)

  const handleItemClick = (link) => {
    Transition(()=>{navigate(link)})
  }

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
    <CardContainer onClick={()=>handleItemClick("/gallery/" + props.id)}>
      <div>
        <img src={"https://" + image_domain + props.image}/>
        <Box sx={{position: "absolute", height: "fit-content", width: "100%", bottom: 0, p: "10px", pt: "50%", background: "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))"}}>
          <Typography variant='h6' noWrap={true} sx={{maxWidth: "calc(100% - 20px)", fontWeight: "700"}}>{props.title}</Typography>
          <Typography variant='body2' noWrap={true} sx={{maxWidth: "calc(100% - 20px)",color: "secondary.main", fontWeight: "600"}}>{props.price  ? new Intl.NumberFormat('en-IN', {style: "currency", currency: "LUX"}).format( props.price ) : "N/A" }</Typography>
        </Box>
      </div>
    </CardContainer>
  )
}


function CarouselLanding(props) {

  const [imgAPI,setImgAPI] = useState(null)

    useEffect(()=>{
      getImage().then((api)=>setImgAPI(api))
    },[])

    const CardContainer = styled.div`
      position: relative;
      width: 100%;
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
        display: flex;
        justify-content: center;
        align-items: center;
  
        img {
          position: absolute;
          transition: 0.2s ease-in-out;
          transform-origin: middle middle;
          height: 105%;
          width: 105%;
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
        <img src={"https://" + image_domain + props.image}/>
      </div>
    </CardContainer>
  )
}

function Card(props) {

  const Card = styled.div`
    position: relative;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.6);
    transition: 0.2s ease-in-out;

    &::after {
      content: "";
      display: block;
      padding-bottom: 120%;
    }
  
    & > div {
      height: 100%;
      width: 100%;
      position: absolute;
      display: grid;
      grid-template-rows: 1fr 120px;
      top: 0;
      left: 0;


      & > .img-container {
        height: 100%;
        width: 100%;
        object-fit: contain;
        & > img {
          position: absolute;
          width: 100%;  
        }
      }
      
      & > .content-container {
        width: 100%;
        position: relative;
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #202020;
        &:hover {
          background-color: #303030
        }
      }
    }

    &:hover {
      cursor: pointer;
      margin-top: ${props.notMove ? "0" : "-5px"};
      box-shadow: 0px 0px 15px rgba(0,0,0,0.6);
    }
  `
  // transition on click
  const navigate = useNavigate()
  const Transition = useContext(TransitionContext)

  const handleItemClick = (link) => {
    Transition(()=>{navigate(link)})
  }

  return (
    <Card sx={{position: "relative"}} onClick={()=>{handleItemClick("/gallery/" + props.id)}}>
      <div>
        <Box className="img-container">
          <img src={"https://" + image_domain + props.image}/>
        </Box>
        <Box className="content-container" sx={{width: "100%", position: "relative", p: "15px",display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#202020", "&:hover": {backgroundColor: "#303030"}}}>
          <Typography variant="h6" noWrap={true} sx={{maxWidth: "calc(250px - 20px)", fontWeight: "700"}}>{props.title}</Typography>
          <Grid container sx={{width: "100%", height: "fit-content"}}>
            <Grid item xs={6}>
              <Typography variant='body2' sx={{color: "secondary.dark"}}>Price</Typography>
              <Typography variant='body1' sx={{fontWeight: "700"}}>
                {props.price  ? new Intl.NumberFormat('en-IN', {style: "currency", currency: "LUX"}).format( props.price ) : "N/A" }
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' sx={{color: "secondary.dark"}}>Avg</Typography>
              <Typography variant='body1' sx={{fontWeight: "700"}}>
                {props.priceHistory ? new Intl.NumberFormat('en-IN', {style: "currency", currency: "LUX"}).format(average(props.priceHistory)) : "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Card>
  )
}


export {CarouselCard, CarouselLanding, Card}