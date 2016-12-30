$(function () {

    $('#model-table-view').bootstrapTable({
        method: 'get',
        url: '/admin/bmxxs/paged',
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
            field : 'labelItems',
            title: '标签',
            width: '100px',
            formatter: function(value, row) {
                if(value) {
                    var html = '';
                    for(var i in value) {
                        html += '<span class="label-cell" style="margin-right:5px;">' + value[i] + '</span>';
                    }
                    return html;
                }
            }
        }, {
            field : 'summary',
            title: '概述',
            width: '300px'
        }, {
            filed: 'operate',
            title: '操作',
            width: '120px',
            align: 'center',
            formatter : function(value, row) {
                return [
                    '<ul class="operate-tool-group">',
                        '<li class="edit">',
                            '<a class="obtn" href="javascript:void(0)">编辑</a>',
                        '</li>',
                        '<li class="trash">',
                            '<a class="obtn del" href="javascript:void(0)">删除</a>',
                        '</li>',
                    '</ul>'
                ].join('');
            },
            events : {
                'click .edit': function (e, value, row, index) {
                    location.href="/admin/bmxxs/edit/" + row.id;
                },
                'click .trash': function (e, value, row, index) {
                    if(confirm('您确定要删除吗？') ){
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/thumbnails/delete/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if(result.success) {
                                    location.href = "/admin/thumbnails/list";
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