import React, { Component } from 'react';
import './base.css';
import './person.css';
import './iconfont.css';

class Person extends Component {

    phone = ()=>{
        let phone = '13632945150';
        console.log(phone);
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
                <li className="phone">13632945150</li>
                <li className="changeMsg">
                    <button onClick={this.phone}>修改个人信息 &nbsp; {'>'} </button>
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
                    <a href="###">
                        <span>待付订单</span><span className="iconfont iconiconfontjiantou5"></span>
                    </a>
                </li>
                <li>
                    <a href="###">
                        <span>全部订单</span><span className="iconfont iconiconfontjiantou5"></span>
                    </a>
                </li>
                <li>
                    <a href="###">
                        <span>地址管理</span><span className="iconfont iconiconfontjiantou5"></span>
                    </a>
                </li>
            </ul>
            <img className="per_img" src="https://static.21cake.com//upload/images/20200317/7649161442134eb493c5d60fbfe84540.jpeg" alt=""/>
    
            <div className="per_exit">
                <span>退出登录</span>
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