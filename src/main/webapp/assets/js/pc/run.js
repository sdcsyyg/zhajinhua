var delay=new yzm();
//回调函数
function call(){
    var cityData=function(){
        $.post('/index.php/home/show_city_select','',function(value){
            var daqu_content='';
            daqu_content=daqu_content+"<dl class=\"fn-clear\"><dt>华北东北：</dt><dd>";
            for(data in value['1'])
            {
                daqu_content=daqu_content+"<a rel=\"nofollow\"  href=\"http://"+value['1'][data].domain+"\">"+value['1'][data].name+"</a>";
            }
            daqu_content = daqu_content+"</dd></dl>";
            daqu_content = daqu_content+"<dl class=\"fn-clear\"><dt>华东地区：</dt><dd>";
            for ( data in value['2'])
            {
                daqu_content = daqu_content+"<a rel=\"nofollow\"  href=\"http://"+value['2'][data].domain+"\">"+value['2'][data].name+"</a>";
            }
            daqu_content = daqu_content+"</dd></dl>";
            daqu_content = daqu_content+"<dl class=\"fn-clear\"><dt>华南华中：</dt><dd>";
            for ( data in value['3'])
            {
                daqu_content = daqu_content+"<a rel=\"nofollow\"  href=\"http://"+value['3'][data].domain+"\">"+value['3'][data].name+"</a>";
            }
            daqu_content = daqu_content+"</dd></dl>";
            daqu_content = daqu_content+"<dl class=\"fn-clear\"><dt>西北西南：</dt><dd>";
            for ( data in value['4'])
            {
                daqu_content = daqu_content+"<a rel=\"nofollow\"  href=\"http://"+value['4'][data].domain+"\">"+value['4'][data].name+"</a>";
            }
            daqu_content = daqu_content+"</dd></dl><p class=\"city-more-btn\"><a rel=\"nofollow\" href=\"http://www.loupan.com/?all\">更多城市</a></p>";
            $("#City_div_daqu").html(daqu_content);
            $("#City_div_daqu").removeClass();
        },'json');
    }
    $(".gc").one("mouseover",function(){cityData();});
    $(".gc,#City_div_daqu").hover(function(){
        $("#City_div_daqu").show();
        var a=$("#City_div_daqu").attr("class");
        if(a){cityData();}
        },function(){$("#City_div_daqu").hide();}
    );
    $(".lp-hot-top li").hover(function(){$(this).addClass("cur")},function() { $(this).removeClass("cur")});//楼盘热门排行
    var qie=function(a){$(a).hover(function(){$(this).attr("class","on")},function(){$(this).attr("class",'')})};
    qie("#qie1");qie("#qie2");//窗眼hover效果
    var strInfo=function(){
        var href=window.location.href;
		/*
		var urlEsf='http://esf.'+(href.substr(7)),
            urlZu='http://zu.'+(href.substr(7)),
            urlFang='http://fang.'+(href.substr(7));
			*/
		var	urlEsf=href.replace("loupan.com","esf.loupan.com");
        var	urlZu=href.replace("loupan.com","zu.loupan.com");
		var	urlFang=href.replace("loupan.com","fang.loupan.com");
        $("#g1").append('<a class="more" href="/news/list-34.html">更多&gt;&gt;</a>');//业界访谈
        $("#g131").append('<a class="more" href="/news/list-131.html">更多&gt;&gt;</a>');//业主访谈
        $("#g2").append('<a class="more" href="/news/list-48.html">更多&gt;&gt;</a>');//楼盘导购
        $("#qytjtab").prepend('<a href="'+href+'xinfang" class="more">更多&gt;&gt;</a>');//按区域推荐
        $("#gztab").prepend('<a href="'+href+'xinfang" class="more">更多&gt;&gt;</a>');//按价格推荐
        $("#g3").prepend('<span><a href="/news/list-114.html">更多专题&gt;&gt;</a></span>');//楼盘专题
        $("#g4").prepend('<span><a href="/news/">更多资讯&gt;&gt;</a></span>');//本地资讯
        $("#g5").prepend('<a href="'+href+'xinfang" class="more">更多&gt;&gt;</a>');//楼盘大全
        $("#g6").prepend('<a href="'+href+'/xinfang/t2" class="more">更多&gt;&gt;</a>');//热门别墅
        $("#g7").prepend('<a href="/news/list-74.html" class="more">更多&gt;&gt;</a>');//写字楼投资
        $("#g8").prepend('<a href="'+href+'/xinfang/t3" class="more">更多&gt;&gt;</a>');//热门写字楼
        $("#g9").prepend('<a href="'+href+'/xinfang/t4" class="more">更多&gt;&gt;</a>');//热门商铺
        $("#g10").prepend('<a href="/news/list-31.html" class="more">更多&gt;&gt;</a>');//商铺资讯
        $("#g11").prepend('<a href="'+urlEsf+'" class="more">更多&gt;&gt;</a>');//最新二手房
        $("#g12").prepend('<a href="'+urlZu+'" class="more">更多&gt;&gt;</a>');//最新租房
        $("#g13").append('<a href="http://www.loupan.com/?all">更多</a>');//热门城市
    }
    strInfo();

}
//广告函数 需要优先执行的函数
delay.waitFor('A',function(){
	var arr=[
		'<div style="display:none" class="ftg">',
		'<div style="position:relative; z-index:3;">',
		'<a style="background:#333;color:#fff;cursor:pointer;position:absolute;right:0;top:0;padding:0 5px;z-index:5;" id="colse">关闭</a>',
		'</div><div class="AD" id="A12643"></div></div>'
	];
    $("#ad1").append(arr.join("\n"));    
    AD({c:"#A12643",t:"full",id:12643,r:".ftg"});
    AD({c:"#A12594",t:"full",id:12594});
    AD({c:"#A12595",t:"full",id:12595});
    AD({c:"#A12596",t:"full",id:12596});
    AD({c:"#A12597",t:"full",id:12597});
    AD({c:"#A12598",t:"full",id:12598});
    AD({c:"#A12599",t:"full",id:12599});
    AD({c:"#A12600",t:"full",id:12600});
    AD({c:"#A12601",t:"full",id:12601});
    AD({c:"#A12602",t:"full",id:12602});
    AD({c:"#A12603",t:"full",id:12603});
    AD({c:"#A12610",t:"full",id:12610});
    AD({c:"#A12611",t:"full",id:12611});
    AD({c:"#A12612",t:"full",id:12612});
    AD({c:"#A12613",t:"full",id:12613});
    AD({c:"#A12614",t:"background",id:12614});
    AD({c:"#A12615",t:"full",id:12615});
    AD({c:"#A12636",t:"full",id:12636});
    AD({c:"#A12637",t:"full",id:12637});
    AD({c:"#A12638",t:"full",id:12638});
    AD({c:"#A12639",t:"full",id:12639});
    AD({c:"#A12640",t:"full",id:12640});
    AD({c:"#A12641",t:"full",id:12641});
    AD({c:"#A12690",t:"full",id:12690});
    AD({c:"#A12691",t:"full",id:12691});
    AD({c:"#A12692",t:"full",id:12692});
    AD({c:"#A12604",t:"full",id:12604});
    AD({c:"#A12605",t:"full",id:12605});
    AD({c:"#A12642",t:"full",id:12642});
    AD({c:"#A12622",t:"full",id:12622});
    AD({c:"#A12623",t:"full",id:12623});
    AD({c:"#A12624",t:"full",id:12624});
    AD({c:"#A12646",t:"full",id:12646});
    AD({c:"#A12647",t:"full",id:12647});
    AD({c:"#A12648",t:"full",id:12648});
    AD({c:"#A12650",t:"full",id:12650});
    AD({c:"#A12651",t:"full",id:12651});
    AD({c:"#A12652",t:"full",id:12652});
    AD({c:"#A12653",t:"full",id:12653});
    AD({c:"#A12654",t:"full",id:12654});
    AD({c:"#A12655",t:"full",id:12655});
    AD({c:"#A12656",t:"full",id:12656});
    AD({c:"#A12617",t:"full",id:12617});
    AD({c:"#A12533",t:"float",id:12533});
    AD({c:"#A12534",t:"float",id:12534});
	AD({c:"#A12645",t:"fix",id:12645});
    AD({c:"#A12644",t:"fix",id:12644});
    AD({c:"#A12685",t:"full",id:12685});
    AD({c:"#A12686",t:"full",id:12686});
    AD({c:"#A12687",t:"full",id:12687});
    AD({c:"#A12688",t:"full",id:12688});
    AD({c:"#A12689",t:"full",id:12689});
    adShow.run();
});

delay.waitFor(['A','B'], function(){
    function AddFavorite(sURL, sTitle) {
        sURL = encodeURI(sURL);
        try{
            window.external.addFavorite(sURL, sTitle);  
        }catch(e) {  
            try{  
                window.sidebar.addPanel(sTitle, sURL, "");  
            }catch (e) {  
                alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
            }  
        }
    }
    //设为首页
    function SetHome(url){
        if (document.all) {
            document.body.style.behavior='url(#default#homepage)';
            document.body.setHomePage(url);
        }else{
            alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
        }
    }
    var showimg=function (nadename,con,k){
        ($(nadename).children("li")).each(function(){
            var b=parseInt($(this).attr("id"));
            var l=k;
            l[b]=l[b]?l[b]:0;
            var a=parseInt(l[b].length);
            $(this).hover(function(){
                $(this).siblings().removeClass("cur").end().addClass('cur');
                var s=[],u=[],n=[],p=[],ct=[],r=[];
                for(var i=0;i<a;i++){
                    s[i]=l[b][i].img;
                    u[i]=l[b][i].url;
                    n[i]=l[b][i].name;
                    p[i]=l[b][i].price;
                    ct[i]=l[b][i].cityarea;
                    r[i]='<li class="qy"><a class="showimg1" href="'+u[i]+'"><img src="'+s[i]+'">'+n[i]+'</a>售价：<i>'+p[i]+'</i><br />区域：'+ct[i]+'</li>';
                }
                $(con).html(function(){
                    if(!r[1]){
                        return r[0];
                    }else if(!r[2]){
                        return r[0]+r[1];
                    }else if(!r[3]){
                        return r[0]+r[1]+r[2];
                    }else if(!r[0]){
                        return '没有数据';
                    }else{
                        return r[0]+r[1]+r[2]+r[3];
                    }
                });
                $(".qy").each(function(){$(this).hover(function(){$(this).addClass("active")},function(){$(this).removeClass("active")})});
            },function(){});
        });
    };
    var youhui=function(){
        var a=webdata.index_youhui_ad;
        $("#y1").append(a);
    }
    var yzlt=function(){
        var a=webdata.index_bbs_str;
        $("#y2").append(a);
    }
    youhui();
    yzlt();
    var jdt=function(){
        var n=webdata.index_slider?webdata.index_slider:'没有数据';
        $("#slides").html(n);
        $("#newsSlider").append('<a class="prev" href="#">Prev</a><a class="next" href="#">Next</a><div class="nav_fl fl"><ul id="pagination_slider" class="pagination_slider t8 fr"></ul></div>');
        var a=$("#slides").children().length;
        for(var i=0,n=a;i<n;i++){
            $("#pagination_slider").append('<li class="fl_vist"></li>');
        }
    }
    jdt();
    $("#zs").html(webdata.timetel);
    var b="<form id=\"search_form\" name=\"search_form\" action=\"/xinfang/?\" method=\"get\" target=\"_blank\"><input name=\"q\" type=\"text\" class=\"ui-search-input\" defaultValue=\"请输入关键词 (如:楼盘名称、地址、学校)\" value=\""+webdata.q+"\" id=\"top_search_input\" autocomplete=\"off\"><span class=\"ui-search-btn\" id=\"top_search_span\">找楼盘</span></form><ul class=\"tab-list\" style=\"display: none; z-index: 10;\" id=\"top_search_ul\"></ul>";
    $("#iss").html(b);
    $("#top_search_input").focus(function(){(this.value==this.defaultValue)?(this.value=''):false;});
    $("#top_search_input").blur(function(){(!this.value)?(this.value=this.defaultValue):false;});
    $("#hy").html(webdata.b1);
    $("#if").html(webdata.d2);
    $(".yzm").each(function(i,e){
        var a=parseInt($(this).attr("id"));
        if(a && webdata.news_categories[a]){$(this).html('<a href="/news/list-'+a+'.html">'+"["+webdata.news_categories[a]+"]<a>")}else{$(this).html('<a href="/news/list-'+a+'.html">[其它]<a>')}
    });
    $("#qqimg").prepend(webdata.link_qq);
    showimg("#www","#cc",webdata.tab);
    showimg("#aaa","#ee",webdata.price);
    var img=function(){
        $(".i").each(function(i,e){
            var a=$(e).attr("i");
            $(e).prepend('<img data-url="'+a+'" class="lazyLoading">');
        });
    }
    img();
    var ss=function(){
        $("#y6").prepend('<a id="sh" class="cp" href="javascript:void(0)" target="_self">设为首页</a> 丨 <a id="af" target="_self" href="javascript:void(0)">加入收藏</a>');
        $("#colse").click(function(){$('.ftg').remove()});
        $("#sh").click(function(){SetHome(window.location);});
        $("#af").click(function(){AddFavorite(window.location,document.title)});
    };
    ss();
    (function($){
        $.fn.imgLazyLoading = function(options){
            var set = $.extend({
                url : "data-url",
                fadeIn : 0
            }, options || {});
            var cache = [];
            $(this).each(function(){
                var nodeName = this.nodeName.toLowerCase();
                var url = $(this).attr(set.url);
                var data = {
                    obj : $(this),
                    url : url,
                    tag : nodeName
                };
                cache.push(data);
            });
            var lazyLoading = function(){
                $.each(cache,function(i, e){
                    var obj = e.obj,
                        url = e.url,
                        tag = e.tag;
                        if(obj){
                            var winHeight = $(window).height();
                            var scrolltop = $(window).scrollTop();
                            var oTop = obj.offset().top;
                            if((oTop-scrolltop) > 0 && (oTop-scrolltop) < winHeight){
                                if(tag === "img"){
                                    if(set.fadeIn){
                                        obj.fadeIn(set.fadeIn);
                                    }
                                    obj.attr("src", url);
                                }else{
                                    return false;
                                }
                                e.obj = null;
                            }
                        }
                    });
                };
                lazyLoading();
                $(window).bind("scroll", lazyLoading);
            };
    })(jQuery);
    $(".lazyLoading").imgLazyLoading({
        url : "data-url",
        fadeIn : 400
    });
            
    $(".qy").each(function(){$(this).hover(function(){$(this).addClass("active")},function(){$(this).removeClass("active")})});
    //幻灯片抽象类
    var BaseSlider=function (option){
        //参数配置
        this.setting=$.extend({
            handler:null,//滚动手柄
            roll:null,//滚动对象
            timer:2,// 时间间隔
            space:1,//自定义每次滚动的距离
            startRoll:function (){}, // 滚动开始事件
            stopRoll:function (){} // 滚动结束事件
        },option);
    }
    //类方法
    BaseSlider.prototype={
        init:function (){
            var me=this;
            me.timer=this.setting.timer * 1000;//时间
            me.gun=0; //初始位置
            me.lr=-1; //控制左右滚动的参数
            me.index=0; //索引
            me.space=this.setting.space;
            me.roll=$(this.setting.roll);
            var a=$("#slides").children().length;
            me.handler=typeof this.setting.handler=="string" ?$(this.setting.handler).children():this.setting.handler.children();

            me.len=a;
            me.rollValue=me.roll.children().eq(0).width(); //滚动值
            me.widths=a*me.rollValue;
            //初始化滚动
            me.initGun=setInterval(function (){
                me.roll.css("width",me.widths);//设置初始化宽度
                me.index++;
                if(me.index==me.len){
                    me.index=0;
                }
                me.gFunc(me.index);
            },me.timer);
            //滚动函数
            me.gFunc=function (index){
                me.gun=me.space != 1 ? me.lr * (index * me.space) : me.lr * (index * me.rollValue);
                me.handler.removeClass("active");
                me.handler.eq(index).addClass("active");
                me.roll.stop(true).animate({
                    "left":me.gun
                });
            }
            //重新滚动
            me.startGun=function (){
                me.initGun=setInterval(function (){
                    me.index++;
                    if(me.index==me.len){
                        me.index=0;
                    }
                    me.gFunc(me.index);
                },me.timer);
            }
            //清除滚动
            me.stopGun=function (){
                clearInterval(me.initGun);
                me.initGun=null;
            }
            //单击
            $.each(me.handler,function (){
                $(this).bind("click",function (){
                    me.index=$(this).parent().children().index(this);
                    me.gFunc(me.index);
                    return false;
                });
            });
            //绑定到外层元素
            this.handler.bind("mouseover",this.stopGun);
            this.handler.bind("mouseout",me.startGun);
            //滚动对象滑过要停止
            this.roll.bind("mouseover",this.stopGun);
            this.roll.bind("mouseout",me.startGun);
            return me;
        },
        //运行
        run:function (){
            throw new Error("//该方法必须由子类实现//");
        }
    }
    //新闻幻灯片类==================================
    var newsSliderClass=function (option){
        BaseSlider.call(this,option);
    }
    newsSliderClass.extend(BaseSlider);
    //增加上下页功能
    newsSliderClass.prototype.run=function (object){
        var swpc=this.init();
        var hand={
                prev:typeof object.prev==="string" ? $(object.prev):object.prev,
                next:typeof object.next==="string" ? $(object.next):object.next
            }
        $('#newsSlider').hover(function(){
            $(".prev,.next").show();
        },function(){
            $(".prev,.next").hide();
        });
        if(hand.prev){
            hand.prev.bind("mouseover",swpc.stopGun);//滑入
            hand.prev.bind("mouseout",swpc.startGun);//离开
            //点击
            hand.prev.bind("click",function (){
                if(swpc.index>0){
                    swpc.index-=1;
                }else{
                    swpc.index=swpc.len-1;
                }
                    swpc.gFunc(swpc.index);
                    return false;
            });
        }
        if(hand.next){
            //滑入
            hand.next.bind("mouseover",swpc.stopGun);
            //离开
            hand.next.bind("mouseout",swpc.startGun);
            //点击
            hand.next.bind("click",function (){
                if(swpc.index < swpc.len-1){
                    swpc.index += 1;
                }else{
                    swpc.index=0;
                }
                swpc.gFunc(swpc.index);
                return false;
            });
        }
    }
    //初始化
    var newsSlider=new newsSliderClass({
        handler:"#pagination_slider",
        roll:"#slides",
        timer: 2
    });
    newsSlider.run({
        prev:$(".prev"),
        next:$(".next")
    });

    //优惠窗眼切换效果基类
    var BaseSliderA=function(a,b,c){
        var t=this;
        t.start=a;
        t.total=b;
        t.elements=c;
    }
    BaseSliderA.prototype={
        init:function(){
            var e=this.elements;
            $($(e).get(this.start)).animate({
                opacity:0
            }, "slow",function(){
                $(this).css('display','none');                      
            });
            this.start++;
            if((this.start)==this.total){
                this.start=0;                      
                $($(e).get(0)).animate({
                    opacity:1
                }, "slow",function(){
                    $(this).css('display','block');
                });
            }
            else{
                $($(e).get(this.start)).animate({
                    opacity:1
                }, "slow",function(){
                    $(this).css('display','block');
                });                    
            }
        },
        run:function(){}
    }
    var youhuiClass=function(option){
        BaseSliderA.apply(this,option);
    }
    youhuiClass.extend(BaseSliderA);
    youhuiClass.prototype.run=function(){
        this.total=$(this.elements).size();
        if(this.total>1){this.init()};
    }
    var youhuiA=new youhuiClass([0,0,'#qie1 div']);
    setInterval(function(){
        youhuiA.run();
    },8000);    
    var youhuiB=new youhuiClass([0,0,'#qie2 div']);
    setInterval(function(){
        youhuiB.run();
    },10000);

    /*
     * 顶部搜索联想功能
     */
    $(function(){
        var httpCall,
            $a=$("#top_search_input"),
            $b=$("#top_search_ul");
        $a.bind('keyup focus',function(event){
            $b.empty();
            var kw = $a.val();

            if(kw =='' || kw ==' ')
            {
                return false;
            }
            
            if(httpCall) httpCall.abort();
            httpCall = $.ajax({
                type:"post",
                data:{"kw":kw},
                url :"/index.php/house/ajax_top_search_data/?s="+Math.random(),
                beforeSend:function(){
                    $b.slideDown("500");
                    $b.html("<li><a>查询中……</a><li/>");
                },
                success:function(str){  
            //alert(str);return false;
                    $b.html(str);
                }
            })
        })
        $("#top_search_span").click(function(){
            if($a.val()=='' || $a.val()=='请输入关键词 (如:楼盘名、地址、学校)')
            {
                return false;
            }
            $("#search_form").submit();
        })
    });
},new call());
delay.trigger(['A','B']);
function setSearchName(name){
    var $a=$("#top_search_input"),
        $b=$("#top_search_ul");
    $a.val(name);
    $a.blur();
    $b.empty();
    $b.hide();
};
$(function(){
    var other = document.getElementsByTagName('body')[0];
    other.onclick = function(){
        $("#top_search_ul").hide();
    }
});