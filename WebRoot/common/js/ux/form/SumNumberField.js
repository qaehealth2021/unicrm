/**
 * 用于调用公式计算的数字框
 * 
 * @class QH.ux.form.SumNumberField
 * @extends Ext.form.NumberField
 */
QH.ux.form.SumNumberField = Ext.extend(Ext.form.NumberField, {
	/**
	 * 需要参与计算该NumberField值的因子
	 * 
	 * @type
	 */
	params : [],
	/**
	 * 不显示在页面上的因子,这时需要到后台根据id查询需要的参数,所以表单的modId必须有
	 * @type 
	 */
	hideParams : [],
	/**
	 * 获得因子值的表单
	 * 
	 * @type
	 */
	form : {},
	/**
	 * domain名
	 * 
	 * @type String
	 */
	formulaType : '',
	/**
	 * 要计算的bean属性
	 * 
	 * @type String
	 */
	attr : '',
	initComponent : function() {
		var field = this;
		QH.ux.form.SumNumberField.superclass.initComponent.call(this);
		this.addEvents(
				/**
				 * @event aftersum 每个因子计算后触发该事件
				 * @param {SumNumberField}
				 *            this
				 * @param {float}
				 *            newVal
				 * @param {float}
				 *            oldVal
				 */
				'aftersum');
		field.form.on('afterrender', function(pnl) {
			for (var i = 0; i < field.params.length; i++) {
				var pa = field.form.getForm().findField(field.params[i]);
				pa.on('change', function(txt, newVal, oldVal) {
							var values = getFormValues(field.form, false);
							eval('var bean = new ' + field.formulaType + '();');
							for (var p in bean) {
								bean[p] = values[p];
							}
							//如果有不显示在页面上的因子,这时需要到后台根据id查询
							if(field.hideParams.length>0){
								DWREngine.setAsync(false);
								baseSerivce.getObjByIntegerId(field.form.modId, field.formulaType,
									function(res) {
										for (var j = 0; j < field.hideParams.length; j++) {
											var hideParam=field.hideParams[j];
											bean[hideParam]=res[hideParam];
										}
									});
								DWREngine.setAsync(true);
							}
							var beanStr = Ext.encode(bean);
							formulaService.getCalValue(field.formulaType,
									field.attr, beanStr, function(res) {
										var old = field.getValue();
										field.setValue(res);
										field.fireEvent('aftersum', field, res,
												old);
									})
						})
			}
		})
	}
});

Ext.reg('sumnumberfield', QH.ux.form.SumNumberField);