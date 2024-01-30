import { Box, Button, Grid, Link, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Card } from './Card'
import { useNavigate } from 'react-router-dom'
import { TransitionContext } from '../TransitionProvider'

function List(props) {
  const navigate = useNavigate()

  const Transition = useContext(TransitionContext)

  return (
    <Box sx={{width: "100%"}}>
        <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", mb: "10px"}}>
          <Typography variant='h4' sx={{fontWeight: "800"}}>{props.title}</Typography>
          <Button variant='text' onClick={()=>{Transition(()=>{navigate(props.link)})}}>View all</Button>
        </Stack>
        <Grid container spacing={"20px"}>
          {props.items.map(()=>(
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card/>
            </Grid>
          ))}
        </Grid>
      </Box>
  )
}

export {List}