//		上传图片
function uploadimg(t) {
	$("#coverImage").attr("action", url + "common/imageUpload.do");
	$("#Imagetext").val($(t).siblings("img").attr("alt"));
	$('#ImageFile').trigger('click');
}

function subimtimgBtn() {
	var loadding = layer.load(0, {
		shade: [0.1, '#fafafa'],
		area: ['88px', '88px']
	});
	var form = $("#coverImage");
	var timestamp = new Date().getTime();
	var options = {
		url: $(form).attr("action"),
		type: 'post',
		success: function(data) {
			if(data.code == 0) {
				$("#showImage").attr("src", url + data.data.src + "?timestamp=" + timestamp);
				$("#showImage").attr("alt", data.data.src);
				$("#coverImage").attr("action", "");
				$("#ImageFile").val('');
			} else {
				layer.msg(data.msg);
			}
			layer.closeAll('loading');
		}
	};
	form.ajaxSubmit(options);
};

//		上传歌曲
function uploadsong() {
	$("#coversong").attr("action", url + "common/melodyUpload.do");
	$('#songFile').trigger('click');
}

function subimtsongBtn() {
	var loadding = layer.load(0, {
		shade: [0.1, '#fafafa'],
		area: ['88px', '88px']
	});
	var form = $("#coversong");
	var timestamp = new Date().getTime();
	var options = {
		url: $(form).attr("action"),
		type: 'post',
		success: function(data) {
			if(data.state == true) {
				$("#showsong").attr("src", url + data.msg + "?timestamp=" + timestamp);
				$("#songtext").val(data.msg);
				$("#songFile").val('');
			} else {
				layer.msg(data.msg);
			}
			layer.closeAll('loading');
		}
	};
	form.ajaxSubmit(options);
};

//		上传文件
function uploadfile(cardNo) {
	$("#report").attr("action", url + "common/fileUpload.do");
	if(cardNo) {
		$("#report").attr("data-cardNo", cardNo);
	}
	$('#reprotFile').trigger('click');
}

function subimtfileBtn(type) {
	var loadding = layer.load(0, {
		shade: [0.1, '#fafafa'],
		area: ['88px', '88px']
	});
	var form = $("#report");
	var timestamp = new Date().getTime();
	var options = {
		url: $(form).attr("action"),
		type: 'post',
		success: function(data) {
			if(data.state == true) {
				if(type == 0) {
					updata($("#report").attr("data-cardNo"), data.msg);
				} else if(type == 1) {
					$("#filetext").val(data.msg);
					$("#fileName").val(url + data.msg);
				}
				$("#reprotFile").val('');
			} else {
				layer.msg(data.msg);
			}
			layer.closeAll('loading');
		}
	};
	form.ajaxSubmit(options);
};