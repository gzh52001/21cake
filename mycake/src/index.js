import React from 'react';
import ReactDOM from 'react-dom';
// import { Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'

import { HashRouter,BrowserRouter } from 'react-router-dom';
import App from './App';
// import {icon} from 'antd-mobile'
// import './App.scss'
const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter;
ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <App />
  </Router>,
    
  // </React.StrictMode>,
  document.getElementById('root')
);
