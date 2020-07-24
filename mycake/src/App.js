import React, { Component, Suspense, lazy } from 'react'
import { NavBar,Drawer, List} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
// import {Switch, Route, Redirect,withRouter} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect ,withRouter} from "react-router-dom"
// import './icon/iconfont/iconfont'
import './App.css'
import Home from './pages/Home/index';
import Type from './pages/Type/index';
import Person from './pages/Person/index';

import Shopcar from './pages/Shopcar/index'
import Sign from './pages/sign/index';
import Login from './pages/login/index';
import Goods from './pages/Goods/index';
import AddLocal from './pages/addlocal';
import Editlocal from './pages/editlocal';
// const Home = lazy(()=> import("./pages/Home/index"))
// const Type = lazy(()=> import("./pages/Type/index"))
// const Person = lazy(()=> import("./pages/Person/index"))
// const Shopcar = lazy(()=> import("./pages/Shopcar/index"))
// const Sign = lazy(()=> import("./pages/sign/index"))
// const Login = lazy(()=> import("./pages/login/index"))
// const Goods = lazy(()=> import("./pages/Goods/index"))
// const AddLocal = lazy(()=> import("./pages/addlocal/index"))
// const Editlocal = lazy(()=> import("./pages/editlocal/index"))


class App extends Component {
  state={
    current:'/home',
    menu:[{
      title:'首页',
      path:'/home',
      img:'https://static.21cake.com/themes/wap/img/menu-home.png',
      component:Home
    },{
      title:'分类',
      path:'/type',
      img:'https://static.21cake.com/themes/wap/img/menu-icon-class.png',
      component:Type
    },{
      title:'个人',
      path:'/person',
      img:'https://static.21cake.com/themes/wap/img/menu-icon-per.png',
      component:Person
    }],
    open: false,//抽屉
  }
  //第一次渲染之后调用
  componentDidMount(){
    // console.log('App.props',this.props);
    //打开页面我们是重定向在home，也就是把props里面的location里面的pathname设置为/home,这里是把pathname解析出来
    const {location:{pathname}} = this.props;
    //把解析出来的pathname赋给state的current,然后用来路由跳转
        this.setState({
            current:pathname
        })
        console.log([
          "                   _ooOoo_",
          "                  o8888888o",
          "                  88\" . \"88",
          "                  (| -_- |)",
          "                  O\\  =  /O",
          "               ____/`---'\\____",
          "             .'  \\\\|     |//  `.",
          "            /  \\\\|||  :  |||//  \\",
          "           /  _||||| -:- |||||-  \\",
          "           |   | \\\\\\  -  /// |   |",
          "           | \\_|  ''\\---/''  |   |",
          "           \\  .-\\__  `-`  ___/-. /",
          "         ___`. .'  /--.--\\  `. . __",
          "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
          "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
          "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
          "======`-.____`-.___\\_____/___.-`____.-'======",
          "                   `=---='",
          "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
          "         佛祖保佑       永无BUG"
      ].join('\n'));
  }


  //传进来的是path：/home /type /person，根据pathname跳转
  changeMenu=({key,item})=>{
    this.setState({
      current:key
    })
  }
  //菜单栏跳转事件
  goto=(path)=>{
    // console.log(path);
    this.props.history.push(path);
    //跳转页面后收起导航栏
    this.setState({ open: !this.state.open })
    this.titleMsg()
  }
  //根据路由跳转
  gogogo=(path)=>{
    this.props.history.push(path);
  }
  //抽屉功能，用于展现首页、分类、个人，展示菜单功能
  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
    this.titleMsg()
  }
  //导航栏收起的话三横的图片，下拉的话X图片
  titleMsg=()=>{
    if(!this.state.open){
      let iconTitle = document.getElementsByClassName('icon-title')[0];
      iconTitle.classList.add('icon-titleclose');
      // iconTitle.style="background:url('./img/navx.png') no-repeat;background-size: cover;width:16px;height: 16px;"
      let amdrawertop =document.getElementsByClassName('am-drawer-top')[0];
      amdrawertop.style="min-height:55px"
    }else{
      let iconTitle = document.getElementsByClassName('icon-title')[0];
      iconTitle.classList.remove('icon-titleclose');
      // iconTitle.style="background:url('./img/nav1.png') no-repeat;background-size: cover;width:16px;height: 16px;"
      let amdrawertop =document.getElementsByClassName('am-drawer-top')[0];
      amdrawertop.style="min-height:0"
    }
  }

  

  render() {
    const {menu,current} = this.state;
    //抽屉
    const sidebar = (<List>
      {this.state.menu.map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            onClick={this.goto.bind(null,i.path)}
          >{
            <div style={{ textAlign:"center"}}>
              <a><img src={i.img} ></img></a>
              <p style={{ fontSize:'12px',color:'#442818',margin:0 }}>{i.title}</p>
            </div>
            }
            </List.Item>);
        }
        return (<List.Item key={index}
                  onClick={this.goto.bind(null,i.path)}
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
            leftContent={[
              <i key="0" onClick={this.onOpenChange} className="iconfont icon-title" ></i>,
              <i key="1" className="city"></i>,
              <span key="2" style={{ fontSize:'12px',color:'#442818' }}>广州</span>
            ]}
            rightContent={[
              <i key="3" className="top-message" ></i>,
              <i key="4" className="top-cart" onClick={this.gogogo.bind(null,'/shopcar')}></i>
            ]}
          >
          <i key="5" className="iconfont icon-header-center" onClick={this.gogogo.bind(null,'/home')} type="left" style={{ width:"30px" }}></i>
          </NavBar>
          <Drawer
          className="my-drawer"
          contentStyle={{height:0,textAlign:"center"}}
          overlayStyle={{height:0}}
          sidebar={sidebar}
          open={this.state.open}
          position='top'
        >
          1111
        </Drawer>
        </div>
        
        <div className="container" >
        {/* <Router> */}
            {/* <Suspense fallback={<div>loading...</div>}> */}
            <Switch>
              {
                menu.map(item => <Route key={item.path} path={item.path} component={item.component} />)
              }
              <Route path='/sign' component={Sign} />
              <Route path='/login' component={Login} />
              <Route path='/goods' component={Goods} />
              <Route path='/shopcar' component={Shopcar} />
              <Route path='/addlocal' component={AddLocal} />
              <Route path='/editlocal' component={Editlocal} />
              <Route path='/home' component={Home} />
              <Redirect from='/' to='/home' exact />
            </Switch>
            {/* </Suspense>
          </Router> */}
        </div>
        
      </div>
      
    );
  }
}
App = withRouter(App)
export default App;