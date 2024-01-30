import { botttsNeutral } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Box, Button, Divider, Fade, FormControl, FormLabel, Grid, Paper, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tabs, TextField, Typography, tableCellClasses } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { List } from './common/List';
import AddIcon from '@mui/icons-material/Add';
import ScrollWrapper from './common/ScrollWrapper';
import styled from '@emotion/styled';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

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

function CardInfo(props) {
  return (
    <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", width: "100%", height: "fit-content", padding: "20px 10px", transition: "0.2s ease-in-out", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.01)", "&:hover": {backgroundColor: "rgba(255,255,255,0.03)"}}}>
      <Stack spacing={"10px"} direction={{xs:"column", md: "row"}} sx={{alignItems: {xs: "start", md: "center"}}}>
        <Typography variant='body1' sx={{fontWeight: "600"}}>
          {props.card.type}
        </Typography>
        <Typography variant='body1' sx={{fontWeight: "600"}}>
          {props.card.cardNumber.split("").map((v,i)=><>{(i >= 0 && i < 4) || (i >= props.card.cardNumber.length - 4 && i < props.card.cardNumber.length) ? <>{props.card.cardNumber[i]}</> : <>&#183;</>}{(i + 1) % 4 == 0 ? <>&#160;</> : <></>}</>)}
        </Typography>
      </Stack>
      <Typography variant="body2" sx={{transition: "0.2s ease-in-out", cursor: "pointer", color: "secondary.dark", "&:hover": {color: "secondary.light"}}} onClick={()=>{}  }>
        Manage
      </Typography>
    </Stack>
  )
}

function Head() {
    const [imgAPI,setImgAPI] = useState(null)
    useEffect(()=>{
      getImage().then((api)=>setImgAPI(api))
    },[])
    return (
      <Stack direction={{xs: "column", md: "row"}} sx={{height: {xs: "fit-content", md: "300px"}}} spacing={"20px"}>
            <Box 
                sx={{
                    borderRadius: "20px", overflow: "hidden", position: "relative",
                    height: {md: "300px"}, width: {xs: "100%", md: "300px"},
                    "&::before": {content: "''", paddingTop: "100%", display: "block"}
                }}
            >
                <img src={imgAPI} style={{position: "absolute", top: 0, left: 0, height: "100%", width: "100%"}}/>
            </Box>
            <Stack direction={"column"} spacing={"5px"}>
                <Typography variant='h4' sx={{color: "secondary.main", fontWeight: "600"}}>User Name </Typography>
                <Typography variant='body1' sx={{color: "secondary.dark"}}>exampleuseremail@test.com</Typography>
            </Stack>
      </Stack>
    )
  }
  
function Body() {
    const [current, setCurrent] = useState(0)

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    variant="scrollable"
                    scrollButtons="auto" 
                    value={current} onChange={(e,v) => setCurrent(v)} 
                    aria-label="basic tabs example"
                >
                    <Tab label="Archive"/>
                    <Tab label="Information"/>
                    <Tab label="Balance"/>
                    <Tab label="Transactions" />
                </Tabs>
            </Box>
            <Box sx={{ mt: "20px" }}>
                <Fade sx={{display: current === 0 ? "block" : "none"}} in={current === 0}>
                    <Box sx={{width: "100%"}}><Archive/></Box>
                </Fade>
                <Fade sx={{display: current === 1 ? "block" : "none"}} in={current === 1}>
                    <Box sx={{width: "100%"}}><Info/></Box>
                </Fade>
                <Fade sx={{display: current === 2 ? "block" : "none"}} in={current === 2}>
                    <Box sx={{width: "100%"}}><Balance/></Box>
                </Fade>
                <Fade sx={{display: current === 3 ? "block" : "none"}} in={current === 3}>
                    <Box sx={{width: "100%"}}><Transaction/></Box>
                </Fade>
            </Box>
        </Box>
    )
  }
  

function Archive() {
return (
    <>
      <List title={"Purchased"} link={''} items={[...Array(20)]}/>
    </>
)
}

function Info() {
    return (
      <>
        <Grid container spacing={"10px"} sx={{width: "100%"}}>
          <Grid item xs={12} sm={6}>
              <EditableInfo label={"First name: "} value={"User"}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <EditableInfo label={"Last name: "} value={"Name"}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <EditableInfo label={"User name: "} value={"User Name"}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <EditableInfo label={"Birth: "} value={"11/11/1111"}/>
          </Grid>
          <Grid item xs={12} md={6}>
              <EditableInfo label={"Email: "} value={"exampleuseremail@test.com"}/>
          </Grid>
          <Grid item xs={12} md={6}>
              <EditableInfo label={"Phone: "} value={"0123456789"}/>
          </Grid>
          <Grid item xs={12} md={12}>
              <EditableInfo label={"Address: "} value={"Dongda, Hanoi, Vietnam"}/>
          </Grid>
        </Grid>
      </>
    )
  }
  
function Balance() {
    return (
      <>
        <Stack direction={"row"} spacing={"20px"} sx={{ alignItems: "center"}}>
          <Typography variant='h5'>Total: </Typography>
          <Typography variant='h6' sx={{fontWeight: "600"}}>1000 LUX</Typography>
        </Stack>
        <Divider sx={{margin: "20px 0"}}/>
        <Stack direction={"row"} sx={{justifyContent: "space-between", alignItems: "center", mb: "20px"}}>
          <Typography variant='h5'>Your cards</Typography>
          <Button variant='text'><AddIcon/>Add Card</Button>
        </Stack>
        <Grid container spacing={"10px"} sx={{width: "100%"}}>
          <Grid item xs={12} sm={6}>
              <CardInfo card={{
                type: "VISA",
                cardNumber: "4111111111111111"
              }}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <CardInfo card={{
                type: "VISA",
                cardNumber: "4111111111111111"
              }}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <CardInfo card={{
                type: "VISA",
                cardNumber: "4111111111111111"
              }}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <CardInfo card={{
                type: "VISA",
                cardNumber: "4111111111111111"
              }}/>
          </Grid>
          <Grid item xs={12} sm={6}>
              <CardInfo card={{
                type: "VISA",
                cardNumber: "4111111111111111"
              }}/>
          </Grid>
        </Grid>
      </>
    )
  }

function Transaction() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
const columns = [
  { id: 'token_id', label: 'Token ID', minWidth: 170 },
  { id: 'token_name', label: 'Token Name', minWidth: 100 },
  {
    id: 'sender',
    label: 'Sender',
    minWidth: 170,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'receiver',
    label: 'Receiver',
    minWidth: 170,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'hash',
    label: 'Hash',
    minWidth: 170,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'timestamp',
    label: 'Time',
    minWidth: 170,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'fee',
    label: 'Fee',
    minWidth: 170,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'signature',
    label: 'Signature',
    minWidth: 170,
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = Array(100).fill(
  {
    "token_id": "0x" + makeid(15),
    "token_name": "LUX",
    "sender": "0x" + makeid(15),
    "receiver": "0x" + makeid(15),
    "hash": "0x" + makeid(15),
    "timestamp": "2024-01-30T12:34:56Z",
    "fee": `${Math.random()} ETH`,
    "signature": "0x" + makeid(15)
  });


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: "20px" }}>
        <OverlayScrollbarsComponent defer
          options={{
          overflow: {
            x: 'scroll',
            y: 'scroll',
          },
          scrollbars: {
            theme: 'os-theme-light',
            visibility: 'auto',
            autoHide: 'never',
            autoHideDelay: 1300,
            autoHideSuspend: false,
            dragScroll: true,
            clickScroll: false,
            pointers: ['mouse', 'touch', 'pen'],
          },
        }} style={{maxWidth: "100%"}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{fontWeight: "600", backgroundColor: "black"}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
        </OverlayScrollbarsComponent>
        
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

function AccountPage() {
  return (
    <Stack direction={"column"} spacing={"20px"}>
        <Head/> 
        <Body/>
    </Stack>
  )
}

export default AccountPage