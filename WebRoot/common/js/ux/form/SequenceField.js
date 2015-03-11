/**
 * 自动单号设置组件,并且验证是否已存在值
 * @class QH.ux.form.SequenceField
 * @extends Ext.form.TriggerField
 */
QH.ux.form.SequenceField = Ext.extend(Ext.form.TriggerField,{
	defaultAutoCreate : {tag: "input", type: "text", size: "16", autocomplete: "off"},
	trigger1Class:'x-form-arrow-trigger',
    trigger2Class:'x-form-search-trigger',
//  triggerClass:'cal',
    triggerConfig: {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: 'seq_cal'},
    shadow : 'sides',
    modId:'',
    objName:'',
	initComponent:function(){
		QH.ux.form.SequenceField.superclass.initComponent.call(this);
	},
	onTriggerClick:Ext.emptyFn(),
	/**
	 * @cfg {String} domain
	 * (必须) 要操作的domain
	 */
	/**
	 * @cfg {String} domainId
	 * (必须) 要操作的ID
	 */
	validationEvent : 'change',
	invalidText : "已存在该值,请重新输入！",
	onRender:function(ct, position) {
		QH.ux.form.SequenceField.superclass.onRender.call(this, ct, position);
		var tip = new Ext.ToolTip({
			target : this.trigger,
			anchor : 'top',
			maxWidth : 160,
			minWidth : 160,
			html : '根据单号配置自动生成编号!'
		});
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
Ext.reg('seqfield', QH.ux.form.SequenceField);