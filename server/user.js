const mongoose = require('mongoose');
const express = require('express');
const Router = express.Router();

const utility = require('utility');     // 引入加密模块
const model = require('./model');   // 引入 model 及其方法
const User = model.getModel('user');
const _filter = {'pwd': 0, '__v': 0};


Router.get('/info', function (req, res) {       // 查询用户登陆状态，返回值 code:1 表示用户未登录， 0表示已登录
    console.log("收到用户登陆状态查询请求");
    // 根据 cookie 判断登陆状态
    const userid = req.cookies['userid'];               // 读取 cookie，要使用 req.cookies
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid},_filter, function (err, doc) {    // 此时根据数据库自动生成的 id 来查询数据是最好的做法，不过要注意，查询 id 要做转换
        if (err) {
            return res.json({code:1, msg: "后端出错了"});
        }
        if (doc) {
            console.log('当期用户已登陆');

            return res.json({code: 0, data: doc});
        }
        return res.json({code: 1})
    });
});

Router.get('/infotest', function (req, res) {
    User.findOne({user: 'a'}, function (err, doc) {
        console.log('test');
        if (err) {
            console.log(err);
        } else {
          console.log('查询成功');
        }
    })
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
    User.findOne({user:user}, _filter, function (err, doc) {     // 用 findOne 查找用户是否已经存在
        if (doc) {                                          // 用户存在，那么doc就不为空
            return res.json({code:1, msg:'用户已存在'});     // 注意每次一定要先设置登录状态
        }
        User.create({user,pwd: md5Pwd(pwd), type}, function (error, docu) {
            if (error) {
                return res.json({code:1, msg: '后端出错了'});
            }
            return res.json({code:0 });
        })
    })
})

Router.post('/login',  function (req, res) {
    console.log("收到登陆请求");
    console.log(req.body);
    const {user, pwd} = req.body;
    User.findOne({user: user},  function (err, doc) {
        if (doc) {
            // console.log(doc);
            if (md5Pwd(pwd) === doc.pwd){
                res.cookie('userid', doc._id);      // 把登陆信息放到 cookie 中，根据数据库自动添加的 _id 俩索引这个数据是最好的做法。
                return res.json({code: 0, usertype: doc.type });
            }
            else {
                return res.json({code: 1, msg:"密码不正确，请检查密码，重新输入"});
            }
        }

        return res.json({code: 1, msg:"此用户不存在，请检查输入"});
    })
})

function md5Pwd(pwd){                // 这是本服务器使用的加密算法
    const salt = 'imooc_is_great_3461223ixf@-0_2#$%^&iclock_9rs';
    return utility.md5(utility.md5(salt + pwd));
}

module.exports = Router;