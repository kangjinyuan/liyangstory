var t1 = []; //送检详情、96孔取样盘数据模板 存储数组

function selectExcel(event, i, id) {
	var ev = event.currentTarget;
	if($(ev).hasClass("checked") == true) {
		setData.datalist[i].isActive = false;
		t1.splice($.inArray(setData.datalist[i], t1), 1);
	} else {
		setData.datalist[i].isActive = true;
		t1.push(setData.datalist[i]);
	}
	for(var j = 0; j < setData.datalist.length; j++) {
		if(setData.datalist[j].isActive == true) {
			setData.allisActive = true;
		} else {
			setData.allisActive = false;
			break;
		}

	}
	console.log(t1)
}

function allSelectExcel(event) {
	var ev = event.currentTarget;
	if($(ev).hasClass("checked") == true) {
		setData.allisActive = false;
		for(var i = 0; i < setData.datalist.length; i++) {
			setData.datalist[i].isActive = false;
		}
		t1 = [];
	} else {
		setData.allisActive = true;
		for(var i = 0; i < setData.datalist.length; i++) {
			if(setData.datalist[i].isActive == false) {
				setData.datalist[i].isActive = true;
				t1.push(setData.datalist[i]);
			}
		}
	}
}