const path = require('path');
const User = require('../models/user');
const Contents = require('../models/content');
const multiparty = require('multiparty');
const ImageUrl = require('../models/imgeurl');
const attention = require('../models/attention');

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

module.exports.doAttent = function(req, res, param, cb){
    const obj = {
        userId: req.session.user._id,
        attentionUserId: param.attentionId,
        isAttention: param.isAttention
    }

    //首先查找是否有数据
    attention.find({attentionUserId:param.attentionId,userId:req.session.user._id}, (err, result) => {
        if( err ){

            return
        }
        console.log('查看查到的数据');
        console.log(result);

        if( result.length == 0 ){
            //添加数据
            attention.create(obj, (err, result) => {
                console.log('查看添加结果辅导费水电费');
                console.log(err);
                console.log(result);
                setErrOrSuccess(err, cb);
            });
        }else{
            //如果有酒更新数据
            attention.updateMany(
                {attentionUserId:param.attentionId,userId:req.session.user._id},
                {
                    $set:{
                        isAttention: param.isAttention
                    }
                },
                (err, result) => {
                    console.log('查看修改后逇数据发送到发送到');
                    console.log(err);
                    console.log(result);
                    setErrOrSuccess(err, cb);
                });
        }

    })

}

const setErrOrSuccess = function (err, cb) {
    if(err){
        cb({
            success: false,
            description: '关注失败'
        });
        return
    }
    cb({
        success: true,
        description: '关注成功'
    });
}

module.exports.uploadImg = function(req, res, cb){
    var form = new multiparty.Form();
    form.uploadDir = 'upload';

    form.parse(req, (err, fields, files) => {
        console.log('查看上传图片后的数据');
        console.log(fields);
        console.log(files);

        const avatorImg = files.file.map(res => { return '/upload/' + path.parse(res.path).base });
        console.log('查看参数');

        User.updateMany({'_id': req.session.user._id}, {$set:{avatorImg: avatorImg}}, (err, result)=> {
            console.log('查看上传后的返回值');
            console.log(err);
            console.log(result);
            if( err || result.nModified == 0 ){
                cb({
                    success: false,
                    description: '上传图片失败'
                })
                return
            }

            User.findById(req.session.user._id, (err, result) => {
                if( err ){
                    cb({
                        success: false,
                        description: '查询失败，请尝试刷新页面'
                    })
                    return
                }

                console.log('输出头像');
                console.log(result);
                req.session.user = result;
                cb({
                    success: true,
                    avatorImg: result.avatorImg[0],
                    description: '成功'
                })
            })

        })

    });
}