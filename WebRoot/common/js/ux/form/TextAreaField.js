/**
 * 表格中的textarea
 * @class QH.ux.form.TextAreaField
 * @extends Ext.form.TextArea
 */
QH.ux.form.TextAreaField = Ext.extend(Ext.form.TextArea, {
	maxLength : 500,
	initComponent : function() {
		var field = this;
		this.autoCreate  = {tag: "textarea", style: "width:100px;height:20px;", autocomplete: "on"};
		QH.ux.form.TextAreaField.superclass.initComponent.call(this);
		//弹出层
		this.on('focus',function(txt){
			 txt.textSizeEl = Ext.DomHelper.append(document.body, {
                tag: "pre", cls: "x-form-grow-sizer"
            });
            if(txt.preventScrollbars){
                txt.el.setStyle("overflow", "hidden");
            }
            txt.el.setHeight(txt.growMin);
            //调整rowedit的高度
            txt.ownerCt.verifyLayout();
		});
		//隐藏层
		this.on('blur',function(txt){
			txt.el.setHeight(20);
            //调整rowedit的高度
            txt.ownerCt.verifyLayout();
		});
	}
});

Ext.reg('textareafield', QH.ux.form.TextAreaField);