var express = require('express');
var router = express.Router();
var config = require('../public/config.json');
var appId = config.appId;
var appSecret = config.appSecret;
var pageUrl = config.pageUrl;

/* 首页路由 */
router.get('/', function(req, res, next){
  res.render('admin/index', { layout: 'admin/layout' });
});

//欢迎页面
router.get('/admin/welcome', function(req, res, next) {
  res.render('admin/welcome', { layout: 'admin/layout' });
});

//贷款管理页面
router.get('/admin/loan', function(req, res, next) {
  res.render('admin/loan', { layout: 'admin/loanLayout' });
});

//推荐管理页面
router.get('/admin/recommend', function(req, res, next) {
  res.render('admin/recommend', { layout: 'admin/loanLayout' });
});

//反馈管理页面
router.get('/admin/feedback', function(req, res, next) {
  res.render('admin/feedback', { layout: 'admin/loanLayout' });
});

//贷款详情页面
router.get('/admin/loanDetail', function(req, res, next) {
  res.render('admin/loanDetail', { layout: 'admin/loanLayout' });
});

//密码重置页面
router.get('/admin/pswset', function(req, res, next) {
  res.render('admin/pswset', { layout: 'admin/layout' });
});

//登录页面
router.get('/login', function(req, res, next){
  res.render('admin/login', { layout: 'admin/layout' });
})

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
