//login 后台管理系统登录页面
import React from 'react';
import { Route, withRouter } from 'react-router-dom'
import { Button, Input, Form } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';

import "antd/dist/antd.css"
import "./index.scss"
import "../../http"

import Home from '../home'
import http from '../../http';

function Login(props) {

    

    function login(){
        //获取账号密码
        let username = document.getElementsByClassName("ant-input")[0].value;
        let password = document.getElementsByClassName("ant-input")[1].value;
        
        console.log(username,password);

        //向后台验证账号密码是否正确
        http.get('/user/login',{username:username,psw:password}).then((res)=>{
            console.log(res);
            if(res.flag ==true){
                //将账号，密码和token存到本地的localstorage中，可用于保存登录状态
                localStorage.setItem('username',username);
                localStorage.setItem('psw',password);
                localStorage.setItem('token',res.data.token);
                setTimeout( alert("登录成功"), 1000);
                props.history.push('/home');
                
            }else{
                alert("登录失败，用户名或密码错误");
            }
        })

    }

    
    function tosign(){
                props.history.push('/sign');
            }


    function onFinish(){
        props.history.push('/home'); 
    }
    return (
        <div id="components-form-demo-normal-login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                // onFinish={onFinish}
                // onValuesChange={this.onCodeChange}
            >
                <h1>21cake管理平台</h1>
                <Form.Item
                    name="username"
                    rules={[{ required: false, message: '请输入用户名!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: false, message: '请输入密码!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
               

                <Form.Item>
                    <Button onClick={login} type="primary" htmlType="submit" className="login-form-button">
                        登录
                </Button>
                </Form.Item>
                <a className = "tosign" onClick={tosign}><span>去注册</span></a>
            </Form>
            <Route path='/home' component={Home} />
            
        </div>
    )
}


export default Login;