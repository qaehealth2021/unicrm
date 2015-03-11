/*******************************************************************************
 * code by achui 通用工具类
 ******************************************************************************/

/**
 * 对象察看工具，查看对象中的属性和值
 * 
 * @param {Object}
 *            obj 需要查看的对象
 */
function printObject(obj) {
	var res = "";
	for (var p in obj) {
		res += p + ":" + obj[p] + "\r\n";
	}
	alert(res);
}
/**
 * 
 * @param {Object}
 *            obj
 */
function pomptObject(obj) {
	var res = "";
	for (var p in obj) {
		res += p + ":" + obj[p] + "\r\n";
	}
	prompt("test", res);
}
/**
 * 克隆对象,避免同一个对象的指针引用
 * 
 * @param {Object}
 *            obj
 * @return {Object}
 */
function cloneObj(obj) {
	var cloneObj = new Object();
	for (var p in obj) {
		cloneObj[p] = obj[p];
	}
	return cloneObj;
}
/**
 * 清空表单
 * 
 * @param {String}
 *            formId 表单ID
 */
function clearForm(formId) {
	var form = Ext.getCmp(formId);
	if (form == null)
		return;
	form.getForm().reset();
}
/**
 * 绑定下拉列表框
 * 
 * @param {String}
 *            selid 需要绑定的select的Id
 * @param {}
 *            bindlist 从服务器获取的需要绑定到select的List
 * @param {}
 *            valuepro 需要绑定的value值,对应到option的value值,一般对应到类里面的ID
 * @param {}
 *            textpro 需要绑定的value值,对应到option的text值,一般对用到类里面的name
 * @param {}
 *            isSelect
 */
function bindSelect(selid, bindlist, valuepro, textpro, isSelect) {
	// 清空所有Option
	DWRUtil.removeAllOptions(selid);
	// 绑定Select
	var templist = new Array();
	if (typeof(isSelect) == "undefined" || isSelect == true)
		eval("templist=[{" + valuepro + ":''," + textpro + ":'请选择'}]");
	DWRUtil.addOptions(selid, templist, valuepro, textpro);
	DWRUtil.addOptions(selid, bindlist, valuepro, textpro);

}
/**
 * 刷新父页面
 * 
 * @param {}
 *            isReflash 是否需要对父页面进行刷新 true:进行刷新,false:不进行刷新
 * @param {}
 *            tableId 需要刷新的父页面的tableId
 * @param {}
 *            reflashMenu 是否需要对右边树形结构进行刷新 true:进行刷新,false:不进行刷新
 */
function closeandreflash(isReflash, tableId, reflashMenu) {
	if (isReflash) {
		// eval("self.opener.refresh_" + tableId + "();");
	}
	if (reflashMenu)
		self.opener.parent.contents.location.reload();
	window.opener = null;
	window.close();
}
/**
 * 刷新父页面(EcSide专用)
 * 
 * @param {Boolean}
 *            isReflash:是否需要对父页面进行刷新 true:进行刷新,false:不进行刷新
 * @param {String}
 *            tableId:需要刷新的父页面的tableId
 * @param {Boolean}
 *            reflashMenu:是否需要对右边树形结构进行刷新 true:进行刷新,false:不进行刷新
 */
function closeandreflashEC(isReflash, tableId, reflashMenu) {
	// if (isReflash) {
	// try {
	// self.opener.reloadGrid(tableId)
	// } catch (e) {
	// }
	// }
	// if (reflashMenu)
	// self.opener.parent.contents.location.reload();
	// window.opener = null;
	// window.close();

	// 先刷新父页面
	reflashParent(tableId);
	// 关闭该win
	if ($(QH_IFRAME_ID)) {
		var winId = 'module' + $(QH_IFRAME_ID).value.substring(9);
		var btns = parent.Ext.getCmp('TaskBarButtons').items;
		for (var i = 0; i < btns.length; i++) {
			if (btns[i].win.id == winId) {
				btns[i].win.close();
				break;
			}
		}
	}
}
/**
 * 不关闭页面刷新父页面
 * 
 * @param {}
 *            tableId
 */
function reflashParent(tableId) {
	// if (self.opener != null) {
	// var ecsideObj = self.opener.Ext.getCmp(tableId);
	// if (typeof(ecsideObj) != 'undefined') {
	// ecsideObj.getStore().reload();
	// }
	// }
	if ($(QH_P_IFRAME_ID)) {
		var ecsideObj = parent.frames[$(QH_P_IFRAME_ID).value];
		if (typeof(ecsideObj) != 'undefined') {
			ecsideObj.Ext.getCmp(tableId).getStore().reload();
		}
	}
}
/**
 * 刷新本页面
 * 
 * @param {Boolean}
 *            isReflash 是否需要对父页面进行刷新 true:进行刷新,false:不进行刷新
 * @param {String}
 *            tableId 需要刷新的父页面的tableId
 */
function reflashLocal(isReflash, tableId) {
	if (isReflash) {
		Ext.getCmp(tableId).getStore().reload();
	}
}
/**
 * 刷新本页面
 * 
 * @param {String}
 *            tableId 需要刷新的父页面的tableId
 */
function reloadGrid(tableId) {
	reflashLocal(true, tableId);
}
/**
 * 用正则表达式将前后空格用空字符串替代。
 * 
 * @return {}
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 
 * @param {}
 *            url
 */
function openWindow(url) {
	openWindowBase(600, 800, url);
}

/**
 * 
 * @param {}
 *            heigth
 * @param {}
 *            width
 * @param {}
 *            url
 */
function openWindowBase(heigth, width, url) {
	var param = "height=" + heigth + ",width=" + width + ",left="
			+ (screen.availWidth - width) / 2 + ",top="
			+ (screen.availHeight - heigth) / 2
			+ ",status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes";
	window.open(url, "", param);
}

/**
 * 
 * @param {}
 *            url
 */
function openSmallWindow(url) {
	openWindowBase(500, 500)
}
/**
 * 
 * @param {}
 *            url
 */
function openEmailWindow(url) {
	openWindowBase(296, 512, url);
}
/**
 * 
 * @param {}
 *            url
 * @param {}
 *            id 避免相同记录开2次页面
 * @return {}
 */
function openFullWindow(url, id) {
	var param = "location=0,status=yes,menubar=0,toolbar=0,scrollbars=yes,height="
			+ (screen.availHeight - 50) + ",width=" + (screen.availWidth - 10);
	return window.open(url, !id ? "" : id, param);
}
/**
 * 设置某个容器下面所有元素的状态(置灰或激活)
 * 
 * @param {}
 *            container 需要设置的容器id (div,span等)
 * @param {}
 *            isActive 是否激活 true:不激活 false:激活
 */
function setAllElementsByContainer(container, isActive) {
	var elements = document.getElementById(container);
	eles_input = elements.getElementsByTagName("input");
	eles_sel = elements.getElementsByTagName("select");
	// 置灰所有input控件
	for (var i = 0; i < eles_input.length; i++) {
		var ele = eles_input[i];
		ele.disabled = isActive;
	}
	// 置灰所有select控件
	for (var i = 0; i < eles_sel.length; i++) {
		var ele = eles_sel[i];
		ele.disabled = isActive;
	}
}

/**
 * 传入日期字符串,返回日期型数据 调用方法：var test = getDateType("2009-01-01")
 * 
 * @param {String}
 *            strDate 传入的日期字符串
 * @return {Date}
 */
function getDateType(strDate) {
	if (strDate == "" || strDate == "undefined" || strDate == null)
		return null;
	var arr = strDate.split("-");
	if (arr.length < 3) // 不是由年月日组成
		return null;
	var year = parseInt(arr[0], 10); // 获取年
	var month = parseInt(arr[1], 10);// 获取月
	var date = parseInt(arr[2], 10);// 获取日
	var dateType = new Date(year, month - 1, date);
	return dateType;
}

/**
 * 将日期型的格式字符串转换为Date类型（Ext版专用）
 * 
 * @param {String}
 *            strDate：需要转换的时间
 * @param {String}
 *            format:日期格式,format支持的格式参考Ext api文档的Date说明
 * 
 */
function getDateTypeExt(strDate, format) {
	var dt = new Date(strDate);
	dt = dt.format(format);
	dt = Date.parseDate(dt, format);
	return dt;
}
/**
 * 将日期型的格式字符串转换为Date类型，格式类型为 Y-m-d，如：2011-11-11（Ext版专用）
 * 
 * @param {String}
 *            strDate：需要转换的时间
 */
function getSimpleDateTypeExt(strDate) {
	return getDateTypeExt(strDate, 'Y-m-d')
}
/**
 * 获得当前时间(服务器端)
 * 
 * @param {}
 *            fomate
 * @return {}
 */
function getCurrentFormateDate(fomate) {
	var currdate = "";
	DWREngine.setAsync(false);
	baseDataUtil.getCurrentFormateDate(fomate, function(res) {
				currdate = res;
			});
	DWREngine.setAsync(true);
	return currdate;
}
/**
 * 返回一个1至number的随机数
 * 
 * @return {}
 */
function getRandom(number) {
	var seed = new Date().getTime();
	seed = (seed * 9301 + 49297) % 233280;
	seed = seed / (233280.0);
	return Math.ceil(seed * number);
}
/**
 * 显示日期
 * 
 * @param {}
 *            obj
 */
function showPicker(obj) {
	if (obj.value == '') {
		obj.value = getCurrentFormateDate("yyyy-MM-dd");
	}
}

/**
 * 加入进度条
 * 
 * @param {}
 *            val
 */
function mask(val) {
	QH_LOADMASK = new Ext.LoadMask(Ext.getBody(), {
				msg : val || "正在执行操作,请稍候!"
			});
	QH_LOADMASK.show();
}
/**
 * 去除进度条
 */
function unmask() {
	QH_LOADMASK.hide();
}
/**
 * 获取当前表单数据 flag 表示是否在获取数据前执行验证，如果验证不成功返回false
 * formPanel.getForm().getValue()这个方法,当 checkbox没有勾选时,不会生成一个空属性的键值对
 * 
 * @param {}
 *            formPanel
 * @param {}
 *            flag
 * @return {Boolean}
 */
function getFormValues(formPanel, flag) {
	var redata = {};
	var items = formPanel.getForm().items;
	for (var i = 0; i < items.getCount(); i++) {
		var item = items.get(i);
		// 去掉无名的
		if (!item.getName())
			continue;
		// 执行验证,验证不成功直接返回空
		if (flag && !item.validate()) {
			item.focus();
			return false;
		}
		if (item.xtype == 'radio') {
			if (item.checked) {
				redata[item.getName()] = item.getRawValue();
			}
		} else {
			redata[item.getName()] = item.getValue();
		}
	}
	// 给自定义下拉框basecombo, 名称是"***.id"的赋值
	var combos = formPanel.findByType("basecombo");
	for (var i = 0; i < combos.length; i++) {
		var names = combos[i].getName().split(".");
		if (names.length > 1 && combos[i].getValue()) {
			eval('var obj = new ' + combos[i].objName + '();');
			obj.id = combos[i].getValue();
			redata[names[0]] = obj;
		}
	}
	// 获得图片路径
	var imagetoolbars = formPanel.findByType("imagetoolbar");
	for (var i = 0; i < imagetoolbars.length; i++) {
		var field = imagetoolbars[i].field;
		redata[field] = formPanel.getForm().findField(field).getValue();
	}
	return redata;
}
/**
 * 正在修改中的函数（临时使用）
 */
function ExtToDoFn() {
	alert("该功能尚在开发中......")
}
/**
 * 实现网页图片等比例缩放 调用方法：<img src="test.jpg"
 * onload="javascript:DrawImage(this,100,100);" />
 * 
 * @param {}
 *            ImgD 图片对象
 * @param {int}
 *            FitWidth 需要适应的图片框宽度
 * @param {int}
 *            FitHeight 需要适应的图片框高度
 * @param {int}
 *            minWidth 最小显示宽度,在弹出大图片时,一显示时,刚好整个工具栏按钮都能显示
 */
function DrawImage(ImgD, FitWidth, FitHeight, minWidth) {
	var image = new Image();
	image.src = ImgD.src;
	if (Ext.isIE) {
		if (image.width > 0 && image.height > 0) {
			if (image.width / image.height >= FitWidth / FitHeight) {
				if (image.width > FitWidth) {
					ImgD.width = FitWidth;
					ImgD.height = (image.height * FitWidth) / image.width;
				} else {
					if (minWidth && image.width < minWidth) {
						ImgD.width = minWidth;
						ImgD.height = (image.height * minWidth) / image.width;
					} else {
						ImgD.width = image.width;
						ImgD.height = image.height;
					}
				}
			} else {
				if (image.height > FitHeight) {
					ImgD.height = FitHeight;
					ImgD.width = (image.width * FitHeight) / image.height;
				} else {
					if (minWidth && image.width < minWidth) {
						ImgD.width = minWidth;
						ImgD.height = (image.height * minWidth) / image.width;
					} else {
						ImgD.width = image.width;
						ImgD.height = image.height;
					}
				}
			}
		}
		if (customEl != null) {
			customEl.setSize(ImgD.width, ImgD.height + 35);
			// 储存一展现时的宽和高
			ImgD.oldW = ImgD.width;
			ImgD.oldH = ImgD.height;
		}
	} else {
		image.onload = function() {
			if (image.width > 0 && image.height > 0) {
				if (image.width / image.height >= FitWidth / FitHeight) {
					if (image.width > FitWidth) {
						ImgD.width = FitWidth;
						ImgD.height = (image.height * FitWidth) / image.width;
					} else {
						if (minWidth && image.width < minWidth) {
							ImgD.width = minWidth;
							ImgD.height = (image.height * minWidth)
									/ image.width;
						} else {
							ImgD.width = image.width;
							ImgD.height = image.height;
						}
					}
				} else {
					if (image.height > FitHeight) {
						ImgD.height = FitHeight;
						ImgD.width = (image.width * FitHeight) / image.height;
					} else {
						if (minWidth && image.width < minWidth) {
							ImgD.width = minWidth;
							ImgD.height = (image.height * minWidth)
									/ image.width;
						} else {
							ImgD.width = image.width;
							ImgD.height = image.height;
						}
					}
				}
			}
			if (customEl != null) {
				customEl.setSize(ImgD.width, ImgD.height + 35);
				// 储存一展现时的宽和高
				ImgD.oldW = ImgD.width;
				ImgD.oldH = ImgD.height;
			}
		}
	}
}

// -----双击放大图片
// 双击弹出拖拉图片层
/**
 * 
 * @type
 */
var customEl = document.customEl;
/**
 * 
 * @param {}
 *            pic
 */
function showBigPicDiv(pic, type) {
}
/**
 * 
 * @param {}
 *            obj
 * @return {Boolean}
 */
function onWheelZoom(obj) {
	var zoom = obj.style.zoom;
	var tZoom;
	if (event.wheelDelta > 0) {
		tZoom = Number(zoom).add(0.05);
	} else {
		tZoom = Number(zoom).sub(0.05);
	}
	if (tZoom < 0.5) {
		return true;
	}
	obj.style.zoom = tZoom;
	// 升级谷歌版本后,在zoom后不会自动计算obj.width,obj.height
	var wd = Number(obj.oldW).mul(tZoom);
	var hd = Number(obj.oldH).mul(tZoom);

	customEl.setSize(wd, hd + 35);

	return false;
}

/**
 * 获取sysconfig.properties要保留几位小数
 * 
 * @param {}
 *            key
 * @return {}
 */
function getDeNum(key) {
	var temp = 3;// 默认为3位
	DWREngine.setAsync(false);
	baseDataUtil.getPrecisionByKey(key, function(str) {
				if (str != null)
					temp = str;
			});
	DWREngine.setAsync(true);
	return temp;
}
/**
 * 通过小数位生成"0.000"字符串
 * 
 * @param {}
 *            num
 * @return {}
 */
function getDeStr(num) {
	var temp = "0";
	for (var i = 0; i < num; i++) {
		if (i == 0) {
			temp += ".";
		}
		temp += "0";
	}
	return temp;
}

/**
 * 为了下载时不弹出新窗口
 * 
 * @param {}
 *            url
 */
function downRpt(url) {
	// if ($("ckDiv") == null) {
	// var html = '<div id="ckDiv" style="z-index:6000;display:none;">'
	// + '<iframe id="ckFrame" name="ckFrame">' + '</iframe>'
	// + '</div>'
	// Ext.DomHelper.append(document.body, {
	// html : html
	// }, true);
	// }
	// var frame = window.frames["ckFrame"];
	// frame.location.href = url;
	// 用Ext.Ajax.request主要是为了返回提示消息,例如当产品没有图片时
	if (!Ext.fly('ckDiv')) {
		var frm = document.createElement('form');
		frm.id = 'ckDiv';
		frm.style.display = 'none';
		document.body.appendChild(frm);
	}
	mask();
	Ext.Ajax.request({
				url : url,
				form : Ext.fly('ckDiv'),
				method : 'POST',
				isUpload : true,
				success : function(response, op) {
					var res = Ext.decode(response.responseText);
					unmask();
					alertMsg(res.msg);
				},
				failure : function(response, op) {
					var res = Ext.decode(response.responseText);
					unmask();
					alertMsg(res.msg);
				}
			});
	// 设置延时任务,2秒后关闭提示框
	var task = new Ext.util.DelayedTask(unmask);
	task.delay(2000);
}

/**
 * 清空表单和给表单赋值
 * 
 * @param {}
 *            formPnl
 * @param {}
 *            data
 */
function clearFormAndSet(formPnl, data) {
	var recdata = {};
	formPnl.getForm().items.each(function(item) {
				// 去掉无名的
				if (!item.getName())
					return;
				recdata[item.getName()] = null;
			});
	if (data)
		Ext.apply(recdata, data);
	// 设置表单数据
	formPnl.getForm().loadRecord(new Ext.data.Record(recdata, null));
	//
	formPnl.getForm().items.each(function(item) {
				if (item.xtype == 'radio') {
					if (item.getRawValue() == recdata[item.getName()]) {
						item.setValue(true);
					}
				}
				if (item.xtype == 'combo') {
					var rec = recdata[item.getName()];
					if (rec) {
						if (rec.id)
							item.setValue(rec.id);
						if (rec.name)
							item.setRawValue(rec.name);
					}
				}
			});
	// 给自定义下拉框basecombo, 名称是"***.id"的赋值
	var combos = formPnl.findByType("basecombo");
	for (var i = 0; i < combos.length; i++) {
		combos[i].clearValue();
	}
	// 清除所有的验证信息
	formPnl.getForm().clearInvalid();
}

/**
 * 屏蔽所有iframe的刷新
 * 
 * @return {Boolean}
 */
function stopIframeUpdate() {
	if (event.keyCode == 116 && self.frameElement.tagName == "IFRAME") {
		event.keyCode = 0;
		event.cancelBubble = true;
		return false;
	}
}

/**
 * 因为Ext.util.Format.numberRenderer返回的是字符串,不能正常排序,所以要改写下
 * 
 * @param {}
 *            v
 * @param {}
 *            record
 * @param {}
 *            format
 * @return {}
 */
function numFormat(v, record, format) {
	// alert(v);
	// if(v == null) return 0;
	var temp = Ext.util.Format.number(v, format);
	if (!isNaN(temp)) {
		return Number(temp);
	} else {
		return 0;
	}
}

/**
 * 因为后台返回的时间对象是个json,不能正常排序,所以要改写下
 * 
 * @param {}
 *            value
 * @return {}
 */
function timeSortType(value) {
	if (value) {
		if (value.time) {
			return value.time;
		} else {
			// 后台java.sql.date转化后到前台day是日期,不是"一周的第几天"
			var date = new Date(value.year, value.month + 1, value.day);
			return date.getTime();
		}
	} else
		return 0;
}

/**
 * DWR异常处理函数
 * 
 * @param {}
 *            msg 后台打印的异常消息
 * @param {}
 *            ex java.lang.Exception对象
 */
function errorHander(msg, ex) {
	// alert(msg);
	if (QH_LOADMASK) {
		QH_LOADMASK.hide();
	}
	var errorMsg = "系统堆栈:\n" + msg;
	var stackMsg = "";
	var programMsg = '程序堆栈：\n--------------------------------------------------------------------\n';
	var continueCount = 0;
	if (ex.stackTrace) {
		for (var j = 0; j < ex.stackTrace.length; j++) {
			var obj = ex.stackTrace[j];
			stackMsg += "	at " + obj.className + "." + obj.methodName + "("
					+ obj.fileName + " " + obj.lineNumber + ")\n";
		}
		if (stackMsg != "") {
			Ext.Msg.show({
						title : '错误堆栈',
						// msg:"",
						// defaultTextHeight:500,
						width : 900,
						icon : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK,
						prompt : true,
						multiline : 450,
						value : errorMsg + "\n" + programMsg + stackMsg,
						maxWidth : 900
					});
		}
	} else {
		alert("系统异常：" + msg);
	}
}
DWREngine.setErrorHandler(errorHander);

/**
 * 获得可为空的邮件地址正则表达式
 * 
 * @return {}
 */
function getEmailOrNullRegex() {
	var emailOrNullRegex = /^(((\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6})|\s{0})$/;
	return emailOrNullRegex;
}
document.onkeydown = stopIframeUpdate;

/**
 * 引入js文件
 * 
 * @param {String}
 *            path js相对项目路径
 */
function $import(path) {
	document.write("<script type='text/javascript' src='" + path
			+ "'></script>");
}
/**
 * 引入CSS文件
 * 
 * @param {String}
 *            path CSS相对项目路径
 */
function $importCss(path) {
	document.write("<link rel='stylesheet' type='text/css' href='" + path
			+ "'/>");
}
/**
 * 动态引入js文件
 * 
 * @param {}
 *            path js相对项目路径
 * @param {}
 *            sId script DOM Id
 * @param {}
 *            callback 回调函数
 */
function $importDynamic(path, sId, callback) {
	if (document.getElementById(sId))
		return;
	mask();
	Ext.Ajax.request({
				url : path,
				// options.scope, options, false, response
				success : function(response, options) {
					var oHead = document.getElementsByTagName('HEAD').item(0);
					var oScript = document.createElement("script");
					oScript.language = "javascript";
					oScript.type = "text/javascript";
					oScript.id = sId;
					oScript.defer = true;
					oScript.text = response.responseText;
					oHead.appendChild(oScript);

					if (Ext.isFunction(callback))
						callback(response, options);
					// unmask();
				},
				failure : function(response, options) {
					unmask();
					Ext.Msg.show({
								title : '系统提示',
								msg : '加载失败:' + response.statusText + ' ('
										+ response.status + ')',
								icon : Ext.Msg.ERROR,
								buttons : Ext.Msg.OK
							});
				}
			});
}
/**
 * 获得可为空的数字正则表达式
 * 
 * @return {}
 */
function getNumberRegex() {
	var numRegex = /^([0-9]+.?[0-9]*$|\s{0})$/;
	return numRegex;
}

// 样品档案查询面板的图片模式调用
function chkChoose(pId) {
	var flag = $("check_pic_" + pId).checked;
	if (flag) {
		$("check_pic_" + pId).checked = false;
	} else {
		$("check_pic_" + pId).checked = true;
	}
}
// 样品档案查询面板的图片模式调用 阻止事件向父类蔓延
function stopEvent(e) {
	e.stopPropagation();
}
// 样品档案查询面板的图片模式调用 放大图片
function zoomPic(e, obj) {
	e.stopPropagation();
	showBigPicDiv(obj);
}
/**
 * 解析文字大小
 * 
 * @param {}
 *            size 以字节为单位
 * @return {}
 */
function fileSizeRenderer(size) {
	if (!size) {
		return ''
	} else if (size < 1024) {
		return size + '&nbsp;B';
	} else if (size < (1024 * 1024)) {
		return (size / 1024).toFixed(2) + '&nbsp;KB';
	} else {
		return (size / 1024 / 1024).toFixed(2) + '&nbsp;MB';
	}
}
/**
 * 消息提示框
 * 
 * @param {String}
 *            msg
 */
function alertMsg(msg, fn) {
	Ext.Msg.alert("消息提示", msg, fn);
}
/**
 * 消息提示框
 * 
 * @param {String}
 *            msg
 */
function alertWarnMsg(msg, fn) {
	Ext.Msg.show({
				title : '消息提示',
				msg : msg,
				icon : Ext.Msg.WARNING,
				buttons : Ext.Msg.OK,
				fn : fn
			});
}

/**
 * 获得对象属性值,也可获得对象中的对象的属性值
 * 
 * @param {}
 *            obj
 * @param {}
 *            param 参数名或对象名.参数名
 */
function getObjValue(obj, param) {
	try {
		return eval('obj.' + param);
	} catch (e) {
		return ''
	}
}
/**
 * 设置对象属性值,也可设置对象中的对象的属性值
 * 
 * @param {}
 *            obj
 * @param {}
 *            param
 * @param {}
 *            value
 * @return {String}
 */
function setObjValue(obj, param, value) {
	try {
		var params = param.split('.');
		var temp = obj;
		for (var p in params) {
			if (!temp[params[p]]) {
				temp[params[p]] = {};
			}
			temp = temp[params[p]];
		}
		eval('obj.' + param + ' = value');
	} catch (e) {
		return ''
	}
}

Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
};
var isHasJs = new Array();
/**
 * 判断这个页面是否已经导入这个js
 * 
 * @param {}
 *            key
 */
function checkBaseNum(name, type) {
	if (!isHasJs.contains(name)) {
		if (type == 'CSS') {
			document.write("<link rel='stylesheet' type='text/css' href='"
					+ name + "'/>");
		} else {
			document.write("<script type='text/javascript' src='" + name
					+ "'></script>");
		}
		isHasJs.push(name);
	}
}
/**
 * 根据constants.js里面的常量来导入
 * 
 * @param {}
 *            key
 */
function $importKey(key, type) {
	if (Ext.isArray(key)) {
		for (var i = 0; i < key.length; i++)
			checkBaseNum(key[i], type);
	} else
		checkBaseNum(key, type);
}
/**
 * 根据constants.js里面的常量来导入
 * 
 * @param {}
 *            key
 */
function $importKeyCss(key) {
	$importKey(key, 'CSS');
}

/**
 * 获取href"?"后面带的参数
 * 
 * @param {String}
 *            href
 * @param {String}
 *            arg return:String/Map
 */
function getHrefArgs(arg) {
	var href = window.location.href;
	href = href.substring(href.indexOf('?') + 1)
	var args = Ext.urlDecode(href);
	if (arg == null)
		return args
	else
		return args[arg];
}

/**
 * 获取全局识别的IdentityId
 * 
 * @return {}
 */
function getIdentityId() {
	var identityId = GetCookie("COT_IDENTITY_ID");
	return identityId;
}
/**
 * html5，是否支持本地存储判断
 * 
 * @return {}
 */
function supports_local_storage() {
	return !!window.localStorage;
}
/**
 * 将不为空的属性
 */
function applyIfNotNull(target, source) {
	if (target && source && typeof source == 'object') {
		for (var p in source) {
			if (source[p])
				target[p] = source[p];
		}
	}
}
/**
 * 在任务栏添加窗体
 * 
 * @param {}
 *            name win的title
 * @param {}
 *            url iframe的url
 * @param {}
 *            id iframe的id
 */
function openDeskWin(name, url, id) {
	if (!id)
		id = Math.round(Math.random() * 100000);
	this.parent.MyApp.createWindow($(QH_IFRAME_ID).value, id, name, url);
}
/**
 * 联系人主界面显示新增传真界面
 */
function showAddFax(customerId, contactId, customerName, contactName, faxNum) {
	var obj = {};
	obj.customerId = customerId;
	obj.contactId = contactId;
	obj.customerName = customerName;
	obj.contactName = contactName;
	obj.faxNum = faxNum;
	var win = new QH.faxsend.FaxSendSendWin({
				fdObj : obj
			});
	win.show();
}
/**
 * 联系人主界面点击手机号码后选择是发短信还是打开x-lite
 */
function choseOp(contactId, nbr, customerName, contactPerson) {
	var win = new Ext.Window({
				title : nbr,
				width : 300,
				modal : true,
				frame : true,
				buttonAlign : 'center',
				buttons : [{
					text : "发短信",
					handler : function() {
						win.close();
						// 0是给员工发短信
						var title = '给&nbsp;<font color=red>' + customerName
								+ '</font>&nbsp;的&nbsp;<font color=red>'
								+ contactPerson
								+ '</font>&nbsp;的&nbsp;<font color=red>' + nbr
								+ '</font>&nbsp;发送短信';
						if (contactId == 0) {
							title = '给&nbsp;<font color=red>' + contactPerson
									+ '</font>&nbsp;的&nbsp;<font color=red>'
									+ nbr + '</font>&nbsp;发送短信';
						}
						var smsWin = new QH.sms.SmsSendOneWin({
									title : title,
									contactId : contactId,
									contactNbr : nbr
								});
						smsWin.show();
					}
				}, {
					text : "X-LITE",
					handler : function() {
						win.close();
						downRpt('sip:9' + nbr);
					}
				}],
				items : [{}]
			})
	win.show();
}

/**
 * 在当前页面中获得自己在任务栏上的按钮 需要在当前jsp中有 <input type="hidden" id="myIfameId" value="<%=request.getParameter("myIfameId")
 * %>"/>
 * 
 * @param {}
 *            frameId
 */
function getTaskButton() {
	var taskBtn = null;
	if ($(QH_IFRAME_ID)) {
		var frameId = $(QH_IFRAME_ID).value;
		var winId = 'module' + $(QH_IFRAME_ID).value.substring(9);
		var btns = parent.Ext.getCmp('TaskBarButtons').items;
		for (var i = 0; i < btns.length; i++) {
			if (btns[i].win.id == winId) {
				taskBtn = btns[i];
				break;
			}
		}
	}
	return taskBtn;
}
/**
 * 加载iframe
 * @param {} iframe
 * @param {} src
 * @param {} ready
 * @param {} callback
 */
function loadIframe(iframe, src, ready, callback) {
	ready();
	iframe.location.href = src;
	if (window.ActiveXObject) {
		iframe.onreadystatechange = function() {
			if (this.readyState == "complete") {
				// 解释：一个iframe加载完毕的状态是complete,就象xmlhttp里的那个==4一样,这些都是规定的...
				callback.call(iframe);
			}
		}
	} else {
		callback.call(iframe);
	}
}