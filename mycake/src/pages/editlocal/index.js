//地址编辑页面
import React,{Component} from 'react';


import './base.css'
import './index.css'

import { Cascader } from 'antd';
import 'antd/dist/antd.css';

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
            document.getElementsByClassName("title-box")[0].style.setProperty('top','-100px');
            document.getElementsByClassName("container")[0].style.setProperty('margin','0');
        }
    }


    goto = (path)=>{
        //跳转到其他页面时，再次显示nav
        document.getElementsByClassName("title-box")[0].style.setProperty('top','0');
        document.getElementsByClassName("container")[0].style.setProperty('margin','vw(40)');
        this.props.history.push(path);
        // this.goto.bind(null,'/sign');
    }

    

    render(){
        return(
            <div className="box">
        <div className="editTitle">
            <a onClick={this.goto.bind(null,'/addlocal')}></a>
            <h2>编辑配送地址</h2>
        </div>
        <ul className='editInput'>
            <li>
                <label>姓名</label>
                <input type="text" placeholder="收货人姓名"/>
            </li>
            <li>
                <label>手机</label>
                <input type="text" placeholder="收货人手机号"/>
            </li>
            <li>
                <label>城市</label>
                <Cascader options={options} onChange={onChange} placeholder="请选择城市" />
                {/* <input type="text"/> */}
            </li>
            {/* <Cascader/> */}

            

            <li>
                <label>地址</label>
                <textarea name="" id="" cols="14" rows="6" placeholder="请填写小区/写字楼/学校等"></textarea>
            </li>
            <li>
                <label>门牌号</label>
                <input type="text" placeholder="例：5号楼201室"/>
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

