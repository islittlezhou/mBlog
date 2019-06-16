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

module.exports.renderOwn = function (req, res, cb) {
    const id = req.session.user._id;

    Contents.find({userId: id}).populate([{path:'images'}, {path: 'userId'}]).then((result) => {
        console.log('查看输出数据');
        console.log(result);
        console.log('45555555555******************');
        console.log(JSON.stringify(result));
        cb(result);
    })

}
