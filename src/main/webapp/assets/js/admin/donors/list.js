$(function () {

    var $table = $('#model-table-view');
    $table.bootstrapTable({
        method: 'get',
        url: '/admin/donors/paged',
        cache: false,
        search: true,
        showColumns: true,
        minimumCountColumns : 2,
        showRefresh: true,
        showToggle: true,
        pagination: true,
        sidePagination: 'server',
        pageSize: 20,
        queryParams: function(params) {
            params.type = $table.data('type');
            return params;
        },
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
        }, {
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
            field: 'party',
            title: '名称',
            height: '100px'
        }, {
            field : 'phone',
            title: '联系方式'
        }, {
            field: 'content',
            title: '详情'
        }, {
            field : 'labelItems',
            title: '标签',
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
            filed: 'operate',
            title: '操作',
            width: '200px',
            align: 'center',
            formatter : function(value, row) {
                var view = '';
                if(row.uid != null){
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
            events : {
                'click .edit': function (e, value, row, index) {
                    location.href="/admin/donors/edit/" + row.id;
                },
                'click .trash': function (e, value, row, index) {
                    if(confirm('您确定要删除吗？') ){
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/cars/delete/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if(result.success) {
                                    location.href = "/admin/cars/list";
                                }
                            }
                        });
                    }
                },
                'click .view': function (e, value, row, index) {
                    location.href = "/admin/users/view/" + row.uid;
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
