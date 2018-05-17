const express = require('express');
const mongoose = require('mongoose');

// connect mongo and use imooc as database dir
const DB_URL = 'mongodb://localhost:27017/imooc';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log('mongo connect success');
});

const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
    age: {type: Number, require: true}
}));

User.create({
    user: 'imooc',
    age: 18
}, function (err, doc) {
    if(!err) {
        console.log(doc);
    } else {
        console.log(err);
    }
});

User.remove({age: 18}, function (err, doc) {
    if (!err) {
        console.log(doc);
        console.log('a');
    } else {
        console.log(err);
    }
});



// 创建server app
const app = express();

// 定义服务端的行为。
app.get('/', function (req, res) {
    res.send('<h1>Hello I am Server Express</h1>')
});

app.get('/data', function (req, res) {          // 浏览器导航到 localhost:9093/data 时，可以看到所有数据。

     User.find({}, function (err, doc) {
        res.json(doc);
    })

});


app.listen(9093, function () {
    console.log('Node app start at port 9093');
});



