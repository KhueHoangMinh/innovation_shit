import { botttsNeutral } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Box, Button, Divider, Fade, FormControl, FormLabel, Grid, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { List } from './common/List';

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

function EditableInfo(props) {
  const [editting, setEditting] = useState(false)
  const [value, setValue] = useState("")

  useEffect(()=>{
    setValue(props.value)
  },[])

  return (
    <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", width: "100%", height: "30px", padding: "20px 10px", transition: "0.2s ease-in-out", borderRadius: "10px", "&:hover": {backgroundColor: "rgba(255,255,255,0.03)"}}}>
      <FormControl>
        <Stack spacing={"10px"} direction={"row"} sx={{alignItems: "center"}}>
          <Typography variant='body1' sx={{fontWeight: "600", width: "100px"}}>{props.label}</Typography>
          {
          editting ? 
            <>
              <TextField value={value} sx={{height: "100%", "& input": {padding: "5px"}}} onChange={(e)=>{setValue(e.target.value)}}/>
            </>
            : 
            <>
              <Typography variant='body1' noWrap={false} sx={{height: "fit-content",padding: "6px"}}>{value}</Typography>
            </>
          }
        </Stack>
      </FormControl>
        {
        editting ? 
          <>
            <Typography variant="body2" sx={{transition: "0.2s ease-in-out", cursor: "pointer", color: "secondary.dark", "&:hover": {color: "secondary.light"}}} onClick={()=>{
              setEditting(false)
            }}>
              Save
            </Typography>
          </>
          : 
          <>
            <Typography variant="body2" sx={{transition: "0.2s ease-in-out", cursor: "pointer", color: "secondary.dark", "&:hover": {color: "secondary.light"}}} onClick={()=>setEditting(true)}>
              Edit
            </Typography>
          </>
        }
    </Stack>
  )
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
                    <Box sx={{width: "100%"}}><Info/></Box>
                </Fade>
                <Fade sx={{display: current === 2 ? "block" : "none"}} in={current === 2}>
                    <Box sx={{width: "100%"}}><Balance/></Box>
                </Fade>
                <Fade sx={{display: current === 3 ? "block" : "none"}} in={current === 3}>
                    <Box sx={{width: "100%"}}><Transaction/></Box>
                </Fade>
            </Box>
        </Box>
    )
  }
  

function Archive() {
return (
    <>
      <List title={"Purchased"} link={''} items={[...Array(20)]}/>
    </>
)
}

function Info() {
    return (
      <>
          <Grid container spacing={"10px"} sx={{width: "100%"}}>
            <Grid item xs={12} sm={6}>
                <EditableInfo label={"First name: "} value={"User"}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <EditableInfo label={"Last name: "} value={"Name"}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <EditableInfo label={"User name: "} value={"User Name"}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <EditableInfo label={"Birth: "} value={"11/11/1111"}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <EditableInfo label={"Email: "} value={"exampleuseremail@test.com"}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <EditableInfo label={"Phone: "} value={"0123456789"}/>
            </Grid>
            <Grid item xs={12} md={12}>
                <EditableInfo label={"Address: "} value={"Dongda, Hanoi, Vietnam"}/>
            </Grid>
          </Grid>
      </>
    )
  }
  
function Balance() {
    return (
      <>
          Balance
      </>
    )
  }

function Transaction() {
  return (
    <>
        Transaction
    </>
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