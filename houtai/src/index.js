import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter,BrowserRouter} from 'react-router-dom';
import App from './app';

const Router = (process.env.NODE_ENV === 'development') ? HashRouter : BrowserRouter;

ReactDom.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('app')
);