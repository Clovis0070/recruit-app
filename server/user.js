const express = require('express');
const Router = express.Router();

const model = require('./model');   // 引入 model 及其方法
const User = model.getModel('user');

Router.get('/info', function (req, res) {
    console.log("收到用户登陆状态查询请求");
    return res.json({code: 1});     // code:1 表示用户未登录， 0表示已登录
});

Router.get('/list', function (req, res) {
    console.log("收到list查询请求");
    User.find({}, function (err, doc) {
        return res.json(doc);
    })
})

Router.post('/register', function (req, res) {
    console.log("收到注册请求");
    console.log(req.body);
    const {user, pwd, type} = req.body;
    User.findOne({user:user}, function (err, doc) {     // 用 findOne 查找用户是否已经存在
        if (doc) {                                          // 用户存在，那么doc就不为空
            return res.json({code:1, msg:'用户已存在'});     // 注意每次一定要先设置登录状态
        }
        User.create({user,pwd, type}, function (err, doc) {
            if (err) {
                return res.json({code:1, msg: '后端出错了'});
            }
            return res.json({code:0 });
        })
    })
})

module.exports = Router;