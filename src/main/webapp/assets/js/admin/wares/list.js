$(function () {

    $('#model-table-view').bootstrapTable({
        method: 'get',
        url: '/admin/wares/paged',
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
            width: '100px',
            formatter: function(value, row) {
                if(value) {
                    return '<img src="' + value + '" width="60px" height="40px"/>';
                }
                return '-';
            }
        }, {
            field : 'labelItems',
            title: '标签',
            width: '200px',
            formatter: function(value, row) {
                if(value) {
                    var html = '';
                    for(var i in value) {
                        html += '<span class="label label-primary" style="margin-right:5px;">' + value[i] + '</span>';
                    }
                    return html;
                }
            }
        }, {
            field : 'name',
            title: '名称',
            width: '300px',
            formatter: function(value, row) {
                if(row.link && row.link != '') {
                    return '<a target="_blank" href="' + row.link + '">' + value + '</a>';
                }
                return value;
            }
        }, {
            field : 'company',
            title: '公司',
            width: '300px',
            formatter: function(value, row) {
                if(value) {
                    return value.name;
                }
                return '-';
            }
            
        }, {
            filed: 'operate',
            title: '操作',
            width: '300px',
            align: 'center',
            formatter : function(value, row) {
                return [
                    '<ul class="operate-tool-group">',
                        '<li class="thumbnails">',
                            '<a class="obtn" href="javascript:void(0)">封面图片</a>',
                        '</li>',
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
                'click .thumbnails': function (e, value, row, index) {
                    location.href="/admin/wares/thumbnails/" + row.id;
                },
                'click .preview': function (e, value, row, index) {
                    window.open("/admin/wares/preview/" + row.id);
                },
                'click .edit': function (e, value, row, index) {
                    location.href="/admin/wares/edit/" + row.id;
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