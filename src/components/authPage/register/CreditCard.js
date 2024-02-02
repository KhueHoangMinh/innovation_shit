import { Box, Button, FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material';
import { Field, Formik } from 'formik';
import React from 'react'
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import * as Yup from 'yup'

const CreditCard = (props) => {
    const {
      meta,
      getCardImageProps,
      getCardNumberProps,
      getExpiryDateProps,
      getCVCProps
    } = usePaymentInputs();

    return (
      <Formik
        initialValues= {{
          nameOnCard: props.initVal.nameOnCard,
          cardNumber: props.initVal.cardNumber,
          expiryDate: props.initVal.expiryDate,
          cvc:  props.initVal.cvc
        }}

        validationSchema={
          Yup.object().shape({
            nameOnCard: Yup.string()
            .required('Name on card is required')
            .matches(/^[a-zA-Z\s]+$/, 'Name on card must contain only alphabets and spaces')
          })
        }
        
        validate={() => {
          let errors = {};
          if (meta.erroredInputs.cardNumber) {
            errors.cardNumber = meta.erroredInputs.cardNumber;
          }
          if (meta.erroredInputs.expiryDate) {
            errors.expiryDate = meta.erroredInputs.expiryDate;
          }
          if (meta.erroredInputs.cvc) {
            errors.cvc = meta.erroredInputs.cvc;
          }
          return errors;
        }}
        onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
          try {
            // setStatus({success: true})
            // setSubmitting(false)
            props.handleSubmit(values)
          // var newInfo = info
          // newInfo.card = {...newInfo.card, ...values}
          // setInfo(newInfo)
          // setActiveStep(activeStep + 1)
            
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

                
                <Field name="cardNumber">
                  {({ field }) => (
                    <TextField
                      {...getCardNumberProps({
                        refKey: "inputRef",
                        onBlur: field.onBlur, onChange: field.onChange, name: field.name, id: field.id
                      })}
                      inputRef={getCardNumberProps().ref}
                      fullWidth
                      type="tel"
                      label="Card number"
                      variant="outlined"
                      error={
                        Boolean(touched.cardNumber && errors.cardNumber)
                      }
                      helperText={
                        touched.cardNumber && errors.cardNumber && (errors.cardNumber)
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <svg {...getCardImageProps({ images })} />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                </Field>
                
                <Stack direction={"row"} spacing={"20px"} sx={{
                    width: "100%"
                }}>
                  
                  <Field name="expiryDate">
                    {({ field }) => (
                      
                      <TextField
                        {...getExpiryDateProps({
                          refKey: "inputRef",
                          onBlur: field.onBlur, onChange: field.onChange, name: field.name, id: field.id
                        })}
                        inputRef={getExpiryDateProps().ref}
                        fullWidth
                        type="tel"
                        label={"Expiration date"}
                        variant="outlined"
                        error={Boolean(touched.expirationDate && errors.expirationDate)}
                        helperText={
                          touched.expirationDate && errors.expirationDate && (errors.expirationDate)
                        }
                      />
                    )}
                  </Field>
                  
                  <Field name="cvc">
                    {({ field }) => (
                      <TextField
                        {...getCVCProps({
                          refKey: "inputRef",
                          onBlur: field.onBlur, onChange: field.onChange, name: field.name, id: field.id
                        })}
                        inputRef={getCVCProps().ref}
                        fullWidth
                        type="text"
                        label={"CVC"}
                        placeholder='CVC'
                        variant="outlined"
                        error={Boolean(touched.cvc && errors.cvc)}
                        helperText={
                          touched.cvc && errors.cvc && (errors.cvc)
                        }
                      />
                    )}
                  </Field>
                  
                </Stack>

                <Stack direction={"row"} sx={{mt: "10px", alignItems: "center", justifyContent: "space-between"}}>
                  <Box sx={{display: "flex", width: "100%", justifyContent: "end"}}>

                    {props.activeStep !== 0 && (
                      <Button variant='outlined' onClick={()=>props.setActiveStep(props.activeStep-1)}>
                        Back
                      </Button>
                    )}
                    
                    {props.activeStep < props.steps.length - 1? (
                      <>
                        <Button  variant='outlined' sx={{ml: "10px"}}  onClick={()=>{props.setActiveStep(props.activeStep + 1)}}>
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

export default CreditCard