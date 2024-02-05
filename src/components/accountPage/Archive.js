import React, { useEffect, useState } from 'react'
import { backend } from '../../constants';
import Axios from 'axios';
import { Box, Grid } from '@mui/material';
import { Card } from '../common/Card';

function Archive() {
  // Get user's archived products
  const [archived, setArchived] = useState([])

  useEffect(()=>{
    // get mock data from server
    Axios.get(backend+'/api/archived').then(res=>{
      setArchived(res.data)
    })
  },[])

    return (
      <>
      <Box>
          <Grid container spacing={"20px"}>
              {archived.map((item)=>(
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                      <Card {...item}/> 
                  </Grid>
              ))}
          </Grid>
      </Box>
      </>
    )
    }

export default Archive