//页面样式
$(function(){
	$(".danger-list-item").click(function(){
		$(".punish-row .danger-list-item").removeClass("select");
		$(this).addClass("select");
	});
})
//提交
function formSubmit(){
	if($(".app-btn-submit").hasClass("hasSumit")){
		return false;
	}
	var newUrl = MesApp.param.httpUrl + "/app/interface/postSucced.json";
	var picUrl = {};
	if($("#tableImg .table-img-item").length > 0){
		for(var i =0; i<$("#tableImg .table-img-item").length; i++){
			var imgUrl = $($("#tableImg .table-img-item")[i]).find("img").attr("src");
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
			fcontent:$("#textarea").val(),
			ftype:$(".danger-list-item.select").text(),
			ftime:$(".app-date-text").text(),
			fsite:$(".app-js-site input").val(),
			fmoney:$(".app-js-money input").val(),
			fgrade:$(".app-js-grade input").val(),
			fPicture:picUrl
		},
		success: function(data){
			if(data.succeed){
				$(".app-btn-submit").addClass("hasSumit");
				var to = "03012@192.168.4.57";
				var msgTime = getTime();
				var messageType = "task";
				var body = {
					"fcontent" : $("#textarea").val(),
					"fname": "卢飞",
					"fnumber": $(".app-js-fnumber").text(),
					"fstate": "0",
					"ftime": msgTime,
					"ftitle": "违章处罚",
					"funits": "安环部",
					"furl": MesApp.param.httpUrl + '/app/demo/punish-confirm.html?guid=' + $("#guid").text(),
					"fuserid": "13696",
					"id": "3",
					"guid":$("#guid").text()
				};
				body = JSON.stringify(body);
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
//组件初始化
(function($) {
	$.init();
	var result = $(".app-date-text")[0];
	var btns = $(".app-date-btn");
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var optionsJson = '{}';
			var options = JSON.parse(optionsJson);
			var id = this.getAttribute('id');
			/*
			 * 首次显示时实例化组件
			 * 示例为了简洁，将 options 放在了按钮的 dom 上
			 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
			 */
			var picker = new $.DtPicker(options);
			picker.show(function(rs) {
				/*
				 * rs.value 拼合后的 value
				 * rs.text 拼合后的 text
				 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
				 * rs.m 月，用法同年
				 * rs.d 日，用法同年
				 * rs.h 时，用法同年
				 * rs.i 分（minutes 的第二个字母），用法同年
				 */
				result.innerText =  rs.y.text + "年" + rs.m.text + "月" + rs.d.text + "日" + " " + rs.h.text + ":" + rs.i.text;
				/* 
				 * 返回 false 可以阻止选择框的关闭
				 * return false;
				 */
				/*
				 * 释放组件资源，释放后将将不能再操作组件
				 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
				 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
				 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
				 */
				picker.dispose();
			});
		}, false);
	});
	//用户选择
	var userPicker = new $.PopPicker();
	userPicker.setData([{
		value: 'lfz',
		text: '李凤志'
	}, {
		value: 'lf', 
		text: '卢飞'
	}, {
		value: 'xt', 
		text: '肖畑'
	}]);
	var showUserPickerButton = $("#showUserPicker")[0];
	var userResult = $("#userResult")[0];
	showUserPickerButton.addEventListener('tap', function(event) {
		userPicker.show(function(items) {
			userResult.innerText = items[0].text;
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	}, false);
	//部门选择
	var depPicker = new $.PopPicker();
	depPicker.setData([{
		value: 'lfz',
		text: '生产技术处'
	}, {
		value: 'lf', 
		text: '安环部'
	}]);
	var showDepPickerBtn = $("#showDepPicker")[0];
	var depResult = $("#depResult")[0];
	showDepPickerBtn.addEventListener('tap', function(event) {
		depPicker.show(function(items) {
			depResult.innerText = items[0].text;
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	}, false);
})(mui);