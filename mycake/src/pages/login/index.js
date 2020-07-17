//注册页面
import React, { Component } from 'react';
import './login.css';
import './base.css';

class Login extends Component{


    err1 = ()=>{
        let phone = document.getElementsByClassName("phone")[0].value;
        let rule1 = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(rule1.test(phone)==false){
            document.getElementsByClassName("errmsg-pho")[0].style.display = "block";
            document.getElementsByClassName("errmsg-pas1")[0].style.display = "none";
            document.getElementsByClassName("errmsg-pas2")[0].style.display = "none";
        }else{
            document.getElementsByClassName("errmsg-pho")[0].style.display = "none";
        }
    }

    err2 = ()=>{
        let pas1 = document.getElementsByClassName("pas1")[0].value;
        let rule2 = /^[a-zA-Z\d!@#$%^&*]{8,20}$/;
        if(rule2.test(pas1)==false){
            document.getElementsByClassName("errmsg-pho")[0].style.display = "none";
            document.getElementsByClassName("errmsg-pas1")[0].style.display = "block";
            document.getElementsByClassName("errmsg-pas2")[0].style.display = "none";
        }else{
            document.getElementsByClassName("errmsg-pas1")[0].style.display = "none";
        }
    }
    err3 = ()=>{
        let pas1 = document.getElementsByClassName("pas1")[0].value;
        let pas2 = document.getElementsByClassName("pas2")[0].value;
        if(pas1 !== pas2){
            document.getElementsByClassName("errmsg-pho")[0].style.display = "none";
            document.getElementsByClassName("errmsg-pas1")[0].style.display = "none";
            document.getElementsByClassName("errmsg-pas2")[0].style.display = "block";
        }else{
            document.getElementsByClassName("errmsg-pas2")[0].style.display = "none";
        }
    }

    render(){
        return(
                <div id="login-box">
                    <h2>用户注册</h2>
                    <ul>
                        <li>
                            <input className="phone" onBlur={this.err1} type="text" placeholder="输入手机号码"/ >
                            {/* <!-- 隐藏边框：style border：none --> */}
                        </li>
                        <li>
                            <input className="pas1" onBlur={this.err2} type="password" placeholder="密码：8～20字符，需同时包含英文和数字"/>
                        </li>
                        <li>
                            <input className="pas2" onBlur={this.err3} type="password" placeholder="确认密码"/>
                        </li>
                        <li>
                            <input className="" type="text" placeholder="请选择生日"/>
                        </li>
                        <div className="erroBox">
                            <p className="errmsg-pho"><i></i> &nbsp; 请输入正确的手机号码</p>
                            <p className="errmsg-pas1"><i></i> &nbsp; 密码：8～20字符，需同时包含英文和数字</p>
                            <p className="errmsg-pas2"><i></i> &nbsp; 两次密码不一致</p>
                        </div>
                        <li>
                            <button>注册</button>
                        </li>
                    </ul>
                </div>
        )
    }


    


}



export default Login;