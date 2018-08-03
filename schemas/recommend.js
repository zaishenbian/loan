var mongoose = require('mongoose');
var Schemas = mongoose.Schema;

var recommendSchemas = new Schemas({
    //openId
    openId: String,
    //被推荐人姓名
    recName: String,
    //被推荐人手机号
    recPhone: String,
    //借款金额
    money: String,
    //分期数
    term: String,
    //审核状态
    recStatus: Number,
    //审核失败原因
    reason: String
});

module.exports = recommendSchemas;