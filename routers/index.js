//引入express开启静态资源服务器
const express = require('express');
const router = express.Router();//router==app

router.use('/home',(req,res)=>{
    res.send('进入了路由');
})

//导出路由
module.exports = router;