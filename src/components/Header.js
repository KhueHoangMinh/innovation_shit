import { AppBar, Box, IconButton, Toolbar, Typography, Button, Stack, Autocomplete, TextField } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux'
import { barActions } from '../store/sidebar-slice'
import React, { useContext } from 'react'
import Close from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { TransitionContext } from './TransitionProvider';

function Header() {
  const navigate = useNavigate()
  const Transition = useContext(TransitionContext)
  const dispatch = useDispatch()
  const barState = useSelector(state => state.barState.isOpenning)
  const navItems = ['Home', 'About', 'Contact'];
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
      <Stack direction={"row"} sx={{justifyContent: "space-between"}}>
        <Toolbar>
          <IconButton
            color={barState ? "primary" : "secondary"}
            aria-label="open drawer"
            onClick={()=>{dispatch(barActions.toggle())}}
            edge="start"
            sx={{
              marginRight: 5,
              p: "10px",
              width: "fit-content",
              height: "fit-content"
            //   ...(open && { display: 'none' }),
            }}
          >
            {barState ? <Close/> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Lux
          </Typography>
        </Toolbar>
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
            <Button onClick={()=>{Transition(()=>navigate("/auth"))}}>
              Login
            </Button>
        </Toolbar>
      </Stack>
    </AppBar>
  )
}

export default Header