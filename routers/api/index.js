const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../../controllers/user');
const multiparty = require('multiparty');
const {getUserWriteInfo} = require('../../controllers/common.js');

router.post('/doLogin', (req ,res) => {

    const {account, password} = req.body;

    userController.doLogin({account, password}, function(result){
        if( result.success ){
            console.log('查看登录fffff结果');
            console.log(result);
            req.session.user = result.user;
            res.redirect('/home');
        }else{
            res.send(result);
        }
    });

});

router.get('/doLoginOut', (req ,res) => {
    req.session.user = null;
    req.session.destroy();
    res.redirect('/');
});

router.post('/doRegister', (req ,res) => {

    const {account, password} = req.body;

    userController.doRegister({account, password}, (result) => {
        if( result.success ){
            req.session.user = result;
            res.redirect('/home');
        }else{
            res.send(result);
        }
    });
});

router.post('/doUpdate', (req ,res) => {
    res.send('更新用户信息');
});

router.post('/doCancel', (req ,res) => {
    res.send('注销用户');
});


router.post('/doPublish', (req ,res) => {

    var form = new multiparty.Form();
    form.uploadDir = 'upload';

    form.parse(req, (err, fields, files) => {
        const param = {
            fields: {
                title: fields.title[0],
                content: fields.content[0],
            },
            fileList: files.file.map(res => { return {imageUrl: '/upload/' + path.parse(res.path).base} }),
            user: req.session.user
        }
        userController.doPublish(param, function(result){

            if( result.success ){
                res.redirect('/home');
            }else{
                res.send(result);
            }

        });
    });
});

router.post('/doUpdateUser', (req, res) => {
    console.log('输出需要修改的参数');
    console.log(req.body);
    userController.doUpdate(req, res, req.body, (result) => {
        if( result.success ){
            res.redirect('/mu');
        }else{
            res.redirect('/mu');
        }
    });
});

router.post('/doAttention', function(req ,res){
    console.log('查看body参数');
    console.log(req.body);
    const param = req.body;
    userController.doAttent(req, res, param, (result) => {
        res.send(result);
    });
});

router.get('/testing', function(req, res){
    getUserWriteInfo(req.session);
});

module.exports = router;