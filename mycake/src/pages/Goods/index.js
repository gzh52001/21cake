import React, { Component } from 'react'
import { Carousel,WingBlank, NavBar,Drawer, List,D} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import './goods.css'
class Goods extends Component {
    state={
        data:[
            'https://static.21cake.com/upload/images/4e1999f88dd39ad8f98c102e19003eb6.jpg',
            'https://static.21cake.com/upload/images/282518e0dd85761d7d0e3cf9ff0d7f09.jpg',
            'https://static.21cake.com/upload/images/55c58303cb9a37c4005460d7640a6f20.jpg',
            'https://static.21cake.com/upload/images/3b6218417b8c6ebb29d61e381afb3f89.jpg'
        ],
        open: true,//抽屉
    }
    //打开商品选择框
    openchange=(...args)=>{
        this.setState({open:!this.state.open})
    }
    render() {
        const sidebar=(<List>{
                <div className='details-suspension-pop'>
                    <i className='hide-button'></i>
                    <div className='details-suspension'>
                        <i></i>
                        <div className='details-suspension-content'>
                            <p className='details-price'>¥198.00</p>
                            <div className='suspension-spec-box'>
                                <ul className='details-options'>
                                    <li className='details-options-size'>
                                        <i></i>
                                        12.5x12.5cm
                                    </li>
                                    <li className='details-options-unmber'>
                                        <i></i>
                                        3-4人
                                    </li>
                                    <li className='details-options-laid'>
                                        <i></i>
                                        含5套餐具（蜡烛需单独订购）
                                    </li>
                                </ul>
                            </div>
                            <div className='extra-box'>
                                <p className='detail-spec-title'>规格</p>
                                <ul className='details-suspension-size-extra'>
                                    <li className='goods-1318'>蔓生(有酒款)</li>
                                    <li className='goods-1319 active'>蔓生(无酒款)</li>
                                </ul>
                            </div>
                            <div className='normal-box'>
                                <p className='detail-spec-title'>商品规格</p>
                                <ul className='details-suspension-size'>
                                    <li className='active' data-productid='22042'>
                                        <span>454g</span>
                                        (1.0磅)
                                    </li>
                                    <li data-productid='22050'>
                                        <span>908g</span>
                                        (2.0磅)
                                    </li>
                                    <li data-productid='22058'>
                                        <span>1362g</span>
                                        (3.0磅)
                                    </li>
                                    <li data-productid='22066'>
                                        <span>2270g</span>
                                        (5.0磅)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </List>)
        return (
            <div className="goods">
                <WingBlank>
                <Carousel
                    autoplay={false}
                    infinite
                    // dotStyle={style={border}}
                >
                    {this.state.data.map((val,index) => (
                    <a
                        key={val}
                        href=""
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                        <img
                        src={this.state.data[index]}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                        }}
                        />
                    </a>
                    ))}
                </Carousel>
                </WingBlank>
                <div className='details-box'>
                    <div className='pro-title'>
                        <h3>Framboise Cake</h3>
                        <span>蔓生</span>
                    </div>
                    <p className='price-label'>
                        <span className='top-price'>￥198.00</span>
                    </p>
                    <div className='pro-details-label'>
                        <a>新品 ›</a>
                    </div>
                    <ul className='details-taste'>
                        <li>
                            <img src='https://static.21cake.com/themes/wap/img/goods/icon/micon-03.png' alt='酒'></img>
                            酒
                        </li>
                        <li>
                            <img src='https://static.21cake.com/themes/wap/img/goods/icon/micon-33.png' alt='奶油'></img>
                            奶油
                        </li>
                        <li>
                            <img src='https://static.21cake.com/upload/images/20200424/9a1558a50ef89716e49c6570bd667d0f.png' alt='树莓'></img>
                            树莓
                        </li>
                    </ul>
                    <div className='select-card'>
                        <ul className='select-specifications'>
                            <li>
                                <a className='J-specifications'>
                                已选择：蔓生(有酒款)454g(1.0磅)
                                <i></i>
                                </a>
                            </li>
                        </ul>
                        <div className='details-options-card'>
                            <ul className='details-options'>
                                <li className='details-options-size'>
                                    <i></i>
                                12.5x12.5cm
                                </li>
                                <li className='details-options-unmber'>
                                    <i></i>
                                    3-4人
                                </li>
                                <li className='details-options-laid'>
                                    <i></i>
                                    含5套餐具（蜡烛需单独订购）
                                </li>
                                <li className='details-options-time'></li>
                            </ul>
                        </div>
                        <ul className='store-info'>
                            <li>
                                <img src='https://static.21cake.com/themes/wap/img/fresh.png' alt="保鲜条件"></img>
                                <span>保鲜条件</span>
                                <div>
                                    <p>0－4℃保藏10小时，5℃食用为佳</p>
                                </div>
                            </li>
                            <li data-sweet='3' id='sweetList'>
                                <img src='https://m.21cake.com/themes/wap/img/sweet.png'></img>
                                <span>参考甜度</span>
                                <div>
                                    <p className='sweet-list'>
                                        <i className='active'></i>
                                        <i className='active'></i>
                                        <i className='active'></i>
                                        <i ></i>
                                        <i></i>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='details-introduction'>
                    <div style={{padding:'15px',background:'#fff',marginTop:'12px'}}>
                    /树莓奶油与浆果慕斯蛋糕/
                    <br></br>
                    /蛋糕底部，覆盆子冻干粉喷洒，恰到好处的一抹红晕/
                    </div>
                    <div className='details-img'>
                        <img src='https://static.21cake.com//upload/images/20200423/f2fcd378978c91e767300b2b0043e10e.jpg?_=0.015089458975375947'></img>
                        <img src='https://static.21cake.com//upload/images/20200423/0e97b27b2dcd86be30e4420d4eb74190.jpg?_=0.21426287460107085'></img>
                        <img src='https://static.21cake.com//upload/images/20200423/18812982e5b49ec10a6acfa5efd2806f.jpg?_=0.7700762106839161'></img>
                        <img src='https://static.21cake.com//upload/images/20200423/868832cb266371329390d653d034747a.jpg?_=0.36301167861904016'></img>
                        <img src='https://static.21cake.com//upload/images/20200423/4884dc6cd6489afbdacdbaf97b4c7920.jpg?_=0.39810113838855976'></img>
                        <p style={{textAlign:'center',color:'rgb(153,153,153)',fontSize:'x-small'}}>以上图片仅供参考，请以收到实物为准。</p>
                        <p ><font>退改说明：</font></p>
                        <p ><font>1. 北京、上海、杭州、广州地区距配送时间6小时及以上的订单可修改、取消、退订；距配送时间不足5小时，订单不再支持修改、取消、退订。（22点之后不接受次日14点之前配送订单修改、退订）</font></p>
                        <p style={{lineHeight:'20px'}}><font>2. 苏州、无锡、深圳、天津距配送时间不足8小时，订单不再支持修改、取消、退订。（22点之后不接受次日16点之前配送订单修改、退订）</font></p>
                    </div>
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
                    <p style={{marginBottom:'30px'}}>
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
                <NavBar
                    mode="light"
                    className='bottom-addcart-button'
                    leftContent={[
                        <a key='0' className='left-buy' data-goods-id='1318'>立即购买</a>
                    ]}
                    rightContent={[
                        <a key='0' className='join-cart' data-goods-id='1318' onClick={this.openchange}>加入购物车</a>
                    ]}
                >
                </NavBar>
                <Drawer
                className="goods-drawer"
                contentStyle={{height:0,textAlign:"center"}}
                overlayStyle={{height:0}}
                sidebar={sidebar}
                open={this.state.open}
                position='bottom'
                >
                11112222222222
                </Drawer>
                <a id='webIm'></a>
            </div>
        )
    }
}
Goods = withRouter(Goods)
export default Goods