//个人中心模块

import React, { Component } from 'react';
import './base.css';
import './person.css';
import './iconfont.css';


class Person extends Component {

    componentWillMount(){
        //将登录状态的账号信息存储到state中
       this.setState({phone:localStorage.getItem('phone')})
        //console.log(this.state.phone);
        let token = localStorage.getItem('token');
        console.log(token);
        if(token == null){
            setTimeout( alert("请先登录"), 1000);
            this.props.history.push('/sign');
        }
    }

    goto=(path)=>{
        this.props.history.push(path);
    }

    remove = (path)=>{
        this.props.history.push(path);
        localStorage.removeItem('phone');
        localStorage.removeItem('psw');
        localStorage.removeItem('token');
    }

    render() {
        return (
            <div>
            <header className="personHeader">
            <h2>我的廿一客</h2>
        </header>
        <div className="person_info">
            <div className="per_logo">
                <img src="https://m.21cake.com/wap_themes/21cake/images/icon/ico_member.png" alt=""/>
            </div>
    
            <ul className="per_msg">
                <li>21cake</li>
                <li className="phone"> {this.state.phone} </li>
                <li className="changeMsg">
                    <button>修改个人信息 &nbsp; {'>'} </button>
                </li>
            </ul>
    
            <div className="per_pay">
                <ul className="balance">
                    <li>￥0.00</li>
                    <li>果实币余额</li>
                </ul>
                <ul className="coupon">
                    <li>0张</li>
                    <li>优惠券</li>
                </ul>
            </div>
    
            <ul className="per_list">
                <li>
                    <a onClick={this.goto.bind(null,'/Shopcar')}>
                        <span>待付订单</span><span className="iconfont iconiconfontjiantou5"></span>
                    </a>
                </li>
                <li>
                    <a onClick={this.goto.bind(null,'/Shopcar')}>
                        <span>全部订单</span><span className="iconfont iconiconfontjiantou5"></span>
                    </a>
                </li>
                <li>
                    <a  onClick={this.goto.bind(null,'/addlocal')} >
                        <span>地址管理</span><span className="iconfont iconiconfontjiantou5"></span>
                    </a>
                </li>
            </ul>
            <img className="per_img" src="https://static.21cake.com//upload/images/20200317/7649161442134eb493c5d60fbfe84540.jpeg" alt=""/>
    
            <div className="per_exit">
                <span onClick={this.remove.bind(null,'/sign')}>退出登录</span>
            </div>
    
            <div className="per_footer">
                <p>订购专线：&nbsp;&nbsp;400-650-2121</p>
                <p>COPYRIGHT 2013  京ICP备06069127号  京公网安备 11011202001547</p>
            </div>
        </div>
        </div>
        )
    }
}


export default Person;