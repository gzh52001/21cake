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
            ]
    }
    render() {
        return (
            <div className='shopcar'>
                <NavBar
                    mode="light"
                    className='bottom-addcart-button'
                    leftContent={[
                        <a key='0' className='order-delete-but user-behavior-tj-analysis' ></a>
                    ]}
                    rightContent={[
                        <a key='0' className='place-order-but'  onClick={this.openchange}>去结算</a>
                    ]}
                >
                    <div className='pay-money' id='cart-total-amount'>
                        <div className='guodudiv' style={{float:'left',height:'100%',textAlign:'right'}}>¥
                            <span>999.00</span>
                            <span>商品</span>
                        </div>
                    </div>
                </NavBar>
            </div>
        )
    }
}

Shopcar = withRouter(Shopcar)
export default Shopcar

