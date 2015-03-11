
QH.mail.RemoteGrid = Ext.extend(QH.grid.GridPanel,{
	autoExpandColumn:'subject',
	accountId:'',
	initComponent:function(){
		
		this.store = new QH.mail.RemoteStore();
		this.store.setBaseParam('accountId',this.accountId);
		
		var columns = [];
		columns.push({header: '发件人', width: 180,dataIndex: 'sender',renderer:QH.mail.senderNameRenderer});
		columns.push({id:'subject',header: "主题",width:100,hideable:false,menuDisabled:true,renderer:QH.mail.subjectRenderer, dataIndex: 'subject'});
		columns.push({header: "时间",width: 140, renderer: QH.mail.dateYMDHIRenderer, dataIndex: 'sendTime'});
		columns.push({header: "大小", width: 70, align:'right', renderer: QH.mail.sizeRenderer, dataIndex: 'size'});
		
		this.colModel = new Ext.grid.ColumnModel({
    		columns:columns,
	    	defaults:{
	            sortable: true,
             	groupable: false,
	            menuDisabled: false
        	}
	    });
		
		
		QH.mail.RemoteGrid.superclass.initComponent.call(this);
	}
});

Ext.reg('mailremotegrid',QH.mail.RemoteGrid);