import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, MenuItem, Pagination, Slider, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card } from './common/Card'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function SearchPage() {
  return (
    <>
        <Typography variant='h5'>Search</Typography>
        
        <Box sx={{ width: "100%", display: 'flex', alignItems: 'flex-end', mb: "20px"}}>
            <SearchIcon sx={{ fontSize: "30px", mr: 1, my: 0.5 }} />
            <TextField color={"secondary"} sx={{width: "100%"}} placeholder={"What are you looking for?"} variant="standard" />
        </Box>

        <Typography variant='h5'>Filter</Typography>

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
                        <Slider sx={{flexGrow: 1}}/>
                    <TextField label={"To"}/>
                </Stack>
            </AccordionDetails>
            </Accordion>
        </Box>

        <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center"}}>
            <Typography variant='h5'>Results: (10)</Typography>
            <TextField
            select
            label="Rows"
            defaultValue={5}
            sx={{width: "70px"}}
            >
                <MenuItem key={5} value={5}>
                    {5}
                </MenuItem>
                <MenuItem key={10} value={10}>
                    {10}
                </MenuItem>
                <MenuItem key={20} value={20}>
                    {20}
                </MenuItem>
                <MenuItem key={50} value={50}>
                    {50}
                </MenuItem>
            </TextField>
        </Stack>
        <Divider/>
        <Box>
            <Grid container spacing={"20px"}>
                {[...Array(10)].map(()=>(
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Card/> 
                    </Grid>
                ))}
            </Grid>
        </Box>
        <Pagination sx={{display: "flex", justifyContent: "center"}} count={10} color="primary" />
    </>
  )
}

export default SearchPage