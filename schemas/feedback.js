var mongoose = require('mongoose');
var Schemas = mongoose.Schema;

var feedbackSchemas = new Schemas({
    //openId
    openId: String,
    //反馈人姓名
    userName: String,
    //反馈人手机号
    userPhone: String,
    //反馈内容
    feedbackInfo: String
});

module.exports = feedbackSchemas;