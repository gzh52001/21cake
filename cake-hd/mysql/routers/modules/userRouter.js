const express = require('express');

//引入mysql方法做数据库的查询
const query = require('../../db/mysql');
const {create,verify} = require('./token');

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
    let {username,psw,birthday} = req.query;
    try{
        console.log('有人来注册了');
        console.log("账号"+username,"密码"+psw,"生日"+birthday);
        let sql = `INSERT INTO reg(username,psw,birthday) VALUES('${username}','${psw}','${birthday}')`;
        console.log(sql);
        let p = await query(sql);
        console.log(p);
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
    let {username,psw,keep} = req.query;//keep:是否要七天免登录，可以生成token
    try{
        console.log('有人来登陆了');
        console.log("账号"+username,"密码"+psw);
        let sql = `SELECT * FROM reg WHERE username='${username}'and psw='${psw}'`;
        let inf = {}
        let p = await query(sql);
        if(p.length){//查到数据，可以登录
            let token = '';
            if(keep == 'true'){
            token = create(psw); 
            //保留七天
            }else{
            token = create(psw,60*60*24); 
            }
            console.log(token);
            inf = {
                code:2000,
                flag:true,
                message:'登陆成功',
                data:{
                    token
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

//验证token需求
router.get('/verify', (req,res)=>{
    console.log("有人来验证token");
    let {token} = req.query;
    let result = verify(token);
    let inf = {};
    if(result){
        inf = {
        code:2000,
        flag:true,
        message:'校验成功',
        }
    }else{
        inf = {
        code:3000,
        flag:false,
        message:'校验失败'
        }
    }
    res.send(inf)
});

//修改信息
router.put('/edit/:uid',async (req,res)=>{
    let obj = req.body;//keep:是否要七天免登录，可以生成token
    console.log(obj);
    let str = '';
    for(let key in obj){
        str += key + '=' + `'${obj[key]}'` + ','
    }
    str = str.slice(0,-1);
    let id = req.params.uid;// 截取id

    try{
        console.log('有人来修改了'+str);
        let sql = `UPDATE reg SET ${str} WHERE uid=${id}`;
        let inf = {}
        let p = await query(sql);
        if(p.affectedRows){
            //修改成功
            inf = {
                code: 2000,
                flag: true,
                message: '修改成功',
            }
        }else{
            //修改失败
            inf = {
                code:3000,
                flag:false,
                message:'修改失败'
            }   
        }
        res.send(inf);
    }catch(err){
        let inf = {
            code:err.errno,
            flag:false,
            message:'登录失败'
        }
        res.send(inf);
    }
});

//删除数据
router.delete('/del/:uid',async (req,res)=>{
    let id = req.params.uid
    try{
        console.log('有人来删除了');
        let sql = `DELETE from reg WHERE uid=${id}`;
        let inf = {}
        let p = await query(sql);
        if(p.affectedRows){
            //修改成功
            inf = {
                code: 2000,
                flag: true,
                message: '删除成功',
            }
        }else{
            //修改失败
            inf = {
                code:3000,
                flag:false,
                message:'删除失败'
            }   
        }
        res.send(inf);
    }catch(err){
        let inf = {
            code:err.errno,
            flag:false,
            message:'登录失败'
        }
        res.send(inf);
    }
});

//删除多个用户  DELETE FROM jxcart WHERE uid in(21,26,27)
router.delete('/delall',async (req,res)=>{
    let alluid = req.body.ids;// ids 是前端拼接好的uid的字符串，必须要拼接成 21,26,27
    try{
        console.log("有人来删除一批用户");
        let sql = `DELETE FROM reg WHERE uid in(${alluid})`;
        let p = await query(sql);
        let inf = {};
        if(p.affectedRows){
            //删除成功
            inf={
                code: 2000,
                flag: true,
                message: '删除成功'
            }
        }else{
            //删除失败
            inf={
                code: 3000,
                flag: false,
                message: '删除失败'
            }
        }
        res.send(inf);
    }catch(err){
        let inf ={
            code: err.errno,
            flag: false,
            message: '删除失败'
        }
        res.send(inf)
    }
    
})

//查询用户列表，分页查询page:1 页码 size:5 每页五条
router.get('/userslist',async (req,res)=>{
    let {page,size} = req.query;
    
    page = page || 1;//没有传的话默认1
    size = size || 5;
    //SELECT * FROM userinf LIMIT 0,5  0-起始下标  5-5条数据
    let index = (page - 1) * size;//公式
    /*
        page  size  index
        1      5     0
        2      5     5
        3      5     10
    */
   try{
    console.log("有人来查询用户列表");
       let sql = `SELECT * FROM reg LIMIT ${index},${size}`;
       let p = await query(sql);//等数据库传回来数据才进行下一步
       let inf={};
       let sql2 = `SELECT * FROM reg`;
       let p2 = await query(sql2);
       if(p.length){
        //查询得到
        inf={
            code:2000,
            flag:true,
            message:'查询成功',
            total:p2.length,//总数据有多少条
            page,
            size,
            data:p
        }
       }else{
        inf = {
            code: 3000,
            flag: false,
            message: '查询失败'
        }
       }
       res.send(inf)
   }catch(err){
       let inf={
        code: err.errno,
        flag: false,
        message: '查询失败'
       }
       res.send(inf)
   }
})

//查询某个用户信息/:uid
router.get('/user/:uid', async(req,res)=>{
    let uid = req.params.uid;
    try{
        console.log("有人来查询用户id为:"+uid+"的信息");
        let sql = `SELECT * FROM reg WHERE uid=${uid}`;
        let p =await query(sql);
        let inf={};
        if(p.length){
            //查到数据
            inf={
                code: 2000,
                flag: true,
                message: '查询成功',
                data: {
                    p
                }
            }
        }else{
            inf={
                code: 3000,
                flag: false,
                message: '查询失败'
            }
        }
        res.send(inf);
    }catch(err){
        let inf={
            code: err.errno,
            flag: false,
            message: '查询失败'
           }
           res.send(inf)
    }
})

//查询某个username的用户信息SELECT * FROM reg WHERE username=15712345678
router.get('/users/:username', async(req,res)=>{
    let username = req.params.username;
    // console.log(username);
    try{
        console.log("有人来查询用户username为:"+username+"的信息");
        let sql = `SELECT * FROM reg WHERE username=${username}`;
        let p =await query(sql);
        let inf={};
        if(p.length){
            //查到数据
            inf={
                code: 2000,
                flag: true,
                message: '查询成功',
                data: {
                    p
                }
            }
        }else{
            inf={
                code: 3000,
                flag: false,
                message: '查询失败'
            }
        }
        res.send(inf);
    }catch(err){
        let inf={
            code: err.errno,
            flag: false,
            message: '查询失败'
           }
           res.send(inf)
    }
})


module.exports = router;