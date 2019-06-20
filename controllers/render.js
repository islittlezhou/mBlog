const mongoose = require('mongoose');
const User = require('../models/user');
const Contents = require('../models/content');
const multiparty = require('multiparty');
const ImageUrl = require('../models/imgeurl');
const attention = require('../models/attention');

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
    // Contents.find({userId: param.id}, (err,result) => {
    //     console.log(param.id);
    //     console.log('查看顶顶顶顶顶顶顶顶顶顶达到多');
    //     console.log(result);
    //     const obj = {
    //         result: result,
    //         id: param.id
    //     }
    //     cb(obj);
    // });

    var a1 = new Promise((resolve, reject) => {
        Contents.find({userId: param.id}, (err,result) => {
            console.log(param.id);
            console.log('查看顶顶顶顶顶顶顶顶顶顶达到多');
            console.log(result);
            const obj = {
                result: result,
                id: param.id
            }
            resolve(obj);
        });
    });

    var a2 = new Promise((resolve, reject) => {
        attention.find({attentionUserId:param.attentionId,userId:req.session.user._id}, (err, result) => {
            //说明不存在，则为未关注
            if( result.length == 0 ){
                resolve({
                    isAttention: 0
                });
            }else{
                resolve({
                    isAttention: result[0].isAttention
                });
            }
        });
    });

    Promise.all([a1, a2]).then((result) => {
        console.log('result333333333333333333333');
        console.log(result);
        cb(Object.assign({},result[0], result[1]));
    });

}