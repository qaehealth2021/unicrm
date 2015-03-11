/**
 * Grid行编辑插件
 * @author zhao
 * @class QH.ux.grid.BaseRowEditor
 * @extends Ext.ux.grid.RowEditor
 */
QH.ux.grid.BaseRowEditor = Ext.extend(Ext.ux.grid.RowEditor,{
	/**
	 * @cfg {String} saveText
	 * 保存修改数据的按钮名字
	 */
	saveText: '保存',
	/**
	 * @cfg {String} cancelText
	 * 取消修改数据的按钮名字
	 */
    cancelText: '取消',
    /**
     * @cfg {String} commitChangesText
	 * 当存在修改数据时，未点修改或取消按钮，所出现的提示消息
     */
    commitChangesText: '请按修改或取消按钮',
    /**
     * @cfg {String} errorText
	 * 提示错误信息时的标题
     */
    errorText: '错误',
    /**
     * @cfg {String} clicksToEdit
	 * 点击行N次时出现编辑框，1为单击，2为双击
     */
    clicksToEdit:2,
    /**
     * @cfg {String} monitorValid
     * 当编辑框显示时，是否进行循环验证，false为不进行
     */
    monitorValid:false,
    /**
     * 是否弹出提示框，默认为false
     * @type Boolean
     */
    errorSummary:false,
    /**
	 * @cfg {Array} fields
	 * 所有编辑框
	 */
    initComponent:function(){
    	
    	QH.ux.grid.BaseRowEditor.superclass.initComponent.call(this);
    	
    	this.addEvents(
    		/**
    		 * @param this 当前editor
    		 * @param rowIndex 当行编辑行
    		 * @event afterstartedit
    		 * 开始编辑之后，触发该事件
    		 * 
    		 */
    		'afterstartedit',
    		/**
    		 * @param this 当前editor
    		 * @param field 改变值的field
    		 * @param newValue 新值
    		 * @param oldValue 旧值
    		 * @event fieldchange
    		 * 编辑field值改变事件
    		 */
    		'fieldchange'
    	);
    	
    	this.on({
	    	'canceledit':{
	    		fn:function(editor, result){
    				editor.grid.enable();	// 还原所编辑的GIRD为可用
	    			var obj = editor.grid.getOperateTbar().getNewObj();	
	    			Ext.apply(obj,editor.grid.getOperateTbar().defaultData); // 获得一个含有默认值的数据对象
	    			var cm = editor.grid.getColumnModel(), fields = editor.items.items, f, val;
		            for(var i = 0, len = cm.getColumnCount(); i < len; i++){
		                val = editor.preEditValue(editor.record, cm.getDataIndex(i));	// 获得编辑值
		                f = fields[i];
		                f.setValue(val);
		                editor.values[f.id] = Ext.isEmpty(val) ? '' : val;
		            }
		            // 如果取消编辑后的数据，与默认值一样，则取消添加
	    			if(Ext.encode(editor.record.data)==Ext.encode(obj)){
	    				editor.grid.getStore().remove(editor.record);	
	    			}
			    }
	    	},
	    	'afteredit':{
	    		fn:function(editor, changes, r, rowIndex){
	    			editor.grid.enable();
	    			var toolbar = editor.grid.getOperateTbar();
					if(toolbar&&!toolbar.disabledControl)
						toolbar.itemsControl();
			    }
	    	}
    	});
    },
    /**
     * 开始编辑
     * @param {} rowIndex 行
     * @param {} doFocus 焦点
     */
    startEditing: function(rowIndex, doFocus){
        if(this.editing && this.isDirty()){
            this.showTooltip(this.commitChangesText);
            return;
        }
        if(Ext.isObject(rowIndex)){
            rowIndex = this.grid.getStore().indexOf(rowIndex);
        }
        if(this.fireEvent('beforeedit', this, rowIndex) !== false){
            this.editing = true;
            var g = this.grid, view = g.getView(),
                row = view.getRow(rowIndex),
                record = g.store.getAt(rowIndex);

            this.record = record;
            this.rowIndex = rowIndex;
            this.values = {};
            if(!this.rendered){
                this.render(view.getEditorParent());
            }
            var w = Ext.fly(row).getWidth();
            this.setSize(w);
            if(!this.initialized){
                this.initFields();
            }
            var cm = g.getColumnModel(), fields = this.items.items, f, val;
            for(var i = 0, len = cm.getColumnCount(); i < len; i++){
                val = this.preEditValue(record, cm.getDataIndex(i));
                f = fields[i];
                if(!cm.config[i].editor&&cm.config[i].renderer){
                	f.isDispaly = true;
            		f.setValue(cm.config[i].renderer(val,{},record,rowIndex,i,g.store));
                }else{
	                f.setValue(val);
	                // 额外代码，与BindCombox控件结合
	                if(f.objName){
	            		if(!val){
	            			f.clearValue();
	            			f.resetData();
	            		}
		            }
                }
                this.values[f.id] = Ext.isEmpty(val) ? '' : val;
            }
            this.verifyLayout(true);
            if(!this.isVisible()){
                this.setPagePosition(Ext.fly(row).getXY());
            } else{
                this.el.setXY(Ext.fly(row).getXY(), {duration:0.15});
            }
            if(!this.isVisible()){
                this.show().doLayout();
            }
            if(doFocus !== false){
                this.doFocus.defer(this.focusDelay, this);
            }
            this.fireEvent('afterstartedit',this,rowIndex);
            this.bindHandler();
        }
    },
    stopEditing : function(saveChanges){
        this.editing = false;
        if(!this.isVisible()){
            return;
        }
        if(saveChanges === false){
            this.hide();
            this.fireEvent('canceledit', this, saveChanges === false);
            return;
        }
        if(!this.isValid()){
        	return;
        }
        var changes = {},
            r = this.record,
            hasChange = false,
            cm = this.grid.colModel,
            fields = this.items.items;
        for(var i = 0, len = cm.getColumnCount(); i < len; i++){
            if(!cm.isHidden(i)){
                var dindex = cm.getDataIndex(i);
                if(!Ext.isEmpty(dindex)){
                    var oldValue = getObjValue(r.data,dindex),
                    
                    value = this.postEditValue(
                    !cm.config[i].editor
                    && cm.config[i].renderer 
                    && !cm.config[i].isChange  // isChange 是当 不存在编辑，但值会改变时，则取field的value
                    ?oldValue:fields[i].getValue(), oldValue, r, dindex);
                    if(String(oldValue) !== String(value)){
                        setObjValue(changes,dindex,value);
                        if(cm.config[i].renderIndex && fields[i].getRawValue)
                        	setObjValue(changes,cm.config[i].renderIndex,fields[i].getRawValue());
                        hasChange = true;
                    }
                }
            }
        }
        if(hasChange && this.fireEvent('validateedit', this, changes, r, this.rowIndex) !== false){
            r.beginEdit();
            if(this.objValue){
            	Ext.applyIf(changes,this.objValue);
            	this.objValue = '';
            }
            Ext.iterate(changes, function(name, value){
                r.set(name, value);
            });
            r.endEdit();
            this.fireEvent('afteredit', this, changes, r, this.rowIndex);
        }
        this.hide();
    },
    upEditing : function(f,e){
    	if(this.rowIndex >0 && this.isValid()){
    		this.stopEditing(true);	// 先停止并保存编辑
    		this.grid.getView().refresh();
    		this.startEditing(this.rowIndex - 1,false);
    		f.focus.defer(this.focusDelay, f);
    	}
    },
    downEditing : function(f,e){
    	if(this.rowIndex < this.grid.store.getCount() - 1 && this.isValid()){
    		this.stopEditing(true);	// 先停止并保存编辑
    		this.startEditing(this.rowIndex +1,false);
    		f.focus.defer(this.focusDelay, f);
    	}
    },
    preEditValue : function(r, field){
    	var value = getObjValue(r.data,field);
        return this.autoEncode && typeof value === 'string' ? Ext.util.Format.htmlDecode(value) : value;
    },
    isDirty: function(){
        var dirty = false;
        this.items.each(function(f){
            if(!f.isDispaly&&String(this.values[f.id]) !== String(f.getValue())){
                dirty = true;
                return false;
            }
        }, this);
        return dirty;
    },
    /**
     * 获得当前所编辑的Record
     * @return {Ext.data.Record}
     */
    getRecord : function(){
    	return this.record;
    },
    /**
     * 获得编辑框
     * @param {Number/String} dataIndex 编辑框的位置或属性值
     * @return {Ext.form.Field}
     */
    getField : function(dataIndex){
    	var fields = this.items.items;
    	if(Ext.isNumber(dataIndex)){
    		return fields[dataIndex];
    	}else{
    		var lookup = this.grid.getColumnModel().lookup;
    		for(var p in lookup){
    			if(lookup[p].dataIndex == dataIndex){
    				return fields[p];
    			}
    		}
    	}
    },
    setFieldValues : function(objValue){
    	if(!Ext.isObject(objValue))
    		return;
    	var fields = this.fields,f,val;
    	for(var p in objValue){
    		f = fields[p];
    		val = objValue[p];
    		if(f){
    			if(f.isDispaly){
    				f.setValue(f.renderer(val));
    			}else{
    				f.setValue(val);
    			}
    		}
//    		this.record.set(p,val);
    	}
    	this.objValue = objValue;
    	var cm = this.grid.getColumnModel(), fields = this.items.items, f, val,config;
        for(var i = 0, len = cm.getColumnCount(); i < len; i++){
        	config = cm.config[i];
            val = objValue[config.dataIndex];
            f = fields[i];
            if(f.isDispaly){
        		f.setValue(config.renderer(val));
            }else{
                f.setValue(val);
            }
            this.values[f.id] = Ext.isEmpty(val) ? '' : val;
            if(f.objName){
            	try {
	            	f.bindValue(eval("objValue." + config.dataIndex));
				} catch (err) {
					f.clearValue();
				}
            }
        }
        this.bindHandler();
    },
    setFieldValue : function(dataIndex,value){
    	this.getField(dataIndex).setValue(value);
    	 this.bindHandler();
    },
    getFieldValue : function(dataIndex){
    	return this.getField(dataIndex).getValue();
    	 this.bindHandler();
    },
    onKey: function(f, e){
    	var isArea = f.isXType('textarea');
        if(e.getKey() === e.ENTER){
            this.stopEditing(true);
            e.stopPropagation();
        }else if(e.getKey() === e.ESC){
        	this.stopEditing(false);
        	e.stopPropagation();
        }else if(e.getKey() === e.UP && e.altKey){
        	this.upEditing(f,e);
        }else if(e.getKey() === e.UP && !isArea){
        	this.upEditing(f,e);
        }else if(e.getKey() === e.DOWN &&  e.altKey){
        	this.downEditing(f,e);
        }else if(e.getKey() === e.DOWN && !isArea){
        	this.downEditing(f,e);
        }
    },
    onKeyup: function(f, e){
    	this.bindHandler();
    },
    bindHandler : function(){
        if(!this.bound && this.monitorValid){
            return false; // stops binding
        }
        var valid = this.isValid();
        if(!valid && this.errorSummary){
            this.showTooltip(this.getErrorText().join(''));
        }else{
        	this.hideTooltip();
        }
        var dirty = this.isDirty();
        this.btns.saveBtn.setDisabled(!valid||!dirty);
        this.fireEvent('validation', this, valid, dirty);
    },
    /**
     * 替换编辑框
     * @param {Number/String} dataIndex 编辑框的位置或属性值
     * @param {Ext.form.Field/Object} 要替换的编辑框
     * @return {Ext.form.Field}
     */
    replayField : function(dataIndex,ed){
    	var field = this.getField(dataIndex);
    	if(!Ext.isNumber(dataIndex))
    		dataIndex = this.items.items.indexOf(field);
    	var cm = this.grid.getColumnModel();
    	var c = cm.getColumnAt(dataIndex);
    	var ed = this.lookupComponent(this.applyDefaults(ed));
    	ed.name = field.name;
    	ed.margins = field.margins;
    	ed.setWidth(field.getWidth());
    	ed.column = c;
        if(ed.ownerCt !== this){
            ed.on('focus', this.ensureVisible, this);
            ed.on('specialkey', this.onKey, this);
            ed.enableKeyEvents = true;
            ed.on('keyup',this.onKeyup,this);
            ed.on('select',this.onKeyup,this);
            ed.on('change',this.onChange,this);
            ed.on('check',this.onKeyup,this);
        }
    	this.remove(field);
        this.insert(dataIndex, ed);
        this.doLayout();
        return ed;
    },
    initFields: function(){
        var cm = this.grid.getColumnModel(), pm = Ext.layout.ContainerLayout.prototype.parseMargins;
        this.removeAll(false);
        this.fields = {};
        for(var i = 0, len = cm.getColumnCount(); i < len; i++){
            var c = cm.getColumnAt(i),
                ed = c.getEditor();
            if(!ed){
                ed = c.displayEditor || new Ext.form.DisplayField({
                	style:{
                		paddingLeft:'6px',
                		font:'normal 11px/13px arial, tahoma, helvetica, sans-serif'
                	}
                });
            }
            ed.name = c.dataIndex;
            if(i == 0){
                ed.margins = pm('0 1 2 1');
            } else if(i == len - 1){
                ed.margins = pm('0 0 2 1');
            } else{
                ed.margins = pm('0 1 2 0');
            }
            ed.setWidth(cm.getColumnWidth(i));
            ed.column = c;
            if(ed.ownerCt !== this){
                ed.on('focus', this.ensureVisible, this);
	            ed.on('specialkey', this.onKey, this);
	            ed.enableKeyEvents = true;
	            ed.on('keyup',this.onKeyup,this);
	            ed.on('select',this.onKeyup,this);
	            ed.on('change',this.onChange,this);
	            ed.on('check',this.onKeyup,this);
            }
            if(ed.dataIndex){
            	ed.renderer = cm.renderer;
           		this.fields[ed.dataIndex] = ed;
            }
            this.insert(i, ed);
        }
        this.initialized = true;
    },
    /**
     * 过滤一个field不验证
     * @param {} exceptionField
     * @return {}
     */
    isValidException: function(exceptionField){
        var valid = true;
        this.items.each(function(f){
            if(exceptionField != f && !f.isValid(true)){
                valid = false;
                return false;
            }
        });
        return valid;
    },
    onChange : function(field,newValue,oldValue){
    	this.onChangeBuffer.defer(100,this,[field,newValue,oldValue]);
    },
    onChangeBuffer:function(field,newValue,oldValue){
    	this.fireEvent('fieldchange',this,field,newValue,oldValue);
    },
    hideTooltip: function(){
    	if(this.tooltip)
    		this.tooltip.hide();
    },
    showTooltip: function(msg){
        var t = this.tooltip;
        if(!t){
            t = this.tooltip = new Ext.ToolTip({
                maxWidth: 600,
                cls: 'errorTip',
                width: 300,
                title: this.errorText,
                autoHide: false,
                anchor: 'top',
                closable: true,
                anchorToTarget: true,
                mouseOffset: [100,20]
            });
        }
        var v = this.grid.getView(),
            top = parseInt(this.el.dom.style.top, 10),
            scroll = v.scroller.dom.scrollTop,
            h = this.el.getHeight();

        if(top + h >= scroll){
            t.initTarget(this.items.last().getEl());
            if(!t.rendered){
                t.show();
                t.hide();
            }
            t.body.update(msg);
            t.doAutoWidth(20);
            t.show();
        }else if(t.rendered){
            t.hide();
        }
    },
    //azan--添加,为了双击单元格后,全选里面的文本
    ensureVisible: function(editor){
        if(this.isVisible()){
             this.grid.getView().ensureVisible(this.rowIndex, this.grid.colModel.getIndexById(editor.column.id), true);
             //---新增的内容
             if(editor.selectText){
	             editor.selectText();
             }
        }
    }
});
Ext.reg('baseroweditor',QH.ux.grid.BaseRowEditor);