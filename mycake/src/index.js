import React from 'react';
import ReactDOM from 'react-dom';
// import { Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'//引入anted-mobile ui框架

import { HashRouter,BrowserRouter } from 'react-router-dom';//引入哈希组件
import App from './App';//引入APP插件
// import {icon} from 'antd-mobile'
// import './App.scss'
const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter;//生产的话就选择BrowserRouter组件，开发的话就选择HashRouter
ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <App />
  </Router>,
    
  // </React.StrictMode>,
  document.getElementById('root')
);
