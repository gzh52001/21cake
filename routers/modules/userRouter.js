const express = require('express');

const router = express.Router();

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

//验证用户名是否存在/user/checkname
router.get('/checkname',(req,res)=>{
    res.send('验证通过，可以注册');
});

module.exports = router;