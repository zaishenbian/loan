var express = require('express');
var router = express.Router();
var config = require('../public/config.json');
var appId = config.appId;
var appSecret = config.appSecret;
var pageUrl = config.pageUrl;

/* router */
router.get('/:first?/:second?', function(req, res, next) {
  var first = req.params.first;
  var second = req.params.second?'/'+req.params.second:"";
  var redirect = first+second;
  var openId = req.query.openId;
  // if(openId){
  //   res.render(first+second);
  // }else{
  //   /* 获取openId */
  //   var redirect_uri = encodeURI(pageUrl+'/api/getopenId?page='+first+second);
  //   var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appId+'&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_base#wechat_redirect';
  //   res.redirect(url);
  // }
  res.render(first+second);
});

module.exports = router;
