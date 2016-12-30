LPW.onReady(function(){
    var preLoadImage = function (el){
        if(!el)return;
        var imageList = (el.tagName.toLowerCase()==='img') ?
            [el] : LPW.getTag(el, 'img'),
            len=imageList.length,
            image,
            src,
            i=0;
        for(; i<len; i++){
            image = imageList[i];
            if(image){
                src = LPW.getAttr(image, 'data-src');
                if( src ){
                    image.src = src ;
                    LPW.rmAttr(image, 'data-src');
                }
            }
        }
    };
    var newsSwipePanel = new Silder('news_swipe_container_id', {
        autoDelay:5000,
        silderWidth:380,
        silderHeight:282,
        onCreate:function(c){
            if(c>1){
                var silderList = LPW.getClass('swiper-slide', LPW.getEl('news_swipe_id'));
                for(var i=1,len=silderList.length; i<len; i++){preLoadImage(silderList[i])}
                
                var prevEl = LPW.getEl('news_swipe_prev_id'),
                    nextEl = LPW.getEl('news_swipe_next_id');
                LPW.addHandler(prevEl, "click" ,function(e){
                    newsSwipePanel.prev();
                },prevEl);
                LPW.addHandler(nextEl, "click" ,function(e){
                    newsSwipePanel.next();
                },nextEl);
            }  
        }
    });
});
LPW.onReady(function(){
    var newhouse_wrap_panel=LPW.getEl('news_list_swipe_wrap_id'),
        newhouse_silder_items = LPW.getClass("swiper-slide", newhouse_wrap_panel);
    var newhouse_silder_panel=new Silder('news_list_swipe_container_id', {
        silderWidth:860,
        silderHeight:LPW.getEl('news_list_swipe_container_id').offsetHeight,
        onCreate:function(c){
            var silderTabList = LPW.getTag(LPW.getEl('news_list_tab_id'), "li");
            for(var i=0,len=silderTabList.length; i<len; i++){
                (function(i){
                    LPW.addHover(silderTabList[i],function(e){
                        if(LPW.hasClass(this, 'cur'))return;
                        curIndex = parseInt(LPW.getAttr(this, "data-index"));
                        for(var j=0; j<len; j++){
                            LPW.removeClass(silderTabList[j], 'cur');
                        }
                        LPW.addClass(this, 'cur');
                        template=LPW.getTag(newhouse_silder_items[curIndex],'script');
                        if(template && template[0] && template[0].type === 'text/x-template'){
                            newhouse_silder_items[curIndex].innerHTML=template[0].innerHTML;
                            LPW.show(newhouse_silder_items[curIndex]);
                        }
                        newhouse_silder_panel.swipeTo(curIndex);
                    },function(e){},silderTabList[i]);
                })(i);
            }
        }
    });
});    