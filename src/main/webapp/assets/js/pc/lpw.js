(function(){
    if(!window.XMLHttpRequest){
        window.XMLHttpRequest = (function(){
            var xmlhttps = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP'],
                length = xmlhttps.length,
                i = 0;
            for(; i<length; i++){
                try{
                    var xmlHttp = new ActiveXObject(xmlhttps[i]);
                    return xmlHttp;
                }catch(e){}
            }
            return null;
        })()
    }
    if(!Function.prototype.bind) { 
        Function.prototype.bind = function (oThis) { 
            if (typeof this !== "function") { 
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable"); 
            } 
            var aArgs = Array.prototype.slice.call(arguments, 1), 
            fToBind = this, 
            fNOP = function () {}, 
            fBound = function () { 
            return fToBind.apply(this instanceof fNOP && oThis 
            ? this 
            : oThis, 
            aArgs.concat(Array.prototype.slice.call(arguments))); 
            }; 
            fNOP.prototype = this.prototype; 
            fBound.prototype = new fNOP(); 
            return fBound; 
        }; 
    }
    if((typeof JSON !== 'object')){
        JSON = {};
        (function () {
            function f(n) {
                return n < 10 ? '0' + n : n;
            }
            if (typeof Date.prototype.toJSON !== 'function') {
        
                Date.prototype.toJSON = function () {
        
                    return isFinite(this.valueOf())
                        ? this.getUTCFullYear()     + '-' +
                            f(this.getUTCMonth() + 1) + '-' +
                            f(this.getUTCDate())      + 'T' +
                            f(this.getUTCHours())     + ':' +
                            f(this.getUTCMinutes())   + ':' +
                            f(this.getUTCSeconds())   + 'Z'
                        : null;
                };
        
                String.prototype.toJSON      =
                    Number.prototype.toJSON  =
                    Boolean.prototype.toJSON = function () {
                        return this.valueOf();
                    };
            }
        
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                gap,
                indent,
                meta = {    // table of character substitutions
                    '\b': '\\b',
                    '\t': '\\t',
                    '\n': '\\n',
                    '\f': '\\f',
                    '\r': '\\r',
                    '"' : '\\"',
                    '\\': '\\\\'
                },
                rep;
            function quote(string) {
                escapable.lastIndex = 0;
                return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                    var c = meta[a];
                    return typeof c === 'string'
                        ? c
                        : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"' : '"' + string + '"';
            }
            function str(key, holder) {
                var i,          
                    k,          
                    v,          
                    length,
                    mind = gap,
                    partial,
                    value = holder[key];
                if (value && typeof value === 'object' &&
                        typeof value.toJSON === 'function') {
                    value = value.toJSON(key);
                }
                if (typeof rep === 'function') {
                    value = rep.call(holder, key, value);
                }
                switch (typeof value) {
                case 'string':
                    return quote(value);
                case 'number':
                    return isFinite(value) ? String(value) : 'null';
                case 'boolean':
                case 'null':
                    return String(value);
                case 'object':
                    if (!value) {
                        return 'null';
                    }
                    gap += indent;
                    partial = [];
                    if (Object.prototype.toString.apply(value) === '[object Array]') {
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }
                        v = partial.length === 0
                            ? '[]'
                            : gap
                            ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                            : '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }
                    if (rep && typeof rep === 'object') {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            if (typeof rep[i] === 'string') {
                                k = rep[i];
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    } else {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }
        
                    v = partial.length === 0
                        ? '{}'
                        : gap
                        ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                        : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
                }
            }
            if (typeof JSON.stringify !== 'function') {
                JSON.stringify = function (value, replacer, space) {
                    var i;
                    gap = '';
                    indent = '';
                    if (typeof space === 'number') {
                        for (i = 0; i < space; i += 1) {
                            indent += ' ';
                        }
                    } else if (typeof space === 'string') {
                        indent = space;
                    }
                    rep = replacer;
                    if (replacer && typeof replacer !== 'function' &&
                            (typeof replacer !== 'object' ||
                            typeof replacer.length !== 'number')) {
                        throw new Error('JSON.stringify');
                    }
                    return str('', {'': value});
                };
            }
            if (typeof JSON.parse !== 'function') {
                JSON.parse = function (text, reviver) {
                    var j;
                    function walk(holder, key) {
                        var k, v, value = holder[key];
                        if (value && typeof value === 'object') {
                            for (k in value) {
                                if (Object.prototype.hasOwnProperty.call(value, k)) {
                                    v = walk(value, k);
                                    if (v !== undefined) {
                                        value[k] = v;
                                    } else {
                                        delete value[k];
                                    }
                                }
                            }
                        }
                        return reviver.call(holder, key, value);
                    }
                    text = String(text);
                    cx.lastIndex = 0;
                    if (cx.test(text)) {
                        text = text.replace(cx, function (a) {
                            return '\\u' +
                                ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                        });
                    }
                    if (/^[\],:{}\s]*$/
                            .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                                .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                        j = eval('(' + text + ')');
                        return typeof reviver === 'function'
                            ? walk({'': j}, '')
                            : j;
                    }
                    throw new SyntaxError('JSON.parse');
                };
            }
        }());
    }
	var win=window,
		doc=document,
		na=navigator.appVersion,
		docElem=doc.documentElement,
		w3c='addEventListener' in doc,
        ua = navigator.userAgent.toLowerCase(),
        check = function(r){
            return r.test(ua);
        },
        isIE = !check(/opera/) && check(/msie/),
        fnEmpty=function(){},
	LPW={
		version:'1.0',
        propCache:{},
        classCache:[],
        /**
        IE10标准模式和Quirks模式不在支持条件注释。
        http://msdn.microsoft.com/zh-cn/library/ie/hh801214(v=vs.85).aspx
        */
        isLteIE9 : function(){
            if(!this.ieversion && this.ieversion != 0 ){
                var v = 4, d = doc.createElement('p');
                while(
                    d.innerHTML = '<!--[if gt IE '+(++v)+']><i></i><![endif]-->',
                    d.getElementsByTagName('i')[0]
                );
                this.ieversion = ((v >= 6) ? v : 0);
            }
            return this.ieversion;
        },
		apply:function(o,c,defaults){    
		    if(defaults){
		    	LPW.apply(o,defaults);
		    }
		    if(o && c && typeof c=='object'){
		        for(var p in c){
		            o[p]=c[p];
		        }
		    }
		    return o;
		},
		getAttr:function(e,a){
			return e && e.getAttribute(a);
		},
		setAttr:function(e,a,v){
			e && e.setAttribute(a,v);
		},
		rmAttr:function(e,a){
			e && e.removeAttribute(a);
		},
        setText:function(e,t){
            if(e){
                if(e.innerText){
                    e.innerText=t;
                }else{
                    e.textContent=t;
                }
            }
        },
        getText:function(e){
            return e && (e.innerText||e.textContent);
        },
		show:function(e){
			e && e.style && (function(){
                if(e.style.display !='block')e.style.display='block';
            })()
		},
		hide:function(e){
			e && e.style && (function(){
                if(e.style.display !='none')e.style.display='none';
            })()
		},
		format:function(s){
		    var args=Array.prototype.slice.call(arguments,1);
		    return s.replace(/\{(\d+)\}/g, function(m,i){
		        return args[i];
		    });
		},
		isArray:function(v){
			return this.toString.apply(v)==='[object Array]';
		},
		getEl:function(el){
            if( !el ){
                return null;
            }
			return el.dom ? el.dom : (typeof el == 'string' ? doc.getElementById(el) : el);
		},
		getTag:function(oParent,tagName){
			return oParent.getElementsByTagName(tagName);
		},
        addClass:function(el,className){
            el = this.getEl(el);
            if(className && !this.hasClass(el, className)){
                el.className = el.className + " " + className;
            }
        },
        removeClass:function(el, className){
            el = this.getEl(el);
            if(!el || !className || !el.className)return;
            
            if(this.hasClass(el, className)){
                var re = this.classCache[className];
                if (!re) {
                   re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', "g");
                   this.classCache[className] = re;
                }
                el.className = el.className.replace(re, " ");
            }
        },
        setClass:function(el,className){
            el = this.getEl(el);
            el.className = className;
        },
		getClass:function(className,oParent){
            var result=[];
            if(oParent.getElementsByClassName){
            	var aClass=oParent.getElementsByClassName(className);
                for(var i=0,j=0,l=aClass.length; i<l; i++){
                	result[j++]=aClass[i];
                }
            }else{        
            	var allEls=oParent.getElementsByTagName('*');
                for(var i=0,l=allEls.length; i<l; i++){
                	var perEle = ' ' +allEls[i].className+ ' ';
                	if(perEle.indexOf(' '+className+' ') != -1){
                		result.push(allEls[i]);
                    }                                                        
                }
            }                        
            return result;
		},
        hasClass:function(el,className){
            el = this.getEl(el);
            return className && (' '+el.className+' ').indexOf(' '+className+' ') != -1;
        },
        applyStyles: function(el, styles){
            el = this.getEl(el);
            if(styles){
               if(typeof styles == "string"){
                    var re = /\s?([a-z\-]*)\:\s?([^;]*);?/gi,
                        matches;
                    while ((matches = re.exec(styles)) != null){
                        this.setStyle(el, matches[1], matches[2]);
                    }
               }else if (typeof styles == "object"){
                    for (var style in styles){
                        this.setStyle(el, style, styles[style]);
                    }
               }else if (typeof styles == "function"){
                    this.applyStyles(el, styles.call());
               }
            }
        },
        getStyles: function(el){        
            var a = arguments, len = a.length, r = {};
            for(var i = 1; i < len; i++){
                r[a[i]] = this.getStyle(el, a[i]);
            }
            return r;
        },
        getStyle: (doc.defaultView && doc.defaultView.getComputedStyle) ?
        function(el, prop){
            el = this.getEl(el);
            var v, cs, camel;
            if(prop == 'float'){
                prop = "cssFloat";
            }
            if(v = el.style[prop]){
                return v;
            }
            if(cs = doc.defaultView.getComputedStyle(el, "")){
                if(!(camel = this.propCache[prop])){
                    camel = this.propCache[prop] = 
                    prop.replace(/(-[a-z])/gi, function(m, a){ 
                        return a.charAt(1).toUpperCase(); 
                    });
                }
                return cs[camel];
            }
            return null;
        } : 
        function(el, prop){
            el = this.getEl(el);
            var v, cs, camel;
            if(prop == 'opacity'){
                return this.getOpacity(el);
            }else if(prop == 'float'){
                prop = "styleFloat";
            }
            if(!(camel = this.propCache[prop])){
                camel = this.propCache[prop] = 
                prop.replace(/(-[a-z])/gi, function(m, a){ 
                    return a.charAt(1).toUpperCase(); 
                });
            }
            if(v = el.style[camel]){
                return v;
            }
            if(cs = el.currentStyle){
                return cs[camel];
            }
            return null;
        },
        setStyle: function(el, prop, value){
            el = this.getEl(el);   
            if(typeof prop == "string"){
                var camel;
                if(!(camel = this.propCache[prop])){
                    camel = this.propCache[prop] = 
                    prop.replace(/(-[a-z])/gi, function(m, a){ 
                        return a.charAt(1).toUpperCase(); 
                    });
                }
                switch(camel){
                    case 'opacity': this.setOpacity(el, value); break;
                    case 'float': camel = isIE ? 'styleFloat' : 'cssFloat'; break;
                    default:el.style[camel] = value;
                }
            }else{
                for(var style in prop){
                    if(typeof prop[style] != "function"){
                       this.setStyle(el, style, prop[style]);
                    }
                }
            }    
        },
        isStyle : function(el, style, val) {        
            return this.getStyle(el, style) == val;
        },
        setBgOpacity: function(el, opacity){
            el = this.getEl(el);
            opacity = parseFloat(opacity);
            var s = el.style,
                ie = LPW.isLteIE9();
            if(ie>=6 && ie<9){
                s.zoom = 1;
                var c = (opacity*255).toString(16);
                c = ((opacity==0)?'0':(c.substr(0,2))) +'000000';
                s.filter = 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#'+c+',endColorstr=#'+c+')';
                //LPW.setStyle(el,'backgroundColor','#000000');
                //LPW.setOpacity(el, opacity);
            }else{
                s.backgroundColor = "rgba(0,0,0,"+opacity+")";
            }
        },
        setOpacity: function(el, opacity){
            el = this.getEl(el);
            opacity = parseFloat(opacity);
            var s = el.style;
            if(isIE){
                s.zoom = 1;
                s.filter = (s.filter || '').replace(/alpha\([^\)]*\)/gi,"") +
                    (opacity == 1 ? "" : " alpha(opacity=" + opacity * 100 + ")");
            }else{
                s.opacity = opacity;
            }
        },
        getOpacity: function(el){
            el = this.getEl(el);
            var s = el.style;
            if(typeof s.filter == 'string'){
                var m = s.filter.match(/alpha\(opacity=(.*)\)/i);
                if(m){
                    var fv = parseFloat(m[1]);
                    if(!isNaN(fv)){
                        return fv ? fv / 100 : 0;
                    }
                }
                return 1;    
            }else{
                return parseFloat(s.opacity) || 1;
            }        
        },
		serialize:function(obj) {
			if(typeof(JSON)!=='undefined'){
				return JSON.stringify(obj);
			}
		},
		deserialize:function(obj) {
			if (typeof obj != 'string')return undefined;
			if(typeof(JSON)!=='undefined'){
				return JSON.parse(obj);
			}
		},
		addHandler:function(e,t,f,s){
			if(e){
                s = s || window;
                var closure = function(event){
                    event = event || window.event; 
                    event.target = event.target || event.srcElement; 
                    return f.apply(s || this, arguments); 
                }
                e.eventQueue = e.eventQueue || {};
                (e.eventQueue [t] = e.eventQueue [t] || []).push({ 
                    name:t, 
                    handler:f,
                    fn:closure, 
                    scope:s
                });
		        if(e.addEventListener){
		            e.addEventListener(t,closure,false);
		        }else if(e.attachEvent){
		            e.attachEvent("on"+t,closure);
		        }else{
		            e["on"+t]=closure;
		        }
			}
	    },
	    removeHandler:function(e,t,f,s){
	    	if(e){
                s = s || window;
                e.eventQueue = e.eventQueue || {}; 
                var events = e.eventQueue [t] || [], 
                    len = events.length;
                for (;len--;){
                    var eventObj = events[len]; 
                    if (eventObj.name == t && eventObj.handler === f && eventObj.scope === s) { 
                        if(e.addEventListener){
                            e.removeEventListener(t,eventObj.fn,false);
                        }else if (e.detachEvent){
                            e.detachEvent("on"+t,eventObj.fn);
                        }else{
                            e["on" + t] = null; 
                        }
                        events.splice(len, 1);
                    }
                }
	    	}
	    },
        addHover:function(el,overCall, outCall, scope){
            el = this.getEl(el);
            this.addHandler(el, 'mouseover', overCall, scope);
            this.addHandler(el, 'mouseout', outCall, scope);
        },
        removeHover:function(el,overCall, outCall, scope){
            el = this.getEl(el);
            this.removeHandler(el, 'mouseover', overCall, scope);
            this.removeHandler(el, 'mouseout', outCall, scope);
        },
	    getEvent:function(e){
	    	return e ? e : win.event;
	    },
	    getTarget:function(e){
	    	return e.target || e.srcElement;
	    },
	    preventDefault:function(e){
	    	if(e.preventDefault){
	    		e.preventDefault();
	    	}else{
	    		e.returnValue = false;
	    	}
	    },
	    stopPropagation:function(e){
	    	if (e.stopPropagation){
		    	e.stopPropagation();
			} else {
		    	e.cancelBubble = true;
		    }
	    },
        forEach:function(arr, callback) {
			var i = 0, 
                len = arr.length;
			for (;i < len; i += 1 ) {
				callback(arr[i]);
			}
		},
		getPrefix:function(){
            var prefixs = ['t', 'webkitT', 'MozT', 'msT', 'OT'], 
                style = docElem.style,
                transform, 
                r;
			this.forEach(prefixs, function (v) {
				transform = v + 'ransform';
				if (transform in style) {
					r = v.substr(0, v.length - 1);
				}
			});
			return r;
        },
        supportCss3:(function(){ 
            var div = doc.createElement('div'), 
                vendors = 'khtml,o,ms,moz,webkit'.split(','); 
            return function(prop) { 
                if ( prop in div.style ) return true; 
                if ('-ms-' + prop in div.style) return true; 
                prop = prop.replace(/^[a-z]/, function(val) { 
                    return val.toUpperCase(); 
                }); 
                var len = vendors.length;
                while(len--) { 
                    if ( vendors[len] + prop in div.style ) { 
                        return true; 
                    } 
                } 
                return false; 
            }
        })(),
		transformTo:function(e,x,y,z,d,t){
			x=x?(x+'px'):0;
			y=y?(y+'px'):0;
			z=z?(z+'px'):0;
			var S=e.style;
			S.webkitTransitionDuration=S.MozTransitionDuration=S.msTransitionDuration=
				S.OTransitionDuration=S.transitionDuration=d+'ms';
            S.webkitTransitionTimingFunction=S.MozTransitionTimingFunction=S.msTransitionTimingFunction=
				S.OTransitionTimingFunction=S.transitionTimingFunction=t||'linear';
			S.MozTransform=S.webkitTransform='translate3d('+x+','+y+','+z+')';
			S.transform=S.OTransform=S.msTransform='translate('+x+','+y+')';
		},
		encodeURL:function(hs){
	        var s=[],
                v;
	        for(var j in hs){
                v = hs[j];
                if(typeof(v) == 'object'){
                    v = T.serialize(v);
                }
	            s.push(encodeURIComponent(j)+"="+encodeURIComponent(v));
	        }
	        return s.join("&");
	    },
	    loadScript:function(url,callback){
            var script=document.createElement("script");
            script.type="text/javascript";
            if(script.readyState){  
            	script.onreadystatechange=function(){
                	if(script.readyState=="loaded" || script.readyState =="complete"){
                    	script.onreadystatechange=null;
                        callback();
                    }
                };
            }else{
            	script.onload = function(){
                	callback();
                };
		    }
            script.src=url;
            document.body.appendChild(script);
		},
		preLoad:function(fileList){
			if(Object.prototype.toString.call(fileList) !== "[object Array]"){
				return;
			}
			var i = 0,
				obj = null,
				isIe = '\v'=='v',
				length = fileList.length;
			for(;i<length;i++){
		        if (isIe){
		            new Image().src=this.fileList[i];
		            continue;
		        }
		        obj=doc.createElement('object');
		        obj.data=fileList[i];
		        obj.width=0;
		        obj.height=0;
		        doc.body.appendChild(obj);
		    }
		},
        windowWidth : function () {
            'use strict';
            if (window.innerWidth) return window.innerWidth;
            else if (document.documentElement && document.documentElement.clientWidth) return document.documentElement.clientWidth;
        },
        windowHeight : function () {
            'use strict';
            if (window.innerHeight) return window.innerHeight;
            else if (document.documentElement && document.documentElement.clientHeight) return document.documentElement.clientHeight;
        },
        ajax:{
            equId:1,
            jsonp:{},
            configs:{},
            getAjax:function(id){
                return this.configs[id];
            },
            request:function(config){
                var xmlHttp = new XMLHttpRequest();
                var c = T.apply({
                    url:null,
                    type:"get",
                    async:true,
                    cache:false,
                    params:null,
                    timeout:60000,
                    onSuccess:fnEmpty,
                    onFailure:fnEmpty,
                    onTimeOut:fnEmpty,
                    contentType:"application/x-www-form-urlencoded;charset=UTF-8",
                    request:xmlHttp,
                    abort:function(){
                        if(this._timer){
                            window.clearTimeout(this._timer);
                            this._timer = null;
                        }
                        var http = this.request;
                        if(http){       
                            http.onreadystatechange = fnEmpty;
                            http.abort();
                            this.onFailure(0, this);                   
                        }
                    }
                }, config);
                var data = T.encodeURL(c.params);
                if (c.type.toLowerCase() == "post"){
                    xmlHttp.open(c.type, c.url, c.async);
                    xmlHttp.setRequestHeader("Content-Type", c.contentType);
                }else{
                    if(c.params){
                        c.url+=((c.url.indexOf("?")>-1)?"&":"?")+data;
                    }
                    if(c.cache==false){
                        c.url+=((c.url.indexOf("?")>-1)?"&":"?");
                        c.url+='_d='+new Date().getTime();
                    }
                    xmlHttp.open(c.type, c.url, c.async);
                }
                xmlHttp.setRequestHeader("X-Requested-With",'XMLHttpRequest');
                if(c.async){
                    xmlHttp.onreadystatechange = this.onreadystatechange.bind(c);
                }
                if(c.timeout > 0){
                    c._timer = window.setTimeout(function(){
                        c.onTimeOut(c);
                    }, c.timeout);
                }
                try {
                    if(c.async){
                        setTimeout(function(){
                            xmlHttp.send(data);
                        },1);
                    }else{
                        xmlHttp.send(data);
                    }
                } catch(e) {
                    c.onFailure(999, c);      
                }
                c.async || this.onreadystatechange.call(c, xmlHttp);
                var equId = this.equId++;
                this.configs[equId] = c;
                return equId;
            },
            abort:function(equId){
                var ajaxCfg = this.getAjax(equId);
                ajaxCfg && (ajaxCfg.abort());
                delete this.configs[equId];
            },
            onreadystatechange:function(){
                var http = this.request;
                if (http.readyState === 4) {
                    if(http.status === 200) {                            
                        this.onSuccess(http.responseText, this);        
                    }else{
                        this.onFailure(http.status, this);
                    }
                    this.abort();
                    http.onreadystatechange = fnEmpty;  
                }
            }
        },
	    onReady:function(callback){
	        var top = false,
	            isReady = false,
	            queueCallbacks = [];
	        function ready(fn){
	            if(!isReady){
	                if(!doc.body){
	                    return defer(ready);
	                }
	                isReady=true;
	                while(fn=queueCallbacks.shift()){
	                	defer(fn);
	                }
	            }    
	        }
	        function completed(event){
	            if(w3c || event.type==='load' || doc['readyState']==='complete'){
	            	detach();
	            	ready();
	            }
	        }
	        function detach(){
	            if(w3c){
	            	T.removeHandler(doc, 'DOMContentLoaded', completed);
	            	T.removeHandler(win, 'load', completed);
	            }else{
	            	T.removeHandler(doc, 'onreadystatechange', completed);
	            	T.removeHandler(win, 'onload', completed);
	            }
	        }
	        function defer(fn,wait){
	            setTimeout(fn,wait||1);
	        }
	        if(doc['readyState']==='complete'){
	        	defer(ready);
	        }else if(w3c){
	        	T.addHandler(doc, 'DOMContentLoaded', completed);
	        	T.addHandler(win, 'load', completed);
	        } else {
	        	T.addHandler(doc, 'onreadystatechange', completed);
	        	T.addHandler(win, 'onload', completed);
	            try {top = win.frameElement==null && docElem;}catch(e){}
	            if(top && top.doScroll){
	                (function doScrollCheck(){
	                    if(!isReady){
	                        try {
	                            top.doScroll("left");
	                        } catch(e) {
	                            return defer(doScrollCheck,50);
	                        }
	                        detach();
	                        ready();
	                    }
	                })();
	            } 
	        } 
	        return function(fn){ 
	            isReady ? defer(fn):queueCallbacks.push(fn);
	        }(callback);
	    },
        placeholderPlugin:{
            supportPlaceholder:(function(){  
                return 'placeholder' in doc.createElement('input');  
            })(),
            init:function() {  
                !this.supportPlaceholder && 
                (this.create(LPW.getTag(doc, 'input')));
            },
            create:function(inputs) {  
                !inputs.length && (inputs = [inputs]);
                var length = inputs.length,
                    input,
                    i = 0;  
                for (; i < length; i++) {  
                    input = inputs[i];  
                    if (!this.supportPlaceholder && 
                        input.attributes && input.attributes.placeholder) { 
                        T.placeholderPlugin.setValue(input);
                        T.addHandler(input, 'focus', function(e) { 
                            if (this.value === this.attributes.placeholder.nodeValue) {  
                                this.value = '';
                            }  
                        }, input);
                        T.addHandler(input, 'blur', function(e) {  
                            if (this.value === '') {  
                                T.placeholderPlugin.setValue(this);  
                            } 
                        }, input);
                    }else{
                        break;
                    }
                }  
            },  
            setValue: function(input) {  
                input.value = input.attributes.placeholder.nodeValue; 
            }  
        },
	    check:{
    		mobile:/^(13[0-9]|14[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0-9])\d{8}$/,
    		isMobile:function(phone){
    			return this.mobile.test(phone);
    		}
    	},
        fadeIn:function(el, speed, opacity, callback){
            speed = speed || 20;  
            opacity = opacity || 100;  
            this.setStyle(el, "display", "block");
            this.setOpacity(el, 0); 
            var count = 0; 
            var scope = this;
            (function(){  
                scope.setOpacity(el, count/100);  
                count += 5;  
                if (count <= opacity) {  
                    setTimeout(arguments.callee, speed)  
                }else{
                    callback && callback();
                }
            })();  
        }, 
        fadeOut:function(el, speed, opacity, callback){
            speed = speed || 20;  
            opacity = opacity || 0;  
            var count = 100;   
            var scope = this;
            (function(){  
                scope.setOpacity(el, count/100);   
                count -= 5;  
                if (count >= opacity) {  
                    setTimeout(arguments.callee, speed);  
                }else if (count < 0) {  
                    el.style.display = 'none';
                    callback && callback();
                }  
            })();  
        }
	};
	win.LPW = T = LPW;
})();