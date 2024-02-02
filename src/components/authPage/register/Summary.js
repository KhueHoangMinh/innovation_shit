import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import React from 'react'


const SummaryItem = (props) => {
    return (
      <Stack direction={"row"} sx={{width: "100%", justifyContent: "space-between"}}>
        <Typography variant='body1'><strong>{props.label}</strong>:</Typography>
        <Typography variant='body2'>{props.content}</Typography>
      </Stack>
    )
  }

  const Summary = (props) => {
    return (
      <React.Fragment>
        <Typography variant='h5'>Basic Information</Typography>
        <Divider sx={{my: "10px"}}></Divider>
        <Stack direction={"row"} spacing={"20px"} sx={{
            width: "100%"
        }}>
          <SummaryItem label={"First name"} content={props.firstName}/>
          <SummaryItem label={"Last name"} content={props.lastName}/>
        </Stack>
        <SummaryItem label={"Username"} content={props.username}/>
        <SummaryItem label={"Email"} content={props.email}/>
        <SummaryItem label={"Password"} content={props.password.split("").map(()=><>&#183;</>)}/>
        <Typography sx={{mt: "20px"}} variant='h5'>Credit Card</Typography>
        <Divider sx={{my: "10px"}}></Divider>
        <SummaryItem label={"Name on Card"} content={props.nameOnCard}/>
        <SummaryItem label={"Card number"} content={props.cardNumber.split("").map((v,i)=><>{(i >= 0 && i < 4) || (i >= props.cardNumber.length - 4 && i < props.cardNumber.length) ? <>{props.cardNumber[i]}</> : <>&#183;</>}{(i + 1) % 4 == 0 ? <>&#160;</> : <></>}</>)}/>
        <Stack direction={"row"} spacing={"20px"} sx={{
            width: "100%"
        }}>
          <SummaryItem label={"Expiration date"} content={props.expiryDate}/>
          <SummaryItem label={"CVC"} content={props.cvc.split("").map(()=><>&#183;</>)}/>
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
                <Button variant='contained' sx={{ml: "10px"}}  onClick={()=>{props.setActiveStep(props.activeStep + 1)}}>
                  Next
                </Button>
              </>
            ):(
              <Button variant='contained' sx={{ml: "10px"}} onClick={props.handleRegister}>
                Register
              </Button>
            )}
          </Box>
        </Stack>
      </React.Fragment>
    )
  }

export default Summary