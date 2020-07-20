//地址编辑页面
import React,{Component} from 'react';

import './base.css'
import './index.css'

class Editlocal extends Component{

    render(){
        return(
            <div class="box">
        <div class="editTitle">
            <a ></a>
            <h2>编辑配送地址</h2>
        </div>
        <ul class='editInput'>
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
                <input type="text"/>
            </li>
            <li>
                <label>地址</label>
                <textarea name="" id="" cols="14" rows="6"></textarea>
            </li>
            <li>
                <label>门牌号</label>
                <input type="text" placeholder="例：5号楼201室"/>
            </li>
        </ul>
        <div class="set-default">
            <label>设为默认</label>
        </div>
       
        <button>确定</button>
        
    </div>
        )
    }

}

export default Editlocal;

