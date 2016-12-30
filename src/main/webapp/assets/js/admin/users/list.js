$(function () {
    $('#model-table-view').bootstrapTable({
        method: 'get',
        url: '/admin/users/page',
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
            field: 'avatar',
            title: '头像',
            width: '100px',
            formatter : function(value, row) {
                if(value) {
                    return '<img style="width:50px;" src="'+ value + '">';
                }
                return '-';
            }
        }, {
            field : 'realname',
            title: '真实姓名',
            width: '120px'
        }, {
            field : 'nickname',
            title: '昵称'
        }, {
            field : 'gender',
            title: '性别'
        }, {
            field : 'weixin',
            title: '微信号',
            width: '100px'
        }, {
            field : 'qq',
            title: 'QQ号',
            width: '100px'
        }, {
            field : 'phone',
            title: '电话号码'
        }, {
            filed: 'operate',
            title: '操作',
            width: '260px',
            align: 'center',
            formatter : function(value, row) {
                return [
                        '<div class="operate-tool-group">',
                            '<span class="fa fa-user view" title="查看基本资料"></span>',
                            '<span class="fa fa-user-times disable" title="禁用"></span>',
                            '<span class="fa fa-pencil edit" title="编辑"></span>',
                            '<span class="fa fa-trash trash" title="删除"></span>',
                        '</div>'
                    ].join('');
            },
            events : {
                'click .disable': function (e, value, row, index) {
                     if(confirm('您确定要禁用该用户吗？') ){
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/users/disable/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if(result.success) {
                                    location.href = "/admin/users/list";
                                } else {
                                    pnotify.info('禁用失败');
                                }
                            }
                        });
                    }
                },
                'click .trash': function (e, value, row, index) {
                    if(confirm('您确定要删除该用户吗？') ){
                       $.ajax({
                           type: "GET",
                           dataType: "json",
                           url: '/admin/users/delete/' + row.id,
                           success: function (result) {
                               alert(result.msg);
                               if(result.success) {
                                   location.href = "/admin/users/list";
                               } else {
                                   pnotify.info('删除失败');
                               }
                           }
                       });
                   }
               },
                'click .edit': function (e, value, row, index) {
                    location.href = "/admin/users/edit/" + row.id;
                },
                'click .view': function (e, value, row, index) {
                    location.href = "/admin/users/view/" + row.id;
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
