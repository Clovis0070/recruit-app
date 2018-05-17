const express = require('express');
const userRouter = require('./user');   // 引入 user.js
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();  // 创建 app
app.use(cookieParser());    // 添加处理 cookie 的能力
app.use(bodyParser.json());     // 添加处理 request body 的能力
app.use('/user', userRouter); // 开启一个中间件，其实也就是引入模块，添加server能力要在此之前

app.listen(9093, function () {
    console.log('Node app start at port 9093');
});



