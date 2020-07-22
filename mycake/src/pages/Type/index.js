import React, { Component } from 'react'
import { Tabs,Toast} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import './type.css'
import http from '../../utils/http'

//成功提示框
function successToast() {
    Toast.success('成功添加到购物车！', 1);
  }

class Type extends Component {
    state={
        tabs:[
                { title: '蛋糕', sub: '1' ,type:'cake'},
                { title: '面包', sub: '2',type:'bread' },
                { title: '咖啡下午茶', sub: '3',type:'tea' },
                { title: '冰淇淋', sub: '4',type:'icecream' },
                { title: '常温蛋糕', sub: '5',type:'cake' },
                { title: '设计师礼品', sub: '6',type:'cake' },
            ],
        type:'cake',//默认是cake,
        typename:'',
        typrtitle:''
    }
    componentDidMount(){
        // console.log(this.state.type);
        //初始化渲染cake的数据
        this.getdata(this.state.type)
    }
    //切换type的时候
    getdata=(type)=>{
        // console.log(type);
        const data=  http.get(`/good/type/`+type)
        data.then(res=>{
            // console.log(res.data);
            this.setState({typedata:res.data,type});
            this.showdata(type)
        })
    }
    add=(gid)=>{
        // console.log(gid);
        //根据商品id先查询这个商品信息，然后加到购物车
        http.get('/good/getgood/'+gid).then(res=>{
            // console.log(res);
          //获取改商品信息
          let goodmsg= res.data.p[0];
        //   goodmsg.weight1++;
          //然后存到数据库，购物车那边再调用
        //   console.log(goodmsg);
          http.post('/shopcar/addgoods',{
              gid:goodmsg.gid,
              img:goodmsg.img,
              cname:goodmsg.chtitle,
              ename:goodmsg.egtitle,
              weight:goodmsg.weight,
              weight1:1,
              weight2:goodmsg.weight2,
              weight3:goodmsg.weight3,
              weight4:goodmsg.weight4,
              price:goodmsg.price}).then(res=>{
            // console.log(res);
          //成功后弹出提醒
          if(res.flag){
            successToast()
          }
          
          })
        });
      }
    //不同类型商品跳转不同页面
    showdata=(type)=>{
        // console.log(type);

        let typename=''
        let typrtitle=''
        switch(type){
            case 'cake':typename='蛋糕';typrtitle='新鲜乳脂奶油蛋糕';
                break;
            case 'icecream':typename='冰淇淋';typrtitle='10天生命的意式杰拉朵冰淇淋';
                break;
            case 'tea':typename='奶羹和雪酪';typrtitle='奶羹和雪酪';
                break;
            case 'bread':typename='面包';typrtitle='面包';
                break;
        }
        return (
            <div className='list-pro-box'>
                <div className='pro-list-title' id='list-title-1'>
                    <h2>
                        {typename}
                        <span>{typrtitle}</span>
                    </h2>
                </div>
                <div className='list-box'>
                    <ul>
                        {this.state.typedata.map(item=>(
                            <li id='list-goods-'  key={item.gid}>
                                <div className='list-goods-pdleft'>
                                    <div className='list-pro-content'>
                                        <a title={item.chtitle} onClick={this.gogoods.bind(null,item.gid)}>
                                            <div className='list-pro-img' >
                                                <img src={item.img}></img>
                                            </div>
                                            <h3 >
                                            {item.egtitle}
                                            <span >{item.chtitle}</span>
                                            </h3>
                                            <span className='price'>{`¥${item.price}.00/454g(1.0磅)`}</span>
                                            <div className='label'>
                                                <img src='https://m.21cake.com/upload/images/1e22720bd656f7bac246159010c7e1f4.png'></img>
                                            </div>
                                        </a>
                                        <a className='cart-add' name='cart-add_1318' data-id='1318' onClick={this.add.bind(null,item.gid)}>
                                            <img src='https://static.21cake.com//themes/wap/img/list-cart.png'></img>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            )
    }
    //对应商品跳转到详情页面
    gogoods=(gid)=>{
        this.props.history.push(`/goods/${gid}`)
    }
    
    render() {
        const {typedata}=this.state;
        return (
            <div className="type">
                <Tabs tabs={this.state.tabs}
                initialPage={0}
                //高亮字体颜色
                tabBarActiveTextColor={'#442818'}
                //切换type
                onChange={(tab, index) => { this.getdata(tab.type)}}
                // onTabClick={(tab, index) => { console.log(tab.type); }}
                >
                    {typedata ? this.showdata.bind(null,this.state.type) : null}
                    
                </Tabs>
                <div className='lost-bottom'>
                    <div>没了</div>
                </div>
                <div className='footer'>
                    <ul>
                    <li id='appDownloadLink'>
                        <a href='https://m.21cake.com/appdown.html'>下载APP</a>
                    </li>
                    <li>
                        <a >联系我们</a>
                    </li>
                    <li>
                        <a >全站公告</a>
                    </li>
                    <li>
                        <a >生产经营资质</a>
                    </li>
                    </ul>
                    <p>
                    Copyright© 21Cake蛋糕官网商城 2007-2020, 
                    <br></br>        
                    版权所有 
                    <br></br>  
                    京ICP备14006254号-1
                    <br></br>  
                    网站注册公司名称: 北京廿一客食品有限公司
                    <br></br>  
                    网站运营：廿一客（上海）电子商务有限公司
                    <br></br>  
                    上海廿一客食品有限公司分公司
                    <br></br>  
                    杭州廿一客食品有限公司
                    <br></br>  
                    广州廿一客食品有限公司
                    <br></br>  
                    北京廿一客食品有限公司
                    <br></br>  
                    深圳廿一客贸易有限公司
                    <br></br>  
                    天津廿一客食品有限公司
                    <br></br>  
                    广州廿一客食品贸易有限公司
                    <br></br>  
                    举实（上海）食品有限公司
                    </p>
                </div>
          
            </div>
        )
    }
}

Type = withRouter(Type)
export default Type

