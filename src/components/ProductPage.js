import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Grid, Link, Modal, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { List } from './common/List';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card } from './common/Card';
import Chart from "react-apexcharts";
import Axios from 'axios';
import { backend } from '../constants';

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

  // store values from server
  const [related, setRelated] = useState([])
  const [product, setProduct] = useState({})
  const [rate, setRate] = useState(null)

  useEffect(()=>{
    // get product list mock data from server
    Axios.get(backend+'/api/product_list').then(res=>{
      setRelated(res.data)
    })
    
    // get product mock data from server
    Axios.get(backend+'/api/product').then(res=>{
      setProduct(res.data)
    })
    
    // get market rate mock data from server
    Axios.get(backend+'/api/market_rate').then(res=>{
      setRate(res.data.rate)
    })
  },[])
  
  // open/close of confirm buying modal
  const [confirming, setConfirming] = useState(false)

  // state of user agreed to policies
  const [confirmed, setConfirmed] = useState(false)

  // mock data for the chart, implementing
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [,"27/1","28/1","29/1","30/1","31/1","1/2","2/2","3/2"]
      }
    },
    series: [
      {
        name: "series-1",
        data: [300, 400, 450, 500, 490, 600, 700, 1000]
      }
    ]
  })

  return (
    <>
      <Grid container sx={{width: "100%"}}>

        <Grid item xs={12} sm={6} md={5}>
          <Stack direction={"column"} spacing={"20px"} sx={{mr: {xs: "0", sm: "20px"}}}>
            <Box sx={{width: "100%"}}>
              <img src={product.image_url} style={{width: "100%", overflow: "hidden", borderRadius: "20px"}}/>
            </Box>

            <Typography variant='body2' sx={{textAlign: "justify"}}>
              {product.product_description}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} md={7}>
          <Stack direction={"column"} sx={{width: "100%"}} spacing={"20px"}>
            <Typography variant='h3'>{product.product_name}</Typography>

            <Paper sx={{p: "20px",borderRadius: "20px"}}>
              <Typography variant='body2' color={"secondary.dark"} sx={{fontWeight: "600"}}>current price</Typography>
              <Stack direction={"row"} spacing={"10px"} sx={{mb: "20px"}}>
                <Typography variant='h4' sx={{fontWeight: "700"}}>{product.best_price && product.price_unit ? new Intl.NumberFormat('en-IN', {style: "currency", currency: product.price_unit}).format( product.best_price ) : "N/A" }</Typography>
                <Typography variant='body2' color={"secondary.dark"} sx={{fontWeight: "600"}}>{product.best_price && product.price_unit && rate ? new Intl.NumberFormat('en-IN', {style: "currency", currency: "USD"}).format( product.best_price * rate ) : "N/A" }</Typography>
              </Stack>
              <Button variant='contained' sx={{width: "100%"}} onClick={()=>{setConfirming(true)}}>Buy</Button>
              
              <Modal
                open={confirming}
                onClose={()=>{
                  setConfirming(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                    <Stack direction={"column"} spacing={"20px"} sx={{
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
                      <Card notMove={true} {...product}/>
                      <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center"}}>
                        <Typography variant="h6">
                          Total: 
                        </Typography>
                        <Typography variant="h6">
                          {new Intl.NumberFormat('en-IN', {style: "currency", currency: "LUX"}).format(1000)}
                        </Typography>
                      </Stack>
                      <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center"}}>
                        <Typography variant="h6">
                          Payment: 
                        </Typography>
                        <Typography variant="h6">
                          {new Intl.NumberFormat('en-IN', {style: "currency", currency: "LUX"}).format(1000)}
                        </Typography>
                      </Stack>
                      <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center"}}>
                        <Typography variant="body1">
                          New balance: 
                        </Typography>
                        <Typography variant="body1">
                          {new Intl.NumberFormat('en-IN', {style: "currency", currency: "LUX"}).format(0)}
                        </Typography>
                      </Stack>
                      <Stack direction={"row"} spacing={"10px"} sx={{alignItems: "center"}}>
                        <Checkbox checked={confirmed} onChange={e=>{setConfirmed(e.target.checked)}} sx={{padding: "0"}}/>
                        <Typography variant='body2'>I agreed with Lux's <Link sx={{cursor: "pointer"}}>Terms & Policy</Link></Typography>
                      </Stack>
                      <Button disabled={!confirmed} variant='contained' onClick={()=>{
                        setConfirming(false)
                      }}>Confirm</Button>
                    </Stack>
              </Modal>
            </Paper>

            <Box sx={{borderRadius: "20px", overflow: "hidden"}}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Price history
                </AccordionSummary>
                <AccordionDetails>
                  <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    height={300}
                    style={{width: "100%"}}
                  />
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
         title={"Related Pieces"} items={related}/>
      </Box>
    </>
  )
}

export default ProductPage