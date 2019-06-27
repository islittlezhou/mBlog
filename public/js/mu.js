
$('#avatorImg')[0].addEventListener('click', function (e) {
    console.log(343);
    $('#avatorModal').modal('show');
})


//上传文件
const handleFile = function(){
    var formData = new FormData();
    let fileInput = $('#file')[0];
    let img = fileInput.files[0];

    formData.append('file', img);

    $.ajax({
        url:'/api/upload/img',
        method: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function(result, b, c){
            $('#avatorModal').modal('hide');
            if( result.success ){
                $('#avatorImg').attr('src', result.avatorImg);
            }else{

            }
        },
        error: function(a, b, c){

        }
    })

}