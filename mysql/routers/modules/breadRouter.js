//引入express开启静态资源服务器
const express = require('express');

//引入mysql方法做数据库的查询
const query = require('../../db/mysql');
const {create,verify} = require('./token');

const router = express.Router();//router==app

router.get('/breadlist',async (req,res)=>{
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
       let sql = `SELECT * FROM bread LIMIT ${index},${size}`;
       let p = await query(sql);//等数据库传回来数据才进行下一步
       let inf={};
       let sql2 = `SELECT * FROM bread`;
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

module.exports = router;