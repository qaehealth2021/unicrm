
/**
 * @author zhao
 * @class QH.contact.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.contact.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	factoryId:null,
	customerId:null,
	showUsefulCol:false,//针对不同的页面决定先行哪些列,true:只显示需要的列
	/**
	 * 区分厂家/客户/陌生
	 * @type String
	 */
	flag:'',
	tbarCfg:{
		objName:'CotContact',
		listeners:{
			'beforeadddata':{
				fn:function(tbar,defaultData){
					var fcId=tbar.grid.customerId || tbar.grid.factoryId;
					var url = ''
					if(tbar.grid.flag == 'C')
						url = 'modify_customercontact.do';
					else if(tbar.grid.flag == 'F')
						url = 'modify_factorycontact.do';
//					openFullWindow(url+'?gridId='+tbar.grid.getId()+'&flag='+tbar.grid.flag+'&fcId='+fcId);
					openDeskWin('新增联系人',url+'?gridId='+tbar.grid.getId()+'&flag='+tbar.grid.flag+'&fcId='+fcId);
					return false;
				}
			}
		}
	},
	initComponent:function(){
		var grid = this;
		this.editorDisable = true;
		var url = "";
		if(grid.flag=='C') url = "list_customercontact.do";
		else if(grid.flag == 'F') url = "list_factorycontact.do";
		this.store = new QH.contact.Store({
			url:url
		});
		
		this.columns = [{
			header:'',
			hidden:true,
			dataIndex:'id'
		},{
			header: '国家',
			renderIndex:'customerId.nationId.nationShort',
			dataIndex:'customerId'
		},{
			header: '客户全称',
			renderIndex:'customerId.fullNameCn',
			dataIndex:'customerId'
		},{
			header: '客户地址',
			renderIndex:'customerId.customerAddress',
			dataIndex:'customerId'
		},{
			header: grid.flag=='C'?'客户':'厂家',
			hidden : grid.flag=='S'?true:false,
			editor:{
				maxLength:10,
				maxLengthText:'长度最大不能超过{0}'
			},
			renderIndex:grid.flag=='C'?'customerId.customerShortName':'factoryId.shortName',
			dataIndex:'customerId'
		},{
			header : "跟进人",
			dataIndex : "empsId.empsId",
			width : 90
		},{
			header:'联系人',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'联系人长度最大不能超过{0}'
			},
			dataIndex:'contactPerson'
		},{
			header:'电话',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'电话长度最大不能超过{0}'
			},
			hidden:this.showUsefulCol,
			dataIndex:'contactNbr',
			renderer:function(value){
				//拨电话需要加拨9
				return '<a href="sip:9'+value+'">'+value+'</a>';
			}
		},{
			header:'邮箱',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'邮箱长度最大不能超过{0}'
			},
			dataIndex:'contactEmail',
			renderer:function(value, metaData, record, rowIndex, colIndex, store){
				return '<div style="text-decoration:underline"><font color=blue>'+value+'</font></div>'
			}
		},{
			header:'职位',
			editor:{
				xtype:'textfield',
				maxLength:50,
				maxLengthText:'职位长度最大不能超过{0}'
			},
			hidden:this.showUsefulCol,
			dataIndex:'contactDuty'
		},{
			header:'传真',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'传真长度最大不能超过{0}'
			},
			hidden:this.showUsefulCol,
			dataIndex:'contactFax',
			renderer:function(value, metaData, record, rowIndex, colIndex, store){
				var customerId=record.data.customerId?record.data.customerId.id:null;
				var customerName=record.data.customerId?record.data.customerId.customerShortName:'';
				var contactId=record.data.id;
				var contactPerson=record.data.contactPerson;
				var faxNum=value;
				return '<a href="javascript:showAddFax('+customerId+','+contactId+',\''+customerName+'\',\''+contactPerson+'\',\''+faxNum+'\')">'+value+'</a>'			
			}
		},{
			header:'手机',
			editor:{
				xtype:'textfield',
				maxLength:100,
				maxLengthText:'长度最大不能超过{0}'
			},
			hidden:this.showUsefulCol,
			dataIndex:'contactMobile',
			renderer:function(value, metaData, record, rowIndex, colIndex, store){
				//拨电话需要加拨9
//				return '<a href="sip:9'+value+'">'+value+'</a>'	
				var customerName=record.data.customerId?record.data.customerId.customerShortName:'';
				var contactPerson=record.data.contactPerson;
				var contactId=record.data.id;
				return '<a href="javascript:choseOp('+contactId+',\''+value+'\',\''+customerName+'\',\''+contactPerson+'\')">'+value+'</a>'			
			}
		},{
			header:'X-Lite',
			hidden:this.showUsefulCol,
			dataIndex:'xLite',
			renderer:function(value){
				//拨电话需要加拨9
				return '<a href="sip:'+value+'">'+value+'</a>'			
			}
		}];
		
		this.tbar = {
			xtype:'contacttoolbar',
			grid:this
		}
		
		QH.contact.GridPanel.superclass.initComponent.call(this);
		this.on("rowdblclick",function(grid,rowIndex,e){
			this.updateData();
		},this);
		this.on('cellclick', function(grid, rowIndex, colIndex, e){
			var columnModel = grid.getColumnModel();
			var dataIndex = columnModel.getDataIndex( colIndex);
			if(dataIndex == "contactEmail"){
				var rec = grid.getStore().getAt(rowIndex);
				var empsId = rec.get("empsId")
				var custMail = rec.get("contactEmail")
				var contactPerson = rec.get("contactPerson")
				var custId = rec.get('customerId')
				this.sendMail(custMail,empsId.id,contactPerson,custId.id);
			}
		},this);
	},
	updateData:function(){
		var grid = this;
		var record = grid.getSelectionModel().getSelected();
		var fcId=grid.customerId || grid.factoryId;
		var url = ''
		if(grid.flag == 'C')
			url = 'modify_customercontact.do';
		else if(grid.flag == 'F')
			url = 'modify_factorycontact.do';
//		openFullWindow(url+'?gridId='+grid.getId()+'&id='+record.get('id')+'&flag='+grid.flag+'&fcId='+fcId);
		var tabName='联系人'+record.get('contactPerson');
		openDeskWin(tabName,url+'?gridId='+grid.getId()+'&id='+record.get('id')+'&flag='+grid.flag+'&fcId='+fcId,'contact_'+record.get('id'));
	},
	//打开发邮件界面
	sendMail :function(custMail,empsId,contactPerson,custId){
		//获取发件人账号
		mailAccountCfgService.getAccountCfgByEmpId(empsId,function(cfg){
			if(cfg){
				var params = {
					sendTypeStatus:'N'
				}
				params.accountId = cfg.id;
				params.contactEmail = custMail;
				params.contactPerson = contactPerson;
				params.custId = custId;
				openDeskWin("撰写邮件",'query_mailsend.do?'+Ext.urlEncode(params),"WRITE_MAIL_"+cfg.id);
			}else{
				window.alertMsg("没有找到邮箱账号,请到邮件设置模块进行配置");
			}
		})
}
});
Ext.reg('contactgrid',QH.contact.GridPanel);
