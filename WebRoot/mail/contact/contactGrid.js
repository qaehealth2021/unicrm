

/**
 * @author zhao
 * @class QH.mail.ContactGridPanel
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.mail.ContactGridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	factoryId:null,
	customerId:null,
	/**
	 * 区分厂家/客户/陌生
	 * @type String
	 */
	flag:'',
	editorDisable:true,
	initComponent:function(){
		var grid = this;
		var url = "";
		if (grid.flag == MAIL_CONTACT_FLAG.CUSTOMER)
			url = "list_customercontact.do";
		else if (grid.flag == MAIL_CONTACT_FLAG.FACTORY)
			url = "list_factorycontact.do";
			
		this.store = new QH.mail.ContactStore({
			url:url
		});
		this.store.on('load',function(store,records,options){
    		this.loadSelectionMail();
		},this);
		
		this.initSelectionModel();
		
		this.columns = [this.sm,{
			header: '国家',
			renderIndex:'customerId.nationId.nationShort',
			dataIndex:'customerId'
		},{
			header : grid.flag == MAIL_CONTACT_FLAG.CUSTOMER ? '客户' : '厂家',
			hidden : grid.flag == MAIL_CONTACT_FLAG.STRANGER ? true : false,
			renderIndex : grid.flag == MAIL_CONTACT_FLAG.CUSTOMER ? 'customerId.customerShortName' : 'factoryId.shortName',
			dataIndex : 'customerId'
		},{
			header:'联系人',
			dataIndex:'contactPerson'
		},{
			header:'联系电话',
			hidden:true,
			dataIndex:'contactNbr'
		},{
			header:'邮箱',
			width:200,
			dataIndex:'contactEmail'
		},{
			header:'职务',
			hidden:true,
			dataIndex:'contactDuty'
		},{
			header:'传真',
			hidden:true,
			dataIndex:'contactFax'
		},{
			header:'手机',
			hidden:true,
			dataIndex:'contactMobile'
		},{
			header:'备注',
			hidden:true,
			dataIndex:'remark'
		}];
		
		this.tbar = {
			xtype:'mailcontacttoolbar',
			grid:this
		}
		
		QH.mail.ContactGridPanel.superclass.initComponent.call(this);
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
        				this.contactGridSelecte(this.getPersonText(),true,record);
        			},
        			scope:this
        		},
        		'rowdeselect':{
        			fn:function(selModel,rowIndex,record){
        				if(!this.isReload){
        				 	this.contactGridSelecte(this.getPersonText(),false,record);
        				}
        			},
        			scope:this
        		}
        	}
		});
	},
	contactGridSelecte : function(field,isSelected,record){
		var value = field.getValue();
		var selValue = record.get('contactEmail');
		var selName = record.get('contactPerson');
		//没有邮箱地址不做处理
		if(selValue == null || selValue.trim() == '') return;
		if(isSelected){// 当选中时，如果地址栏不存在，则加入
			if(value.indexOf(selValue)==-1){
				var last = value.lastIndexOf(';');
				field.setValue(value.substring(0,last+1)
					+selName+'<'+selValue+'>;'
					+value.substring(last+1)); // 设置值
				field.oldValue = field.getValue();
			}
		}else{// 当不选中时，如果地址栏存在，则去除
			var index = value.indexOf(selValue);
			if(index!=-1){
				var start = value.lastIndexOf(';',index-1)+1;
				var last = value.indexOf(';',index)+1;
				field.setValue(value.substring(0,start)+value.substring(last));
				field.oldValue = field.getValue();
			}
		}
		field.fireEvent('change',field,field.getValue());
	},
	/**
	 * 获得当前被激活的地址栏，如果没有地址栏被激活，则取收件人一栏
	 * @return {}
	 */
	getPersonText:function(){
		return this.ownerCt.personField ?
				this.ownerCt.personField.personText : 
				QH_VIEWPORT.sendPanel.getForm().findField('to');
	},
	/**
	 * 根据激活地址栏的值，重新选中数据
	 * @param {} isReload
	 */
	loadSelectionMail:function(isReload){
		this.isReload = isReload || true;
		var records = this.getStore().getRange();
		
		if(this.getSelectionModel().getCount() > 0)
			this.getSelectionModel().clearSelections();
			
		var value = this.getPersonText().getValue();
		for(var i=0;i<records.length;i++){
			var email = records[i].get('contactEmail');
			var name = records[i].get('contactPerson');
			if(Ext.isEmpty(email))
				continue;
			// 判断是否已存在email，如果存在则选中行
			if(value.indexOf(email)!=-1)
				this.getSelectionModel().selectRow(i,true);
		}
		this.isReload = false;
	}
});
Ext.reg('mailcontactgrid',QH.mail.ContactGridPanel);
