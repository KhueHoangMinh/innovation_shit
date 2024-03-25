import styled from '@emotion/styled';
import { Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, tableCellClasses } from '@mui/material';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React from 'react'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { backend } from '../../constants';
import Axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Transactions() {

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [key, setKey] = useState("");

  // get authentication state from redux
  const authState = useSelector(state => state.auth)

  // state to store transactions
  const [transactions, setTransactions] = useState([])

  useEffect(()=>{
    // get transaction from backend
      Axios.get(backend+'/api/wallet/transactions/abc' + key,{}, {
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${authState.token}`
        }
      }).then(res=>{
        console.log(res.data)
        setTransactions(res.data)
      })
  },[])

  const readTransaction = () => {
    // get user's transactions from server
    if(key && authState && authState.token) {
      Axios.get(backend+'/api/wallet/transactions/' + key,{}, {
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${authState.token}`
        }
      }).then(res=>{
        console.log(res.data)
        setTransactions(res.data)
      })
    }
  }

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  // define table's columns
  const columns = [
    { id: 'product_id', label: 'Product ID', minWidth: 170 },
    // { id: 'token_name', label: 'Token Name', minWidth: 100 },
    {
      id: 'from',
      label: 'Sender',
      minWidth: 170,
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'to',
      label: 'Receiver',
      minWidth: 170,
      format: (value) => value.toLocaleString('en-US'),
    },
    // {
    //   id: 'hash',
    //   label: 'Hash',
    //   minWidth: 170,
    //   format: (value) => value.toFixed(2),
    // },
    {
      id: 'time',
      label: 'Time',
      minWidth: 170,
      format: (value) => value.toFixed(2),
    },
    // {
    //   id: 'fee',
    //   label: 'Fee',
    //   minWidth: 170,
    //   format: (value) => value.toFixed(2),
    // },
    // {
    //   id: 'signature',
    //   label: 'Signature',
    //   minWidth: 170,
    //   format: (value) => value.toFixed(2),
    // },
  ];
  
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
                {transactions
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
                                {/* {column.id === "fee" ? <>{Math.random() < 0.5 ? <ArrowOutwardIcon sx={{color: red[500]}}/> : <CallReceivedIcon sx={{color: green[500]}}/>}</>:<></>} */}
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
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </>
    )
  }

export default Transactions