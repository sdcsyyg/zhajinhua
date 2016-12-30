$(document).ready(function() {
    $('#model-form-save').on('click', function() {

        var $form = $('#model-form');
        var realname = $form.find('input[name="name"]').val();
        if(realname == '') {
            pnotify.info('名称不能为空');
            $form.find('input[name="name"]').focus();
            return false;
        }

        $.post($form.attr('action'), $form.serialize(), function(result) {
            if(result.success) {
                location.href = '/admin/votes/list';
            }else {
                pnotify.info(result.msg);
            }
        }, 'json');
    });

    $('#model-form-reset').on('click', function() {
        $('#model-form')[0].reset();
    });
});