import { botttsNeutral } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Box, Fade, Stack, Tab, Tabs,Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Archive from './accountPage/Archive';
import Information from './accountPage/Information';
import Balance from './accountPage/Balance';
import Transactions from './accountPage/Transactions';

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




function Head() {
    const [imgAPI,setImgAPI] = useState(null)
    useEffect(()=>{
      getImage().then((api)=>setImgAPI(api))
    },[])
    return (
      <Stack direction={{xs: "column", md: "row"}} sx={{height: {xs: "fit-content", md: "300px"}}} spacing={"20px"}>
            <Box 
                sx={{
                    borderRadius: "20px", overflow: "hidden", position: "relative",
                    height: {md: "300px"}, width: {xs: "100%", md: "300px"},
                    "&::before": {content: "''", paddingTop: "100%", display: "block"}
                }}
            >
                <img src={imgAPI} style={{position: "absolute", top: 0, left: 0, height: "100%", width: "100%"}}/>
            </Box>
            <Stack direction={"column"} spacing={"5px"}>
                <Typography variant='h4' sx={{color: "secondary.main", fontWeight: "600"}}>User Name </Typography>
                <Typography variant='body1' sx={{color: "secondary.dark"}}>exampleuseremail@test.com</Typography>
            </Stack>
      </Stack>
    )
  }
  
function Body() {
    const [current, setCurrent] = useState(0)

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    variant="scrollable"
                    scrollButtons="auto" 
                    value={current} onChange={(e,v) => setCurrent(v)} 
                    aria-label="basic tabs example"
                >
                    <Tab label="Archive"/>
                    <Tab label="Information"/>
                    <Tab label="Balance"/>
                    <Tab label="Transactions" />
                </Tabs>
            </Box>
            <Box sx={{ mt: "20px" }}>
                <Fade sx={{display: current === 0 ? "block" : "none"}} in={current === 0}>
                    <Box sx={{width: "100%"}}><Archive/></Box>
                </Fade>
                <Fade sx={{display: current === 1 ? "block" : "none"}} in={current === 1}>
                    <Box sx={{width: "100%"}}><Information/></Box>
                </Fade>
                <Fade sx={{display: current === 2 ? "block" : "none"}} in={current === 2}>
                    <Box sx={{width: "100%"}}><Balance/></Box>
                </Fade>
                <Fade sx={{display: current === 3 ? "block" : "none"}} in={current === 3}>
                    <Box sx={{width: "100%"}}><Transactions/></Box>
                </Fade>
            </Box>
        </Box>
    )
  }

function AccountPage() {
  return (
    <Stack direction={"column"} spacing={"20px"}>
        <Head/> 
        <Body/>
    </Stack>
  )
}

export default AccountPage