window.Silder = function(element, options) {
	this.container = LPW.getEl(element);
    if(!this.container)return;
	var _this = this;
	this.options = options || {};
    this.boxWidth = this.options.boxWidth;
    this.boxHeight = this.options.boxHeight;
	this.silderWidth = this.options.silderWidth;
    this.silderHeight = this.options.silderHeight;
    this.sildersInPage = this.options.sildersInPage||1;
    this.sildersInWidth = this.options.sildersInWidth||0;
    this.silderClass = this.options.silderClass||"swiper-slide";
    
	this.speed = this.options.speed || 500;
	this.index = this.options.startSlide || 0;
    this.onCreate = this.options.onCreate || function() {};
	this.endSilder = this.options.endSilder || function() {};
	this.beforeSilder = this.options.beforeSilder || function() {};
    this.options.mouseOver && (this.mouseOver = this.options.mouseOver);
    this.options.mouseOut && (this.mouseOut = this.options.mouseOut);
    
	this.delay = this.options.autoDelay || 0;
	this.element = this.container.children[0];
	this.container.style.overflow = 'hidden';
	this.element.style.listStyle = 'none';
	this.element.style.margin = 0;
    
	this.setup();
    this.onCreate(this.length);
    if(this.length>1){
        this.begin();
        if(this.options.mouseOver && this.options.mouseOut){
            LPW.addHover(this.container, function(){
                _this.stop();
                _this.mouseOver();
            }, function(){
                _this.resume();
                _this.mouseOut();
            }, this.container);
        }
    }
};
Silder.prototype = {
	setup: function() {
	    this.slides = LPW.getClass(this.silderClass, this.element);
	    this.length = this.getSilderCount(this.slides.length);
	    this.width = this.silderWidth || this.container.offsetWidth;
	    if (this.length < 2 || !this.width) return null;
        
        LPW.applyStyles(this.container,{
            'width':(this.boxWidth||this.silderWidth)+'px',
            'height':(this.boxHeight||this.silderHeight)+'px'
        });
        LPW.setStyle(this.element, 'width', (this.length * this.width) + 'px');
	    var index = this.slides.length;
	    while (index--) {
            LPW.applyStyles(this.slides[index],{
                'width':(this.sildersInWidth||this.silderWidth)+'px',
                'height':this.silderHeight+'px',
                'display':'inline-block',
                'vertical-align':'top'
            });
	    };
	    this.slide(this.index, 10); 
  	},
  	slide: function(index, duration) {
        if(typeof duration == "undefined")duration = this.speed;
        if(this.spTransform==undefined){
            this.spTransform=(LPW.isLteIE9() < 10 && LPW.isLteIE9() > 5) || !LPW.supportCss3('transform');
        }
        this.beforeSilder(index);
        if(!this.spTransform){
            LPW.transformTo(this.element, -index*this.width, 0, 0, duration);
            this.endSilder(index,this.slides.length);
            this.resume();
        }else{
            var begin  = parseInt(LPW.getStyle(this.element, 'margin-left')),
                end = -index*this.width,
                isRight = (begin>end) ? 1 : (begin<end) ? 0 : 1,
                change = isRight ? -this.width : this.width,
                easeInOut = function(pos){
                    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,2);
                    return -0.5 * ((pos-=2)*pos - 2);
                },
                startTime = new Date().getTime(),
                scope = this,
                ftps = 1000/50,
                delta = 0,
                timestamp,
                newTime;
            (function(){
                setTimeout(function(){
                    newTime = new Date().getTime();
                    timestamp = newTime - startTime;
                    delta = easeInOut(timestamp / duration);
                    LPW.setStyle(scope.element, 'margin-left', Math.ceil(begin + delta * change) + 'px');
                    if(duration <= timestamp){
                        LPW.setStyle(scope.element, 'margin-left', end + 'px');
                        scope.endSilder(index,scope.slides.length);
                        scope.resume();
                    }else{
                        setTimeout(arguments.callee, ftps);
                    }
                },ftps)
            })();
        }
        this.index = index;
  	},
  	setPos: function(i) {
  		this.index = i || 0;
  	},
  	getPos: function() {
  		return this.index;
  	},
  	swipeTo:function(index,delay) {
  		this.delay = delay || 0;
	    clearTimeout(this.interval);
		this.slide(index, this.speed);
	},
  	prev: function(delay) {
	    this.delay = delay || 0;
	    clearTimeout(this.interval);
	    if (this.index) this.slide(this.index-1, this.speed);
        else this.slide(this.length - 1, this.speed);
  	},
  	next: function(delay) {
	    this.delay = delay || 0;
	    clearTimeout(this.interval);
	    if (this.index < this.length - 1) this.slide(this.index+1, this.speed);
	    else this.slide(0, this.speed);
  	},
  	begin: function() {
	    var _this = this;
	    this.interval = (this.delay)
	      ? setTimeout(function() { 
	        _this.next(_this.delay);
	      }, this.delay)
	      : 0;
  	},
  	stop: function() {
	    this.delay = 0;
	    clearTimeout(this.interval);
  	},
  	resume: function() {
  		this.delay = this.options.autoDelay || 0;
  		this.begin();
  	},
    getSilderCount:function(count){
        if(this.sildersInPage>1){
            var mod = count%this.sildersInPage;
            return mod>0 ? ((count-mod)/this.sildersInPage+1) : (count/this.sildersInPage);
        }else{
            return this.slides.length;
        }
    }
};