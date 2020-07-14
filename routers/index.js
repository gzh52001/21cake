//引入express开启静态资源服务器
const express = require('express');
const router = express.Router();//router==app

//导入子路由
const userRouter = require('./modules/userRouter');
const goodsRouter = require('./modules/goodsRouter');

router.use('/user',userRouter);//启用路由
router.use('/good',goodsRouter);//启用路由

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