Ext.namespace('QH.commonType');
/**
 * 
 * @class QH.commonType.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.commonType.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel,{
	tbarCfg:{
		objName:'CotCommonType',
//		saveMethod:cotCommonTypeService.saveList,
		listeners:{
			'beforedeldata' :{
				fn:function(tbar,ids,object){
					var list =QH_VIEWPORT.tabPanel.getActiveTab().getSelectionModel().getSelections();
					var arry =new Array();
					Ext.each(list,function(item){
						var flag =item.data.deleteFlag;
						if(flag =='N'){
						
						}else{
							arry.push(item.id);
						}
					});
					if(arry.length ==0){
						Ext.MessageBox.alert('提示消息', "您选择的记录是系统自带的,不能删除!");
						return false;
					}
					
					baseSerivce.deleteListReturnIds(arry,"CotCommonType", function(res) {
								Ext.MessageBox.alert("提示信息", "删除成功!");
								reloadGrid(tbar.grid.getId());
					});
					return false;
				}
			}
		}
	},
	/**
	 * @cfg {String} flag
	 */
	/**
	 * @cfg {Object} headCfg
	 */
	initComponent:function(){
		var grid = this;
		this.store = new QH.commonType.Store();
		
		this.store.setBaseParam('flag',this.flag);
		
		this.tbarCfg.defaultData = {
			flag:this.flag
		};
		
		var type = this.headCfg.type;
		var content = this.headCfg.content;
		var remark = this.headCfg.remark;
		
		this.columns = [];
		this.tbarItems = [];
		
		if(type){
			this.columns.push({
				header:type,
				dataIndex:'type',
				editor:{
					xtype:'textfield',
					maxLength:25,
				maxLengthText:type+'长度最大不能超过{0}'
				}
			});
			this.tbarItems.push({
				searchName:'type',
				isSearchField:true,
				emptyText:type,
				width:90,
				xtype:'textfield',
				maxLength:25,
				maxLengthText:type+'长度最大不能超过{0}'
			});
		}
		if(content){
			this.columns.push({
				header:content,
				dataIndex:'content',
				editor:{
					xtype:'textfield',
					maxLength:250
				}
			});
			this.tbarItems.push({
				searchName:'content',
				isSearchField:true,
				emptyText:content,
				width:90,
				xtype:'textfield',
				maxLength:250,
				maxLengthText:content+'长度最大不能超过{0}'
			});
		}
		this.columns.push({
			header:remark || '备注',
			dataIndex:'remark',
			editor:{
				xtype:'textfield',
				maxLength:250
			}
		});
		this.columns.push({
			header: '删除',
			dataIndex:'deleteFlag'
		});
		this.tbarItems.push({
			xtype:'searchcombo',
			store:this.store,
			checkModified:true,
			emptyText:remark||'备注',
			searchName:'remark',
			isJsonType:false
		});
		QH.commonType.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('commontypegrid',QH.commonType.GridPanel);
