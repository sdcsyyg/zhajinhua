$(function () {
    $('#model-table-view').bootstrapTable({
        method: 'get',
        url: '/admin/users/pageBlackList',
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
            width: '150px',
            align: 'center',
            formatter : function(value, row) {
                return [
                    '<ul class="operate-tool-group">',
                        '<li class="enable">',
                            '<a class="obtn" href="javascript:void(0)">启用</a>',
                        '</li>',
                        '<li class="delete">',
                            '<a class="obtn" href="javascript:void(0)">删除</a>',
                        '</li>',
                    '</ul>'
                ].join('');
            },
            events : {
                'click .enable': function (e, value, row, index) {
                     if(confirm('您确定要启用该用户吗？') ){
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/users/enable/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if(result.success) {
                                    location.href = "/admin/users/blackList";
                                }
                            }
                        });
                    }
                },
                'click .delete': function (e, value, row, index) {
                    if(confirm('您确定要删除该用户吗？') ){
                       $.ajax({
                           type: "GET",
                           dataType: "json",
                           url: '/admin/users/delete/' + row.id,
                           success: function (result) {
                               alert(result.msg);
                               if(result.success) {
                                   location.href = "/admin/users/blackList";
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