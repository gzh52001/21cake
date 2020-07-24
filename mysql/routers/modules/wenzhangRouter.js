const express = require('express');

//引入mysql方法做数据库的查询
const query = require('../../db/mysql');

const router = express.Router();
router.get('/wenzhang',async (req,res)=>{
    let {id}=req.query;
   try{
    console.log(id+"来查询文章");
       let sql = `SELECT * FROM wenzhang`;
       let p = await query(sql);//等数据库传回来数据才进行下一步
       let inf={};
       if(p.length){
        //查询得到
        inf={
            code:2000,
            flag:true,
            message:'查询成功',
            total:p.length,//总数据有多少条
            data:p
        }
        console.log(p)
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