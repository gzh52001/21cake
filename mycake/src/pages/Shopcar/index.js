import React, { Component } from 'react'
import { NavBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import './shopcar.css'
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
        goodslist:[1],
        navbar:'',
    }
    componentDidMount(){
        this.gogoods()
    }
    goto=(path)=>{
        this.props.history.push(path);
    }
    //判断有没有商品，如果没有商品就渲染空页面，有就渲染出来
    gogoods=()=>{
        if(this.state.goodslist.length){
            this.setState({navbar:this.state.navbar = 
                <div>
                    {/* 底部 */}
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
                    <p className='cart-top-tip' id='top-notice'>
                    · 满100元免配送服务费 ·
                    </p>
                    <ul className='cart-pro-list'>
                        <li className='cart-object-goods-item scene_area'>
                            <div className='cart-pro-box'>
                                <a>
                                    <img src='https://static.21cake.com/public/images/f5/5d/b7/b83cb087b6a4c85a2a88cc73f8811853.jpg'></img>
                                </a>
                                <div className='cart-pro-title'>
                                    <div>
                                        <h2>
                                            <span>Framboise Cake</span>
                                            <span>蔓生</span>
                                        </h2>
                                    </div>
                                    <span className='cart-select-pound'>
                                        规格：908g(2.0磅)
                                        <i></i>
                                    </span>
                                    <span className='cart-price'>
                                        ￥596.00
                                    </span>
                                </div>
                            </div>
                            <div className='cart-pro-number'></div>
                            <p className='laid-count'>每份含免费餐具10套</p>
                            <a className='birthday-brand'>+添加生日牌</a>
                        </li>
                    </ul>
                </div>
               
               })
       }else{
           this.setState({navbar:
           <div className='emptygood'>
               <img src='https://static.21cake.com/themes/wap/img/cart-empty.png'></img>
               <p>您的购物车里还没有商品</p>
               <a onClick={this.goto.bind(null,'/home')}>去购物 >></a>
           </div>})
       }
    }
    render() {
        
        return (
            <div className='shopcar'>
                {this.state.navbar}
                {/* {this.goodslist.bind(null,1) ?  navbar : <div>想屁吃</div>} */}
            </div>
        )
    }
}

Shopcar = withRouter(Shopcar)
export default Shopcar

