$(function () {
    // $('.js-sweetalert').on('click', function () {
    //
    // });
    $(document).on("click", ".js-sweetalert button", function (e) {
        var attr = $(this).data('type');
        showPromptMessage(attr);
    });
    function showPromptMessage(attr) {
        swal({
            title: "修改属性描述!",
            text: "属性："+attr,
                // +"属性描述 <input type='text' name='attrinfo'>",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "描述该属性"
        }, function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("不能为空!"); return false
            }
            console.log(attr);
            console.log(inputValue)
            $.ajax({
                url : "http://localhost:9000/editAttr",
                xhrFields: {
                    withCredentials: true
                },
                async : false,
                type : "POST",
                contentType : 'application/json',
                dataType : 'json',
                data :JSON.stringify({
                    "attr" : attr,
                    "info" : inputValue}),
                success : function(result) {
                    swal("成功修改属性描述");
                    window.location.reload();
                },
                error : function() {
                    alert("修改属性描述失败!")
                }
            });

        });
    }

    $(document).on("click", ".js-deletealert button", function (e) {
        var attr = $(this).data('type');
        showConfirmMessage(attr);
    });
    function showConfirmMessage(attr) {
        swal({
            title: "确定删除该属性?",
            text: "确定删除【"+attr+"】属性!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "是的，删除!",
            closeOnConfirm: false,
            html: true,
        }, function () {
            $.ajax({
                url : "http://localhost:9000/deleteAttr",
                xhrFields: {
                    withCredentials: true
                },
                async : false,
                type : "POST",
                contentType : 'application/json',
                dataType : 'json',
                data :JSON.stringify({"attr" : attr}),
                success : function(result) {
                    swal("Deleted!", "Your imaginary file has been deleted.", "success");
                    window.location.reload();
                },
                error : function() {
                    alert("修改属性描述失败!")
                }
            });

        });
    }
})