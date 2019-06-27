
var follow1 = document.getElementById('follow1');
var follow2 = document.getElementById('follow2');

//关注
const followUser = function(param, callback){
    console.log('点击');
    $.ajax({
        method: 'post',
        url:'/api/doAttention',
        data: param,
        success:function (result, status, xhr) {
            callback(result);
        },
        error: function(a, b, c){
            callback(a);
        }
    });
}

const followU = function(id){
    const param = {
        isAttention: 1,
        attentionId: id
    }
    console.log('输出param');
    console.log(param);
    followUser(param, function(result){
        console.log('输出结果345435345345');
        console.log(result);
        $('#follow1').addClass('dis-none');
        $('#follow2').removeClass('dis-none');
    })
}

const followUout = function(id){
    const param = {
        isAttention: 0,
        attentionId: id
    }
    console.log('输出param');
    console.log(param);
    followUser(param, function(result){
        console.log('输出结果345435345345');
        console.log(result);
        $('#follow1').removeClass('dis-none');
        $('#follow2').addClass('dis-none');
    })
}

// follow1.addEventListener('click', function () {
//     const param = {
//         isAttention: true
//     }
//     followUser(param, function(result){
//         console.log('输出结果345435345345');
//         console.log(result);
//     })
// })

follow2.addEventListener('click', function () {
    const param = {
        isAttention: false
    }
    followUser(param, function(result){
        console.log('输出结果345435345345');
        console.log(result);
    })
})
