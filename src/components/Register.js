import React, { useRef } from 'react'
import styled from '@emotion/styled'
import {useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from 'react'
import {Form, useNavigate} from 'react-router-dom'
import { authActions } from '../store/auth-slice'
// import { app } from '../firebase'
// import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import Axios from 'axios'
import {useCookies} from 'react-cookie'
import { Box, Typography, Stack, Button, Link, FormControl, InputAdornment, IconButton, OutlinedInput, FormControlLabel, InputLabel, Checkbox, FormHelperText, CssBaseline, Stepper, Step, StepLabel, Grid, Divider } from '@mui/material'
import googleLogo from '../assets/images/google-logo.svg'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup'
import { Formik } from 'formik'
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";


export default function Register() {
  const dispatch = useDispatch()
  const [info,setInfo] = useState({
    basic: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
    card: {
      nameOnCard: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    }
  })
  const [showPass, setShowPass] = useState(false)
  const [showRePass, setShowRePass] = useState(false)
  const [remember,setRemember] = useState(true)
  const navigate = useNavigate()
  const user = useSelector(state=>state.auth.user)
  // const auth = getAuth(app)
  // const provider = new GoogleAuthProvider()
  const [errors,setErrors] = useState()
  const [storedUser, setStoredUser] = useCookies(['user'])
  const bgRef = useRef(null)
  const steps = ["Basic information", "Credit card", "Confirm"]
  const [activeStep,setActiveStep] = useState(0)

  const getStepperContent = (step) => {
    switch(step) {
      case 0: 
        return <BasicInformation/>
      case 1:
        return <CreditCard/>
      case 2:
        return <Confirm/>
      default:
        return <div>BasicInformation</div>
    }
  }

  const handleRegister = (e) => {
    console.log(info)
  }

  const handleGoogleRegister = () => {
  }

  const ConfirmItem = (props) => {
    return (
      <Stack direction={"row"} sx={{width: "100%", justifyContent: "space-between"}}>
        <Typography variant='body1'><strong>{props.label}</strong>:</Typography>
        <Typography variant='body2'>{props.content}</Typography>
      </Stack>
    )
  }

  const Confirm = () => {
    return (
      <React.Fragment>
        <Typography variant='h5'>Basic Information</Typography>
        <Divider sx={{my: "10px"}}></Divider>
        <Stack direction={"row"} spacing={"20px"} sx={{
            width: "100%"
        }}>
          <ConfirmItem label={"First name"} content={info.basic.firstName}/>
          <ConfirmItem label={"Last name"} content={info.basic.lastName}/>
        </Stack>
        <ConfirmItem label={"Username"} content={info.basic.username}/>
        <ConfirmItem label={"Email"} content={info.basic.email}/>
        <ConfirmItem label={"Password"} content={info.basic.password.split("").map(()=><>&#183;</>)}/>
        <Typography sx={{mt: "20px"}} variant='h5'>Credit Card</Typography>
        <Divider sx={{my: "10px"}}></Divider>
        <ConfirmItem label={"Name on Card"} content={info.card.nameOnCard}/>
        <ConfirmItem label={"Card number"} content={info.card.cardNumber}/>
        <Stack direction={"row"} spacing={"20px"} sx={{
            width: "100%"
        }}>
          <ConfirmItem label={"Expiration date"} content={info.card.expirationDate}/>
          <ConfirmItem label={"CVV"} content={info.card.cvv.split("").map(()=><>&#183;</>)}/>
        </Stack>
        
        
        <Stack direction={"row"} sx={{mt: "10px", alignItems: "center", justifyContent: "space-between"}}>
          <Box sx={{display: "flex", width: "100%", justifyContent: "end"}}>

            {activeStep !== 0 && (
              <Button variant='outlined' onClick={()=>setActiveStep(activeStep-1)}>
                Back
              </Button>
            )}
            
            {activeStep < steps.length - 1? (
              <>
                <Button variant='contained' sx={{ml: "10px"}}  onClick={()=>{setActiveStep(activeStep + 1)}}>
                  Next
                </Button>
              </>
            ):(
              <Button variant='contained' sx={{ml: "10px"}} onClick={handleRegister}>
                Register
              </Button>
            )}
          </Box>
        </Stack>
      </React.Fragment>
    )
  }

  const CreditCard = () => {
    return (
      <Formik
        initialValues={
          info.card
        }
        validationSchema={
          Yup.object().shape({
            nameOnCard: Yup.string()
            .required('Name on card is required')
            .matches(/^[A-Z\s]+$/, 'Name on card must contain only alphabets and spaces'),
            cardNumber: Yup.string()
              .required('Credit card number is required')
              .matches(/^\d{16}$/, 'Invalid credit card number'),
            expirationDate: Yup.string()
              .required('Expiration date is required')
              .matches(/^(0[1-9]|1[0-2])\/(\d{2})$/, 'Invalid expiration date'),
            cvv: Yup.string()
              .required('CVV is required')
              .matches(/^\d{3,4}$/, 'Invalid CVV'),
          })
        }
        onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
          try {
            // setStatus({success: true})
            // setSubmitting(false)
          var newInfo = info
          newInfo.card = {...newInfo.card, ...values}
          setInfo(newInfo)
          setActiveStep(activeStep + 1)
            
          } catch (err) {
            
          }
        }}
      >
        {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
          <form onSubmit={handleSubmit}>
              <Stack direction={"column"} spacing={"20px"} sx={{
                  width: "100%"
              }}>
                <FormControl error={Boolean(touched.nameOnCard && errors.nameOnCard)}>
                  <InputLabel>Name on Card</InputLabel>
                  <OutlinedInput
                    type={'text'}
                    id={'nameOnCard'}
                    name={'nameOnCard'}
                    value={values.nameOnCard}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={"Name on Card"}
                  />
                  {touched.nameOnCard && errors.nameOnCard && (
                    <FormHelperText error>
                      {errors.nameOnCard}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl error={Boolean(touched.cardNumber && errors.cardNumber)}>
                  <InputLabel>Card number</InputLabel>
                  <OutlinedInput
                    type={'text'}
                    id={'cardNumber'}
                    name={'cardNumber'}
                    value={values.cardNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={"Card number"}
                  />
                  {touched.cardNumber && errors.cardNumber && (
                    <FormHelperText error>
                      {errors.cardNumber}
                    </FormHelperText>
                  )}
                </FormControl>
                
                <Stack direction={"row"} spacing={"20px"} sx={{
                    width: "100%"
                }}>

                  <FormControl error={Boolean(touched.expirationDate && errors.expirationDate)}>
                    <InputLabel>Expiration date</InputLabel>
                    <OutlinedInput
                      type={'text'}
                      id={'expirationDate'}
                      name={'expirationDate'}
                      value={values.expirationDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label={"Expiration date"}
                    />
                    {touched.expirationDate && errors.expirationDate && (
                      <FormHelperText error>
                        {errors.expirationDate}
                      </FormHelperText>
                    )}
                  </FormControl>
                  
                  <FormControl error={Boolean(touched.cvv && errors.cvv)}>
                    <InputLabel>CVV</InputLabel>
                    <OutlinedInput
                      type={'text'}
                      id={'cvv'}
                      name={'cvv'}
                      value={values.cvv}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label={"CVV"}
                    />
                    {touched.cvv && errors.cvv && (
                      <FormHelperText error>
                        {errors.cvv}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>

                <Stack direction={"row"} sx={{mt: "10px", alignItems: "center", justifyContent: "space-between"}}>
                  <Box sx={{display: "flex", width: "100%", justifyContent: "end"}}>

                    {activeStep !== 0 && (
                      <Button variant='outlined' onClick={()=>setActiveStep(activeStep-1)}>
                        Back
                      </Button>
                    )}
                    
                    {activeStep < steps.length - 1? (
                      <>
                        <Button  variant='outlined' sx={{ml: "10px"}}  onClick={()=>{setActiveStep(activeStep + 1)}}>
                          Skip
                        </Button>
                        <Button type={"submit"} variant='contained' sx={{ml: "10px"}}>
                          Next
                        </Button>
                      </>
                    ):(
                      <Button variant='contained' sx={{ml: "10px"}}>
                        Register
                      </Button>
                    )}
                  </Box>
                </Stack>
              </Stack>
          </form>
        )}
      </Formik>
    )
  }

  const BasicInformation = () => {
    return (
      <Formik
      initialValues={
        info.basic
      }
      validationSchema={
        Yup.object().shape({
          firstName: Yup.string()
          .required('Name is required')
          .matches(/^[a-zA-Z\s]+$/, 'Name must contain only alphabets and spaces'),
          lastName: Yup.string()
          .required('Name is required')
          .matches(/^[a-zA-Z\s]+$/, 'Name must contain only alphabets and spaces'),
          username: Yup.string()
          .required('Username is required')
          .min(3, 'Username must be at least 3 characters long')
          .max(20, 'Username must not exceed 20 characters')
          .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
          email: Yup.string().email('Inccorect email format').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          repassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Please retype your password')
        })
      }
      onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
        try {
          // setStatus({success: true})
          // setSubmitting(false)
          var newInfo = info
          newInfo.basic = {...newInfo.basic, ...values}
          setInfo(newInfo)
          setActiveStep(activeStep + 1)
          
        } catch (err) {
          
        }
      }}
    >
      {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
        <form onSubmit={handleSubmit}>
            <Stack direction={"column"} spacing={"20px"} sx={{
                width: "100%"
            }}>
              
              <Stack direction={"row"} spacing={"20px"} sx={{
                  width: "100%"
              }}>
                <FormControl error={Boolean(touched.firstName && errors.firstName)}>
                  <InputLabel>First name</InputLabel>
                  <OutlinedInput
                    type={'text'}
                    id={'firstName'}
                    name={'firstName'}
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={"First name"}
                  />
                  {touched.firstName && errors.firstName && (
                    <FormHelperText error>
                      {errors.firstName}
                    </FormHelperText>
                  )}
                </FormControl>
                
                <FormControl error={Boolean(touched.lastName && errors.lastName)}>
                  <InputLabel>Last name</InputLabel>
                  <OutlinedInput
                    type={'text'}
                    id={'lastName'}
                    name={'lastName'}
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={"Last name"}
                  />
                  {touched.lastName && errors.lastName && (
                    <FormHelperText error>
                      {errors.lastName}
                    </FormHelperText>
                  )}
                </FormControl>
              </Stack>

              <FormControl error={Boolean(touched.username && errors.username)}>
                <InputLabel>Username</InputLabel>
                <OutlinedInput
                  type={'text'}
                  id={'username'}
                  name={'username'}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label={"Username"}
                />
                {touched.username && errors.username && (
                  <FormHelperText error>
                    {errors.username}
                  </FormHelperText>
                )}
              </FormControl>

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

              
              <FormControl error={Boolean(touched.repassword && errors.repassword)}>
                <InputLabel>Re-type Password</InputLabel>
                <OutlinedInput  
                  type={showPass ? "text" : "password"}
                  name={'repassword'}
                  value={values.repassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id={'repassword'}
                  label={'Re-type Password'}
                  endAdornment={
                    <InputAdornment position={"end"}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={()=>{setShowRePass(!showRePass)}}
                        edge={"end"}
                      >
                        {showRePass ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.repassword && errors.repassword && (
                  <FormHelperText>
                    {errors.repassword}
                  </FormHelperText>
                )}
              </FormControl>

              <Stack direction={"row"} sx={{mt: "10px",alignItems: "center", justifyContent: "space-between"}}>
                <Box sx={{display: "flex", width: "100%", justifyContent: "end"}}>

                  {activeStep !== 0 && (
                    <Button variant='outlined' onClick={()=>setActiveStep(activeStep-1)}>
                      Back
                    </Button>
                  )}
                  
                  {activeStep < steps.length - 1? (
                    <Button type={"submit"} variant='contained' sx={{ml: "10px"}}>
                      Next
                    </Button>
                  ):(
                    <Button variant='contained' sx={{ml: "10px"}}>
                      Register
                    </Button>
                  )}
                </Box>
              </Stack>
            </Stack>
        </form>
      )}
    </Formik>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline/>
      <Stepper sx={{mb: "20px"}} activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {getStepperContent(activeStep)}

    </React.Fragment>
  )
}