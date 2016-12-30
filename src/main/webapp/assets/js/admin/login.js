$(function(){

    $('#form-submit-btn').on('click', function(event) {
        event.preventDefault();
        var $form = $('#form-login');

        var name = $form.find('input[name="name"]').val();
        var password = $form.find('input[name="password"]').val();

        if(name === '') {
            alert('请输入用户名再登录');
            return false;
        }
        if(password === '') {
            alert('请输入密码后登录');
            return false;
        }

        $.post($form.attr('action'), $form.serialize(), function(ret) {
            if(ret.success) {
                location.href = "/admin/index";
            }else {
                alert(ret.msg);
            }
        }, 'json');
    });

});