ChangElePicWin = function(cfg) {
	var _self = this;
	if (!cfg)
		cfg = {};
		
	var picRecord = new Ext.data.Record.create([{
				name : "picName"
			}, {
				name : "url"
			}]);
	var writer = new Ext.data.JsonWriter({
				encode : true,
				writeAllFields : true
			});
	// 创建数据源
//	var ds = new Ext.data.Store({
//				proxy : new Ext.data.HttpProxy({
//							url : "cotelements.do?method=changePicture&eId="+cfg.eleId
//						}),
//				reader : new Ext.data.JsonReader({
//							root : "data",
//							totalProperty : "totalCount",
//							idProperty : "id"
//						}, picRecord),
//				writer : writer
//			});
	var ds = new Ext.data.ArrayStore({
        proxy   : new Ext.data.MemoryProxy(),
        fields  : ['picName','url'],
        sortInfo: {
            field    : 'picName',
            direction: 'ASC'
        }
    });
    ds.loadData([
        ['圣诞节','http://www.xmqh.net/template/images/design/zy1.jpg'],
        ['枫叶','http://www.xmqh.net/template/images/leafs/tl.jpg'],
        ['生日','http://www.xmqh.net/template/images/birth/t_ml.jpg'],
        ['大海','http://www.xmqh.net/template/images/sea/m_dr.jpg']
    ]);
	// 产品表格顶部工具栏
	var tb = new Ext.Toolbar({
				items : ['->', {
							text : "插入",
							tooltip:'把选中的图片作为邮件的背景图片',
							handler : function() {
								mask();
								setTimeout(function() {
											insert();
										}, 500);
							},
							iconCls : "page_add"
						}
				]
			});
	var toolbar_pic = new Ext.PagingToolbar({
				pageSize : 10,
				store : ds,
				displayInfo : true,
				displayMsg : '显示第 {0} - {1}条记录 共{2}条记录',
				displaySize : '5|10|15|20|all',
				emptyMsg : "无记录"
			})

	var thumbTemplate = new Ext.XTemplate(
			'<tpl for=".">',
			'<div class="thumb-wrap">',
			'<div class="thumb"><img title="{picName}" src="{url}" style="height:120px;" onload="DrawImage(this,150,150)"></div>',
			'<span class="x-editable">{picName}</span>' + '</div>', '</tpl>');
	thumbTemplate.compile();
	var picView = new Ext.DataView({
				id : "picView",
				tpl : thumbTemplate,
				multiSelect : true,
				autoScroll : true,
				bodyStyle : "overflow-x:hidden;",
				overClass : 'x-view-over',
				itemSelector : 'div.thumb-wrap',
				emptyText : '<div style="padding:10px;">没有记录</div>',
				plugins : [new Ext.DataView.DragSelector(),
						new Ext.DataView.LabelEditor({
									dataIndex : 'picName',
									saveAuto : true
								})],
				store : ds
			});
	var panel_pic = new Ext.Panel({
				id : "img-chooser-view",
				tbar : tb,
				bbar : toolbar_pic,
				border: false,
				layout : 'fit',
				items : [picView]
			});
	// 将查询面板的条件加到ds中
//	ds.load({
//				params : {
//					start : 0,
//					limit : 10
//				}
//			});
	// 获得选择的记录
	var getIds = function() {
		var res = new Array();
		var list = picView.getSelectedRecords();
		Ext.each(list, function(item) {
					res.push(item.id);
				});
		return res;
	}
	// 添加
	function insert() {
		var list = getIds();
		if (list.length == 0) {
			Ext.MessageBox.alert("提示信息", '请选择图片！');
			unmask();
			return;
		}
		if (list.length > 1) {
			Ext.MessageBox.alert("提示信息", '只能选择一张图片！');
			unmask();
			return;
		}
		var ary =  picView.getSelectedRecords();
		var record=ary[0];
		var eleUrl=record.get('url');
		cfg.bar.inserPic(eleUrl);
	}
	
	var con = {
		width : 400,
		height : 300,
		title : "背景图片",
		modal : true,
		id : "modPriceWin",
		layout:'fit',
		items : [panel_pic]
	}
	Ext.apply(con, cfg);
	ChangElePicWin.superclass.constructor.call(this, con);
};

Ext.extend(ChangElePicWin, Ext.Window, {});