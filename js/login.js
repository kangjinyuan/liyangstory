//验证码登录
function createCode() {
	code = new Array();
	var codeLength = 4; //验证码的长度
	var checkCode = document.getElementById("checkCode");
	var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
	for(var i = 0; i < codeLength; i++) {
		var charIndex = Math.floor(Math.random() * 32);
		code += selectChar[charIndex];
	}
	if(code.length != codeLength) {
		createCode();
	}
	checkCode.innerHTML = code;
	$("#validate").val("");
}
//键盘enter键敲击登录
window.onkeydown = function(ev) {
	var ev = ev || window.event;
	if(ev.keyCode == 13) {
		validate();
	};
}
//登录方法
function login() {
	var paras = {
		userName: $('#username').val(),
		password: $("#password").val()
	}
	crequest('POST', 'admin/login.do', 0, paras, function(res) {
		window.location.href = "main.html";
	}, function() {
		layer.msg("您的用户名或密码不正确", {
			time: 1000
		});
	})
}

var code; //在全局 定义验证码
function validate() {
	var inputCode = document.getElementById("validate").value.toUpperCase();

	if(inputCode.length <= 0) {
		layer.msg("请输入验证码！", {
			time: 1000
		});
		return false;
	} else if(inputCode != code) {
		layer.msg("验证码输入错误！", {
			time: 1000
		});
		createCode();
		return false;
	} else {
		login();
		return true;
	}
}
$(function() {
	//确定按钮点击登录
	$("#login_btn").click(function() {
		validate();
	});
})