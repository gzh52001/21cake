import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import { Menu, Dropdown, Avatar, Button } from 'antd';
import {
    DownOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    IdcardOutlined,
    ShopOutlined

} from '@ant-design/icons';
const { SubMenu } = Menu;

import './index.scss';
import logo from '#/images/logo.png';
import header from '#/images/header.png';

import Login from '../login'
import MemberMange from './pages/memberMange/index';
import GoodsMange from './pages/goodsMange/index';

class Home extends React.Component {

    //页面渲染前先验证登录状态
    componentDidMount(){
        let username = localStorage.getItem('username');
        if(username == null){
            setTimeout(alert("请先登录"), 1000)
            this.props.history.push('/login');
        }
    }

    constructor() {
        super(),
        this.state = {
            nickName: 'Hosam',
            collapsed: false,
            mWidth: '200px',
            openKeys: [],
            defaultOpenKeys: [],
            defaultSelectedKeys: ['/operation-stat'],
            menu: [
                {
                    path: '/member-mange',
                    title: '用户管理模块',
                    icon: IdcardOutlined,
                    component:MemberMange
                },
                {
                    path: '/goods-mange',
                    title: '商品管理模块',
                    icon: ShopOutlined,
                    component:GoodsMange
                }
            ]
        };
    }
    goto = (path,curPn) => {
        this.props.history.push({pathname: this.props.match.path + path});
    }
    //菜单栏收缩
    onOpenChange = (openKeys) => {
        //返回openKeys中最新打开的subMenu
        const lasterOpenKey = openKeys.find(key => this.state.openKeys[0] != key);
        console.log('cur',lasterOpenKey);
        //是否为未打开的subMenu
        if (lasterOpenKey) {
            this.setState({ openKeys: [lasterOpenKey] });
        } else {
            this.setState({ openKeys: [] });
        }
        //记录打开的菜单备刷新使用
    }
    // onClick = ({ key }) => {
    //     message.info(`Click on item ${key}`);
    // };
    //侧栏收缩事件
    toggleCollapsed = () => {
        if (this.state.collapsed) {
            this.setState({
                collapsed: !this.state.collapsed,
                mWidth: '200px'
            });

        } else {
            this.setState({
                collapsed: !this.state.collapsed,
                mWidth: '0'
            });
        }
    };
    // 退出
    logout = ()=>{

        localStorage.clear();
        this.props.history.push('/login');
        
    }
    // 个人资料
    // about = ()=>{
    //     this.props.history.push('/props');
    // }
    //导航下拉菜单
    avatarMenu = (
        <Menu onClick={this.onClick} style={{ top: '18px', background: '#000' }}>
            {/* <Menu.Item key="1" style={{color:'#F09'}}>个人资料</Menu.Item> */}
            {/* <Menu.Item key="2" style={{color:'#F09'}}>修改密码</Menu.Item> */}
            <Menu.Item key="3" style={{ color: '#F09' }} onClick={this.logout}>退出登录</Menu.Item>
        </Menu>
    );
    render() {
        return (
            <div id="home_wrap">
                <header>
                    <div className="logo">
                        <a href="###">
                            <img src={logo} style={{ height: '100%' }} />
                        </a>
                    </div>
                    <div className="avatar">
                        <Dropdown overlay={this.avatarMenu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <Avatar size="large" src={header} />
                                <span style={{ margin: '0 5px 0 15px', fontSize: '16px' }}>{this.state.nickName}</span>
                                <DownOutlined />
                            </a>
                        </Dropdown>
                    </div>
                </header>
                <main>
                    <aside style={{ minWidth: this.state.mWidth }}>
                        <Button type="primary" onClick={this.toggleCollapsed} style={{ float: 'right' }}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </Button>
                        <Menu
                            defaultSelectedKeys={this.state.defaultSelectedKeys}
                            // defaultOpenKeys={this.state.defaultOpenKeys}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.collapsed}
                            onOpenChange={this.onOpenChange}
                            openKeys={this.state.openKeys}
                            // openKeys={['/member-mange']}
                        >
                            {
                                this.state.menu.map(item => (
                                    item.children ?
                                        <SubMenu key={item.path} icon={<item.icon />} title={item.title}>
                                            {/* <Menu.Item key={item.path} onClick={this.goto.bind(null, item.path)}>信息列表</Menu.Item> */}
                                            {
                                                item.children.map(child => (
                                                <Menu.Item key={item.path + child.path} onClick={this.goto.bind(null, item.path + child.path)}>{child.title}</Menu.Item>
                                                ))
                                            }
                                        </SubMenu>
                                        :
                                        <Menu.Item key={item.path} icon={<item.icon />} onClick={this.goto.bind(null, item.path,item.title)}>{item.title}</Menu.Item>
                                ))
                            }
                        </Menu>
                    </aside>
                    <main>
                        <Switch>
                            {
                                this.state.menu.map(item => (
                                    item.children ?
                                        item.children.map(child=>(
                                            <Route key={'home' + item.path +child.path} path={'/home' + item.path + child.path} component={child.component} exact />
                                        ))
                                    :
                                    <Route key={'home' + item.path} path={'/home' + item.path} component={item.component} exact />
                                ))
                            }
                            <Route path="/login" component={Login}/>
                            {/* <Route path="/props" component={PropsMange} /> */}
                            <Redirect from="/" to="/home"/>
                            <Redirect to="/404"/>
                        </Switch>
                    </main>
                </main>
            </div>
        )
    }
}

export default Home;
