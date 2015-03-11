
/**
 * 根据时间判断时间段
 * @param {} date 日期
 * @return {String} 日期分类信息
 */
QH.mail.dateGroupingRenderer = function(date){
	if(!date) return '无时间';
	if(date instanceof Date){
	}else
		date = new Date(date.year+1900,date.month,date.date,date.hours,date.minutes,date.seconds);
	var nowDate = new Date();	
	if(date.getTime()>nowDate.getTime())
		return '超时';
	if(date.getYear()==nowDate.getYear()){
		if(date.format('Y-m-d')==nowDate.format('Y-m-d'))
			return '今天';
		else if(nowDate.getDayOfYear()-date.getDayOfYear()==1){
			return '昨天';
		}else if(nowDate.getWeekOfYear()-date.getWeekOfYear()==0){
			return '这周';
		}else if(nowDate.getWeekOfYear()-date.getWeekOfYear()==1){
			return '上周';
		}else if(nowDate.getMonth()-date.getMonth()==0){
			return '这月';
		}else if(nowDate.getMonth()-date.getMonth()==1){
			return '上月';
		}
	}
	return '更早';
};
/**
 * 显示年月日 时分 星期
 * @param {} date
 * @return {String}
 */
QH.mail.dateAllRenderer = function(date,showYear){
	if(!date) return '';
	if(showYear === false)
		return date.format('m-d (周D) H:i');
	else
		return date.format('Y-m-d (周D) H:i');
}
QH.mail.dateYMDHIRenderer = function(date,showYear){
	if(!date) return '';
	if(showYear === false)
		return date.format('m-d H:i');
	else
		return date.format('Y-m-d H:i');
}
QH.mail.dateYMDRenderer = function(date,showYear){
	if(!date) return '';
	return date.format('Y-m-d');
}
/**
 * 根据宽度显示可显示的时间
 * @param {} date
 * @param {} metaDate
 */
QH.mail.dateBySizeRenderer = function(date){
	if(!date) return '';
	var width = this.width;
	var showYear = date.getYear() != new Date().getYear();
	if(showYear && width >= 143)
		return QH.mail.dateAllRenderer(date);
	else if(!showYear && width >= 111)
		return QH.mail.dateAllRenderer(date,false);
	else if(showYear && width >= 108)
		return QH.mail.dateYMDHIRenderer(date);
	else if(!showYear)
		return QH.mail.dateYMDHIRenderer(date,false);
	else
		return QH.mail.dateYMDRenderer(date)
}
/**
 * 根据时间显示相应的时间格式
 * 如果是当年内，则只显示月日
 * @param {} date
 */
QH.mail.dateRenderer = function(date){
	if(!date) return '';
	if(date instanceof Date){
	}else
		date = new Date(date.year+1900,date.month,date.date,date.hours,date.minutes,date.seconds);
	var nowDate = new Date();
	var showDate = ''; // 显示整个时间提示
	var showDateNumber = ''; // 时间的数字
	var showDateStr = ''; // 时间后面的单位
	var differDate = nowDate.getTime()-date.getTime(); // 以毫秒计算
	if(differDate<0)
		return '';
	if(date.getYear()==nowDate.getYear()){
		if(date.format('Y-m-d')==nowDate.format('Y-m-d')){ // 当天
			if(date.between(nowDate.add(Date.HOUR,-1),nowDate)){// 一小时内
				if(date.between(nowDate.add(Date.MINUTE,-1),nowDate)){// 一分钟内
					showDateNumber = differDate/1000;
					showDateStr = '秒';
				}else{ // 一分钟外
					showDateNumber = differDate/(1000*60);
					showDateStr = '分钟';
				}
			}else{ // 一小时外
				showDateNumber = differDate/(1000*60*60);
				showDateStr = '小时';
			}
			showDate = showDateNumber.toFixed(0)+showDateStr+'前';
		}else if(nowDate.getDayOfYear()-date.getDayOfYear()==1){
			showDate = '昨天 '+date.format('H:i');
		}else{
			showDate = date.format('m-d');
		}
	}else{
		showDate = date.format('Y-m-d');
	};
	return showDate;
}
QH.mail.attachGroupingRenderer = function(isContainAttach){
	if(isContainAttach)
		return '带附件';
	else
		return '不带附件';
	
};
/**
 * 所属树节点
 * @param {} nodeId
 * @return {String}
 */
QH.mail.nodeNameRenderer = function(nodeData){
	return nodeData.nodeName;
};
/**
 * 所属树节点(所有路径)
 * @param {} nodeId
 * @return {String}
 */
QH.mail.nodePathAllRenderer = function(nodeData){
	if(QH_VIEWPORT && Ext.isFunction(QH_VIEWPORT.getMainView) && QH_VIEWPORT.getMainView().mailTree){
		var nodesMap = QH_VIEWPORT.getMainView().mailTree.nodesMap
		var node = QH_VIEWPORT.getMainView().mailTree.nodesMap[nodeData.id];
		if(node){
			return QH.mail.nodeAllPath(node,node.name || node.nodeName);
		}
	}
};

QH.mail.nodeAllPath = function(node,path){
	if(node.parentData){
		path = (node.parentData.name || node.parentData.nodeName) + ' -> ' + path;
		return QH.mail.nodeAllPath(node.parentData,path);
	}else{
		return path;
	}
}
QH.mail.sizeGroupingRenderer = function(size){
	if(!size) return '无大小';
	if(size<1024)
		return 'B';
	else if(size<1024*1024)
		return 'KB';
	else if(size<1024*1024*1024)
		return 'MB';
	else
		return 'GB';
};
QH.mail.statusGroupingRenderer = function(isRead){
	// 显示邮件状态
	if(isRead)
		return '已读邮件';
	else
		return '未读邮件';
}
QH.mail.flagRenderer = function(flagId){
	var mailFlag = flagMap[flagId];
	if(mailFlag){
		return '<span class="'+mailFlag.cls+'"></span>';
	}else{
		return '<span class="mail_flag_clear"></span>';
	}
}
QH.mail.flagNameRenderer = function(flagId){
	var mailFlag = flagMap[flagId];
	if(mailFlag){
		return mailFlag.name;
	}
}
/**
 * 显示发件人姓名，如果发件人为空，则显示发件人邮箱
 * @param {} senderName
 * @param {} metaData
 * @param {} record
 * @return {}
 */
QH.mail.senderNameRenderer = function(sender,metaData,record){
	var senderShow = '';
	if(sender)
		if(Ext.isEmpty(sender.name)&&Ext.isEmpty(sender.emailUrl)){
			senderShow = '<div style="color:#888888;text-align:center">(无联系人)</div>';
		}else if(Ext.isEmpty(sender.name))
			senderShow = sender.emailUrl;
		else
			senderShow = sender.name;
	else
		senderShow = '<div style="color:#888888;text-align:center">(无联系人)</div>';
	QH.mail.NewMailStyleRendererFn(record.get('isRead'),metaData);
	return senderShow;
}
/**
 * 只显示邮箱地址
 * @param {} sender
 * @param {} metaData
 * @param {} record
 * @return {}
 */
QH.mail.senderUrlRenderer = function(sender,metaData,record){
	var senderShow = '';
	if(sender)
		if(Ext.isEmpty(sender.name)&&Ext.isEmpty(sender.emailUrl))
			senderShow = '<div style="color:#888888;text-align:center">(无联系人)</div>';
		else
			senderShow = sender.emailUrl;
	else
		senderShow = '<div style="color:#888888;text-align:center">(无联系人)</div>';
	var status = record.get('mailStatus');
	if(status ==0||status ==1||status==3||status==6)
		senderShow = '<span style="font-weight: bold;">'+senderShow+'</span>';
		
	else if(status==MAIL_LOCAL_STATUS_ERROR
		|| status == MAIL_LOCAL_STATUS_SENDERROR || status == MAIL_LOCAL_STATUS_PARTINGSENDERROR
		|| status==MAIL_LOCAL_STATUS_CHECKNOTGO || status == MAIL_LOCAL_STATUS_PARTINGCHECKNOTGO)
		senderShow = '<span style="color:red;text-align:center">'+senderShow+'</span>';
	return senderShow;
}
/**
 * 显示发件人名和邮箱地址
 * @param {} sender
 * @param {} metaData
 * @param {} record
 * @return {}
 */
QH.mail.senderNameUrlRenderer = function(sender,metaData,record){
	var senderShow = '';
	if(sender)
		if(Ext.isEmpty(sender.name)&&Ext.isEmpty(sender.emailUrl))
			senderShow = '<div style="color:#888888;text-align:center">(无联系人)</div>';
		else if(Ext.isEmpty(sender.name))
			senderShow = sender.emailUrl;
		else
			senderShow = sender.name+'&lt;'+sender.emailUrl+'&gt;';
	else
		senderShow = '<div style="color:#888888;text-align:center">(无联系人)</div>';
	var status = record.get('mailStatus');
	if(status ==0||status ==1||status==3||status==6)
		senderShow = '<span style="font-weight: bold;">'+senderShow+'</span>';
	else if(status==MAIL_LOCAL_STATUS_ERROR
		|| status == MAIL_LOCAL_STATUS_SENDERROR || status == MAIL_LOCAL_STATUS_PARTINGSENDERROR
		|| status==MAIL_LOCAL_STATUS_CHECKNOTGO || status == MAIL_LOCAL_STATUS_PARTINGCHECKNOTGO)
		senderShow = '<span style="color:red;text-align:center">'+senderShow+'</span>';
	return senderShow;
}
QH.mail.subTimeRenderer = function(value,metadata,record){
	return (value || '<span style="color:#888888">(无主题)</span>')+'<br />'+QH.mail.dateRenderer(record.get('sendTime'));
}
QH.mail.nameTimeRenderer = function(value, metaData, record, rowIndex, colIndex, store){
	var nameTime = (value || '')+'<br />'+QH.mail.dateRenderer(record.get('sendTime'));
	var mailRecord = store.mailRecord;
	if(mailRecord&&record.get('mailId')==mailRecord.get('id'))
		nameTime = '<span style="color:blue;font-weight: bold;">'+nameTime+'</span>';
	return nameTime;	
}
/**
 * 显示联系人组
 * @param {} persons
 * @return {String}
 */
QH.mail.personGroupingRenderer = function(persons){
	if(Ext.isEmpty(persons))
		return '无联系人';
	if(Ext.isArray(persons)){
		var urls = [];
		Ext.each(persons,function(person){
			urls.push(person.emailUrl);
		});
		return urls.join(';');
	}else if(Ext.isObject(persons)){
		return persons.emailUrl;
	}else
		return '无联系人';
}
/**
 * 显示联系人
 * @param {} persons
 * @param {} metaData
 * @param {} record
 * @return {}
 */
QH.mail.personNameRenderer = function(persons,metaData,record){
	var show = [];
	if(Ext.isArray(persons)){
		Ext.each(persons,function(person){
			if(Ext.isEmpty(person.name))
				show.push(person.emailUrl);
			else 
				show.push(person.name);
		});
	}else if(Ext.isObject(persons)){
		if(!Ext.isEmpty(persons.name))
			show.push(persons.name);
		else if(!Ext.isEmpty(persons.emailUrl))
			show.push(persons.emailUrl);
	}
	if(show.length > 0)
		show = show.join(";&nbsp;");
	else
		show = '<div style="color:#888888;text-align:center">(无联系人)</div>';
	QH.mail.NewMailStyleRendererFn(record.get('isRead'),metaData);
	return show;
}
/**
 * 如果包含附件则显示附件图标
 * @param {boolean} isContainAttach true为包含附件
 */
QH.mail.attachRenderer = function(isContainAttach){
	if(isContainAttach)
		return '<span class="mail_grouping_attach"></span>';
}
/**
 * 重要邮件
 * @param {} mailTag
 */
QH.mail.priorityRenderer = function(priority){
	if(priority == MAIL_PRIORITY.HIGE)// 紧急邮件
		return '<span class="mail_grouping_priority_hige" title="重要邮件">&nbsp;</span>';
}
/**
 * 重要邮件
 * @param {} mailTag
 */
QH.mail.priorityGroupingRenderer = function(priority){
	if(priority == MAIL_PRIORITY.HIGE)// 紧急邮件
		return '重要邮件';
	else
		return '普通邮件';
}

/**
 * 邮件状态显示
 * @param {} isRead
 * @param {} metaData
 * @param {} record
 * @return {}
 */
QH.mail.statusRenderer = function(isRead,metaData,record){
	metaData.style = metaData.style || '';
	metaData.style += "padding-left:0";
	var show = '';
	// 邮件类型
	var mailType = record.get('mailType');
	// 显示邮件标识，状态
	var mailTag = record.get('mailTag');
	var isReply = mailTag && mailTag.indexOf(MAIL_TAG.REPLY) != -1;// 回复
	var isForward = mailTag && mailTag.indexOf(MAIL_TAG.FORWARD) != -1 // 转发
	var isError = mailTag && mailTag.indexOf(MAIL_TAG.ERROR) != -1 // 错误
	var isQuartz = mailTag && mailTag.indexOf(MAIL_TAG.QUARTZ) != -1 // 定时
	var baseUrl = MAIL_IMAGE_DIR + 'email';
	if(isRead)
		baseUrl += '_open';
	var readTitle = isRead ? '已读':'未读';
	
	if(isError){ // 错误
		show += '<img src="'+baseUrl+'_error.png" title="'+readTitle+'、错误邮件">';
	}else if(mailType == MAIL_TYPE.DRAFT){	// 为草稿
		show += '<img src="'+baseUrl+'_draft.png" title="'+readTitle+'、草稿邮件"/>';
	}else if(mailType == MAIL_TYPE.SENDING){	// 为正在发送
		show += '<img src="'+MAIL_IMAGE_DIR+'email_sending.png" title="'+readTitle+'、发件邮件"/>';
	}else if(mailType == MAIL_TYPE.SEND){	// 为已发送
		show += '<img src="'+baseUrl+'_go.png" title="'+readTitle+'、已发送邮件"/>';
	}else if(isReply && isForward){ // 回复并转发
		show += '<img src="'+baseUrl+'_reply_forward.png" title="'+readTitle+'、已回复、已转发邮件"/>';
	}else if(isReply){	// 转发
		show += '<img src="'+baseUrl+'_reply.png" title="'+readTitle+'、已回复邮件"/>';
	}else if(isForward){ // 回复
		show += '<img src="'+baseUrl+'_forward.png" title="'+readTitle+'、已转发邮件"/>';
	}else
		show += '<img src="'+baseUrl+'.png" title="'+readTitle+'邮件"/>';
	
	return show;
}

QH.mail.dealingsMailTypeRenderer = function(mailType){
	if(mailType == MAIL_TYPE.RECIVE)
		return '<span class="mail_dealings_recive">&nbsp;</span>';
	else if(mailType == MAIL_TYPE.SEND)
		return '<span class="mail_dealings_send">&nbsp;</span>';
}
QH.mail.subjectGroupingRenderer = function(subject){
	if(!subject) return '无主题';
	return subject.substring(0,1);
};
QH.mail.subjectRenderer = function(subject,metaData,record){
	var isEmpty = false;
	if(!subject){
		isEmpty = true;
		subject = '<div style="color:#888888;text-align:center">(无主题)</div>';
	}
	QH.mail.NewMailStyleRendererFn(record.get('isRead'),metaData);
	return subject;
}
QH.mail.subjectDetailRenderer = function(subject,metaData,record){
	var tpl = new Ext.XTemplate(
		'<span style="float:right;">{date}</span>',
		'<span>{status}</span>',
		'<span style="padding-left:7px;">{name}</span>',
		'<br>',
		'<span class="mail_subject_priority_hige" style="visibility:{isHige}"></span>',
		'<span class="mail_subject_attach" style="visibility:{isContainAttach}"></span>',
		'<span style="color:#999;padding-left:5px;">{subject}</span>'
	);
	var sender = record.get('sender');
	var isContainAttach = record.get('isContainAttach');
	var isHige = record.get('priority') == MAIL_PRIORITY.HIGE;
	QH.mail.NewMailStyleRendererFn(record.get('isRead'),metaData);
	return tpl.apply({
		name:sender?QH.mail.showPersonName(sender.name,sender.emailUrl):'',
		status:QH.mail.statusRenderer(record.get('isRead'),metaData,record),
		subject:subject,
		isContainAttach:isContainAttach ? 'inherit':'hidden',
		isHige:isHige ? 'inherit':'hidden',
		date:QH.mail.dateYMDRenderer(record.get('sendTime') || record.get('addTime'))
	})
}
QH.mail.sizeRenderer = function(size){
	return QH.mail.sizeFn(size);
}
QH.mail.trackerRenderer = function(custId){
	var trackerEmps = "";
	DWREngine.setAsync(false);
	if(custId != null && custId != ""){
		baseSerivce.getListByCondition("CotContact",{customerId:custId},function(res){
			Ext.each(res,function(contact){
				if(contact.empsId == null) return false;
				var empsId = contact.empsId.empsId;
				if(trackerEmps.indexOf(empsId) > -1) return false;
				trackerEmps += empsId +",";
			});
		});
	}
	DWREngine.setAsync(true);
	return "<font color=red>"+trackerEmps+"</font>";
}
/**
 * 传入原有样式，设计新邮件为加粗
 * @param {} style
 */
QH.mail.NewMailStyleRendererFn = function(isRead,metaData){
	metaData.style = metaData.style || '';
	if(!isRead)
		metaData.style += 'font-weight:bold;';
//		metaData.style += 'font-weight:bold;color:red;';
}