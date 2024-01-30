import React, { createRef, useEffect, useRef, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

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
import theme from './colorTheme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import styled from '@emotion/styled';
import TransitionProvider from './components/TransitionProvider';
import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import ErrorPage from './components/ErrorPage';
import MainLayout from './components/MainLayout';
import ScrollWrapper from './components/common/ScrollWrapper';
import ProductPage from './components/ProductPage';
import GalleryPage from './components/GalleryPage';
import AccountPage from './components/AccountPage';

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`

function App() {

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline/>
          <TransitionProvider duration={400}>
            <AppWrapper sx={{backgroundColor: "primary.main"}}>
              <ScrollWrapper>
                <Routes>
                    {/* <Route path='/' element={<><HomePage/></>}/> */}
                    <Route path='/' element={<AuthPage/>}/>
                    <Route path="/:userId" element={<>
                      <MainLayout/>
                    </>}>
                      <Route path="/:userId/" element={<HomePage/>}/>
                      <Route path="/:userId/gallery/" element={<GalleryPage/>}/>
                      <Route path="/:userId/gallery/:itemId" element={<ProductPage/>}/>
                      <Route path="/:userId/account/" element={<AccountPage/>}/>
                    </Route>
                  <Route path='*' element={<ErrorPage/>} />
                </Routes>
              </ScrollWrapper>
            </AppWrapper>
          </TransitionProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
