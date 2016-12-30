$(document).ready(function () {

    $('.chzn-select').chosen({
        allow_single_deselect: true
    });

    $('#tags-labels').tagsInput({
        'defaultText': '添加',
        'height': '50px',
        'width': '500px'
    });

    KindEditor.ready(function (K) {

        // 富文本编辑器
        var editor = K.create('#editor-content', {
            minHeight: 300,
            urlType: 'domain',
            uploadJson: '/admin/mfiles/upload',
            autoHeightMode: true,
            afterCreate: function () {
                this.loadPlugin('autoheight');
            }
        });

        $('#model-form-save').on('click', function () {

            var $form = $('#model-form');
            var title = $form.find('input[name="nickname"]').val();
            if (title === '') {
                alert('昵称不能为空');
                return false;
            }

            $.post($form.attr('action'), $form.serialize(), function (result) {
                if (result.success) {
                    var type = $("#select-cid").find("option:selected").data('type');
                    location.href = '/admin/societys/list?type=' + type;
                } else {
                    alert(result.msg);
                }
            }, 'json');

        });
    });

});
