
$import('mail/info/js/mailAttachMenu.js');

$import('common/ext/ux/DataView-more.js');
$importCss('common/css/mailattachview.css');
/**
 * 
 * @class QH.mail.AttachDataView
 * @extends Ext.DataView
 */
QH.mail.AttachDataView = Ext.extend(Ext.DataView,{
    multiSelect: true,
    cls:'attach-view',
    overClass:'x-view-over',
    itemSelector:'div.thumb-wrap',
    emptyText: '没有附件',
    autoScroll:true,
    boxMaxHeight:60,
    append:false,	// 添加时是否保留原来附件
	initComponent:function(){
		this.initStore();
		
		this.initTemplate();
		
		this.initPlugins();
		
		QH.mail.AttachDataView.superclass.initComponent.call(this);
		this.on({
			'dblclick':{
				fn:this.onAttachDblClick,
				scope:this
			}
		});
	},
	onAttachDblClick : function(dataView,index,node,e){
		var record = dataView.getStore().getAt(index);
		QH.mail.openAttachFn(record.data);
	},
	initPlugins : function(){
		this.plugins = this.plugins || [
			new QH.mail.MailAttachRightMenu()
		];
		this.plugins.push(new Ext.DataView.DragSelector());
	},
	initTemplate : function(){
		this.tpl = new Ext.XTemplate(
		    '<tpl for=".">',
		        '<div class="thumb-wrap">',
		        '<div class="thumb">',
		        	'<img style="width:16px;height:16px;position:relative;top:3px;" src="{[this.imageSrcFn(values.name)]}" onerror="javascript:this.src=\'{[this.imageSrcFn()]}\';this.onerror=null;"/>',
		        	'<span class="x-editable" style="padding-left:1px;">{name}</span>',
		        	'<span style="color:#888">{[this.sizeFn(values.size)]};</span>',
		        '</div>',
		        '</div>',
		    '</tpl>',
		    {
		    	sizeFn:function(size){
		    		return QH.mail.sizeFn(size);
		    	},
		    	imageSrcFn:function(name){
		    		return "common/ext/resources/images/filetype/"+QH.mail.attachExtNameFn(name)+".png";
		    	}
		    }
		);
	},
	initStore : function(){
		this.store = new Ext.data.ArrayStore({
			data : [],
		    fields: [
		        'name','size','url'
		    ]
		});
	},
	getAttachs : function(){
		var records = this.getStore().getRange();
		var attachs = [],mailAttach;
		Ext.each(records,function(record){
			mailAttach = new CotMailAttach();
			Ext.apply(mailAttach,record.data);
			attachs.push(mailAttach);
		});
		return attachs;
	},
	addAttachs : function(attachs){
		if(Ext.isEmpty(attachs)){
			this.hide();
		}else{
			this.show();
			var datas = [];
			Ext.each(attachs,function(attach){
				datas.push([
					attach.name,
					attach.size,
					attach.url
				]);
			});
			this.store.loadData(datas,this.append);
		}
		this.doLayoutView();
	},
	doLayoutView:function(){
		var thumbDivs = Ext.DomQuery.select("div.thumb-wrap",this.getTemplateTarget().dom);
		var offsetWidth = 0;
		Ext.each(thumbDivs,function(thumbDiv){
			if(offsetWidth < thumbDiv.offsetWidth)
				offsetWidth = thumbDiv.offsetWidth;
		});
		Ext.each(thumbDivs,function(thumbDiv){
			thumbDiv.style.width = offsetWidth;
		});
		try{
			this.setHeight('auto');
			this.setHeight(this.getHeight());
		}catch(e){
		}
		this.detailPanel.doLayout();
	}
});

Ext.reg('mailattachdataview',QH.mail.AttachDataView);