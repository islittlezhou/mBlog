const express = require('express');
const mongoose = require('mongoose');
var session = require('express-session');
const bodyParser = require('body-parser');
const url = require('url');
const routerPage = require('./routers/page/index');
const routerApi = require('./routers/api/index');
const noLogin = require('./controllers/noLoginIndex');

const app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.use(express.static('public'));
https://github.com/islittlezhou/mBlog.git
app.use('/upload', express.static('upload'));

//检查是否登录
app.use((req, res, next) => {

    console.log('453453');
    console.log(req.url);

    //如果是登录 注册 则直接放行
    if( req.url === '/api/doLogin' || req.url === '/api/doRegister' || req.url === '/register' ){
        next();
    }else{
        if( req.session.user ){
            if( req.url === '/' ){
                res.redirect('/home');
            }else{
                next();
            }
        }else{
            //渲染未登录首页
            // res.redirect('/');

            if( req.url === '/' ){
                noLogin.noLogin(req, res);
            }else{
                res.redirect('/');
            }
        }
    }

});

app.use('/', routerPage);
app.use('/api', routerApi);


// app.use((req, res) => {
//     res.send('fdsfsdfds');
// });




mongoose.connect('mongodb://localhost:27996/MyBlog', {useNewUrlParser: true}, (err, result) => {

    if( err ){
        console.log('数据库连接失败...');
        return;
    }
    console.log('mongoDB数据库连接成功');
    app.listen(3333, '0.0.0.0');
    console.log('服务器启动成功 localhost:3333');
});
