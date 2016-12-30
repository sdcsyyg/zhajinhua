$(document).ready(function () {

    $('.chzn-select').chosen({
        allow_single_deselect: true
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

            var title = $form.find('input[name="title"]').val();
            if (!title || title === '') {
                alert('名称不能为空');
                return false;
            }

            $('#editor-input').val(editor.html());

            $.post($form.attr('action'), $form.serialize(), function (result) {
                if (result.success) {
                    location.href = '/admin/recruits/list';
                } else {
                    alert(result.msg);
                }
            }, 'json');
        });
    });
});
