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
import Login from './authPage/Login'
import Register from './authPage/Register'
import * as SpaceWar from '../assets/animations/spacewar.json'
import Lottie from 'react-lottie'
import { CarouselCard } from './common/Card';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


import { Autoplay, EffectCoverflow} from 'swiper/modules';


const GradientBg = styled.div`

  width: 100%;
  height: 100%;
  position: absolute;

  background: radial-gradient(ellipse at top, #366fa4, transparent),
                radial-gradient(ellipse at bottom, #37a76f, transparent),
                radial-gradient(ellipse at left, #464fa5, transparent),
                radial-gradient(ellipse at right, #964392, transparent);
`


export default function AuthPage(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state=>state.auth.user)
    // const auth = getAuth(app)
    // const provider = new GoogleAuthProvider()
    const [storedUser, setStoredUser] = useCookies(['user'])
    const bgRef = useRef(null)
    const [isLogin, setIsLogin] = useState(true)
    var canvasLoaded = false

  const handleRegister = ()=> {
    setIsLogin(!isLogin)
  }

  const loadBg = () => {
    if(!canvasLoaded) {
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
      canvasLoaded = true
    }
  }

  useEffect(()=>{

    // loadBg()

    if(storedUser.User && storedUser.User !== 'null') {
      dispatch(authActions.login({user_id: storedUser.User.user_id, type: storedUser.User.type, displayName: storedUser.User.displayName, email: storedUser.User.email, photourl: storedUser.User.photoURL}))
      window.socket.emit('online')
    } else {
      setStoredUser('User',null,{path: '/'})
      dispatch(authActions.logout())
      // navigate('/')
    }

  },[])
  
  useEffect(()=>{
    if(user) {
    //   navigate('/home')
    } else {
      // navigate('/')
    }
},[user])



  return (
      <React.Fragment>
        <GradientBg>
          {/* <Lottie 
            options={{
              loop: true,
              autoplay: true,
              animationData: SpaceWar
            }}
            style={{
              width: "100vw",
              height: "auto"
            }}
          /> */}
          
          {/* <img src={loginbg} style={{width: "100%", height: "100%",objectFit: "cover", filter: "brightness(0.3)"}}/> */}
        </GradientBg>
        <Grid container spacing={0} sx={{ 
            m: 0,
            p: 0,
            height: "100%"
            }}>
            <Grid item xs={{display: "none"}} md={6} lg={8} sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"

            }}>
                <Typography sx={{color: "primary.light", textShadow: "0px 0px 20px #556cd6", textAlign: "center"}} variant='h1'>LUXURY NFT</Typography>
                <Box sx={{width: "70%", height: "70%" ,zIndex: 2, position: "relative", overflowX: "visible"
                }}>
                  <Swiper
                    style={{height: "100%", width: "calc(100% + 200vw)", padding: "20px 100vw", marginLeft: "-100vw", position: "absolute"}}
                    effect={'coverflow'}
                    centeredSlides={true}
                    loop={true}
                    lazy={true}
                    lazyPreloadPrevNext={4}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: true
                    }}
                    slidesPerView={1}
                    spaceBetween={"-40%"}
                    coverflowEffect={{
                      rotate: 70,
                      stretch: 0,
                      depth: 0,
                      modifier: 1,
                      slideShadows: true,
                      scale: 0.7,
                    }}
                    modules={[EffectCoverflow, Autoplay]}
                    className="mySwiper"
                  >
                    {[...Array(10)].map(()=>(
                      <SwiperSlide style={{backgroundColor: "#121212", width: "100%", height: "100%", borderRadius: "20px", position: "relative", overflow: "hidden", boxShadow: "3px 3px 15px 5px rgba(0,0,0,0.6)"}}>
                      < CarouselCard/>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
                <Typography sx={{color: "primary.light",textAlign: "center"}} variant='h4'>Exclusiveness is what you deserve!</Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Box sx={{
                    bgcolor: "rgba(0,0,0,0.8)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                    position: "relative",
                    backdropFilter: "blur(5px)",
                    zIndex: 10
                    }}>
                    <img height={"120px"} style={{objectFit: "contain"}} src={logo} alt='Lux'/>

                    <Box sx={{width: "80%"}}>
                        <Grow sx={{display: isLogin ? "block" : "none"}} in={isLogin}><Box><Login/></Box></Grow>
                        <Grow sx={{display: !isLogin ? "block" : "none"}} in={!isLogin}><Box><Register setIsLogin={setIsLogin}/></Box></Grow>
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