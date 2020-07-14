import React , { Component } from 'react';
import { NavBar,Icon} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
// import './icon/iconfont/iconfont'
import './App.css'
import Home from './pages/Home/index';
import Type from './pages/Type/index';
import Person from './pages/Person/index'


export default class App extends Component {
  state={
    current:'/home',
    menu:[{
      title:'首页',
      path:'/home',
      Component:Home
    },{
      title:'分类',
      path:'/type',
      Component:Type
    },{
      title:'个人',
      path:'/person',
      Component:Person
    }]
  }
  render() {
    return (
      <div className="title-box">
        <NavBar
          mode="light"
          // icon={<i className="iconfont icon-title" ></i>}
          leftContent={[
            <i key="0" className="iconfont icon-title" ></i>,
            <i key="1" className="city"></i>,
            <span key="2" style={{ fontSize:'12px',color:'#442818' }}>广州</span>
          ]}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <i key="0" className="top-message" ></i>,
            <i key="1" className="top-cart"></i>
          ]}
        >
        <i className="iconfont icon-header-center" type="left" style={{ width:"30px" }}></i>
      </NavBar>
      </div>
    );
  }
}