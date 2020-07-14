//引入express开启静态资源服务器
const express = require('express');
//导入路由
const AllRouter = require('./routers/index');

const app = express();//创建实例

app.use(express.static('/home'));//静态资源服务器
app.use(AllRouter);//启用路由

app.listen(4099,()=>{
    console.log('服务器已开启，请访问4099的端口');
})