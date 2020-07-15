import React , { Component } from 'react';
import { NavBar,Icon,Menu, ActivityIndicator,Drawer, List,} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
// import './icon/iconfont/iconfont'
import './App.css'
import Home from './pages/Home/index';
import Type from './pages/Type/index';
import Person from './pages/Person/index';

export default class App extends Component {
  state={
    current:'/home',
    menu:[{
      title:'首页',
      path:'/home',
      img:'https://static.21cake.com/themes/wap/img/menu-home.png',
      Component:Home
    },{
      title:'分类',
      path:'/type',
      img:'https://static.21cake.com/themes/wap/img/menu-icon-class.png',
      Component:Type
    },{
      title:'个人',
      path:'/person',
      img:'https://static.21cake.com/themes/wap/img/menu-icon-per.png',
      Component:Person
    }],
    open: false,//抽屉
  }
  //抽屉功能，用于展现首页、分类、个人
  onOpenChange = (...args) => {
    // console.log(args);
    this.setState({ open: !this.state.open });
    //下拉的时候图标变化成X
    if(!this.state.open){
      let iconTitle = document.getElementsByClassName('icon-title')[0];
      iconTitle.style="background:url(https://static.21cake.com/themes/wap/img/menu-hide.png) no-repeat;background-size: cover;width:16px;height: 16px;"
    }else{
      let iconTitle = document.getElementsByClassName('icon-title')[0];
      iconTitle.style="background:url(https://static.21cake.com/themes/wap/img/top-icon.png) no-repeat;background-size: cover;width:18px;height: 14px;"
    }
  }
  render() {
    // console.log(this.state.menu);
    //抽屉
    const sidebar = (<List>
      {this.state.menu.map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            // thumb=""
            // multipleLine
          >{
            <div style={{ textAlign:"center"}}>
              <a><img src={i.img} ></img></a>
              <p style={{ fontSize:'12px',color:'#442818',margin:0 }}>{i.title}</p>
            </div>
            }
            </List.Item>);
        }
        return (<List.Item key={index}
          // thumb=""
        >{<div style={{ textAlign:"center"}}>
        <a><img src={i.img} ></img></a>
        <p style={{ fontSize:'12px',color:'#442818',margin:0 }}>{i.title}</p>
      </div>
          }
          </List.Item>);
      })}
    </List>);
    return (
      <div>
        <div className="title-box" >
          <NavBar
            mode="light"
            // icon={<i className="iconfont icon-title" ></i>}
            leftContent={[
              <i key="0" className="iconfont icon-title" ></i>,
              <i key="1" className="city"></i>,
              <span key="2" style={{ fontSize:'12px',color:'#442818' }}>广州</span>
            ]}
            onLeftClick={this.onOpenChange}
            rightContent={[
              <i key="0" className="top-message" ></i>,
              <i key="1" className="top-cart"></i>
            ]}
          >
          <i className="iconfont icon-header-center" type="left" style={{ width:"30px" }}></i>
        </NavBar>
        
        </div>
        <Drawer
          className="my-drawer"
          style={{ minHeight:100}}
          // enableDragHandle
          contentStyle={{height:0,textAlign:"center"}}
          overlayStyle={{height:0}}
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={console.log(this.state)}
          position='top'
          sidebarStyle={{minHeight:40,paddingTop:40}}
          // dragHandleStyle={{minHeight:100}}
          // docked={true}
          // open={false}
          // dragToggleDistance={0}
        >
          1111
        </Drawer>
        <div className="container" >
            1111111
            112
            222222222222222222222222
            333333333333333
            444444444444
            55555555555555
            6666666666
            7777777777777
            88888888888
            9999999999
            1111111111111111111111111111111111111
        </div>
      </div>
      
    );
  }
}


