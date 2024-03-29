import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import {CookiesProvider} from 'react-cookie'
import theme from './colorTheme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import styled from '@emotion/styled';
import TransitionProvider from './components/TransitionProvider';
import 'overlayscrollbars/overlayscrollbars.css';
import ErrorPage from './components/ErrorPage';
import MainLayout from './components/MainLayout';
import ScrollWrapper from './components/common/ScrollWrapper';
import ProductPage from './components/ProductPage';
import GalleryPage from './components/GalleryPage';
import AccountPage from './components/AccountPage';
import TradePage from './components/TradePage';
import SearchPage from './components/SearchPage';

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`

// this component defines the routes that the app will have
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
                    <Route path="/" element={<>
                      <MainLayout/>
                    </>}>
                      <Route path="/home" element={<HomePage/>}/>
                      <Route path="/trade/" element={<TradePage/>}/>
                      <Route path="/gallery/" element={<GalleryPage/>}/>
                      <Route path="/gallery/:itemId" element={<ProductPage/>}/>
                      <Route path="/search/" element={<SearchPage/>}/>
                      <Route path="/account/" element={<AccountPage/>}/>
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
