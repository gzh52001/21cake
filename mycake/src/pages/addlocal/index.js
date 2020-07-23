//地址管理页面
import React,{Component} from 'react';

import './base.css'
import './index.css'
import http from '../../utils/http';

class AddLocal extends Component{
    
    componentDidMount(){
        //数据渲染前获取地址
        http.get('/address/check/13632945150',{}).then((res)=>{
            console.log(1);
        })
    }

    goto = (path)=>{
        this.props.history.push(path);
        // this.goto.bind(null,'/sign');
    }

    render(){
        return(
            
            <div className='addLocalbox'>
                <img src="https://m.21cake.com/themes/wap/img/address-empty.png" alt=""/>
                <span>您还没有地址</span>
            <button className='addLocal' onClick={this.goto.bind(null,'/editlocal')} > 添加新地址 </button>
            </div>
            
        )
    }

}

export default AddLocal;