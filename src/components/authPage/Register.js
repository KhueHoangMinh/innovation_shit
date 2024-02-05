import React, { useRef } from 'react'
import styled from '@emotion/styled'
import {useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from 'react'
import {Form, useNavigate} from 'react-router-dom'
import { authActions } from '../../store/auth-slice'
// import { app } from '../firebase'
// import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import Axios from 'axios'
import {useCookies} from 'react-cookie'
import { Stepper, Step, StepLabel} from '@mui/material'

import * as Yup from 'yup'
import Basic from './register/Basic'
import CreditCard from './register/CreditCard'
import Summary from './register/Summary'


export default function Register(props) {
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
      expiryDate: "",
      cvc: ""
    }
  })
  const navigate = useNavigate()
  const user = useSelector(state=>state.auth.user)
  // const auth = getAuth(app)
  // const provider = new GoogleAuthProvider()
  const steps = ["Basic information", "Credit card", "Confirm"]
  const [activeStep,setActiveStep] = useState(0)

  // display steps of the registering process
  const getStepperContent = (step) => {
    switch(step) {
      case 0: 
        return <Basic initVal = {info.basic} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps}  handleSubmit={values=>{
          var newInfo = info
          newInfo.basic = {...newInfo.basic, ...values}
          setInfo(newInfo)
          setActiveStep(activeStep + 1)
        }}/>
      case 1:
        return <CreditCard initVal = {info.card} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps}  handleSubmit={values=>{
          var newInfo = info
          newInfo.card = {...newInfo.card, ...values}
          setInfo(newInfo)
          setActiveStep(activeStep + 1)
        }}/>
      case 2:
        return <Summary {...{...info.basic, ...info.card}} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} handleRegister={handleRegister}/>
      default:
        return <Basic initVal = {info.basic} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} handleSubmit={values=>{
          var newInfo = info
          newInfo.basic = {...newInfo.basic, ...values}
          setInfo(newInfo)
          setActiveStep(activeStep + 1)
        }}/>
    }
  }

  const handleRegister = (e) => {
    props.setIsLogin(true)
  }

  const handleGoogleRegister = () => {
  }

  return (
    <React.Fragment>
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