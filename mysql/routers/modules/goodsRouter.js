const express = require('express');

//引入mysql方法做数据库的查询
const query = require('../../db/mysql');
const {create,verify} = require('./token');

const router = express.Router();

//商品管理 goodsRouter.js
    //商品信息列表
    //查询gid为xx的商品
    //修改gid为xx的商品信息
    //删除gid的商品
    //删除多个商品
    //新增商品

//商品信息表：存储商品信息 包含商品信息
//用户信息表：注册
// 商品列表
router.get('/goodslist',async (req,res)=>{
    let {page,size} = req.query;
    
    page = page || 1;//没有传的话默认1
    size = size || 6;
    //SELECT * FROM userinf LIMIT 0,5  0-起始下标  5-5条数据
    let index = (page - 1) * size;//公式
    /*
        page  size  index
        1      5     0
        2      5     5
        3      5     10
    */
   try{
    console.log("有人来查询商品");
       let sql = `SELECT * FROM good LIMIT ${index},${size}`;
       let p = await query(sql);//等数据库传回来数据才进行下一步
       let inf={};
       let sql2 = `SELECT * FROM good`;
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

//查询某个id的商品信息
router.get('/getgood/:gid', async(req,res)=>{
    let gid = req.params.gid;
    try{
        console.log("有人来查询商品gid为:"+gid+"的信息");
        let sql = `SELECT * FROM good WHERE gid=${gid}`;
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

//删除  DELETE FROM jxcart WHERE pid=11
router.delete('/delgood/:gid', async (req,res)=>{
    let id = req.params.gid;//获取要删除的gid
    try{
        console.log("有人来删除商品");
        console.log(`删除gid：${id}`);
        let sql = `DELETE FROM good WHERE gid=${id}`;
        let p =await query(sql);
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
        res.send(inf)
    }catch(err){
        let inf={
            code: err.errno,
            flag: false,
            message: '删除失败'
        }
        res.send(inf)
    }
})

//编辑
router.put('/edit/:gid', async(req,res)=>{
    //gname:账号  psw:密码(只能是数字)
    let obj = req.body;//{gname:'小青',psw:'66778'}
    console.log(obj);
    
    let str = '';
    for(let key in obj){
        str +=key +'='+`'${obj[key]}'`+','
    }
    str = str.slice(0,-1);//最后得把多出来的,去掉
    let id = req.params.gid;//动态路由要用params接收
    try{
        console.log("有人来修改商品信息"+str);
        console.log(`修改了gid：${id}商品信息改成：${str}`);
        let sql = `UPDATE good SET ${str} WHERE gid=${id}`;
        let p = await query(sql);
        let inf = {};
        console.log(p.affectedRows);
        if(p.affectedRows){
            inf={
                code: 2000,
                flag: true,
                message: '修改成功',
                data:{
                    obj
                }
            }
        }else{
            inf = {
                code: 3000,
                flag: false,
                message: '修改失败'
            }
        }
        res.send(inf)
    }catch(err){
        let inf = {
            code: 3000,
            flag: false,
            message: '操作失败'
        }
        res.send(inf)
    }

})

//新增商品
router.post('/addgoods',async (req,res)=>{
    //对传进来的用户名密码进行解构赋值
    let list = req.body;
    console.log("管理员新增商品");
    console.log(list);
    try{
        let sql = `INSERT INTO good(title,price,weight) VALUES('${list.title}','${list.price}','${list.weight}')`;
        console.log(sql);
        let p = await query(sql);
        let inf= {};
        //p.affectedRows数据库传回来的，1表示有一行被影响说明插入成功
        if(p.affectedRows){
            inf={
                code:2000,
                flag:true,
                message:'新增成功',
                data:{
                    list
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

// router.get('/goodslist',(req,res)=>{
//     res.send('查询商品列表');
// });
    
module.exports = router;