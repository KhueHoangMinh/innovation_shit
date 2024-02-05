import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Chip, Divider, FormControlLabel, FormGroup, Grid, MenuItem, Pagination, Slider, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { backend } from '../constants';
import Axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card } from './common/Card'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function SearchPage(props) {

    // store the values from server
    const [mostSearched, setMostSearched] = useState([])
    const [trending, setTrending] = useState([])
    const [itemNum, setItemNum] = useState(12)
    const [page,setPage] = useState(1)

    useEffect(()=>{
        // get categories mock data from server
        Axios.get(backend+'/api/trending').then(res=>{
        setTrending(res.data)
        })

        // get search result mpck data from server
        Axios.get(backend+'/api/search').then(res=>{
        setMostSearched(res.data)
        })
    },[])

  return (
    <>
        <Typography variant='h5'>Search</Typography>
        
        <Box sx={{ width: "100%", display: 'flex', alignItems: 'flex-end', mb: "20px"}}>
            <SearchIcon sx={{ fontSize: "30px", mr: 1, my: 0.5 }} />
            <TextField color={"secondary"} sx={{width: "100%"}} placeholder={"What are you looking for?"} variant="standard" />
        </Box>

        <Stack direction={"row"} spacing={"10px"} sx={{alignItems: "center"}}>
            <Typography variant='h5'>Filter</Typography>
            <FilterAltIcon sx={{height: "100%"}}/>
        </Stack>

        <Box>
            <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                Type
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup>
                    <Stack direction={"row"} spacing={"20px"} sx={{flexWrap: "wrap"}}>
                        <FormControlLabel control={<Checkbox/>} label="Product" />
                        <FormControlLabel control={<Checkbox/>} label="LUX" />
                        <FormControlLabel control={<Checkbox/>} label="Archived" />
                    </Stack>
                </FormGroup>
            </AccordionDetails>
            </Accordion>
            <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                Categories
            </AccordionSummary>
            <AccordionDetails>
                
                <Stack direction={"row"} sx={{flexWrap: "wrap"}}>
                    {trending && trending.map((chip)=>(
                    <>
                        <Chip label={chip} color={"secondary"} variant="text" onClick={()=>{console.log("click chip")}} 
                        sx={{margin: "5px", fontWeight: "600px", backgroundColor: "secondary.main", fontWeight: "600"}}/>
                    </>
                    ))}
                </Stack>
            </AccordionDetails>
            </Accordion>
            <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
            >
                Publish date
            </AccordionSummary>
            <AccordionDetails>
                
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction={"row"} spacing={"20px"} sx={{justifyContent: "center", alignItems: "center", width: "100%"}}>
                    <DatePicker label={"From date"}/>
                    <Typography>-</Typography>
                    <DatePicker label={"To date"}/>
                </Stack>
            </LocalizationProvider>
            </AccordionDetails>
            </Accordion>
            <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
            >
                Price
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction={"row"} spacing={"20px"} sx={{alignItems: "center", width: "100%"}}>
                    <TextField label={"From"}/>
                        <Slider sx={{flexGrow: 1}} value={[0,100]}/>
                    <TextField label={"To"}/>
                </Stack>
            </AccordionDetails>
            </Accordion>
        </Box>

        <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center"}}>
            <Typography variant='h5'>Results: ({mostSearched.length})</Typography>
            <TextField
            select
            label="Items"
            value={itemNum}
            onChange={(e)=>setItemNum(e.target.value)}
            sx={{width: "70px"}}
            >
                <MenuItem key={12} value={12}>
                    {12}
                </MenuItem>
                <MenuItem key={24} value={24}>
                    {24}
                </MenuItem>
                <MenuItem key={36} value={36}>
                    {36}
                </MenuItem>
                <MenuItem key={60} value={60}>
                    {60}
                </MenuItem>
            </TextField>
        </Stack>
        <Divider/>
        <Box>
            <Grid container spacing={"20px"}>
                {mostSearched.slice((page-1)*itemNum, page*itemNum).map((item)=>(
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Card {...item}/> 
                    </Grid>
                ))}
            </Grid>
        </Box>
        <Pagination sx={{display: "flex", justifyContent: "center"}} onChange={(e,v)=>setPage(v)} count={mostSearched ? Math.ceil(mostSearched.length*1.0/itemNum) : 1} color="primary" />
    </>
  )
}

export default SearchPage