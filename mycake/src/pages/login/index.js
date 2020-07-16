//注册页面
import React, { Component } from 'react';
import './login.css';
import './base.css';

class Login extends Component{

    render(){
        return(
                <div id="login-box">
                    <h2>用户注册</h2>
                    <ul>
                        <li>
                            <input className="" type="text" placeholder="输入手机号码"/>
                            {/* <!-- 隐藏边框：style border：none --> */}
                        </li>
                        <li>
                            <input className="" type="password" placeholder="密码：8～20字符，需同时包含英文和数字"/>
                        </li>
                        <li>
                            <input className="" type="password" placeholder="确认密码"/>
                        </li>
                        <li>
                            <input className="" type="text" placeholder="请选择生日"/>
                        </li>
                        <li>
                            <button>注册</button>
                        </li>
                    </ul>
                </div>
        )
    }

}



export default Login;