import React from 'react'
import styled from '@emotion/styled'
import {useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from 'react'
import {Form, useNavigate} from 'react-router-dom'
import { authActions } from '../store/auth-slice'
// import { app } from '../firebase'
// import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import Axios from 'axios'
import {useCookies} from 'react-cookie'
import { Input } from './Input'
import { AppBar, Typography, Toolbar, Container, CssBaseline, Grid, Box, Stack, Button, Link, Divider } from '@mui/material'
import googleLogo from '../assets/images/google-logo.svg'
import logo from '../assets/images/logo.png'
import loginbg from '../assets/images/login-bg.jpg'


export default function Login() {
    const dispatch = useDispatch()
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()
    const user = useSelector(state=>state.auth.user)
    // const auth = getAuth(app)
    // const provider = new GoogleAuthProvider()
    const [errors,setErrors] = useState()
    const [storedUser, setStoredUser] = useCookies(['user'])

    const handleLogin = (e) => {
        e.preventDefault()
        Axios.post('api/users/login', {email: username, password: password})
        .then(res=>{
            if(res.data.rows.length === 1) {
                const userData = {user_id: res.data.rows[0].user_id, type: res.data.rows[0].type, displayName: res.data.rows[0].name, email: res.data.rows[0].email, photoURL: res.data.rows[0].photourl}
                dispatch(authActions.login(userData))
                setStoredUser('User',userData,{path: '/'})
            } else {
                setErrors('no_match')
            }
        })
    }

  const handleGoogleLogin = () => {
    // signInWithPopup(auth,provider).then((result)=>{
    //     Axios.post('api/users/googlelogin', {email: result.user.email})
    //     .then(res=>{
    //         if(res.data.rows.length === 1) {
    //             const userData = {user_id: res.data.rows[0].user_id, type: res.data.rows[0].type, displayName: res.data.rows[0].name, email: res.data.rows[0].email, photoURL: res.data.rows[0].photourl}
    //             dispatch(authActions.login(userData))
    //             setStoredUser('User',userData,{path: '/'})
    //         } else {
    //             setErrors('no_account')
    //         }
    //     })
    // })
  }

  const handleRegister = ()=> {
    navigate('/register')
  }

  useEffect(()=>{
    
    // const script3 = document.createElement("script");
    // script3.src = "/vanta.js";
    // script3.async = true;
    // document.body.appendChild(script3);



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
      <React.Fragment>
        <CssBaseline/>
        <Grid container spacing={0} sx={{ 
            m: 0,
            p: 0,
            height: "100vh"
            }}>
            <Grid item xs={0} md={6} lg={8} sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Box id={"bg"} sx={{width: "100%", height: "100%", position: "absolute", zIndex: 1}}>
                  <img src={loginbg} style={{width: "100%", height: "100%",objectFit: "cover", filter: "brightness(0.3)"}}/>
                </Box>
                <Box sx={{width: "70%",zIndex: 2}}>
                    <Typography color={"primary.light"} variant='h1'>LUXURY NFT</Typography>
                    <Typography color={"primary.dark"} variant='h4'>Exclusiveness is what you deserve!</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Box sx={{
                    bgcolor: "black",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                    position: "relative"
                    }}>
                    <img height={"120px"} style={{objectFit: "contain"}} src={logo} alt='Lux'/>
                    <form onSubmit={e=>handleLogin(e)} style={{width: "80%"}}>
                        <Stack direction={"column"} spacing={"20px"} sx={{
                            width: "100%"
                        }}>
                                <Typography variant='h4'>LOGIN</Typography>
                                
                                <Input
                                    type={'text'}
                                    name={'username'}
                                    value={username}
                                    setValue={setUsername}
                                    id={'username'}
                                    label={'Email'}
                                />
                                <Input
                                    type={'password'}
                                    name={'password'}
                                    value={password}
                                    setValue={setPassword}
                                    id={'password'}
                                    label={'Password'}
                                />
                                {/* {errors === 'no_match' ? <Error>Email or password does not match.</Error>:<></>}
                                {errors === 'no_account' ? <Error>No account with this email exists.</Error>:<></>} */}
                                <Button variant='contained' className='normal-login' type='submit'>Login</Button>
                                <Button className='google-login' type='button' onClick={handleGoogleLogin}>
                                    <img height={"30px"} src={googleLogo}/><span>Login with Google</span>
                                    </Button>

                                <Divider><span style={{color: "#757575"}}>Or</span></Divider>
                        
                                <Box sx={{display: "flex", justifyContent: "center"}}><Link sx={{cursor: "pointer"}} onClick={handleRegister}>register now</Link></Box>
                        </Stack>
                    </form>
                    <Box sx={{color: "#757575", fontSize: "15px", fontStyle: "italic"}}>© Lux - Hoang Minh Khue 2024</Box>
                </Box>
            </Grid>
        </Grid>
      </React.Fragment>
  )
}