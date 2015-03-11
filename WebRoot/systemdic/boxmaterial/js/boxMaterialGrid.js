/**
 * @author zhao
 * @class QH.boxMaterial.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.boxMaterial.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	editorDisable:true,
	tbarCfg:{
		objName:'CotBoxMaterial',
		tbarModel:'all',
		hiddenSaveAllBtn:true,
		hiddenRetractBtn:true,
		hiddenRetractAllBtn:true,
		listeners:{
			'beforeadddata':{
				fn:function(tbar,defaultData){
					openWindowBase(400, 700,'modify_boxmaterial.do?gridId='+tbar.grid.getId());
					return false;
				}
			}
		}
	},
	initComponent:function(){
		var grid = this;
		this.store = new QH.boxMaterial.Store();
		this.columns = [{
			header:'id',
			hidden:true,
			dataIndex:'id'
		},{
			header:'包材名称',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'包材名称长度最大不能超过{0}'
			},
			dataIndex:'value'
		},{
			header:'英文',
			editor:{
				xtype:'textfield',
				maxLength:150,
				maxLengthText:'英文长度最大不能超过{0}'
			},
			dataIndex:'valueEn'
		},{
			header:'备注',
			editor:{
				xtype:'textfield',
				maxLength:200,
				maxLengthText:'备注长度最大不能超过{0}'
			},
			dataIndex:'remark'
		},{
			header:'计价单位',
			editor:{
				xtype:'textfield',
				maxLength:20,
				maxLengthText:'计价单位长度最大不能超过{0}'
			},
			dataIndex:'unit'
		},{
			header:'材料单价',
			editor:{
				decimalPrecision:4,
				minValue:1.0E-4,
				minText:'材料单价最小值不能小于{0}',
				maxValue:9999.9999,
				maxText:'材料单价最大值不能超过{0}'
			},
			dataIndex:'materialPrice'
		},{
			header:'包装类型',
			editor:{
				maxLength:10,
				maxLengthText:'包装类型长度最大不能超过{0}'
			},
			renderIndex:'boxTypeId.typeName',
			dataIndex:'boxTypeId.id'
		},{
			header:'公式',
			editor:{
				maxLength:10,
				maxLengthText:'公式长度最大不能超过{0}'
			},
			dataIndex:'formulaId'
		},{
			header:'工厂',
			editor:{
				maxLength:10,
				maxLengthText:'工厂长度最大不能超过{0}'
			},
			renderIndex:'factoryId.shortName',
			dataIndex:'factoryId.id'
		}];
		
		this.tbar = {
			xtype:'boxmaterialtoolbar',
			grid:this
		}
		
		QH.boxMaterial.GridPanel.superclass.initComponent.call(this);
		this.on("rowdblclick",function(grid,rowIndex,e){
			this.updateData();
		},this);
	},
	updateData:function(){
		var grid = this;
		var record = grid.getSelectionModel().getSelected();
		openWindowBase(400, 700,'modify_boxmaterial.do?gridId='+grid.getId()+'&id='+record.get('id'));
	}
});
Ext.reg('boxmaterialgrid',QH.boxMaterial.GridPanel);
