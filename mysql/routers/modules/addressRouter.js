const express = require('express');

//引入mysql方法做数据库的查询
const query = require('../../db/mysql');
const {create,verify} = require('./token');

const router = express.Router();

//添加新地址
router.post('/add',async (req,res)=>{
    console.log(1111);
    let {name,username,phone,city,address,door} = req.query;
    try{
        console.log('有人来添加路径了');
        console.log("姓名"+name,"账号"+username,"电话号码"+phone,"城市"+city,"街道"+address,"门牌号"+door);
        let sql = `INSERT INTO address(name,username,phone,city,address,door) VALUES('${name}','${username}','${phone}','${city}','${address}','${door}')`;
        // console.log(sql);
        let sql2 = `SELECT * FROM address WHERE username='${username}'`;
        let p = await query(sql);
        let p1 = await query(sql2);
        // console.log(p);
        let inf = {}
        if(p.affectedRows){//大于0就是成功
            inf = {
                code:2000,
                flag:true,
                message:'添加路径成功',
                data:{
                    p1
                }
            }
        }else{
            //其他为失败
            inf = {
                code:3000,
                flag:false,
                message:'添加路径失败'
            }
        }
        res.send(inf);
    }catch(err){
        let inf = {
            code:err.errno,
            flag:false,
            message:'添加路径失败'
        }
        res.send(inf);
    }
});

//验证token需求
router.get('/verify', (req,res)=>{
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

//获取地址列表
router.get('/check',async (req,res)=>{
    console.log(1111);
    let username = req.query;
    try{
        console.log(username+'来查询地址了');
        // console.log("姓名"+username,"电话号码"+phone,"城市"+city,"街道"+address,"门牌号"+door);
        let sql = `SELECT * FROM address WHERE username='${username}'`;
        console.log(sql);
        let p = await query(sql);
        console.log(p.length);
        let inf = {}
        if(p.length){
            inf = {
                code:2000,
                flag:true,
                message:'显示路径成功',
                data:{
                    p
                }
            }
        }else{
            //其他为失败
            inf = {
                code:3000,
                flag:false,
                message:'显示路径失败',
                data:{
                    p
                }
            }
        }
        res.send(inf);
    }catch(err){
        let inf = {
            code:err.errno,
            flag:false,
            message:'操作失败'
        }
        res.send(inf);
    }
});

//编辑地址列表
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
        let sql = `DELETE from address WHERE uid=${id}`;
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
module.exports = router;