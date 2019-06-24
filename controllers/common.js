const mongoose = require('mongoose');
const attention = require('../models/attention');
const Contents = require('../models/content');

module.exports.getUserWriteInfo = function(session, cb){
    const _id = session.user._id;

    //获取用户关注 粉丝 微博
    const  a1 = new Promise((resolve, reject) => {
        attention.countDocuments({userId: _id, isAttention: 1}, (err, result) => {
            if(err){
                reject(err);
                return;
            }
            resolve(result);
        });
    })

    const a2 = new Promise((resolve, reject) => {
        attention.countDocuments({attentionUserId: _id, isAttention: 1}, (err, result) => {
            if(err){
                reject(err);
                return;
            }
            resolve(result);
        });
    });

    const a3 = new Promise((resolve, reject) => {
        Contents.countDocuments({userId: _id}, (err, result) => {
            if(err){
                reject(err);
                return;
            }
            resolve(result);
        });
    });

    Promise.all([a1, a2, a3]).then((value) => {
        console.log('输出数据大幅度辅导费水电费');
        console.log(value);
        cb(new Promise((resolve, reject) => {
            resolve(value);
        }))
    });

}