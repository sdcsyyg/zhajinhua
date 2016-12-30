$(document).ready(function() {

    $('#model-form-submit').on('click', function() {

        var $form = $('#model-form');
        var title = $form.find('input[name="name"]').val();
        if(title === '') {
            alert('名称不能为空');
            return false;
        }

        $.post($form.attr('action'), $form.serialize(), function(result) {
            if(result.success) {
                window.location = '/admin/article/cats/list';
            }else {
                alert(result.msg);
            }
        }, 'json');

    });
});
