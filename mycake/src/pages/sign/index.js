//登录页面
import React, { Component } from 'react';
import './sign.css';
import './base.css';
import http from '../../utils/http';
import {withRouter} from 'react-router-dom';

class Sign extends Component{

    componentDidMount(){
        console.log(this.props);
    }

    goto = (path)=>{
        this.props.history.push(path);
    }


    //两个正则提示的判断函数
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

    //在密码栏按下回车按钮事件
    enter=(event)=>{
        if(event.keyCode ==13){
            this.sign()
        }
    }

    //点击登录按钮事件
    sign=()=>{
        let spho = document.getElementsByClassName("spho")[0].value;
        let spsw = document.getElementsByClassName("spsw")[0].value;
        
        console.log(spho,spsw);
        
        let props=this.props;
        http.get('/user/login',{username:spho,psw:spsw}).then((res)=>{
            console.log(res);
            if(res.flag ==true){
                
                localStorage.setItem('phone',spho);
                localStorage.setItem('psw',spsw);
                localStorage.setItem('token',res.data.token);
                setTimeout( alert("登录成功"), 1000);
                this.props.history.push('/person');
                
            }else{
                alert("登录失败，用户名或密码错误");
            }
        })
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
                        <input className="spsw" onBlur={this.serr2} onKeyDown={this.enter} type="password" placeholder="填写密码"/>
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

Sign = withRouter(Sign);
export default Sign;