//地址编辑页面
import React,{Component} from 'react';

import './base.css'
import './index.css'

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
        if(this.setState.path == '/editlocal'){
            console.log('1');
            document.getElementsByClassName("title-box")[0].style.setProperty('top','-100px');
            document.getElementsByClassName("container")[0].style.setProperty('margin','0');
        }
    }


    goto = (path)=>{
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
                <input type="text"/>
            </li>
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

