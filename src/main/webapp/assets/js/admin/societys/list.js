$(function () {

    var $table = $('#model-table-view');
    $table.bootstrapTable({
        method: 'get',
        url: '/admin/societys/paged',
        cache: false,
        search: true,
        showColumns: true,
        minimumCountColumns: 2,
        showRefresh: true,
        showToggle: true,
        pagination: true,
        sidePagination: 'server',
        pageSize: 20,
        queryParams: function (params) {
            params.type = $table.data('type');
            return params;
        },
        columns: [{
            field: 'cover',
            title: '封面',
            width: '80px',
            formatter: function (value, row) {
                if (value) {
                    return '<img src="' + value + '" width="60px" height="40px"/>';
                }
                return '-';
            }
        }, {
            field: 'nickname',
            title: '昵称',
            width: '100px'
        }, {
            field: 'gender',
            title: '性别',
            width: '40px'
        }, {
            field: 'age',
            title: '年龄',
            width: '40px'
        }, {
            field: 'mastate',
            title: '婚姻状况',
            width: '100px',
            formatter: function (value, row) {
                var val = '';
                switch (value) {
                    case 'DANSHEN':
                        val = '单身';
                        break;
                    case 'LIANAI':
                        val = '恋爱';
                        break;
                    case 'YIHUN':
                        val = '已婚';
                        break;
                    case 'LIYI':
                        val = '离异';
                        break;
                    case 'SANGOU':
                        val = '丧偶';
                        break;
                    case 'BAOMI':
                        val = '保密';
                        break;
                }
                return val;
            }
        }, {
            field: 'height',
            title: '身高',
            width: '100px'
        }, {
            field: 'weight',
            title: '体重',
            width: '100px'
        }, {
            field: 'address',
            title: '居住地',
            width: '200px'
        }, {
            field: 'job',
            title: '工作',
            width: '100px'
        }, {
            field: 'wage',
            title: '薪资水平',
            width: '80px'
        }, {
            field: 'weixin',
            title: '微信',
            width: '100px'
        }, {
            field: 'qq',
            title: 'QQ',
            width: '100px'
        }, {
            field: 'phone',
            title: '联系方式'
        }, {
            filed: 'operate',
            title: '操作',
            width: '100px',
            align: 'center',
            formatter: function (value, row) {
                var view = '';
                if (row.uid != null) {
                    view = '<span class="fa fa-user view" title="查看发布者"></span>';
                }
                return [
                    '<div class="operate-tool-group">',
                    view,
                    '<span class="fa fa-pencil edit" title="编辑"></span>',
                    '<span class="fa fa-trash trash" title="删除"></span>',
                    '</div>'
                ].join('');
            },
            events: {
                'click .edit': function (e, value, row, index) {
                    location.href = "/admin/societys/edit/" + row.id;
                },
                'click .trash': function (e, value, row, index) {
                    if (confirm('您确定要删除吗？')) {
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/societys/delete/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if (result.success) {
                                    location.href = "/admin/societys/list";
                                }
                            }
                        });
                    }
                },
                'click .view': function (e, value, row, index) {
                    location.href = "/admin/societys/view/" + row.uid;
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
