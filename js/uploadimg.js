//		上传图片
function uploadimg(t) {
	$("#coverImage").attr("action", url + "common/imageUpload.do");
	$("#Imagetext").val($(t).siblings("img").attr("alt"));
	$('#ImageFile').trigger('click');
}

function subimtimgBtn() {
	loadmaskpart("../part/loadding", function() {
		var form = $("#coverImage");
		var timestamp = new Date().getTime();
		var options = {
			url: $(form).attr("action"),
			type: 'post',
			success: function(data) {
				if(data.code == 0) {
					$("#showImage").attr("src", url + data.data.src + "?timestamp=" + timestamp);
					$("#showImage").attr("alt", data.data.src);
					removeloadding();
				} else {
					layer.msg(data.msg);
					removeloadding();
				}
			}
		};
		form.ajaxSubmit(options);
	})
};