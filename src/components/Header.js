import { AppBar, Box, IconButton, Toolbar, Typography, Button, Stack, Autocomplete, TextField, Popover, Menu, MenuItem } from '@mui/material'
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
import { red } from '@mui/material/colors';


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

function Header() {
  const navigate = useNavigate()
  const Transition = useContext(TransitionContext)
  const scrollDimension = useContext(ScrollContext)
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth.user)
  const barState = useSelector(state => state.barState.isOpenning)
  const navItems = ['Home', 'About', 'Contact'];
  const [scrollY,setSrollY] = useState(scrollDimension.scrollY*1.0/20)
  const [imgAPI,setImgAPI] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(()=>{
    setSrollY(scrollDimension.scrollY*1.0/150)
    if(authState && authState.userId) getImage(authState.userId).then((api)=>setImgAPI(api))
  },[scrollDimension.scrollY, authState])

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
      boxShadow: scrollY > 0.1 ? "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)" : "none", 
      transition: "0.3s ease-in-out", 
      backgroundColor: `rgba(12,12,12,${scrollY})`,
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
            <Typography variant="h6" noWrap component="div">
              Lux
            </Typography>
          </Toolbar>
        </Stack>
        <Toolbar>
          
          {/* <Autocomplete
            disablePortal
            id="nav-search"
            options={[
              {label: "product 1", value: "1"},
              {label: "product 2", value: "2"},
              {label: "product 3", value: "3"},
              {label: "product 4", value: "4"},
              {label: "product 5", value: "5"},
              {label: "product 6", value: "6"},
              {label: "product 7", value: "7"},
            ]}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField sx={{height: "36.5px", "& .MuiInputBase-root": {height: "100%", "& #nav-search": {padding: 0, height: "100%"}}}} {...params} placeholder="Search" />}
          /> */}
        </Toolbar>
        <Toolbar>
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
        </Toolbar>
      </Stack>
    </AppBar>
  )
}

export default Header