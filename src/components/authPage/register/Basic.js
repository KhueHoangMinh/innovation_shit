import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material'
import { Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Basic = (props) => {

  // show password state
  const [showPass, setShowPass] = useState(false)
  const [showRePass, setShowRePass] = useState(false)

  return (
  <Formik

    initialValues={{
      firstName: props.initVal.firstName,
      lastName: props.initVal.lastName,
      username: props.initVal.username,
      email: props.initVal.email,
      password: props.initVal.password,
    }}

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

        // call custom props handle submit
        props.handleSubmit(values)
        
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
              <FormControl sx={{width: "100%"}} error={Boolean(touched.firstName && errors.firstName)}>
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
              
              <FormControl sx={{width: "100%"}} error={Boolean(touched.lastName && errors.lastName)}>
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

                { props.activeStep !== 0 && (
                  <Button variant='outlined' onClick={()=> props.setActiveStep( props.activeStep-1)}>
                    Back
                  </Button>
                )}
                
                { props.activeStep <  props.steps.length - 1? (
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

export default Basic