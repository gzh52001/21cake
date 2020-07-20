//空的地址管理页面
import React,{Component} from 'react';

import './base.css'
import './index.css'

class AddLocal extends Component{
    
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