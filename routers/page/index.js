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
            result
        });
    })
})

router.get('/mu', (req, res) => {
    renders.renderOwnContent(req, res, (result) => {
        res.render('mu',{
            result
        });
    })
})

router.get('/mu/manage', (req, res) => {
    renders.renderOwn(req, res, (result) => {
        res.render('manage',{
            result
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
    res.render('u');
})

router.get('/sendmessage', (req, res) => {
    res.render('sendmessage');
})

module.exports = router;