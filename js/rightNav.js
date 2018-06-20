layui.use('element', function() {
	var $ = layui.jquery,
		element = layui.element;
	$("#rightNav li").eq(0).children("i").css("display", "none");
	$(".layui-nav dd").on("click", "a", function() {
		var navs = new Array();
		for(var i = 0; i < $("#rightNav li").length; i++) {
			if($("#rightNav li").eq(i).attr("lay-id") == "") {
				continue;
			}
			navs.push($("#rightNav li").eq(i).attr("lay-id"))
		}
		if($.inArray($(this).attr("id"), navs) > -1) {
			//切换到指定Tab项
			element.tabChange("KJY", $(this).attr("id"));
		} else if($.inArray($(this).attr("id"), navs) == -1) {
			if($(this).attr("data-page") == "part/noopen") {
				layer.msg('此功能未开放');
				return false;
			}
			navs.push($(this).attr("id"));
			//新增一个Tab项
			element.tabAdd('KJY', {
				title: $(this).html(),
				content: "<iframe src='" + $(this).attr("data-page") + ".html' frameborder='0' marginheight='0' marginwidth='0' scrolling='yes' width='100%'></iframe>",
				id: $(this).attr("id")
			})
		} else if(navs.length == $(".layui-nav dd a").length) {
			layer.msg('没有可打开的标签！！！');
		}
		$("#rightNav li[lay-id$='" + $(this).attr("id") + "']").addClass("layui-this").siblings().removeClass("layui-this");
		$("#rightIframe .layui-tab-item").eq(navs.indexOf($(this).attr("id")) + 1).addClass("layui-show").siblings().removeClass("layui-show");
		$("#rightIframe .layui-tab-item").eq(navs.indexOf($(this).attr("id")) + 1).find("iframe").attr("src",$("#rightIframe .layui-tab-item").eq(navs.indexOf($(this).attr("id")) + 1).find("iframe").attr("src"));
	})
});