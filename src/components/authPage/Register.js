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
        return <Basic initVal = {info.basic}/>
      case 1:
        return <CreditCard initVal = {info.card}/>
      case 2:
        return <Summary {...{...info.basic, ...info.card}}/>
      default:
        return <Basic initVal = {info.basic}/>
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