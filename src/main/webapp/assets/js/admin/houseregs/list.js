$(function () {

    var $table = $('#model-table-view'),
    status = $table.data('status');
    $table.bootstrapTable({
        method: 'get',
        url: '/admin/houseregs/paged/' + status,
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
            field : 'price',
            title: '价格',
            width: '100px'
        }, {
            field : 'areasize',
            title: '面积',
            width: '100px',
            formatter: function(value, row) {
                return value + '平';
            }
        }, {
            title: '基本信息',
            width: '300px',
            formatter: function(value, row) {
                return row.room + '—' + row.estate + '—' + row.decoration + '—' + row.useage + '—' + row.toward + '—' + row.floor + '楼(' + row.fhigh + '层)';
            }
        }, {
            field : 'labelItems',
            title: '标签',
            width: '150px',
            formatter: function(value, row) {
                if(value) {
                    var html = '';
                    for(var i in value) {
                        html += '<span class="label-cell" style="margin-right:5px;">' + value[i] + '</span>';
                    }
                    return html;
                }
            }
        },{
            field:'hr',
            title:'类型',
            width:'80px',
            formatter: function (value,row) {
                //SOLD 有房出售, RENT 有房出租,BUY 买房登记, TENEMENT 租房登记
                var head = '<label style="margin-right:5px;" class="label isrecommended ';
                var foot= '</label>';
                var val = 'label-success">租房登记';
                switch (value){
                    case "SOLD":
                        val='label-primary">有房出售';
                        break;
                    case "RENT":
                        val='label-info">有房出租';
                        break;
                    case "BUY":
                        val='label-warning">买房登记';
                        break;
                    default:
                }
                return head+val+foot;
            }
        }, {
            filed: 'operate',
            title: '操作',
            width: '230px',
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
                },
                'click .view': function (e, value, row, index) {
                    location.href = "/admin/users/view/" +row.uid;
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
