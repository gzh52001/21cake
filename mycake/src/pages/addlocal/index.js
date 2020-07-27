//地址管理页面
import React,{Component} from 'react';

import './base.css'
import './index.css'
import http from '../../utils/http';

class AddLocal extends Component{
    
    componentDidMount(){
        //数据渲染前获取地址
        let username = localStorage.getItem("username")

        http.get('/address/check/' + username,{}).then((res)=>{
            console.log(res);
        })
    }

    //页面跳转事件，获取地址参数
    goto = (path)=>{
        this.props.history.push(path);
        // this.goto.bind(null,'/sign');
    }

    render(){
        return(
            //空的地址管理页面
            <div className='addLocalbox'>
                <img src="https://m.21cake.com/themes/wap/img/address-empty.png" alt=""/>
                <span>您还没有地址</span>
            <button className='addLocal' onClick={this.goto.bind(null,'/editlocal')} > 添加新地址 </button>
            </div>
            
            //有数据的地址管理页面
            // <div className="steLoacl">

            // </div>
        )
    }

}

export default AddLocal;