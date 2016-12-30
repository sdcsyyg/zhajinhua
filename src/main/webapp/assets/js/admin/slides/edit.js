$(document).ready(function() {

    $('.chzn-select').chosen({
        allow_single_deselect: true
    });

    $('#model-form-save').on('click', function() {

        var $form = $('#model-form');

        $.post($form.attr('action'), $form.serialize(), function(result) {
            if(result.success) {
                window.location = '/admin/slides/list';
            }else {
                alert(result.msg);
            }
        }, 'json');
    });

});
