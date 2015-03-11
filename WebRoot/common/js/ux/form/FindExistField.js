
/**
 * 验证是否已存在值
 * @author zhao
 * @class QH.ux.form.FindExistField
 * @extends Ext.form.TextField
 */
QH.ux.form.FindExistField = Ext.extend(Ext.form.TextField,{
	/**
	 * @cfg {String} domain
	 * (必须) 要操作的domain
	 */
	/**
	 * @cfg {String} domainId
	 * (必须) 要操作的ID
	 */
	/**
	 * 传递到后台的查询参数
	 * @type 
	 */
	params:{},
	validationEvent : 'blur',
	invalidText : "已存在该值,请重新输入！",
	initComponent : function(){
		QH.ux.form.FindExistField.superclass.initComponent.call(this);
		this.addEvents(
			/**
			 * 
			 */
			'aftervalid'
		);
	},
	validator : function(thisText) {
		var temp = false;
		if (thisText != '') {
			if(this.invalidTextBak){
				this.invalidText=this.invalidTextBak;
			}
			DWREngine.setAsync(false);
			var map = {
				id:this.domainId,
				domain:this.domain
			};
			map[this.name] = thisText;
			Ext.applyIf(map,this.params);
			baseSerivce.findIsExistValue(map, function(res) {
				temp = !res;
			});
			DWREngine.setAsync(true);
			this.fireEvent('aftervalid',this,temp);
		}else{
			//如果该字段需要不为空时
			if(!this.allowBlank){
				this.invalidTextBak=this.invalidText;
				this.invalidText=this.blankText;
			}else{
				temp=true;
			}
		}
		return temp;
	}
});

Ext.reg('findexistfield',QH.ux.form.FindExistField);