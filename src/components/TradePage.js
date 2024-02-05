import { botttsNeutral } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { backend } from '../constants';
import Axios from 'axios';

async function getImage(id) {
  const img = await createAvatar(botttsNeutral, {
    seed: id,
    size: 128,
    // backgroundtype: "gradientLinear"
    // ... other options
  }).toDataUri()

  return img;
}

function BuyingCard(props) {

  const [imgAPI,setImgAPI] = useState(null)

    useEffect(()=>{
      getImage(props.user_id).then((api)=>setImgAPI(api))
    },[])

  return (
    <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", width: "100%", height: "180px", padding: "20px", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.05)"}}>
        <Stack spacing={"10px"} direction={"column"} sx={{height: "100%", flexGrow: 1}}>
          <Stack direction={"row"} spacing={"10px"} sx={{height: "40px"}}>
            <Box sx={{height: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden"}}>
              <img src={imgAPI} style={{objectFit: "cover", height: "100%"}} alt=""/>
            </Box>
            <Typography variant='h6'>{props.username}</Typography>
          </Stack> 
          <Stack direction={"column"} sx={{height: "100%", flexGrow: 1}}>  
            <Box>
              <Typography variant='h5' sx={{fontWeight: "700"}}>
                {props.amount && props.price_unit ? new Intl.NumberFormat('en-IN', {style: "currency", currency: props.price_unit}).format(props.amount) : "N/A"}
              </Typography>
            </Box>
            <Stack direction={"row"} spacing={"10px"} sx={{flexWrap: "wrap", alignItems: "center"}}>
              <Box>
                <Typography variant='body2' sx={{color: "secondary.dark"}}>to USD</Typography>
                <Typography variant='body1' sx={{fontWeight: "700"}}>
                  {props.amount && props.rate ? new Intl.NumberFormat('en-IN', {style: "currency", currency: "USD"}).format(props.amount * props.rate) : "N/A"}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{color: "secondary.dark"}}>Rate</Typography>
                <Typography variant='body1' sx={{fontWeight: "700"}}>
                  {props.rate ? new Intl.NumberFormat('en-IN', {style: "currency", currency: "USD"}).format(props.rate) : "N/A"}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      <Button variant="contained">Buy</Button>
    </Stack>
  )
}



function SellingCard(props) {

  const [imgAPI,setImgAPI] = useState(null)

    useEffect(()=>{
      getImage(props.user_id).then((api)=>setImgAPI(api))
    },[])

  return (
    <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", width: "100%", height: "180px", padding: "20px", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.05)"}}>
        <Stack spacing={"10px"} direction={"column"} sx={{height: "100%", flexGrow: 1}}>
          <Stack direction={"row"} spacing={"10px"} sx={{height: "40px"}}>
            <Box sx={{height: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden"}}>
              <img src={imgAPI} style={{objectFit: "cover", height: "100%"}} alt=""/>
            </Box>
            <Typography variant='h6'>{props.username}</Typography>
          </Stack> 
          <Stack direction={"column"} sx={{height: "100%", flexGrow: 1}}>  
            <Box>
              <Typography variant='h5' sx={{fontWeight: "700"}}>
                {props.amount && props.price_unit ? new Intl.NumberFormat('en-IN', {style: "currency", currency: props.price_unit}).format(props.amount) : "N/A"}
              </Typography>
            </Box>
            <Stack direction={"row"} spacing={"10px"} sx={{flexWrap: "wrap", alignItems: "center"}}>
              <Box>
                <Typography variant='body2' sx={{color: "secondary.dark"}}>to USD</Typography>
                <Typography variant='body1' sx={{fontWeight: "700"}}>
                  {props.amount && props.rate ? new Intl.NumberFormat('en-IN', {style: "currency", currency: "USD"}).format(props.amount * props.rate) : "N/A"}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{color: "secondary.dark"}}>Rate</Typography>
                <Typography variant='body1' sx={{fontWeight: "700"}}>
                  {props.rate ? new Intl.NumberFormat('en-IN', {style: "currency", currency: "USD"}).format(props.rate) : "N/A"}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      <Button variant="contained">Sell</Button>
    </Stack>
  )
}

function TradePage() {
  const [buyingRequest, setBuyingRequest] = useState([])
  const [sellingRequest, setSellingRequest] = useState([])

  useEffect(()=>{
    Axios.get(backend+'/api/buying_request').then(res=>{
      setBuyingRequest(res.data)
    })
    Axios.get(backend+'/api/selling_request').then(res=>{
      setSellingRequest(res.data)
    })
  },[])
  return (
    <>
      <Stack direction={"row"} spacing={"10px"} sx={{alignItems: "center"}}>
        <Typography variant='h5'>Buying</Typography>
      </Stack>
      
      <Divider/>

      <Grid container spacing={1} sx={{width: "100%"}}>
        {buyingRequest.map((request) => (
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <BuyingCard {...request}/>
          </Grid>
        ))}
      </Grid>

      <Stack direction={"row"} spacing={"10px"} sx={{alignItems: "center"}}>
        <Typography variant='h5'>Selling</Typography>
      </Stack>
      
      <Divider/>

      <Grid container spacing={1} sx={{width: "100%"}}>
        {sellingRequest.map((request) => (
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <SellingCard {...request}/>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default TradePage