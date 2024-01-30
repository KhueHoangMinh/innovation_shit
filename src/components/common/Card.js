import styled from '@emotion/styled'
import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { createAvatar } from '@dicebear/core';
import { lorelei, botttsNeutral } from '@dicebear/collection';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TransitionContext } from '../TransitionProvider';

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

async function getImage() {
  const img = await createAvatar(botttsNeutral, {
    seed: makeid(5),
    size: 128,
    // backgroundtype: "gradientLinear"
    // ... other options
  }).toDataUri()

  return img;
}


function CarouselCard(props) {

  const [imgAPI,setImgAPI] = useState(null)

    useEffect(()=>{
      getImage().then((api)=>setImgAPI(api))
    },[])

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
        <Box sx={{position: "absolute", height: "fit-content", width: "100%", bottom: 0, p: "10px", pt: "50%", background: "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))"}}>
          <Typography variant='h6' noWrap={true} sx={{maxWidth: "calc(100% - 20px)", fontWeight: "700"}}>Product 1 aaaaaaaaaaaaa sdsd sd s ds d sd sd </Typography>
          <Typography variant='body1' sx={{color: "#bbbbbb", fontWeight: "600"}}>Abcd</Typography>
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
        display: flex;
        justify-content: center;
        align-items: center;
  
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
        <Box sx={{position: "absolute", height: "fit-content", width: "60%" }}>
          <Typography variant='h6' noWrap={false} sx={{maxWidth: "calc(100% - 20px)", fontWeight: "700"}}>Product 1 aaaaaaaaaaaaa sdsd sd s ds d sd sd </Typography>
          <Typography variant='body1' sx={{color: "#bbbbbb", fontWeight: "600"}}>Abcd</Typography>
        </Box>
      </div>
    </CardContainer>
  )
}

function Card(props) {


  const [imgAPI,setImgAPI] = useState(null)

    useEffect(()=>{
      getImage().then((api)=>setImgAPI(api))
    },[])

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


      & > div {
        position: relative;
        height: 100%;
        width: 100%;
        object-fit: contain;
        & > img {
          position: absolute;
          width: 100%;  
        }
      }
    }

    &:hover {
      cursor: pointer;
      margin-top: -5px;
      box-shadow: 0px 0px 15px rgba(0,0,0,0.6);
    }
  `
  
  const navigate = useNavigate()
  const Transition = useContext(TransitionContext)

  const handleItemClick = (link) => {
    Transition(()=>{navigate(link)})
  }

  return (
    <Card onClick={()=>{handleItemClick("/0/gallery/" + Math.random())}}>
      <div>
        <Box>
          <img src={imgAPI}/>
        </Box>
        <Box sx={{p: "15px",display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#202020", "&:hover": {backgroundColor: "#303030"}}}>
          <Typography variant="h6" noWrap={true} sx={{maxWidth: "calc(100% - 20px)", fontWeight: "700"}}>Product 1</Typography>
          <Grid container sx={{width: "100%", height: "fit-content"}}>
            <Grid item xs={6}>
              <Typography variant='body2' sx={{color: "#bbbbbb"}}>stat 1</Typography>
              <Typography variant='h6' sx={{fontWeight: "700"}}>abcd</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' sx={{color: "#bbbbbb"}}>stat 2</Typography>
              <Typography variant='h6' sx={{fontWeight: "700"}}>efgh</Typography>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Card>
  )
}


export {CarouselCard, CarouselLanding, Card}