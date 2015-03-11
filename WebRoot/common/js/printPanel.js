PrintWin = function(cfg) {
	var _self = this;
	if (!cfg)
		cfg = {};

	// 打印类型
	var printType = new Ext.data.SimpleStore({
				fields : ["id", "name"],
				data : [['XLS', 'XLS'], ['PDF', 'PDF']]
			});
	var typeBox = new Ext.form.ComboBox({
				name : 'printType',
				id : 'printType',
				xtype : 'combo',
				fieldLabel : "导出类型",
				editable : false,
				store : printType,
				valueField : "id",
				value : "XLS",
				displayField : "name",
				mode : 'local',
				anchor : '95%',
				triggerAction : 'all',
				selectOnFocus : false
			});

	// 报价
	var type = 0;
	var exlAction = "./servlet/DownRptServlet";
	// 邮件接收人
	var custId = 0;
	var factoryId = 0;
	var mail = {};
	mail.type = cfg.type;

	// 报价
	if (cfg.type == 'price') {
		type = 1;
	}
	// 订单
	if (cfg.type == 'order') {
		type = 2;
	}
	// 征样
	if (cfg.type == 'sign') {
		type = 3;
	}
	// 送样
	if (cfg.type == 'given') {
		type = 4;
	}
	// 是否显示厂家
	var sFac = true;
	// 出货
	if (cfg.type == 'orderout') {
		sFac = false;
		type = 9;
	}
	// 配件采购
	if (cfg.type == 'fitting') {
		type = 12;
//		exlAction = "./downFitOrder.action";
	}
	// 生产合同
	if (cfg.type == 'orderfac') {
		type = 8;
	}
	// 包材采购
	if (cfg.type == 'packing') {
		type = 13;
	}
	// 排载
	if (cfg.type == 'split') {
		type = 7;
	}
	// 验货
	if (cfg.type == 'qc') {
		type = 14;
		exlAction = "./downQc.action";
	}
	// 库存领用
	if (cfg.type == 'stockout') {
		type = 15;
	}
	// 库存申购
	if (cfg.type =='stockapply') {
		type = 16;
	}
	// 库存采购
	if (cfg.type =='stockbuy') {
		type = 17;
	}
	// 库存入库
	if (cfg.type =='stockin') {
		type = 18;;
	}
	// 库存盘点
	if (cfg.type =='stockcount') {
		type = 19;
	}
	
	
	// 审核状态
	var status;

	// 查询参数
	var querySql = "";
	var tplUrl = "./servlet/DataSelvert?tbname=CotRptFile&key=rptName&typeName=cotRptTypeId&type="
			+ type;

	// 导出模板
	var modelBox = new BindCombox({
				dataUrl : tplUrl,
				cmpId : 'reportTemple',
				fieldLabel : "导出模板",
				editable : true,
				sendMethod : "post",
				valueField : "rptfilePath",
				displayField : "rptName",
				emptyText : '请选择',
				anchor : "95%",
				triggerAction : 'all'
			});

	// 设置默认模板
	queryService.getRptDefault(type, function(def) {
				if (def != null) {
					modelBox.bindValue(def.rptfilePath);
				}
			});

	// 厂家
	this.facBox = new Ext.form.ComboBox({
				store : new Ext.data.ArrayStore({
							'id' : 0,
							fields : ['value', 'text'],
							data : [],
							autoDestroy : true
						}),
				mode : 'local',
				valueField : 'value',
				displayField : 'text',
				triggerAction : "all",
				hiddenName : "printFacId",
				fieldLabel : "明细厂家",
				emptyText : "请选择",
				anchor : "95%",
				hidden : sFac,
				hideLabel : sFac
			});

	var dataId = 0;
	var dataIdName = '';
	var dataNo = '';
	var dataNoName = '';

	function setDataName() {
		// 报价
		if (cfg.type == 'price') {
//			dataIdName = 'cot_price_detail.PRICE_ID';
			dataIdName = 'cot_price.id';
			dataNoName = 'cot_price.PRICE_NO';
		}
		// 订单
		if (cfg.type == 'order') {
//			dataIdName = 'cot_order_detail.ORDER_ID';
			dataIdName = 'cot_order.id';
			dataNoName = 'cot_order.ORDER_NO';
		}
		// 征样
		if (cfg.type == 'sign') {
//			dataIdName = 'cot_given_detail.GIVEN_ID';
			dataIdName = 'cot_sign.id';
			dataNoName = 'cot_sign.ORDER_NO';
		}
		// 送样
		if (cfg.type == 'given') {
//			dataIdName = 'cot_given_detail.GIVEN_ID';
			dataIdName = 'cot_given.id';
			dataNoName = 'cot_given.ORDER_NO';
		}
		// 出货
		if (cfg.type == 'orderout') {
//			dataIdName = 'cot_order_outdetail.order_Id';
			dataIdName = 'cot_order_out.id';
			dataNoName = 'cot_order_out.ORDER_NO';
		}
		// 配件采购
		if (cfg.type == 'fitting') {
//			dataIdName = 'cot_fittings_orderdetail.order_id';
			dataIdName = 'cot_fitting_order.id';
			dataNoName = 'cot_fitting_order.order_no';
		}
		// 生产合同
		if (cfg.type == 'orderfac') {
//			dataIdName = 'cot_order_facdetail.order_id';
			dataIdName = 'cot_order_fac.id';
			dataNoName = 'cot_order_fac.ORDER_NO';
		}
		// 包材采购
		if (cfg.type == 'packing') {
//			dataIdName = 'cot_packing_orderdetail.packing_orderId';
			dataIdName = 'cot_packing_order.id';
			dataNoName = 'cot_packing_order.packing_order_no';
		}
		// 排载
		if (cfg.type == 'split') {
//			dataIdName = 'cot_split_detail.SPLIT_ID';
			dataIdName = 'cot_split_info.id';
			dataNoName = 'cot_split_info.CONTAINER_NO';
		}
		// 验货
		if (cfg.type == 'qc') {
//			dataIdName = 'cot_qc_detail.order_id';
			dataIdName = 'cot_qc.id';
			dataNoName = 'cot_qc.CHECK_NO';
		}
		// 库存领用
		if (cfg.type == 'stockout' ||cfg.type =='stockapply' || cfg.type =='stockbuy' || cfg.type =='stockin' ||cfg.type =='stockcount') {
			dataIdName = 'cot_stock_order.id';
			dataNoName = 'cot_stock_order.order_no';
		}
	}

	// 验证
	var check = function() {
		setDataName();
		if (!cfg.pId) {
			var grid =cfg.object;
			var list = grid.getSelectionModel().getSelections();
			if (list.length == 0) {
				Ext.MessageBox.alert("提示消息", "请选择一条记录");
				return false;
			} else if (list.length > 1) {
				Ext.MessageBox.alert("提示消息", "只能选择一条记录!")
				return false;
			}
			mail.pId = list[0].id;
			// 报价
			if (cfg.type == 'price') {
				custId = list[0].data.custId;
				mail.pNo = list[0].data.priceNo;
				status = list[0].data.priceStatus;
				querySql = "&orderId=" + list[0].id + "&orderNo="
						+ encodeURIComponent(list[0].data.orderNo);

				dataId = list[0].id;
				dataNo = encodeURIComponent(list[0].data.priceNo);
			}
			// 订单
			if (cfg.type == 'order') {
				status = list[0].data.orderStatus;
				custId = list[0].data.custId;
				mail.pNo = list[0].data.orderNo;
				querySql = "&orderId=" + list[0].id + "&orderNo="
						+ encodeURIComponent(list[0].data.orderNo);

				dataId = list[0].id;
				dataNo = encodeURIComponent(list[0].data.orderNo);
			}
			// 征样
			if (cfg.type == 'sign') {
				custId = list[0].data.custId;
				mail.pNo = list[0].data.orderStatus;
				status = list[0].data.orderStatus;
				querySql = "&orderId=" + list[0].id + "&orderNo="
						+ encodeURIComponent(list[0].data.orderNo);

				dataId = list[0].id;
				dataNo = encodeURIComponent(list[0].data.orderNo);
			}
			// 送样
			if (cfg.type == 'given') {
				custId = list[0].data.custId;
				mail.pNo = list[0].data.orderStatus;
				status = list[0].data.orderStatus;
				querySql = "&orderId=" + list[0].id + "&orderNo="
						+ encodeURIComponent(list[0].data.orderNo);

				dataId = list[0].id;
				dataNo = encodeURIComponent(list[0].data.orderNo);
			}
			// 出货
			if (cfg.type == 'orderout') {
				custId = list[0].data.custId;
				mail.pNo = list[0].data.orderNo;
				status = list[0].data.orderStatus;
				querySql = "&orderId=" + list[0].id + "&orderOutNo="
						+ encodeURIComponent(list[0].data.orderNo);

				dataId = list[0].id;
				dataNo = encodeURIComponent(list[0].data.orderNo);
			}
			// 配件采购
			if (cfg.type == 'fitting') {
				factoryId = list[0].data.factoryId;
				mail.pNo = list[0].data.fittingOrderNo;
				status = list[0].data.orderStatus;
				querySql = "&flag=FitOrder&fitorderId=" + list[0].id
						+ "&fittingNo="
						+ encodeURIComponent(list[0].data.fittingOrderNo);

				dataId = list[0].id;
				dataNo = encodeURIComponent(list[0].data.fittingOrderNo);
			}
			// 生产合同
			if (cfg.type == 'orderfac') {
				factoryId = list[0].data.factoryId;
				mail.pNo = list[0].data.orderNo;
				status = list[0].data.orderStatus;
				querySql = "&orderId=" + list[0].id + "&orderFacNo="
						+ encodeURIComponent(list[0].data.orderNo);

				dataId = list[0].id;
				dataNo = encodeURIComponent(list[0].data.orderNo);
			}
			// 包材采购
			if (cfg.type == 'packing') {
				factoryId = list[0].data.factoryId;
				mail.pNo = list[0].data.packingOrderNo;
				status = list[0].data.orderStatus;
				querySql = "&flag=PackOrder&packorderId=" + list[0].id
						+ "&packingNo="
						+ encodeURIComponent(list[0].data.packingOrderNo);

				dataId = list[0].id;
				dataNo = encodeURIComponent(list[0].data.packingOrderNo);
			}
			// 排载
			if (cfg.type == 'split') {
				querySql = "&splitId=" + list[0].id + "&containerNo="
						+ encodeURIComponent(list[0].data.containerNo);

				dataId = list[0].id;
				dataNo = encodeURIComponent(list[0].data.containerNo);
			}
			// 验货
			if (cfg.type == 'qc') {
				factoryId = list[0].data.factoryId;
				mail.pNo = list[0].data.checkNo;
				querySql = "&orderId=" + list[0].id + "&checkNo="
						+ encodeURIComponent(list[0].data.checkNo);

				dataId = list[0].id;
				dataNo = encodeURIComponent(list[0].data.checkNo);
			}
			// 库存领用
			if (cfg.type == 'stockout' ||cfg.type =='stockapply' || cfg.type =='stockbuy' || cfg.type =='stockin' ||cfg.type=='stockcount') {
				querySql = "&outId=" + list[0].id + "&outNo="
						+ encodeURIComponent(list[0].data.orderNo);

				dataId = list[0].id;
				dataNo = encodeURIComponent(list[0].data.orderNo);
			}
		} else {
			var pId = $(cfg.pId).value;
			var pNo = $(cfg.pNo).value;
			var mailSendId = $(cfg.mailSendId).value;
			status = $(cfg.status).value;
			mail.pId = pId;
			mail.pNo = pNo;

			dataId = pId;
			dataNo = encodeURIComponent(pNo);

			// 报价
			if (cfg.type == 'price') {
				custId = mailSendId;
				querySql = "&orderId=" + pId + "&orderNo=" + pNo;
			}
			// 订单
			if (cfg.type == 'order') {
				custId = mailSendId;
				querySql = "&orderId=" + pId + "&orderNo=" + pNo;
			}
			// 征样
			if (cfg.type == 'sign') {
				custId = mailSendId;
				querySql = "&orderId=" + pId + "&orderNo=" + pNo;
			}
			// 送样
			if (cfg.type == 'given') {
				custId = mailSendId;
				querySql = "&givenId=" + pId + "&givenNo=" + pNo;
			}
			// 出货
			if (cfg.type == 'orderout') {
				custId = mailSendId;
				querySql = "&orderId=" + pId + "&orderOutNo=" + pNo;
			}
			// 配件采购
			if (cfg.type == 'fitting') {
				factoryId = mailSendId;
				querySql = "&flag=FitOrder&fitorderId=" + pId + "&fittingNo="
						+ pNo;
			}
			// 生产合同
			if (cfg.type == 'orderfac') {
				factoryId = mailSendId;
				querySql = "&orderId=" + pId + "&orderFacNo=" + pNo;
			}
			// 包材采购
			if (cfg.type == 'packing') {
				factoryId = mailSendId;
				querySql = "&flag=PackOrder&packorderId=" + pId + "&packingNo="
						+ pNo;
			}
			// 排载
			if (cfg.type == 'split') {
				querySql = "&splitId=" + pId;
			}
			// 验货
			if (cfg.type == 'qc') {
				factoryId = mailSendId;
				querySql = "&orderId=" + pId + "&checkNo=" + pNo;
			}
			// 库存领用
			if (cfg.type == 'stockout' ||cfg.type =='stockapply' || cfg.type =='stockbuy' || cfg.type =='stockin'|| cfg.type =='stockcount') {
				querySql = "&outId=" + pId+ "&outNo=" + pNo;
			}
		}

		return true;
	}

	// 导出
	var exportRpt = function() {
		if (!check()) {
			return;
		}
		
		// 如果没有审核通过不让导出
		if (status != 9 && status != 2 && loginEmpId != "admin") {
			Ext.MessageBox.alert("提示消息", '对不起,该单还没审核通过,不能导出!');
			return false;
		}

		var formData = getFormValues(formPanel, true);
		if (formData.reportTemple == '') {
			Ext.MessageBox.alert("提示信息", '请选择导出模板!');
			return;
		}
		var headerFlag = true;
		// 不分页显示
		if (formData.radioGroup.inputValue == "0") {
			headerFlag = false
		}
		var exlSheet = false;
		var exlSheetObj = Ext.getCmp('exlSheet');
		if (exlSheetObj.checked == true) {
			exlSheet = true;
		}
		var rptUrl = exlAction + "?reportTemple=" + formData.reportTemple
				+ "&rptName=" + modelBox.getRawValue() + "&printType="
				+ formData.printType + "&headerFlag=" + headerFlag
				+ "&exlSheet=" + exlSheet + querySql;
		if (formData.printFacId != "") {
			rptUrl += "&factoryId=" + formData.printFacId;
		}
		// 下载不打开新页面
		downRpt(rptUrl);
	}
	if (!cfg.exportRptFn)
		cfg.exportRptFn = exportRpt;

	// 默认的预览action
	if (!cfg.viewAction) {
		cfg.viewAction = "./previewrpt.do";
	}

	// 预览方法
	var viewRpt = function() {
		if (!check()) {
			return;
		}

		var formData = getFormValues(formPanel, true);
		if (formData.reportTemple == '') {
			Ext.MessageBox.alert("提示信息", '请选择导出模板!');
			return;
		}

		// 审核通过printFlag为1 其他为0,用于隐藏打印预览页面的"打印"按钮
		var printFlag = 0;
		if (status == 9 || status == 2 || loginEmpId == "admin") {
			printFlag = 1;
		}
		var headerFlag = true;
		if (formData.radioGroup.inputValue == "0") {
			headerFlag = false
		}
		var _height = window.screen.height;
		var _width = window.screen.width;
		var url = cfg.viewAction + "?method=queryEleRpt&reportTemple="
				+ formData.reportTemple + "&headerFlag=" + headerFlag
				+ querySql + "&printFlag=" + printFlag;

		if (formData.printFacId != "") {
			url += "&factoryId=" + formData.printFacId;
		}
		openFullWindow(url);
	}
	if (!cfg.viewRptFn)
		cfg.viewRptFn = viewRpt;

	// 发邮件
	var sendMail = function() {
		if (!check()) {
			return;
		}

		// 如果没有审核通过不让发邮件
		if (status != 9 && status != 2 && loginEmpId != "admin") {
			Ext.MessageBox.alert("提示消息", '对不起,该单还没审核通过,不能发邮件!');
			return false;
		}

		var formData = getFormValues(formPanel, true);
		if (formData.reportTemple == '') {
			Ext.MessageBox.alert("提示信息", '请选择导出模板!');
			return;
		}

		if (custId == 0 && factoryId == 0) {
			Ext.MessageBox.alert("提示信息", '该单没有客户(厂家),不能发送邮件!');
			return;
		}
		mail.reportTemple = formData.reportTemple;
		mail.printType = formData.printType;

		var headerFlag = true;
		// 不分页显示
		if (formData.radioGroup.inputValue == "0") {
			headerFlag = false
		}
		mail.headerFlag = headerFlag;
		var exlSheet = false;
		var exlSheetObj = Ext.getCmp('exlSheet');
		if (exlSheetObj.checked == true) {
			exlSheet = true;
		}
		mail.exlSheet = exlSheet;

		var str = "";
		if (custId != 0) {
			DWREngine.setAsync(false);
			// 判断客户是否有邮箱
			queryService.getCustById(custId, function(res) {
						str = res.customerEmail;
						mail.custId = res.id;
						mail.custName = res.customerShortName;
					});
			DWREngine.setAsync(true);
			// if (str == null || str == '') {
			// Ext.MessageBox.alert("提示信息", '该客户还没有邮箱,请先去客户管理中添加!');
			// return;
			// }
		} else {
			DWREngine.setAsync(false);
			// 判断厂家是否有邮箱
			queryService.getFactoryById(factoryId, function(res) {
						str = res.factoryEmail;
						mail.custId = res.id;
						mail.custName = res.shortName;
					});
			DWREngine.setAsync(true);
			// if (str == null || str == '') {
			// Ext.MessageBox.alert("提示信息", '该厂家还没有邮箱,请先去厂家管理中添加!');
			// return;
			// }
		}
		mail.custEmail = str;
		mask('邮件配置中,请稍候......');
		var task = new Ext.util.DelayedTask(function() {
					DWREngine.setAsync(false);
					queryService.saveMail(mail, function(res) {
								unmask();
								if (res == "") {
									Ext.MessageBox.alert("提示信息",
											'请检查是否有设置客户或者联系人的邮箱,以及邮件配置是否正确!');
								} else {
									openWindowBase(535, 800,
											'cotmailsend.do?method=query&excelKey='
													+ res);
								}
							});
					DWREngine.setAsync(true);
				});
		task.delay(500);
	}
	if (!cfg.sendMail)
		cfg.sendMail = sendMail;

	var formPanel = new Ext.form.FormPanel({
				layout : 'form',
				labelWidth : 60,
				frame : true,
				border : false,
				autoHeight : true,
				buttonAlign : 'center',
				buttons : [{
							id : "export",
							text : '导出',
							scope : this,
							width : 65,
							iconCls : "page_excel",
							handler : cfg.exportRptFn
						}, {
							id : "preview",
							text : '打印预览',
							scope : this,
							width : 80,
							iconCls : "page_print",
							handler : cfg.viewRptFn
						}, {
							id : "mail",
							text : '发邮件',
							scope : this,
							width : 70,
							hidden :true,
							//hidden : (cfg.type == 'split') || (cfg.type == 'stockout') ? true : false,
							iconCls : "email_go",
							handler : cfg.sendMail
						}],
				items : [{
							xtype : 'radiogroup',
							fieldLabel : "",
							hideLabel : true,
							id : "radioGroup",
							items : [{
										boxLabel : '不分页显示',
										inputValue : 0,
										name : 'showHeader',
										id : "singlePage"
									}, {
										boxLabel : '分页显示',
										id : "allPage",
										inputValue : 1,
										name : 'showHeader',
										checked : true
									}]
						}, {
							xtype : 'checkboxgroup',
							fieldLabel : "",
							hideLabel : true,
							items : [{
										xtype : 'checkbox',
										boxLabel : '分Sheet导出',
										id : 'exlSheet',
										name : 'exlSheet'
									}]
						}, modelBox, typeBox, _self.facBox]

			})

	// ----------------------------excel打印----------------------------

	// 导出
	var export2Excel = function() {
		if (!check()) {
			return;
		}
		// 如果没有审核通过不让导出
		if (status != 9 && status != 2 && loginEmpId != "admin") {
			Ext.MessageBox.alert("提示消息", '对不起,该单还没审核通过,不能导出!');
			return false;
		}
		var listRpt = $('listRpt').value;

		if (listRpt=='' ) {
			Ext.MessageBox.alert("提示消息", '请先选择模板!');
			return false;
		}
		
		var	rptId = listRpt;
		var	rptName = listBoxExcel.getRawValue();

		var rptUrl = "./downExcelRpt.action?rptId=" + rptId+ "&rptName=" + rptName  + "&exlType="
				+ cfg.type + "&dataIdName=" + dataIdName + "&dataNoName=" + dataNoName+ "&dataId=" + dataId + "&dataNo=" + dataNo;

		// 下载不打开新页面
		downRpt(rptUrl);
	}

	var tplUrlExcel = "./servlet/DataSelvert?tbname=CotExcel&key=typeName&typeName=rptType&type="
			+ type;

	// 导出模板
	var listBoxExcel = new BindCombox({
				dataUrl : tplUrlExcel,
				cmpId : 'listRpt',
				fieldLabel : "excel模板",
				editable : true,
				sendMethod : "post",
				valueField : "id",
				displayField : "typeName",
				emptyText : '请选择',
				anchor : "95%",
				triggerAction : 'all'
			});
			
	// 设置默认模板
//	queryService.getExcelRptDefault(type, function(def) {
//				if (def != null) {
//					listBoxExcel.bindValue(def.id);
//				}
//			});


	var excelPanel = new Ext.form.FormPanel({
				layout : 'form',
				labelWidth : 60,
				height : 200,
				frame : true,
				border : false,
				items : [listBoxExcel],
				buttonAlign : 'center',
				buttons : [{
							text : '导出',
							scope : this,
							width : 65,
							iconCls : "page_excel",
							handler : export2Excel
						}]

			})

	// 底部标签页
	var tbl = new Ext.TabPanel({
				region : 'center',
				width : "100%",
				autoDestroy : false,
				activeTab : 0,
				border : false,
				items : [{
							title : "普通打印",
							layout : 'fit',
							items : [formPanel]
						}, {
							title : "excel打印",
							layout : 'fit',
							items : [excelPanel]
						}]
			});

	// 表单
	var con = {
		title : "打印及导出",
		buttonAlign : 'right',
		labelAlign : "right",
		layout : 'fit',
		width : 260,
		closeAction : 'hide',
		autoHeight : true,
		frame : true,
		items : [tbl]
//		items : [formPanel]
	};
	Ext.apply(con, cfg);
	PrintWin.superclass.constructor.call(this, con);
};
Ext.extend(PrintWin, Ext.Window, {});