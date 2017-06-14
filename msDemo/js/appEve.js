var httpUrl = "http://192.168.4.57:8080";
(function(global){
	var MesApp;
	MesApp = global.MesApp = {};
	MesApp.param = {
		httpUrl : location.origin
	}
})(this);
$(function(){
	$(".app-title-icon.icon-sh").click(function(){
		//顶部列表按钮点击
	});
	$(".app-title-icon.icon-sousuo").click(function(){
		//顶部搜索按钮
	});
	$(".app-title-icon.icon-jtz").click(function(){
		//顶部返回按钮
		closePage();
	});
	$(".app-btn-return").click(function(){
		//底部返回
		closePage();
	});
	if($("#guid").length > 0){
		$("#guid").text(newGuid());
	}
	mui(".table-img-body").on('tap','.table-img-item',function(){
		showBigImg($(this).find("img").attr("src"));
	}) 
	$("#closeImg").click(function(){
		$("#showBigImg").hide();
		$("#showBigImg .showPicture-content img").attr("src","");
	});

});
function showBigImg(url){
	var $pictureWindow = $("#showBigImg");
	var $pictureContent = $("#showBigImg .showPicture-content");
	$("#showBigImg").show();
	var preloader = new Image();
	$(preloader).load(function(evt){
		var meWidth = preloader.width, 
		meHeight = preloader.height,
		maxWidth = $pictureContent.width(),
		maxHeight = $pictureContent.height();
		if(maxWidth<200){
			maxWidth = 200;
		}
		if(maxHeight<200){
			maxHeight = 200;
		}
		var percent = meWidth / meHeight;
		if(meWidth<=maxWidth&&meHeight<=maxHeight){//小图
			
		}else if(meWidth>maxWidth){//宽度大于最大宽度
			meWidth = maxWidth;
			meHeight = meWidth / percent;
			if(meHeight>maxHeight){//高度大于最大高度
				percent = maxHeight / meHeight;
				meWidth = meWidth*percent;
				meHeight = maxHeight;
			}
		}else if(meWidth<maxWidth){//宽度小于最大宽度
			if(meHeight>maxHeight){//高度大于最大高度
				percent = maxHeight / meHeight;
				meWidth = meWidth*percent;
				meHeight = maxHeight;
			}
		}
		meWidth = parseInt(meWidth);
		meHeight = parseInt(meHeight);
		if(meWidth<200&&meHeight<200){
			meWidth = 200;
			meHeight = meWidth / percent;
		}
		var picTop = ($pictureContent.height()-meHeight)/2,
		    picLeft = ($pictureContent.width()-meWidth)/2;
		$pictureContent.find("img").css({
										  "width":meWidth,
										  "height":meHeight,
										  "top":picTop,
										  "left":picLeft
										});
		$("#closeImg").css({
			"top":picTop - 12,
			"left":picLeft -12 + meWidth 
		});
		//$("#showChatPicture .pic-wrp").attr("style","width:"+meWidth+"px;height:"+meHeight+"px;top:"+picTop+"px;left:"+picLeft+"px;");
		$pictureWindow.find("img").attr("src",url);

		
	});
	preloader.src = url;
}
//关闭页面
function closePage(){
	var u = navigator.userAgent;
	if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
		kingkop.closeWindow();
	} else if (u.indexOf('iPhone') > -1) {//苹果手机
		kingkop_closeWindow();
	} else if (u.indexOf('Windows Phone') > -1) {//winphone手机
		kingkop.closeWindow();
	}
}
//发送消息
function pageSendMessage(to,messageType,body){
	var u = navigator.userAgent;
	if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
		kingkop.sendMessage(to,messageType,body);
	} else if (u.indexOf('iPhone') > -1) {//苹果手机
		kingkop_sendMessage(to,messageType,body);
	} else if (u.indexOf('Windows Phone') > -1) {//winphone手机
		kingkop.closeWindow();
	}
}
//生成guid
function newGuid() {
	var guid = "";
	for (var i = 1; i <= 32; i++) {
		var n = Math.floor(Math.random() * 16.0).toString(16);
		guid += n;
		if ((i == 8) || (i == 12) || (i == 16) || (i == 20)){
			guid += "-";
		}
	}
	return guid;
}
//获取地址栏参数
//example: var Request=new UrlSearch(); //实例化    alert(Request.id);
function UrlSearch(){
	var name,value;
	var str=location.href; //取得整个地址栏
	var num=str.indexOf("?")
	str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

	var arr=str.split("&"); //各个参数放到数组里
	for(var i=0;i < arr.length;i++){
		num=arr[i].indexOf("="); 
		if(num>0){
			name=arr[i].substring(0,num);
			value=arr[i].substr(num+1);
			this[name]=value;
		}
	}
}
function getTime(){
	var d = new Date();
	var meYear = d.getFullYear();
	var meMon = d.getMonth() + 1;
	var meDay = d.getDate();
	//meMon = ("00" + meMon).substr(("" + meMon).length);
	//meDay = ("00" + meDay).substr(("" + meDay).length);
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();
	var ms = d.getMilliseconds();
	h = ("00" + h).substr(("" + h).length);
	m = ("00" + m).substr(("" + m).length);
	s = ("00" + s).substr(("" + s).length);
	ms = ("000" + ms).substr(("" + ms).length);
	//var timesTamp = meYear + "-" + meMon + "-" + meDay + " " + h + ":" + m + ":" + s + "." + ms;
	var timesTamp = meMon + "月" + meDay + "日";
	return timesTamp;
}