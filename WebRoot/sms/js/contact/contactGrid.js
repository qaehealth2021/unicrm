

/**
 * @author azan
 * @class QH.sms.ContactGridPanel
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.sms.ContactGridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	factoryId:null,
	customerId:null,
	editorDisable:true,
	srcGridId:null,
	initComponent:function(){
		var grid = this;
		var url="list_customercontact.do";
		if(this.srcGridId!=null){
			url="listdetail_sms.do";
		}
		this.store = new QH.sms.ContactStore({url:url});
		if(this.srcGridId!=null){
			this.store.setBaseParam('sms.Id', this.srcGridId);
		}
		this.store.on('load',function(store,records,options){
//    		this.loadSelectionMail();
		},this);
		
		this.initSelectionModel();
		
		this.columns = [this.sm,{
			header :'客户',
			renderIndex : 'customerId.customerShortName',
			dataIndex : 'customerId'
		},{
			header:'联系人',
			dataIndex:'contactPerson'
		},{
			header:'传真',
			dataIndex:'contactFax'
		},{
			header:'手机',
			dataIndex:'contactMobile'
		}];
		
		this.tbar = {
			xtype:'smscontacttoolbar',
			chooseModel:this.srcGridId!=null?true:false,
			grid:this
		}
		
		QH.sms.ContactGridPanel.superclass.initComponent.call(this);
		this.on("rowdblclick", function(grid, rowIndex, e) {
			var record = grid.getStore().getAt(rowIndex);
			if(grid.isFax)
				grid.insertTo(record);
		}, this);
	},
	initSelectionModel : function(){
		this.sm = new Ext.grid.CheckboxSelectionModel({
			onMouseDown : function(e, t){
		        if(e.button === 0 ){ // 让单击grid的单元格就可以添加或去除选中项
		            e.stopEvent();
		            var row = e.getTarget('.x-grid3-row');
					if(row){
		                var index = row.rowIndex;
		                if(this.isSelected(index)){
		                    this.deselectRow(index);
		                }else{
		                    this.selectRow(index, true);
		                }
		            }
		        }
		        this.mouseHandled = false;
		    },
		    defaults:{
	            menuDisabled: true 
        	},
        	listeners:{
        		'rowselect':{
        			fn:function(selModel,rowIndex,record){
//        				this.contactGridSelecte(this.getPersonText(),true,record);
        			},
        			scope:this
        		},
        		'rowdeselect':{
        			fn:function(selModel,rowIndex,record){
        				if(!this.isReload){
//        				 	this.contactGridSelecte(this.getPersonText(),false,record);
        				}
        			},
        			scope:this
        		}
        	}
		});
	},
	insertTo:function(){
		var selModel = this.getSelectionModel();
		var records = selModel.getSelections();
		var ary=new Array();
		//过滤掉没有手机号码的联系人
		for (var i = 0; i < records.length; i++) {
			if(records[i].data.contactMobile){
				ary.push(records[i]);
			}
		}
		if(ary.length==0){
			alertMsg('您选择的客户联系人还没设置手机号码!');
		}else{
			var ds = Ext.getCmp('choseGrid').getStore();
			ds.add(ary);
		}
	}
});
Ext.reg('smscontactgrid',QH.sms.ContactGridPanel);
