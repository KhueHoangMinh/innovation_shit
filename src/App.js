import React from 'react';
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
              <OverlayScrollbarsComponent defer options={{
                overflow: {
                  x: 'hidden',
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
              }} style={{width: "100%", height: "100%"}}>
                <Routes>
                    <Route path='/' element={<><HomePage/></>}/>
                    <Route path='/auth' element={<AuthPage/>}/>

                    <Route path="/:userId" element={<>
                        <MainLayout/>
                    </>}>
                      <Route path="/:userId/" element={<HomePage/>}/>
                    </Route>
                  <Route path='*' element={<ErrorPage/>} />
                </Routes>
              </OverlayScrollbarsComponent>
            </AppWrapper>
          </TransitionProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
