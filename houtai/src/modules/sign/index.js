import React from 'react';
import { Route, withRouter } from 'react-router-dom'
import { Button, Input, Form } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';

import "antd/dist/antd.css"
import "./index.scss"
import "../../http"

import Home from '../home'
import http from '../../http';

function Sign(props) {

    function tosign(){
        //获取账号密码
        let username = document.getElementsByClassName("ant-input")[0].value;
        let password = document.getElementsByClassName("ant-input")[1].value;
        console.log(username,password);
        
        //正则验证手机号规则
        let rule1 = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(rule1.test(username)==false){
            alert("请输入正确的手机号")
        }else{
            //验证用户名是否已被注册
            http.get('/user/checkname',{username:username}).then((res)=>{
                console.log(res.flag);
                if(res.flag == false){
                    alert("注册失败，用户名已被使用");
                }else{
                    http.post('/user/reg',{username:username,psw:password}).then((res)=>{
                        console.log(res);
                        if(res.flag ==true){
                            setTimeout( alert("注册成功"), 1000);
                            props.history.push('/login');
                                    
                        }
                    })
                }
            
            })

        }
    }

    function tologin(){
        props.history.push('/login');
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
                <h1>21cake注册页面</h1>
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
                    <Button onClick={tosign} type="primary" htmlType="submit" className="login-form-button">
                        注册
                </Button>
                </Form.Item>
                <a className = "tologin" onClick={tologin}><span>去登录</span></a>
            </Form>
            <Route path='/home' component={Home} />
        </div>
    )
}


export default Sign;