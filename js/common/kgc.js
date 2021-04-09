$(function () {

    //获取所有属性
    $.get("http://localhost:9100/attrs",{},function (result) {
        showData(result.data);
        showSelectData(result.data);
        showUserAttr(result.data);
    });
    //展示数据
    function showData(data) {
        var str = "";//定义用于拼接的字符串
        for (var i = 0; i < data.length; i++) {
            str='<tr>\n' +
                '<td>'+(i+1)+'</td>\n' +
                '<td>'+ data[i].attr +'</td>\n' +
                '<td>'+data[i].info+'</td>\n' +
                '<td>\n' +
                '<button type="button" class="btn btn-danger mb-0" data-type='+ data[i].attr +'><span class="ti-trash"></span>删除</button>\n' +
                '<button type="button" class="btn btn-primary mb-0" data-type='+ data[i].attr +'><span class="ti-pencil-alt"></span>修改</button>\n' +
                '</td>\n' +
                '</tr>'
            // str = "<tr>" +
            //     "<td>" + (i+1) + "</td>" +
            //     "<td class='txt-oflo'>" + data[i].attr + "</td>" +
            //     "<td class='txt-oflo'>"+data[i].info+"</td>" +
            //     "<td class=\"txt-oflo\">" +
            //     "            <span class=\"js-sweetalert\">\n" +
            //     "                <button class=\"btn btn-raised btn-default btn-circle waves-effect waves-circle waves-float\" data-type="+ data[i].attr +"><i class=\"zmdi zmdi-edit\"></i></button>\n" +
            //     "            </span>" +
            //     "            <span class=\"js-deletealert\">\n" +
            //     "                <button class=\"btn btn-raised btn-default btn-circle waves-effect waves-circle waves-float\" data-type="+ data[i].attr +"><i class=\"zmdi zmdi-delete\"></i></button>\n" +
            //     "            </span>" +
            //     "</tr>";
            //追加到table中
            $("#tab").append(str);
        }
    }

    function showSelectData(data) {
        var str = "";//定义用于拼接的字符串
        for (var i = 0; i < data.length; i++) {
            str = '<tr>\n' +
                '      <td>\n' +
                '          <div>\n' +
                '               <span>'+data[i].attr+'</span>\n' +
                '          </div>\n' +
                '       </td>\n' +
                '      <td>\n' +
                '         <div class="switch">\n' +
                '             <label>\n' +
                '                <input type="checkbox" name="newSelectAttr" value='+data[i].attr+'>\n' +
                '                <span class="lever"></span>\n' +
                '             </label>\n' +
                '         </div>\n' +
                '      </td>\n' +
                ' </tr>'
            //追加到table中
            $("#select_attr").append(str);
        }
    }

    function showUserAttr(data){
        var str = "";//定义用于拼接的字符串
        for (var i = 0; i < data.length; i++) {
            str = '<tr>\n' +
                '      <td>\n' +
                '          <div>\n' +
                '               <span>' + data[i].attr + '</span>\n' +
                '          </div>\n' +
                '       </td>\n' +
                '      <td>\n' +
                '         <div class="switch">\n' +
                '             <label>\n' +
                '                <input type="checkbox" name="UserSelectAttr" value=' + data[i].attr + '>\n' +
                '                <span class="lever"></span>\n' +
                '             </label>\n' +
                '         </div>\n' +
                '      </td>\n' +
                ' </tr>'
            $("#select_user_attr").append(str);
        }
    }

    //添加属性
    $("#addAttrButton").click(function () {
        $.post({
            url : "http://localhost:9100/addAttr",
            data : JSON.stringify($("#addAttrForm").serializeJSON()),
            headers: {
                'Content-Type': 'application/json'
            },
            success : function(data) {
                alert("添加属性成功!")
                window.location.reload();
            },
            error : function() {
                alert("添加属性失败!")
            }
        })
    });

    //获取所有对象
    $.get("http://localhost:9100/users",{},function (result) {
        showUsers(result.data);
    });
    function showUsers(data) {
        var str = "";//定义用于拼接的字符串
        for(var i=0; i < data.length;i++){
            str = '<tr>\n' +
                '\<td>'+i+'</td>\n' +
                '<td>'+data[i].username+'</td>\n' +
                '<td>'+data[i].attr+'</td>\n' +
                '<td>'+data[i].state+'</td>\n' +
                '<td>\n' +
                '<button type="button" class="btn btn-danger mb-0"><span class="ti-trash"></span>删除</button>\n' +
                '<button type="button" class="btn btn-primary mb-0"><span class="ti-pencil-alt"></span>修改</button>\n' +
                '</td>\n' +
                '</tr>'
            // str = '<div class="col-lg-4 col-md-6 col-sm-12">\n' +
            //     '                <div class="card all-patients">\n' +
            //     '                    <div class="body">\n' +
            //     '                        <div class="row">\n' +
            //     '                            <div class="col-md-4 col-sm-4 text-center m-b-0">\n' +
            //     '                                <a href="#" class="p-profile-pix"><img src="assets/images/patients/random-avatar3.jpg" alt="user" class="img-thumbnail img-fluid"></a>\n' +
            //     '                            </div>\n' +
            //     '                            <div class="col-md-8 col-sm-8 m-b-0">\n' +
            //     '                                <h5 class="m-b-0">'+data[i].username+
            //     '                                    <span class="js-deletealert edit">\n' +
            //     '                                        <button class=" btn-default waves-effect" style="margin: 0px;border:none;" data-type='+data[i].username+'>\n' +
            //     '                                            <i class="zmdi zmdi-delete" style="color:#0275d8"></i>\n' +
            //     '                                        </button>\n' +
            //     '                                    </span>\n' +
            //     '                                    <a href="user_detail.html?username='+encodeURI(data[i].username)+'" class="edit"><i class="zmdi zmdi-edit"></i></a>' +
            //     '                                </h5> ' +
            //     '                                <small>邮箱:'+data[i].email+'</small>\n<br>' +
            //     '                                <span style="word-break:normal; width:auto; display:block; white-space:pre-wrap;word-wrap : break-word ;overflow: hidden ;">属性：'+data[i].attr+'</span><br>' +
            //     '                                <small>' +
            //     '                                    电话:'+data[i].phone+'\n' +
            //     '                                </small>\n' +
            //     '                            </div>\n' +
            //     '                        </div>\n' +
            //     '                    </div>\n' +
            //     '                </div>\n' +
            //     '            </div>'
            // str = ''
            $("#show_users").append(str);
        }
    };

    //添加新用户
    $("#addUserButton").click(function () {
        // var data1 = JSON.stringify($("#addUserForm").serializeJSON())
        // console.log(data1);
        var checkbox=document.getElementsByName('newSelectAttr');
        var attr = getSelectAttr(checkbox);
        var username = $("#addUserName").val();
        // console.log(attr)
        // console.log($("#addUserName").val())
        $.post({
            url : "http://localhost:9000/addUser",
            data : JSON.stringify({"username":username,"attr":attr}),
            headers: {
                'Content-Type': 'application/json'
            },
            xhrFields: {
                withCredentials: true
            },
            success : function(data) {
                alert("添加用户成功!");
                window.location.reload();
            },
            error : function() {
                alert("添加用户失败!")
            }
        })
    });


    function getSelectAttr(obj){
        var arr=new Array();
        for(var i=0;i<obj.length;i++){
            if(obj[i].checked==true){
                arr.push(obj[i].value);
            }
        }
        return arr;
    }

    // //获取所有黑名单
    // $.get("http://localhost:9000/getAllBlacks",{},function (result) {
    //     showAllBlacks(result.data);
    // });

    function showAllBlacks(data){
        var str = '';
        for(var i=0; i<data.length;i++){
            str = '<tr>\n' +
                '                                    <td>'+(i+1)+'</td>\n' +
                '                                    <td>'+data[i].username+'</td>\n' +
                '                                    <td><span class="js-deletealert edit deleteBlack">\n' +
                '                                        <button class="btn-default waves-effect " style="margin: 0px;border:none;" data-type='+data[i].username+'>\n' +
                '                                            <i class="zmdi zmdi-delete" style="color:#0275d8"></i>\n' +
                '                                        </button>\n' +
                '                                    </span></td>\n' +
                '                                </tr>'
            $("#black_table").append(str)
        }
    }

    $(document).on("click", ".deleteBlack button", function (e) {
        var username = $(this).data('type');
        console.log(username);
        deleteBlackConfirmMessage(username);
    })

    function deleteBlackConfirmMessage(username) {
        swal({
            title: "确定从黑名单移除该用户?",
            text: "确定从黑名单移除【"+username+"】用户!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "是的，移除!",
            closeOnConfirm: false,
            html: true,
        }, function () {
            $.ajax({
                url : "http://localhost:9000/deleteBlack",
                xhrFields: {
                    withCredentials: true
                },
                async : false,
                type : "POST",
                contentType : 'application/json',
                dataType : 'json',
                data :JSON.stringify({"username" : username}),
                success : function(result) {
                    swal("成功移除!", "该用户成功移除.", "success");
                    window.location.reload();
                },
                error : function() {
                    alert("移除用户失败!")
                }
            });

        });
    }

    $("#trance_btn").click(function () {
        $.post({
            url : "http://localhost:9100/trance",
            data : new FormData($("#trance_form")[0]),
            xhrFields: {
                withCredentials: true
            },
            cache: false,
            dataType: "json",
            processData :  false,//必须是false
            contentType :  false,//必须是false
            success : function(result) {
                // console.log(result.data)

                showBlacks(result.data)
            },
            error : function() {
                alert("失败!")
            }
        })
    });

    function showBlacks(data){
        // str = '<div class="card">' +
        //     '<div class="col-lg-12 col-md-12 col-sm-12">\n' +
        //     '                <div class="card">\n' +
        //     '                    <div class="body">\n' +
        //     '                        <div class="member-card verified">                            \n' +
        //     '                            <div class="thumb-xl member-thumb">\n' +
        //     '                                <img src="assets/images/random-avatar4.jpg" class="img-thumbnail rounded-circle" alt="profile-image">                               \n' +
        //     '                            </div>\n' +
        //     '\n' +
        //     '                            <div class="">\n' +
        //     '                                <h4 class="m-b-5 m-t-20">'+data.username+'</h4>\n' +
        //     '                                <p class="text-muted">Dentist<span> <a href="#" class="text-pink">'+data.email+'</a> </span></p>\n' +
        //     '                            </div>\n' +
        //     '\n' +
        //     '                            <p class="text-muted">'+data.attr+'</p>                           \n' +
        //     '                            <a href="profile.html"  class="btn btn-raised btn-sm">查看详情</a>\n' +
        //     '                            <button type="button" value='+data.username+' id="isAddBlack" class="btn btn-raised g-bg-cyan">加入黑名单</button>\n'+
        //     '                        </div>\n' +
        //     '                    </div>\n' +
        //     '                </div>\n' +
        //     '            </div>' +
        //     '</div>';
        let str = '<div class="widget-area-2 lochana-box-shadow">\n' +
            '\t\t\t\t\t\t\t\t<h3 class="widget-title">恶意用户</h3>\n' +
            '\t\t\t\t\t\t\t\t<div class="row no-mp">\n' +
            '\t\t\t\t\t\t\t\t\t<div class="col-md-4">\n' +
            '\t\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t\t\t<div class="col-md-4">\n' +
            '\t\t\t\t\t\t\t\t\t\t<div class="card mb-4">\n' +
            '\t\t\t\t\t\t\t\t\t\t\t<img class="card-img-top" src="images/user2.png" alt="Card image">\n' +
            '\t\t\t\t\t\t\t\t\t\t\t<div class="card-body">\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<h4 class="card-title">'+data.username+'</h4>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<p class="card-text">'+data.email+'</p>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<p class="card-text">'+data.attr+'</p>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<button type="button" class="btn btn-success mb-2"><span class="ti-pencil-alt"></span>查看详情</button>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t\t<button type="button" class="btn btn-danger"><span class="ti-trash"></span> 加入黑名单</button>\n' +
            '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t</div>';
        $("#showBlack").append(str);
    }

    $(document).on("click", "#isAddBlack", function (e) {
        var username = this.value;
        $.ajax({
            url : "http://localhost:9000/addBlack",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            contentType : 'application/json',
            dataType : 'json',
            data :JSON.stringify({"username" : username}),
            success : function(result) {
                alert("成功加入黑名单")
            },
            error : function() {
                alert("失败!")
            }
        });
    })


});