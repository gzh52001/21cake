//注册页面
import React, { Component } from 'react';
import './login.css';
import './base.css';

import 'antd-mobile/dist/antd-mobile.css';
import { DatePicker, List } from 'antd-mobile';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
// console.log(minDate, maxDate);
if (minDate.getDate() !== maxDate.getDate()) {
  // set the minDate to the 0 of maxDate
  minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}

function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${dateStr} ${timeStr}`;
}

// If not using `List.Item` as children
// The `onClick / extra` props need to be processed within the component
const CustomChildren = ({ extra, onClick, children }) => (
  <div
    onClick={onClick}
    style={{ backgroundColor: '#fff', height: '45px', lineHeight: '45px', padding: '0 15px' }}
  >
    {children}
    <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  </div>
);

class Login extends Component{

    state = {
        date: now,
        time: now,
        utcDate: utcNow,
        dpValue: null,
        customChildValue: null,
        visible: false,
      }

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

                        {/* <li>
                            <input className="" type="text" placeholder="请选择生日"/>
                        </li> */}

                        <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                            <DatePicker
                            value={this.state.date}
                            onChange={date => this.setState({ date })}
                            >
                            </DatePicker>
                            <DatePicker
                            mode="date"
                            title="Select Date"
                            extra="Optional"
                            value={this.state.date}
                            onChange={date => this.setState({ date })}
                            minDate={new Date(1930, 1, 1, 23, 59, 59)}
                            >
                            <List.Item arrow="horizontal">请选择生日</List.Item>
                            </DatePicker>
                            </List>

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