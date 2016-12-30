$(function () {
    $('#model-table-view').bootstrapTable({
        method: 'get',
        url: '/admin/groupbuy/page',
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
            field : 'name',
            title: '团购人',
            width: '120px'
        }, {
            field : 'phone',
            title: '团购电话',
            width : '120px'
        }, {
            field : 'hmap',
            title: '房子信息',
            formatter : function(value, row){
                //name - x室-x厅-x卫-x平米-200万
                var val = '';
                var separator = '-';
                val += value.hname + separator;
                val += value.hbedroom + '室' + separator;
                val += value.hlivingroom + '厅' + separator;
                val += value.hbathroom + '卫' + separator;
                val += value.hareasize + '㎡';
                return val;
            }
        }, {
            field : 'hmap',
            title: '总价',
            width: '100px',
            formatter : function(value, row){
                var val = '';
                val += value.htotal +  '万';
                return val;
            }
        },{
            field : 'createdAt',
            title: '报名时间',
            width: '160px'
        }, {
            filed: 'operate',
            title: '操作',
            width: '260px',
            align: 'center',
            formatter : function(value, row) {
                return [
                        '<div class="operate-tool-group">',
                            '<span class="fa fa-info view" title="查看房源信息"></span>',
                            '<span class="fa fa-pencil edit" title="编辑"></span>',
                            '<span class="fa fa-trash trash" title="删除"></span>',
                        '</div>'
                    ].join('');
            },
            events : {

                'click .trash': function (e, value, row, index) {
                    if(confirm('您确定要删除该用户吗？') ){
                       $.ajax({
                           type: "GET",
                           dataType: "json",
                           url: '/admin/groupbuy/delete/' + row.id,
                           success: function (result) {
                               alert(result.msg);
                               if(result.success) {
                                   location.href = "/admin/groupbuy/list";
                               } else {
                                   pnotify.info('删除失败');
                               }
                           }
                       });
                   }
               },
                'click .edit': function (e, value, row, index) {
                    location.href = "/admin/groupbuy/edit/" + row.id;
                },
                'click .view': function (e, value, row, index) {
                    location.href = "/admin/houses/view/" + row.id;
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
