const mongoose = require('mongoose');
const User = require('../models/user');
const Contents = require('../models/content');
const multiparty = require('multiparty');
const ImageUrl = require('../models/imgeurl');
const attention = require('../models/attention');
const {getUserWriteInfo} = require('./common.js');

module.exports.renderHome = function (req, res, cb) {
    const id = req.session.user._id;

    const a1 = new Promise((resolve, reject) => {
        Contents.find({}).populate([{path:'images'}, {path: 'userId'}]).then((result) => {
            console.log(JSON.stringify(result));
            resolve(result);
        })
    })

    const a2 = new Promise((resolve, reject) => {
        getUserWriteInfo(req.session, (result) => {
            resolve(result);
        })
    });


    Promise.all([a1, a2]).then((value) => {
        console.log('查看最终value值11111111111111111111111111');
        console.log(value);
        cb({
            result: value[0],
            info: value[1]
        })
    });

}

module.exports.renderSendMessages = function(req, res, cb){
    getUserWriteInfo(req.session, (result) => {
        result.then((value) => {
            cb(value);
        })
    })
}

module.exports.renderOwnContent = function (req, res, cb) {

    const a1 = new Promise((resolve, reject) => {
        Contents.find({userId: req.session.user._id}, (err,result) => {
            console.log('查看顶顶顶顶顶顶顶顶顶顶达到多');
            console.log(result);
            resolve(result);
        });
    });

    const a2 = new Promise((resolve, reject) => {
        getUserWriteInfo(req.session, (result) => {
            resolve(result);
        })
    });

    Promise.all([a1, a2]).then((value) => {
        console.log('查看最终value值11111111111111111111111111');
        console.log(value);
        cb({
            result: value[0],
            info: value[1]
        })
    });

}

module.exports.renderOwn = function (req, res, cb) {
    // User.findById(req.session.user._id, (err, result) => {
    //     console.log('查看顶顶顶顶顶顶顶顶顶顶达到多');
    //     console.log(result);
    //     cb(result);
    // });

    const a1 = new Promise((resolve, reject) => {
        User.findById(req.session.user._id, (err, result) => {
            console.log('查看顶顶顶顶顶顶顶顶顶顶达到多');
            console.log(result);
            resolve(result);
        });
    });

    const a2 = new Promise((resolve, reject) => {
        getUserWriteInfo(req.session, (result) => {
            resolve(result);
        })
    });

    Promise.all([a1, a2]).then((value) => {
        console.log('查看最终value值11111111111111111111111111');
        console.log(value);
        cb({
            result: value[0],
            info: value[1]
        })
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