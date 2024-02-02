import { Button, Divider, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';


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
    return (
      <>
        <Stack direction={"row"} spacing={"20px"} sx={{ alignItems: "center"}}>
          <Typography variant='h5'>Total: </Typography>
          <Typography variant='h6' sx={{fontWeight: "600"}}>1000 LUX</Typography>
        </Stack>
        <Divider sx={{margin: "20px 0"}}/>
        <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", mb: "20px"}}>
          <Typography variant='h5'>Your cards</Typography>
          <Button variant='text'><AddIcon/>Add Card</Button>
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