Ext.apply(Ext.form.VTypes, {
	// 起始日期--结束日期范围
	daterange : function(val, field) {
		// var date = field.parseDate(val);
		//
		// if(!date){
		// return false;
		// }
		// if (field.startDateField && (!this.dateRangeMax || (date.getTime() !=
		// this.dateRangeMax.getTime()))) {
		// var start = Ext.getCmp(field.startDateField);
		// start.setMaxValue(date);
		// start.validate();
		// this.dateRangeMax = date;
		// }
		// else if (field.endDateField && (!this.dateRangeMin || (date.getTime()
		// != this.dateRangeMin.getTime()))) {
		// var end = Ext.getCmp(field.endDateField);
		// end.setMinValue(date);
		// end.validate();
		// this.dateRangeMin = date;
		// }
		// /*
		// * Always return true since we're only using this vtype to set the
		// * min/max allowed values (these are tested for after the vtype test)
		// */
		// return true;

		var date = field.parseDate(val);

		// We need to force the picker to update values to recaluate the
		// disabled dates display
		var dispUpd = function(picker) {
			var ad = picker.activeDate;
			picker.activeDate = null;
			picker.update(ad);
		};

		if (field.startDateField || field.startDateId) {
			var sd = '';
			if (field.startDateId) {
				sd = Ext.getCmp(field.startDateId);
			} else {
				sd = field.startDateField.startDateField
			}
			sd.maxValue = date;
			if (sd.menu && sd.menu.picker) {
				sd.menu.picker.maxDate = date;
				dispUpd(sd.menu.picker);
			}
		} else if (field.endDateField || field.endDateId) {
			var ed = '';
			if (field.endDateId) {
				ed = Ext.getCmp(field.endDateId);
			} else {
				ed = field.endDateField.endDateField;
			}
			ed.minValue = date;
			if (ed.menu && ed.menu.picker) {
				ed.menu.picker.minDate = date;
				dispUpd(ed.menu.picker);
			}
		}
		/*
		 * Always return true since we're only using this vtype to set the
		 * min/max allowed values (these are tested for after the vtype test)
		 */
		return true;
	},
	password : function(val, field) {
		if (field.initialPassField) {
			var pwd = Ext.getCmp(field.initialPassField);
			return (val == pwd.getValue());
		}
		return true;
	},

	passwordText : '两次密码不一致！',
	// 年龄
	"age" : function(_v) {
		if (/^\d+$/.test(_v)) {
			var _age = parseInt(_v);
			if (_age < 200)
				return true;
		} else
			return false;
	},
	'ageText' : '年龄格式出错！！格式例如：20',
	'ageMask' : function(_v) {
		return /[0-9]/i;
	},
	// 密码验证
	"repassword" : function(_v, field) {
		if (field.confirmTO) {
			var psw = Ext.get(field.confirmTO);
			return (_v == psw.getValue());
		}
		return true;
	},
	"repasswordText" : "密码输入不一致！！",
	"repasswordMask" : function(_v) {
		return /[a-z0-9]/i;
	},
	// 邮政编码
	"postcode" : function(_v) {
		return /^[1-9]\d{5}$/.test(_v);
	},
	"postcodeText" : "必须是邮政编码格式，例如：226001",
	"postcodeMask" : function(_v) {
		return /^([0-9]{6}|\s{0})$/i;
	},
	// 只能包含半角字母,数字和_
	'alphanumText' : '只能包含半角字母,数字和_',
	'alphanumMask' : function(_v) {
		return /^([a-z0-9_]|\s{0})$/i;
	},
	// IP地址验证
	"ip" : function(_v) {
		return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
				.test(_v);

	},
	"ipText" : "必须是IP地址格式，例如：222.192.42.12",
	"ipMask" : function(_v) {
		return /[0-9\.]/i
	},
	// 邮箱
	'emailText' : '必须是电子邮件地址，格式如： "user@example.com"',
	'emailMask' : function(_v) {
		return /^(((\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6})|\s{0})$/;
	},
	// 固定电话及小灵通
	"telephone" : function(_v) {
		return /(^\d{3}\-\d{7,8}$)|(^\d{4}\-\d{7,8}$)|(^\d{3}\d{7,8}$)|(^\d{4}\d{7,8}$)|(^\d{7,8}$)/
				.test(_v);
	},
	"telephoneText" : "必须是电话号码格式，例如：0513-89500414,051389500414,89500414",
	"telephoneMask" : function(_v) {
		return /^((0?\d{2,3}-?\d{5,9})|s{0})$/;
	},
	// 手机
	"mobile" : function(_v) {
		return /^1[35][0-9]\d{8}$/.test(_v);
	},
	"mobileText" : "必须是手机号码格式，例如：13485135075",
	"mobileMask" : function(_v) {
		return /^((13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}|\s{0})$/;
	},

	// 传真
	"faxText" : "必须是传真格式，例如：+123-999 999 ;123 999 999 ;",
	"faxMask" : function(_v) {
		return /^(([+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+)|\s{0})$/;
	},
	// 传真
	"numstr" : function(_v) {
		//if(_v == "")return true;
		return /^\d*$/.test(_v);
	},
	"numstrText" : "必须是数字,0-9",
	"numstrMask" : function(_v) {
		return /^[0-9]$/;
	},
	// 身份证
	"IDCard" : function(_v) {
		// --azan修改---
		if (_v == '') {
			return true;
		}
		// ----------
		// return /(^[0-9]{17}([0-9]|[Xx])$)|(^[0-9]{17}$)/.test(_v);
		var area = {
			11 : "北京",
			12 : "天津",
			13 : "河北",
			14 : "山西",
			15 : "内蒙古",
			21 : "辽宁",
			22 : "吉林",
			23 : "黑龙江",
			31 : "上海",
			32 : "江苏",
			33 : "浙江",
			34 : "安徽",
			35 : "福建",
			36 : "江西",
			37 : "山东",
			41 : "河南",
			42 : "湖北",
			43 : "湖南",
			44 : "广东",
			45 : "广西",
			46 : "海南",
			50 : "重庆",
			51 : "四川",
			52 : "贵州",
			53 : "云南",
			54 : "西藏",
			61 : "陕西",
			62 : "甘肃",
			63 : "青海",
			64 : "宁夏",
			65 : "新疆",
			71 : "台湾",
			81 : "香港",
			82 : "澳门",
			91 : "国外"
		}
		var Y, JYM;
		var S, M;
		var idcard_array = new Array();
		idcard_array = _v.split("");
		// 地区检验
		if (area[parseInt(_v.substr(0, 2))] == null) {
			this.IDCardText = "身份证号码地区非法!!,格式例如:32";
			return false;
		}
		// 身份号码位数及格式检验
		switch (_v.length) {
			case 15 :
				if ((parseInt(_v.substr(6, 2)) + 1900) % 4 == 0
						|| ((parseInt(_v.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(_v
								.substr(6, 2)) + 1900)
								% 4 == 0)) {
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;// 测试出生日期的合法性
				} else {
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;// 测试出生日期的合法性
				}
				if (ereg.test(_v))
					return true;
				else {
					this.IDCardText = "身份证号码出生日期超出范围,格式例如:19860817";
					return false;
				}
				break;
			case 18 :
				// 18位身份号码检测
				// 出生日期的合法性检查
				// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
				// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
				if (parseInt(_v.substr(6, 4)) % 4 == 0
						|| (parseInt(_v.substr(6, 4)) % 100 == 0 && parseInt(_v
								.substr(6, 4))
								% 4 == 0)) {
					ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
				} else {
					ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
				}
				if (ereg.test(_v)) {// 测试出生日期的合法性
					// 计算校验位
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10]))
							* 7
							+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
							* 9
							+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
							* 10
							+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
							* 5
							+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
							* 8
							+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
							* 4
							+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
							* 2
							+ parseInt(idcard_array[7])
							* 1
							+ parseInt(idcard_array[8])
							* 6
							+ parseInt(idcard_array[9]) * 3;
					Y = S % 11;
					M = "F";
					JYM = "10X98765432";
					M = JYM.substr(Y, 1);// 判断校验位
					// alert(idcard_array[17]);
					if (M == idcard_array[17]) {
						return true; // 检测ID的校验位
					} else {
						this.IDCardText = "身份证号码末位校验位校验出错,请注意x的大小写,格式例如:201X";
						return false;
					}
				} else {
					this.IDCardText = "身份证号码出生日期超出范围,格式例如:19860817";
					return false;
				}
				break;
			default :
				this.IDCardText = "身份证号码位数不对,应该为15位或是18位";
				return false;
				break;
		}

	},
	"IDCardText" : "该输入项目必须是身份证号码格式，例如：32082919860817201x",
	"IDCardMask" : function(_v) {
		return /[0-9xX]/i;
	},

	yearRange : function(val, field) {
		return (val > 1900 && val < 2050);
	},
	yearRangeText : '日期应该在1900-2050',

	weekRange : function(val, field) {
		return (val > 0 && val < 6);
	},
	weekRangeText : '周次应该在1-5之间',
	
    'fax' : function(v){
    	if(!v)
    		return true;
    	else
        	return /^\d{2,3}-\d{3,4}-\d{7,8}$/.test(v);
    },
    'faxText' : '不是有效的传真号,格式为:国际区号-区号-传真号码,例如 "86-0592-3336667",其中国际区号为2至3位,区号为3位至4位,传真号码为7至8位',
    'faxMask' : /[0-9\-]/i,
    'email' : function(v){
    	if(!v)
    		return true;
    	else
        	return /^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/.test(v);
    }
});