import React, { useRef } from 'react'
import styled from '@emotion/styled'
import {useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from 'react'
import {Form, useNavigate} from 'react-router-dom'
import { authActions } from '../store/auth-slice'
import {useCookies} from 'react-cookie'
import { Typography, CssBaseline, Grid, Box, Link, Divider, Fade, Grow } from '@mui/material'
import logo from '../assets/images/logo.png'
import NET from 'vanta/dist/vanta.net.min'
import Login from './Login'
import Register from './Register'


export default function AuthPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state=>state.auth.user)
    // const auth = getAuth(app)
    // const provider = new GoogleAuthProvider()
    const [storedUser, setStoredUser] = useCookies(['user'])
    const bgRef = useRef(null)
    const [isLogin, setIsLogin] = useState(true)

  const handleRegister = ()=> {
    // navigate('/register')
    setIsLogin(!isLogin)
  }

  useEffect(()=>{
    NET({
      el: bgRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x37a9ff,
      backgroundColor: 0x0,
      points: 10.00,
      maxDistance: 25.00,
      spacing: 20.00,
      showDots: false
    })



    if(storedUser.User && storedUser.User !== 'null') {
      dispatch(authActions.login({user_id: storedUser.User.user_id, type: storedUser.User.type, displayName: storedUser.User.displayName, email: storedUser.User.email, photourl: storedUser.User.photoURL}))
      window.socket.emit('online')
    } else {
      setStoredUser('User',null,{path: '/'})
      dispatch(authActions.logout())
      navigate('/')
    }
  },[])
  
  useEffect(()=>{
    if(user) {
    //   navigate('/home')
    } else {
      navigate('/')
    }
},[user])


  return (
      <React.Fragment sx={{position: "relative"}}>
        <CssBaseline/>
        
        <Box ref={bgRef} sx={{width: "100%", height: "100%", position: "absolute"}}>
          {/* <img src={loginbg} style={{width: "100%", height: "100%",objectFit: "cover", filter: "brightness(0.3)"}}/> */}
        </Box>
        <Grid container spacing={0} sx={{ 
            m: 0,
            p: 0,
            height: "100vh"
            }}>
            <Grid item xs={{display: "none"}} md={6} lg={8} sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Box sx={{width: "70%",zIndex: 2}}>
                    <Typography color={"primary.light"} sx={{textShadow: "0px 0px 20px #556cd6", textAlign: "center"}} variant='h1'>LUXURY NFT</Typography>
                    <Typography color={"primary.dark"}sx={{textAlign: "center"}} variant='h4'>Exclusiveness is what you deserve!</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Box sx={{
                    bgcolor: "rgba(0,0,0,0.2)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                    position: "relative",
                    backdropFilter: "blur(3px)",
                    }}>
                    <img height={"120px"} style={{objectFit: "contain"}} src={logo} alt='Lux'/>

                    <Box sx={{width: "80%"}}>
                        <Grow sx={{display: isLogin ? "block" : "none"}} in={isLogin}><Box><Login/></Box></Grow>
                        <Grow sx={{display: !isLogin ? "block" : "none"}} in={!isLogin}><Box><Register/></Box></Grow>
                    </Box>

                    <Divider sx={{width: "80%"}}><span style={{color: "#757575"}}>Or</span></Divider>

                    <Box sx={{display: "flex", justifyContent: "center"}}><Link sx={{cursor: "pointer"}} onClick={handleRegister}>{isLogin ? "Register now" : "Login now"}</Link></Box>
                    <Box sx={{color: "#757575", fontSize: "15px", fontStyle: "italic"}}>© Lux - Hoang Minh Khue 2024</Box>
                </Box>
            </Grid>
        </Grid>
      </React.Fragment>
  )
}