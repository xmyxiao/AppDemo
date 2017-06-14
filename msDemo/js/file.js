//文件上传
function setImagePreview() {
    var preview, img_txt, localImag, file_head = document.getElementById("file_head"),  
    picture = file_head.value;  
    if (!picture.match(/.jpg|.gif|.png|.bmp/i)) return alert("您上传的图片格式不正确，请重新选择！"),  
    !1;  
    if (preview = document.getElementById("preview"), file_head.files && file_head.files[0]) preview.style.display = "block",  
        preview.style.width = "43px",  
        preview.style.height = "43px",  
        preview.src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file_head.files[0]) : window.URL.createObjectURL(file_head.files[0]);  
    else {  
        file_head.select(),  
        file_head.blur(),  
        img_txt = document.selection.createRange().text,  
        localImag = document.getElementById("localImag"),  
        localImag.style.width = "63px",  
        localImag.style.height = "63px";  
        try {  
            localImag.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)",  
            localImag.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = img_txt  
        } catch(f) {  
            return alert("您上传的图片格式不正确，请重新选择！"),  
            !1  
        }  
        preview.style.display = "none",  
        document.selection.empty()  
    }  
    return document.getElementById("DivUp").style.display = "block",  
    !0  
}
$(function(){
	$("#BtnUp").click(function () {
		var options = {  
	        url:MesApp.param.httpUrl + '/mesInterface/fileUpload.htm',
	        beforeSubmit:  pageBefor,
	        success: pageSuccess,  //处理完成 
	        resetForm: true,  
	        dataType:  'json'  
	    };  
	  	
	    $('#formHead').submit(function() {
	    	$(this).ajaxSubmit(options); 
	    	var file = document.getElementById("file_head");
			if (file.outerHTML) {
		        file.outerHTML = file.outerHTML;
		    }
	    	return false;//防止dialog 自动关闭
	    });
	});
});
//文件成功
function pageSuccess(responseText, statusText){
	$("#preview").attr("src","");
	$("#preview").attr("style","display: none;");
	$("#DivUp").attr("style","display: none;");
	var file = document.getElementById("file_head");
	if (file.outerHTML) {
        file.outerHTML = file.outerHTML;
    }

	if(!responseText[0]){
		//alert("返回为空");
		return;
	}
	var htm = '<li class="table-img-item"><img src='+responseText[0].viewPath+' /></li>';
	$("#tableImg").append($(htm));
}
function pageBefor(){
	return true;
}
