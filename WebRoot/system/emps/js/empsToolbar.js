/**
 * @author zhao
 * @class QH.emps.GridToolbar
 * @extends QH.ux.grid.BaseToolbar
 */
QH.emps.GridToolbar = Ext.extend(QH.ux.grid.BaseToolbar, {
			objName : 'CotEmps',
			tbarModel : 'all',
			initComponent : function() {
				var toolbar = this;
				this.items = [{
							xtype : 'combo',
							hideName : 'empsStatus',
							searchName : 'emps.empsStatus',
							isSearchField : true,
							valueField : "id",
							displayField : "name",
							mode : 'local',
							triggerAction : 'all',
							selectOnFocus : false,
							store : new Ext.data.SimpleStore({
										fields : ["id", "name"],
										data : [[1, '在职'], [9, '离职']]
									}),
							emptyText : '状态',
							width : 90
						}, {
							hidden : true,
							xtype : 'textfield',
							searchName : 'emps.empsRemark',
							isSearchField : true,
							emptyText : '备注',
							width : 90,
							maxLength : 200,
							maxLengthText : '长度最大不能超过{0}'
						}, {
							hidden : true,
							xtype : 'textfield',
							searchName : 'emps.empsPhone',
							isSearchField : true,
							emptyText : '联系电话',
							width : 90,
							maxLength : 100,
							maxLengthText : '联系电话长度最大不能超过{0}'
						}, {
							hidden : true,
							xtype : 'textfield',
							searchName : 'emps.empsMobile',
							isSearchField : true,
							emptyText : '移动电话',
							width : 90,
							maxLength : 100,
							maxLengthText : '移动电话长度最大不能超过{0}'
						}, {
							xtype : 'companybasecombo',
							searchName : 'emps.companyId.id',
							isSearchField : true,
							emptyText : '公司',
							width : 90
						}, {
							xtype : 'deptbasecombo',
							searchName : 'emps.deptId.id',
							isSearchField : true,
							emptyText : '部门',
							width : 90
						}, {
							xtype : 'textfield',
							searchName : 'emps.empsId',
							isSearchField : true,
							emptyText : '登陆账户',
							width : 90,
							maxLength : 20,
							maxLengthText : '登陆账户长度最大不能超过{0}'
						}, {
							xtype : 'textfield',
							searchName : 'emps.empsName',
							isSearchField : true,
							emptyText : '英文名',
							width : 90,
							maxLength : 20,
							maxLengthText : '英文名长度最大不能超过{0}'
						}, {
							xtype : 'searchcombo',
							searchName : 'emps.empNameCn',
							isSearchField : true,
							emptyText : '中文名',
							width : 90,
							store : this.grid.store,
							checkModified : true,
							maxLength : 20,
							maxLengthText : '中文名长度最大不能超过{0}'
						}, "->", {
							text : '权限',
							iconCls : "page_popedom",
							cls : 'SYSOP_POPEDOM',
							handler : toolbar.showPopedom.createDelegate(this,
									[])
						}, {
							text : '复制给...',
							cls : 'SYSOP_COPY',
							iconCls : "page_allocated",
							handler : toolbar.copyPopedom.createDelegate(this,
									[])
						}, {
							text : '修改密码',
							hidden : GET_SESSION_EMPSID == 'admin'
									? false
									: true,
							iconCls : "page_table_save",
							handler : toolbar.showUpdatePwdWin.createDelegate(
									this, [])
						}];
				QH.emps.GridToolbar.superclass.initComponent.call(this);
			},
			showPopedom : function() {
				var row = this.grid.getSelectionModel().getSelected();
				if (row == null) {
					window.alertMsg("请选择记录");
					return;
				}
				var id = row.get("id");
				var empsId = row.get("empsId");
				// window.openFullWindow("jumpModuleTreemodule.do?id="+id+"&empsId="+empsId);
				window.openDeskWin("员工" + row.get("empsName") + "权限",
						"jumpModuleTreemodule.do?id=" + id + "&empsId="
								+ empsId, "popedom_" + empsId);
			},
			copyPopedom : function() {
				var row = this.grid.getSelectionModel().getSelected();
				if (row == null) {
					window.alertMsg("请选择记录");
					return;
				}
				var id = row.get("id");
				var win = new Ext.Window({
							title : '权限复制',
							layout : 'form',
							labelWidth : 60,
							frame : true,
							closeAction : 'close',
							width : 200,
							items : [{
										xtype : 'empbasecombo',
										fieldLabel : '复制给',
										hiddenName : 'empsId',
										ref : 'toEmps'
									}],
							fbar : [{
								text : '保存',
								handler : function() {
									var fromEmpId = id;
									var toEmpId = win.toEmps.getValue()
									cotPopedomService.copyPopedom(fromEmpId,
											toEmpId, function() {
												win.close();
												window.alertMsg("复制完成");
											})
								}
							}]
						});
				win.show();
			},
			// 显示修改密码窗口
			showUpdatePwdWin : function(eId, passName) {
				var records = this.grid.getSelectionModel().getSelections();
				if(records.length!=1){
					alertMsg('请选择一条员工');
					return;
				}
				var eId=records[0].id;
				var passName=records[0].data.empsId;
				var win = new Ext.Window({
							title : '修改密码',
							width : 300,
							height : 180,
							layout : 'fit',
							modal : true,
							border : false,
							listeners : {
								'show' : function() {
									this.findByType('textfield')[1].focus(true,
											true); // 第一个textfield获得焦点
								}
							},
							items : [{
								xtype : 'form',
								frame : true,
								padding : 5,
								labelWidth : 60,
								monitorValid : true,
								labelAlign : 'right',
								buttonAlign : 'center',
								fbar : [{
									text : '保存',
									scale : 'large',
									formBind : true,
									iconCls : "page_table_save",
									handler : function() {
										cotLoginService.updateEmpPassWord(eId,
												$('newpwd').value,
												function(res) {
													Ext.Msg.alert("提示信息",
															"保存成功!");
													win.close();
												});
									}
								}],
								items : [{
											xtype : 'textfield',
											fieldLabel : '登录名',
											value : passName,
											disabled : true,
											disabledClass : 'combo-disabled',
											id : 'passName',
											name : 'passName',
											anchor : '100%'
										}, {
											xtype : 'textfield',
											fieldLabel : '新密码',
											id : 'newpwd',
											name : 'newpwd',
											allowBlank : false,
											blankText : '请输入新密码',
											inputType : "password",
											anchor : '100%',
											maxLength : 20
										}, {
											xtype : 'textfield',
											fieldLabel : '再次输入',
											allowBlank : false,
											blankText : '请再次输入新密码',
											id : 'confirmpwd',
											name : 'confirmpwd',
											inputType : "password",
											anchor : '100%',
											maxLength : 20,
											vtype : 'password',
											initialPassField : 'newpwd'
										}]
							}]
						});
				win.show();
			}
		});
Ext.reg('empstoolbar', QH.emps.GridToolbar);
