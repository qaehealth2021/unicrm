/**
 * 账号配置Grid
 * @author zhao
 * @class QH.mailAccountCfg.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.mailAccountCfg.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	editorDisable:true,
	tbarCfg:{
		addData:function(btn){
			if(!this.addCardWin)
				this.addCardWin = new QH.mailAccountCfg.AddCardWindow();
			this.addCardWin.show();
		}
	},
	initComponent:function(){
		
		var grid = this;
		this.store = new QH.mailAccountCfg.Store();
		this.columns = [{
			header:'所属部门',
			width:50,
			hidden:true,
			dataIndex:'empId.deptId.deptName'
		},{
			header:'所属员工',
			width:50,
			dataIndex:'empId.empsName'
		},{
			header:'邮箱账号',
			width:100,
			dataIndex:'mailAccount'
		},{
			header:'邮件服务器备份',
			width:60,
			dataIndex:'mailBackDay',
			renderer:function(v){
				if(v == 0)
					return "<B>不保留邮件备份</B>";
				else if(v > 0)
					return "<B>收取邮件"+v+"天后删除</B>";
				else
					return "保留全部邮件备份"
			}
		},{
			header:'自动接收间隔',
			width:50,
			dataIndex:'autoReceiveTime',
			renderer:function(v){
				if(v < 60)
					return v + "分钟";
				else if(v == 60)
					return "1小时";
				else
					return parseInt(v/60) + "小时" + v%60 + "分钟";
			}
		},{
			header:'账号别名',
			width:50,
			dataIndex:'mailNickname'
		},{
			header:'发件人名',
			width:50,
			dataIndex:'mailSendName'
		}];
		
		this.tbar = {
			xtype:'mailaccountcfgtoolbar',
			grid:this
		}
		
		QH.mailAccountCfg.GridPanel.superclass.initComponent.call(this);
		
		this.on('rowdblclick',this.modData,this);
	},
	modData:function(grid, rowIndex, e){
		var record = grid.getStore().getAt(rowIndex);
		if(!this.modWin)
			this.modWin = new QH.mailAccountCfg.UpdateWindow();
		this.modWin.show();
		this.modWin.loadValue(record.data);
	}
});
Ext.reg('mailaccountcfggrid',QH.mailAccountCfg.GridPanel);
