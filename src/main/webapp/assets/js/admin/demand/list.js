$(function () {

    var $table = $('#model-table-view'),
        type = $table.data('type');
    $table.bootstrapTable({
        method: 'get',
        url: '/admin/demand/paged/' + type,
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
            field : 'title',
            title: '名称',
            width: '100px',
            formatter: function(value, row) {
                if(row.link && row.link != '') {
                    return '<a target="_blank" href="' + row.link + '">' + value + '</a>';
                }
                return value;
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
                    case 'zhongweishi':val = '<label class="label isnew label-default">中卫市</label>';break;
                    default:
                        val = '<label class="label isnew label-danger">固原市</label>';break;
                }
                return val;
            }
        }, {
            field : 'content',
            title: '详情',
            width: '200px'
        }, {
            field : 'contact',
            title: '联系人',
            width:'120px'
        }, {
            field : 'phone',
            title: '联系方式',
            width:'120px'
        }, {
            field : 'dt',
            title: '类型',
            width: '80px',
            formatter: function(value, row) {
                var val = '';
                switch (value){
                    case 'ZF':val = '<label class="label isnew label-success">租房</label>';break;
                    default:
                        val = '<label class="label isnew label-primary">买房</label>';
                }
                return val;
            }
        },{
            field : 'ds',
            title: '状态（点击修改）',
            width: '60px',
            formatter: function(value, row) {
                var html = doT.template($('#tpl-demand-hs').text())(row);
                return html;
            },
            events : {
                'click .unread': function (e, value, row, index) {
                    $.getJSON('/admin/demand/update/' + row.id +'/follow', function(data) {
                        if(data.success) {
                            $table.bootstrapTable('refresh');
                        }
                    });
                },
                'click .follow': function (e, value, row, index) {
                    $.getJSON('/admin/demand/update/' + row.id + '/done', function(data) {
                        if(data.success) {
                            $table.bootstrapTable('refresh');
                        }
                    });
                },
                'click .done': function (e, value, row, index) {
                    alert('这条信息已经完成!');
                }
            }
        },{
            field : 'createdAt',
            title: '时间',
            width:'140px'
        }, {
            filed: 'operate',
            title: '操作',
            width: '100px',
            align: 'center',
            formatter : function(value, row) {
                return [
                    '<div class="operate-tool-group">',
                    '<span class="fa fa-trash trash" title="删除"></span>',
                    '</div>'
                ].join('');
            },
            events : {
                'click .trash': function (e, value, row, index) {
                    if(confirm('您确定要删除吗？') ){
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/demand/delete/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if(result.success) {
                                    location.href = "/admin/demand/list/" + row.dt;
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
