$(function () {
    $('#model-table-view').bootstrapTable({
        method: 'get',
        url: '/admin/votes/page',
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
            field: 'name',
            title: '名称',
            width: '200px'
        },{
            field: 'voteType',
            title: '类型',
            width: '200px'
        }, {
            field : 'scoreSystem',
            title: '分制（只针对打分制）',
            width: '200px'
        }, {
            field : 'finished',
            title: '是否关闭',
            width: '200px',
            formatter : function(value, row) {
                if(value) {
                    return '已关闭';
                }
                return '已开启';
            }
        }, {
            filed: 'operate',
            title: '操作',
            width: '260px',
            align: 'center',
            formatter : function(value, row) {
                return [
                        '<div class="operate-tool-group">',
                            '<span class="fa fa-play start" title="开启投票"></span>',
                            '<span class="fa fa-stop finish" title="停止投票"></span>',
                            '<span class="fa fa-pencil edit" title="编辑"></span>',
                            '<span class="fa fa-trash trash" title="删除"></span>',
                        '</div>'
                    ].join('');
            },
            events : {
                'click .start': function (e, value, row, index) {
                    if(confirm('您确定要开启该活动吗？') ){
                       $.ajax({
                           type: "GET",
                           dataType: "json",
                           url: '/admin/votes/start/' + row.id,
                           success: function (result) {
                               alert(result.msg);
                               if(result.success) {
                                   location.href = "/admin/votes/list";
                               } else {
                                   pnotify.info('开启失败');
                               }
                           }
                       });
                   }
               },
                'click .finish': function (e, value, row, index) {
                    if(confirm('您确定要停止该活动吗？') ){
                       $.ajax({
                           type: "GET",
                           dataType: "json",
                           url: '/admin/votes/finish/' + row.id,
                           success: function (result) {
                               alert(result.msg);
                               if(result.success) {
                                   location.href = "/admin/votes/list";
                               } else {
                                   pnotify.info('停止失败');
                               }
                           }
                       });
                   }
               },
                'click .trash': function (e, value, row, index) {
                    if(confirm('您确定要删除该活动吗？') ){
                       $.ajax({
                           type: "GET",
                           dataType: "json",
                           url: '/admin/votes/delete/' + row.id,
                           success: function (result) {
                               alert(result.msg);
                               if(result.success) {
                                   location.href = "/admin/votes/list";
                               } else {
                                   pnotify.info('删除失败');
                               }
                           }
                       });
                   }
               },
                'click .edit': function (e, value, row, index) {
                    location.href = "/admin/votes/edit/" + row.id;
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
