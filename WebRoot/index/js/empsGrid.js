
/**
 * 
 * @class QH.emps.Grid
 * @extends QH.ux.grid.BaseGridPanel
 */
QH.emps.GridPanel = Ext.extend(QH.ux.grid.BaseGridPanel, {
	tbarCfg : {
		objName : 'CotEmps',
		tbarModel : 'all',
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
			name : "empsPhones",
			maxLength : 100
		},{
			xtype:'numberfield',
			fieldLabel:'状态',
			anchor : "100%",
			name : "empsStatus",
			maxValue:1,
			minValue:0
		}]
	},
	initComponent : function() {
		var grid = this;
		this.store = new QH.emps.Store();
		this.columns = [{
					header : '登录名',
					dataIndex : 'empsId',
					editor : {
						xtype : 'textfield',
						maxLength : 10,
						maxLengthText : '登录名长度最大不能超过{0}'
					}
				}, {
					header : '英文名',
					dataIndex : 'empsNameEn',
					editor : {
						xtype : 'textfield',
						maxLength : 50,
						maxLengthText : '英文名长度最大不能超过{0}'
					}
				}, {
					header : '中文名',
					dataIndex : 'empsName',
					editor : {
						xtype : 'textfield',
						maxLength : 10,
						maxLengthText : '中文名长度最大不能超过{0}'
					}
				}, {
					header : '所属公司',
					width : 70,
					dataIndex : 'cotCompanyId',
					renderer : function(v) {
						try {
							return companyMap[v];
						} catch (e) {
						}
					},
					editor : {
						xtype : 'textfield',
						maxLength : 16,
						maxLengthText : '所属公司长度最大不能超过{0}'
					}
				}, {
					header : '所属部门',
					width : 70,
					dataIndex : 'cotDeptId',
					renderer : function(v) {
						try {
							return deptMap[v];
						} catch (e) {
						}
					},
					editor : {
						xtype : 'textfield',
						maxLength : 16,
						maxLengthText : '所属部门长度最大不能超过{0}'
					}
				}, {
					header : '电话',
					dataIndex : 'empsPhones',
					editor : {
						xtype : 'textfield',
						maxLength : 50,
						maxLengthText : '电话长度最大不能超过{0}'
					}
				}, {
					header : '手机',
					dataIndex : 'empsMobile',
					editor : {
						xtype : 'textfield',
						maxLength : 50,
						maxLengthText : '手机长度最大不能超过{0}'
					}
				}, {
					header : 'QQ',
					dataIndex : 'empsQq',
					hidden : true,
					editor : {
						xtype : 'textfield',
						maxLength : 10,
						maxLengthText : 'QQ长度最大不能超过{0}'
					}
				}, {
					header : 'MSN',
					dataIndex : 'empsMsn',
					hidden : true,
					editor : {
						xtype : 'textfield',
						maxLength : 50,
						maxLengthText : 'MSN长度最大不能超过{0}'
					}
				}, {
					header : '状态',
					width : 50,
					dataIndex : 'empsStatus',
					renderer : function(v) {
						switch (v) {
							case '0' :
								return '离职';
							case '1' :
								return '在职';
						}
					}
				}, {
					header : '备注',
					hidden : true,
					dataIndex : 'empsRemark',
					editor : {
						xtype : 'textfield',
						maxLength : 100,
						maxLengthText : '备注长度最大不能超过{0}'
					}
				}];
		this.tbarItems = [{
					searchName : 'empsNameEn',
					isSearchField : true,
					emptyText : '英文名',
					width : 90,
					xtype : 'textfield',
					maxLength : 10,
					maxLengthText : '英文名长度最大不能超过{0}'
				}, {
					searchName : 'empsName',
					isSearchField : true,
					emptyText : '中文名',
					width : 90,
					xtype : 'textfield',
					maxLength : 10,
					maxLengthText : '中文名长度最大不能超过{0}'
				}, {
					searchName : 'cotCompanyId',
					isSearchField : true,
					emptyText : '所属公司',
					width : 90,
					hidden : true,
					xtype : 'textfield',
					maxLength : 16,
					maxLengthText : '所属公司长度最大不能超过{0}'
				}, {
					searchName : 'cotDeptId',
					isSearchField : true,
					emptyText : '所属部门',
					width : 90,
					hidden : true,
					xtype : 'textfield',
					maxLength : 16,
					maxLengthText : '所属部门长度最大不能超过{0}'
				}, {
					searchName : 'empsPhones',
					isSearchField : true,
					emptyText : '电话',
					width : 90,
					xtype : 'textfield',
					maxLength : 50,
					maxLengthText : '电话长度最大不能超过{0}'
				}, {
					searchName : 'empsMobile',
					isSearchField : true,
					emptyText : '手机',
					width : 90,
					hidden : true,
					xtype : 'textfield',
					maxLength : 50,
					maxLengthText : '手机长度最大不能超过{0}'
				}, {
					searchName : 'empsQq',
					isSearchField : true,
					emptyText : 'QQ',
					width : 90,
					hidden : true,
					xtype : 'textfield',
					maxLength : 10,
					maxLengthText : 'QQ长度最大不能超过{0}'
				}, {
					searchName : 'empsMsn',
					isSearchField : true,
					emptyText : 'MSN',
					width : 90,
					hidden : true,
					xtype : 'textfield',
					maxLength : 50,
					maxLengthText : 'MSN长度最大不能超过{0}'
				}, {
					searchName : 'empsRemark',
					isSearchField : true,
					hidden : true,
					emptyText : '备注',
					width : 90,
					xtype : 'textfield',
					maxLength : 100,
					maxLengthText : '备注长度最大不能超过{0}'
				}, {
					xtype : 'searchcombo',
					store : this.store,
					checkModified : true,
					emptyText : '登录名',
					searchName : 'empsId',
					isJsonType : false
				}];

		QH.emps.GridPanel.superclass.initComponent.call(this);
	}
});
Ext.reg('empsgrid', QH.emps.GridPanel);
