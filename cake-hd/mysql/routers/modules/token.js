let jwt = require('jsonwebtoken');//引入插件

// 功能
    //生成token:密钥，失效时间
    //检验token:token

//密钥
let secret = 'libin';

//创建token
function create(data,expiresIn=60*60*24*7){//data要加密的数据，expiresIn失效时间
    let token = jwt.sign({data},secret,{
        expiresIn
    });
    return token;

}
//测试
// let t = create('123456');
// console.log(t);

//解密
function verify(token){
    let res;
    try{
        let result = jwt.verify(token, secret);
        console.log('token校验：',result)
        res = true;
    }catch(err){
        res = false;
    }
    
    return res;
}

// verify(t);

module.exports = {
    create,
    verify
}