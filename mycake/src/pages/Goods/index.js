import React, { Component } from 'react'
import { Carousel,WingBlank, NavBar,Drawer, List,Toast} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import './goods.css'
import http from '../../utils/http'

//成功提示框
function successToast() {
    Toast.success('成功添加到购物车！', 1);
  }

class Goods extends Component {
    state={
        datalbt:null,
        open: false,//抽屉
        havechange:false,//是否选了规格，选的话就加入到购物车
        weight:1,//默认是款式1
    }
    //打开商品选择框
    openchange=(...args)=>{
        let goodsdrawer=document.getElementsByClassName("goods-drawer")[0]
        //要先判断有没有选了规格，选了的话havechange就是true，那么就加入购物车，没有的话得选规格然后havechange变为true
        if(this.state.havechange){
            if(!this.state.open){
                goodsdrawer.style="display:block"
            }else{
                //把商品加入购物车,弹出加入成功
                // console.log(this.state.datamsg[0].gid);
                this.add(this.state.datamsg[0].gid)
                goodsdrawer.style="display:none"
            }
            
        }else{
            //没选规格，open是false打开选择框
            if(!this.state.open){
                goodsdrawer.style="display:block"
            }else{
                goodsdrawer.style="display:none"
            }
        }
        
        this.setState({open:!this.state.open,havechange:!this.state.havechange})
        
    }
    close=()=>{
        let goodsdrawer=document.getElementsByClassName("goods-drawer")[0];
        goodsdrawer.style="display:none"
        this.setState({open:false,havechange:false})
    }
    async componentDidMount(){
        //识别是那个商品，然后请求数据
        let gid= this.props.location.pathname.split(`${this.props.match.path}/`)[1];
        // console.log(gid);
        const {data}=await http.get('/good/getgood/'+gid);
        // console.log(data);
        this.setState({
            datamsg:[...data.p],
            datalbt:[data.p[0].img0,data.p[0].img1,data.p[0].img2,data.p[0].img3]
          });
          this.changeweight(1)
    }
    changeweight=(idx)=>{
        //设置规格
        this.setState({weight:idx});
        // console.log(this.state);
        // console.log(this.state.weight);这state设置是等我们点击事件结束才设置，所以此处log出来的还是原来的
        // console.log(idx);
        switch(idx){
            //idx是一的话就高亮设置到1同事this.state.weight为1
            case 1: this.checkweight(1)
                break;
            case 2:  this.checkweight(2)
                break;
            case 3:  this.checkweight(3)
                break;
            case 4:  this.checkweight(4)
                break;
            default:this.checkweight(1)

        }
    }
    checkweight=(idx)=>{
        //改变高亮
        let cakelis=document.getElementsByClassName('cakeweight');
        for(var i=0;i<cakelis.length;i++){
            //移除所有高亮
            cakelis[i].classList.remove('active')
        }
        //给目标设置高亮
        cakelis[idx-1].classList.add('active');
        //改变弹出框规格各个值
        var str=`
            <li className='details-options-size'>
                <i style="background: url(https://static.21cake.com/themes/wap/img/size.png) no-repeat center;background-size:auto 100%"></i>
                ${12.5*idx}x${12.5*idx}cm
            </li>
            <li className='details-options-unmber'>
                <i style="background: url(https://static.21cake.com/themes/wap/img/unmber.png) no-repeat center;background-size:auto 100%"></i>
                ${3*idx}-${5*idx}人
            </li>
            <li className='details-options-laid'>
                <i style="background: url(https://static.21cake.com/themes/wap/img/laid.png) no-repeat center;background-size:auto 100%"></i>
                含${5*idx}套餐具（蜡烛需单独订购）
            </li>`;
        let cakeul= document.getElementsByClassName('details-options')[1];
        cakeul.innerHTML=str;
        //改变弹出框价格
        let cakeprice = document.getElementsByClassName('details-price')[0]
        cakeprice.innerHTML=`¥${this.state.datamsg[0].price*idx}.00`;
        //改变datamsg[0]的weight值
        // this.setState({
        //     datamsg:{}
        // });
        switch(idx){
            case 1: this.state.datamsg[0].weight1=1 ;this.state.datamsg[0].weight2=0 ;this.state.datamsg[0].weight3=0;this.state.datamsg[0].weight4=0
                break;
            case 2: this.state.datamsg[0].weight2=1 ;this.state.datamsg[0].weight1=0;this.state.datamsg[0].weight3=0;this.state.datamsg[0].weight4=0
                break;
            case 3: this.state.datamsg[0].weight3=1 ;this.state.datamsg[0].weight1=0;this.state.datamsg[0].weight2=0;this.state.datamsg[0].weight4=0
                break;
            case 4: this.state.datamsg[0].weight4=1 ;this.state.datamsg[0].weight1=0;this.state.datamsg[0].weight2=0;this.state.datamsg[0].weight3=0
                break;
        }
        // console.log(this.state.datamsg[0]);
        this.setState({datamsg:this.state.datamsg});
    }
    showlbt=()=>{
        if(this.state.datalbt.length){
            return (
                <div>
                    <WingBlank>
                    <Carousel
                            autoplay={false}
                            infinite>
                            {this.state.datalbt.map((val,index) => (
                            <a
                                key={val}
                                href=""
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
                                <img
                                src={this.state.datalbt[index]}
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
                </div>
            )
        }
    }
    showdatamsg=()=>{
        // console.log("进来showdatamsg"+this.state.weight);
        if(this.state.datamsg.length){
            // console.log(this.state.datamsg[0]);
            return (
                <div className='details-box'>
                    <div className='pro-title'>
                        <h3>{this.state.datamsg[0].egtitle}</h3>
                        <span>{this.state.datamsg[0].chtitle}</span>
                    </div>
                    <p className='price-label'>
                        <span className='top-price'>{"￥"+this.state.datamsg[0].price*this.state.weight+".00"}</span>
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
                                <a className='J-specifications' style={{color:'#442818'}}>
                                {`已选择：${454*this.state.weight}g(${1*this.state.weight}.0磅)`}
                                <i onClick={this.openchange}></i>
                                </a>
                            </li>
                        </ul>
                        <div className='details-options-card'>
                            <ul className='details-options'>
                                <li className='details-options-size'>
                                    <i></i>
                                {`${12.5*this.state.weight}x${12.5*this.state.weight}cm`}
                                </li>
                                <li className='details-options-unmber'>
                                    <i></i>
                                    {`${3*this.state.weight}-${5*this.state.weight}人`}
                                </li>
                                <li className='details-options-laid'>
                                    <i></i>
                                    {`含${5*this.state.weight}套餐具（蜡烛需单独订购）`}
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
                    <div className='details-introduction'>
                    <div style={{padding:'15px',background:'#fff',marginTop:'12px'}}>
                    {this.state.datamsg[0].msg}
                    <br></br>
                    {this.state.datamsg[0].msg1}
                    </div>
                    <div className='details-img'>
                        <img src={this.state.datamsg[0].simg0}></img>
                        <img src={this.state.datamsg[0].simg1}></img>
                        <img src={this.state.datamsg[0].simg2}></img>
                        <img src={this.state.datamsg[0].simg3}></img>
                        <p style={{textAlign:'center',color:'rgb(153,153,153)',fontSize:'x-small'}}>以上图片仅供参考，请以收到实物为准。</p>
                        <p ><font>退改说明：</font></p>
                        <p ><font>1. 北京、上海、杭州、广州地区距配送时间6小时及以上的订单可修改、取消、退订；距配送时间不足5小时，订单不再支持修改、取消、退订。（22点之后不接受次日14点之前配送订单修改、退订）</font></p>
                        <p style={{lineHeight:'20px'}}><font>2. 苏州、无锡、深圳、天津距配送时间不足8小时，订单不再支持修改、取消、退订。（22点之后不接受次日16点之前配送订单修改、退订）</font></p>
                    </div>
                </div>
                </div>
            )
        }
    }
    //添加商品
    add=(gid)=>{
        // console.log(this.state.datamsg[0]);
        //根据商品id先查询这个商品信息，然后加到购物车
          http.post('/shopcar/addgoods',{
              gid:this.state.datamsg[0].gid,
              img:this.state.datamsg[0].img,
              cname:this.state.datamsg[0].chtitle,
              ename:this.state.datamsg[0].egtitle,
              weight:this.state.weight,
              weight1:this.state.datamsg[0].weight1,
              weight2:this.state.datamsg[0].weight2,
              weight3:this.state.datamsg[0].weight3,
              weight4:this.state.datamsg[0].weight4,
              price:this.state.datamsg[0].price}).then(res=>{
            console.log(res.data.p);
          //成功后弹出提醒
          if(res.flag){
            successToast()
          }
          })
      }
    render() {
        let {aa}=this.state
        const {datalbt,datamsg} = this.state;
        const sidebar=(<List>{
                <div className='details-suspension-pop'>
                    <i className='hide-button'></i>
                    <div className='details-suspension'>
                        <i onClick={this.close}></i>
                        <div className='details-suspension-content'>
                            <p className='details-price'>¥198.00</p>
                            <div className='suspension-spec-box'>
                                <ul className='details-options'>
                                </ul>
                            </div>
                            <div className='normal-box'>
                                <p className='detail-spec-title'>商品规格</p>
                                <ul className='details-suspension-size'>
                                    <li className='cakeweight weight1 active' data-productid='22042' onClick={this.changeweight.bind(null,1)}>
                                        <span>454g</span>
                                        (1.0磅)
                                    </li>
                                    <li data-productid='22050' className='cakeweight weight2 ' id='weight2' onClick={this.changeweight.bind(null,2)} >
                                        <span>908g</span>
                                        (2.0磅)
                                    </li>
                                    <li data-productid='22058' className='cakeweight weight3 ' id='weight3' onClick={this.changeweight.bind(null,3)}>
                                        <span>1362g</span>
                                        (3.0磅)
                                    </li>
                                    <li data-productid='22066' className='cakeweight weight4 ' id='weight4' onClick={this.changeweight.bind(null,4)}>
                                        <span>1816g</span>
                                        (4.0磅)
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
                {/* 有数据才渲染没数据不渲染 */}
                {datalbt ? this.showlbt(): null}
                {datamsg ? this.showdatamsg(): null}
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
                        <a key='0' className='left-buy' data-goods-id='1318' onClick={datamsg ? this.add.bind(null,this.state.datamsg[0].gid) : null}>立即购买</a>
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