import { Box, Button, Checkbox, Divider, Grid, IconButton, Link, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import CreditCard from '../authPage/register/CreditCard';
import { TransitionContext } from '../TransitionProvider';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { green } from '@mui/material/colors';
import { backend } from '../../constants';
import Axios from 'axios';
import { useEffect } from 'react';

// Card to display credits card information
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
  // state to control model's open/close state
  const [addingCard, setAddingCard] = useState(false)
  const [addingCoin, setAddingCoin] = useState(false)
  const [createWallet, setCreateWallet] = useState(false)
  const [address, setAddress] = useState("")
  const [key, setKey] = useState("")
  const [wallet, setWallet] = useState("")
  const [amount, setAmount] = useState(0)
  const [amountDollar, setAmountDollar] = useState(0)
  const [inputKey, setInputKey] = useState("")

  // transition effect
  const Transition = useContext(TransitionContext)
  const navigate = useNavigate()

  // get authentication state from redux
  const authState = useSelector(state => state.auth)

  // check agreed to policies
  const [confirmed, setConfirmed] = useState(false)

  // initial card values
  const [card, setCard] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvc: ""
  })

  // state to store balance 
  const [balance, setBalance] = useState(null)

  // state to store credit cards information
  const [cards, setCards] = useState([])

  useEffect(()=>{
    // get balance from server
    if(wallet && authState && authState.token) {
      Axios.get(backend+'/api/wallet/' + wallet,{},{
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${authState.token}`
        }
      }).then(res=>{
        setBalance(res.data.balance)
      })
    }
  },[wallet])

  const callCreateWallet = () => {
    if(!wallet && authState && authState.token) {
      Axios.post(backend+'/api/wallet',{},{
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${authState.token}`
        }
      }).then(res=>{
        if(res.data.address && res.data.private_key) {
          setAddress(res.data.address)
          setKey(res.data.private_key)
          setCreateWallet(true)
        } else {
          console.log("Error")
        }
      })
    }
  }

  const confirmWallet = () => {
    setWallet(address)
    setAddress("")
    setKey("")
    setCreateWallet(false)
  }

  const purchase = () => {
    if(wallet && authState && authState.token) {
      Axios.put(backend+'/api/wallet/' + wallet,{amount: amount, private_key: inputKey},{
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${authState.token}`
        }
      })
    }
  }

  return (
    <>
      <Stack direction={{xs: "column", md: "row"}} spacing={"20px"} sx={{ alignItems: "center", justifyContent: "space-between"}}>
        {
          wallet ? 
          <>
          <Stack direction={"row"}>
            <Typography variant='h5' sx={{mr: "10px"}}>Total: </Typography>
            <Typography variant='h6' sx={{fontWeight: "600"}}>
              {balance ? new Intl.NumberFormat('en-IN', {style: "currency", currency: "LUX"}).format(balance) : "N/A"}
            </Typography>
          </Stack>
          <Stack direction={"column"} spacing={"10px"} sx={{alignItems: "end"}}>
            <Typography variant='body1' sx={{width: "fit-content", color: "secondary.dark"}}>Earn more LUX</Typography>
            <Stack direction={"row"} spacing={"10px"}>
              {/* <Button variant='contained' onClick={()=>{Transition(()=>{navigate(`/${authState.userId}/trade`)})}} color='secondary'>
                From others
              </Button> */}
              <Button variant='contained' onClick={()=>{setAddingCoin(true)}} color='primary'>
                From us
              </Button>
              <Modal
                open={addingCoin}
                onClose={()=>{
                  setAddingCoin(false)
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
                    <Typography variant='h5'>Purchase LUX</Typography>
                    <IconButton onClick={()=>{setAddingCoin(false)}}>
                      <Close/>
                    </IconButton>
                  </Stack>
                  <Divider/>
                  <Box sx={{p: 4}}>
                    <Stack direction={"column"} spacing={"20px"}>
                      <Box sx={{height: "60%", display: "flex", padding: "10px 10px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "4px", justifyContent: "center", alignItems: "center"}}>
                        <Typography variant='body1' sx={{color: "secondary.main", fontWeight: "700"}}> Market rate</Typography>
                        <Divider orientation='vertical' sx={{m: "0 10px"}}/>
                        <Typography variant='body1' sx={{color: "secondary.main", fontWeight: "700"}}> LUX 1</Typography>
                        <Typography variant='body2' sx={{color: "secondary.dark", m: "0 5px"}}> = </Typography>
                        <Typography variant='body1' sx={{color: green[400], fontWeight: "700"}}> {new Intl.NumberFormat('en-IN', {style: "currency", currency: "USD"}).format(1234.56)}</Typography>
                      </Box>
                      <Box>
                        <Typography variant='body2' sx={{color: "secondary.main", fontWeight: "700", width: "100%"}}> LUX:</Typography>
                        <TextField
                          value={amount}
                          sx={{width: "100%"}}
                          onChange={(e)=>{
                            setAmount(parseFloat(e.target.value))
                            setAmountDollar(parseFloat(e.target.value)*1234.56)
                            if(e.target.value != "" && e.target.value != "NaN") {
                              setAmount(parseFloat(e.target.value))
                              setAmountDollar(parseFloat(e.target.value)*1234.56)
                            } else {
                              setAmountDollar(0.0)
                              setAmount(0.0)
                            }
                          }}
                        />
                      </Box>
                      <Divider>Or</Divider>
                      <Box>
                        <Typography variant='body2' sx={{color: "secondary.main", fontWeight: "700", width: "100%"}}> USD:</Typography>
                        <TextField
                          value={amountDollar}
                          sx={{width: "100%"}}
                          onChange={(e)=>{
                            if(e.target.value != "" && e.target.value != "NaN") {
                              setAmountDollar(parseFloat(e.target.value))
                              setAmount(parseFloat(e.target.value)/1234.56)
                            } else {
                              setAmountDollar(0.0)
                              setAmount(0.0)
                            }
                          }}
                        />
                      </Box>
                      <Typography variant='body1'>New balance: <span style={{fontWeight: "600"}}>{new Intl.NumberFormat('en-IN', {style: "currency", currency: "LUX"}).format(balance + parseFloat(amount))}</span></Typography>
                      
                      <Stack direction={"row"} spacing={"10px"} sx={{alignItems: "center"}}>
                        <Checkbox checked={confirmed} onChange={e=>{setConfirmed(e.target.checked)}} sx={{padding: "0"}}/>
                        <Typography variant='body2'>I agreed with Lux's <Link sx={{cursor: "pointer"}}>Terms & Policy</Link></Typography>
                      </Stack>

                      <Button disabled={!confirmed} onClick={()=>purchase()} variant='contained' type="submit">Purchase</Button>
                    </Stack>
                  </Box>
                </Stack>
              </Modal>
            </Stack>
          </Stack>
          </>
          :
          <>
          <Box sx={{width: "100%"}}>
            <Button variant='contained' sx={{width: "100%"}} onClick={()=>callCreateWallet()}>Create your wallet</Button>
            <Modal
              open={createWallet}
              onClose={()=>{
                setCreateWallet(false)
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
                  <Typography variant='h5'>Wallet created</Typography>
                  <IconButton onClick={()=>{setCreateWallet(false)}}>
                    <Close/>
                  </IconButton>
                </Stack>
                <Divider/>
                <Box sx={{p: 4}}>
                  <Stack direction={"column"} spacing={"20px"}>
                    <Typography variant='body1'>Please save the following information!</Typography>
                    <Box sx={{height: "60%", display: "flex", padding: "10px 10px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "4px", alignItems: "center"}}>
                      <Typography variant='body1' sx={{color: "secondary.main", fontWeight: "700"}}> Wallet address:</Typography>
                      <Typography variant='body1' sx={{color: "secondary.dark", m: "0 5px"}}> {address} </Typography>
                    </Box>
                    <Box sx={{height: "60%", display: "flex", padding: "10px 10px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "4px", alignItems: "center"}}>
                      <Typography variant='body1' sx={{color: "secondary.main", fontWeight: "700"}}> Private key:</Typography>
                      <Typography variant='body1' sx={{color: "secondary.dark", m: "0 5px"}}> {key} </Typography>
                    </Box>

                    <Button onClick={()=>confirmWallet()} variant='contained' type="submit">Confirm</Button>
                  </Stack>
                </Box>
              </Stack>
            </Modal>
          </Box>
          </>
        }
        
      </Stack>
      <Divider sx={{margin: "20px 0"}}/>
      {/* <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", mb: "20px"}}>
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
          {cards.map(card=>(
            <Grid item xs={12} sm={6}>
              <CardInfo card={{
                type: card.type,
                cardNumber: card.card_number
              }}/>
            </Grid>
          ))}
      </Grid> */}
    </>
  )
}

export default Balance