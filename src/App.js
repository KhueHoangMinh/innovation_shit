import React, { createContext } from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'

import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
// import Header from './components/Header';
// import About from './components/About';
// import Market from './components/Market';
// import UserPage from './components/UserPage';
// import MarketProduct from './components/market-component/ProductPage';
// import Register from './components/Register';
// import Checkout from './components/Checkout';
// import Receipt from './components/Receipt';
import {CookiesProvider} from 'react-cookie'
import theme, { CustomStyle } from './colorTheme';
import { Box, ThemeProvider } from '@mui/material';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import TransitionProvider from './components/TransitionProvider';

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  overflow-y: auto;
  overflow-x: hidden;
  
`


function App() {

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
            <TransitionProvider duration={1000}>
              <AppWrapper>
                <Routes>
                  <Route path='/' element={<AuthPage/>}/>
                  <Route path='/home' element={<><HomePage/></>}/>
                  {/* 
                  <Route path='/about' element={<><Header/><About/></>}/>
                  <Route path='/market' element={<><Header/><Market/></>}/>
                  <Route path='/market/:productId' element={<><Header/><MarketProduct/></>}/>
                  <Route path='/user' element={<><Header/><UserPage/></>}/>
                  <Route path='/checkout' element={<><Header/><Checkout/></>}/>
                  <Route path='/receipt' element={<><Header/><Receipt/></>}/> */}
                </Routes>
              </AppWrapper>
            </TransitionProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
