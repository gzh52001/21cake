import React, { Component } from 'react'
import { Carousel,WingBlank,Toast} from 'antd-mobile';
import './home.css'
import {withRouter} from 'react-router-dom';
import http from '../../utils/http'

//成功提示框
function successToast() {
  Toast.success('成功添加到购物车！', 1);
}

 class Home extends Component {
    state = {
        lbtdata: [
        'https://static.21cake.com//upload/images/8dd6c441b4acda5e0651af43a81b9731.jpg',
        'https://static.21cake.com//upload/images/f85354a7eb45dc3725b5b595a393d6ae.jpg',
        'https://static.21cake.com//upload/images/350655c7460cc54297919171f6ebae9c.jpeg',
        'https://static.21cake.com//upload/images/ca9e0211b2910589238cd68ed38dc3c3.jpg',
        'https://static.21cake.com//upload/images/ce9c53ee52de5d6bcb1e6747e8e25dd7.jpg'
        ],
        imgHeight: 176,
        typedata:[
          {
            title:'蛋糕',
            path:'type/cake',
            img:'https://static.21cake.com//upload/images/145995dff6c6458e0738ee2178a1a0df.png',
            // component:Cake
          },
          {
            title:'面包',
            path:'type/bread',
            img:'https://static.21cake.com//upload/images/561ca3d60f16a63299fd16d3e9e0c3c4.png',
            // component:Bread
          },
          {
            title:'下午茶',
            path:'type/tea',
            img:'https://static.21cake.com//upload/images/3b70ed637c61fc696faa7e983726ed7d.png',
            // component:Tea
          },
          {
            title:'企业专区',
            path:'type/cake',
            img:'https://static.21cake.com//upload/images/760d7a2fe4c5e1bede87389fc843de7f.png',
            // component:Gift
          }
        ],
      }
      goto=(path)=>{
        this.props.history.push(path)
      }
      async componentDidMount() {
        //请求商品数据
        const {data} = await http.get('/good/goodslist',{page:1,size:5});
        //请求底部文章数据
        const wenzhang = await http.get('/wz/wenzhang',{id:'pdx'})
        // console.log(wenzhang);
        // const cakedata=data;
        //把数据添加到state
        this.setState({
          cakedata:[...data],
          wenzhang:[...wenzhang.data]
        })
      }
      showdata=()=>{
        //数据没到就不渲染，数据到了就渲染
        if(this.state.cakedata){
          //传过来的商品
          return (
            this.state.cakedata.map((item,index)=>(
              <div className="mould-goods" key={item.gid} >
                <div className="mould-goods-content">
                  <h3 className="title-goods">
                    <span>新品</span>
                    <a>
                      更多
                      <i className="new-home-more"></i>
                    </a>
                  </h3>
                  <ul>
                    <li>
                      <a  onClick={this.goto.bind(null,'/goods/'+item.gid)}>
                        <img src={item.img}/>
                      </a>
                      <div className='bottom-price-cart'>
                        <a onClick={this.goto.bind(null,'/goods/'+item.gid)}>
                          <h4>
                            <span className="title">{item.chtitle}</span>
                            <span className="price">{item.price}</span>
                            <span >元/454g(1.0磅)</span>
                          </h4>
                          <p>树莓奶油与浆果慕斯蛋糕</p>
                        </a>
                        <button className="add-to-cart_22010">
                          <i className='new-home-icon' onClick={this.add.bind(null,item.gid)}></i>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ))
          )
        }
      }
      //首页底部文章活动
      showwenzhang=()=>{
        
        if(this.state.wenzhang){
          // console.log(this.state.wenzhang);
          return (
            this.state.wenzhang.map((item,index)=>(
              // console.log(item),
                <div className='left-img-div' key={index}>
                  <a>
                    <div className='wzimg' style={{background:"url("+item.img+") no-repeat",backgroundSize:'100%'}}></div>
                    <h6>{item.title}</h6>
                  </a>
                </div>
            ))
          )
        }
      }
      //添加商品
      add=(gid)=>{
        // console.log(gid);
        //根据商品id先查询这个商品信息，然后加到购物车
        http.get('/good/getgood/'+gid).then(res=>{
          //获取改商品信息
          let goodmsg= res.data.p[0];
          goodmsg.num++;
          //然后存到数据库，购物车那边再调用
          console.log(goodmsg);
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
            price:goodmsg.price
          }).then(res=>{
            console.log(res);
          //成功后弹出提醒
          if(res.flag){
            successToast()
          }
          
          })
        });
      }
      render() {
        const {typedata} = this.state;
        const {cakedata}=this.state;
        const {wenzhang}=this.state
        return (
          <div>
              <WingBlank>
              <Carousel
                autoplay={true}
                infinite
              >
                {this.state.lbtdata.map((val,index) => (
                  <a
                    key={val}
                    href=""
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                  >
                    <img
                      src={this.state.lbtdata[index]}
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
              <div className="new-home-content">
                <ul className="right-box">
                  <li>
                    <i className="new-home-icon"></i>
                    新客满298元赠送切块蛋糕
                  </li>
                  <li>
                    <i className="new-home-icon"></i>
                    满100包邮 
                  </li>
                  <li>
                    <i className="new-home-icon"></i>
                    全程冷链配送
                  </li>
                </ul>
                {/* 蛋糕面包下午茶专区 */}
                <ul className="home-menu-box" id="home-menu">
                  {this.state.typedata.map((val,index) => (
                    <li
                      key={val.title}
                      onClick={this.goto.bind(null,val.path)}
                    >
                      <a>
                        <img src={val.img} />
                        {val.title}
                      </a>
                    </li>))
                  }
                </ul>
                {this.showdata()}
                <div className='home-mould mould-activity'>
                  <h3>
                    <span>廿一客·活动</span>
                  </h3>
                  <div className='mould-activity-box activity-swiper-container'>
                    <div className='mould-activity-list swiper-wrapper'>
                      <div className='swiper-slide'>
                        <a href='https://m.21cake.com/magazine/detail/241.html'>
                          <div className='left-text'>
                            <h6>新客权益</h6>
                            <p>点击查看</p>
                            <span>只剩167天</span>
                          </div>
                          <div className='right-img'>
                            <img src='https://static.21cake.com//upload/images/9bfa8ea6a193c5877646c375119515ef.jpg'></img>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='home-mould mould-community magazine'>
                <h3>
                  <span>廿一客·文章</span>
                </h3>
                <div className='home-community-content'>
                  <div className='community-list'>
                    <div className='left-img'>
                      {this.showwenzhang()}
                    </div>
                    <div className='look_more'>
                      <a href='https://m.21cake.com/magazine.html'>查看更多</a>
                    </div>
                  </div>
                </div>
               
              </div>
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
        );
      }
}
Home = withRouter(Home)
export default Home





