import styled from '@emotion/styled'
import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'


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

function Card(props) {

const imgAPI = `https://picsum.photos/200?random=${Math.random(1,10)}`

  const Card = styled.div`
    position: relative;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;

    &::after {
      content: "";
      display: block;
      padding-bottom: 120%;
    }
  
    & > div {
      position: absolute;
      display: grid;
      grid-template-rows: 60% 40%;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;

      img {
        height: 100%;
        width: 100%;
      }

      & > div {
        height: 100%;
        width: 100%;
        padding: 15px;
      }
    }

    &:hover {
      cursor: pointer;
    }
  `

  return (
    <Card>
      <div>
        <img src={imgAPI}/>
        <Box sx={{backgroundColor: "#202020"}}>
          <Typography variant="h6">Product 1</Typography>
          <Grid container sx={{width: "100%"}}>
            <Grid item xs={6}>
              <Typography variant='body2'>stat 1</Typography>
              <Typography variant='body1'>abcd</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2'>stat 2</Typography>
              <Typography variant='body1'>efgh</Typography>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Card>
  )
}


export {CarouselCard, Card}