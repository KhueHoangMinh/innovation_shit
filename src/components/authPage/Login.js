import React, { useContext, useRef } from 'react'
import styled from '@emotion/styled'
import {useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from 'react'
import {Form, useNavigate} from 'react-router-dom'
import { authActions } from '../../store/auth-slice'
// import { app } from '../firebase'
// import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import Axios from 'axios'
import {useCookies} from 'react-cookie'
import { Typography, Stack, Button, Link, FormControl, InputAdornment, IconButton, OutlinedInput, FormControlLabel, InputLabel, Checkbox, FormHelperText } from '@mui/material'
import googleLogo from '../../assets/images/google-logo.svg'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup'
import { Formik } from 'formik'
import { TransitionContext } from '../TransitionProvider'


export default function Login() {
  const dispatch = useDispatch()
  const [username,setUsername] = useState()
  const [password,setPassword] = useState()
  const [showPass, setShowPass] = useState(false)
  const [remember,setRemember] = useState(true)
  const navigate = useNavigate()
  const user = useSelector(state=>state.auth.user)
  // const auth = getAuth(app)
  // const provider = new GoogleAuthProvider()
  const [errors,setErrors] = useState()
  const [storedUser, setStoredUser] = useCookies(['user'])
  const bgRef = useRef(null)
  const Transition = useContext(TransitionContext)

  const handleLogin = (e) => {
      e.preventDefault()
      // Axios.post('api/users/login', {email: username, password: password})
      // .then(res=>{
      //     if(res.data.rows.length === 1) {
      //         const userData = {user_id: res.data.rows[0].user_id, type: res.data.rows[0].type, displayName: res.data.rows[0].name, email: res.data.rows[0].email, photoURL: res.data.rows[0].photourl}
      //         dispatch(authActions.login(userData))
      //         setStoredUser('User',userData,{path: '/'})
      //     } else {
      //         setErrors('no_match')
      //     }
      // })
      const userData = {userId: "123", token: "0xffffffffff"}
      dispatch(authActions.login(userData))
      setStoredUser('User',userData,{path: '/'})
      Transition(()=>navigate(`/${userData.userId}/`))
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


  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        submit: null
      }}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().email('Inccorect email format').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })
      }
      onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
        try {
          // setStatus({success: true})
          // setSubmitting(false)
          alert(JSON.stringify(values, null, 2))
        } catch (err) {
          
        }
      }}
    >
      {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
        <form onSubmit={handleSubmit}>
            <Stack direction={"column"} spacing={"20px"} sx={{
                width: "100%"
            }}>
                    <Typography variant='h4'>LOGIN</Typography>
                    <FormControl error={Boolean(touched.email && errors.email)}>
                      <InputLabel>Email</InputLabel>
                      <OutlinedInput
                        type={'text'}
                        id={'email'}
                        name={'email'}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={"Email"}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error>
                          {errors.email}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl error={Boolean(touched.password && errors.password)}>
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput  
                        type={showPass ? "text" : "password"}
                        name={'password'}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id={'password'}
                        label={'Password'}
                        endAdornment={
                          <InputAdornment position={"end"}>
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={()=>{setShowPass(!showPass)}}
                              edge={"end"}
                            >
                              {showPass ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {touched.password && errors.password && (
                        <FormHelperText>
                          {errors.password}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <Stack direction={"row"} sx={{alignItems: "center", justifyContent: "space-between"}}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={remember}
                              onChange={(e)=>{console.log(e);setRemember(e.target.checked)}}
                              name={"remember"}
                            />
                          }
                          label={"Remember me"}
                        />
                        <Link sx={{cursor: "pointer"}}>Forgot password?</Link>
                    </Stack>
                    {/* {errors === 'no_match' ? <Error>Email or password does not match.</Error>:<></>}
                    {errors === 'no_account' ? <Error>No account with this email exists.</Error>:<></>} */}
                    <Button variant='contained' className='normal-login' type='submit' onClick={handleLogin}>Login</Button>
                    <Button color={"secondary"} className='google-login' type='button' onClick={handleGoogleLogin}>
                        <img height={"30px"} src={googleLogo}/><span>Login with Google</span>
                      </Button>
            </Stack>
        </form>
      )}
    </Formik>
  )
}