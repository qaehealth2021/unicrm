
QH.ux.view.PicView = Ext.extend(Ext.DataView,{
	multiSelect : true,
	autoScroll : true,
	bodyStyle : "overflow-x:hidden;",
	loadMask : {
		msg : '数据读取中...'
	},
	cls:'pic-view',
    overClass:'x-view-over',
	itemSelector : 'div.thumb-wrap',
	headerId:'',
	emptyText : '<div style="padding:10px;">没有记录</div>',
	tabName:'',// 对象名
	picPathField:'',	// 图片路径字段
	picNameField:'',	// 图片名字字段	
	picDescField:'',	// 图片描述字段
	select : function(nodeInfo, keepExisting, suppressEvent){
        if(Ext.isArray(nodeInfo)){
            if(!keepExisting){
                this.clearSelections(true);
            }
            for(var i = 0, len = nodeInfo.length; i < len; i++){
                this.select(nodeInfo[i], true, true);
            }
            if(!suppressEvent){
                this.fireEvent("selectionchange", this, this.selected.elements);
            }
        } else{
            var node = this.getNode(nodeInfo);
            if(!keepExisting){
                this.clearSelections(true);
                this.getCheckbox(node).checked = !this.getCheckbox(node).checked;
            }
            if(node){
            	if(!this.isSelected(node)){
            		if(this.fireEvent("beforeselect", this, node, this.selected.elements) !== false){
            			if(keepExisting)
            				this.getCheckbox(node).checked = true;
	                    Ext.fly(node).addClass(this.selectedClass);
	                    this.selected.add(node);
	                    this.last = node.viewIndex;
	                }
            	}
            }
        }
    },
    deselect : function(node){
        if(this.isSelected(node)){
            node = this.getNode(node);
            this.getCheckbox(node).checked = false;
            this.selected.removeElement(node);
            if(this.last == node.viewIndex){
                this.last = false;
            }
            Ext.fly(node).removeClass(this.selectedClass);
            this.fireEvent("selectionchange", this, this.selected.elements);
        }
    },
    clearSelections : function(suppressEvent, skipUpdate){
        if((this.multiSelect || this.singleSelect) && this.selected.getCount() > 0){
            if(!skipUpdate){
                this.selected.removeClass(this.selectedClass);
            }
//            this.selected.each(function(ele){
//            	this.getCheckbox(ele.dom).checked = false;
//            },this);
            this.selected.clear();
            this.last = false;
            if(!suppressEvent){
                this.fireEvent("selectionchange", this, this.selected.elements);
            }
        }
    },
    onClick : function(e){
        var item = e.getTarget(this.itemSelector, this.getTemplateTarget());
        if(item){
            var index = this.indexOf(item);
            if(this.onItemClick(item, index, e) !== false){
                this.fireEvent("click", this, index, item, e);
            }
        }else{
            if(this.fireEvent("containerclick", this, e) !== false){
                this.onContainerClick(e);
            }
        }
    },
    getCheckbox:function(node){
    	return node.firstChild.childNodes[2];
    },
    getCheckboxs:function(){
    	var oSel = document.getElementsByName(+this.headerId+'_check_pic');
		var list=[];
        for( i = 0; i< oSel.length; i++ ){
        	if(oSel[i].id){
        		var flag=oSel[i].id.indexOf(this.headerId+"check_pic_");
             	if(flag!=-1 && oSel[i].checked){
             		var id = oSel[i].id.substring(flag+10);
             		list.push(i);
             	}
        	}
        }
    	return list;
    },
	initComponent:function(){
		if(!this.headerId)
			this.headerId = new Date().getTime();
		if(!this.tpl){
			this.tpl = new Ext.XTemplate(
				'<tpl for=".">',
					'<div class="thumb-wrap">',
						'<div style="position:relative;width:150px;height:180px;">',
							'<div class="thumb">',
								'<img id="'+this.headerId+'qc_img_{id}" src="servlet/ShowPicServlet?id={id}&tbName='+this.tabName+'&field='+this.picPathField+'" onerror="this.src=\"common/images/zwtp.png\"" onload="DrawImage(this,140,140)">',
							'</div>',
							'<span style="white-space: nowrap;text-overflow:ellipsis;overflow:hidden;">{'+this.picNameField+'}</span>',
							'<input id="'+this.headerId+'check_pic_{id}" name="'+this.headerId+'_check_pic" type="checkbox" onclick="stopEvent(event)"  style="position:absolute;bottom:0px;left:0px;"/>',
							'<img title="放大图片" style="position:absolute;bottom:0px;right:0px;" '+
								'onclick=zoomPic(event,document.getElementById("'+this.headerId+'qc_img_{id}")) '+
								'src="common/ext/resources/images/extend/magnifier_zoom_in.png">',
						'</div>',
					'</div>', 
				'</tpl>'
			);
			this.tpl.compile();
		}
		var tipinfo_pic = new Ext.XTemplate(
			"<p><font color=blue>图片名：</font>{"+this.picNameField+"}</p>",
			"<p><font color=blue>描述：</font>{"+this.picDescField+"}</p>");
		tipinfo_pic.compile();
		// 鼠标移到节点，可以显示相应的信息
		this.on('render', function(view) {
		this.tip = new Ext.ToolTip({
				target : this.getEl(), // 需要显示信息的组件
				delegate : '.x-view-over', // 一个domquery的selector，用来控制触发需要在哪里显示，通过CSS识别
				trackMouse : true, // Moving within the row should
				// not hide the tip.
				mouseOffset : [-100, 10],
				renderTo : document.body, // Render immediately so
				// that tip.body can be
				// referenced prior to
				// the first show.
				listeners : { // Change content dynamically
					// depending on which element
					// triggered the show.
					beforeshow : {
						fn:function updateTipBody(tip) {
							var record = this.getRecord(tip.triggerElement);
							// alert(record.eleId);
							tip.body.dom.innerHTML = tipinfo_pic.apply(record.data)
						},
						scope:this
					}
				}

			})
		});
//		this.store = new QH.elements.PicStore();
		this.plugins = new Ext.DataView.DragSelector();
		QH.ux.view.PicView.superclass.initComponent.call(this);
	}
});

Ext.reg('picview',QH.ux.view.PicView);