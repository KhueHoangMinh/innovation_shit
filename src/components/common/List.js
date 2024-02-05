import { Box, Button, Grid, Link, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Card } from './Card'
import { useNavigate } from 'react-router-dom'
import { TransitionContext } from '../TransitionProvider'

// list to display a group of product cards
function List(props) {

  // transition to product page on click
  const navigate = useNavigate()
  const Transition = useContext(TransitionContext)

  return (
    <Box sx={{width: "100%"}}>
      <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", mb: "10px"}}>
        <Typography variant='h4' sx={{fontWeight: "800"}}>{props.title}</Typography>
        {props.link &&
        
          <Button variant='text' color={"secondary"} sx={{fontSize: "14px", fontWeight: "600"}} onClick={()=>{Transition(()=>{navigate(
            "/0/gallery?category=" + props.link
            )})}}>View all</Button>
        }
      </Stack>
      <Grid container spacing={"20px"}>
        {props.items.map((item)=>(
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card {...item}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export {List}