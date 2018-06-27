var ewmKey = "kangjinyuan00000"; //16位
ewmKey = CryptoJS.enc.Utf8.parse(ewmKey);
//加密算法
function aesEncrypt(data, ewmKey) {
	var encrypted = CryptoJS.AES.encrypt(data, ewmKey, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.toString();
}

//解密算法
function aesDecrypt(encrypted, key) {
	var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	decrypted = CryptoJS.enc.Utf8.stringify(decrypted); // 转换为 utf8 字符串
	return decrypted;
}