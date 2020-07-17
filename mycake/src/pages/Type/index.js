import React, { Component } from 'react'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import './type.css'
class Type extends Component {
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
            <div className="type">
                <Tabs tabs={this.state.tabs}
                initialPage={0}
                //高亮字体颜色
                tabBarActiveTextColor={'#442818'}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                {/* {this.state.tabs.map((item,index)=>{
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of first tab
                    </div>
                })} */}
                    <div className='list-pro-box'>
                        <div className='pro-list-title' id='list-title-1'>
                            <h2>
                                蛋糕
                                <span>新鲜乳脂奶油蛋糕</span>
                            </h2>
                        </div>
                        <div className='list-box'>
                            <ul>
                            <li id='list-goods-'>
                                <div className='list-goods-pdleft'>
                                    <div className='list-pro-content'>
                                        <a title='蔓生'>
                                            <div className='list-pro-img'>
                                                <img src='https://static.21cake.com//upload/images/6741e6a33ded89163be645cf6484d9ad.jpg'></img>
                                            </div>
                                            <h3>
                                            Framboise Cake
                                            <span>蔓生</span>
                                            </h3>
                                            <span className='price'>¥198.00/454g(1.0磅)</span>
                                            <div className='label'>
                                                <img src='https://m.21cake.com/upload/images/1e22720bd656f7bac246159010c7e1f4.png'></img>
                                            </div>
                                        </a>
                                        <a className='cart-add' name='cart-add_1318' data-id='1318'>
                                            <img src='https://static.21cake.com//themes/wap/img/list-cart.png'></img>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li id='list-goods-'>
                                <div className='list-goods-pdleft'>
                                    <div className='list-pro-content'>
                                        <a title='蔓生'>
                                            <div className='list-pro-img'>
                                                <img src='https://static.21cake.com//upload/images/6741e6a33ded89163be645cf6484d9ad.jpg'></img>
                                            </div>
                                            <h3>
                                            Framboise Cake
                                            <span>蔓生</span>
                                            </h3>
                                            <span className='price'>¥198.00/454g(1.0磅)</span>
                                            <div className='label'>
                                                <img src='https://m.21cake.com/upload/images/1e22720bd656f7bac246159010c7e1f4.png'></img>
                                            </div>
                                        </a>
                                        <a className='cart-add' name='cart-add_1318' data-id='1318'>
                                            <img src='https://static.21cake.com//themes/wap/img/list-cart.png'></img>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li id='list-goods-'>
                                <div className='list-goods-pdleft'>
                                    <div className='list-pro-content'>
                                        <a title='蔓生'>
                                            <div className='list-pro-img'>
                                                <img src='https://static.21cake.com//upload/images/6741e6a33ded89163be645cf6484d9ad.jpg'></img>
                                            </div>
                                            <h3>
                                            Framboise Cake
                                            <span>蔓生</span>
                                            </h3>
                                            <span className='price'>¥198.00/454g(1.0磅)</span>
                                            <div className='label'>
                                                <img src='https://m.21cake.com/upload/images/1e22720bd656f7bac246159010c7e1f4.png'></img>
                                            </div>
                                        </a>
                                        <a className='cart-add' name='cart-add_1318' data-id='1318'>
                                            <img src='https://static.21cake.com//themes/wap/img/list-cart.png'></img>
                                        </a>
                                    </div>
                                </div>
                            </li>


                        </ul>
                        </div>
                    </div>

                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    Content of second tab
                </div> */}
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


export default Type

