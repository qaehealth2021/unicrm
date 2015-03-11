/**
 * @author zhao
 * @class QH.dept.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.dept.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		var grid = this;
		this.store = new QH.dept.Store({
			remoteSort:true
		});
		this.columns = [{
			header:'',
			hidden:true,
			dataIndex:'id'
		},{
			header:'公司',
			editor:{
				xtype:'companybasecombo'
			},
			renderIndex:'companyId.companyShortName',
			dataIndex:'companyId.id'
		},{
			header:'部门名称',
			editor:{
				xtype:'textfield',
				maxLength:50,
				maxLengthText:'部门名称长度最大不能超过{0}'
			},
			dataIndex:'deptName'
		},{
			header:'备注',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'长度最大不能超过{0}'
			},
			dataIndex:'remark'
		}];
		
		this.tbar = {
			xtype:'depttoolbar',
			grid:this
		}
		
		QH.dept.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('deptgrid',QH.dept.GridPanel);
