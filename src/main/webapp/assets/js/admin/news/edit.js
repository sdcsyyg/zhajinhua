$(document).ready(function() {

    $('.chzn-select').chosen({
        allow_single_deselect: true
    });

    $('#tags-labels').tagsInput({
        'defaultText': '添加',
        'height': '50px',
        'width': '500px'
    });

    KindEditor.ready(function(K) {

        // 富文本编辑器
        var editor = K.create('#editor-content', {
            autoHeightMode : true,
            minHeight: 300,
            urlType : 'domain',
            uploadJson: '/admin/mfiles/upload',
            afterCreate : function() {
                this.loadPlugin('autoheight');
            }
        });

        $('#model-form-submit').on('click', function() {
            var $form = $('#model-form');
            var url = $form.attr('action');
            var title = $form.find('input[name="title"]').val();
            if(title === '') {
                alert('标题不能为空');
                return false;
            }

            $('#editor-input').val(editor.html());

            $.post($form.attr('action'), $form.serialize(), function(result) {
                if(result.success) {
                    var type = $("#select-type").find("option:selected").data('type');
                    window.location = '/admin/news/list/'+ type;
                }else {
                    alert(result.msg);
                }
            }, 'json');

        });
    });

});
