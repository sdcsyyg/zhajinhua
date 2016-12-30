$(function () {

    $('#model-table-view').bootstrapTable({
        method: 'get',
        url: '/admin/fashions/paged',
        cache: false,
        search: true,
        showColumns: true,
        minimumCountColumns: 2,
        showRefresh: true,
        showToggle: true,
        pagination: true,
        sidePagination: 'server',
        pageSize: 20,
        columns: [{
            field: 'title',
            title: '标题',
            width: '200px'
        }, {
            field: 'name',
            title: '姓名',
            width: '100px'
        }, {
            field: 'nickname',
            title: '昵称',
            width: '100px'
        }, {
            field: 'birthday',
            title: '出生日期',
            width: '100px'
        }, {
            field: 'age',
            title: '年龄',
            width: '50px'
        }, {
            field: 'phone',
            title: '联系电话',
            width: '120px'
        }, {
            field: 'labelItems',
            title: '标签',
            width: '100px',
            formatter: function (value, row) {
                if (value) {
                    var html = '';
                    for (var i in value) {
                        html += '<span class="label-cell" style="margin-right:5px;">' + value[i] + '</span>';
                    }
                    return html;
                }
            }
        }, {
            filed: 'operate',
            title: '操作',
            width: '200px',
            align: 'center',
            formatter: function (value, row) {
                return [
                    '<div class="operate-tool-group">',
                    '<span class="fa fa-pencil edit" title="编辑"></span>',
                    '<span class="fa fa-trash trash" title="删除"></span>',
                    '</div>'
                ].join('');
            },
            events: {
                'click .edit': function (e, value, row, index) {
                    location.href = "/admin/fashions/edit/" + row.id;
                },
                'click .trash': function (e, value, row, index) {
                    if (confirm('您确定要删除吗？')) {
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/fashions/delete/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if (result.success) {
                                    location.href = "/admin/fashions/list";
                                }
                            }
                        });
                    }
                }
            }
        }],
        responseHandler: function (res) {
            return {
                rows: res.content,
                total: res.totalElements
            }
        }
    });

});
