var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var recommendSchemas = require('../schemas/recommend');
var recommendModel = mongoose.model('recommend', recommendSchemas);
var loanSchemas = require('../schemas/loan');
var loanModel = mongoose.model('loan', loanSchemas);
var feedbackSchemas = require('../schemas/feedback');
var feedbackModel = mongoose.model('feedback', feedbackSchemas);

//贷款列表接口
router.post('/loanTable', function(req, res, next){
  var responseData = {
    code: 0,
    msg: '',
    count: 0,
    data: []
  }
  var page = parseInt(req.body.page);
  var limit = parseInt(req.body.limit);
  loanModel.find({}).sort({status: 1}).skip((page-1)*limit).limit(limit).exec(function(err, doc){
    if(err){
      res.send(err);
    }else{
      loanModel.find({}, function(err, result){
        responseData.data = doc;
        responseData.count= result.length;
        res.send(responseData);
      });
    }
  });
})

//贷款删除接口
router.post('/deleteLoan', function(req, res, next){
  var responseData = {
    code: 0,
    msg: '',
    count: 0,
    data: []
  }
  var page = parseInt(req.body.page);
  var limit = parseInt(req.body.limit);
  var _id = req.body._id;
  loanModel.deleteOne({_id: _id}, function(err){
    if(err){
      res.send(err);
    }else{
      loanModel.find({}).sort({status: 1}).skip((page-1)*limit).limit(limit).exec(function(err, doc){
        if(err){
          res.send(err);
        }else{
          loanModel.find({}, function(err, result){
            responseData.data = doc;
            responseData.count= result.length;
            res.send(responseData);
          });
        }
      });
    }
  })
})

//推荐列表接口
router.post('/recommendTable', function(req, res, next){
  var responseData = {
    code: 0,
    msg: '',
    count: 0,
    data: []
  }
  var page = parseInt(req.body.page);
  var limit = parseInt(req.body.limit);
  recommendModel.find({}).sort({status: 1}).skip((page-1)*limit).limit(limit).exec(function(err, doc){
    if(err){
      res.send(err);
    }else{
      recommendModel.find({}, function(err, result){
        responseData.data = doc;
        responseData.count= result.length;
        res.send(responseData);
      });
    }
  });
})

//推荐删除接口
router.post('/deleteRecommend', function(req, res, next){
  var responseData = {
    code: 0,
    msg: '',
    count: 0,
    data: []
  }
  var page = parseInt(req.body.page);
  var limit = parseInt(req.body.limit);
  var _id = req.body._id;
  recommendModel.deleteOne({_id: _id}, function(err){
    if(err){
      res.send(err);
    }else{
      recommendModel.find({}).sort({status: 1}).skip((page-1)*limit).limit(limit).exec(function(err, doc){
        if(err){
          res.send(err);
        }else{
          recommendModel.find({}, function(err, result){
            responseData.data = doc;
            responseData.count= result.length;
            res.send(responseData);
          });
        }
      });
    }
  })
})

//推荐审核接口
router.post('/checkRecommend', function(req, res, next){
  var responseData = {
    code: 0,
    message: ''
  }
  var _id = req.body._id;
  var recStatus = req.body.recStatus;
  var reason = req.body.reason;
  recommendModel.updateOne({_id: _id}, {recStatus: recStatus, reason: reason}, function(err, doc){
    if(err){
      responseData.code = 1;
      responseData.message = '数据更新失败，请重试';
      res.send(responseData);
    }else{
      res.send(responseData);
    }
  })
})

//反馈列表接口
router.post('/feedbackTable', function(req, res, next){
  var responseData = {
    code: 0,
    msg: '',
    count: 0,
    data: []
  }
  var page = parseInt(req.body.page);
  var limit = parseInt(req.body.limit);
  feedbackModel.find({}).sort({status: 1}).skip((page-1)*limit).limit(limit).exec(function(err, doc){
    if(err){
      res.send(err);
    }else{
      feedbackModel.find({}, function(err, result){
        responseData.data = doc;
        responseData.count= result.length;
        res.send(responseData);
      });
    }
  });
})

//反馈删除接口
router.post('/deleteFeedback', function(req, res, next){
  var responseData = {
    code: 0,
    msg: '',
    count: 0,
    data: []
  }
  var page = parseInt(req.body.page);
  var limit = parseInt(req.body.limit);
  var _id = req.body._id;
  feedbackModel.deleteOne({_id: _id}, function(err){
    if(err){
      res.send(err);
    }else{
      feedbackModel.find({}).sort({status: 1}).skip((page-1)*limit).limit(limit).exec(function(err, doc){
        if(err){
          res.send(err);
        }else{
          feedbackModel.find({}, function(err, result){
            responseData.data = doc;
            responseData.count= result.length;
            res.send(responseData);
          });
        }
      });
    }
  })
})

module.exports = router;