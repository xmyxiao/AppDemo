//页面
$(function(){
	var Request=new UrlSearch();
	var hrefGuid = Request.guid;
	$("#guid").text(hrefGuid);
	var returnUrl =  MesApp.param.httpUrl + "/mesInterface/TaskControl/getViolationInfo.json?guid=" + hrefGuid;	
	$.get(returnUrl, function(data){
		if(data.succeed){
			var config = {
				cftzsNo : data.data.cftzsNo || "",
				fmoney : data.data.fmoney || "",
				ftime : data.data.ftime || "",
				ftype : data.data.ftype || "",
				funits : data.data.funits || "",
				fsite : data.data.fsite  || "",
				bkhr : data.data.bkhr  || "",
				fcontent : data.data.fcontent   || ""
			}
			$(".app-js-fnumber").text(config.cftzsNo);
			$(".app-js-money").text(config.fmoney);
			$(".app-date-text").text(config.ftime);
			$(".app-punish-type").text(config.ftype);
			$("#depResult").text(config.funits);
			$(".app-js-content").text(config.fcontent);
			$(".app-js-site").text(config.fsite);
			$("#userResult").text(config.bkhr);
			
			if(data.data.fPicture){
				var fileUrl = JSON.parse(data.data.fPicture);
				for(var key in fileUrl){
					var htm = '<li class="table-img-item"><img src='+fileUrl[key]+' /></li>';
					$("#showImg").append($(htm));
				}
			}
			
		}
	});
})
//提交
function formSubmit(){
	if($(".app-btn-submit").hasClass("hasSumit")){
		return false;
	}
	// 按钮有.mui-active为true
	var newUrl = MesApp.param.httpUrl + "/app/interface/postSucced.json"
	var picUrl = {};
	var $picList = $("#showImg .table-img-item") || "";
	if($picList.length > 0){
		for(var i =0; i < $picList.length; i++){
			var imgUrl = $($picList[i]).find("img").attr("src");
			picUrl["file" + i] = imgUrl;
		}
	}
	picUrl = JSON.stringify(picUrl);
	$.ajax({
		type : 'POST',
		url : newUrl,
		data : {
			guid:$("#guid").text(),
			bkhr:$("#userResult").text(),
			funits:$("#depResult").text(),
			cftzsNo:$(".app-js-fnumber").text(),
			fcontent:$(".app-js-content").text(),
			ftype:$(".app-punish-type").text(),
			ftime:$(".app-date-text").text(),
			fsite:$(".app-js-site").text(),
			fmoney:$(".app-js-money").text(),
			fPicture:picUrl
		},
		success: function(data){
			if(data.succeed){
				$(".app-btn-submit").addClass("hasSumit");
				var to = "13696@192.168.4.57";
				var msgTime = getTime();
				var messageType = "message";
				var body = {
					"content": $(".app-js-content").text(),
					"name": "卢飞 ",
					"fnumber": $(".app-js-fnumber").text(),
					"fstate": "1",
					"time": msgTime,
					"title": "违章处罚",
					"units": "安环部",
					//"url": MesApp.param.httpUrl+'/app/demo/punish-detailed.html?guid=' + $("#guid").text(),
					"userid": "13696",
					"id":$("#guid").text()
				};
				body = JSON.stringify(body);
				/*var body = '{"content": "'+$("#textarea").val()+'","name": "卢飞 ","fnumber": "'+$(".app-js-fnumber").text()+'",'
					 + '"fstate": "1","time": "'+msgTime+'","title": "隐患整改通知单",'
					 + '"funits": "安环部","furl": "'+MesApp.param.httpUrl+'/app/demo/task1.html",'
					 + '"userid": "13696","id":"'+$("#guid").text()+'"}';*/
				pageSendMessage(to,messageType,body);
				mui.alert('', '提交成功', function() {
					closePage();
				});
			}else{
				$(".app-btn-submit").removeClass("hasSumit");
				mui.alert("",data.errmsg);
			}
		},
		error: function(data){
			$(".app-btn-submit").removeClass("hasSumit");
			mui.alert("","提交失败");
		}
	});
}