const express = require('express');

//引入mysql方法做数据库的查询
const query = require('../../db/mysql');
const {create,verify} = require('./token');

const router = express.Router();
//添加购物车
router.post('/addgoods',async (req,res)=>{
    //对传进来的用户名密码进行解构赋值
    let goodmsg = req.query;
    try{
        console.log("有人进来添加：");
        console.log(goodmsg);
        //先判度数据库中有没有这个id，有就在这个id上修改num
        let sql0=`UPDATE shopcar SET weight1=weight1+${goodmsg.weight1},weight2=weight2+${goodmsg.weight2},weight3=weight3+${goodmsg.weight3},weight4=weight4+${goodmsg.weight4} WHERE gid=${goodmsg.gid}`
        let p0=await query(sql0);
        //有就在原值+1,没有就进行添加
        // p.affectedRows数据库传回来的，1表示有一行被影响说明插入成功
        let inf= {};
        if(p0.affectedRows){
            //修改成功后返回此数据
            // console.log(p0);
            let sql = `SELECT * FROM shopcar WHERE gid=${goodmsg.gid}`;
            let p = await query(sql);
            console.log("返回给前端的数据");
            console.log(p);
            
            inf={
                code:2000,
                flag:true,
                message:'添加成功',
                data:{
                    p
                }
            }
        }else{
            //没有的话就新增
            console.log("需要新增");
            console.log(goodmsg);
            let sql2 =`INSERT INTO shopcar(gid,img,cname,ename,weight,weight1,weight2,weight3,weight4,price) VALUES(${goodmsg.gid},'${goodmsg.img}','${goodmsg.cname}','${goodmsg.ename}',${goodmsg.weight},${goodmsg.weight1},${goodmsg.weight2},${goodmsg.weight3},${goodmsg.weight4},${goodmsg.price})`;
            let p2=await query(sql2);
            console.log('p2');
            let sql = `SELECT * FROM shopcar WHERE gid=${goodmsg.gid}`;
            let p = await query(sql);
            //新增成功
            if(p2.affectedRows){
                inf={
                    code:2000,
                    flag:true,
                    message:'新增成功',
                    data:{
                        p
                    }
                }
            }else{
                inf={
                    code:3000,
                    flag:false,
                    message:'新增失败'
                }
            }
        }
        res.send(inf) 
    }catch(err){
        let inf={
            code:err.errno,
            flag:false,
            message:'操作失败'
        }
        res.send(inf)
    }
});
//查询购物车商品
router.get('/getgoods',async (req,res)=>{
    //对传进来的用户名密码进行解构赋值
    let name = req.query;
    try{
        let sql = `SELECT * FROM shopcar`;
        let p = await query(sql);
        let inf= {};
        if(p.length){
            inf={
                code:2000,
                flag:true,
                message:'查询成功',
                data:{
                    p
                }
            }
        }else{
                inf={
                    code:3000,
                    flag:false,
                    message:'新增失败'
                }
            
        }
        res.send(inf) 
    }catch(err){
        let inf={
            code:err.errno,
            flag:false,
            message:'操作失败'
        }
        res.send(inf)
    }
});
//对对应商品数量进行更改
router.post('/updategoods',async (req,res)=>{
    //对传进来的用户名密码进行解构赋值
    let goodmsg = req.query;
    console.log(goodmsg);
    try{
        
        //先判度数据库中有没有这个id，有就在这个id上修改num
        let sql0=`UPDATE shopcar SET weight1=${goodmsg.weight1},weight2=${goodmsg.weight2},weight3=${goodmsg.weight3},weight4=${goodmsg.weight4} WHERE gid=${goodmsg.gid}`
        let p0=await query(sql0);
        //有就在原值+1,没有就进行添加
        // p.affectedRows数据库传回来的，1表示有一行被影响说明插入成功
        let inf= {};
        if(p0.affectedRows){
            //修改成功后返回此数据
            // console.log(p0);
            let sql = `SELECT * FROM shopcar WHERE gid=${goodmsg.gid}`;
            let p = await query(sql);
            console.log(p);
            
            inf={
                code:2000,
                flag:true,
                message:'添加成功',
                data:{
                    p
                }
            }
        }else{
                inf={
                    code:3000,
                    flag:false,
                    message:'添加失败'
                }
        }
        res.send(inf) 
    }catch(err){
        let inf={
            code:err.errno,
            flag:false,
            message:'操作失败'
        }
        res.send(inf)
    }
});
router.post('/dropall',async (req,res)=>{
    //对传进来的用户名密码进行解构赋值
    let goodmsg = req.query;
    console.log(goodmsg);
    let inf={}
    try{
        if(goodmsg.clear=='clearshopcar'){
            console.log('可以删除');
            let sql0=`UPDATE shopcar SET weight1=0,weight2=0,weight3=0,weight4=0`
            let p0=await query(sql0);
            inf={
                code:2000,
                flag:true,
                message:'删除成功'
            }
        }else{
            inf={
                code:3000,
                flag:false,
                message:'删除失败'
            }
        }
        res.send(inf)
    }catch(err){
            let inf={
                code:err.errno,
                flag:false,
                message:'操作失败'
            }
            res.send(inf)
        }

    })
module.exports = router;