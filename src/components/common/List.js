import { Box, Grid, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Card } from './Card'

function List(props) {
  return (
    <Box sx={{width: "100%"}}>
        <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", mb: "10px"}}>
          <Typography variant='h4'>{props.title}</Typography>
          <Link href={props.link}>View all</Link>
        </Stack>
        <Grid container spacing={"20px"}>
          {props.items.map(()=>(
            <Grid item xs={2}>
              <Card/>
            </Grid>
          ))}
        </Grid>
      </Box>
  )
}

export {List}