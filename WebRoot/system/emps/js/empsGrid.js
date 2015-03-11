/**
 * @author zhao
 * @class QH.emps.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.emps.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	editorDisable:true,
	tbarCfg:{
		objName:'CotEmps',
		tbarModel:'all',
		batchUpdateCfg:[{
			xtype : 'textfield',
			fieldLabel:'英文名',
			name:'empsNameEn',
			anchor : "100%",
			maxLength : 50,
			maxLengthText : '英文名长度最大不能超过{0}'
		},{
			xtype : 'textfield',
			fieldLabel:'中文名',
			anchor : "100%",
			name:'empsName',
			maxLength : 50,
			maxLengthText : '中文名长度最大不能超过{0}'
		},{
			xtype : "textfield",
			fieldLabel : "电话号码",
			anchor : "100%",
			name : "empsPhone",
			maxLength : 100
		},{
			xtype:'numberfield',
			fieldLabel:'状态',
			anchor : "100%",
			name : "empsStatus",
			maxValue:1,
			minValue:0
		}],
		hiddenSaveAllBtn:true,
		hiddenRetractBtn:true,
		hiddenRetractAllBtn:true,
		listeners:{
			'beforeadddata':{
				fn:function(tbar,defaultData){
//					openWindowBase(268, 710,'modify_emps.do?gridId='+tbar.grid.getId());
					openDeskWin('新增员工','modify_emps.do?gridId='+tbar.grid.getId());
					return false;
				}
			}
		}
	},
	initComponent:function(){
		var grid = this;
		this.store = new QH.emps.Store();
		this.columns = [{
			header:'',
			hidden:true,
			dataIndex:'id'
		},{
			header:'公司',
			renderIndex:'companyId.companyShortName',
			dataIndex:'companyId.id'
		},{
			header:'部门',
			renderIndex:'deptId.deptName',
			dataIndex:'deptId.id'
		},{
			header:'英文名',
			dataIndex:'empsName'
		},{
			header:'中文名',
			dataIndex:'empNameCn'
		},{
			header:'登陆账号',
			dataIndex:'empsId'
		},{
			header:'状态',
			dataIndex:'empsStatus',
			renderer:function(value){
				if(value == 1)
					return '在职';
				else if(value == 2)
					return '离职';
			}
		},{
			header:'联系电话',
			dataIndex:'empsPhone',
			renderer:function(value){
				//拨电话需要加拨9
				return '<a href="sip:9'+value+'">'+value+'</a>'			
			}
		},{
			header:'移动电话',
			dataIndex:'empsMobile',
			renderer:function(value, metaData, record, rowIndex, colIndex, store){
				//拨电话需要加拨9
//				return '<a href="sip:9'+value+'">'+value+'</a>'	
				var customerName='';
				var contactPerson=record.data.empsName;
				var contactId=0;
				return '<a href="javascript:choseOp('+contactId+',\''+value+'\',\''+customerName+'\',\''+contactPerson+'\')">'+value+'</a>'			
			}
		}];
		
		this.tbar = {
			xtype:'empstoolbar',
			grid:this
		}
		
		QH.emps.GridPanel.superclass.initComponent.call(this);
		this.on("rowdblclick",function(grid,rowIndex,e){
			this.updateData();
		},this);
	},
	updateData:function(){
		var grid = this;
		var record = grid.getSelectionModel().getSelected();
//		openWindowBase(268, 710,'modify_emps.do?gridId='+grid.getId()+'&id='+record.get('id'));
		openDeskWin("员工"+record.get('empsName'),'modify_emps.do?gridId='+grid.getId()+'&id='+record.get('id'),"emps_"+record.get('id'));
	}
});
Ext.reg('empsgrid',QH.emps.GridPanel);
