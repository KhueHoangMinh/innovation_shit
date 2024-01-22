import { Box, Button, Typography } from '@mui/material'
import React, {useContext} from 'react'
import { TransitionContext } from './TransitionProvider'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
    const navigate = useNavigate()
    const Transition = useContext(TransitionContext)
  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%"}}>
        <Typography variant='h2'>
            404
        </Typography>
        <Typography variant='h4'>
            There's nothing here :&#40;
        </Typography>
        <Button onClick={()=>Transition(()=>navigate("/"))}>
            Go home!
        </Button>
    </Box>
  )
}

export default ErrorPage