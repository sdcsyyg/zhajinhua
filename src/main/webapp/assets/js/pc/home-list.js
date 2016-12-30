LPW.onReady(function(){
    var housePanel = LPW.getEl('house_list_panel_id'),
        comparePanelEl = LPW.getEl('compare_pos_panel_id'),
        compareBtnEl = LPW.getEl('compare_btn_id'),
        compareRecordPanel = LPW.getEl('compare_records_id'),
        compareRecordlisEl = LPW.getTag(compareRecordPanel, 'li'),
        templter = '<li>{0}<i data-id="{1}" class="close" title="取消比较"></i></li>',
        store = new Store(),
        checked = false,
        target;
    store.init(window.location.href);
    var fnResetCompare=function(){
        var records = store.loadRecord(),compares=[];
        for(var i=0,len=records.length; i<len; i++){
            compares.push(records[i].id);
        }
        LPW.setAttr(compareBtnEl, 'href', compateUrl + compares.join('_'));
    };
    (function(){
        LPW.hide(comparePanelEl);
        var records = store.loadRecord(),
            len=records.length,
            html = '';
        if(len>0){
            for(var i=0; i<len; i++){
                LPW.getEl('house_diff_id_'+records[i].id).checked=true;
                records[i] && (html += LPW.format(templter, records[i].title, records[i].id));
            }
            compareRecordPanel.innerHTML = html;
            LPW.show(comparePanelEl);
        }
        fnResetCompare();
    })();
    LPW.addHandler(housePanel, 'click', function(e){
        target = e.target;
        if(target.className=='diff' || 
            (function(){
                target=target.parentNode||target.parentElement;
                return target.className=='diff';
            })()
        ){
            checked = target.children[0].checked;
            if(checked){
                store.pushRecord({
                    path:window.location.href,
                    id:LPW.getAttr(target, 'data-id'),
                    title:LPW.getAttr(target, 'data-title'),
                    date:new Date().getTime()
                });
            }else{
                store.removeRecord({id:LPW.getAttr(target, 'data-id')});
            }
            
            var records = store.loadRecord(),
                len=records.length,
                html = '';
            for(var i=0; i<len; i++){
                records[i] && (html += LPW.format(templter, records[i].title, records[i].id));
            }
            compareRecordPanel.innerHTML = html;
            if(len<1){
                LPW.hide(comparePanelEl);
            }else{
                LPW.show(comparePanelEl);
            }
            fnResetCompare();
        }
    }, housePanel);
    
    //绑定close按钮click事件，删除比对楼盘
    LPW.addHover(compareRecordPanel, function(e){
        if(e && e.target.tagName.toLocaleLowerCase()=='li'){
            LPW.addClass(e.target, 'hover');
            LPW.show(e.target.children[0]);
            LPW.addHover(compareRecordPanel, function(e){
                if(e && e.target.className=='close'){
                    LPW.show(e.target);
                }
            }, function(e){
                if(e && e.target.className=='close'){
                    LPW.hide(e.target);
                }
            }, compareRecordPanel);
        }
    }, function(e){
        if(e && e.target.tagName.toLocaleLowerCase()=='li'){
            LPW.removeClass(e.target, 'hover');
            LPW.hide(e.target.children[0]);
        }
    }, compareRecordPanel);
    
    LPW.addHandler(compareRecordPanel, 'click', function(e){
        if(e && e.target.className=='close'){
            var dataId = LPW.getAttr(e.target, 'data-id');
            store.removeRecord({id:dataId});
            LPW.getEl('house_diff_id_'+dataId).checked=false;
            compareRecordPanel.removeChild(e.target.offsetParent);
            if(store.loadRecord().length<1){
                LPW.hide(comparePanelEl);
            }
            fnResetCompare();
        }
    }, compareRecordPanel);
    
    //绑定比对按钮click事件，判断选中的楼盘数量
    LPW.addHandler(compareBtnEl, 'click', function(e){
        if(LPW.getTag(compareRecordPanel, 'li').length<2){
            alert("请至少选中两个楼盘比对！");
            LPW.preventDefault(e);
        }
    }, compareBtnEl);
    
    var getOffsetTop=function(el){
        iOffsetTop=el.offsetTop;
        while(el = el.offsetParent){
            iOffsetTop += el.offsetTop;
        }
        return iOffsetTop;
    },
    el=LPW.getClass("search-nav",document)[0],    
    iOffsetTop=0;
    
    if(LPW.isLteIE9()==6){
        iOffsetTop=getOffsetTop(el);
        LPW.setStyle(comparePanelEl, 'top', iOffsetTop+'px');
        LPW.addHandler(window, 'scroll', function(){
            LPW.setStyle(comparePanelEl, 'top', (document.documentElement.scrollTop+iOffsetTop)+'px');
        });
    }else{
        if(LPW.isLteIE9()==7){
            iOffsetTop=getOffsetTop(el);
        }else{
            iOffsetTop=el.offsetTop||235;
        }
        iOffsetTop=getOffsetTop(el);
        LPW.setStyle(comparePanelEl, 'top', iOffsetTop+'px');
    }
});

window.Store=function(){
	LPW.apply(this,{
		win:window,
        minRecord:2,
		maxRecord:4,
		localStorageName:'localStorage',
		LPW_COMPARE_KEY:'LPW_COMPARE_KEY',
		supportCookie:navigator.cookieEnabled
	});
	this.supportStorage=this.supportLocalStorage();
};
Store.prototype={
    init:function(key){
        this.LPW_COMPARE_KEY=key;
    },
    pushRecord:function(params){
		var records=this.getRecords();
        if(records.length>=this.maxRecord){
            alert('最多选中四个楼盘比对！');
            LPW.getEl('house_diff_id_'+params.id).checked=false;
            return;
        }
		if(records!=undefined){
			this.diffRepeat(records,params);
			while(records.length>this.maxRecord){
				records.shift();
			}
			this.setRecords(records);
		}
	},
    removeRecord:function(params){
		var index=[],
            records=this.getRecords();
		for(var i=0,size=records.length;i<size;i++){
			if(records[i].id === params.id){
				index.push(i);
			}
		}
		while(index.length > 0){
			records.splice(index[index.length-1],1);
			index.shift();
		}
		this.setRecords(records);
	},
	loadRecord:function(){
		var records=this.getRecords();
		if(records != undefined && records.length > 0){
			while(records.length>this.maxRecord){
				records.shift();
			}
			this.setRecords(records);
			return records;
		}else{
			this.clearRecords();
			return [];
		}
	},
	diffRepeat:function(records,params){
		var index=[];
		for(var i=0,size=records.length;i<size;i++){
			if(records[i].id === params.id){
				index.push(i);
			}
		}
		while(index.length > 0){
			records.splice(index[index.length-1],1);
			index.shift();
		}
		records.push(params);
	},
    
	setRecords:function(records){
		if(this.supportStorage){
			this.set(this.LPW_COMPARE_KEY, records);
		}else if(this.supportCookie){
			this.setCookie(this.LPW_COMPARE_KEY,records);
		}else{}
	},
	getRecords:function(){
		if(this.supportStorage){
			var r=this.get(this.LPW_COMPARE_KEY);
			if(!LPW.isArray(r)){
				this.remove(this.LPW_COMPARE_KEY);
				r = [];
			}
			return r;
		}else if(this.supportCookie){
			var r=this.getCookie(this.LPW_COMPARE_KEY);
			if(!LPW.isArray(r)){
				this.setCookie(this.LPW_COMPARE_KEY,0,-1);
				r = [];
			}
			return r;
		}else{
			return undefined;
		}
	},
	clearRecords:function(){
		if(this.supportStorage){
			this.remove(this.LPW_COMPARE_KEY);
		}else if(this.supportCookie){
			this.setCookie(this.LPW_COMPARE_KEY,0,-1);
		}else{}
	},
	set:function(k,v){
		if(v===undefined)return this.remove(k);
		try{
			this.storage.setItem(k,LPW.serialize(v));
		}catch(e){}
		return v;
	},
	get:function(k){
		return LPW.deserialize(this.storage.getItem(k));
	},
	remove:function(k){
		this.storage.removeItem(k);
	},
	setCookie:function(n,v,t){
		var exp=new Date();
		exp.setTime(exp.getTime()+(t||360*24*60*60*1000));
		document.cookie=new Array(encodeURIComponent(n),"=",
            escape(LPW.serialize(v)),";expires=",exp.toGMTString()).join('');
	},
	getCookie:function(n){
		var v=document.cookie.match(new RegExp("(^| )"+encodeURIComponent(n)+"=([^;]*)(;|$)"));
		return !v ? [] : LPW.deserialize(unescape(v[2]));
	},
	supportLocalStorage:function(){
		try {
			if(this.localStorageName in this.win && this.win[this.localStorageName]){
				this.storage = this.win[this.localStorageName];
				try{
					this.storage.setItem('k',1);
					this.storage.getItem('k');
					this.storage.removeItem('k');
					return true;
				}catch(e){
					return false;
				}
			}
			return false;
		}catch(e) { 
			return false;
		}
	}
}