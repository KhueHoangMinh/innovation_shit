import React, { useContext, useRef } from 'react'
import styled from '@emotion/styled'
import {useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from 'react'
import {Form, useNavigate} from 'react-router-dom'
import { authActions } from '../store/auth-slice'
import {useCookies} from 'react-cookie'
import { Typography, CssBaseline, Grid, Box, Link, Divider, Fade, Grow, Button } from '@mui/material'
import logo from '../assets/images/logo.png'
import Login from './authPage/Login'
import Register from './authPage/Register'
import auth0Logo from '../assets/images/auth0.png'
import { CarouselCard, CarouselLanding } from './common/Card';
import Axios from 'axios';
import { backend } from '../constants';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


import { Autoplay, EffectCoverflow} from 'swiper/modules';


import { useAuth0 } from "@auth0/auth0-react";
import { TransitionContext } from './TransitionProvider'

// style of the background
const Bg = styled.div`

  width: 100%;
  height: fit-content;
  position: absolute;
  transform-origin: middle middle;
  transform: rotate(-45deg) scale(1.4);
  filter: brightness(0.3) blur(3px);
`

// the landing and authentication page
export default function AuthPage(props) {

  // define dispatch function to send actions to redux
  const dispatch = useDispatch()
  
  // transition
  const navigate = useNavigate()
  // const user = useSelector(state=>state.auth.user)
  const Transition = useContext(TransitionContext)

  
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(()=>{
    if(!isLoading && user) {
      Transition(()=>navigate(`/home`))
    }
    const checkloggin = async () => {
      // get current user information to check if user is logged in
      if(user && isAuthenticated) {
        const accessToken = await getAccessTokenSilently();

        console.log(`Bearer ${accessToken}`)

        var storedUser = null

        try {
          storedUser = await Axios.get(backend + '/api/user/' + user.sub ,{
            headers: {
              "Access-Control-Allow-Headers": "Authorization",
              "content-type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            }
          })
        } catch (err) {
          storedUser = await Axios.post(backend + '/api/user', {username: user.name, email: user.email}, {
            headers: {
              "Access-Control-Allow-Headers": "Authorization",
              "content-type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            }
          })
        }


        dispatch(authActions.login({
          user: user,
          token: accessToken,
          wallet: storedUser && storedUser.walletAddress ? storedUser.walletAddress : null
        }))

        console.log(storedUser)
        Transition(()=>navigate(`/home`))
      } else {
        console.log("not logged in")
      }
    };

    checkloggin();
  },[user, isAuthenticated, isLoading])

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
        <Box sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Box sx={{
              bgcolor: "transparent",
              height: "fit-content",
              width: "40%",
              maxWidth: "500px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              padding: "30px",
              zIndex: 10
              }}>
              <img height={"120px"} style={{objectFit: "contain", marginBottom: "40px"}} src={logo} alt='Lux'/>
              <Button variant='contained' color='secondary' className='normal-login' type='submit' style={{marginBottom: "40px", width: "100%"}} onClick={()=>loginWithRedirect()}>
                Login with Auth0
                <img src={auth0Logo} style={{height: "25px", marginLeft: "10px"}} alt=""/>  
              </Button>
              <Box sx={{color: "#757575", fontSize: "15px", fontStyle: "italic"}}>© Lux - 2024</Box>
          </Box>
        </Box>
      </React.Fragment>
  )
}