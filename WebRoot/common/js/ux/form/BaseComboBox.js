
QH.ux.form.BaseComboxField = Ext.extend(Ext.form.TwinTriggerField, {
    defaultAutoCreate : {tag: "input", type: "text", size: "24", autocomplete: "off"},
    disabledClass:'combo-disabled',
    listClass : '',
    selectedClass : 'x-combo-selected',
    listEmptyText: '',
//    triggerClass : 'x-form-arrow-trigger',
    trigger1Class:'x-form-arrow-trigger',
    trigger2Class:'page_add_small',
    shadow : 'sides',
    listAlign : 'tl-bl?',
    maxHeight : 300,
    minHeight : 90,
    triggerAction : 'query',
    minChars : 4,
    autoSelect : false,
    typeAhead : false,
    queryDelay : 500,
    /**
     * 如果这个参数写0或者不填，这界面采用不分页的方式显示
     * @type Number
     */
    pageSize : 0,
    selectOnFocus : false,
    queryParam : 'query',
    loadingText : 'Loading...',
    resizable : false,
    handleHeight : 8,
    allQuery: '',
    mode: 'remote',
    minListWidth : 70,
    forceSelection : false,
    typeAheadDelay : 100000,
    lazyInit : true,
    clearFilterOnReset : true,
    submitValue: undefined,
    /**start**/
    /**
     * @cfg{String} dataUrl
     * 绑定数据的URL
     */
    dataUrl:"",
    needReset:true,
	// mode : "local",
	autoLoad : false,
	editable : false,
	typeAheadDelay : 100000,// 默认延时查询250
	//typeAhead : true, // 自动填充
	forceSelection:false,
	lazyRender:false,
	lazyInit:false,
	triggerAction:"all",
	minChars:0,
	/**
	 * 是否显示多列
	 * @type Boolean
	 */
	displayMutilCol:false,
	
	/**
	 * 传递到后台的查询参数 如:{"factoryType":2,"empId":10}
	 * @type object
	 * 如果参数中含有 popedomUrl:emps.do，说明需要通过该URL判断权限
	 * popedomUrl为固定值
	 * 如果出现popedomUrl，则需要在指定一个查询参数popedomQueryId：需要查询的业务员对应的ID
	 * 如果popedomQueryId不填，则默认empsId；
	 * 如：员工表需要指定权限  
	 * queryParams:{
	 * 		popedomUrl:"emps.do",
	 * 		popedomQueryId:"id"//需要查询员工表的id字段
	 * }
	 * 如客户下拉框需要指定权限
	 * queryParams:{
	 * 		popedomUrl:"customer.do",
	 * 		popedomQueryId:"empsId"//需要查询客户表的empsId字段
	 * }
	 */
	queryParams:{},
	/**
	 * @cfg {Array} otherFields
	 * 除displayField，和valueField之外的Field
	 */
	/**
	 * @cfg {Array} allFields
	 * 将displayField,valueField,otherFields合并
	 */
	/**
	 * 是否需要显示“请选择”项
	 * @cfg {boolean} isInitDefault
	 */
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
	/**
	 *  父下拉框,如过指定string则是父亲下拉框的对象的name，如果指定对象，这是级联下拉框
	 * @type String/Object
	 */
	parentCombo:'',
	/**
	 *  domain里面对应的父类属性名
	 * @type String
	 */
	parentComboWith:'',
	/**end**/
    initComponent : function(){
        QH.ux.form.BaseComboxField.superclass.initComponent.call(this);
        this.addEvents(
            'expand',
            'collapse',
            'beforeselect',
            'select',
            'beforequery'
        );
        if(this.transform){
            var s = Ext.getDom(this.transform);
            if(!this.hiddenName){
                this.hiddenName = s.name;
            }
            if(!this.store){
                this.mode = 'local';
                var d = [], opts = s.options;
                for(var i = 0, len = opts.length;i < len; i++){
                    var o = opts[i],
                        value = (o.hasAttribute ? o.hasAttribute('value') : o.getAttributeNode('value').specified) ? o.value : o.text;
                    if(o.selected && Ext.isEmpty(this.value, true)) {
                        this.value = value;
                    }
                    d.push([value, o.text]);
                }
                this.store = new Ext.data.ArrayStore({
                    'id': 0,
                    fields: ['value', 'text'],
                    data : d,
                    autoDestroy: true
                });
                this.valueField = 'value';
                this.displayField = 'text';
            }
            s.name = Ext.id(); // wipe out the name in case somewhere else they have a reference
            if(!this.lazyRender){
                this.target = true;
                this.el = Ext.DomHelper.insertBefore(s, this.autoCreate || this.defaultAutoCreate);
                this.render(this.el.parentNode, s);
            }
            Ext.removeNode(s);
        }
        //auto-configure store from local array data
        else if(this.store){
            this.store = Ext.StoreMgr.lookup(this.store);
            if(this.store.autoCreated){
                this.displayField = this.valueField = 'field1';
                if(!this.store.expandData){
                    this.displayField = 'field2';
                }
                this.mode = 'local';
            }
        }

        this.selectedIndex = -1;
        if(this.mode == 'local'){
            if(!Ext.isDefined(this.initialConfig.queryDelay)){
                this.queryDelay = 10;
            }
            if(!Ext.isDefined(this.initialConfig.minChars)){
                this.minChars = 0;
            }
        }
        /**start**/
		this.store = this.initStore();
		
		this.initDefaultFn = function(){
			if(!this.isInitDefault) return;
			var record1 = new Ext.data.Record();
			record1.data[this.valueField] = "";
			record1.data[this.displayField] = this.emptyText||"请选择";
			if(this.store.findExact(this.displayField,this.emptyText||"请选择") != -1)
				return;
			this.store.insert(0,record1);
		}
		/**end**/
    },

    // private
    onRender : function(ct, position){
        if(this.hiddenName && !Ext.isDefined(this.submitValue)){
            this.submitValue = false;
        }
        QH.ux.form.BaseComboxField.superclass.onRender.call(this, ct, position);
        if(this.hiddenName){
            this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName,
                    id: (this.hiddenId||this.hiddenName)}, 'before', true);

        }
        if(Ext.isGecko){
            this.el.dom.setAttribute('autocomplete', 'off');
        }

        if(!this.lazyInit){
            this.initList();
        }else{
            this.on('focus', this.initList, this, {single: true});
        }
    },
	
    // private
    initValue : function(){
        QH.ux.form.BaseComboxField.superclass.initValue.call(this);
        if(this.hiddenField){
            this.hiddenField.value =
                Ext.value(Ext.isDefined(this.hiddenValue) ? this.hiddenValue : this.value, '');
        }
    },
    getParentZIndex : function(){
        var zindex;
        if (this.ownerCt){
            this.findParentBy(function(ct){
                zindex = parseInt(ct.getPositionEl().getStyle('z-index'), 10);
                return !!zindex;
            });
        }
        return zindex;
    },
    // private
    initList : function(){
        if(!this.list){
            var cls = 'x-combo-list',
                listParent = Ext.getDom(this.getListParent() || Ext.getBody()),
                zindex = parseInt(Ext.fly(listParent).getStyle('z-index'), 10);

            if (!zindex) {
                zindex = this.getParentZIndex();
            }

            this.list = new Ext.Layer({
                parentEl: listParent,
                shadow: this.shadow,
                cls: [cls, this.listClass].join(' '),
                constrain:false,
                zindex: (zindex || 12000) + 5
            });

            var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
            this.list.setSize(lw, 0);
            this.list.swallowEvent('mousewheel');
            this.assetHeight = 0;
            if(this.syncFont !== false){
                this.list.setStyle('font-size', this.el.getStyle('font-size'));
            }
            if(this.title){
                this.header = this.list.createChild({cls:cls+'-hd', html: this.title});
                this.assetHeight += this.header.getHeight();
            }

            this.innerList = this.list.createChild({cls:cls+'-inner'});
            this.mon(this.innerList, 'mouseover', this.onViewOver, this);
            this.mon(this.innerList, 'mousemove', this.onViewMove, this);
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));

            if(this.pageSize){
                this.footer = this.list.createChild({cls:cls+'-ft'});
                this.pageTb = new Ext.PagingToolbar({
                    store: this.store,
                    pageSize: this.pageSize,
                    renderTo:this.footer
                });
                this.assetHeight += this.footer.getHeight();
            }

            if(!this.tpl){
            	var otherStr = '{' + this.displayField + '}';
            	if(this.displayMutilCol){
	            	if(Ext.isObject(this.otherFields)){
	            		otherStr += '&nbsp;{' + this.otherFields.name + '}';
	            	}else if(Ext.isArray(this.otherFields)){
	            		Ext.each(this.otherFields,function(field){
	            			otherStr += '&nbsp;{' + field.name + '}';
	            		});
	            	}
            	}
                this.tpl = '<tpl for="."><div class="'+cls+'-item">' + otherStr + '</div></tpl>';
            }
            this.view = new Ext.DataView({
                applyTo: this.innerList,
                tpl: this.tpl,
                singleSelect: true,
                selectedClass: this.selectedClass,
                itemSelector: this.itemSelector || '.' + cls + '-item',
                emptyText: this.listEmptyText,
                deferEmptyText: false
            });

            this.mon(this.view, {
                containerclick : this.onViewClick,
                click : this.onViewClick,
                scope :this
            });

            this.bindStore(this.store, true);

            if(this.resizable){
                this.resizer = new Ext.Resizable(this.list,  {
                   pinned:true, handles:'se'
                });
                this.mon(this.resizer, 'resize', function(r, w, h){
                    this.maxHeight = h-this.handleHeight-this.list.getFrameWidth('tb')-this.assetHeight;
                    this.listWidth = w;
                    this.innerList.setWidth(w - this.list.getFrameWidth('lr'));
                    this.restrictHeight();
                }, this);

                this[this.pageSize?'footer':'innerList'].setStyle('margin-bottom', this.handleHeight+'px');
            }
        }
    },
    getListParent : function() {
        return document.body;
    },
    getStore : function(){
        return this.store;
    },

    // private
    bindStore : function(store, initial){
        if(this.store && !initial){
            if(this.store !== store && this.store.autoDestroy){
                this.store.destroy();
            }else{
                this.store.un('beforeload', this.onBeforeLoad, this);
                this.store.un('load', this.onLoad, this);
                this.store.un('exception', this.collapse, this);
            }
            if(!store){
                this.store = null;
                if(this.view){
                    this.view.bindStore(null);
                }
                if(this.pageTb){
                    this.pageTb.bindStore(null);
                }
            }
        }
        if(store){
            if(!initial) {
                this.lastQuery = null;
                if(this.pageTb) {
                    this.pageTb.bindStore(store);
                }
            }

            this.store = Ext.StoreMgr.lookup(store);
            this.store.on({
                scope: this,
                beforeload: this.onBeforeLoad,
                load: this.onLoad,
                exception: this.collapse
            });

            if(this.view){
                this.view.bindStore(store);
            }
        }
    },

    reset : function(){
        QH.ux.form.BaseComboxField.superclass.reset.call(this);
        if(this.clearFilterOnReset && this.mode == 'local'){
            this.store.clearFilter();
        }
    },

    // private
    initEvents : function(){
        QH.ux.form.BaseComboxField.superclass.initEvents.call(this);


        this.keyNav = new Ext.KeyNav(this.el, {
            "up" : function(e){
                this.inKeyMode = true;
                this.selectPrev();
            },

            "down" : function(e){
                if(!this.isExpanded()){
                    this.onTrigger1Click();
                }else{
                    this.inKeyMode = true;
                    this.selectNext();
                }
            },

            "enter" : function(e){
                this.onViewClick();
            },

            "esc" : function(e){
                this.collapse();
            },

            "tab" : function(e){
                if (this.forceSelection === true) {
                    this.collapse();
                } else {
                    this.onViewClick(false);
                }
                return true;
            },

            scope : this,

            doRelay : function(e, h, hname){
                if(hname == 'down' || this.scope.isExpanded()){
                    // this MUST be called before ComboBox#fireKey()
                    var relay = Ext.KeyNav.prototype.doRelay.apply(this, arguments);
                    if(!Ext.isIE && Ext.EventManager.useKeydown){
                        // call Combo#fireKey() for browsers which use keydown event (except IE)
                        this.scope.fireKey(e);
                    }
                    return relay;
                }
                return true;
            },

            forceKeyDown : true,
            defaultEventAction: 'stopEvent'
        });
        this.queryDelay = Math.max(this.queryDelay || 10,
                this.mode == 'local' ? 10 : 250);
        this.dqTask = new Ext.util.DelayedTask(this.initQuery, this);
        if(this.typeAhead){
            this.taTask = new Ext.util.DelayedTask(this.onTypeAhead, this);
        }
        if(!this.enableKeyEvents){
            this.mon(this.el, 'keyup', this.onKeyUp, this);
        }
    },


    // private
    onDestroy : function(){
        if (this.dqTask){
            this.dqTask.cancel();
            this.dqTask = null;
        }
        this.bindStore(null);
        Ext.destroy(
            this.resizer,
            this.view,
            this.pageTb,
            this.list
        );
        Ext.destroyMembers(this, 'hiddenField');
        QH.ux.form.BaseComboxField.superclass.onDestroy.call(this);
    },

    // private
    fireKey : function(e){
        if (!this.isExpanded()) {
            QH.ux.form.BaseComboxField.superclass.fireKey.call(this, e);
        }
    },

    // private
    onResize : function(w, h){
        QH.ux.form.BaseComboxField.superclass.onResize.apply(this, arguments);
        if(!isNaN(w) && this.isVisible() && this.list){
            this.doResize(w);
        }else{
            this.bufferSize = w;
        }
    },

    doResize: function(w){
        if(!Ext.isDefined(this.listWidth)){
            var lw = Math.max(w, this.minListWidth);
            this.list.setWidth(lw);
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
        }
    },

    // private
    onEnable : function(){
        QH.ux.form.BaseComboxField.superclass.onEnable.apply(this, arguments);
        if(this.hiddenField){
            this.hiddenField.disabled = false;
        }
    },

    // private
    onDisable : function(){
        QH.ux.form.BaseComboxField.superclass.onDisable.apply(this, arguments);
        if(this.hiddenField){
            this.hiddenField.disabled = true;
        }
    },

    // private
    onBeforeLoad : function(){
        if(!this.hasFocus){
            return;
        }
        this.innerList.update(this.loadingText ?
               '<div class="loading-indicator">'+this.loadingText+'</div>' : '');
        this.restrictHeight();
        this.selectedIndex = -1;
    },

    // private
    onLoad : function(){
        if(!this.hasFocus){
            return;
        }
        if(this.store.getCount() > 0 || this.listEmptyText){
            this.expand();
            this.restrictHeight();
            if(this.lastQuery == this.allQuery){
                if(this.editable){
                    this.el.dom.select();
                }

                if(this.autoSelect !== false && !this.selectByValue(this.value, true)){
                    this.select(0, true);
                }
            }else{
                if(this.autoSelect !== false){
                    this.selectNext();
                }
                if(this.typeAhead && this.lastKey != Ext.EventObject.BACKSPACE && this.lastKey != Ext.EventObject.DELETE){
                    this.taTask.delay(this.typeAheadDelay);
                }
            }
        }else{
            this.collapse();
        }
        this.initDefaultFn();

    },

    // private
    onTypeAhead : function(){
        if(this.store.getCount() > 0){
            var r = this.store.getAt(0);
            var newValue = r.data[this.displayField];
            var len = newValue.length;
            var selStart = this.getRawValue().length;
            if(selStart != len){
                this.setRawValue(newValue);
                this.selectText(selStart, newValue.length);
            }
        }
    },

    // private
    assertValue  : function(){
        var val = this.getRawValue(),
            rec = this.findRecord(this.displayField, val);
        if(!rec && this.forceSelection){
            if(val.length > 0 && val != this.emptyText){
//            	alert(this.el.dom.value)
                this.el.dom.value = Ext.value(this.lastSelectionText, '');
//                alert(this.el.dom.value)
                this.applyEmptyText();
            }else{
                this.clearValue();
            }
        }else{
            if(rec){
                // onSelect may have already set the value and by doing so
                // set the display field properly.  Let's not wipe out the
                // valueField here by just sending the displayField.
                if (val == rec.get(this.displayField) && this.value == rec.get(this.valueField)){
                    return;
                }
                val = rec.get(this.valueField || this.displayField);
            }
            this.setValue(val);
        }
    },

    // private
    onSelect : function(record, index){
        if(this.fireEvent('beforeselect', this, record, index) !== false){
            this.setValue(record.data[this.valueField || this.displayField]);
            this.collapse();
            this.fireEvent('select', this, record, index);
        }
    },

    // inherit docs
    getName: function(){
        var hf = this.hiddenField;
        return hf && hf.name ? hf.name : this.hiddenName || QH.ux.form.BaseComboxField.superclass.getName.call(this);
    },

    /**
     * Returns the currently selected field value or empty string if no value is set.
     * @return {String} value The selected value
     */
    getValue : function(){
        if(this.valueField){
            return Ext.isDefined(this.value) ? this.value : '';
        }else{
            return QH.ux.form.BaseComboxField.superclass.getValue.call(this);
        }
    },

    /**
     * Clears any text/value currently set in the field
     */
    clearValue : function(){
        if(this.hiddenField){
            this.hiddenField.value = '';
        }
        this.setRawValue('');
        this.lastSelectionText = '';
        this.applyEmptyText();
        this.value = '';
    },

    /**
     * Sets the specified value into the field.  If the value finds a match, the corresponding record text
     * will be displayed in the field.  If the value does not match the data value of an existing item,
     * and the valueNotFoundText config option is defined, it will be displayed as the default field text.
     * Otherwise the field will be blank (although the value will still be set).
     * @param {String} value The value to match
     * @return {Ext.form.Field} this
     */
    setValue : function(v){
        var text = v;
        if(this.valueField){
            var r = this.findRecord(this.valueField, v);
            if(r){
                text = r.data[this.displayField];
            }else if(Ext.isDefined(this.valueNotFoundText)){
                text = this.valueNotFoundText;
            }
            if(typeof r=='undefined'){
            	text =this.getRawValue();
            }
        }
        this.lastSelectionText = text;
        if(this.hiddenField){
            this.hiddenField.value = Ext.value(v, '');
        }
        QH.ux.form.BaseComboxField.superclass.setValue.call(this, text);
        this.value = v;
        return this;
    },

    // private
    findRecord : function(prop, value){
        var record;
        if(this.store.getCount() > 0){
            this.store.each(function(r){
                if(r.data[prop] == value){
                    record = r;
                    return false;
                }
            });
        }
        return record;
    },

    // private
    onViewMove : function(e, t){
        this.inKeyMode = false;
    },

    // private
    onViewOver : function(e, t){
        if(this.inKeyMode){ // prevent key nav and mouse over conflicts
            return;
        }
        var item = this.view.findItemFromChild(t);
        if(item){
            var index = this.view.indexOf(item);
            this.select(index, false);
        }
    },

    // private
    onViewClick : function(doFocus){
        var index = this.view.getSelectedIndexes()[0],
            s = this.store,
            r = s.getAt(index);
        if(r){
            this.onSelect(r, index);
        }else {
            this.collapse();
        }
        if(doFocus !== false){
            this.el.focus();
        }
    },


    // private
    restrictHeight : function(){
        this.innerList.dom.style.height = '';
        var inner = this.innerList.dom,
            pad = this.list.getFrameWidth('tb') + (this.resizable ? this.handleHeight : 0) + this.assetHeight,
            h = Math.max(inner.clientHeight, inner.offsetHeight, inner.scrollHeight),
            ha = this.getPosition()[1]-Ext.getBody().getScroll().top,
            hb = Ext.lib.Dom.getViewHeight()-ha-this.getSize().height,
            space = Math.max(ha, hb, this.minHeight || 0)-this.list.shadowOffset-pad-5;

        h = Math.min(h, space, this.maxHeight);
		if(this.isInitDefault)
			h = h+20;
        this.innerList.setHeight(h);
        this.list.beginUpdate();
        this.list.setHeight(h+pad);
        this.list.alignTo.apply(this.list, [this.el].concat(this.listAlign));
        this.list.endUpdate();
    },

    /**
     * Returns true if the dropdown list is expanded, else false.
     */
    isExpanded : function(){
        return this.list && this.list.isVisible();
    },

    /**
     * Select an item in the dropdown list by its data value. This function does NOT cause the select event to fire.
     * The store must be loaded and the list expanded for this function to work, otherwise use setValue.
     * @param {String} value The data value of the item to select
     * @param {Boolean} scrollIntoView False to prevent the dropdown list from autoscrolling to display the
     * selected item if it is not currently in view (defaults to true)
     * @return {Boolean} True if the value matched an item in the list, else false
     */
    selectByValue : function(v, scrollIntoView){
        if(!Ext.isEmpty(v, true)){
            var r = this.findRecord(this.valueField || this.displayField, v);
            if(r){
                this.select(this.store.indexOf(r), scrollIntoView);
                return true;
            }
        }
        return false;
    },

    /**
     * Select an item in the dropdown list by its numeric index in the list. This function does NOT cause the select event to fire.
     * The store must be loaded and the list expanded for this function to work, otherwise use setValue.
     * @param {Number} index The zero-based index of the list item to select
     * @param {Boolean} scrollIntoView False to prevent the dropdown list from autoscrolling to display the
     * selected item if it is not currently in view (defaults to true)
     */
    select : function(index, scrollIntoView){
        this.selectedIndex = index;
        this.view.select(index);
        if(scrollIntoView !== false){
            var el = this.view.getNode(index);
            if(el){
                this.innerList.scrollChildIntoView(el, false);
            }
        }

    },

    // private
    selectNext : function(){
        var ct = this.store.getCount();
        if(ct > 0){
            if(this.selectedIndex == -1){
                this.select(0);
            }else if(this.selectedIndex < ct-1){
                this.select(this.selectedIndex+1);
            }
        }
    },

    // private
    selectPrev : function(){
        var ct = this.store.getCount();
        if(ct > 0){
            if(this.selectedIndex == -1){
                this.select(0);
            }else if(this.selectedIndex !== 0){
                this.select(this.selectedIndex-1);
            }
        }
    },

    // private
    onKeyUp : function(e){
        var k = e.getKey();
        if(this.editable !== false && this.readOnly !== true && (k == e.BACKSPACE || !e.isSpecialKey())){

            this.lastKey = k;
            this.dqTask.delay(this.queryDelay);
        }
        QH.ux.form.BaseComboxField.superclass.onKeyUp.call(this, e);
    },

    // private
    validateBlur : function(){
        return !this.list || !this.list.isVisible();
    },

    // private
    initQuery : function(){
        this.doQuery(this.getRawValue());
    },

    // private
    beforeBlur : function(){
        this.assertValue();
    },

    // private
    postBlur  : function(){
        QH.ux.form.BaseComboxField.superclass.postBlur.call(this);
        this.collapse();
        this.inKeyMode = false;
    },

    /**
     * Execute a query to filter the dropdown list.  Fires the {@link #beforequery} event prior to performing the
     * query allowing the query action to be canceled if needed.
     * @param {String} query The SQL query to execute
     * @param {Boolean} forceAll <tt>true</tt> to force the query to execute even if there are currently fewer
     * characters in the field than the minimum specified by the <tt>{@link #minChars}</tt> config option.  It
     * also clears any filter previously saved in the current store (defaults to <tt>false</tt>)
     */
    doQuery : function(q, forceAll){
        q = Ext.isEmpty(q) ? '' : q;
        var qe = {
            query: q,
            forceAll: forceAll,
            combo: this,
            cancel:false
        };
        if(this.fireEvent('beforequery', qe)===false || qe.cancel){
            return false;
        }
        q = qe.query;
        forceAll = qe.forceAll;
        if(forceAll === true || (q.length >= this.minChars)){
            if(this.lastQuery !== q){
                this.lastQuery = q;
                if(this.mode == 'local'){
                    this.selectedIndex = -1;
                    if(forceAll){
                        this.store.clearFilter();
                    }else{
                        this.store.filter(this.displayField, q);
                    }
                    this.onLoad();
                }else{
                    this.store.baseParams[this.queryParam] = q;
                    this.store.load({
                        params: this.getParams(q)
                    });
                    this.expand();
                }
            }else{
                this.selectedIndex = -1;
                this.onLoad();
            }
        }
    },

    // private
    getParams : function(q){
        var p = {};
        //p[this.queryParam] = q;
        if(this.pageSize){
            p[QH_PAGE_START_NAME] = 0;
            p[QH_PAGE_LIMIT_NAME] = this.pageSize;
        }
        return p;
    },

    /**
     * Hides the dropdown list if it is currently expanded. Fires the {@link #collapse} event on completion.
     */
    collapse : function(){
        if(!this.isExpanded()){
            return;
        }
        this.list.hide();
        Ext.getDoc().un('mousewheel', this.collapseIf, this);
        Ext.getDoc().un('mousedown', this.collapseIf, this);
        this.fireEvent('collapse', this);
    },

    // private
    collapseIf : function(e){
        if(!this.isDestroyed && !e.within(this.wrap) && !e.within(this.list)){
            this.collapse();
        }
    },

    /**
     * Expands the dropdown list if it is currently hidden. Fires the {@link #expand} event on completion.
     */
    expand : function(){
        if(this.isExpanded() || !this.hasFocus){
            return;
        }

        if(this.title || this.pageSize){
            this.assetHeight = 0;
            if(this.title){
                this.assetHeight += this.header.getHeight();
            }
            if(this.pageSize){
                this.assetHeight += this.footer.getHeight();
            }
        }

        if(this.bufferSize){
            this.doResize(this.bufferSize);
            delete this.bufferSize;
        }
        this.list.alignTo.apply(this.list, [this.el].concat(this.listAlign));

        // zindex can change, re-check it and set it if necessary
        var listParent = Ext.getDom(this.getListParent() || Ext.getBody()),
            zindex = parseInt(Ext.fly(listParent).getStyle('z-index') ,10);
        if (!zindex){
            zindex = this.getParentZIndex();
        }
        if (zindex) {
            this.list.setZIndex(zindex + 5);
        }
        this.list.show();
        if(Ext.isGecko2){
            this.innerList.setOverflow('auto'); // necessary for FF 2.0/Mac
        }
        this.mon(Ext.getDoc(), {
            scope: this,
            mousewheel: this.collapseIf,
            mousedown: this.collapseIf
        });
        this.fireEvent('expand', this);
    },

    onTrigger1Click : function(){
        if(this.readOnly || this.disabled){
            return;
        }
        if(this.isExpanded()){
            this.collapse();
            this.el.focus();
        }else {
            this.onFocus({});
            if(this.triggerAction == 'all') {
                this.doQuery(this.allQuery	, true);
            } else {
                this.doQuery(this.getRawValue());
            }
            this.el.focus();
        }
    },
    onTrigger2Click : function(btn){
    	if(!this.win){
    		this.win = new QH.Window({
    			closeAction:'hide',
    			resizable:true,
    			title:"测试",
    			layout:'fit',
    			width:500,
    			height:200,
    			items:[new QH.commonType.GridPanel({
    				tbarCfg:{
    					enableText:false
    				},
					headCfg:{type:'货币名称',content:'货币内容',remark:'货币备注'},
					flag:"hblx",
					closable:true
				})]
    		});
    	}
    	this.win.show(this.getEl());
    }

    /**
     * @hide
     * @method autoSize
     */
    /**
     * @cfg {Boolean} grow @hide
     */
    /**
     * @cfg {Number} growMin @hide
     */
    /**
     * @cfg {Number} growMax @hide
     */
    /**start**/
    /**
     * 初始化store
     * @return {Ext.data.Store}
     */
     //private
	,initStore:function(){
		var store = null;
		this.allFields = [
			{name : this.valueField},
			{name : this.displayField}
		]
		var fiels = [this.valueField,this.displayField];
		if(this.otherFields){
			this.allFields = this.allFields.concat(this.otherFields);
		}
		if(Ext.isObject(this.otherFields)){
			this.allFields = this.allFields.push(this.otherFields);
    		fiels.push(this.otherFields.name);
    	}else if(Ext.isArray(this.otherFields)){
    		this.allFields = this.allFields.concat(this.otherFields);
    		Ext.each(this.otherFields,function(field){
    			fiels.push(field.name);
    		});
    	}
		if(this.dataMap){
			var list = new Array();
			this.isInitDefault = true;
			list.push(["",this.emptyText||"请选择"]);
			for(var key in this.dataMap){
				list.push([key,this.dataMap[key]]);
			}
			store = new Ext.ux.data.PagingArrayStore({
				fields:this.allFields,
				data:list
			})
			store.load({params:{QH_PAGE_START_NAME:0,QH_PAGE_LIMIT_NAME:this.pageSize?this.pageSize:list.length}})
		}else{
			store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					method : this.sendMethod,
					url : this.dataUrl
				}),
				baseParams:{
					'fields':fiels.join(","),
					'domain':this.objName
				},
				reader : new Ext.data.JsonReader({
					root : "data",
					totalProperty : "totalCount",
					idProperty : "id"
				}, this.allFields),
				autoLoad : this.autoLoad,
				remoteSort : false
			});
			
			if(this.queryParams != null){
				//传递一个displayField到后台，告诉程序需要对该字段进行模糊查询
				this.queryParams.displayField = this.displayField;
				Ext.apply(store.baseParams,this.queryParams);
			}
		}
		//如果有设置父下拉框
		if(this.parentCombo){
			var cbx = this;
			var parentCom = null;
			//如果是String，或获取改ID对应的主键
			if(Ext.isString(this.parentCombo)){
				parentCom = Ext.getCmp(this.parentCombo);
			}else if(Ext.isObject(this.parentCombo)){
				//如果是combo对象，直接提取改对象
				parentCom = this.parentCombo;
			}
			//对父下拉框定义select时间
			parentCom.on("select",function(com,record,index){
				//给下拉框添加额外的参数
				//如果额外参数中有属性与parentComboWith一致，当成是in查询
				if(!cbx.parentComboWith) cbx.parentComboWith=cbx.parentCombo;
				if(cbx.queryParams && cbx.queryParams[cbx.parentComboWith]){
					store.setBaseParam(cbx.parentComboWith,[record.data.id,cbx.queryParams[cbx.parentComboWith]]);
				}else{
//					cbx.queryParams[cbx.parentComboWith] = record.data.id;
//					Ext.apply(store.baseParams,cbx.queryParams);
					store.setBaseParam(cbx.parentComboWith,record.data.id);
				}
				//store.setBaseParam("parentValue",record.data.id);
				cbx.reset();
				cbx.setValue("");
				cbx.setRawValue("");
				if(store.lastOptions)
					store.reload();
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
	 	if(this.needReset){
	    	this.assertValue();
	 	} else{
	    	var val = this.getRawValue();
	    	this.setValue(val);
	    }
	},
	// 下拉框绑定操作
	bindValue : function(value) {
		value = value || this.getValue();
		var _self = this;
		if (value != null) {
			if (!_self.needReset) {
				_self.setRawValue(value);
				_self.setValue(value);		
			} else {
				baseSerivce.getFieldValue(_self.objName,value,_self.displayField ,function(result){
					if(result){
						_self.setRawValue(result[_self.displayField]);
						_self.setValue(result.id);
					}
				});
			}
		}
	},
	bindValueByCondition:function(conditionObj){
		var _self = this;
		var fetchField = "{'"+this.displayField+"':'"+this.displayField+"','"+this.valueField+"':'"+this.valueField+"'}";
		var conditionJson = Ext.encode(conditionObj);
		baseSerivce.getFieldValueByCondition(_self.objName,fetchField,conditionJson,function(res){
			if(res){
				_self.setRawValue(res[_self.displayField]);
				_self.setValue(res[_self.valueField]);
			}
		})
	},
	// 分页下拉框绑定
	bindPageValue : function(tbname, queryCol, value) {
		var _self = this;
		baseSerivce.getFieldValueByCondition(tbname, value,queryCol ,function(result){
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
	/**end**/
});
Ext.reg('basecombo', QH.ux.form.BaseComboxField);
