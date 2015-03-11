/**
 * 可见性按钮
 * @class QH.controls.CanSeeBtn
 * @extends Ext.Button
 */
QH.controls.CanSeeBtn = Ext.extend(Ext.Button,{
	grid:null,
	win:null,
	/**
	 * 可见权限中需要显示的列，对应于grid中的某列
	 * @type String
	 */
	titleCol:"",
	initComponent:function(){
		var _self = this;
		this.text = "可见性";
		this.iconCls="page_popedom";
		this.handler = this.showPanel;
		QH.controls.CanSeeBtn.superclass.initComponent.call(this);
	},
	showPanel:function(){
		var _self = this;
		var grid = this.canSeeGrid();
		this.win = new Ext.Window({
			title:"对以下业务员可见",
			labelAlign:"right",
			labelWidth:60,
			width:400,
			height:500,
			layout:"border",
			
			items:[{
					xtype:"empbasecombo",
					ref:"empcombo",
					region:"north",
					height:30,
					listeners:{
						'select':function( combo, record, index){
							var empId = record.get('id');
							var store = _self.win.gridpanel.getStore();
							_self.win.gridpanel.setTitle(record.get('empsId')+"的可见记录");
							store.setBaseParam("empsId",parseInt(empId));
							var api = store.proxy.api;
							var url = api.read.url;
							var index = url.indexOf("?");
							if(index > -1){
								url = url.substring(0,index);
							}
							store.setBaseParam("module",url);
							store.setBaseParam(QH_PAGE_START_NAME, QH_PAGE_START);
							store.setBaseParam(QH_PAGE_LIMIT_NAME, QH_PAGE_LIMIT);
							store.reload();
						}
					}
			},grid],
			buttonAlign:"center",
			fbar:[{
				text:"保存可见记录",
				handler:_self.doCanSee.createDelegate(this,[_self.grid])
			}]
		});
		this.win.show();
	},
	doCanSee:function(grid){
		var _self = this;
		var records = grid.getSelectionModel().getSelections();
		var ids = [];
		var title = [];
		var empIds = [];
		if(records.length == 0){
			window.alertMsg("请选择记录");
			return;
		}
		Ext.each(records,function(record){
			ids.push(record.get("id"));
			title.push(record.get(_self.titleCol));
		});
		var empId = this.win.empcombo.getValue();
		empIds.push(empId);
		if(empId == ""){
			window.alertMsg("请选择业务员");
			return;
		}
		var api = grid.getStore().proxy.api;
		var url = api.read.url;
		var index = url.indexOf("?");
		if(index > -1){
			url = url.substring(0,index);
		}
		cotPopedomService.saveOrUpdateRecordPopedom(url,empIds,ids,function(res){
			if(res >= 0){
				window.alertMsg("保存成功");
				_self.win.close();
				
			}
		});
	},
	canSeeGrid:function(){
		var _self = this;
		var record = new Ext.data.Record.create(
			[{name:'id'}, // 
			{name:'module',type:'string'}, // 数据的来源模块(用.do来表示)
			{name:'title',type:'string'}, // 
			{name:'primaryId'}, // 
			{name:'empsId'}
		]);
		var ds = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : "listpopedomrecord.do"
						}),
				reader : new Ext.data.JsonReader({
							root : "data",
							totalProperty : "totalCount",
							idProperty : "id"
				}, record)
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		
		var cm = new Ext.grid.ColumnModel([sm,{
			header:'',
			dataIndex:'id',
			hidden:true
		},{
			header:'可见记录',
			dataIndex:'title'
		}]);
		var tb = new Ext.Toolbar({
			items : ['->', '-', {
						text : "删除",
						iconCls : "page_del",
						handler : _self.deleteBatch.createDelegate(this,[])
					}]
		});
		var toolBar = new Ext.PagingToolbar({
				pageSize : QH_PAGE_LIMIT,
				store : ds,
				displayInfo : true,
				emptyMsg : "无记录"
			});
		var grid = new Ext.grid.GridPanel({
				region : "center",
				title:"可见性记录",
				stripeRows : true,
				bodyStyle : 'width:100%',
				store : ds, // 加载数据源
				cm : cm, // 加载列
				sm : sm,
				loadMask : true, // 是否显示正在加载
				tbar : tb,
				ref:"gridpanel",
				bbar : toolBar,
				viewConfig : {
					forceFit : true
				}
			});
		return grid;
	},
	deleteBatch:function(){
		var records = this.win.gridpanel.getSelectionModel().getSelections();
		var store = this.win.gridpanel.getStroe();
		var ids = [];
		Ext.each(records,function(item){
			ids.push(item.id);
		})
		if(ids.length == 0){
			window.alertMsg("请选择要删除的记录");
			return;
		}
		baseSerivce.deleteIntListReturnIds(ids,'CotPopedomRecord',function(res){
			if(res > 0){
				window.alertMsg("删除成功");	
				store.reload();
			}
			else
				window.alertMsg("删除失败");
		})	
		
	}
});
Ext.reg("canseebtn",QH.controls.CanSeeBtn);