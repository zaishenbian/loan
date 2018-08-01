var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../public/config.json');
var appId = config.appId;
var appSecret = config.appSecret;
var pageUrl = config.pageUrl;

/* 获取openId */
router.get('/getopenId', function(req, res, next) {
  var code = req.query.code;
  var page = req.query.page;
  request.get(
      'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+appId+'&secret='+appSecret+'&code='+code+'&grant_type=authorization_code',
    function(error, response, body){
      if(response.statusCode == 200){
        // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
        console.log(JSON.parse(body));
        var data = JSON.parse(body);
        var openid = data.openid;
        var url = pageUrl+'/'+page+'?openId='+openid;
        res.redirect(url);
      }else{
        console.log(response.statusCode);
      }
    }
  );
});

module.exports = router;
