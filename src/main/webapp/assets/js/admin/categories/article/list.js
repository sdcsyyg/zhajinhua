$(function () {

    var $table = $('#model-table-view');
    $table.bootstrapTable({
        method: 'get',
        url: '/admin/categories/article/paged',
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
                return [
                    '<ul class="operate-tool-group">',
                        '<li class="edit">',
                            '<a class="obtn" href="javascript:void(0)">编辑</a>',
                        '</li>',
                        '<li class="delete">',
                            '<a class="obtn del" href="javascript:void(0)">删除</a>',
                        '</li>',
                    '</ul>'
                ].join('');
            },
            events : {
                'click .edit': function (e, value, row, index) {
                    location.href = "/admin/categories/article/edit/" + row.id;
                },
                'click .delete': function (e, value, row, index) {
                    if(confirm('您确定要删除该类别吗？') ){
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/categories/article/delete/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if(result.success) {
                                    window.location = "/admin/categories/article/list";
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