//登录页面
import React, { Component } from 'react';
import './sign.css';
import './base.css'

class Sign extends Component{

    render(){
        return(
            <div id="sign-box">
                <h2>手机号码登录</h2>
                <ul>
                    <li>
                         <input className="" type="text" placeholder="手机号码"/>
                        {/* <!-- 隐藏边框：style border：none --> */}
                    </li>
                    <li>
                        <input className="" type="password" placeholder="填写密码"/>
                    </li>
                    <li>
                        <button>登录</button>
                    </li>
                    <div className="gotoLogin">
                        <a href="javascript:;">去注册</a>
                    </div>
                </ul>
            </div>  
        )
    }

}


export default Sign;