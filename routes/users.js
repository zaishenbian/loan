var express = require('express');
var router = express.Router();
var request = require('request');
var ajaxhost = 'http://192.168.19.71:8080';

router.post('/user/insertInfo',function(req, res, next){
  var url = ajaxhost+req.originalUrl;
  var data = req.body;
  console.log(data);
  request.post(url,{form:data},function(error,response,body){
    res.send(body);
  })
})

module.exports = router;
