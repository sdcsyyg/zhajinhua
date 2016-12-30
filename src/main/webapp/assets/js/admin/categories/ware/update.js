$(function() {

    $('#model-form-save').on('click', function() {
        var $form = $('#model-form');

        var name = $form.find('input[name="name"]').val();
        if(!name || name === '') {
            alert('名称不能为空');
            return false;
        }
        $.post($form.attr('action'), $form.serialize(), function(result) {
            result  = JSON.parse(result);
            if(result.success) {
                location.href = '/admin/categories/ware/list';
            }else {
                alert(result.message);
            }
        }, 'json');
    });
});