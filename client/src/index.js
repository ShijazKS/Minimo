import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'antd/dist/antd.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from "axios";

// Set the default backend URL
const backendURL = 'https://minimo-server.onrender.com';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Modify the request config to include the backend URL
  config.url = `${backendURL}${config.url}`;
  return config;
}, function (error) {
  return Promise.reject(error);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
