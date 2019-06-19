const mongoose = require('mongoose');
const User = require('../models/user');
const Contents = require('../models/content');
const multiparty = require('multiparty');
const ImageUrl = require('../models/imgeurl');

module.exports.renderHome = function (req, res, cb) {
    const id = req.session.user._id;

    Contents.find({}).populate([{path:'images'}, {path: 'userId'}]).then((result) => {
        console.log('查看输出数据');
        console.log(result);
        console.log('45555555555******************');
        console.log(JSON.stringify(result));
        cb(result);
    })

}

module.exports.renderOwnContent = function (req, res, cb) {
    Contents.find({userId: req.session.user._id}, (err,result) => {
        console.log('查看顶顶顶顶顶顶顶顶顶顶达到多');
        console.log(result);
        cb(result);
    });

}

module.exports.renderOwn = function (req, res, cb) {
    User.findById(req.session.user._id, (err, result) => {
        console.log('查看顶顶顶顶顶顶顶顶顶顶达到多');
        console.log(result);
        cb(result);
    });

}

module.exports.renderBindEmail = function(req, res, cb){
    cb();
}

module.exports.renderBindPhone = function(req, res, cb){
    cb();
}

module.exports.renderUser = function(req, res, param, cb){
    Contents.find({userId: param.id}, (err,result) => {
        console.log(param.id);
        console.log('查看顶顶顶顶顶顶顶顶顶顶达到多');
        console.log(result);
        cb(result);
    });
}