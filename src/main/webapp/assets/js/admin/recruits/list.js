$(function () {

    $('#model-table-view').bootstrapTable({
        method: 'get',
        url: '/admin/recruits/paged',
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
            title: '职位名称',
            width: '100px'
        }, {
            field: 'wage',
            title: '薪资水平',
            width: '100px'
        }, {
            field: 'area',
            title: '工作区域',
            width: '100px'
        }, {
            field: 'address',
            title: '详细地址',
            width: '100px'
        }, {
            field: 'job',
            title: '职位类别',
            width: '100px'
        }, {
            field: 'worklife',
            title: '工作年限',
            width: '100px'
        }, {
            field: 'contact',
            title: '联系人',
            width: '100px'
        }, {
            field: 'phone',
            title: '联系方式',
            width: '100px'
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
                    location.href = "/admin/recruits/edit/" + row.id;
                },
                'click .trash': function (e, value, row, index) {
                    if (confirm('您确定要删除吗？')) {
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/recruits/delete/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if (result.success) {
                                    location.href = "/admin/recruits/list";
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
