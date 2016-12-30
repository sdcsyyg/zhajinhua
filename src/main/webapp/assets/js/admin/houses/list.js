$(function () {

    var $table = $('#model-table-view'),
        type = $table.data('type');
    $table.bootstrapTable({
        method: 'get',
        url: '/admin/houses/paged/' + type,
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
            width: '60px',
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
            field : 'total',
            title: '总价(万元)',
            width: '80px'
        }, {
            field : 'areasize',
            title: '面积(元/m²)',
            width: '100px'
        }, {
            title: '基本信息',
            width: '300px',
            formatter: function(value, row) {
                return row.room + '—' + row.estate + '—' + row.decoration + '—' + row.useage + '—' + row.toward + '—' + row.floor + '楼(' + row.fhigh + '层)';
            }
        }, {
            title: '属性（点击修改）',
            width: '80px',
            formatter: function(value, row) {
                var html = doT.template($('#tpl-house-property').text())(row);
                return html;
            },
            events : {
                'click .isrecommended': function (e, value, row, index) {
                    $.getJSON('/admin/houses/mp/' + row.id + '/isrecommended', function(data) {
                        if(data.success) {
                            $table.bootstrapTable('refresh');
                        }
                    });
                },
                'click .isnew': function (e, value, row, index) {
                    $.getJSON('/admin/houses/mp/' + row.id + '/isnew', function(data) {
                        if(data.success) {
                            $table.bootstrapTable('refresh');
                        }
                    });
                },
                'click .ishot': function (e, value, row, index) {
                    $.getJSON('/admin/houses/mp/' + row.id + '/ishot', function(data) {
                        if(data.success) {
                            $table.bootstrapTable('refresh');
                        }
                    });
                },
                'click .isgroup': function (e, value, row, index) {
                    $.getJSON('/admin/houses/mp/' + row.id + '/isgroup', function(data) {
                        if(data.success) {
                            $table.bootstrapTable('refresh');
                        }
                    });
                }
            }
        }, {
            field : 'status',
            title: '状态（点击修改）',
            width: '80px',
            formatter: function(value, row) {
                var html = doT.template($('#tpl-house-status').text())(row);
                return html;
            },
            events : {
                'click .sale': function (e, value, row, index) {
                    $.getJSON('/admin/houses/mhs/' + row.id + '/sale', function(data) {
                        if(data.success) {
                            $table.bootstrapTable('refresh');
                        }
                    });
                },
                'click .talk': function (e, value, row, index) {
                    $.getJSON('/admin/houses/mhs/' + row.id + '/talk', function(data) {
                        if(data.success) {
                            $table.bootstrapTable('refresh');
                        }
                    });
                },
                'click .deal': function (e, value, row, index) {
                    $.getJSON('/admin/houses/mhs/' + row.id + '/deal', function(data) {
                        if(data.success) {
                            $table.bootstrapTable('refresh');
                        }
                    });
                }
            }
        }, {
            filed: 'operate',
            title: '操作',
            width: '200px',
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
                    location.href = "/admin/houses/edit/" + row.id;
                },
                'click .trash': function (e, value, row, index) {
                    if(confirm('您确定要删除吗？') ){
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            url: '/admin/houses/delete/' + row.id,
                            success: function (result) {
                                alert(result.msg);
                                if(result.success) {
                                    location.href = "/admin/houses/list";
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
