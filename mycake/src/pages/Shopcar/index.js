import React, { Component } from 'react'
import { NavBar,Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
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
        val: 3,
        allprice:0
    }
    componentDidMount(){
        //获取数据
        http.get('/shopcar/getgoods',{name:'pdx'}).then(res=>{
            //渲染
            this.showdatalist(res.data.p)
            let list = res.data.p
            //用一个数组来存处理后的数据，因为weight1234分别对应不同规格的，所以每种规格都算一种商品
            let datalist=[];
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
                        smallist.weighttitle='454g(1.0磅)'
                        smallist.weight='weight1'
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
                        smallist.weighttitle='908g(2.0磅)'
                        smallist.weight='weight2'
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
                        smallist.weighttitle='1362g(3.0磅)'
                        smallist.weight='weight3'
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
                        smallist.weighttitle='1816g(4.0磅)'
                        smallist.weight='weight4'
                        datalist.push(smallist)
                    }
            }
            this.setState({goodslist:datalist,sqlgoodlist:list})
            this.gogoods();
            this.allprice()
        })
    }
    //
    showdatalist=(datalist)=>{
    }
    goto=(path)=>{
        this.props.history.push(path);
    }
    //改变数量
    onChange = (val) => {
        this.setState({ val });
      }
    add=(idx,gid,weight)=>{
        //idx用于修改goodlist（渲染到页面的数据），gid用于修改sqlgoodlist的数据，后面sqlgoodlist数据需要上传到数据库进行更新
        //修改goodlist里面对应的数据
        let goodslist =this.state.goodslist;
        goodslist[idx].num++;
        //以及sqlgoodlist里面gid为xx的weightx数据加一
        
        let sqlgoodlist =this.state.sqlgoodlist;
        // console.log(sqlgoodlist);
        let si='';
        for(var i=0;i<sqlgoodlist.length;i++){
            if(sqlgoodlist[i].gid==gid){
                sqlgoodlist[i][weight]++
                si=i;
            }
        }
        this.setState({goodslist,sqlgoodlist});
        this.update(si)
        this.allprice()
      }
    reduce=(idx,gid,weight)=>{
        let goodslist =this.state.goodslist
        //最少为0，0的时候移除
        if(goodslist[idx].num>1){
            goodslist[idx].num--;
        }else{
            //变成0代表删除此数据
            goodslist.splice(idx,1)
        }
        let si='';//用来记录是第几条goodlist被修改
        let sqlgoodlist =this.state.sqlgoodlist;
        for(var i=0;i<sqlgoodlist.length;i++){
            if(sqlgoodlist[i].gid==gid){
                //按道理华应该在这里进行判断，最少为0，不能删除因为这个是要传到数据库更新的
                //但是因为goodslist有进行判断，当减成0删除数据所以不会触发到这里
                sqlgoodlist[i][weight]--
                si=i;
            }
        }
        this.setState({goodslist,sqlgoodlist});
        this.update(si)
        this.allprice()
    }
    //每次修改进行更新
    update=(si)=>{
        const sqlgoodlist =this.state.sqlgoodlist[si]
        http.post('/shopcar/updategoods',sqlgoodlist).then(res=>{
            // console.log(res);
        })
    }
    dropall=(yesno)=>{
        if(yesno){
            //删除所有数据
            this.setState({goodslist:[]});
            let sqlgoodlist=this.state.sqlgoodlist
            for(var i=0;i<sqlgoodlist.length;i++){
                sqlgoodlist[i].weight1=0;
                sqlgoodlist[i].weight2=0;
                sqlgoodlist[i].weight3=0;
                sqlgoodlist[i].weight4=0;
            }
            this.setState({sqlgoodlist})
            console.log(this.state.sqlgoodlist);
            http.post('/shopcar/dropall',{clear:'clearshopcar'}).then(res=>{
                // console.log(res);
            })
        }
    }

    //结算事件
    jiesuan=()=>{
        let token = localStorage.getItem('token')
        console.log(token);
        if(token==null){
            alert('请先登录')
            this.props.history.push('/sign')
        }else{
            http.get('/user/verify',{token:token}).then((res)=>{
                console.log(res);
                if(res.flag){
                    alert("可以结算啦！！")
                }
            })
        }
    }

    //判断有没有商品，如果没有商品就渲染空页面，有就渲染出来
    gogoods=()=>{
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
                                            规格：{item.weighttitle}
                                            <i></i>
                                        </span>
                                        <span className='cart-price'>
                                            ￥{item.num*item.price}.00
                                        </span>
                                    </div>
                                </div>
                                <div className='cart-pro-number'>
                                    <a className='action-quantity-minus user-behavior-tj-analysis' onClick={this.reduce.bind(null,idx,item.gid,item.weight)}>
                                        <img src='https://static.21cake.com//themes/wap/img/-.png'></img>
                                    </a>
                                    <span className='quantity '>{item.num}</span>
                                    <a className='action-quantity-plus user-behavior-tj-analysis' onClick={this.add.bind(null,idx,item.gid,item.weight)}>
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
                            <a key='0'  className='order-delete-but user-behavior-tj-analysis' onClick={this.showAlert.bind()}></a>
                        
                    ]}
                    rightContent={[
                        <a key='0'  className='place-order-but'  onClick={this.jiesuan.bind()}>去结算</a>
                    ]}>
                    <div className='pay-money' id='cart-total-amount'>
                        <div className='guodudiv' style={{float:'right',height:'100%',textAlign:'right'}}>¥
                            <span>{this.state.allprice}.00</span>
                            <span>商品</span>
                        </div>
                    </div>
                    </NavBar>
                </div>)
        }else{
            return (
                    <div className='emptygood'>
                        <img src='https://static.21cake.com/themes/wap/img/cart-empty.png'></img>
                        <p>您的购物车里还没有商品</p>
                        <a onClick={this.goto.bind(null,'/home')}>去购物....</a>
                    </div>
                )
       }
    }
    //总价
    allprice=()=>{
        const {goodslist}=this.state;
        let allprice=0;
        goodslist.map((item,idx)=>{
            allprice+=item.num*item.price
        })
        this.setState({allprice})
    }
    //弹出框
    // alert=()=>{} 

    showAlert= () => {
        const alertInstance = Modal.alert('', '确定删除全部商品？', [
            { text: '取消', onPress: () => this.dropall(false), style: 'default' },
            { text: '确定', onPress: () => this.dropall(true) },
        ]);
        setTimeout(() => {
            // 可以调用close方法以在外部close
            console.log('auto close');
            alertInstance.close();
        }, 500000);
    };
    render() {
        //要设一个常量来接收，不然会提示不是render里面的不能渲染
        const {goodslist} =this.state;
        return (
            <div className='shopcar'>
                {/* 这里不能写bind的，不然会报错 */}
                {goodslist ? this.gogoods(): null}
                {/* {this.goodslist.bind(null,1) ?  navbar : <div>想屁吃</div>} */}
            </div>
        )
    }
}

Shopcar = withRouter(Shopcar)
export default Shopcar
