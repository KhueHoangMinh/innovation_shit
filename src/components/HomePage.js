import * as React from 'react';
import { Stack, Chip } from '@mui/material'
import { List } from './common/List';
import Slider from './common/Slider';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { backend } from '../constants';


function HomePage(props) {
  
  // store products from server
  const [highlightCategories, setHighlightCategories] = useState([])
  const [trending, setTrending] = useState([])

  useEffect(()=>{
    // get trending categories from server
    Axios.get(backend+'/api/trending').then(res=>{
      setTrending(res.data)
    })
    
    // get product lists from server
    Axios.get(backend+'/api/home').then(res=>{
      setHighlightCategories(res.data)
    })
  },[])

  return (
    <>
      <Stack direction={"row"} sx={{flexWrap: "wrap"}}>
        {trending && trending.map((chip)=>(
          <>
            <Chip label={chip} color={"secondary"} variant="text" onClick={()=>{console.log("click chip")}} 
            sx={{margin: "5px", fontWeight: "600px", backgroundColor: "secondary.main", fontWeight: "600"}}/>
          </>
        ))}
      </Stack>

      {
        highlightCategories && 
        <>
          {highlightCategories.carousel && <Slider items={highlightCategories.carousel}/>}
          {highlightCategories.categories && highlightCategories.categories.map((category) => (
            <List title={category.name} link={category.name} items={category.list}/>
          ))}
        </>
      }
    </>
  );
}

export default HomePage