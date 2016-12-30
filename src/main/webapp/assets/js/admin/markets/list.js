$(function () {

    $('#model-table-view').bootstrapTable({
        method: 'get',
        url: '/admin/markets/paged',
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
        }, {
            field : 'title',
            title: '名称',
            width: '260px',
            formatter: function(value, row) {
                if(row.link && row.link != '') {
                    return '<a target="_blank" href="' + row.link + '">' + value + '</a>';
                }
                return value;
            }
        }, {
            field : 'price',
            title: '价格',
            width: '100px'
        }, {
            field : 'addr',
            title: '地址',
            width: '300px'
        }, {
            field : 'phone',
            title: '联系方式',
            width: '120px',
        }, {
            field : 'labelItems',
            title: '标签',
            width: '110px',
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
                    location.href="/admin/markets/edit/" + row.id;
                },
                'click .trash': function (e, value, row, index) {
                    if(confirm('您确定要删除吗？') ){
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/markets/delete/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if(result.success) {
                                    location.href = "/admin/markets/list";
                                }
                            }
                        });
                    }
                },
                'click .view': function (e, value, row, index) {
                    location.href = "/admin/users/view/" +row.uid;
                },
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
