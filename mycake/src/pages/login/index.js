//注册页面
import React, { Component } from 'react';
import { List, Switch, Calendar } from 'antd-mobile';
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
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
                            <input className="phone" onBlur={this.err1} type="text" placeholder="输入手机号码"/>
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







{/* 
const now = new Date();
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = { info: 'Disable', disable: true };

Object.keys(extra).forEach((key) => {
  const info = extra[key];
  const date = new Date(key);
  if (!Number.isNaN(+date) && !extra[+date]) {
    extra[+date] = info;
  }
});

class Test extends React.Component {
  originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;

  constructor(props) {
    super(props);
    this.state = {
      en: false,
      show: false,
      config: {},
    };
  }

  renderBtn(zh, en, config = {}) {
    config.locale = this.state.en ? enUS : zhCN;

    return (
      <List.Item arrow="horizontal"
        onClick={() => {
          document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
          this.setState({
            show: true,
            config,
          });
        }}
      >
        {this.state.en ? en : zh}
      </List.Item>
    );
  }

  changeLanguage = () => {
    this.setState({
      en: !this.state.en,
    });
  }

  onSelectHasDisableDate = (dates) => {
    console.warn('onSelectHasDisableDate', dates);
  }

  onConfirm = (startTime, endTime) => {
    document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
    this.setState({
      show: false,
      startTime,
      endTime,
    });
  }

  onCancel = () => {
    document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
    this.setState({
      show: false,
      startTime: undefined,
      endTime: undefined,
    });
  }

  getDateExtra = date => extra[+date];

  render() {
    return (
      <div>
        <List className="calendar-list" style={{ backgroundColor: 'white' }}>
          <List.Item className="item" extra={<Switch className="right" checked={!this.state.en} onChange={this.changeLanguage} />}>
            {this.state.en ? 'Chinese' : '中文'}
          </List.Item>
          {this.renderBtn('选择日期区间', 'Select Date Range')}
          {this.renderBtn('选择日期时间区间', 'Select DateTime Range', { pickTime: true })}
          {this.renderBtn('选择日期', 'Select Date', { type: 'one' })}
          {this.renderBtn('选择日期时间', 'Select DateTime', { type: 'one', pickTime: true })}
          {this.renderBtn('选择日期区间(快捷)', 'Select Date Range (Shortcut)', { showShortcut: true })}
          {this.renderBtn('选择日期时间区间(快捷)', 'Select DateTime Range (Shortcut)', { pickTime: true, showShortcut: true })}
          {this.renderBtn('大行距', 'XL row size', { rowSize: 'xl' })}
          {this.renderBtn('不无限滚动', 'infinite: false', { infinite: false })}
          {this.renderBtn('水平进入', 'Horizontal enter', { enterDirection: 'horizontal' })}
          {this.renderBtn('默认选择范围', 'Selected Date Range', { defaultValue: [new Date(+now - 86400000), new Date(+now - 345600000)] })}
          {this.renderBtn('onSelect API', 'onSelect API', {
            onSelect: (date, state) => {
              console.log('onSelect', date, state);
              return [date, new Date(+now - 604800000)];
            },
          })}
          {
            this.state.startTime &&
            <List.Item>Time1: {this.state.startTime.toLocaleString()}</List.Item>
          }
          {
            this.state.endTime &&
            <List.Item>Time2: {this.state.endTime.toLocaleString()}</List.Item>
          }
        </List>
        <Calendar
          {...this.state.config}
          visible={this.state.show}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          onSelectHasDisableDate={this.onSelectHasDisableDate}
          getDateExtra={this.getDateExtra}
          defaultDate={now}
          minDate={new Date(+now - 5184000000)}
          maxDate={new Date(+now + 31536000000)}
        />
      </div>
    );
  }
}

ReactDOM.render(<Test />, mountNode);





















// import { List, Switch, Calendar } from 'antd-mobile';
// import enUS from 'antd-mobile/lib/calendar/locale/en_US';
// import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';

// const extra = {
//   '2017/07/15': { info: 'Disable', disable: true },
// };

// const now = new Date();
// extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = { info: 'Disable', disable: true };
// extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = { info: 'Disable', disable: true };
// extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = { info: 'Disable', disable: true };
// extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = { info: 'Disable', disable: true };

// Object.keys(extra).forEach((key) => {
//   const info = extra[key];
//   const date = new Date(key);
//   if (!Number.isNaN(+date) && !extra[+date]) {
//     extra[+date] = info;
//   }
// });

// class Test extends React.Component {
//   originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;

//   constructor(props) {
//     super(props);
//     this.state = {
//       en: false,
//       show: false,
//       config: {},
//     };
//   }

//   renderBtn(zh, en, config = {}) {
//     config.locale = this.state.en ? enUS : zhCN;

//     return (
//       <List.Item arrow="horizontal"
//         onClick={() => {
//           document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
//           this.setState({
//             show: true,
//             config,
//           });
//         }}
//       >
//         {this.state.en ? en : zh}
//       </List.Item>
//     );
//   }

//   changeLanguage = () => {
//     this.setState({
//       en: !this.state.en,
//     });
//   }

//   onSelectHasDisableDate = (dates) => {
//     console.warn('onSelectHasDisableDate', dates);
//   }

//   onConfirm = (startTime, endTime) => {
//     document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
//     this.setState({
//       show: false,
//       startTime,
//       endTime,
//     });
//   }

//   onCancel = () => {
//     document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
//     this.setState({
//       show: false,
//       startTime: undefined,
//       endTime: undefined,
//     });
//   }

//   getDateExtra = date => extra[+date];

//   render() {
//     return (
//       <div>
//         <List className="calendar-list" style={{ backgroundColor: 'white' }}>
//           <List.Item className="item" extra={<Switch className="right" checked={!this.state.en} onChange={this.changeLanguage} />}>
//             {this.state.en ? 'Chinese' : '中文'}
//           </List.Item>
//           {this.renderBtn('选择日期区间', 'Select Date Range')}
//           {this.renderBtn('选择日期时间区间', 'Select DateTime Range', { pickTime: true })}
//           {this.renderBtn('选择日期', 'Select Date', { type: 'one' })}
//           {this.renderBtn('选择日期时间', 'Select DateTime', { type: 'one', pickTime: true })}
//           {this.renderBtn('选择日期区间(快捷)', 'Select Date Range (Shortcut)', { showShortcut: true })}
//           {this.renderBtn('选择日期时间区间(快捷)', 'Select DateTime Range (Shortcut)', { pickTime: true, showShortcut: true })}
//           {this.renderBtn('大行距', 'XL row size', { rowSize: 'xl' })}
//           {this.renderBtn('不无限滚动', 'infinite: false', { infinite: false })}
//           {this.renderBtn('水平进入', 'Horizontal enter', { enterDirection: 'horizontal' })}
//           {this.renderBtn('默认选择范围', 'Selected Date Range', { defaultValue: [new Date(+now - 86400000), new Date(+now - 345600000)] })}
//           {this.renderBtn('onSelect API', 'onSelect API', {
//             onSelect: (date, state) => {
//               console.log('onSelect', date, state);
//               return [date, new Date(+now - 604800000)];
//             },
//           })}
//           {
//             this.state.startTime &&
//             <List.Item>Time1: {this.state.startTime.toLocaleString()}</List.Item>
//           }
//           {
//             this.state.endTime &&
//             <List.Item>Time2: {this.state.endTime.toLocaleString()}</List.Item>
//           }
//         </List>
//         <Calendar
//           {...this.state.config}
//           visible={this.state.show}
//           onCancel={this.onCancel}
//           onConfirm={this.onConfirm}
//           onSelectHasDisableDate={this.onSelectHasDisableDate}
//           getDateExtra={this.getDateExtra}
//           defaultDate={now}
//           minDate={new Date(+now - 5184000000)}
//           maxDate={new Date(+now + 31536000000)}
//         />
//       </div>
//     );
//   }
// }

// ReactDOM.render(<Test />, mountNode); */}