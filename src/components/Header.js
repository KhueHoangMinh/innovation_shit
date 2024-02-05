import { AppBar, Box, IconButton, Toolbar, Typography, Button, Stack, Autocomplete, TextField, Popover, Menu, MenuItem, Divider } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux'
import { barActions } from '../store/sidebar-slice'
import React, { useContext, useEffect, useState } from 'react'
import Close from '@mui/icons-material/Close';
import { useLocation, useNavigate } from 'react-router-dom';
import { TransitionContext } from './TransitionProvider';
import { ScrollContext } from './common/ScrollWrapper';
import { createAvatar } from '@dicebear/core';
import { botttsNeutral } from '@dicebear/collection';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { green, red } from '@mui/material/colors';
import logo from '../assets/images/logo.png'
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

const matchPath = (path) => {
  switch(path) {
    case path.match(/^\/$/):
      return 0;
    case path.match(/^\/[a-zA-Z0-9]+\/$/):
      return 1;
    case path.match(/^\/[a-zA-Z0-9]+\/gallery\/$/):
      return 2;
    case path.match(/^\/[a-zA-Z0-9]+\/gallery\/[a-zA-Z0-9]+\/$/):
      return 3;
    case path.match(/^\/[a-zA-Z0-9]+\/account\/$/):
      return 4;
    default:
      return -1;
  }
}

// header for every page
function Header() {

  //transition to other page
  const navigate = useNavigate()
  const Transition = useContext(TransitionContext)
  const scrollDimension = useContext(ScrollContext)

  // define dispatch function to send actions to redux
  const dispatch = useDispatch()

  // get the current authentication state
  const authState = useSelector(state => state.auth.user)

  // open/slose state of the sidebar
  const barState = useSelector(state => state.barState.isOpenning)

  // get the scroll height from custom scroll bar
  const [scrollY,setSrollY] = useState(scrollDimension.scrollY*1.0/120)

  // store user avatar
  const [imgAPI,setImgAPI] = useState(null)

  // store anchor element for menu
  const [anchorEl, setAnchorEl] = useState(null);

  // store market rate from server
  const [rate, setRate] = useState(0)

  useEffect(()=>{
    // get market rate from server
    Axios.get(backend+'/api/market_rate').then(res=>{
      setRate(res.data.rate)
    })
  },[])

  //on scroll listener
  useEffect(()=>{
    setSrollY(scrollDimension.scrollY*1.0/120)
    if(authState && authState.userId) getImage(authState.userId).then((api)=>setImgAPI(api))
  },[scrollDimension.scrollY, authState])

  // handle open/close menu
  const handlePopover = (event) => {
    if(anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar position="fixed" sx={{ 
      zIndex: (theme) => theme.zIndex.drawer + 1, 
      boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)", 
      transition: "0.2s ease-in-out", 
      backgroundColor: `black`,
      backgroundImage: "none",
      height: "64px"
    }}>
      <Stack direction={"row"} sx={{height: "100%", justifyContent: "space-between"}}>
        <Stack direction={"row"} sx={{padding: "0px", m: "0px"}}>
          <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "64px"}}>
            <IconButton
              color={barState ? "primary" : "secondary"}
              aria-label="open drawer"
              onClick={()=>{dispatch(barActions.toggle())}}
              sx={{
                width: "fit-content",
                height: "fit-content"
              //   ...(open && { display: 'none' }),
              }}
            >
              {barState ? <Close/> : <MenuIcon />}
            </IconButton>
          </Box>
          <Toolbar>
            <img src={logo} style={{height: "40px"}} alt=""/>
            <Typography variant="h6" sx={{fontWeight: "600", display: {xs: "none", md: "block"}}} noWrap component="div">
              Luxury NFT
            </Typography>
          </Toolbar>
        </Stack>
        <Toolbar>
          <Stack direction={"row"} spacing={"10px"} sx={{height: "100%", justifyContent: "center", alignItems: "center"}}>
            <Box sx={{height: "60%", display: "flex", padding: "0 10px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "10px", justifyContent: "center", alignItems: "center"}}>
              <Typography variant='body1' sx={{color: "secondary.main", fontWeight: "700", display: {xs: "none", sm: "block"}}}> Market rate</Typography>
              <Divider orientation='vertical' sx={{m: "0 10px", display: {xs: "none", sm: "block"}}}/>
              <Typography variant='body1' sx={{color: "secondary.main", fontWeight: "700"}}> LUX 1</Typography>
              <Typography variant='body2' sx={{color: "secondary.dark", m: "0 5px"}}> = </Typography>
              <Typography variant='body1' sx={{color: green[400], fontWeight: "700"}}> {rate != 0 ? new Intl.NumberFormat('en-IN', {style: "currency", currency: "USD"}).format(rate) : "N/A"}</Typography>
            </Box>
            {
              authState && authState.token ? 
              <>
                <Box sx={{height: "60%", borderRadius: "10px", overflow: "hidden", cursor: "pointer", aspectRatio: "1/1", transition: "0.2s ease-in-out", "&:hover": {filter: "brightness(1.2)"}}}
                  onClick={handlePopover}
                >
                  <img style={{width: "100%", height: "100%", objectFit: "cover" }} src={imgAPI}/>
                </Box>
                
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClick={handlePopover}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={()=>{Transition(()=>navigate(`/${authState.userId}/account`))}}>
                    <AccountCircleIcon sx={{mr: "10px"}}/>Account
                  </MenuItem>
                  <MenuItem onClick={()=>{Transition(()=>navigate("/"))}}>
                    <LogoutIcon sx={{color: red[500], mr: "10px"}}/>Log out
                  </MenuItem>
                </Menu>
              </> :
              <>
                <Button color='secondary' onClick={()=>{Transition(()=>navigate("/"))}}>
                  Log in
                </Button>
              </>
            }
          </Stack>
        </Toolbar>
      </Stack>
    </AppBar>
  )
}

export default Header