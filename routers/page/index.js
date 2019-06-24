const express = require('express');
const router = express.Router();
const renders = require('../../controllers/render');

router.get('/', (req, res) => {
    console.log('已经访问到了111111222222233333333');
    res.render('index');
})

router.get('/home', (req, res) => {
    renders.renderHome(req, res, (result) => {
        res.render('home',{
            result:result.result,
            info: result.info
    });
    })
})


router.get('/mu', (req, res) => {
    renders.renderOwnContent(req, res, (result) => {
        res.render('mu',{
            result:result.result,
            info: result.info
        });
    })
})

router.get('/mu/manage', (req, res) => {
    renders.renderOwn(req, res, (result) => {
        res.render('manage',{
            // result:result || {},
            result:result.result || {},
            info: result.info
        });
    })
})

router.get('/mu/manage/bindEmail', (req, res) => {
    renders.renderBindEmail(req, res, (result) => {
        res.render('bindEmail',{
            // result
        });
    })
})

router.get('/mu/manage/bindPhone', (req, res) => {
    renders.renderBindPhone(req, res, (result) => {
        res.render('bindPhone',{
            // result
        });
    })
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/u/:number', (req, res) => {
    console.log('查看参数3423434444444444');
    console.log(req.param);
    console.log(req.params);
    const param = {
        id: req.params.number
    }
    renders.renderUser(req, res, param, (result) => {
        res.render('u',{
            result: result.result,
            id: result.id,
            isAttention: result.isAttention
        });
    })
})

router.get('/sendmessage', (req, res) => {
    renders.renderSendMessages(req, res, (result) => {
        console.log('查看数据水电费是的发送到发送到发送到发生的反倒是');
        console.log(result);
        res.render('sendmessage',{
            info: result
        });
    })
})

module.exports = router;