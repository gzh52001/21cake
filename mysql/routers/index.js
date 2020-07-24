//引入express开启静态资源服务器
const express = require('express');
const router = express.Router();//router==app

//参数接受和 GET 基本一样，不同的在于 GET 是 request.query 而 POST 的是 request.body
var bodyParser = require('body-parser');

// 添加json解析
router.use(bodyParser.json());//转json数据
router.use(bodyParser.urlencoded({extended: false}));//转键值对数据
//只要设置两个中间键，无论你是json数据还是键值对数据，对会转成对象形式

//CORS跨域：方便和小伙伴共享接口：加上这段话，再设置防火墙，别人就可以访问你的接口了(记得保证服务器开启)
//把这个路由配置放在所有路由的前面，方便调用next操作
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") { //特殊请求：发送了请求头的那些请求
        res.sendStatus(200); /*让options请求快速返回*/
    } else {
        next();
    }
})

//导入子路由
const userRouter = require('./modules/userRouter');
const goodsRouter = require('./modules/goodsRouter');
const breadRouter = require('./modules/breadRouter');
const wenzhangRouter = require('./modules/wenzhangRouter');
const shopcarRouter = require('./modules/shopcarRouter');
const addressRouter = require('./modules/addressRouter');

router.use('/user',userRouter);//启用路由
router.use('/good',goodsRouter);//启用路由
router.use('/bread',breadRouter);//启用路由
router.use('/wz',wenzhangRouter);//启用路由
router.use('/shopcar',shopcarRouter);
router.use('/address',addressRouter);

//用户管理 userRouter.js
    //验证用户名是否存在
    //注册
    //登录
    //验证token
    //修改信息
    //删除用户
    //删除多个用户
    //查询用户列表（分页）
    //查询uid为xx的用户信息
//商品管理 goodsRouter.js
    //商品信息列表
    //查询gid为xx的商品
    //修改gid为xx的商品信息
    //删除gid的商品
    //删除多个商品
    //新增商品
//订单管理 orderRouter.js
    //新增订单
    //删除订单
    //修改订单
    //查询订单列表
    //查询某个订单



//导出路由
module.exports = router;