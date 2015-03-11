/**
 * 样品档案父货号间的同步操作选择 azan
 * 
 * @class QH.ux.win.TongChooseWin
 * @extends QH.Window
 */
QH.ux.win.TongChooseWin = Ext.extend(QH.Window, {
	width : 800,
	height : 420,
	title : "选择需要同步的信息",
	modal : true,
	id : "tongChooseWin",
	flag : 0,// 默认0表示同步样品父货号,1为子货号
	uploadEle : 0,// 默认0表示报价→样品,1为样品→报价
	tongType:'',//同步类型:报价price 订单order
	grid : '',// 需要同步数据的表格
	initComponent : function() {
		var win = this;
		this.items = new Ext.Panel({
					border : false,
					items : [{
								xtype : 'iframepanel',
								defaultSrc : './base.do?method=tong&flag='
										+ win.flag,
								frameConfig : {
									autoCreate : {
										id : 'tongChooseFrm'
									}
								},
								width : "100%",
								height : 420,
								loadMask : {
									msg : '数据读取中...'
								}
							}]
				});
		QH.ux.win.TongChooseWin.superclass.initComponent.call(this);
	},
	tong : function() {
		var child = window.frames["tongChooseFrm"];
		// 是否同步图片
		var isPic = child.$('isPic').checked;
		var eleSelect = child.$('eleSelect').options;
		var boxSelect = child.$('boxSelect').options;
		// 判断是否有选择字段
		if (eleSelect.length == 0 && boxSelect.length == 0 && isPic == false) {
			Ext.Msg.alert("提示信息", '您还没有选择要同步的内容！');
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
		if (this.uploadEle == 0) {
			// 报价同步到样品
			this.updateToEle(eleStr, boxStr, isPic);
		} else if (this.uploadEle == 1) {
			// 样品同步到报价
			this.updateToPrice(eleStr, boxStr, isPic);
		}
	},
	// 更新到样品表
	updateToEle : function(eleStr, boxStr, isPic) {
		var self = this;
		var flag = this.flag;
		var tongType = this.tongType;
		var grid = this.grid;
		var json = "{";
		var sm = this.grid.getSelectionModel();
		var cord = sm.getSelections();
		Ext.each(cord, function(item) {
					if (item.data.eleId.trim() != '' && item.data.id) {
						// 判断货号是否重复,重复取后一条去覆盖
						json += "'" + item.data.eleId + "':'" + item.data.id
								+ "',";
					}
				});
		var obj = Ext.decode(json.substring(0, json.length - 1) + "}");
		var isExistAry = new Array();
		for (var p in obj) {
			isExistAry.push(p);
		}
		cotTongService.findIsExistInEle(isExistAry, function(res) {
					var sameTemp = '';
					var same = res.same;
					for (var i = 0; i < same.length; i++) {
						sameTemp += same[i] + ",";
					}
					// 获得不存在样品档案的货号的随机数
					var dis = res.dis;
					// 如果为子货号时,如果样品档案不存在,查询该父货号存不存在样品档案,父货号存在时才新增
					var pId = null;// 父货号的id
					if (flag == 1 && dis.length > 0) {
						var parentId = grid.getStore().baseParams.parentId;
						var parentEleId = Ext.getCmp('parentGrid').getStore()
								.getById(parentId).get("eleId");
						DWREngine.setAsync(false);
						cotTongService.findIdByEleId(parentEleId,
								function(tes) {
									if (tes == null) {
										dis = [];
									} else {
										pId = tes;
									}
								});
						DWREngine.setAsync(true);
					}
					if (same.length != 0) {
						Ext.MessageBox.confirm('提示信息', '已存在样品货号' + sameTemp
										+ "是否覆盖原样品记录?", function(btn) {
									if (btn == 'yes') {
										cotTongService.updateToEle(obj, same,
												dis, eleStr, boxStr, isPic,
												pId,tongType, function(res) {
													Ext.MessageBox.alert(
															'提示消息', '同步成功!');
													self.close();
												});
									} else {
										if (dis.length != 0) {
											cotTongService.updateToEle(obj,
													null, dis, eleStr, boxStr,
													isPic, pId,tongType, function(res) {
														Ext.MessageBox
																.alert('提示消息',
																		'同步成功!');
														self.close();
													});
										}
									}
								});
					} else {
						if (dis.length != 0) {
							cotTongService.updateToEle(obj, null, dis, eleStr,
									boxStr, isPic, pId, tongType,function(res) {
										Ext.MessageBox.alert('提示消息', '同步成功!');
										self.close();
									});
						} else {
							Ext.MessageBox.alert('提示消息', '请先同步父货号,再同步子货号!');
							self.close();
						}
					}
				});
	},
	// 样品更新到报价
	updateToPrice : function(eleStr, boxStr, isPic) {
		var idsAry = new Array();
		var self = this;
		var grid = self.grid;
		var tongType = this.tongType;
		var sm = grid.getSelectionModel();
		var cord = sm.getSelections();
		if (cord.length == 0) {
			Ext.MessageBox.alert('提示消息', '请选择需要被样品同步的记录！');
			return;
		}
		var json = "{";
		Ext.each(cord, function(item) {
					if(item.data.id){
						json += "'" + item.data.id + "':'" + item.data.eleId + "',";
					}
				});
		var obj = Ext.decode(json.substring(0, json.length - 1) + "}");

		Ext.MessageBox.confirm('提示信息', '您确定同步样品资料到所选的记录吗?', function(btn) {
					if (btn == 'yes') {
						cotTongService.updateEleToDetail(obj,eleStr,
								boxStr, isPic,tongType, function(res) {
									if(res==true){
										grid.getStore().reload();
										Ext.MessageBox.alert('提示消息', '同步成功！');
									}else{
										Ext.MessageBox.alert('提示消息', '找不到任何对应的样品资料！');
									}
									self.close();
								});
					}
				});

	}

});
Ext.reg('tongchoosewin', QH.ux.win.TongChooseWin);