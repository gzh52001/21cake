const express = require('express');

//引入mysql方法做数据库的查询
const query = require('../../db/mysql');

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

//验证用户名是否存在/user/checkname,一个请求里只能由一个send
router.get('/checkname',async (req,res)=>{
    console.log('有人来了');
    let {username} = req.query;
    try{
        let sql = `SELECT * FROM reg WHERE username = '${username}'`;
        let inf = {}
        let p = await query(sql);
        if(p.length){
            //查到数据，不能注册
            inf = {
                code:3000,
                flag:false,
                message:'用户名存在，不允许注册'
            }
        }else{
            //查不到允许注册
            inf = {
                code:2000,
                flag:true,
                message:'可以注册'
            }
        }
        res.send(inf)
    }catch(err){
        let inf = {
            code:err.errno,
            flag:false,
            message:'查询失败'
        }
        res.send(inf);
    }
});

//注册  /user/reg
router.post('/reg',async (req,res)=>{
    let {username,psw,birthday} = req.body;
    try{
        console.log('有人来注册了');
        console.log("账号"+username,"密码"+psw,"生日"+birthday);
        let sql = `INSERT INTO reg(username,psw,birthday) VALUES('${username}','${psw}','${birthday}')`;
        let p = await query(sql);
        let inf = {}
        if(p.affectedRows){//大于0就是成功
            //查到数据，不能注册
            inf = {
                code:2000,
                flag:true,
                message:'注册成功'
            }
        }else{
            //其他为失败
            inf = {
                code:3000,
                flag:false,
                message:'注册失败'
            }
        }
        res.send(inf);
    }catch(err){
        let inf = {
            code:err.errno,
            flag:false,
            message:'注册失败'
        }
        res.send(inf);
    }
});

//登录
router.get('/login',async (req,res)=>{
    let {username,psw} = req.query;
    try{
        console.log('有人来登陆了');
        console.log("账号"+username,"密码"+psw);
        let sql = `SELECT * FROM reg WHERE username='${username}'and psw='${psw}'`;
        let inf = {}
        let p = await query(sql);
        if(p.length){
            //查到数据，可以登录
            inf = {
                code:2000,
                flag:true,
                message:'登陆成功',
                data:{
                    token:'vsvsavsvssa'
                }
            }
        }else{
            //查不到登陆失败
            inf = {
                code:3000,
                flag:false,
                message:'登陆失败'
            }
        }
        res.send(inf)
    }catch(err){
        let inf = {
            code:err.errno,
            flag:false,
            message:'登录失败'
        }
        res.send(inf);
    }
});

module.exports = router;