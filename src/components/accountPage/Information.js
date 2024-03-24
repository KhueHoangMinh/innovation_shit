import { Box, FormControl, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { backend } from '../../constants';
import Axios from 'axios';
import { useSelector } from 'react-redux';

// inline edit component
function EditableInfo(props) {

  // editting/viewing state
  const [editting, setEditting] = useState(false)

  const [original, setOriginal] = useState("")

  // editting value
  const [value, setValue] = useState("")

  const authState = useSelector(state => state.auth)

  const save = () => {
    if(authState && authState.user) {
      Axios.put(backend + '/api/user/' + authState.user.sub, {[props.name]: value})
    }

    setEditting(false)
    setOriginal(value)
  }

  useEffect(()=>{
    setOriginal(props.value)
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
              <Typography variant='body1' noWrap={false} sx={{height: "fit-content",padding: "6px"}}>{original}</Typography>
            </>
          }
        </Stack>
      </FormControl>
      
        <Stack direction='horizontal'>
        {
        editting ? 
          <>
            <Typography variant="body2" sx={{marginRight: "10px", transition: "0.2s ease-in-out", cursor: "pointer", color: "secondary.dark", "&:hover": {color: "secondary.light"}}} onClick={()=>{
              save()
            }}>
              Save
            </Typography>
            <Typography variant="body2" sx={{transition: "0.2s ease-in-out", cursor: "pointer", color: "primary.dark", "&:hover": {color: "primary.light"}}} onClick={()=>{
              setEditting(false)
            }}>
              Cancel
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
    </Stack>
  )
}

function Information(props) {

  // state to store user's details
  const [details, setDetails] = useState({})

  useEffect(()=>{
    // get user's details
    Axios.get(backend+'/api/user_details').then(res=>{
      setDetails(res.data)
    })
  },[props.page])

  return (
    <>
      <Grid container spacing={"10px"} sx={{width: "100%"}}>
        <Grid item xs={12} sm={6}>
            <EditableInfo label={"First name: "} name={"first_name"} value={details.first_name ? details.first_name : "N/A"}/>
        </Grid>
        <Grid item xs={12} sm={6}>
            <EditableInfo label={"Last name: "} name={"last_name"} value={details.last_name ? details.last_name : "N/A"}/>
        </Grid>
        <Grid item xs={12} sm={6}>
            <EditableInfo label={"User name: "} name={"username"} value={details.username ? details.username : "N/A"}/>
        </Grid>
        <Grid item xs={12} sm={6}>
            <EditableInfo label={"Birth: "} name={"birth"} value={details.birth ? details.birth : "N/A"}/>
        </Grid>
        <Grid item xs={12} md={6}>
            <EditableInfo label={"Email: "} name={"email"} value={details.email ? details.email : "N/A"}/>
        </Grid>
        <Grid item xs={12} md={6}>
            <EditableInfo label={"Phone: "} name={"phone"} value={details.phone ? details.phone : "N/A"}/>
        </Grid>
        <Grid item xs={12} md={12}>
            <EditableInfo label={"Address: "} name={"address"} value={details.address ? details.address : "N/A"}/>
        </Grid>
      </Grid>
    </>
  )
}

export default Information