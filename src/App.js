import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
// import Header from './components/Header';
// import Home from './components/Home'
// import About from './components/About';
// import Market from './components/Market';
// import UserPage from './components/UserPage';
// import MarketProduct from './components/market-component/ProductPage';
// import Register from './components/Register';
// import Checkout from './components/Checkout';
// import Receipt from './components/Receipt';
import {CookiesProvider} from 'react-cookie'
import theme from './colorTheme';
import { ThemeProvider } from '@mui/material';

function App() {
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Login/>}/>
              {/* <Route path='/register' element={<Register/>}/>
              <Route path='/home' element={<><Header/><Home/></>}/>
              <Route path='/about' element={<><Header/><About/></>}/>
              <Route path='/market' element={<><Header/><Market/></>}/>
              <Route path='/market/:productId' element={<><Header/><MarketProduct/></>}/>
              <Route path='/user' element={<><Header/><UserPage/></>}/>
              <Route path='/checkout' element={<><Header/><Checkout/></>}/>
              <Route path='/receipt' element={<><Header/><Receipt/></>}/> */}
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
