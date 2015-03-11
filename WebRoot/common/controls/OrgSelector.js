/**
 * 组织架构选择器，用于权限控制的选取，在panel中方checek
 * 按照组织架构生成界面，根据公司->部门->员工的顺序生成
 * @class QH.controls.OrgSelector
 * @extends Ext.Panel
 */
QH.controls.OrgSelector = Ext.extend(Ext.form.FieldSet,{
	/**
	 * 需要加载页面的id，生车的界面都加载到这个面板里
	 * layout用vbox布局
	 * @type string
	 */
	ownPanelId:null,
	/**
	 * 公司ID
	 * @type Number
	 */
	companyId:0,
	/**
	 * 公司名称
	 * @type String
	 */
	companyName:"",
	/**
	 * 缓存部门的ID，用户获取部门的面板
	 * private
	 */
	deptIds:[],
	/**
	 * private
	 */
	empsIds:[],
	initComponent:function(){
		DWREngine.setAsync(false);
		this.layout = "auto";
		this.collapsible = true;
		this.collapsed = true;
		//var ownPanel = Ext.getCmp(this.ownPanelId);
		var _self = this;
		var list = [{
			companyName:_self.companyName,
			id:_self.companyId
		}]
		this.items = [];
		this.title=this.companyName;
		//加入公司面板
		this.items.push({
			xtype:"checkboxmodule",
			id:"company_"+_self.companyId,
			displayField:"companyName",
			valueField:"id",
			columns:1,
			dataSource:list
		});
		//获取指定部门信息
		var deptPanelList = [];
		var deptList = [];
		baseSerivce.getListByCondition("CotDept",{companyId:_self.companyId},function(res){
			deptList = res;
		});
		var tempDeptIds = [];
		Ext.each(deptList,function(dept){
			//部门面板
			var deptPanel = new Ext.form.FieldSet({
				layout:"auto",
				title:dept.deptName,
				items:[{
					xtype:"checkboxmodule",
					displayField:"deptName",
					id:"dept_"+dept.id,
					valueField:"id",
					columns:1,
					dataSource:[dept]
				}]
			});
			tempDeptIds.push(dept.id);
			//员工面板
			//var empList = [];
//			baseSerivce.getList("CotEmps",function(res){
//				empList = res;
//			});
			var empPanel = new Ext.form.FieldSet({
				title:dept.deptName+"的员工",
				layout:"auto",
				items:[{
					xtype:"checkboxmodule",
					displayField:"empsId",
					valueField:"id",
					id:"emp_"+dept.id,
					columns:4,
					dataSource:baseSerivce.getListByCondition,
					requestParam:{
						tableName:"CotEmps",
						whereMap:{deptId:dept.id}
					}
				}]
			});
			deptPanel.add(empPanel);
			deptPanelList.push(deptPanel);
		});
		_self.deptIds = tempDeptIds;
		this.items.push(deptPanelList);
		QH.controls.OrgSelector.superclass.initComponent.call(this);
		DWREngine.setAsync(true);
	},
	
	//
	/**
	 * 获取所勾选type的值，type：COMPANY,DEPT,EMP
		COMPANY：获取勾选的公司的值
		DEPT：获取勾选的部门的值
		EMP：获取勾选的员工的值
		优先级为 COMPANY > DEPT > EMP
		即只要勾了COMPANY，就不管DEPT和EMP是否有勾
	 * @param {} type
	 */
	getCheckValue:function(type){
		var chkVals = [];
		if(type == "COMPANY"){
			chkVals =  this.getCompanyCheckValue();
		}else if(type == "DEPT"){
			var companyVals = this.getCompanyCheckValue();
			if(companyVals.length > 0){
				chkVals = [];
			}else{
				chkVals = this.getDeptCheckValue();
			}
		}else if(type == "EMP"){
			var companyVals = this.getCompanyCheckValue();
			var deptVals = this.getDeptCheckValue();
			if(companyVals.length > 0){
				chkVals = [];
			}else{
				chkVals = this.getEmpCheckValue();
			}
		}
		return chkVals;
	},
	/**
	 * private
	 */
	getCompanyCheckValue:function(){
		var companyChkVal = Ext.getCmp("company_"+this.companyId).getCheckedValue();
		return companyChkVal;
	},
	/**
	 * private
	 */
	getDeptCheckValue:function(){
		var deptChkVals = [];
		Ext.each(this.deptIds,function(deptId){
			var vals = Ext.getCmp("dept_"+deptId).getCheckedValue();
			for(var i=0; i<vals.length; i++){
				deptChkVals.push(vals[i]);
			}
		})
		return deptChkVals;
	},
	/**
	 * private
	 */
	getEmpCheckValue:function(){
		var empChkVals = [];
		var checkDeptIds = this.getDeptCheckValue();
		Ext.each(this.deptIds,function(deptId){
			//如果部门已经被勾选，则跳过，不做处理，只处理没有勾选部门，只勾选业务员的数据
			if(checkDeptIds.indexOf(deptId,0) ==-1 ){
				var vals = Ext.getCmp("emp_"+deptId).getCheckedValue();
				for(var i=0; i<vals.length; i++){
					empChkVals.push(vals[i]);
				}
			}
		})
		return empChkVals;
	},
	setCheckValue:function(list,type){
		if(type == "COMPANY"){
			Ext.getCmp("company_"+this.companyId).setCheckedValue(list);
		}else if(type == "DEPT"){
			Ext.each(this.deptIds,function(deptId){
				Ext.getCmp("dept_"+deptId).setCheckedValue(list);
			})
		}else if(type == "EMP"){
			Ext.each(this.deptIds,function(deptId){
				Ext.getCmp("emp_"+deptId).setCheckedValue(list);
			})
		}
	}
});
Ext.reg("orgselector",QH.controls.OrgSelector);

QH.controls.OrgPopedom = Ext.extend(Ext.Panel,{
	initComponent:function(){
		var _self = this;
		DWREngine.setAsync(false);
		var companyList = [];
		baseSerivce.getList("CotCompany",function(res){
			companyList = res;
		});
		this.items = [];
		Ext.each(companyList,function(company){
			var fieldset = {
				xtype:'orgselector',
				companyId:company.id,
				companyName:company.companyName
			}
			_self.items.push(fieldset);
		});
		QH.controls.OrgPopedom.superclass.initComponent.call(this);
		DWREngine.setAsync(true);
	},
	getCheckValue:function(type){
		//获取所有权限选择面板
		var checkVals = [];
		var orgselectorList = this.findByType("orgselector");
		Ext.each(orgselectorList,function(selector){
			var tmp = selector.getCheckValue(type);
			for(var i=0; i<tmp.length; i++){
				checkVals.push(tmp[i]);
			}
			//checkVals.push(selector.getCheckValue(type));
		});
		return checkVals;
	},
	setCheckValue:function(list,type){
		var checkVals = [];
		var orgselectorList = this.findByType("orgselector");
		Ext.each(orgselectorList,function(selector){
			selector.setCheckValue(list,type);
		});
	},
	checkedAll:function(isCheckAll){
		var checkList = this.findByType("checkboxmodule");
		Ext.each(checkList,function(module){
			module.checkedAll(isCheckAll);
		})
	}
});
Ext.reg("orgpopedom",QH.controls.OrgPopedom);