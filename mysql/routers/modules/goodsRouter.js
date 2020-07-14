const express = require('express');

const router = express.Router();

//商品管理 goodsRouter.js
    //商品信息列表
    //查询gid为xx的商品
    //修改gid为xx的商品信息
    //删除gid的商品
    //删除多个商品
    //新增商品


router.get('/goodslist',(req,res)=>{
    res.send('查询商品列表');
});
    
module.exports = router;