$(function(){
    var fl_box = '<style type="text/css">'+
	'#sqlj{ width: 880px; border: 1px solid #e3e3e3; padding: 0 0 20px; background: #fff; *zoom:1; font-size: 12px;z-index:999;}'+
	'#sqlj:after,#sqlj .lj_l dl:after{ clear: both; display: block; content: "\\200B"; height: 0;}'+
	'#sqlj .t{ display: block; height: 30px; line-height: 30px; padding: 0 0 0 12px; margin: 0 0 10px; font-size: 14px; background: #d0dbef;}'+
	'#sqlj .lj_l{ float:left; width: 560px;}'+
	'#sqlj .lj_l dl{ margin: 0; padding: 5px 0; *zoom:1;}'+
	'#sqlj dt{ float: left; width: 80px; text-align: right; padding: 0 0 0 20px; height: 28px; line-height: 28px;}'+
	'#sqlj dt i{ color: #f00; margin: 0 5px 0 0; font-style: normal;}'+
	'#sqlj dd{ float: left; width: 460px; margin: 0; line-height: 28px;}'+
	'#sqlj label{ margin: 0 10px 0 0;}'+
	'#sqlj dd input{ display: inline-block; margin: 0 5px 0 0; vertical-align: middle;}'+
	'#sqlj dd .txt{ width:360px; height: 28px; line-height: 28px; padding: 0 10px; border: 1px solid #ccc;}'+
	'#sqlj dd .text{ width: 360px; height: 100px; padding:5px 10px; line-height: 20px; border: 1px solid #ccc;resize: none;overflow:hidden}'+
	'#sqlj .btn{ padding: 0 10px; line-height: 24px; cursor: pointer; border:1px solid #1a67cb;color:#fff;background:#F5AA2B;box-shadow:0 -2px 2px rgba(255,255,255,0.25) inset; *border: none;'+
    'background: #2d8ee2;'+
    'background: -moz-linear-gradient(top,  #2d8ee2 2%, #2683d8 100%);'+
    'background: -webkit-gradient(linear, left top, left bottom, color-stop(2%,#2d8ee2), color-stop(100%,#2683d8));'+
    'background: -webkit-linear-gradient(top,  #2d8ee2 2%,#2683d8 100%);'+
    'background: -o-linear-gradient(top,  #2d8ee2 2%,#2683d8 100%);'+
    'background: -ms-linear-gradient(top,  #2d8ee2 2%,#2683d8 100%);'+
    'background: linear-gradient(to bottom,  #2d8ee2 2%,#2683d8 100%);'+
    'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#2d8ee2", endColorstr="#2683d8",GradientType=0 );}'+
	'#sqlj .lj_r{ float:right; width: 280px; padding: 10px 30px 0 0;}'+
	'#sqlj p{ line-height: 18px; margin: 10px 0; color: #777;}'+
	'#sqlj dd .txt:hover,#sqlj dd .text:hover{border:1px #a6a6a6 solid;border-top-color:#808080;}'+
	'#sqlj dd .txt:focus,#sqlj dd .text:focus{border:1px #07f solid;outline:1px #8cddff solid;}'+
    '#sqljbg{ width:100%; height:100%; background:#000; position:absolute; left:0; top:0;filter: alpha(opacity=50);-moz-opacity: 0.5;-khtml-opacity: 0.5;opacity: 0.5; z-index:998;}#sqlj .t a{ float: right; text-decoration: none; font-size: 14px; color: #333; font-weight: normal; font-family: arial; margin: 0 10px 0 0;}'+
	'#sqlj .t a:hover{ color: #ff5203; text-decoration: none;}</style>'+
    '<div id="sqljbg"></div>'+
    '<div id="sqlj">'+
		'<b class="t"><a href="javascript:void(0);" id="sqljBox_close" target="_top">X</a>友情链接申请</b>'+
		'<div class="lj_l"><form method="post" id="sqljForm">'+
			'<dl>'+
				'<dt><i>*</i>申请链接：</dt>'+
				'<dd>'+
					'<label for="lj1"><input type="radio" name="category_id" value="1" id="lj1" checked>网站首页</label>'+
					'<label for="lj2"><input type="radio" name="category_id" value="4" id="lj2">新房频道</label>'+
					'<label for="lj3"><input type="radio" name="category_id" value="10" id="lj3">优惠楼盘</label>'+
					'<label for="lj4"><input type="radio" name="category_id" value="11" id="lj4">新闻频道</label>'+
					'<label for="lj5"><input type="radio" name="category_id" value="9" id="lj5">房价频道</label><br />'+
                    '<label for="lj6"><input type="radio" name="category_id" value="2" id="lj6">二手房频道</label>'+
                    '<label for="lj7"><input type="radio" name="category_id" value="5" id="lj7">租房频道</label>'+
				'</dd>'+
			'</dl>'+
            '<dl>'+
				'<dt><i>*</i>链接名：</dt>'+
				'<dd>'+
					'<input type="text" class="txt" name="link_name" maxlength="8">'+
				'</dd>'+
			'</dl>'+
            '<dl>'+
                '<dt><i>*</i>链接地址：</dt>'+
				'<dd>'+
					'<input type="text" class="txt" value="http://" name="link">'+
				'</dd>'+
			'</dl>'+
			'<dl>'+
				'<dt><i>*</i>联系QQ：</dt>'+
				'<dd>'+
					'<input type="text" class="txt" name="qq">'+
				'</dd>'+
			'</dl>'+
			'<dl>'+
				'<dt>申请说明：</dt>'+
				'<dd>'+
					'<textarea class="text"  name="remarks"></textarea>'+
				'</dd>'+
			'</dl>'+
			'<dl>'+
				'<dt></dt>'+
				'<dd>'+
					'<input type="submit" class="btn" value="提 交">'+
				'</dd>'+
			'</dl>'+
		'</form></div>'+
		'<div class="lj_r">'+
			'<b>申请说明：</b>'+
			'<p>有意与本站交换链接的网站请注意：</p>'+
			'<p>1、贵网站要求为房产相关网站；</p>'+
			'<p>2、首页友情链接，要求pr >= 2，alexa < 100万；其他页面链接根据具体页面而定（请具体咨询）；</p>'+
			'<p>3、贵网站要在百度、google都有记录收录，且网站各项SEO指标健康。</p>'+
		'</div>'+
	'</div>';
    is_flBox_load = false;
    function formSubmit()
    {            
        $.post('/extra/friend_link_application/', $('#sqljForm').serialize(), function(msg) {
            if(msg.code==0)
                alert("添加成功"),$('#sqlj,#sqljbg').hide();
            else
                alert(msg.msg);
        },'json');
    }
    
    function checkqq(qq)
    {
        var reg= new RegExp("^[1-9]{1}[0-9]{5,13}$");
        if(!reg.test(qq))
            return false;
        return true;
    }
    
    function checkname(name)
    {
        var reg= new RegExp("^[0-9a-zA-Z\\u4E00-\\u9FA5]{1}[0-9a-zA-Z\\u4E00-\\u9FA5_]{0,6}[0-9a-zA-Z\\u4E00-\\u9FA5]{1}$");
        if(!reg.test(name))
            return false;
        return true;
    }
    
    function checkurl(url){ 
        valid = url.match(/http(s)?:\/\/.+/); 
        if (valid == null){ 
            return false; 
        }else{ 
            return true; 
        } 
    } 
    
    function formCheck()
    {
        var ifcheck = false;
        $("#sqljForm").find("input[name=category_id]").each(function(){
            if($(this).prop("checked"))
                ifcheck = true;
        })
        if(!ifcheck)
            return alert('请选择申请页面'),false;
        if(!checkname($("#sqljForm").find("input[name=link_name]").val()))
            return alert('链接名称格式错误，只允许非下划线开头结尾的字母、数字、中文、下划线组合'),false;
        if(!checkurl($("#sqljForm").find("input[name=link]").val()))
            return alert('链接地址格式错误'),false;    
        if(!checkqq($("#sqljForm").find("input[name=qq]").val()))
            return alert('qq号码格式错误'),false;
        return true;
    }
    
    function showDiv1(obj){
         center(obj);
         $(window).scroll(function(){
          center(obj);
         });
         $(window).resize(function(){
          center(obj);
         }); 
    }

    function center(obj){  
     var windowHeight = document.documentElement.clientHeight;   
     var popupHeight = $(obj).height();    
     $(obj).css({   
      "position": "absolute",   
      "top": (windowHeight-popupHeight)/2+$(document).scrollTop(),
      "left":'50%',
      "marginLeft":'-441px'
     });  
    }
    /*$("#qqimg").append('<a href="javascript:void(0)" target="_self" class="showFlBox" Style=" color:#2a60ab; font-weight:bold">友情链接申请</a>'),*/
		$(".showFlBox").bind('click',function(){
        if(!is_flBox_load)
        {
            $("#ljsqBox").append(fl_box);
            $("#sqljbg").height($(document).height());
            showDiv1($("#sqlj"));
            is_flBox_load = true;
            $('#sqljBox_close').bind('click',function(){
                $('#sqlj,#sqljbg').hide();
            });
            $('#sqljForm').bind('submit',function(){
                if(formCheck())
                    formSubmit();
                return false;
            });
        }
        else
            $('#sqlj,#sqljbg').show();
    });
});
