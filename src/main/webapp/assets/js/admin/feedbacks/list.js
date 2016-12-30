$(function () {

    $('#model-table-view').bootstrapTable({
        method: 'get',
        url: '/admin/feedbacks/paged',
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
            field : 'content',
            title: '内容',
            width: '440px'
        }, {
            field : 'createdAt',
            title: '创建时间',
            width: '100px'
        }, {
            field : 'isRead',
            title: '状态',
            width: '20px',
            formatter : function(value, row) {
                var val = '<a class="label label-success" href="javascript:void(0)">未读</a>';
                if(value)
                    val = '<a class="label label-default" href="javascript:void(0)">已读</a>';
                return val;
            },
            events : {
                'click .label-success': function (e, value, row, index) {
                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        url: '/admin/feedbacks/update/' + row.id,
                        success: function (result) {
                            if(result.success) {
                                $('#model-table-view').bootstrapTable('refresh');
                            }
                        }
                    });
                },
                'click .trash': function (e, value, row, index) {

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