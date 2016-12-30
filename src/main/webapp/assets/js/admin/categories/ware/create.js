$(function() {

    $('.chzn-select').chosen({
        no_results_text : "没有符合要求的结果!",
        allow_single_deselect: true
    });

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