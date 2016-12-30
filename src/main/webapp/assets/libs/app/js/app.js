//启动agile
var $config = {
    exmobiSevice: '${$native.getAppSetting().domain}/process/service/${ClientUtil.getAppId()}'
};

A.launch({
    readyEvent: 'ready',
    backEvent: 'backmonitor',
    usePageParam: false
});

var afterLogged = function(fn) {
    $.getJSON('/user/checked', function(data) {
        data = JSON.parse(data);
        if(data.success) {
            fn();
        }else {
            A.Controller.section('section_user_login');
            A.showToast('请登录后再操作');
        }
    });
};

/*$(document).ajaxStart(function() {
    A.showMask();
}).ajaxComplete(function() {
    A.hideMask();
});*/

/** ===========首页============= **/
(function(){
    $(document).on('articleload', '#article_page_index', function(){
        A.Slider('#slide-page-index', {
            auto : true
        });
    });
})();

/** ========================== **/
/** ===========商品=========== **/
/** ========================== **/
/*---------侧边点击关闭------------------*/
$(document).on(A.options.clickEvent, '#aside-ware-categories li[data-toggle="section"]',function(){
    A.Controller.aside();
});

/*---------侧边初始化------------------*/
(function(){

    $(document).on('sectionload', '#section_ware_index', function(){

        $.getJSON('/category/asdata', function(data) {

            var $parents = $('li[data-role="parent"]');

            $parents.on(A.options.clickEvent, function() {
                $parents.removeClass('active');
                $(this).addClass('active');
                var id = $(this).data('id');
                $.each(data, function(i, val) {
                    if(val.id == id) {
                        A.template('#ware-category-tpl').renderReplace(val.children);
                        return false;
                    }
                });
            })

            $parents.eq(0).tap();
        });
    });

})();

/*------------按商品分类加载数据-------*/
(function(){
    var id,name,page;
    var doRefresh = function(){
        A.template('#ware-tpl').renderAfter('/ware/load?cid=' + id, function(data){
            if(data.length==0){
                A.showToast('暂无相关信息');
                return;
            }
            page++;
        });
    };
    $(document).on('sectionshow', '#section_ware_list', function(){
        var params =  A.Component.params('#section_ware_list');
        if(params.id == id) return;
        id = params.id;
        name = params.name;
        page = 1;
        $('#section_ware_list .titlebar h1').html(name);
        A.template('#ware-tpl').renderReplace([]);
        doRefresh();
    });

})();

/*------------商品详情-------*/
(function(){
    $(document).on('sectionload', '#section_ware_detail', function(){
        A.Slider('#slide-ware-thumbnails', {
            auto : true
        });
        $('#btn-buy').on(A.options.clickEvent, function() {
            var id = $(this).data('id');
            afterLogged(function() {
                A.Controller.section('section_order_confirm?id=' + id);
            });
        });
    });
})();

/** ========================== **/
/** ==========商家============ **/
/** ========================== **/
(function(){
    $(document).on('sectionload', '#section_vendor_index', function(){
        A.Slider('#slide-vendor-thumbnails', {
            auto : true
        });
    });
})();

/** ========================== **/
/** ==========订单============ **/
/** ========================== **/

(function(){
    $(document).on('sectionload', '#section_order_confirm', function(){
        $('#form-submit').on(A.options.clickEvent, function() {
            $('#model-form').submit();
        });
    });
})();

/*------------订单支付-------*/
(function(){
    $(document).on('sectionload', '#section_order_balance', function(){

        $(document).ajaxStart(function() {
            A.showMask();
        }).ajaxComplete(function() {
            A.hideMask();
        });

        var dataForWeixin = { appId: "", TimeStamp: "", nonceStr: "", Signature: ""};
        dataForWeixin.appId = $("#weixinShare").data("appid");
        dataForWeixin.TimeStamp = $("#weixinShare").data("timestamp");
        dataForWeixin.nonceStr = $("#weixinShare").data("noncestr");
        dataForWeixin.Signature = $("#weixinShare").data("signature");
        wx.config({
            debug: false,
            appId: dataForWeixin.appId,
            timestamp: dataForWeixin.TimeStamp,
            nonceStr: dataForWeixin.nonceStr,
            signature: dataForWeixin.Signature,
            jsApiList: [
              'chooseWXPay'
            ]
        });
        wx.ready(function () {

            wx.hideOptionMenu();

            $('#wx-pay-btn').on(A.options.clickEvent, function() {

                var $paybtn = $(this);

                var orderId = $paybtn.data('orderId');

                $.getJSON('/worder/pay/' + orderId, function(data) {
                    A.hideMask();
                    data = JSON.parse(data);
                    if(!data.success) {
                        A.showToast(data.message);
                        return false;
                    }
                    var param = data.object;

                    wx.chooseWXPay({
                        timestamp: param.timeStamp,
                        nonceStr: param.nonceStr,
                        package: param.package,
                        signType: param.signType,
                        paySign: param.paySign,
                        success: function(res) {
                            window.location = '/worder/success';
                        },
                        fail: function(res) {
                            A.showToast("网络连接错误，请稍后再试");
                        },
                        complete: function(res) {
                        },
                        cancel: function(res) {
                            A.showToast("您已取消支付");
                        }
                    });
                }, 'json');

            });
        });

    });
})();

/** ========================== **/
/** ==========个人中心============ **/
/** ========================== **/

(function(){
    $(document).on('sectionload', '#section_user_edit', function(){
        $('#form-submit').on(A.options.clickEvent, function() {
            var $form = $('#model-form');
            $.post($form.attr('action'), $form.serialize(), function(data) {
                data = JSON.parse(data);
                if(data.success) {
                    A.Controller.section('section_user_index');
                } else {
                    A.showToast(data.message);
                }
            }, 'json');
        });
    });
})();