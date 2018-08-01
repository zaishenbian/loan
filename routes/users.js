var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var recommendSchemas = require('../schemas/recommend');
var recommendModel = mongoose.model('recommend', recommendSchemas);
var loanSchemas = require('../schemas/loan');
var loanModel = mongoose.model('loan', loanSchemas);
var feedbackSchemas = require('../schemas/feedback');
var feedbackModel = mongoose.model('feedback', feedbackSchemas);
var upload = require('../upload/imgupload');
var config = require('../public/config.json');
var responseData = {};

router.use(function(req, res, next){
  responseData = {
    code: 0,
    message: ''
  }
  next();
})

//推荐接口
router.post('/user/insertRec', function(req, res, next){
  //初始化推荐审核状态
  req.recStatus = 0;
  req.reason = '';
  var recommend = new recommendModel(req.body);
  recommend.save(function(err, doc){
    if(err){
      responseData.code = 1;
      responseData.message = '数据提交失败，请重试！';
      res.send(responseData);
      return;
    }
    responseData.message = '您已推荐成功！';
    res.send(responseData);
  });
});

//图片上传接口
router.post('/user/upload', upload.single('image'), function(req, res, next){
  if(req.file){
    var path = '/' + config.upload.path + req.file.filename;
    responseData.message = path;
    res.send(responseData);
  }else{
    responseData.code = 1;
    responseData.message = '图片上传失败！';
    res.send(responseData);
  }
});

//贷款接口
router.post('/user/insertInfo', function(req, res, next){
  //初始化贷款审核状态
  req.body.status = 0;
  req.body.reason = '';
  var loan = new loanModel(req.body);
  loan.save(function(err, doc){
    if(err){
      responseData.code = 1;
      responseData.message = '数据提交失败，请重试！';
      res.send(responseData);
      return;
    }
    responseData.message = '数据提交成功！';
    res.send(responseData);
  });
});

//反馈接口
router.post('/user/insertFed', function(req, res, next){
  console.log(req.body);
  var loan = new feedbackModel(req.body);
  loan.save(function(err, doc){
    if(err){
      responseData.code = 1;
      responseData.message = '数据提交失败，请重试！';
      res.send(responseData);
      return;
    }
    responseData.message = '数据提交成功！';
    res.send(responseData);
  });
});

//我的贷款接口
router.post('/user/findApply', function(req, res, next){
  var openId = req.body.openId;
  loanModel.find({openId: openId}, function(err, doc){
    if(err){
      responseData.code = 1;
      responseData.message = '信息查询失败，请重试！';
      res.send(responseData);
    }else{
      console.log(doc);
      responseData.message = doc;
      res.send(responseData);
    }
  });
});

//我的推荐接口

module.exports = router;
