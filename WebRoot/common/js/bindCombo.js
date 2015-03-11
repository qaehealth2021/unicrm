/*******************************************************************************
 * 时间：2009/10/19 作者: achui 描述: 下拉框绑定通用类
 ******************************************************************************/
BindCombox = Ext.extend(Ext.form.ComboBox, {
			isBindCombox:true,
			// 绑定数据的URL
			dataUrl : "",
			// 下拉框的ID，对应于Html中的id属性
			cmpId : "",
			needReset:true,
			// mode : "local",
			sendMethod : "GET",
			autoLoad : false,
			editable : false,
			typeAheadDelay : 100,// 默认延时查询250
			typeAhead : true, // 自动填充
			forceSelection:true,
			lazyRender:false,
			lazyInit:false,
			triggerAction:"all",
			minChars:0,
			/**
			 * @cfg {Array} otherFields
			 */
			otherFields:[],
			isInitDefault:true,
			/**
			 * @cfg {Array} objName 表对象名
			 */
			objName:'',
			/**
			 * 使用内存分页的数据，一个Map对象
			 * @type 如果使用了该字段，就必须把，mode置为local
			 */
			dataMap:null,
			//是否需要加载请选择项
			//needDefault:true,
			// 初始化组件
			initComponent : function() {
				Ext.form.ComboBox.superclass.initComponent.call(this);
				this.hiddenName = this.cmpId;
				this.store = this.getStoreType();

				// 获得焦点时弹出下拉列表---1.IE点击箭头加载时会报错,2.鼠标第一次点击下列列表消失
//				this.on("focus", function(sel) {
//							if(!sel.isExpanded()){
//								sel.onTriggerClick();
//							}
//						});
				this.initDefaultFn = function(){
					if(!this.isInitDefault) return;
					var record1 = new Ext.data.Record();
					record1.data[this.valueField] = "";
					record1.data[this.displayField] = this.emptyText||"请选择";
					if(this.store.findExact(this.displayField,this.emptyText||"请选择") != -1)
						return;
					this.store.insert(0,record1);
				}
			},
			getStoreType:function(){
				var store = null;
				if(this.dataMap){
					var list = new Array();
					this.isInitDefault = true;
					list.push(["",this.emptyText||"请选择"]);
					for(var key in this.dataMap){
						list.push([key,this.dataMap[key]]);
					}
					store = new Ext.ux.data.PagingArrayStore({
						fields:[
							{name : this.valueField},
							{name : this.displayField}
						],
						data:list
						//lastOptions: {params: {start: 0, limit: this.pageSize}}
					})
					store.load({params:{start:0,limit:this.pageSize?this.pageSize:list.length}})
//					store = new Ext.data.Store({
//						proxy : new Ext.ux.data.PagingMemoryProxy(list),
//						reader : new Ext.data.ArrayReader({}, [
//							{name : this.valueField},
//							{name : this.displayField}
//						]),
//						//autoLoad:false,
//						remoteSort : true
//					});
				}else{
					store = new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
										method : this.sendMethod,
										url : this.dataUrl
									}),
							reader : new Ext.data.JsonReader({
										root : "data",
										totalProperty : "totalCount",
										idProperty : "id"
									}, [{
												name : this.valueField
											}, {
												name : this.displayField
											}]),
							autoLoad : this.autoLoad,
							remoteSort : false
						});
				}
				return store;
			},
			//重写onTypeAhead方法，使之能够适应要求
			onTypeAhead : function(){
		    if(this.store.getCount() > 0){
		            var r = this.store.getAt(0);
					//mod by achui 2010-06-21 如果遇到valueField的值是空，则往下一条记录（过滤请选择）
					var rdx = 0
					if(r.data[this.valueField] == "" || r.data[this.valueField] == this.emptyText||"请选择"){
						r = this.store.getAt(1);
						rdx = 1;
					}
		            var newValue = r.data[this.displayField];
		            var len = newValue.length;
		            var selStart = this.getRawValue().length;
		            this.setRawValue(newValue);
	                this.selectText(selStart, newValue.length);
	                //对onselect事件延迟加载
	                var task = new Ext.util.DelayedTask(this.fireEvent, this,['select', this, r, rdx]);
	                task.delay(this.typeAheadDelay+20);
		            if(selStart != len){
//		                this.setRawValue(newValue);
//		                this.selectText(selStart, newValue.length);
//		                //对onselect事件延迟加载
//		                var task = new Ext.util.DelayedTask(this.fireEvent, this,['select', this, r, rdx]);
//		                task.delay(this.typeAheadDelay+20);
		            }
		        }
		    },
		    //重写beforeBlur,能够输入下拉框不存在的值，是之不重置
		     beforeBlur : function(){
		     	if(this.needReset)
		        	this.assertValue();
		        else{
		        	var val = this.getRawValue();
		        	this.setValue(val);
		        }
		    },
			// 下拉框绑定操作
			bindValue : function(value) {
				var _self = this;
				if (value != null) {
					this.store.on("load", function() {
								_self.setValue(value);
							});
					if (this.store.getCount() == 0) {
						this.store.load();
					}else{
						_self.setValue(value);
					}
				}
			},
			// 分页下拉框绑定
			bindPageValue : function(tbname, queryCol, value) {
				var _self = this;
				baseSerivce.getFieldValue(tbname, value,queryCol ,function(result){
						_self.setValue(result.id);
						_self.setRawValue(result.field);
						
					});
//				if (value != null) {
//					// 此处加载,本作用于在_self.setValue(value);
//					// 但当下拉框点击下拉时,会再去加载数据,相当于重得加载
//					if (this.store.getCount() == 0) {
//						this.store.load();
//					}
//					this.store.load({
//								params : {
//									id : value,
//									queryCol : queryCol,
//									tbname : tbname
//								},
//								callback : function(r, option, success) {
//									//_self.reset();
//									_self.setValue(value);
//									//_self.initDefault();
//								}
//							});
//				}else{
//					this.store.load();
//				}
			},
			bindComboValue : function(objName,bindVal, backFn){
				//有可能是选择客户后,要加载对应的业务员
				if(bindVal){
					this.value=bindVal;
				}
				objName = objName || this.objName;
				if(!Ext.isEmpty(this.value)){
					// 如果已存在，则不再向后台取数据
					if(this.store.getById(this.value))
						return;
					var _self = this;
					var fields = [this.displayField];
					if(Ext.isArray(this.otherFields)){
						Ext.each(this.otherFields,function(field){
							fields.push(field.name);
						});
					}
					baseSerivce.getFieldValue(objName, this.value, this.displayField,function(result){
						if(result){
							var p = new _self.store.recordType(result);
							p.id = result.id;	// 重新设置record的ID为数据ID
							_self.store.insert(0, p);
							_self.setValue(result.id);
							if(Ext.isFunction(backFn)){
								backFn(_self,result);
							}
						}
					});
				}
			},
			setLoadParams:function(tbname, queryCol, value,key)
			{
				this.store.baseParams = {
					id : value,
					queryCol : queryCol,
					tbname : tbname,
					key:key
				}
			},
			reflashData:function(){
				this.store.reload();
			},
			resetData:function(){
				this.reset();
				if(this.store.getCount()>0)
					this.store.reload();
			},
			setDataUrl:function(url){
				this.dataUrl=url;
				this.store.proxy.setUrl(this.dataUrl);
				
				this.store.on("beforeload", function(store, options) {
								store.proxy.setUrl(url);
							});
			},
			// 联动操作
			loadValueById : function(tbname, key, value,comVal) {
				var _self = this;
				if (value != null) {
//					if (this.store.getCount() == 0) {
//						this.store.load();
//					}
					this.store.on("load", function() {
								if(typeof(comVal)!='undefined'){
									_self.setValue(comVal);
								}
							});
//					this.setLoadParams(tbname, key, value)
					this.store.load({
								params : {
									id : value,
									key : key,
									tbname : tbname
								},
								callback : function(r, option, success) {
									//_self.setLoadParams(null, null, null);
									//printObject(_self.store.baseParams)
								}
							});
					//_self.prototype.hasFocus = true;
					//_self.expland();
				}
			}
		});
Ext.reg('bindCombo', BindCombox);

FactoryBindCombo = Ext.extend(BindCombox,{
	dataUrl : "servlet/DataSelvert?tbname=CotFactory&key=shortName",
	objName:'CotFactory',
	editable : true,
	isSearchField:true,
	width:90,
	searchName:'factoryId',
	name:'factoryId',
	emptyText:'请选择',
	fieldLabel:'厂家',
	valueField : "id",
	displayField : "shortName",
	pageSize : 10,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post",
	listWidth : 350
});

Ext.reg('facbindcombo',FactoryBindCombo);


// 业务员
EmpBindCombo = Ext.extend(BindCombox,{
	dataUrl : "servlet/DataSelvert?tbname=CotEmps&key=empsId",
	objName:'CotEmps',
	editable : true,
	isSearchField:true,
	width:90,
	searchName:'empId',
	name:'empId',
	emptyText:'请选择',
	fieldLabel:'业务员',
	valueField : "id",
	displayField : "empsId",
	pageSize : 10,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post",
	listWidth : 350
});

Ext.reg('empbindcombo',EmpBindCombo);

// 审核状态
CheckCombo = Ext.extend(Ext.form.ComboBox,{
	isSearchField:true,
	searchName:'orderStatus',
	name:'orderStatus',
	emptyText:'请选择',
	fieldLabel:'审核状态',
	valueField : "id",
	displayField : "name",
	anchor : "100%",
	triggerAction : 'all',
	mode : 'local',
	validateOnBlur : true,
	selectOnFocus : true,
	initComponent:function(){
		this.store = new Ext.data.SimpleStore({
			fields : ["id", "name"],
			data : [['',this.emptyText]].concat(CHECK_STATUS)
		});
		CheckCombo.superclass.initComponent.call(this);
	}
});

Ext.reg('checkcombo',CheckCombo);

// 公司
CompanyBindCombo = Ext.extend(BindCombox,{
	dataUrl : "servlet/DataSelvert?tbname=CotCompany&key=companyShortName",
	objName:'CotCompany',
	name : 'companyId',
	searchName : 'companyId',
	fieldLabel : "公司",
	isSearchField:true,
	editable : true,
	valueField : "id",
	displayField : "companyShortName",
	emptyText : '请选择',
	pageSize : 10,
	anchor : "100%",
	allowBlank : true,
	sendMethod : "post",
	selectOnFocus : true,

	listWidth : 350
});

Ext.reg('companybindcombo',CompanyBindCombo);

// 联系人
ContactBindCombo = Ext.extend(BindCombox,{
	name : 'contactId',
	isSearchField:true,
	objName:'CotContact',
	searchName : 'contactId',
	fieldLabel : "联系人",
	emptyText : '请选择',
	dataUrl : "servlet/DataSelvert?tbname=CotContact",
	sendMethod : "post",
	displayField : "contactPerson",
	valueField : "id",
	anchor : "100%"
});

Ext.reg('contactbindcombo',ContactBindCombo);

// 币种
CurrencyBindCombo = Ext.extend(BindCombox,{
	dataUrl : "servlet/DataSelvert?tbname=CotCurrency&key=curNameEn",
	objName:'CotCurrency',
	editable : true,
	width:100,
	name:'currencyId',
	fieldLabel:"币种",
	emptyText:'请选择',
	valueField : "id",
	displayField : "curNameEn",
	pageSize : 10,
	anchor : "100%",
	selectOnFocus : true,
	sendMethod : "post",
	listWidth : 350
});

Ext.reg('currencybindcombo',CurrencyBindCombo);

