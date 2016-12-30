function openWin(name, arg) {
    api.openWin({
        name: name,
        url: name + '.html',
        opaque: true,
        vScrollBarEnabled: false,
        pageParam: {arg: arg}
    });
}

function DAO(modelName) {
	var appId = 'A6916104895515';
	var key = 'D55C4A40-12C3-7265-56C5-E62D7E71CB2C';
	var client = new Resource(appId, key);
    if($api.getStorage('token')){
        client.setHeaders("authorization",$api.getStorage('token'));
    }    
	return client.Factory(modelName);
}

/**基础常量配置**/
var Constants = {
    APP_ID: 'A6916104895515',
    APP_KEY: 'D55C4A40-12C3-7265-56C5-E62D7E71CB2C',
    BASE_URL: 'http://192.168.1.36/ma',
    COOKIE_USER: 'COOKIE_USER',
};

/**ajax 调用 **/
function ajaxGet(url, success, error) {
    var now = Date.now();
    var appCode = SHA1(Constants.APP_ID + "UZ" + Constants.APP_KEY + "UZ" + now) + "." + now;
    $.ajax({
        "type": "GET",
        "url": Constants.BASE_URL + url,
        "headers": {
            "X-APICloud-AppId": Constants.APP_ID,
            "X-APICloud-AppKey": appCode
        },
        success: success,
        error: error
    });
}

function ajaxPost(url, data, success, error) {
    var now = Date.now();
    var appCode = SHA1(Constants.APP_ID + "UZ" + Constants.APP_KEY + "UZ" + now) + "." + now;
    $.ajax({
        "type": "POST",
        "url": Constants.BASE_URL + url,
        "headers": {
            "X-APICloud-AppId": Constants.APP_ID,
            "X-APICloud-AppKey": appCode
        },
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: success,
        error: error
    });
}

/*
 * 如果客户端当前无网络连接，则打开默认的错误页面
 */
function offline() {
    if(api.connectionType == 'none') {
        var header_h = $api.dom('header').offsetHeight;
        api.openFrame({
            name: 'offline',
            url: 'offline.html',
            bounces: false,
            vScrollBarEnabled: false,
            hScrollBarEnabled: false,
            rect: {
                x: 0,
                y: header_h,
                w: 'auto',
                h: 'auto'
            }
        });
        return true;
    }
    return false;
}

/* render */
function renderEl(elementId, data) {
    return doT.template($api.byId(elementId).text)(data);
}

function checkPhone(phone) {
    var res = !!phone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
    return res;
}

/* 
 * 检测用户是否已经登录
 */
function afterLogin(uid, user) {
	if(uid) {
		$api.setStorage('uid', uid);
	}
	if(user) {
		$api.setStorage('_user', user);
	}
	// 检测是否有未支付订单，若有跳转到支付界面
	var ware = $api.getStorage('action_place_order');
	if(ware) {
		openWin('order_place', ware);
		return;
	}
	api.execScript({
    	name: 'root',
        script: 'openTab("my");'
    });
    setTimeout(function() {
        api.closeToWin({name: 'root'});
    }, 800);
}

/* 
 * 对Date的扩展，将 Date 转化为指定格式的String 
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
 * 例子：   
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
 */
Date.prototype.format = function(fmt) { 
  var o = {
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt)) { 
	fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {  
    if(new RegExp("("+ k +")").test(fmt)) {
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    }
  }
  return fmt; 
}

function toLongDate(str) {
	return new Date(str).format('yyyy-MM-dd hh:mm:ss');
}

function toShortDate(str) {
	return new Date(str).format('yyyy-MM-dd');
}

function formatDateForObject(obj) {
	for(var p in obj) {
		if(p == 'createdAt' || p == 'updatedAt') {
			obj[p] = toLongDate(obj[p]);
		}
	}
	return obj;
}

function formatDateForArray(ary) {
	for(i in ary) {
		formatDateForObject(ary[i]);
	}
	return ary;
}

function SHA1(msg) {

  function rotate_left(n, s) {
    var t4 = (n << s) | (n >>> (32 - s));
    return t4;
  };

  function lsb_hex(val) {
    var str = "";
    var i;
    var vh;
    var vl;

    for (i = 0; i <= 6; i += 2) {
      vh = (val >>> (i * 4 + 4)) & 0x0f;
      vl = (val >>> (i * 4)) & 0x0f;
      str += vh.toString(16) + vl.toString(16);
    }
    return str;
  };

  function cvt_hex(val) {
    var str = "";
    var i;
    var v;

    for (i = 7; i >= 0; i--) {
      v = (val >>> (i * 4)) & 0x0f;
      str += v.toString(16);
    }
    return str;
  };


  function Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }

    return utftext;
  };

  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;

  msg = Utf8Encode(msg);

  var msg_len = msg.length;

  var word_array = new Array();
  for (i = 0; i < msg_len - 3; i += 4) {
    j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
    msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
    word_array.push(j);
  }

  switch (msg_len % 4) {
    case 0:
      i = 0x080000000;
      break;
    case 1:
      i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
      break;

    case 2:
      i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
      break;

    case 3:
      i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
      break;
  }

  word_array.push(i);

  while ((word_array.length % 16) != 14) word_array.push(0);

  word_array.push(msg_len >>> 29);
  word_array.push((msg_len << 3) & 0x0ffffffff);


  for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {

    for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
    for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;

    for (i = 0; i <= 19; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 20; i <= 39; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 40; i <= 59; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 60; i <= 79; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;

  }

  var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

  return temp.toLowerCase();

}
