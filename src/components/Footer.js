import { Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import logo from "../assets/images/logo.png"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

// footer for every page
function Footer() {
  return (
    <Box sx={{width: "100%", p: "50px 0", color: "secondary.dark"}}>
      <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", m: "20px 0"}}>
        <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center"}}>
          {/* <img src={logo} style={{height: "50px"}}/> */}
          <Typography variant='h5'>Luxury NFT</Typography>
        </Stack>
        <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center"}}>
          <IconButton>
            <FacebookIcon/>
          </IconButton>
          <IconButton>
            <InstagramIcon/>
          </IconButton>
          <IconButton>
            <XIcon/>
          </IconButton>
        </Stack>
      </Stack>
      <Divider></Divider>
      
      <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", m: "20px 0"}}>
        <Typography variant='body1'>Copyright 2024</Typography>
        <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center"}}>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer