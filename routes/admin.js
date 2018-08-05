var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var recommendSchemas = require('../schemas/recommend');
var recommendModel = mongoose.model('recommend', recommendSchemas);
var loanSchemas = require('../schemas/loan');
var loanModel = mongoose.model('loan', loanSchemas);
var feedbackSchemas = require('../schemas/feedback');
var feedbackModel = mongoose.model('feedback', feedbackSchemas);
var user_model = require('../schemas/adminuser');

function unique(arr){
　var res = [arr[0]];  
　for(var i=1;i<arr.length;i++){  
　　var repeat = false;  
　　for(var j=0;j<res.length;j++){  
　　　if(arr[i].userName == res[j].userName&&arr[i].userPhone == res[j].userPhone){  
　　　　repeat = true;  
　　　　break;  
　　　}  
　　}  
　　if(!repeat){  
　　　res.push(arr[i]);  
　　}  
　}  
　return res;  
}

//登录接口
router.post('/login', function(req, res, next) {
  var username = req.body.username || '';
  var password = req.body.password || '';

  user_model.login(username,password,function (err,data) {
      if(err){
          console.error(err);
          return res.send({code:400,msg:err.toLocaleString()});
      }
      req.session.user = data;
      return res.send({code:200,msg:'登录成功'});
  });

});

//登出接口
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/');
});

//密码重置
router.post('/pswset', function(req, res, next) {
  console.log(req.session.user)
  if(!req.session.user){
    return res.send({code:400,msg:'未登录'});
  }
  var password = req.body.password || '';
  var password_new = req.body.password_new || '';
  if(!req.session.user){
      return res.redirect('/');
  }
  user_model.reset_psw(req.session.user.username,password,password_new,function (err,data) {
      if(err){
          console.error(err);
          return res.send({code:400,msg:err.toLocaleString()});
      }
      req.session.user = data;
      return res.send({code:200,msg:'修改成功'});
  });
});

//贷款列表接口
router.post('/loanTable', function(req, res, next){
  if(!req.session.user){
    return res.send({code:400,msg:'未登录'});
  }
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

//贷款详情接口
router.get('/getLoanDetail', function(req, res, next){
  if(!req.session.user){
    return res.send({code:400,msg:'未登录'});
  }
  var _id = req.query._id;
  loanModel.findOne({_id: _id}, function(err, doc){
    if(err){
      res.send(err);
    }else{
      console.log(doc);
      res.render('admin/loanDetail', {detail: doc, layout: 'admin/loanLayout'});
    }
  })
})

//贷款审核接口
router.post('/checkLoan', function(req, res, next){
  if(!req.session.user){
    return res.send({code:400,msg:'未登录'});
  }
  var responseData = {
    code: 0,
    message: ''
  }
  var _id = req.body._id;
  var status = parseInt(req.body.status);
  var reason = req.body.reason;
  loanModel.updateOne({_id: _id}, {status: status, reason: reason}, function(err, doc){
    if(err){
      responseData.code = 1;
      responseData.message = '数据更新失败，请重试';
      res.send(responseData);
    }else{
      res.send(responseData);
    }
  })
})

//贷款人对应推荐人接口
router.post('/recommends', function(req, res, next){
  if(!req.session.user){
    return res.send({code:400,msg:'未登录'});
  }
  var responseData = {
    code: 0,
    msg: '',
    count: 0,
    data: []
  }
  var _id = req.body._id;
  var phone = req.body.userPhone;
  var name = req.body.userName;
  loanModel.find({_id: _id}, 'refereeName refereePhone', function(err, doc){
    if(err){
      responseData.code = 1;
      res.send(responseData);
    }else{
      doc[0].userName = doc[0].refereeName;
      doc[0].userPhone = doc[0].refereePhone;
      if(doc[0].userName!=''&&doc[0].userPhone!=''){
        console.log(doc);
        responseData.data.push(...doc);
      }
      recommendModel.find({recName: name,recPhone: phone}, 'userName userPhone', function(err, doc2){
        responseData.data.push(...doc2);
        responseData.data = unique(responseData.data);
        res.send(responseData);
      })
    }
  })
})

//贷款删除接口
router.post('/deleteLoan', function(req, res, next){
  if(!req.session.user){
    return res.send({code:400,msg:'未登录'});
  }
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
  if(!req.session.user){
    return res.send({code:400,msg:'未登录'});
  }
  var responseData = {
    code: 0,
    msg: '',
    count: 0,
    data: []
  }
  var page = parseInt(req.body.page);
  var limit = parseInt(req.body.limit);
  recommendModel.find({}).sort({recStatus: 1}).skip((page-1)*limit).limit(limit).exec(function(err, doc){
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
  if(!req.session.user){
    return res.send({code:400,msg:'未登录'});
  }
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
  if(!req.session.user){
    return res.send({code:400,msg:'未登录'});
  }
  var responseData = {
    code: 0,
    message: ''
  }
  var _id = req.body._id;
  var recStatus = parseInt(req.body.recStatus);
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
  if(!req.session.user){
    return res.send({code:400,msg:'未登录'});
  }
  var responseData = {
    code: 0,
    msg: '',
    count: 0,
    data: []
  }
  var page = parseInt(req.body.page);
  var limit = parseInt(req.body.limit);
  feedbackModel.find({}).skip((page-1)*limit).limit(limit).exec(function(err, doc){
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
  if(!req.session.user){
    return res.send({code:400,msg:'未登录'});
  }
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