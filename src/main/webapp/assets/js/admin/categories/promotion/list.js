$(function () {

    var $table = $('#model-table-view');

    $table.bootstrapTable({
        method: 'get',
        url: '/admin/categories/promotion/page',
        cache: false,
        search: true,
        showColumns: true,
        minimumCountColumns : 2,
        showRefresh: true,
        showToggle: true,
        pagination: true,
        sidePagination: 'server',
        pageSize: 20,
        uniqueId: 'id',
        columns: [{
            field : 'name',
            title: '名称',
            width: '200px'
        }, {
            field : 'createdOn',
            title: '创建时间',
            width: '120px'
        }, {
            filed: 'operate',
            title: '操作',
            width: '350px',
            align: 'center',
            formatter : function(value, row) {
                return [
                    '<ul class="operate-tool-group">',
                        '<li class="edit">',
                            '<a href="javascript:void(0)">修改</a>',
                        '</li>',
                        '<li class="trash">',
                            '<a href="javascript:void(0)">删除</a>',
                        '</li>',
                    '</ul>'
                ].join('');
            },
            events : {
                'click .edit': function (e, value, row, index) {
                    location.href="/admin/categories/promotion/update/" + row.id;
                },
                'click .trash': function (e, value, row, index) {
                    if(confirm('您确定要删除该分类吗？') ){
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/categories/promotion/delete/' + row.id,
                            success: function (result) {
                                result = $.evalJSON(result);
                                pnotify.info(result.message);
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