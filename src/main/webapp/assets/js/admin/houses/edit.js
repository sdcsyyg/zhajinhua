$(document).ready(function() {

    $('.chzn-select').chosen({
        allow_single_deselect: true
    });

    $('#tags-labels').tagsInput({
        'defaultText': '添加',
        'height': '50px',
        'width': '720px'
    });

    $('.btn-opt').on('click', function(e) {
        var $this = $(this),
            val = $this.html();
        $this.closest('div.input-group-btn').siblings('input').val(val);
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

            var cid = $form.find('select[name="cid"]').val();
            if(cid === '' || cid == -1) {
                alert('请先选择房产分类');
                return false;
            }

            var title = $form.find('input[name="title"]').val();
            if(title === '') {
                alert('标题不能为空');
                return false;
            }

            $('#editor-input').val(editor.html());

            $.post($form.attr('action'), $form.serialize(), function(result) {
                if(result.success) {
                    var type = $("#select-cid").find("option:selected").data('type');
                    window.location = '/admin/houses/list/' + type;
                }else {
                    alert(result.msg);
                }
            }, 'json');

        });
    });

    var $selector_city = $('#selector-city'), $selector_country = $("#selector-country");
    $selector_city.on('change',function(e, value){
        if(value != undefined){
            var val = value.selected;
            $.ajax({
                type: 'get',
                url: '/admin/city/ajax?province=' + val,
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    if (data.success) {
                        $selector_country.html('');
                        $(data.object).each(function(){
                            jQuery("<option></option>").val(this.code).text(this.name).appendTo($selector_country);
                            $selector_country.trigger("chosen:updated");
                        });
                    }
                },
                error:function(data){

                }
            });
        }
    });

});
