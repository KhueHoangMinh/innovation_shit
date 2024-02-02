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
import { CarouselCard, CarouselLanding } from './common/Card';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


import { Autoplay, EffectCoverflow} from 'swiper/modules';


const Bg = styled.div`

  width: 100%;
  height: fit-content;
  position: absolute;
  transform-origin: middle middle;
  transform: rotate(-45deg) scale(1.4);
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
      // window.socket.emit('online')
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
        <Box sx={{position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", overflow: "hidden", objectFit: "cover", background: `
              radial-gradient(ellipse at top, #366fa4, transparent),
              radial-gradient(ellipse at bottom, #37a76f, transparent),
              radial-gradient(ellipse at left, #464fa5, transparent),
              radial-gradient(ellipse at right, #964392, transparent);`}}>
          <Bg>
            <Box sx={{height: "fit-content", width: "100%"}}>
              <Swiper
                loop={true}
                lazy={true}
                lazyPreloadPrevNext={4}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: true
                }}
                slidesPerView={5}
                modules={[Autoplay]}
                className="mySwiper"
              >
                {[...Array(10)].map(()=>(
                  <SwiperSlide style={{backgroundColor: "#121212", width: "100%", height: "100%", position: "relative", overflow: "hidden"}}>
                    <CarouselLanding/>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
            <Box sx={{height: "fit-content", width: "100%"}}>
              <Swiper
                loop={true}
                lazy={true}
                lazyPreloadPrevNext={4}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: true,
                  reverseDirection: true
                }}
                slidesPerView={5}
                modules={[Autoplay]}
                className="mySwiper"
              >
                {[...Array(10)].map(()=>(
                  <SwiperSlide style={{backgroundColor: "#121212", width: "100%", height: "100%", position: "relative", overflow: "hidden"}}>
                  <CarouselLanding/>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
            <Box sx={{height: "fit-content", width: "100%"}}>
              <Swiper
                loop={true}
                lazy={true}
                lazyPreloadPrevNext={4}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: true
                }}
                slidesPerView={5}
                modules={[Autoplay]}
                className="mySwiper"
              >
                {[...Array(10)].map(()=>(
                  <SwiperSlide style={{backgroundColor: "#121212", width: "100%", height: "100%", position: "relative", overflow: "hidden"}}>
                  <CarouselLanding/>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
            <Box sx={{height: "fit-content", width: "100%"}}>
              <Swiper
                loop={true}
                lazy={true}
                lazyPreloadPrevNext={4}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: true,
                  reverseDirection: true
                }}
                slidesPerView={5}
                modules={[Autoplay]}
                className="mySwiper"
              >
                {[...Array(10)].map(()=>(
                  <SwiperSlide style={{backgroundColor: "#121212", width: "100%", height: "100%", position: "relative", overflow: "hidden"}}>
                  <CarouselLanding/>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Bg>
        </Box>
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