$(function () {

    //获得用户属性
    $.get("http://localhost:9100/attrs",{},function (result) {
        showPolicyAttr(result.data)
    });
    function showPolicyAttr(data) {
        var str = '';//定义用于拼接的字符串
        for (var i = 0; i < data.length; i++) {
            // str = '<option value='+data[i].attr+'>'+data[i].attr+'</option>\n';
            str = '<input type="button" class="buttons" value='+data[i].attr+'>';
            //追加到table中
            // $("select[name='policyAttr']").append(str);
            $("#addSelectAttr").append(str)
        }
    }

    //添加关键字输入框
    $('#addKeyInput').click(function () {
        var str = '<div class="form-row">\n' +
            ' <div class="form-group col-md-6">\n' +
            '<label>文件关键词</label>\n' +
            ' <input type="text" class="form-control" name="keywords" placeholder="请输入文件关键词">\n' +
            ' </div>\n' +
            ' <button type="button" id="removeSelect" class="btn btn-outline-success" style="margin: 28px 0;">删除</button>\n' +
            ' </div>'
        $('#addKeyPosition').append(str);
    });


    //删除关键词输入框
    $(document).on("click", "#removeSelect", function (e) {
        var obj = this.parentNode;
        obj.parentNode.removeChild(obj);
    })

    //上传文件
    $("#upload_btn").click(function () {
        var formData = new FormData(document.getElementById('upload_file_form'));
        console.log(formData)
        $.ajax({
            url : "http://localhost:9100/user/uploadFile",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            dataType : 'json',
            processData: false,
            contentType: false,
            data :formData,
            xhrFields: {
                withCredentials: true
            },
            success : function(result) {
                alert("上传成功");
                window.location.reload();
            },
            error : function() {
                alert("上传失败!")
            }
        });
    });

    //下载文件
    $("#get_File_btn").click(function () {
        $.ajax({
            url : "http://localhost:9100/user/getFile",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            dataType : 'json',
            processData: false,
            contentType: false,
            data :new FormData(document.getElementById('get_File_Form')),
            success : function(result) {
                console.log(result.data);
                if(result.data){
                    for(var i = 0; i < result.data.length;i++){
                        // window.open(result.data[i]);
                        console.log(i);
                        downloadFile(result.data[i]);
                    }
                }


            },
            error : function() {
                alert("失败!")
            }
        });
    });

    function downloadFile(url) {
        var iframe = document.createElement('iframe')
        iframe.style.display = 'none' // 防止影响页面
        iframe.style.height = 0 // 防止影响页面
        iframe.src = url
        document.body.appendChild(iframe) // 这一行必须，iframe挂在到dom树上才会发请求
        console.log(iframe)
        setTimeout(() => {
            iframe.remove()
        }, 5000)

    }

    //1 获取用户数据
    // $.post({
    //     url : "http://localhost:9100/user/info",
    //     data : "",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     xhrFields: {
    //         withCredentials: true
    //     },
    //     success : function(result) {
    //         showProfile(result.data);
    //     },
    //     error : function() {
    //         alert("获取用户信息失败!")
    //     }
    // });

    let loginUser = JSON.parse(localStorage.getItem('loginUser'));
    if(loginUser){
        showProfile(loginUser);
        showEditProfile(loginUser);
    }

    function showProfile(data) {
        let sex = data.sex? '男':'女';
        var str = '<tr>\n' +
            '<td width="10%"><strong>用户名</strong></td>\n' +
            '<td width="90%">' + data.username + '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td><strong>性别</strong></td>\n' +
            '<td>' + sex + '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td><strong>电子邮箱</strong></td>\n' +
            '<td>' + data.email + '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td><strong>联系电话</strong></td>\n' +
            '<td>' + data.phone + '</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td><strong>属性</strong></td>\n' +
            '<td>' + data.attr + '</td>\n' +
            '</tr>';
        //追加到table中
        $("#personal_info").append(str);
        var name = '<strong>'+data.username+'</strong>';
        $(".showName").append(name);
    }

    function showEditProfile(data){
        // console.log(data.sex);
        // let sex = data.sex? "1":"0";
        $("#editUsername").val(data.username)
        // $("#editSex").val(data.sex);
        $("#editSex option[value="+data.sex+"]").prop("selected",true);
        $("#editEmail").val(data.email);
        $("#editPhone").val(data.phone);
    }


    $("#getPKButton").click(function () {
        $.ajax({
            url : "http://localhost:9100/user/getPK",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            contentType : 'application/json',
            dataType : 'json',
            data :'',
            success : function(result) {
                console.log(result.data);
                window.open(result.data);
            },
            error : function() {
                alert("失败!")
            }
        });
    });

    $("#getSKButton").click(function () {
        $.ajax({
            url : "http://localhost:9100/user/getSK",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            contentType : 'application/json',
            dataType : 'json',
            data :'',
            success : function(result) {
                console.log(result.data);
                window.open(result.data);
            },
            error : function() {
                alert("失败!")
            }
        });
    });

    //修改用户信息
    $("#editProfileBtn").click(function () {
        // console.log(attr)
        console.log(JSON.stringify($("#EditProfileForm").serializeJSON()));
        $.post({
            url : "http://localhost:9100/user/editProfile",
            data : JSON.stringify($("#EditProfileForm").serializeJSON()),
            headers: {
                'Content-Type': 'application/json'
            },
            xhrFields: {
                withCredentials: true
            },
            success : function(result) {
                alert("修改用户信息成功!");
                localStorage.setItem("loginUser",result.data);
                window.location.reload();
            },
            error : function() {
                alert("修改用户信息失败!")
            }
        })
    });

})