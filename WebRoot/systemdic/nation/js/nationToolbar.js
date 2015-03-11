/**
 * @author zhao
 * @class QH.nation.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.nation.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar, {
			objName : 'CotNation',
			tbarModel : 'all',
			idType : 'int',
			initComponent : function() {
				this.items = [new QH.controls.AreaBaseCombo({
									emptyText : '洲',
									searchName : 'nation.areaId.id'
								}), {
							xtype : 'textfield',
							searchName : 'nation.nationShort',
							isSearchField : true,
							emptyText : '国家缩写',
							width : 90,
							maxLength : 10,
							maxLengthText : '国家缩写长度最大不能超过{0}'
						}, {
							xtype : 'textfield',
							searchName : 'nation.nationCn',
							isSearchField : true,
							emptyText : '国家中文',
							width : 90,
							maxLength : 100,
							maxLengthText : '国家中文长度最大不能超过{0}'
						}, {
							xtype : 'textfield',
							searchName : 'nation.nationName',
							isSearchField : true,
							emptyText : '国家英文',
							width : 90,
							maxLength : 100,
							maxLengthText : '国家英文长度最大不能超过{0}'
						}, {
							hidden : true,
							xtype : 'textfield',
							searchName : 'nation.nationCode',
							isSearchField : true,
							emptyText : '国家代码',
							width : 90,
							maxLength : 10,
							maxLengthText : '国家代码长度最大不能超过{0}'
						}, {
							xtype : 'searchcombo',
							searchName : 'nation.nationRemark',
							store : this.grid.store,
							checkModified : true,
							emptyText : '备注'
						}];
				QH.nation.GridToolbar.superclass.initComponent.call(this);
			}
		});
Ext.reg('nationtoolbar', QH.nation.GridToolbar);
