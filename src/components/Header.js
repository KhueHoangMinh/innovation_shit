import { AppBar, Box, IconButton, Toolbar, Typography, Button, Stack, Autocomplete, TextField } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux'
import { barActions } from '../store/sidebar-slice'
import React, { useContext, useEffect, useState } from 'react'
import Close from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { TransitionContext } from './TransitionProvider';
import { ScrollContext } from './common/ScrollWrapper';

function Header() {
  const navigate = useNavigate()
  const Transition = useContext(TransitionContext)
  const scrollDimension = useContext(ScrollContext)
  const dispatch = useDispatch()
  const barState = useSelector(state => state.barState.isOpenning)
  const navItems = ['Home', 'About', 'Contact'];
  const [scrollY,setSrollY] = useState(scrollDimension.scrollY*1.0/20)

  useEffect(()=>{
    setSrollY(scrollDimension.scrollY*1.0/150)
  },[scrollDimension.scrollY])

  return (
    <AppBar position="fixed" sx={{ 
      zIndex: (theme) => theme.zIndex.drawer + 1, 
      boxShadow: scrollY > 0.1 ? "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)" : "none", 
      transition: "0.3s ease-in-out", 
      backgroundColor: `rgba(12,12,12,${scrollY})`,
      backgroundImage: "none"
    }}>
      <Stack direction={"row"} sx={{justifyContent: "space-between"}}>
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
          
          <Autocomplete
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
          />
        </Toolbar>
        <Toolbar>
            <Button onClick={()=>{Transition(()=>navigate("/"))}}>
              Login
            </Button>
        </Toolbar>
      </Stack>
    </AppBar>
  )
}

export default Header