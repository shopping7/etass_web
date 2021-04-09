$(function () {
    $('#btn_sub').click(function () {
        $.ajax({
            url : "http://localhost:9100/user/login",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            contentType : 'application/json',
            dataType : 'json',
            data :JSON.stringify({"username" : "zhangsan","password" : "123456"}),
            success : function(result) {
                localStorage.setItem('loginUser',JSON.stringify(result.data));
                location.href = "upload-file.html";
            },
            error : function() {
                alert("登录失败!")
            }
        });
    });




        //
        // //2.发送ajax请求，提交表单数据
        // jQuery.post("http://localhost:9000/user/login",jQuery("#sign_in").serialize(),function (data) {
        //     //data : {flag:false,errorMsg:''}
        //     if(data.flag){
        //         //登录成功
        //         location.href="upload_file.html";
        //     }else{
        //         //登录失败
        //         jQuery("#errorMsg").html(data.errorMsg);
        //     }
        // });

});