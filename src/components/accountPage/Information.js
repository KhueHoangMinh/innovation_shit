import { FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

function EditableInfo(props) {
    const [editting, setEditting] = useState(false)
    const [value, setValue] = useState("")
  
    useEffect(()=>{
      setValue(props.value)
    },[])
  
    return (
      <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", width: "100%", height: "30px", padding: "20px 10px", transition: "0.2s ease-in-out", borderRadius: "10px", "&:hover": {backgroundColor: "rgba(255,255,255,0.03)"}}}>
        <FormControl>
          <Stack spacing={"10px"} direction={"row"} sx={{alignItems: "center"}}>
            <Typography variant='body1' sx={{fontWeight: "600", width: "100px"}}>{props.label}</Typography>
            {
            editting ? 
              <>
                <TextField value={value} sx={{height: "100%", "& input": {padding: "5px"}}} onChange={(e)=>{setValue(e.target.value)}}/>
              </>
              : 
              <>
                <Typography variant='body1' noWrap={false} sx={{height: "fit-content",padding: "6px"}}>{value}</Typography>
              </>
            }
          </Stack>
        </FormControl>
          {
          editting ? 
            <>
              <Typography variant="body2" sx={{transition: "0.2s ease-in-out", cursor: "pointer", color: "secondary.dark", "&:hover": {color: "secondary.light"}}} onClick={()=>{
                setEditting(false)
              }}>
                Save
              </Typography>
            </>
            : 
            <>
              <Typography variant="body2" sx={{transition: "0.2s ease-in-out", cursor: "pointer", color: "secondary.dark", "&:hover": {color: "secondary.light"}}} onClick={()=>setEditting(true)}>
                Edit
              </Typography>
            </>
          }
      </Stack>
    )
  }

function Information() {
    return (
      <>
        <Grid container spacing={"10px"} sx={{width: "100%"}}>
          <Grid item xs={12} sm={6}>
              <EditableInfo label={"First name: "} value={"User"}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <EditableInfo label={"Last name: "} value={"Name"}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <EditableInfo label={"User name: "} value={"User Name"}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <EditableInfo label={"Birth: "} value={"11/11/1111"}/>
          </Grid>
          <Grid item xs={12} md={6}>
              <EditableInfo label={"Email: "} value={"exampleuseremail@test.com"}/>
          </Grid>
          <Grid item xs={12} md={6}>
              <EditableInfo label={"Phone: "} value={"0123456789"}/>
          </Grid>
          <Grid item xs={12} md={12}>
              <EditableInfo label={"Address: "} value={"Dongda, Hanoi, Vietnam"}/>
          </Grid>
        </Grid>
      </>
    )
  }

export default Information