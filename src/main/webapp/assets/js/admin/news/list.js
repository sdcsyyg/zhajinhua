$(function () {

    var $table = $('#model-table-view');
    var type = type = $table.data('type');
    $table.bootstrapTable({
        method: 'get',
        url: '/admin/news/paged/' + type,
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
            title: '标题',
            width: '300px',
            formatter: function(value, row) {
                if(row.link && row.link != '') {
                    return '<a target="_blank" href="' + row.link + '">' + value + '</a>';
                }
                return value;
            }
        }, {
            field : 'isrecommended',
            title: '推荐',
            width: '40px',
            formatter: function(value, row) {
                var val = '<label class="label isnew label-default">否</label>';
                if(value){
                    val = '<label class="label isnew label-success">是</label>';
                }
                return val;
            }
        },  {
            field : 'summary',
            title: '摘要',
            width: '300px',
            formatter: function(value, row) {
                return '<p class="nowrap-multi">' + value + '</p>';
            }
        }, {
            filed: 'operate',
            title: '操作',
            width: '170px',
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
                    location.href = "/admin/news/edit/" + row.id;
                },
                'click .trash': function (e, value, row, index) {
                    if(confirm('您确定要删除该文章吗？') ){
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/news/delete/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if(result.success) {
                                    location.href = "/admin/news/list";
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
