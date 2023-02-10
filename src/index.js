// import * as dotenv from 'dotenv'
import React from 'react';
import ReactDOM from 'react-dom/client';
import classes from './index.css';
import App from './App';
import AdminApp from './admin/src/App';
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
// dotenv.config()

const root = ReactDOM.createRoot(document.getElementById('root'));

// alert(process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT)

root.render(
  window.location.pathname === "/" ?
    <React.StrictMode>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </React.StrictMode> :
    window.location.pathname === "/admin77" ?
      < AdminApp /> :
      <React.StrictMode>
        <BrowserRouter>
          <Header />
          <App />
          <Footer />
        </BrowserRouter>
      </React.StrictMode>
);
