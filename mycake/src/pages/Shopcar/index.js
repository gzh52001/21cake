import React, { Component } from 'react'
import { NavBar,} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import './shopcar.css'
import http from '../../utils/http'


class Shopcar extends Component {
    state={
        tabs:[
                { title: '蛋糕', sub: '1' },
                { title: '冰淇淋', sub: '2' },
                { title: '咖啡下午茶', sub: '3' },
                { title: '面包', sub: '4' },
                { title: '常温蛋糕', sub: '5' },
                { title: '设计师礼品', sub: '6' },
            ],
        goodslist:null,
        // navbar:'',
        val: 3,
    }
    componentDidMount(){
        //获取数据
        http.get('/shopcar/getgoods',{name:'pdx'}).then(res=>{
            //渲染
            this.showdatalist(res.data.p)
            // console.log(res.data.p);
            let list = res.data.p
            //用一个数组来存处理后的数据，因为weight1234分别对应不同规格的，所以每种规格都算一种商品
            let datalist=[];
            // console.log(list);
            for(var i=0;i<list.length;i++){
                // console.log(list[i]);//每一条数据
                    //每一条数据里面weight1234有值的
                    if(list[i].weight1>0){
                        let smallist={};//用来存每条小数据的内容
                        smallist.gid=list[i].gid
                        smallist.cname=list[i].cname
                        smallist.ename=list[i].ename
                        smallist.img=list[i].img
                        smallist.price=list[i].price
                        smallist.num=list[i].weight1
                        smallist.canju=5*1
                        smallist.weight='454g(1.0磅)'
                        datalist.push(smallist)
                    }
                    if(list[i].weight2>0){
                        let smallist={};//用来存每条小数据的内容
                        smallist.gid=list[i].gid
                        smallist.cname=list[i].cname
                        smallist.ename=list[i].ename
                        smallist.img=list[i].img
                        smallist.price=list[i].price*2
                        smallist.num=list[i].weight2
                        smallist.canju=5*2
                        smallist.weight='908g(2.0磅)'
                        datalist.push(smallist)
                    }
                    if(list[i].weight3>0){
                        let smallist={};//用来存每条小数据的内容
                        smallist.gid=list[i].gid
                        smallist.cname=list[i].cname
                        smallist.ename=list[i].ename
                        smallist.img=list[i].img
                        smallist.price=list[i].price*3
                        smallist.num=list[i].weight3
                        smallist.canju=5*3
                        smallist.weight='1362g(3.0磅)'
                        datalist.push(smallist)
                    }
                    if(list[i].weight4>0){
                        let smallist={};//用来存每条小数据的内容
                        smallist.gid=list[i].gid
                        smallist.cname=list[i].cname
                        smallist.ename=list[i].ename
                        smallist.img=list[i].img
                        smallist.price=list[i].price*4
                        smallist.num=list[i].weight4
                        smallist.canju=5*4
                        smallist.weight='1816g(4.0磅)'
                        datalist.push(smallist)
                    }
            }
            // console.log(datalist);
            this.setState({goodslist:datalist})
            this.gogoods();
        })
    }
    //
    showdatalist=(datalist)=>{
        // console.log(datalist);
    }
    goto=(path)=>{
        this.props.history.push(path);
    }
    //改变数量
    onChange = (val) => {
        // console.log(val);
        this.setState({ val });
      }
    add=(idx)=>{
        console.log(idx);
      }
    //判断有没有商品，如果没有商品就渲染空页面，有就渲染出来
    gogoods=()=>{
        console.log(this.state.goodslist);
        if(this.state.goodslist.length){
            return (
                <div>
                    {/* 底部 */}
                    
                    <p className='cart-top-tip' id='top-notice'>
                    · 满100元免配送服务费 ·
                    </p>
                    <ul className='cart-pro-list'>
                        {this.state.goodslist.map((item,idx)=>(
                            <li className='cart-object-goods-item scene_area' key={idx}>
                                <div className='cart-pro-box'>
                                    <a>
                                        <img src={item.img}></img>
                                    </a>
                                    <div className='cart-pro-title'>
                                        <div>
                                            <h2>
                                                <span>{item.cname}</span>
                                                <span>{item.ename}</span>
                                            </h2>
                                        </div>
                                        <span className='cart-select-pound'>
                                            规格：{item.weight}
                                            <i></i>
                                        </span>
                                        <span className='cart-price'>
                                            ￥{item.num*item.price}.00
                                        </span>
                                    </div>
                                </div>
                                <div className='cart-pro-number'>
                                    <a className='action-quantity-minus user-behavior-tj-analysis'>
                                        <img src='https://static.21cake.com//themes/wap/img/-.png'></img>
                                    </a>
                                    <span className='quantity '>{item.num}</span>
                                    <a className='action-quantity-plus user-behavior-tj-analysis' onClick={this.add.bind(null,idx)}>
                                        <img src='https://static.21cake.com/themes/wap/img/+.png' alt='+'></img>
                                    </a>
                                </div>
                                <p className='laid-count'>每份含免费餐具{item.canju}套</p>
                                <a className='birthday-brand'>+添加生日牌</a>
                            </li>
                        ))}
                        
                    </ul>
                    <NavBar
                    mode="light"
                    className='bottom-addcart-button'
                    leftContent={[
                        <a key='0' className='order-delete-but user-behavior-tj-analysis' ></a>
                    ]}
                    rightContent={[
                        <a key='0' className='place-order-but'  onClick={this.openchange}>去结算</a>
                    ]}>
                    <div className='pay-money' id='cart-total-amount'>
                        <div className='guodudiv' style={{float:'right',height:'100%',textAlign:'right'}}>¥
                            <span>999.00</span>
                            <span>商品</span>
                        </div>
                    </div>
                    </NavBar>
                </div>)
        }else{
            console.log(2222222222);
            return (
                    <div className='emptygood'>
                        <img src='https://static.21cake.com/themes/wap/img/cart-empty.png'></img>
                        <p>您的购物车里还没有商品</p>
                        <a onClick={this.goto.bind(null,'/home')}>去购物....</a>
                    </div>
                )
       }
    }
    render() {
        //要设一个常量来接收，不然会提示不是render里面的不能渲染
        const {goodslist} =this.state;
        // console.log(goodslist);
        return (
            <div className='shopcar'>
                {/* {this.state.navbar} */}
                {/* 这里不能写bind的，不然会报错 */}
                {goodslist ? this.gogoods(): null}
                {/* {this.goodslist.bind(null,1) ?  navbar : <div>想屁吃</div>} */}
            </div>
        )
    }
}

Shopcar = withRouter(Shopcar)
export default Shopcar






