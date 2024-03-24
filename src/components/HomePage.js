import * as React from 'react';
import { Stack, Chip } from '@mui/material'
import { List } from './common/List';
import Slider from './common/Slider';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { backend } from '../constants';
import { useAuth0 } from '@auth0/auth0-react';


function HomePage(props) {
  
  // store products from server
  const [highlightCategories, setHighlightCategories] = useState([])
  const [trending, setTrending] = useState([])
  const [homeData, setHomeData] = useState({})
  const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0()

  useEffect(()=>{
    if(user && isAuthenticated) {
      const accessToken = getAccessTokenSilently()
      // get product lists from server
      Axios.get(backend+'/api/gallery',[],{
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      }).then(res=>{
        setHomeData(res.data)
      })
    }

  },[user])

  return (
    <>
      <Stack direction={"row"} sx={{flexWrap: "wrap"}}>
        {homeData.categories && homeData.categories.map((chip)=>(
          <>
            <Chip label={chip} color={"secondary"} variant="text" onClick={()=>{console.log("click chip")}} 
            sx={{margin: "5px", fontWeight: "600px", backgroundColor: "secondary.main", fontWeight: "600"}}/>
          </>
        ))}
      </Stack>

      {homeData.header && <Slider items={homeData.header}/>}

      {homeData.body && homeData.body.map((category) => (
        <List title={category.category} link={category.category} items={category.data}/>
      ))}
    </>
  );
}

export default HomePage