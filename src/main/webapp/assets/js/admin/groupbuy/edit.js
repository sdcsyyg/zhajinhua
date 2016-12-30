$(document).ready(function() {
    $('#model-form-save').on('click', function() {

        var $form = $('#model-form');
        var name = $form.find('input[name="name"]').val();
        if(name == '') {
            pnotify.info('请输入真实姓名');
            $form.find('input[name="name"]').focus();
            return false;
        }

        var phone = $form.find('input[name="phone"]').val();
        if(!/^1\d{10}$/.test(phone)) {
            pnotify.info('请输入正确的手机号码');
            $form.find('input[name="phone"]').focus();
            return false;
        }

        $.post($form.attr('action'), $form.serialize(), function(result) {
            if(result.success) {
                location.href = '/admin/groupbuy/list';
            }else {
                pnotify.info(result.msg);
            }
        }, 'json');
    });

    $('#model-form-reset').on('click', function() {
        $('#model-form')[0].reset();
    });
});