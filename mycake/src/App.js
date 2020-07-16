import React , { Component } from 'react';
import { NavBar,Icon,Menu, ActivityIndicator,Drawer, List,} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {Switch, Route, Redirect,withRouter} from 'react-router-dom';
// import './icon/iconfont/iconfont'
import './App.css'
import Home from './pages/Home/index';
import Type from './pages/Type/index';
import Person from './pages/Person/index';

// import Bread from './pages/Type/Bread/index';
// import Cake from './pages/Type/Cake/index';
// import CCake from './pages/Type/CCake/index';
// import Gift from './pages/Type/Gift/index';
// import IceCream from './pages/Type/IceCream/index';
// import Tea from './pages/Type/Tea/index'
// @withRouter
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
    //把解析出来的pathname赋给state的current
        this.setState({
            current:pathname
        })
       
  }
  //传进来的是path：/home /type /person
  changeMenu=({key,item})=>{
    // console.log(key);
    this.goto(key);
    this.setState({
      current:key
    })
  }
  goto=(path)=>{
    // console.log(this.props);
    this.props.history.push(path);
    //跳转页面后收起导航栏
    this.setState({ open: !this.state.open })
    this.titleMsg()
  }
  //抽屉功能，用于展现首页、分类、个人
  onOpenChange = (...args) => {
    // console.log(args);
    this.setState({ open: !this.state.open });
    this.titleMsg()
  }
  //导航栏收起的话三横的图片，下拉的话X图片
  titleMsg=()=>{
    if(!this.state.open){
      let iconTitle = document.getElementsByClassName('icon-title')[0];
      iconTitle.style="background:url(https://static.21cake.com/themes/wap/img/menu-hide.png) no-repeat;background-size: cover;width:16px;height: 16px;"
    }else{
      let iconTitle = document.getElementsByClassName('icon-title')[0];
      iconTitle.style="background:url(https://static.21cake.com/themes/wap/img/top-icon.png) no-repeat;background-size: cover;width:16px;height: 16px;"
    }
  }
  render() {
    const {menu,current} = this.state;
    // console.log(this.state.menu);
    //抽屉
    const sidebar = (<List>
      {this.state.menu.map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            // onClick={this.changeMenu}
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
          // onClick={this.changeMenu}
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
          {/* 头 */}
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
          <Drawer
          className="my-drawer"
          style={{ minHeight:55}}
          // enableDragHandle
          contentStyle={{height:0,textAlign:"center"}}
          overlayStyle={{height:0}}
          sidebar={sidebar}
          open={this.state.open}
          // onOpenChange={console.log(this.state)}
          position='top'
          // sidebarStyle={{paddingTop:40}}
          // dragHandleStyle={{minHeight:100}}
          // docked={true}
          // open={false}
          // dragToggleDistance={0}
        >
          1111
        </Drawer>
        </div>
        {/* 抽屉 */}
        
        <div className="container" >
            <Switch>
              {
                menu.map(item => <Route key={item.path} path={item.path} component={item.component} />)
              }
              {/* <Route path='/bread' component={Bread} />
              <Route path='/bread' component={Cake} />
              <Route path='/bread' component={CCake} />
              <Route path='/bread' component={Gift} />
              <Route path='/bread' component={IceCream} />
              <Route path='/bread' component={IceCream} /> */}
              <Redirect from='/' to='/home' exact />
            </Switch>
        </div>
        
      </div>
      
    );
  }
}
App = withRouter(App)
 export default App;