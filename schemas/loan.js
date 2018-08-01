var mongoose = require('mongoose');
var Schemas = mongoose.Schema;

var loanSchemas = new Schemas({
    //openId
    openId: String,
    //借款金额
    money: String,
    //分期数
    term: String,
    //姓名
    userName: String,
    //手机号
    userPhone: String,
    //推荐人姓名
    refereeName: String,
    //推荐人手机号
    refereePhone: String,
    //身份证正面
    imagePositive: String,
    //身份证背面
    imageReverse: String,
    //手持身份证照片
    imageTogether: String,
    //审核状态
    status: Number,
    //审核失败原因
    reason: String
});

module.exports = loanSchemas;