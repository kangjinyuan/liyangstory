var url = "http://admin.liyangstory.com/";
var setData;
var index = parent.layer.getFrameIndex(window.name);
//初始化vue
function loadvue(paras) {
	setData = new Vue({
		el: '.KJYBOX',
		data: paras
	})
	Vue.filter('resetTime', function(time) {
		if(time == null) {
			return "";
		} else {
			var date = new Date(time);
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
			var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
			var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
			var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
			return Y + M + D + h + m + s;
		}
	})
}
//批量删除
var delidList = [];

function allselectdata(event) {
	var ev = event.currentTarget;
	if($(ev).hasClass("checked") == true) {
		setData.allisActive = false;
		for(var i = 0; i < setData.datalist.length; i++) {
			setData.datalist[i].isActive = false;
		}
		delidList = [];
	} else {
		setData.allisActive = true;
		for(var i = 0; i < setData.datalist.length; i++) {
			setData.datalist[i].isActive = true;
			delidList.push(setData.datalist[i].id);
		}
	}
}

function selectdata(event, i, id) {
	var ev = event.currentTarget;
	if($(ev).hasClass("checked") == true) {
		setData.datalist[i].isActive = false;
		delidList.splice($.inArray(id, delidList), 1);
	} else {
		setData.datalist[i].isActive = true;
		delidList.push(id);
	}
	for(var j = 0; j < setData.datalist.length; j++) {
		if(setData.datalist[j].isActive == true) {
			setData.allisActive = true;
		} else {
			setData.allisActive = false;
			break;
		}

	}
}
//弹框单选
var rcheck = "";
var rchecktxt = "";

function selecttab(event, i, id) {
	var ev = event.currentTarget;
	for(var j = 0; j < setData.datalist.length; j++) {
		setData.datalist[j].isActive = false;
	}
	if($(ev).hasClass("rchecked") == true) {
		setData.datalist[i].isActive = false;
		rcheck = "";
		rchecktxt = "";
	} else {
		setData.datalist[i].isActive = true;
		rcheck = id;
		rchecktxt = $(ev).parent().text();
	}
}

function loadmaskpart(html, okcallback) {
	$.ajax({
		type: "GET",
		url: html + '.html',
		dataType: "html",
		contentType: "application/json",
		success: function(data) {
			$("body").append(data);
			okcallback();
		}
	});
}

function loadnodata() {
	$.ajax({
		type: "GET",
		url: '../part/nodata.html',
		dataType: "html",
		contentType: "application/json",
		success: function(data) {
			$(".KJY_table").append(data);
		}
	});
}
//列表加载移除
function removeloadding(data, flag) {
	if(data == 0) {
		loadnodata();
	} else {
		$(".nodata").remove();
	}
	$(".KJYBOX").show();
	$(".loadding").remove();
}
//弹出框展示
function openmask(id, maskboxurl, title, Wh, Hh, okcallback) {
	layer.open({
		type: 2,
		title: title,
		shadeClose: true,
		shade: 0.2,
		area: [Wh, Hh],
		content: maskboxurl + ".html",
		success: function(layero, index) {
			var layerdom = $("#layui-layer-iframe" + index).contents().find("body");
			var layeriframe = $("#layui-layer-iframe" + index);
			layerdom.find(".main_mask").attr("data-id", id);
			layerdom.find(".main_mask input").val("");
			layerdom.find(".main_mask select").val("");
			layerdom.find(".main_mask textarea").val("");
			okcallback(layerdom, layeriframe);
		},
	});
}
//置空新建
function resetmask() {
	$(".main_mask input").val("");
	$(".main_mask select").val("");
}

function quit() {
	loadmaskpart("part/loadding", function() {
		$.ajax({
			type: 'POST',
			url: url + 'admin/logout.do',
			dataType: 'json',
			success: function(data) {
				window.parent.location.href = "login.html";
			}
		})
	})
}
//获取地址栏参数
function getQueryString(key) {
	var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	var result = window.location.search.substr(1).match(reg);
	return result ? decodeURIComponent(result[2]) : null;
}

var page = 1;
//正常页面
function firstpage() {
	page = 1;
	loaddata();
}

function lastpage() {
	page = $("#allpage").html();
	loaddata();
}

function nextpage() {
	page = $("#newpage").val();
	page++;
	if(page > $("#allpage").html()) {
		page = $("#allpage").html();
		layer.msg("页数已到最大");
	}
	loaddata();
}

function beforepage() {
	page = $("#newpage").val();
	page--;
	if(page < 1) {
		page = 1;
		layer.msg("页数已到最小");
	}
	loaddata();
}
//弹框
var tabindex = "";

function maskfirstpage() {
	page = 1;
	loaddata(tabindex);
}

function masklastpage() {
	page = $("#allpage").html();
	loaddata(tabindex);
}

function masknextpage() {
	page = $("#newpage").val();
	page++;
	if(page > $("#allpage").html()) {
		page = $("#allpage").html();
		layer.msg("页数已到最大");
	}
	loaddata(tabindex);
}

function maskbeforepage() {
	page = $("#newpage").val();
	page--;
	if(page < 1) {
		page = 1;
		layer.msg("页数已到最小");
	}
	loaddata(tabindex);
}
//		上传歌曲
function uploadsong() {
	$("#coversong").attr("action", url + "common/melodyUpload.do");
	$('#songFile').trigger('click');
}

function subimtsongBtn() {
	loadmaskpart("../part/loadding", function() {
		var form = $("#coversong");
		var timestamp = new Date().getTime();
		var options = {
			url: $(form).attr("action"),
			type: 'post',
			success: function(data) {
				if(data.state == true) {
					$("#showsong").attr("src", url + data.msg + "?timestamp=" + timestamp);
					$("#song").val($("#songFile").val());
					$("#songtext").val(data.msg);
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

//ajax内部查看专辑和分类
function binddata(bindurl, blur, callback) {
	var paras = {
		blur: blur,
	}
	paras = JSON.stringify(paras);
	$.ajax({
		type: 'POST',
		url: url + bindurl,
		contentType: "application/json;charset=UTF-8",
		data: paras,
		dataType: 'json',
		success: function(data) {
			if(data.state == true) {
				callback(data);
			}
		}
	});
}

function checkInput() {
	//	必填
	for(var i = 0; i < $(".required").length; i++) {
		if($(".required").eq(i).val() == "") {
			var required = $(".required").eq(i).parent().siblings(".masklistname").find(".text").text();
			layer.msg(required + " 为必填项 请核对");
			return false;
		}
	}
	for(var i = 0; i < $(".requiredimg").length; i++) {
		if($(".requiredimg").eq(i).attr("src") == "") {
			var required = $(".requiredimg").eq(i).parent().siblings(".masklistname").find(".text").text();
			layer.msg(required + " 为必填项 请核对");
			return false;
		}
	}
	//	长度不超过15
	for(var i = 0; i < $(".textlength").length; i++) {
		if($(".textlength").eq(i).val().length > 15) {
			var textlength = $(".textlength").eq(i).parent().siblings(".masklistname").find(".text").text();
			layer.msg(textlength + "长度不能超过15");
			return false;
		}
	}
	//	长度不超过30
	for(var i = 0; i < $(".bigtextlength").length; i++) {
		if($(".bigtextlength").eq(i).val().length > 30) {
			var bigtextlength = $(".bigtextlength").eq(i).parent().siblings(".masklistname").find(".text").text();
			layer.msg(bigtextlength + "长度不能超过30");
			return false;
		}
	}
	//	长度不超过200
	for(var i = 0; i < $(".findtextlength").length; i++) {
		if($(".findtextlength").eq(i).val().length > 200) {
			var findtextlength = $(".findtextlength").eq(i).parent().siblings(".masklistname").find(".text").text();
			layer.msg(findtextlength + "长度不能超过200");
			return false;
		}
	}
	return true;
}