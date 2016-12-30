$(document).ready(function() {

    $('.chzn-select').chosen({
        allow_single_deselect: true
    });

    $('#tags-labels').tagsInput({
        'defaultText': '添加',
        'height': '45px',
        'width': '500px'
    });

    $('#model-form-save').on('click', function() {

        var $form = $('#model-form');

        $.post($form.attr('action'), $form.serialize(), function(result) {
            if(result.success) {
                window.location = '/admin/agent/list';
            }else {
                alert(result.msg);
            }
        }, 'json');
    });

    $('#model-form-reset').on('click', function(){
        var $form = $('#model-form');
        $form[0].reset();
    });

});
