/**
 * @author zhao
 * @class QH.seq.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.seq.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	initComponent:function(){
		this.editorDisable = true;
		var grid = this;
		this.store = new QH.seq.Store();
		this.columns = [{
			header:'',
			editor:{
				maxLength:10,
				maxLengthText:'长度最大不能超过{0}'
			},
			hidden:true,
			dataIndex:'id'
		},{
			header:'单号名称',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'单号说明长度最大不能超过{0}'
			},
			dataIndex:'name'
		},{
			header:'表达式',
			editor:{
				xtype:'textfield',
				maxLength:50,
				maxLengthText:'单号配置长度最大不能超过{0}'
			},
			dataIndex:'seqCfg'
		},{
			header:'当前序列号',
			editor:{
				maxLength:10,
				maxLengthText:'当前序列号长度最大不能超过{0}'
			},
			dataIndex:'currentSeq'
		},{
			header:'归零方式',
			editor:{
				maxLength:10,
				maxLengthText:'归零方式长度最大不能超过{0}'
			},
			dataIndex:'zeroType',
			renderer : function(value) {
				if (value == 0)
					return "系统";
				else if (value == 1)
					return "按年";
				else if (value == 2)
					return "按月";
				else if (value == 3)
					return "按日";
			}
		}];
		
		this.tbar = {
			xtype:'seqtoolbar',
			grid:this
		}
		
		QH.seq.GridPanel.superclass.initComponent.call(this);
		this.on("rowdblclick",function(grid,rowIndex,e){
			this.updateData();
		},this);
	},
	updateData:function(){
		var grid = this;
		var record = grid.getSelectionModel().getSelected();
		openFullWindow('modify_seq.do?gridId='+grid.getId()+'&id='+record.get('id'));
	}

});
Ext.reg('seqgrid',QH.seq.GridPanel);
