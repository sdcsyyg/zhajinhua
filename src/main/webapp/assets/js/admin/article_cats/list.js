$(function () {

    var $table = $('#model-table-view');
    $table.bootstrapTable({
        method: 'get',
        url: '/admin/article/cats/paged',
        cache: false,
        search: true,
        showColumns: true,
        minimumCountColumns : 2,
        showRefresh: true,
        showToggle: true,
        pagination: true,
        sidePagination: 'server',
        pageSize: 20,
        columns: [{
            field : 'position',
            title: '排序',
            width: '200px'
        }, {
            field : 'name',
            title: '名称',
            width: '200px'
        }, {
            filed: 'operate',
            title: '操作',
            width: '100px',
            align: 'center',
            formatter : function(value, row) {
                if(row.readonly) {
                    return '<span style="color:red;">只读</span>';
                }
                return [
                    '<ul class="operate-tool-group">',
                        '<span class="fa fa-pencil edit" title="编辑"></span>',
                        '<span class="fa fa-trash delete" title="删除"></span>',
                    '</ul>'
                ].join('');
            },
            events : {
                'click .edit': function (e, value, row, index) {
                    location.href = "/admin/article/cats/edit/" + row.id;
                },
                'click .delete': function (e, value, row, index) {
                    if(confirm('您确定要删除该分类吗？') ){
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/article/cats/delete/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if(result.success) {
                                    $table.bootstrapTable('refresh');
                                }
                            }
                        });
                    }
                }
            }
        }],
        responseHandler: function(res) {
            return {
                rows: res.content,
                total: res.totalElements
            }
        }
    });

});
