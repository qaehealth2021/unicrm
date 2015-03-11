/**
 * ireport和excel打印面板 azan
 * 
 * @class QH.ux.PrintPanel
 * @extends Ext.Panel
 */
QH.ux.PrintPanel = Ext.extend(Ext.Panel, {
	/**
	 * 报表类型
	 * @type String
	 */
	reportType : '',
	/**
	 * 需要进行报表处理的表格
	 * @type String
	 */
	grid : null,
	/**
	 * 需要查询的表
	 * @type String
	 */
	tableName : "",
	formPnlId : '',
	/**
	 * 审核通过的单显示打印按钮
	 * @type Number
	 */
	printFlag : 1,
	/**
	 * 导出的报表文件名
	 * @type String
	 */
	exportFileName : "",
	/**
	 * 查询前缀，可能查询的对象中含有前缀，在后台查询的时候，需要把这些前缀去掉
	 * 如：fittings.fitNo 查询前缀就是fittings，即点的前面就是前缀
	 * @type String
	 */
	queryPrefix : "",
	/**
	 * 报名类型的ID，如标签报表类型是10，等等
	 * @type Number
	 */
	reportTypeId : 0,
	/**
	 * 查询参数对象
	 * @type 
	 */
	queryParams : {},
	/**
	 * 是否需要对Id进行限制，一般单据报表的时候，需要限制，传递到后台，会有一个ID参数作为查询条件
	 * @type Boolean
	 */
	needQueryId : true,
	/**
	 * ireport预览action
	 * @type String
	 */
	viewAction : './gen_report.do',//-结束---azan 02-27修改--genreport改成gen_report--
	/**
	 * ireport导出sevlet
	 * @type String
	 */
	excelAction : './servlet/DownloadServlet',
	initComponent : function() {
		var pnl = this;
		//pnl.reportTemple='reportTemple'+pnl.reportType;
		//pnl.radioGroup='radioGroup'+pnl.reportType;
		//pnl.exlSheet='exlSheet'+pnl.reportType;
		//pnl.printType='printType'+pnl.reportType;
		//pnl.listRpt='listRpt'+pnl.reportType;
		//报表类型的id
		//		var typeId;
		//		DWREngine.setAsync(false);
		//		baseDataUtil.getDefaultMap(CACHE_DEFAULT_RPT_TYPE,function(res){
		//			typeId=res[pnl.reportType];
		//		});
		//		DWREngine.setAsync(true);
		var tbl = new Ext.Panel({
			border : false,
			frame:true,
			layout:'form',
			labelWidth:60,
			buttonAlign : 'center',
			buttons : [{
						text : '导出',
						width : 65,
						handler : pnl.exportRptFn.createDelegate(pnl),
						iconCls : "page_excel"
					}, {
						text : '预览',
						width : 65,
						handler : pnl.viewRpt.createDelegate(pnl),
						iconCls : "page_print"
					}, {
						text : '发邮件',
						width : 70,
						//								hidden:true,
						 handler : pnl.sendMail.createDelegate(pnl),
						iconCls : "email_go"
					}, {
						text : '发传真',
						width : 70,
						//								hidden:true,
						 handler : pnl.sendFax.createDelegate(pnl),
						iconCls : "fax_go"
					}],
			items : [{
						xtype : 'radiogroup',
						fieldLabel : "",
						hideLabel : true,
						//id : pnl.radioGroup,
						ref : "../radiogroup",
						items : [{
							boxLabel : '不分页显示',
							inputValue : 0,
							name : 'showHeader'
								//id : "singlePage"
							}, {
							boxLabel : '分页显示',
							//id : "allPage",
							inputValue : 1,
							name : 'showHeader',
							checked : true
						}]
					}, {
						xtype : 'checkboxgroup',
						fieldLabel : "",
						hideLabel : true,
						ref : "../excelSheet",
						items : [{
									xtype : 'checkbox',
									boxLabel : '分Sheet导出',
									//id : pnl.exlSheet,
									name : pnl.exlSheet
								}]
					}, {
						xtype : "rptfilebasecombo",
						emptyText : '请选择报表',
						anchor : '95%',
						fieldLabel : '模板',
						queryParams : {
							"rptTypeId.id" : this.reportTypeId
						},
						ref : "../rptfilecombo",
						listeners : {
							'afterrender' : function(com) {
								var conditon = {
									"rptTypeId.id" : pnl.reportTypeId,
									"defaultFlag" : "Y"
								}
								com.bindValueByCondition(conditon);
							}
						}
						//id:"rptfilecombo"
					}, {
						name : pnl.printType,
						//id : pnl.printType,
						ref : "../exportType",
						xtype : 'combo',
						fieldLabel : "导出类型",
						editable : false,
						store : new Ext.data.SimpleStore({
									fields : ["id", "name"],
									data : [['EXCEL', 'XLS'], ['PDF', 'PDF']]
								}),
						valueField : "id",
						value : "EXCEL",
						displayField : "name",
						mode : 'local',
						anchor : '95%',
						triggerAction : 'all',
						selectOnFocus : false
					}]
		});
		this.layout="fit";
		this.items = [tbl];
		QH.ux.PrintPanel.superclass.initComponent.call(this);
		//-开始---azan 02-27修改----
		this.addEvents(
				/**
				 * @event getqueryparams
				 *        获得多条打印的参数
				 * @param {Panel}
				 */
				'getqueryparams');
		//-结束---azan 02-27修改----
	},
	check : function() {
		var pId = '';
		var pNo = '';
		if (!this.needQueryId)
			return true;
		//如果是表格点击打印,判断是否勾选一条记录
		if (this.grid) {
			var list = this.grid.getSelectionModel().getSelections();
			if (list.length == 0) {
				alertMsg("请选择一条记录");
				return false;
			} else if (list.length > 1) {
				alertMsg("提示消息", "只能选择一条记录!")
				return false;
			}
			//pId = list[0].id;
			//pNo = encodeURIComponent(list[0].data.orderNo);
		} else {
			//pId = this.formPnlId;
			//pNo = encodeURIComponent($('orderNo').value);
		}
		//this.querySql = "&pId=" + pId+ "&pNo="+pNo;
		return true;
	},
	/**
	 * 导出 
	 * 传入 模板路径,是否分页显示,是否分sheet,查询参数,导出类型,模板名称
	 */
	exportRptFn : function() {
		if (!this.check()) {
			return;
		}
		//var rptfilecombo = Ext.getCmp("rptfilecombo");
		var reportTemple = this.rptfilecombo.getValue();
		if (reportTemple == '') {
			alertMsg("提示信息", '请选择导出模板!');
			return;
		}
		var headerFlag = true;
		var chkRadio = this.radiogroup.getValue().getRawValue();
		if (chkRadio == 0) {
			headerFlag = false;
		}
		var exlSheet = false;
		var sheet = this.excelSheet.getValue();
		if (sheet.length > 0) {
			exlSheet = true;
		}
		//		if (sheet.checked == true) {
		//			exlSheet = true;
		//		}
		var rptName = this.rptfilecombo.getRawValue();
		var printType = this.exportType.getValue();
		/**
		 * 生成传递到后台的参数
		 */
		var downJson = {
			"tableName" : this.tableName,
			"queryPrefix" : this.queryPrefix,
			"exlSheet" : exlSheet,
			"exportType" : printType,
			"expFileName" : this.exportFileName == ""
					? rptName
					: this.exportFileName
		};
		var id = null;
		if (this.needQueryId) {
			if (this.grid) {
				var list = this.grid.getSelectionModel().getSelections();
				id = list[0].data.id;
			} else {
				id = $("modId").value;
			}
			downJson["id"] = id;
		}
		//-开始---azan 02-27修改----
		//触发事件看看外部调用 有没有 在组件渲染后重新给queryParams赋值
		this.fireEvent('getqueryparams', this);
		//-结束---azan 02-27修改----
		if (this.grid.getChoseRecs) {
			var ids = this.grid.getChoseRecs();
			if (ids == "") {
				Ext.MessageBox.alert('提示消息', '请先勾选要打印导出的记录!');
				return;
			}
			this.queryParams.ids = ids;
		}
		Ext.apply(downJson, this.queryParams);
		var re = /\\/g
		var url = './servlet/DownloadServlet?type=JASPER_REPORT&filepath='
				+ reportTemple.replace(re, "%2F") + "&downJson="
				+ Ext.encode(downJson);

		//		var rptUrl = this.excelAction + "?reportTemple=" + reportTemple
		//				+ "&rptName=" + rptName + "&printType="
		//				+ printType + "&headerFlag=" + headerFlag
		//				+ "&exlSheet=" + exlSheet + this.querySql;
		downRpt(url);
	},
	/**
	 * 预览 
	 * 传入 模板路径,是否分页显示,查询参数
	 */
	viewRpt : function() {
		if (!this.check()) {
			return;
		}
		//var rptfilecombo = Ext.getCmp("rptfilecombo");
		var reportTemple = this.rptfilecombo.getValue();
		if (reportTemple == '') {
			alertMsg('请选择导出模板!');
			return;
		}
		var headerFlag = true;
		var chkRadio = this.radiogroup.getValue().getRawValue();
		if (chkRadio == 0) {
			headerFlag = false;
		}
		var downJson = {
			"tableName" : this.tableName,
			"queryPrefix" : this.queryPrefix
		};
		var id = null;
		if (this.needQueryId) {
			if (this.grid) {
				id = list[0].data.id;
			} else {
				id = $("modId").value;
			}
			downJson["id"] = id;
		}
		//-开始---azan 02-27修改----
		//触发事件看看外部调用 有没有 在组件渲染后重新给queryParams赋值
		this.fireEvent('getqueryparams', this);
		//-结束---azan 02-27修改----

		if (this.grid.getChoseRecs) {
			var ids = this.grid.getChoseRecs();
			if (ids == "") {
				Ext.MessageBox.alert('提示消息', '请先勾选要打印导出的记录!');
				return;
			}
			this.queryParams.ids = ids;
		}

		Ext.apply(downJson, this.queryParams);
		var url = this.viewAction + "?reportTemple=" + reportTemple
				+ "&headerFlag=" + headerFlag + "&printFlag=" + this.printFlag
				+ "&downJson=" + Ext.encode(downJson);
		openFullWindow(url);
	},
	//发传真
	sendFax:function(){
		if (!this.check()) {
			return;
		}
		var reportTemple = this.rptfilecombo.getValue();
		if (reportTemple == '') {
			alertMsg("提示信息", '请选择导出模板!');
			return;
		}
		var headerFlag = true;
		var chkRadio = this.radiogroup.getValue().getRawValue();
		if (chkRadio == 0) {
			headerFlag = false;
		}
		var exlSheet = false;
		var sheet = this.excelSheet.getValue();
		if (sheet.length > 0) {
			exlSheet = true;
		}
		var rptName = this.rptfilecombo.getRawValue();
		var printType = this.exportType.getValue();
		/**
		 * 生成传递到后台的参数
		 */
		var re = /\\/g
		var downJson = {
			"filepath" : reportTemple.replace(re, "%2F"),
			"tableName" : this.tableName,
			"queryPrefix" : this.queryPrefix,
			"exlSheet" : exlSheet,
			"exportType" : printType,
			"expFileName" : this.exportFileName == ""
					? rptName
					: this.exportFileName
		};
		var id = null;
		if (this.needQueryId) {
			if (this.grid) {
				var list = this.grid.getSelectionModel().getSelections();
				id = list[0].data.id;
			} else {
				id = $("modId").value;
			}
			downJson["id"] = id;
		}
		//-开始---azan 02-27修改----
		//触发事件看看外部调用 有没有 在组件渲染后重新给queryParams赋值
		this.fireEvent('getqueryparams', this);
		//-结束---azan 02-27修改----
		if (this.grid.getChoseRecs) {
			var ids = this.grid.getChoseRecs();
			if (ids == "") {
				Ext.MessageBox.alert('提示消息', '请先勾选要打印导出的记录!');
				return;
			}
			this.queryParams.ids = ids;
		}
		Ext.apply(downJson, this.queryParams);
		
		mask('生成传真文件中,请稍候......');
		var task = new Ext.util.DelayedTask(function() {
					DWREngine.setAsync(false);
					baseDataUtil.getRpt(Ext.encode(downJson), function(res) {
								unmask();
								var obj={};
								obj.url=res;
								var win=new QH.faxsend.FaxSendSendWin({
									fdObj:obj
								});
								win.show();
							});
					DWREngine.setAsync(true);
				});
		task.delay(500);
		
	},
	// 发邮件
	sendMail : function() {
		if (!this.check()) {
			return;
		}
		var reportTemple = this.rptfilecombo.getValue();
		if (reportTemple == '') {
			alertMsg("提示信息", '请选择导出模板!');
			return;
		}
		var headerFlag = true;
		var chkRadio = this.radiogroup.getValue().getRawValue();
		if (chkRadio == 0) {
			headerFlag = false;
		}
		var exlSheet = false;
		var sheet = this.excelSheet.getValue();
		if (sheet.length > 0) {
			exlSheet = true;
		}
		var rptName = this.rptfilecombo.getRawValue();
		var printType = this.exportType.getValue();
		/**
		 * 生成传递到后台的参数
		 */
		var downJson = {
			"tableName" : this.tableName,
			"queryPrefix" : this.queryPrefix,
			"exlSheet" : exlSheet,
			"exportType" : printType,
			"expFileName" : this.exportFileName == ""
					? rptName
					: this.exportFileName,
			"rptFile":reportTemple
		};
		var id = null;
		if (this.needQueryId) {
			if (this.grid) {
				var list = this.grid.getSelectionModel().getSelections();
				id = list[0].data.id;
			} else {
				id = $("modId").value;
			}
			downJson["id"] = id;
		}
		//-开始---azan 02-27修改----
		//触发事件看看外部调用 有没有 在组件渲染后重新给queryParams赋值
		this.fireEvent('getqueryparams', this);
		//-结束---azan 02-27修改----
		if (this.grid.getChoseRecs) {
			var ids = this.grid.getChoseRecs();
			if (ids == "") {
				Ext.MessageBox.alert('提示消息', '请先勾选要打印导出的记录!');
				return;
			}
			this.queryParams.ids = ids;
		}
		Ext.apply(downJson, this.queryParams);
		
		mask('邮件配置中,请稍候......');
		var task = new Ext.util.DelayedTask(function() {
		DWREngine.setAsync(false);
		var attachPath = "";
		baseDataUtil.saveMail(Ext.encode(downJson), function(res) {
					unmask();
					attachPath = res;
//								openWindowBase(535, 800,
//										'cotmailsend.do?method=query&excelKey='
//												+ res);
				});
		mailAccountCfgService.getAccountCfgByEmpId(window.GET_SESSION_EMPS_ID,function(cfg){
			if(cfg){
				var params = {
					sendTypeStatus:'N'
				}
				params.accountId = cfg.id;
				//params.contactEmail = custMail;
				//params.contactPerson = contactPerson;
				//params.custId = custId;
				params.attachPath = attachPath;
				openDeskWin("撰写邮件",'query_mailsend.do?'+Ext.urlEncode(params),"WRITE_MAIL_"+cfg.id);
			}else{
				window.alertMsg("没有找到邮箱账号,请到邮件设置模块进行配置");
			}
		})
		DWREngine.setAsync(true);
				});
		task.delay(500);
	}
});

Ext.reg('printpanel', QH.ux.PrintPanel);