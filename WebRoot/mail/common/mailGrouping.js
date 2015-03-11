
/**
 * 邮件GirdPanel
 * @class QH.mail.GridPanel
 * @extends QH.grid.GridPanel
 */
QH.mail.GridPanel = Ext.extend(QH.grid.GridPanel,{
	stripeRows:false,
	//autoExpandColumn:'subject',
	//autoExpandMin:200,
	loadMask:{msg:'邮件加载中。。。'},
    enableDrag:true,	// 默认为false
    ddText:'选择了 {0} 封邮件', // enableDrag为true时，显示文本
    border:false,
    forceFit:false,
	initComponent:function(){
		var _grid = this;
		this.store = new QH.mail.Store({
			groupField: 'sendTime',
			sortInfo: {
			    field: 'sendTime',
			    direction: 'DESC'
			}
		});
		this.store.on('load',function(){
			// 邮件选择改变后，控制所有面板
			if(Ext.isFunction(QH_VIEWPORT.getMainView))
				QH_VIEWPORT.getMainView().recordAllControl();
		},this);
		this.view = new Ext.grid.GroupingView({
			groupMode:'display', // 指定分组ID为分组显示值相关
	        groupTextTpl: '{text} ({[values.rs.length]} {["封"]})',
	        /**
	         * 重写该方法
	         */
	        onColumnSplitterMoved : function(i, w){
		        var cm = this.grid.colModel;
		        cm.setColumnWidth(i, w, true);
		
		        if(this.forceFit){
		            this.fitColumns(true, false, i);
		            this.updateAllColumnWidths();
		        }else{
		            this.updateColumnWidth(i, w);
		            this.autoExpand();	// 列拖动时，使主题自动调整宽度
		            this.syncHeaderScroll();
		        }
		
		        this.grid.fireEvent('columnresize', i, w);
		    },
	        getRowClass:function(record,index,rowParams,store){
//				var mailFlag = flagMap[record.get('mailFlagId')];
//				if(mailFlag){
//					var cls = mailFlag.cls.substring(10);
//					cls = cls == 'yellow' ? '#FFCB2D' : cls;
//					rowParams.tstyle+='color:'+cls+';';
//				}else{
//					rowParams.tstyle+='color:black;';
//				}
			}
		});
		this.sm = new QH.mail.CheckboxSelectionModel({
			grid:this,
			dataIndex:'check',
			listeners:{
				'selectionchange':{
		    		fn:function(selModel){
		    			if(this.isKeyDownOrUp){// 由按向下或向上键，改变选择
		    				this.isKeyDownOrUp = false;
		    				// 邮件选择改变后，控制所有面板
		    				if(Ext.isFunction(QH_VIEWPORT.getMainView))
								QH_VIEWPORT.getMainView().recordAllControl();
		    			}
		    		},
		    		buffer:1,
		    		scope:this
		    	}
			}
		});
		
		var columns = [this.sm];
		
		columns.push({header:'<span class="mail_grouping_new" title="邮件状态">&nbsp;</span>',resizable:false, width: 27, dataIndex: 'isRead',renderer:QH.mail.statusRenderer,groupRenderer:QH.mail.statusGroupingRenderer});
		columns.push({header: '<span class="mail_grouping_priority_hige" title="重要邮件">&nbsp;</span>',menuDisabled:true,renderer:QH.mail.priorityRenderer,groupRenderer:QH.mail.priorityGroupingRenderer, width: 13, dataIndex: 'priority'});
		
		columns.push({header: '<span class="mail_grouping_attach">&nbsp;</span>',menuDisabled:true,renderer:QH.mail.attachRenderer,groupRenderer:QH.mail.attachGroupingRenderer, width: 17, dataIndex: 'isContainAttach'});
		
		columns.push({header: "所属树节点",width:60,hidden:true,dataIndex: 'nodeId',renderer:QH.mail.nodePathAllRenderer});
		columns.push({header: "客户",width:90,hidden:false,dataIndex: 'custId.customerShortName'});
		
//		columns.push({id:'mailFlag',header: '<span class="mail_flag_red">&nbsp;</span>', width: 30,sortable: false,dataIndex: 'mailFlagId',renderer :Ext.mail.flagRenderer});
		
		columns.push({id:'sender',header: '发件人',width: 100,dataIndex: 'sender',renderer:QH.mail.personNameRenderer,groupRenderer:QH.mail.personGroupingRenderer});
		columns.push({id:'to',header: '收件人',hidden:true, width: 100,dataIndex: 'to',renderer:QH.mail.personNameRenderer,groupRenderer:QH.mail.personGroupingRenderer});
		columns.push({id:'subject',header: "主题",width:100,hideable:false,renderer:QH.mail.subjectRenderer,groupRenderer:QH.mail.subjectGroupingRenderer, dataIndex: 'subject'});
		columns.push({id:'time',header: "时间",width: 100,minWidth:76, renderer: QH.mail.dateBySizeRenderer ,groupRenderer:QH.mail.dateGroupingRenderer, dataIndex: 'sendTime',align:"right"});
		//columns.push({header: "大小", width: 70,resizable:false, align:'right', renderer: QH.mail.sizeRenderer,groupRenderer:QH.mail.sizeGroupingRenderer, dataIndex: 'size'});
		columns.push({header: "跟踪业务员", width: 90,resizable:true, align:'left', renderer: QH.mail.trackerRenderer, dataIndex: 'custId.id'});
		columns.push({header: "单号", width: 60,resizable:true, align:'left',dataIndex: 'orderNo'});
		columns.push({header: "状态", width: 60,resizable:true, align:'left', dataIndex: 'trackStatus.content'});
		columns.push({header: "海运备注", width: 100,resizable:true, align:'left', dataIndex: 'orderRemark'});
		columns.push({header: "空运备注", width: 100,resizable:true, align:'left', dataIndex: 'orderAirRemark'});
		columns.push({header: "起运港", width: 100,resizable:true, align:'left', dataIndex: 'orderPol'});
		columns.push({header: "目的港", width: 100,resizable:true, align:'left', dataIndex: 'orderPod'});
		this.colModel = new Ext.grid.ColumnModel({
    		columns:columns,
	    	defaults:{
	    		sortDir:'DESC',
	            sortable: true,
	            menuDisabled: false
        	}
	    });
	    var tbarItems = [{
            iconCls: 'icon-expand-all',
			tooltip: '扩展所有邮件组',
            handler: function(){ this.getView().expandAllGroups(); },
            scope: this
        }, '-', {
	        iconCls: 'icon-collapse-all',
	        tooltip: '关闭所有邮件组',
	        handler: function(){ this.getView().collapseAllGroups(); },
	        scope: this
        },'-', {
//	        iconCls: 'icon-collapse-all',
	        text: '复制主题',
	        listeners:{
	        	'afterrender':function(b){
	        		_grid.copyToClipboard(b.getId());
	        	}
	        }
        },'->',{
        }];
	    
        tbarItems.push({
	        	xtype:'customerbasecombo',
				emptyText:'客户',
				ref:'../customer',
				width:100,
				isSearchField:true,
				searchName:'mail.custId.id',
				hiddenName:"mail.custId.id",
				endDateField:_grid,
				allowBlank:true
	    },' ');
        tbarItems.push({
	        	xtype:'daterangefield',
				emptyText:'起始时间',
				ref:'../startDateField',
				width:90,
				isSearchField:true,
				searchName:'startTime',
				endDateField:_grid,
				allowBlank:true
	        },' ');
	        tbarItems.push({
	        	xtype:'daterangefield',
				emptyText:'结束时间',
				width:90,
				isSearchField:true,
				searchName:'endTime',
				ref:'../endDateField',
				startDateField:_grid,
				allowBlank:true
	        },' ');
	        tbarItems.push({
	        	xtype:'textfield',
	        	emptyText:'发件人/邮箱',
	        	width:80,
	        	isSearchField:true,
	        	searchName:'mail.sendName'
	        },' ');
	        tbarItems.push({
	        	xtype:'textfield',
	        	emptyText:'收件人/邮箱',
	        	width:80,
	        	isSearchField:true,
	        	searchName:'mail.toName'
	        },' ');
	        tbarItems.push({
	        	xtype:'searchcombo',
	        	width:115,
	        	store:_grid.store,
//	        	autoComplet:true,
	        	isSearchField:true,
	        	searchName:'mail.subject',
	        	emptyText:'主题'
	        },' ');
	    
	    this.tbar = {
	    	xtype:'searchcombotoolbar',
	    	items:tbarItems
	    };
		
		QH.mail.GridPanel.superclass.initComponent.call(this);
		// 设置右键菜单
		this.plugins = [new QH.mail.GroupingRightMenu()];
		
		this.on({
			'rowdblclick':{
				fn:function(grid,rowIndex,e){
					// 邮件选择改变后，控制所有面板
					if(Ext.isFunction(QH_VIEWPORT.getMainView))
						QH_VIEWPORT.getMainView().recordAllControl();
					var record = grid.getStore().getAt(rowIndex);
					if(!record.get('isRead')){
						record.set('isRead',true);
						record.commit();
					}
					//var records
					// 打开邮件
					QH.mail.openMailFn(record.data,grid);
				},
				scope:this
			},
			'rowclick':{
				fn:function(grid,rowIndex,e){
					// 邮件选择改变后，控制所有面板
					if(Ext.isFunction(QH_VIEWPORT.getMainView))
						QH_VIEWPORT.getMainView().recordAllControl();
				},
				scope:this
			},
			'keydown':{
				fn:function(e){
					if(e.getKey() == Ext.EventObject.UP || e.getKey() == Ext.EventObject.DOWN){
						this.isKeyDownOrUp = true;	// 是按下DOWN或UP键
					}
				},
				scope:this
			},
			'bodyresize':{
				fn:this.bodyResize,
				scope:this
			},
			'columnresize':{
				fn:this.columnResize,
				scope:this
			}
		});
	},
	copyToClipboard:function(strID) {
		var grid=this;
		if(!this.clip){
			this.clip = new ZeroClipboard.Client();
		}
		this.clip.setHandCursor( true );
		this.clip.addEventListener('mousedown', function (client) {
			var record = grid.getSelectionModel().getSelected();
			if(record){
				var strMsg=record.data.subject;
		    	grid.clip.setText(strMsg);
			}else{
				alertMsg('请先选择一条邮件,才能复制主题!');
			}
	  	});
		this.clip.addEventListener('complete', function (client, text) {
			mask('复制成功!按CTRL+V粘帖!');
			// 设置延时任务,2秒后关闭提示框
			var task = new Ext.util.DelayedTask(unmask);
			task.delay(600);
		});
		this.clip.glue(strID);
	},
	
	/**
	 * 拖动列大小事件
	 * @param {} columnIndex
	 * @param {} newSize
	 */
	columnResize:function(columnIndex,newSize){
		var column = this.getColumnModel().getColumnAt(columnIndex);
		if(column.dataIndex == 'addTime' ||　column.dataIndex == 'sendTime'){	// 当改变时间列宽度时，改变时间显示方式
			this.getView().refresh();
		}
	},
	/**
	 * 窗体改变大小
	 * @param {} grid
	 * @param {} adjWidth
	 * @param {} adjHeight
	 * @param {} rawWidth
	 * @param {} rawHeight
	 */
	bodyResize : function(grid,adjWidth,adjHeight,rawWidth,rawHeight){
		var colModel = grid.getColumnModel();
		var columns = colModel.columns,column;
		var subjectColumn = colModel.getColumnById('subject');
		if(adjWidth < 100 && !this.resizeColumn){	// 如果小于450宽度时，并且不存在resizeColumn
			this.resizeColumn = {};	// 记录原先列的显示隐藏
			for(var i=0;i<columns.length;i++){
				column = columns[i];
				this.resizeColumn[i] = column.hidden;
				colModel.setHidden(i,column.dataIndex != 'subject' && column.dataIndex != 'check');
			}
			subjectColumn.renderer = QH.mail.subjectDetailRenderer;
			this.getView().refresh();
		}else if(adjWidth >= 100 && this.resizeColumn){	// 如果大小450宽度时，并且存在resizeColumn
			for(var i=0;i<columns.length;i++){
				colModel.setHidden(i,this.resizeColumn[i]);
			}
			subjectColumn.renderer = QH.mail.subjectRenderer;
			delete this.resizeColumn;
			this.getView().refresh();
		}
	},
	/**
	 * 设置为发件或收件类型
	 * @param {} isSendType
	 */
	setGridType:function(nodeType){
		var colModel = this.getColumnModel();
		var senderIndex = colModel.getIndexById('sender');
		var toIndex = colModel.getIndexById('to');
		var timeIndex = colModel.getIndexById('time');
		// 切换收件人与发件人列的显示
		if(nodeType == MAIL_NODE_TYPE.S){
			colModel.setColumnHeader(senderIndex,'收件人');
			colModel.setDataIndex(senderIndex,'to');
			colModel.setColumnHeader(toIndex,'发件人');
			colModel.setDataIndex(toIndex,'sender');
		}else{
			colModel.setColumnHeader(senderIndex,'发件人');
			colModel.setDataIndex(senderIndex,'sender');
			colModel.setColumnHeader(toIndex,'收件人');
			colModel.setDataIndex(toIndex,'to');
		}
		if(nodeType == MAIL_NODE_TYPE.C || nodeType == MAIL_NODE_TYPE.P){
			colModel.setDataIndex(timeIndex,'addTime');
			this.store.setDefaultSort('addTime',this.store.sortInfo.direction);
		}else{
			colModel.setDataIndex(timeIndex,'sendTime');
			this.store.setDefaultSort('sendTime',this.store.sortInfo.direction);
		}
//		senderColumn.header = nodeType == MAIL_NODE_TYPE.S ? '收件人' : '发件人';
	}
});
Ext.reg('mailgrid',QH.mail.GridPanel);

QH.mail.CheckboxSelectionModel = Ext.extend(Ext.grid.CheckboxSelectionModel,{
	handleMouseDown:Ext.emptyFn,	// 由于多选框与拖动有冲突，所以设置handleMouseDown为空，些函数会在可拖动数据时，调用到，与onMouseDown有冲突
	onMouseDown : function(e, t){
		if(e.button === 0){
			e.stopEvent();
            var row = e.getTarget('.x-grid3-row');
			if(row){
                var index = row.rowIndex;
				if(t.className == 'x-grid3-row-checker'){	// 点击到复选框
	                if(this.isSelected(index)){
	                    this.deselectRow(index);
	                }else{
	                    this.selectRow(index, true);
	                }
				}else{// 点击到行
					if(!this.isSelected(index) || e.ctrlKey || e.shiftKey)	// 点击到没选中行
						Ext.grid.CheckboxSelectionModel.superclass.handleMouseDown.apply(this,[this.grid,index,e]);
				}
	        }
		}
    },
    onHdMouseDown : function(e, t){
        if(t.className == 'x-grid3-hd-checker'){
            e.stopEvent();
            var hd = Ext.fly(t.parentNode);
            var isChecked = hd.hasClass('x-grid3-hd-checker-on');
            if(isChecked){
                hd.removeClass('x-grid3-hd-checker-on');
                this.clearSelections();
            }else{
                hd.addClass('x-grid3-hd-checker-on');
                this.selectAll();
            }
	        // 邮件选择改变后，控制所有面板
            if(Ext.isFunction(QH_VIEWPORT.getMainView))
				QH_VIEWPORT.getMainView().recordAllControl();
        }
    }
});

