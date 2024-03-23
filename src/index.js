import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'
import { Provider } from 'react-redux';
import store from './store'
import io from 'socket.io-client'
import { Auth0Provider } from '@auth0/auth0-react';

// window.baseHost = 'https://tradey-387014.el.r.appspot.com/'
// window.baseHost = 'http://192.168.6.60:3001/'

// window.host = window.baseHost

// window.socket = null
// if(!window.socket) window.socket = io.connect(window.baseHost, 
//   {
//     // path: "/tradey-backend/us-central1/server/socket.io",
//     withCredentials: true,
//     // extraHeaders: {
//     //   "my-custom-header": "abcd"
//     // }
//   }
// )
// console.log(window.socket)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Auth0Provider
          domain="dev-0z36s1mxvz4zq3zh.us.auth0.com"
          clientId="lztBoCSHhRsTFF3sn8p0hbMhJL22ASwt"
          authorizationParams={{
            audience: "https://hello-world.example.com",
            redirect_uri: window.location.origin,
          }}
        >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
