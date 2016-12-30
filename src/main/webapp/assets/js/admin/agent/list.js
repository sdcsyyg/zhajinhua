$(function () {

    var $table = $('#model-table-view');
    $table.bootstrapTable({
        method: 'get',
        url: '/admin/agent/paged',
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
            field : 'cover',
            title: '封面',
            width: '80px',
            formatter: function(value, row) {
                if(value) {
                    return '<img src="' + value + '" width="60px" height="40px"/>';
                }
                return '-';
            }
        },{
            field : 'city',
            title: '城市',
            width: '50px',
            formatter: function(value, row) {
                var val = '';
                switch (value){
                    case 'yinchuanshi':val = '<label class="label isnew label-success">银川市</label>';break;
                    case 'shizuishanshi':val = '<label class="label isnew label-primary">石嘴山市</label>';break;
                    case 'wuzhongshi':val = '<label class="label isnew label-info">吴忠市</label>';break;
                    case 'guyuanshi':val = '<label class="label isnew label-danger">固原市</label>';break;
                    default:
                        val = '<label class="label isnew label-default">中卫市</label>';
                }
                return val;
            }
        },{
            field: 'num',
            title: '编号',
            width: '60px'
        },{
            field : 'title',
            title: '标题',
            width: '200px'
        },{
            field : 'name',
            title: '姓名',
            width: '60px'
        },{
            field : 'age',
            title: '年龄',
            width: '50px'
        },{
            field : 'phone',
            title: '电话',
            width: '80px'
        },{
            field : 'wx',
            title: '微信',
            width: '80px'
        },{
            field : 'qq',
            title: 'QQ',
            width: '80px'
        }, {
            filed: 'operate',
            title: '操作',
            width: '80px',
            align: 'center',
            formatter : function(value, row) {
                return [
                        '<div class="operate-tool-group">',
                            '<span class="fa fa-pencil edit" title="编辑"></span>',
                            '<span class="fa fa-trash trash" title="删除"></span>',
                        '</div>'
                    ].join('');
            },
            events : {
                'click .edit': function (e, value, row, index) {
                    location.href = "/admin/agent/edit/" + row.id;
                },
                'click .trash': function (e, value, row, index) {
                    if(confirm('您确定要删除吗？') ){
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/agent/delete/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if(result.success) {
                                    location.href = "/admin/agent/list";
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
