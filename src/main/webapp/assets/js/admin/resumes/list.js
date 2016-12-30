$(function () {

    $('#model-table-view').bootstrapTable({
        method: 'get',
        url: '/admin/resumes/paged',
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
            field: 'name',
            title: '姓名',
            width: '80px'
        }, {
            field: 'gender',
            title: '性别',
            width: '40px'
        }, {
            field: 'birth',
            title: '出生年月',
            width: '100px'
        }, {
            field: 'degree',
            title: '学历',
            width: '60px'
        }, {
            field: 'experience',
            title: '工作经验',
            width: '60px'
        }, {
            field: 'phone',
            title: '电话',
            width: '140px'
        }, {
            field: 'email',
            title: '邮箱',
            width: '160px'
        }, {
            field: 'wage',
            title: '期望薪资',
            width: '100px'
        }, {
            field: 'job',
            title: '期望职位',
            width: '100px'
        }, {
            field: 'address',
            title: '工作区域',
            width: '100px'
        }, {
            filed: 'operate',
            title: '操作',
            width: '130px',
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
                    location.href = "/admin/resumes/edit/" + row.id;
                },
                'click .trash': function (e, value, row, index) {
                    if (confirm('您确定要删除吗？')) {
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/resumes/delete/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if (result.success) {
                                    location.href = "/admin/resumes/list";
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
