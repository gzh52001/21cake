//登录页面
import React from 'react';
import './sign.css';

class Sign extends Comment{

    render(){
        return(
            <div id="sign-box">
                <h2>手机号码登录</h2>
                <ul>
                    <li>
                         <input class="" type="text" placeholder="手机号码"/>
                        {/* <!-- 隐藏边框：style border：none --> */}
                    </li>
                    <li>
                        <input class="" type="password" placeholder="填写密码"/>
                    </li>
                    <li>
                        <button>登录</button>
                    </li>
                    <div class="gotoLogin">
                        <a href="javascript:;">去注册</a>
                    </div>
                </ul>
            </div>  
        )
    }

}

