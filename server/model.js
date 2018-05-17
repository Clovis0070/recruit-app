const mongoose = require('mongoose');
// connect mongo and use imooc as database dir
const DB_URL = 'mongodb://localhost:27017/imooc';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log('mongo connect success');
});


const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {type: String, require: true},
        // 个人信息
        'avatar': {type: String}, // 头像
        'brief': {type: String},  // 个人简介
        'title': {type: String},  // 寻求的职位
        // 如果是boss，还会有下面字段
        'company': {type: String},
        'money': {type: String},
    },
    chat: {}
}

for (let m in models) {   // 用一个循环，完成多个表的生成
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
}
