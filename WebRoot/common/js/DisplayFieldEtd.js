/**
 * 扩展DisplayField,让他的宽度随父面板的labelWidth,居左居右随labelAlign
 * 
 * @class DisplayFieldEtd
 * @extends Ext.form.DisplayField
 */
DisplayFieldEtd = Ext.extend(Ext.form.DisplayField, {
			style : 'text-align:right',
			width : 60,
			afterRender : function(ct, position) {
				DisplayFieldEtd.superclass.afterRender.call(this, ct, position);
//				var p =this.findParentByType('form');
//				alert(p)
			}
		});
Ext.reg('displayfieldetd', DisplayFieldEtd);

//Ext.FormPanel.prototype.initFields = function(){
//    var f = this.form;
//    var formPanel = this;
//    var fn = function(c){
//        if(formPanel.isField(c)){
//            f.add(c);
//        }else if(c.xtype=='displayfield'||c.findBy && c != formPanel){
//            formPanel.applySettings(c);
//            //each check required for check/radio groups.
//            if(c.items && c.items.each){
//                c.items.each(fn, this);
//            }
//        }
//    };
//    this.items.each(fn, this);
//}

