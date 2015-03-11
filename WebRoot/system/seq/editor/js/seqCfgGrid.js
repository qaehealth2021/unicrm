/**
 * @author zhao
 * @class QH.seqCfg.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.seqCfg.GridPanel = Ext.extend(QH.grid.GridPanel,{
	initComponent:function(){
		var grid = this;
		this.title ="配置项";
		this.store = new QH.seqCfg.Store({
			autoLoad:false
		});
		this.columns = [{
			header:'',
			hidden:true,
			dataIndex:'id'
		},{
			header:'配置项',
			dataIndex:'key',
			width:120
		},{
			header:'说明',
			dataIndex:'typeName',
			width:170
		}];
		QH.seqCfg.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('seqcfggrid',QH.seqCfg.GridPanel);
