import * as React from 'react';
import { Stack, Chip } from '@mui/material'
import { List } from './common/List';
import Slider from './common/Slider';


function HomePage(props) {

  const chips=[
    "All",
    "Art",
    "Gaming",
    "Memberships",
    "PFPs",
    "Photography",
    "Music"]

  return (
    <>
      <Stack direction={"row"} sx={{}}>
        {chips.map((chip)=>(
          <>
            <Chip label={chip} color={"secondary"} variant="text" onClick={()=>{console.log("click chip")}} 
            sx={{marginRight: "10px", fontWeight: "600px", backgroundColor: "secondary.main", fontWeight: "600"}}/>
          </>
        ))}
      </Stack>

      <Slider/>
      
      <List title={"Category 1"} link={''} items={[...Array(10)]}/>
      <List title={"Category 2"} link={''} items={[...Array(6)]}/>
      <List title={"Category 3"} link={''} items={[...Array(6)]}/>
    </>
  );
}

export default HomePage