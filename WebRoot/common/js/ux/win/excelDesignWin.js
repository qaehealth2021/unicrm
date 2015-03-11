/**
 * 自定义excel导入模板 azan
 * 
 * @class QH.ux.win.ExcelDesignWin
 * @extends QH.Window
 */
QH.ux.win.ExcelDesignWin = Ext.extend(QH.Window, {
			width : 800,
			height : 420,
			title : "自定义EXCEL模版",
			modal : true,
			id : "excelDesignWin",
			flag : 0,// 默认0表示同步样品父货号,1为子货号
			uploadEle : 0,// 默认0表示报价→样品,1为样品→报价
			tongType : '',// 同步类型:报价price 订单order
			grid : '',// 需要同步数据的表格
			initComponent : function() {
				var win = this;
				this.items = new Ext.Panel({
							border : false,
							layout:'fit',
							items : [{
										xtype : 'iframepanel',
										defaultSrc : './defineExcelmodule.do',
										frameConfig : {
											autoCreate : {
												id : 'excelDesignFrm'
											}
										},
										width : "100%",
										height : 420,
										loadMask : {
											msg : '数据读取中...'
										}
									}]
						});
				QH.ux.win.ExcelDesignWin.superclass.initComponent.call(this);
			},
			downLoad : function() {
				var child = window.frames["excelDesignFrm"];
				var eleSelect = child.$('eleSelect').options;
				var boxSelect = child.$('boxSelect').options;
				// 判断是否有选择字段
				if (eleSelect.length == 0 && boxSelect.length == 0) {
					Ext.Msg.alert("提示信息", '您还没有选择要导入的内容！');
					return;
				}
				// 选中的样品字段
				var eleStr = new Array();
				for (var i = 0; i < eleSelect.length; i++) {
					eleStr.push(eleSelect[i].value);
				}
				// 选中的包装信息字段
				var boxStr = new Array();
				for (var i = 0; i < boxSelect.length; i++) {
					boxStr.push(boxSelect[i].value);
				}
				document.location.replace("./servlet/DownDesignServlet?eleStr="
						+ eleStr + "&boxStr=" + boxStr);
			}
		});
Ext.reg('exceldesignwin', QH.ux.win.ExcelDesignWin);