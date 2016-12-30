/**
 * 文件上传完成后需要回调显示
 */
function fileupload(obj) {
    var $obj = $(obj);
    $.ajaxFileUpload({
        url: '/admin/mfiles/img',                 //需要链接到服务器地址
        secureuri: false,
        fileElementId: obj.id,              //文件选择框的id属性
        dataType: 'json',                   //服务器返回的格式，可以是json
        success: function (data, status) {
            //兼容火狐、谷歌、ie8以上版本
            data = JSON.parse(data);
            var html = template('li-image-tpl', data.object);
            $('#images-preview-ul').prepend(html);
        },
        error: function (data, status, e) {
            alert(e);
        }
    });
}

function toTrash(obj) {
    var $this = $(obj).closest('li');
    $this.remove();
}

function toLeft(obj) {
    var $this = $(obj).closest('li');
    var $prev = $this.prev();
    if($prev.length > 0) {
        $prev.before($this.prop('outerHTML'));
        $this.remove();
    }
}

function toRight(obj) {
    var $this = $(obj).closest('li');
    var $next = $this.next();
    if($next.length > 0) {
        $next.after($this.prop('outerHTML'));
        $this.remove();
    }
}

$(function() {
    $('#uploader-btn').on('click', function() {
        $("#uploadImg").trigger('click');
    });
    $('#model-form-save').on('click', function() {
        var $form = $('#model-form');
        $.post($form.attr('action'), $form.serialize(), function(result) {
            result  = JSON.parse(result);
            if(result.success) {
                alert("保存成功");
            }else {
                alert(result.msg);
            }
        }, 'json');
    });
});