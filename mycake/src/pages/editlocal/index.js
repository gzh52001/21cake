//地址编辑页面
import React,{Component} from 'react';
import http from '../../utils/http';


import { Cascader } from 'antd';

import './base.css'
import './index.css'
const options = [
    {
      value: '广州市',
      label: '广州市',
      children: [
        {
            value: '白云区',
            label: '白云区',
        },
        // {   
        //     value: '广州大学城',
        //     label: '广州大学城',
        // },
        // {   
        //     value: '海珠区',
        //     label: '海珠区',
        // },
        // {   
        //     value: '黄浦区',
        //     label: '黄浦区',
        // },
        // {   
        //     value: '荔湾区',
        //     label: '荔湾区',
        // },
        // {   
        //     value: '南沙区',
        //     label: '南沙区',
        // },
        {   
            value: '番禺区',
            label: '番禺区',
        },
        {   
            value: '天河区',
            label: '天河区',
        },
        {   
            value: '越秀区',
            label: '越秀区',
        },
        {   
            value: '花都区',
            label: '花都区',
        },
      ],
    },
    {
      value: '深圳市',
      label: '深圳市',
      children: [
        {
          value: '宝安区',
          label: '宝安区',
        },
        {
          value: '福田区',
          label: '福田区',
        },
        {
          value: '南山区',
          label: '南山区',
        },
        {
          value: '龙岗区',
          label: '龙岗区',
        },
        {
          value: '罗湖区',
          label: '罗湖区',
        },
        // {
        //   value: '盐田区',
        //   label: '盐田区',
        // },
        // {
        //   value: '龙华区',
        //   label: '龙华区',
        // },
      ],
    },
  ];

  function onChange(value) {
    console.log(value);
  }
class Editlocal extends Component{

    componentWillMount(){
        // this.state = {
        //     path:this.props.history.push
        // // }
        // console.log(this.props);
        console.log(this.props.location.pathname);
        this.setState={
            path:this.props.location.pathname,
        }
        
    }
            
    
    componentDidMount(){
    //识别当前页面若为地址编辑页，则隐藏nav
        if(this.setState.path == '/editlocal'){
            // console.log('1');
            // document.getElementById("root")[0].style.setProperty('top','-45px');
            document.getElementsByClassName("title-box")[0].style.setProperty('top','-100px');
            document.getElementsByClassName("container")[0].style.setProperty('margin-top','0');
        }
    }


    goto = (path)=>{//点击确定按钮事件
        //跳转到其他页面时，再次显示nav
        
        document.getElementsByClassName("title-box")[0].style.setProperty('top','0');
        document.getElementsByClassName("container")[0].style.setProperty('margin-top','vw(40)');
        
        //获取页面中填写的内容并返回
        let name = document.getElementsByClassName("name")[0].value;
        let phone = document.getElementsByClassName("phone")[0].value;
        let city = document.getElementsByClassName("ant-cascader-picker-label")[0].innerHTML;
        let local = document.getElementsByClassName("local")[0].value;
        let house = document.getElementsByClassName("house")[0].value;
        let username = localStorage.getItem('phone');
        console.log(username);
        //发送
        // http.post('/address/add',{name:name,username:username,phone:phone,city:city,address:local,door:house}).then((res)=>{
        // console.log(res)})
        http.post('/address/add',{name:name,username:username,phone:phone,city:city,address:local,door:house}).then((res)=>{
            console.log(res);})

        console.log(name,username,phone,city,local,house);
        
        // 跳转到地址管理页面
        this.props.history.push(path);
    }

    //左上角a标签返回按钮事件
    goback=()=>{
        document.getElementsByClassName("title-box")[0].style.setProperty('top','0');
        document.getElementsByClassName("container")[0].style.setProperty('margin-top','40px');
        this.props.history.push('/addlocal');
    }
    

    render(){
        return(
            <div className="box">
        <div className="editTitle">
            <a onClick={this.goback}></a>
            <h2>编辑配送地址</h2>
        </div>
        <ul className='editInput'>
            <li>
                <label>姓名</label>
                <input className="name" type="text" placeholder="收货人姓名"/>
            </li>

            <li>
                <label>手机</label>
                <input className="phone" type="text" placeholder="收货人手机号"/>
            </li>

            <li>
                <label>城市</label>
                <Cascader options={options} onChange={onChange} placeholder="请选择城市" />
                {/* 选择地址的span标签类名为  .ant-cascader-picker-label */}
            </li>


            <li>
                <label>地址</label>
                <textarea className="local" name="" id="" cols="14" rows="6" placeholder="请填写小区/写字楼/学校等"></textarea>
            </li>

            <li>
                <label>门牌号</label>
                <input className="house" type="text" placeholder="例：5号楼201室"/>
            </li>

        </ul>
        <div className="set-default">
            <label>设为默认</label>
        </div>
       
        <button onClick={this.goto.bind(null,'/addlocal')}>确定</button>
        
    </div>
        )
    }

}

export default Editlocal;

