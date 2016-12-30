/**
添加顶部城市hover事件
*/
LPW.onReady(function(){
    var cityEl = LPW.getEl('city_hover_id'),
        citylistPanel= LPW.getEl('citylist_panel_id'),
        fnShow = function(){
            LPW.applyStyles(citylistPanel, {display:'block'});
        },
        fnHide = function(){
            LPW.applyStyles(citylistPanel, {display:'none'});
        };
    LPW.addHover(cityEl, function(e){
        var template=LPW.getTag(citylistPanel,'script');
        if(template && template[0] && template[0].type === 'text/x-template'){
            citylistPanel.innerHTML=template[0].innerHTML;
        }
        LPW.addHover(citylistPanel, fnShow, fnHide);
        fnShow();
    },function(e){
        fnHide();
    });
});
/**
添加顶部搜索hover事件
*/
LPW.onReady(function(){
    var searchBoxEl = LPW.getEl('search_hover_id');
    
    LPW.addHover(searchBoxEl, function(e){
        LPW.addClass(this, 'hover');
    },function(e){
        LPW.removeClass(this, 'hover');
    },searchBoxEl);
});
/**
添加新房hover事件
*/
LPW.onReady(function(){
    var newhouseNavEl = LPW.getEl('newhouse_nav_panel_id');
    if(newhouseNavEl){
        var newhousePosEl = LPW.getEl('newhouse_pos_panel_id'),
        newhouseArrowEl = LPW.getEl('newhouse_arrow_panel_id');
        LPW.addHover(newhouseNavEl, function(e){
            LPW.addClass(this, 'cur');
            LPW.show(newhouseArrowEl);
            LPW.show(newhousePosEl);
        },function(e){
            LPW.removeClass(this, 'cur');
            LPW.hide(newhouseArrowEl);
            LPW.hide(newhousePosEl);
        },newhouseNavEl);
    }
});

/**
添加搜索类型click事件
*/
LPW.onReady(function(){
    var comboxEl = LPW.getEl('search_combox_items_id');
    if(comboxEl){
        var comboxItemsEl = LPW.getTag(comboxEl, "span"),
            comboxPanelEl = LPW.getEl('search_pos_combox_id'),
            comboxTypeEl = LPW.getEl('search_combox_type_id'),
            len = comboxItemsEl.length;
        if(len>1){
            LPW.addHover(comboxPanelEl, function(e){
                LPW.show(comboxEl);
            },function(e){
                LPW.hide(comboxEl);
            },comboxPanelEl);
            
            for(var i=0; i<len; i++){
                (function(i){
                    LPW.addHandler(comboxItemsEl[i], 'click', function(){
                        LPW.setText(comboxTypeEl, LPW.getText(this));
                        LPW.setAttr(comboxTypeEl, 'data-search-type', LPW.getAttr(this, 'data-search-combox'));
                        LPW.hide(comboxEl);
						
						var selVal= LPW.getAttr(this, 'data-search-combox');
						var searchzxEL=LPW.getEl('search_field_id');
						if(selVal=='1')
						{
							LPW.setAttr(searchzxEL,'data-value','请填写新房关键字' );
							$('#search_field_id').val('请填写新房关键字');
							// LPW.setAttr(searchzxEL,'value','请输入小区地址或楼盘名' );
						}
						
						if(selVal=='2')
						{
							LPW.setAttr(searchzxEL,'data-value','请填写二手房关键字' );
							$('#search_field_id').val('请填写二手房关键字');
							// LPW.setAttr(searchzxEL,'value','请输入小区地址或楼盘名' );
						}
												
						if(selVal=='3')
						{
							LPW.setAttr(searchzxEL,'data-value','请填写出租房关键字' );
							$('#search_field_id').val('请填写出租房关键字');
							// LPW.setAttr(searchzxEL,'value','请填写关键字' );
						}
												
						if(selVal=='4')
						{
							LPW.setAttr(searchzxEL,'data-value','请填写新闻关键字' );
							$('#search_field_id').val('请填写新闻关键字');
							// LPW.setAttr(searchzxEL,'value','请填写新闻关键字' );
						}
						
                    }, comboxItemsEl[i]);
                })(i);
            }
        }
    }
});


/**
*/
LPW.onReady(function(){
	$('#search_field_id').blur(function(){
	 if( $(this).val()=='' || $(this).val()==$(this).attr('data-value') )
	 {
		  $(this).val( $(this).attr('data-value') );
	 }
	});
	$('#search_field_id').focus(function(){
	 if( $(this).val()==$(this).attr('data-value') )
	 {
		 $(this).val('');
	 }
	});
});


/**
添加手机版hover事件
*/
LPW.onReady(function(){
    var mobileNavEl = LPW.getEl('mobile_nav_panel_id');
    if(mobileNavEl){
        var mobilePosEl = LPW.getEl('mobile_pos_panel_id'),
            mobileArrowEl = LPW.getEl('mobile_arrow_panel_id');
        LPW.addHover(mobileNavEl, function(e){
            LPW.show(mobileArrowEl);
            LPW.show(mobilePosEl);
        },function(e){
            LPW.hide(mobileArrowEl);
            LPW.hide(mobilePosEl);
        },mobileNavEl);
    }

    var iphoneNavEl = LPW.getEl('iphone_nav_panel_id');
    if(iphoneNavEl){
        var iphonePosEl = LPW.getEl('iphone_pos_panel_id'),
            iphoneArrowEl = LPW.getEl('iphone_arrow_panel_id');
        LPW.addHover(iphoneNavEl, function(e){
            LPW.show(iphoneArrowEl);
            LPW.show(iphonePosEl);
        },function(e){
            LPW.hide(iphoneArrowEl);
            LPW.hide(iphonePosEl);
        },iphoneNavEl);
    }
});

/**
顶部添加收藏,设为首页
*/
LPW.onReady(function(){
    var setHomeEl = LPW.getEl('setHome'),
        addFavoriteEl = LPW.getEl('addFavorite'),
        url = window.location,
        title = document.title;
    LPW.addHandler(setHomeEl, 'click', function(){
        try{ 
            document.body.style.behavior='url(#default#homepage)';
            document.body.setHomePage(url); 
        } 
        catch(e){ 
            if(window.netscape) { 
                try { 
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
                } 
                catch (e) { 
                    alert("您好,您的浏览器不支持自动设置页面为首页功能,请手动设置"); 
                } 
                var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(
                    Components.interfaces.nsIPrefBranch); 
                prefs.setCharPref('browser.startup.homepage',url); 
            }else{ 
                alert("您好,您的浏览器不支持自动设置页面为首页功能,请手动设置"); 
            } 
        }
    }, setHomeEl);
    LPW.addHandler(addFavoriteEl, 'click', function(){
        try{   
            window.external.addFavorite(encodeURI(url), title);   
        }catch(e) {   
            try{   
                window.sidebar.addPanel(title, encodeURI(url), "");   
            }catch (e) {   
                alert("加入收藏失败,请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
            }   
        }
    }, setHomeEl);
});

/**
添加回顶部click事件
*/
LPW.onReady(function(){
    var backTopEl = LPW.getEl('backTop');
    if(backTopEl){
        var pageOfHeight = document.documentElement.clientHeight||document.body.clientHeight,
            backTopWidth = 49,
            scorllTop = 0,
            fnScroll = function(){
                scorllTop = document.documentElement.scrollTop||document.body.scrollTop;
                (scorllTop>pageOfHeight) ? (LPW.show(backTopEl)):(LPW.hide(backTopEl));
            }
            fnResize = function(){
                pageOfHeight = document.documentElement.clientHeight||document.body.clientHeight;
                var width = document.body.clientWidth||document.documentElement.clientWidth,
                    halfWidth = Math.floor((width-1180)/2);
               
            };
        LPW.addHandler(backTopEl, 'click', function(){window.scrollTo(0,1);});
        LPW.addHandler(window, 'resize', fnResize);
        LPW.addHandler(window, 'scroll', fnScroll);
        fnResize();
        fnScroll();
    }
});

/**
头部搜索
*/
LPW.onReady(function(){
    var httpCall;
    $("#search_field_id").bind('keyup focus',function(event){
		var usercode = $('#search_combox_type_id').attr("data-search-type");
        var searchtype = $('#search_combox_type_id').attr("data-search-type");
        var type = '';
        if(searchtype==1){
            type = 'xinfang';
        }else if(searchtype==2){
            type = 'ershoufang';
        }else if(searchtype==3){
            type = 'zufang';
        }else{
            type = 'news';
        }
		//if(usercode==2 || usercode==3 || usercode==4){
         //   return false;
		//}
        $("#top_search_ul").empty();
        var kw = $("#search_field_id").val();
        if(!kw){
            console.log("kw is null");
            return ;
        }
        if(httpCall) httpCall.abort();
        httpCall = $.ajax({
            type:"post",
            data:{
                "key": kw,
                "type": type,
            },
            url :"/web/pc/keywords",
            beforeSend:function(){
                $("#top_search_ul").slideDown("500");
                $("#top_search_ul").html("<li><a>查询中……</a><li/>");
            },
            success:function(data){
                var str = "";
                $(data).each(function(){
                    str += "<li><a onclick='setSearchName(\"" + this.title + "\")'>" + this.title +"</a><li/>"
                });
                $("#top_search_ul").html(str);
            }
        })
    });
    $("#search_house_id").click(function(){
	
			var searchtype = $('#search_combox_type_id').attr("data-search-type");
			var keyword = $("#search_field_id").val();
			var citypinyin = $("#citypinyin").val();
			if ($.trim(keyword) == "" || $.trim(keyword)=='请填写新房名称') {
				window.location="/web/pc/home";
			} else if($.trim(keyword)=='请填写新闻关键字'){
				alert("请填写新闻关键字");
				return false;
			} else if($.trim(keyword)=='请填写关键字'){
				alert("请填写关键字");
				return false;
			}else {
				if(searchtype==1){
					window.location="/web/house/xinfang/keyword?keyword="+keyword;
				}else if(searchtype==2){
                    window.location="/web/house/ershoufang/keyword?keyword="+keyword;
                }else if(searchtype==3){
                    window.location="/web/house/zufang/keyword?keyword="+keyword;
				}else{
                    window.location="/web/news/keyword?keyword="+keyword;
				}
				return false;
			}
    });
    var setSearchName=function(name)
    {
        $("#search_field_id").val(name);
        $("#search_field_id").blur();
        $("#top_search_ul").empty();
        $("#top_search_ul").hide();
    };
    window.setSearchName=setSearchName;
    $(function(){
        var other = document.getElementsByTagName('body')[0];
        other.onclick = function(){
            $("#top_search_ul").hide();
        }
    });
});
