/**
 * @author zhao
 * @class QH.price.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.price.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel, {
			editorDisable : true,
			// 0:整柜;1:拼箱;2:空运
			typeId : '',
			tbarCfg : {
				objName : 'CotPrice',
				tbarModel : 'base',
				hiddenSaveAllBtn : true,
				hiddenRetractBtn : true,
				hiddenAddBtn : true,
				hiddenDelBtn : true,
				hiddenRetractAllBtn : true
			},
			initComponent : function() {
				var grid = this;
				this.store = new QH.price.Store();
				this.columns = [{
							header : '',
							hidden : true,
							dataIndex : 'id'
						}, {
							header : "Carrier",
							dataIndex : "carrier",
							width : 110
						}, {
							header : "Pol",
							dataIndex : "polCode",
							width : 110
						}, {
							header : "Pod",
							dataIndex : "podCode",
							width : 110
						}, {
							header : 'Currency',
							dataIndex : 'currency',
							width : 80
						},{
							header : 'LCL',
							hidden:this.typeId=='Pin'?false:true,
							dataIndex : 'lcl',
							width : 80
						},{
							header : 'Destination Agent',
							hidden:this.typeId=='Pin'?false:true,
							dataIndex : 'destinationAgent',
							width : 120
						},{
							header : 'Destination Charges',
							hidden:this.typeId=='Pin'?false:true,
							dataIndex : 'destinationCharges',
							width : 140
						}, {
							header : "20GP",
							hidden:this.typeId=='Zheng'?false:true,
							dataIndex : "twenTygp",
							width : 110
						}, {
							header : '40GP',
							hidden:this.typeId=='Zheng'?false:true,
							dataIndex : 'forTygp',
							width : 110
						}, {
							header : '40HQ',
							hidden:this.typeId=='Zheng'?false:true,
							dataIndex : 'fortyHq',
							width : 110
						}, {
							header : '45HC',
							hidden:this.typeId=='Zheng'?false:true,
							dataIndex : 'fortyFiveHc',
							width : 110
						}, {
							header : '40NOR',
							hidden:this.typeId=='Zheng'?false:true,
							dataIndex : 'fortyNor',
							width : 110
						},  {
							header : 'MIN',
							hidden:this.typeId=='Kong'?false:true,
							dataIndex : 'min',
							width : 90
						}, {
							header : 'N',
							hidden:this.typeId=='Kong'?false:true,
							dataIndex : 'nprice',
							width : 90
						},{
							header : '+45',
							hidden:this.typeId=='Kong'?false:true,
							dataIndex : 'fortyFive',
							width : 90
						},{
							header : '+100',
							hidden:this.typeId=='Kong'?false:true,
							dataIndex : 'hundRed',
							width : 90
						},{
							header : '+300',
							hidden:this.typeId=='Kong'?false:true,
							dataIndex : 'threeHundRed',
							width : 90
						},{
							header : '+500',
							hidden:this.typeId=='Kong'?false:true,
							dataIndex : 'fiveHundRed',
							width : 90
						},{
							header : '+1000',
							hidden:this.typeId=='Kong'?false:true,
							dataIndex : 'thouSand',
							width : 90
						},{
							header : '+3000',
							hidden:this.typeId=='Kong'?false:true,
							dataIndex : 'threeThousand',
							width : 90
						},{
							header : 'FSC',
							hidden:this.typeId=='Kong'?false:true,
							dataIndex : 'fsc',
							width : 90
						},{
							header : 'SSC',
							hidden:this.typeId=='Kong'?false:true,
							dataIndex : 'ssc',
							width : 90
						},{
							header : 'THC',
							hidden:this.typeId=='Kong'?false:true,
							dataIndex : 'thc',
							width : 90
						},{
							header : 'FRE',
							hidden:this.typeId=='Kong'?false:true,
							dataIndex : 'fre',
							width : 90
						},{
							header : '1 T/S',
							dataIndex : 'onets',
							width : 120
						}, {
							header : '2 T/S',
							dataIndex : 'twots',
							width : 120
						},{
							header : '3 T/S',
							hidden:this.typeId=='Kong'?false:true,
							dataIndex : 'threets',
							width : 120
						}, {
							header : '(T/T)Days',
							dataIndex : 'days',
							width : 120
						}, {
							header : '有效期',
							dataIndex : 'validity',
							width : 120,
							renderer : Ext.util.Format
									.dateRenderer(QH_DATE_FORMAT)
						}, {
							header : '供应商',
							dataIndex : 'vender',
							width : 120
						}, {
							header : '录入人',
							dataIndex : 'inputPeople',
							width : 120
						}];

				this.tbar = {
					xtype : 'pricetoolbar',
					grid : this
				}

				QH.price.GridPanel.superclass.initComponent.call(this);
				this.on('selectionchange', function(grid, sm) {
							var rec = sm.getSelected();
							//给工具栏的复选框赋值
							grid.setToolChecks.defer(500, grid, [rec]);
							//给"常规"表单赋值
							grid.setRightValues.defer(500, grid, [rec]);
						});
			},
			getChoseRecs:function(){
				var sm=this.getSelectionModel();
				var ids="";
				var recs=sm.getSelections();
				if(recs.length>0){
					for (var i = 0; i < recs.length; i++) {
						ids+=recs[i].data.id+",";
					}
					ids=ids.substring(0,ids.length-1);
				}
				return ids;
			},
			setToolChecks:function(rec){
				if (rec) {
					var tabr=this.getOperateTbar();
					tabr.mon.setValue(rec.data.mon);
					tabr.tue.setValue(rec.data.tue);
					tabr.wed.setValue(rec.data.wed);
					tabr.thu.setValue(rec.data.thu);
					tabr.fri.setValue(rec.data.fri);
					tabr.sat.setValue(rec.data.sat);
					tabr.sun.setValue(rec.data.sun);
				}
			},
			setRightValues : function(rec) {
				var rightForm = QHERP_VIEWPORT.commonForm;
				if (rec) {
					if (rightForm.hidden) {
						rightForm.initRightForm(rec);
					}
				} else {
					if (rightForm.hidden) {
						rightForm.getForm().reset();
					}
				}
			}
		});
Ext.reg('pricegrid', QH.price.GridPanel);
