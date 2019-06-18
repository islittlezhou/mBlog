
const User = require('../models/user');
const Contents = require('../models/content');
const multiparty = require('multiparty');
const ImageUrl = require('../models/imgeurl');

module.exports.doLogin = function(param, cb){
    // console.log(param);

    User.findOne(param, (err, result) => {
        console.log(result);
        if(err){
            cb({
                success: false,
                description: '服务器错误，请稍候再试...'
            });
            return;
        }

        if( !result ){
            cb({
                success: false,
                description: '账号或密码错误，请检查后再输入'
            });
        }else{

            cb({
                success:  true,
                description: '登录成功',
                user: result
            });
        }

    });

}

module.exports.doRegister = function(param, cb){

    User.create(param, (err, result) => {
        console.log('注册');
        console.log(err);
        console.log(result);

        if( err ){
            cb({
                success: false,
                description: '注册失败'
            });
            return;
        }

        cb({
            success: true,
            description: '成功',
            user: result
        });

    })

}

module.exports.doPublish = function(param, cb){
    console.log("777777777777777777888888888888888888888");
    console.log(param);
    console.log(param.user);

    var arr = [];

    param.fileList.forEach(res => {
        var obj = {
            imageUrl: res.imageUrl
        }
        arr.push(obj);
    });

    //首先添加图片
    ImageUrl.create(arr, (err, result) => {
        console.log('查看创建的图片数据');
        console.log(err);
        console.log(result);

        if( err ){
            cb({
                success: false,
                description: '添加失败'
            });
            return;
        }

        var idList = result.map(res => {
            return res._id
        });

        console.log('查看方式方法付付付付付付付付付付付');
        console.log(param);

        var obj = {
            title: param.fields.title,
            content: param.fields.content,
            userId: param.user._id,
            images: idList
        }

        console.log('查看添加参数');
        console.log(obj);

        Contents.create(obj, (err, result) => {
            if( err ){
                cb({
                    success: false,
                    description: '添加失败'
                });
                return;
            }
            console.log('查看微博添加结果');
            console.log(err);
            console.log(result);
            cb({
                success: true,
                description: '添加成功'
            });
        });

    });

}

module.exports.doUpdate = function(req, res, param, cb){
    User.updateOne({_id: req.session.user._id},{$set: req.body}, (err, result) => {
        console.log('输出修改数据地方双方都');
        console.log(err);
        if(err || result.nModified < 1){
            cb({
                success: false,
                description: '更新失败'
            });
            return
        }
        cb({
            success: true
        });
        console.log(result);
    });
}

