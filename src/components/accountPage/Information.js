import { FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { backend } from '../../constants';
import Axios from 'axios';

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

function Information(props) {
  const [details, setDetails] = useState({})

  useEffect(()=>{
    Axios.get(backend+'/api/user_details').then(res=>{
      setDetails(res.data)
    })
    console.log(details)
  },[props.page])

    return (
      <>
        <Grid container spacing={"10px"} sx={{width: "100%"}}>
          <Grid item xs={12} sm={6}>
              <EditableInfo label={"First name: "} value={details.first_name ? details.first_name : "N/A"}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <EditableInfo label={"Last name: "} value={details.last_name ? details.last_name : "N/A"}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <EditableInfo label={"User name: "} value={details.username ? details.username : "N/A"}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <EditableInfo label={"Birth: "} value={details.birth ? details.birth : "N/A"}/>
          </Grid>
          <Grid item xs={12} md={6}>
              <EditableInfo label={"Email: "} value={details.email ? details.email : "N/A"}/>
          </Grid>
          <Grid item xs={12} md={6}>
              <EditableInfo label={"Phone: "} value={details.phone ? details.phone : "N/A"}/>
          </Grid>
          <Grid item xs={12} md={12}>
              <EditableInfo label={"Address: "} value={details.address ? details.address : "N/A"}/>
          </Grid>
        </Grid>
      </>
    )
  }

export default Information