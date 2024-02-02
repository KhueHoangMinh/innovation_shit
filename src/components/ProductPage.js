import { botttsNeutral } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Modal, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { List } from './common/List';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ProductInfo(props) {
  return (
    <Box {...props}>ProductInfo</Box>
  )
}


function ProductAction(props) {
  return (
    <Box {...props}>ProductAction</Box>
  )
}

function RelatedProducts(props) {
  return (
    <Box {...props}>RelatedProducts</Box>
  )
}



function ProductPage() {

  
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

  async function getImage() {
    const img = await createAvatar(botttsNeutral, {
      seed: makeid(5),
      size: 128,
      // backgroundtype: "gradientLinear"
      // ... other options
    }).toDataUri()
  
    return img;
  }
  
  const [imgAPI,setImgAPI] = useState(null)
  const [confirming, setConfirming] = useState(false)

    useEffect(()=>{
      getImage().then((api)=>setImgAPI(api))
    },[])

  return (
    <>
      <Grid container spacing={"20px"} sx={{width: "100%"}}>

        <Grid item xs={12} sm={6} md={5}>
          <Stack direction={"column"} spacing={"20px"}>
            <Box sx={{width: "100%"}}>
              <img src={imgAPI} style={{width: "100%", overflow: "hidden", borderRadius: "20px"}}/>
            </Box>

            <Typography variant='body2' sx={{textAlign: "justify"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} md={7}>
          <Stack direction={"column"} sx={{width: "100%"}} spacing={"20px"}>
            <Typography variant='h3'>Product Name</Typography>

            <Paper sx={{display: "flex", justifyContent: "space-between", alignItems: "center", p: "20px",borderRadius: "20px"}}>
              <Typography variant='h4'>1000 LUX</Typography>
              <Button variant='contained' onClick={()=>{setConfirming(true)}}>Buy</Button>
              
              <Modal
                open={confirming}
                onClose={()=>{
                  setConfirming(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  borderRadius: "20px",
                  boxShadow: 24,
                  p: 4,
                }}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
                </Box>
              </Modal>
            </Paper>

            <Box sx={{borderRadius: "20px", overflow: "hidden"}}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Accordion 1
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
              </Accordion>

              
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Accordion 2
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Accordion 3
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
              </Accordion>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Box>
        <List
         title={"Related Pieces"} link={''} items={[...Array(15)]}/>
      </Box>
    </>
  )
}

export default ProductPage