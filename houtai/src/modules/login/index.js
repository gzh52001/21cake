import React from 'react';
import { Route, withRouter } from 'react-router-dom'
import { Button, Input, Form } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';

import "antd/dist/antd.css"
import "./index.scss"

import Home from '../home'

function Login(props) {
    function onFinish(){
        props.history.push('/home'); 
    }
    return (
        <div id="components-form-demo-normal-login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
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
                <Form.Item
                    // name="captcha"
                    rules={[{ required: false, message: '请输入验证码!' }]}
                >
                    <Input
                        prefix={<SafetyOutlined className="site-form-item-icon" />}
                        type="text"
                        placeholder="验证码"
                    />
                    <img src="http://iph.href.lu/160x90?text=7985" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                </Button>
                </Form.Item>
            </Form>
            <Route path='/home' component={Home} />
        </div>
    )
}
// class Login1 extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             number: 1
//         }
//         console.log(this.props)
//     }
//     onFinish() {
//         // console.log(this);
//     }
//     render() {
//         return (
//             <div id="components-form-demo-normal-login">
//                 <Form
//                     name="normal_login"
//                     className="login-form"
//                     initialValues={{ remember: true }}
//                     onFinish={this.onFinish}
//                     onValuesChange={this.onCodeChange}
//                 >
//                     <h1>21cake管理平台</h1>
//                     <Form.Item
//                         name="username"
//                         rules={[{ required: false, message: '请输入用户名!' }]}
//                     >
//                         <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
//                     </Form.Item>
//                     <Form.Item
//                         name="password"
//                         rules={[{ required: false, message: '请输入密码!' }]}
//                     >
//                         <Input.Password
//                             prefix={<LockOutlined className="site-form-item-icon" />}
//                             type="password"
//                             placeholder="密码"
//                         />
//                     </Form.Item>
//                     <Form.Item
//                         // name="captcha"
//                         rules={[{ required: false, message: '请输入验证码!' }]}
//                     >
//                         <Input
//                             prefix={<SafetyOutlined className="site-form-item-icon" />}
//                             type="text"
//                             placeholder="验证码"
//                         />
//                         <img src="http://iph.href.lu/160x90?text=7985" />
//                     </Form.Item>

//                     <Form.Item>
//                         <Button type="primary" htmlType="submit" className="login-form-button">
//                             登录
//                         </Button>
//                     </Form.Item>
//                 </Form>
//                 <Route path='/home' component={Home} />
//             </div>
//         )
//     }
// }

export default Login;