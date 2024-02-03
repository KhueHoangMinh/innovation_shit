import { Box, Button, Divider, Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import CreditCard from '../authPage/register/CreditCard';


function CardInfo(props) {
    return (
      <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", width: "100%", height: "fit-content", padding: "20px 10px", transition: "0.2s ease-in-out", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.01)", "&:hover": {backgroundColor: "rgba(255,255,255,0.03)"}}}>
        <Stack spacing={"10px"} direction={{xs:"column", md: "row"}} sx={{alignItems: {xs: "start", md: "center"}}}>
          <Typography variant='body1' sx={{fontWeight: "600"}}>
            {props.card.type}
          </Typography>
          <Typography variant='body1' sx={{fontWeight: "600"}}>
            {props.card.cardNumber.split("").map((v,i)=><>{(i >= 0 && i < 4) || (i >= props.card.cardNumber.length - 4 && i < props.card.cardNumber.length) ? <>{props.card.cardNumber[i]}</> : <>&#183;</>}{(i + 1) % 4 == 0 ? <>&#160;</> : <></>}</>)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{transition: "0.2s ease-in-out", cursor: "pointer", color: "secondary.dark", "&:hover": {color: "secondary.light"}}} onClick={()=>{}  }>
          Manage
        </Typography>
      </Stack>
    )
}

function Balance() {
    const [addingCard, setAddingCard] = useState(false)
    const [card, setCard] = useState({
      nameOnCard: "",
      cardNumber: "",
      expiryDate: "",
      cvc: ""
    })

    return (
      <>
        <Stack direction={"row"} spacing={"20px"} sx={{ alignItems: "center"}}>
          <Typography variant='h5'>Total: </Typography>
          <Typography variant='h6' sx={{fontWeight: "600"}}>1000 LUX</Typography>
        </Stack>
        <Divider sx={{margin: "20px 0"}}/>
        <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", mb: "20px"}}>
          <Typography variant='h5'>Your cards</Typography>
          <Button onClick={()=>{setAddingCard(true)}} variant='text'><AddIcon/>Add Card</Button>
          <Modal
            open={addingCard}
            onClose={()=>{
              setAddingCard(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Stack direction={"column"} sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: "20px",
              boxShadow: 24,
            }}>
              <Stack direction={"row"} sx={{padding: "10px 20px", justifyContent: "space-between", alignItems: "center"}}>
                <Typography variant='h5'>Add new Card</Typography>
                <IconButton onClick={()=>{setAddingCard(false)}}>
                  <Close/>
                </IconButton>
              </Stack>
              <Divider/>
              <Box sx={{p: 4}}>
                <CreditCard initVal = {card} submitText={"Add"} handleSubmit={values=>{
                  var newInfo = card
                  newInfo.card = {...newInfo.card, ...values}
                  setCard(newInfo)
                  console.log(values)
                  setAddingCard(false)
                }}/>
              </Box>
            </Stack>
          </Modal>
        </Stack>
        <Grid container spacing={"10px"} sx={{width: "100%"}}>
          <Grid item xs={12} sm={6}>
              <CardInfo card={{
                type: "VISA",
                cardNumber: "4111111111111111"
              }}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <CardInfo card={{
                type: "VISA",
                cardNumber: "4111111111111111"
              }}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <CardInfo card={{
                type: "VISA",
                cardNumber: "4111111111111111"
              }}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <CardInfo card={{
                type: "VISA",
                cardNumber: "4111111111111111"
              }}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <CardInfo card={{
                type: "VISA",
                cardNumber: "4111111111111111"
              }}/>
          </Grid>
        </Grid>
      </>
    )
  }

export default Balance