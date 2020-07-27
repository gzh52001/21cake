//引入mysql模块
const mysql = require('mysql');

//创建连接池
var pool  = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'cake',
    multipleStatements: true
});

//查询数据
// let sql = 'SELECT * FROM reg';
// pool.query(sql,(err,data)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(data);
// })

//封装query方法
function query(sql){
    return new Promise((resolve,reject)=>{
        pool.query(sql,(err,data)=>{
            if(err) reject(err);//失败的回调
            resolve(data);//成功的数据放到成功的回调里面
        })
    })
}

//测试
// let sql = 'SELECT * FROM reg';

// let p = query(sql);//promise
// p.then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })
// console.log(p);

module.exports = query;