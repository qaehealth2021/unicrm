/**
 * @author zhao
 * @class QH.boxtSolution.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.boxtSolution.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.store = new QH.boxtSolution.Store();
		this.columns = [{
			header:'id',
			hidden:true,
			dataIndex:'id'
		},{
			header:'中文名',
			editor:{
				xtype:'textfield',
				maxLength:50,
				maxLengthText:'中文名长度最大不能超过{0}'
			},
			dataIndex:'typeName'
		},{
			header:'英文名',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'英文名长度最大不能超过{0}'
			},
			dataIndex:'typeNameEn'
		},{
			header:'产品包装',
			editor:{
				xtype:'boxmaterialbasecombo',
				queryParams : {
					"boxTypeId.id" : 1
				}
			},
			dataIndex:'pboxId.id',
			renderIndex:'pboxId.value'
		},{
			header:'内盒包装',
			editor:{
				xtype:'boxmaterialbasecombo',
				queryParams : {
					"boxTypeId.id" : 2
				}
			},
			dataIndex:'iboxId.id',
			renderIndex:'iboxId.value'
		},{
			header:'中盒包装',
			editor:{
				xtype:'boxmaterialbasecombo',
				queryParams : {
					"boxTypeId.id" : 3
				}
			},
			dataIndex:'mboxId.id',
			renderIndex:'mboxId.value'
		},{
			header:'外箱包装',
			editor:{
				xtype:'boxmaterialbasecombo',
				queryParams : {
					"boxTypeId.id" : 4
				}
			},
			dataIndex:'oboxId.id',
			renderIndex:'oboxId.value'
		},{
			header:'插格包装',
			editor:{
				xtype:'boxmaterialbasecombo',
				queryParams : {
					"boxTypeId.id" : 5
				}
			},
			dataIndex:'inputBoxId.id',
			renderIndex:'inputBoxId.value'
		}];
		
		this.tbar = {
			xtype:'boxtsolutiontoolbar',
			grid:this
		}
		
		QH.boxtSolution.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('boxtsolutiongrid',QH.boxtSolution.GridPanel);
