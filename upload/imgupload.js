var multer = require('multer');
var md5 = require('md5');
var config = require('../public/config.json');

var storage = multer.diskStorage({
    /**
     * 设置文件上传路径
     * 如果传递的是一个函数，你负责创建文件夹；如果传递的是字符串，multer负责创建
     */
    destination: 'public/' + config.upload.path,
    /**
     * 获取文件md5,重命名，添加后缀，文件重名直接覆盖
     */
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split('.');
        cb(null, file.fieldname+'-'+md5(file)+'.'+fileFormat[fileFormat.length-1]);
    }
});

//添加配置文件到multer对象
var upload = multer({
    storage: storage
});

module.exports = upload;