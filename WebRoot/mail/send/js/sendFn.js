QH.mail.renderTemplateFn = function(key,mail,sign){
	switch(key){
		case '_FoxCURSOR':
			return 	'<span tage="mouseFocus"></span>';
		case '_FoxDATE':		// 当前日期
			return Ext.util.Format.date(new Date(),'Y-m-d');
		case '_FoxODATE':		// 来信日期
			return Ext.util.Format.date(mail.sendTime,'Y-m-d H:i');
		case '_FoxOSUBJ':		// 来信主题
			return mail.subject;
		case '_FoxFROMNAME':	// 发信人签名
			return '<div id="mailSignature"><span id="mailSpan">'+sign+'</span></div>';
		case '_FoxTONAME':		// 收件人名字
			return '<span tage="sendMailToName" style="display:inline"></span>';
		case '_FoxOFROMNAME':		// 来信人名字
			return mail.sendName+'&lt'+ mail.sendUrl+'&gt';
		case '_FoxOCCNAME':		// 来信抄送人名字
			var shows = [];
			var emailUrl;
			if(!Ext.isEmpty(mail.cc)){
				Ext.each(mail.cc,function(person){
					shows.push(person.name +'&lt' + person.emailUrl+'&gt');
				});
			}
			return shows.join(',');
		case '_FoxOTONAME':		// 来信邮件的收件人
			var shows = [];
			var emailUrl;
			if(!Ext.isEmpty(mail.to)){
				Ext.each(mail.to,function(person){
					shows.push(person.name +'&lt' + person.emailUrl+'&gt')
				});
			}
			return shows.join(',');
		case '_FoxTEXT':		// 原邮件内容
		{
			if(mail.bodyHtml == null){
				//替换存文本的回车换行
				var reg = new RegExp('\r\n','mg');
				mail.bodyHtml = mail.bodyText.replace(reg,'<br/>');
			}
			return mail.bodyHtml || mail.bodyText;
		}
		default :
			return '';
	}
}