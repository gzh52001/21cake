//登录页面
import React, { Component } from 'react';
import './sign.css';
import './base.css'

class Sign extends Component{

    goto = (path)=>{
        this.props.history.push(path);
    }

    serr1 = ()=>{
        let spho = document.getElementsByClassName("spho")[0].value;
        let rule1 = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(rule1.test(spho)==false){
            document.getElementsByClassName("errmsg-pho")[0].style.display = "block";
            document.getElementsByClassName("errmsg-pas1")[0].style.display = "none";
        }else{
            document.getElementsByClassName("errmsg-pho")[0].style.display = "none";
        }
    }

    serr2 = ()=>{
        let spsw = document.getElementsByClassName("spsw")[0].value;
        let rule1 = /^[a-zA-Z\d!@#$%^&*]{8,20}$/;
        if(rule1.test(spsw)==false){
            document.getElementsByClassName("errmsg-pho")[0].style.display = "none";
            document.getElementsByClassName("errmsg-pas1")[0].style.display = "block";
        }else{
            document.getElementsByClassName("errmsg-pas1")[0].style.display = "none";
        }
    }


    //点击登录按钮事件
    sign(){
        let spho = document.getElementsByClassName("spho")[0].value;
        let spsw = document.getElementsByClassName("spsw")[0].value;
        
        console.log(spho,spsw);

    }

    render(){
        return(
            <div id="sign-box">
                <h2>手机号码登录</h2>
                <ul>
                    <li>
                         <input className="spho" onBlur={this.serr1} type="text" placeholder="手机号码"/>
                        {/* <!-- 隐藏边框：style border：none --> */}
                    </li>
                    <li>
                        <input className="spsw" onBlur={this.serr2} type="password" placeholder="填写密码"/>
                    </li>
                    <div className="erroBox">
                            <p className="errmsg-pho"><i></i> &nbsp; 请输入正确手机号码</p>
                            <p className="errmsg-pas1"><i></i> &nbsp; 请输入正确密码</p>
                        </div>
                    <li>
                        <button onClick={this.sign}>登录</button>
                    </li>
                    <div className="gotoLogin">
                        <a  onClick = {this.goto.bind(null,'/login')}>去注册</a>
                    </div>
                </ul>
            </div>  
        )
    }

}


export default Sign;