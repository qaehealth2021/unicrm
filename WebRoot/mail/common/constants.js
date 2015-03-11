/**
 * 邮件图片目录
 * @type String
 */
MAIL_IMAGE_DIR = 'common/ext/resources/images/mail/';
MAIL_DOWNLOAD_MAIL_FILE = "downLoadMailFile.down";

MAIL_HISTORY_PAGE_LIMIT = 10;
/**
 * 邮件系统界面参数，是否显示子节点邮件
 * @type Boolean
 */
MAIL_NODE_SHOW_CHILD_MAIL = false;

/**
 * 邮件系统界面参数，以标签方式打开邮件
 * @type Boolean
 */
MAIL_OPEN_SHOW_TAB = false;

/**
 * 默认账号配置
 * @type 
 */
DEFAULT_ACCOUNT_CFG = {
	/**
	 * pop3Cfg默认配置
	 * @type 
	 */
	pop3Cfg:{pop3Port:110,pop3Ssl:false},
	/**
	 * smtpCfg默认配置
	 * @type 
	 */
	smtpCfg:{smtpPort:25,smtpAuth:true,smtpSsl:false,smtpTls:false,smtpAfterPop:false},
	/**
	 * 初始化配置，减少代码量
	 */
	init:function(){
		var accountCfg;
		for(var p in this){	// 遍历本身属性
			// 不为函数，pop3Cfg,smtpCfg
			if(Ext.isFunction(p) || p == "pop3Cfg" || p == "smtpCfg"){
				continue;
			}
			// 给每个属性加上pop3及smtp默认值
			accountCfg = this[p];
			Ext.applyIf(accountCfg.pop3Cfg,this.pop3Cfg);
			Ext.applyIf(accountCfg.smtpCfg,this.smtpCfg);
		}
	},
	'qq.com':{
		pop3Cfg:{pop3Host:'pop.qq.com',pop3Port:995,pop3Ssl:true},
		smtpCfg:{smtpHost:'smtp.qq.com',smtpPort:465,smtpSsl:true}
	},
	'163.com':{
		pop3Cfg:{pop3Host:'pop.163.com'},
		smtpCfg:{smtpHost:'smtp.163.com'}
	},
	'hotmail.com':{
		pop3Cfg:{pop3Host:'pop3.live.com',pop3Port:995,pop3Ssl:true},
		smtpCfg:{smtpHost:'smtp.live.com',smtpTls:true}
	},
	'tom.com':{
		pop3Cfg:{pop3Host:'pop.tom.com'},
		smtpCfg:{smtpHost:'smtp.tom.com'}
	},
	'sina.com':{
		pop3Cfg:{pop3Host:'pop.sina.com'},
		smtpCfg:{smtpHost:'smtp.sina.com'}
	},
	'sina.cn':{
		pop3Cfg:{pop3Host:'pop.sina.cn'},
		smtpCfg:{smtpHost:'smtp.sina.cn'}
	},
	'yahoo.com':{
		pop3Cfg:{pop3Host:'pop.mail.yahoo.com'},
		smtpCfg:{smtpHost:'smtp.mail.yahoo.com'}
	},
	'gmail.com':{
		pop3Cfg:{pop3Host:'pop.gmail.com',pop3Port:995,pop3Ssl:true},
		smtpCfg:{smtpHost:'smtp.gmail.com',smtpPort:465,smtpSsl:true}
	}
}
/**
 * 初始化本身，以方便账号配置时，调用默认值
 */
DEFAULT_ACCOUNT_CFG.init();
/**
 * 邮件树节点类型
 * @type 
 */
MAIL_NODE_TYPE = {
	A : 'A',
	B : 'B',
	R : 'R',
	S : 'S',
	C : 'C',
	D : 'D',
	P : 'P',
	Q : 'Q'
}
/**
 * 邮件树节点类型名称
 * @type 
 */
MAIL_NODE_TYPE_NAME = [
	[MAIL_NODE_TYPE.B,'普通箱'],
	[MAIL_NODE_TYPE.R,'收件箱'],
	[MAIL_NODE_TYPE.S,'已发送'],
	[MAIL_NODE_TYPE.C,'草稿箱'],
	[MAIL_NODE_TYPE.D,'废件箱']
];
/**
 * 邮件树节点标记
 * @type 
 */
MAIL_NODE_TAG = {
	N : 'N',	// 不可更新
	Q : 'Q'		// 查询文件夹
}

/**
 * 发送类型
 * @type 
 */
MAIL_SEND_TYPE_STATUS = {
 	NEW : 'N', 		// 撰写
 	REPLY : 'R', 		// 回复
 	REPLYALL : 'RA', 	// 回复全部
 	ATTACHREPLY : 'AR',	// 带附件回复
 	ATTACHEML : 'AE',	// 作为附件发送
 	AGAIN : 'A', 		// 再次发送
 	FORWARD : 'F', 	// 转发
 	MODIFY : 'M', 	// 修改
 	PARTINGERROR:'PE'	// 群发失败处理
}
/**
 * 邮件类型
 */
MAIL_TYPE = {
	RECIVE : 'R',	// 收件
	SENDING : 'F',	// 发件中
	SEND : 'S',		// 已发送
	DRAFT : 'C',	// 草稿
	CHECK : 'P'		// 审核
}

/**
 *	邮件标识
 */
MAIL_TAG = {
	ASSIGN : 'A',	// 指派
	PARTING : 'P',	// 群发
	REPLY : 'R',	// 回复过
	FORWARD : 'F',	// 转发过
	COPY : 'C',		// 复制得到
	QUARTZ : 'Q',	// 定时发送
	WAIT : 'W',	// 等待发送
	PROMPTLY : 'I',		// 立即发送
	ERROR : 'E' // 错误邮件
}
/**邮件模板标识*/
MAIL_TEMPLATE_TAG = {
	NEW : 'N', // 新邮件
	REPLY : 'R',	// 回复邮件
	FORWARD : 'F'	// 转发邮件
}
/**邮件模板类型*/
MAIL_TEMPLATE_TYPE = {
	SIGNATURE : 'S',	// 签名
	TEMPLATE : 'T', // 模板
	QUICKTXT: 'Q'  //快速文本
}
/**邮件优先级*/
MAIL_PRIORITY = {
	HIGE : 1,	// 高
	NORMAL : 3,	// 普通
	LOW : 5		// 低
}

/**
 * 邮件模板图片名对应字段
 * @type 
 */
MAIL_TEMPLATE_ = {
	'_FoxCURSOR':'${custor}',	// 光标位置
	'_FoxDATE':'${date}',		// 当前日期
	'_FoxODATE':'${sendTime}',			// 来信日期
	'_FoxOSUBJ':'${subject}',			// 来信主题
	'_FoxFROMNAME':'${empsSign}',	// 发信人签名
	'_FoxTONAME':'${sendNewMailName}',	// 收件人名字
	'_FoxOFROMNAME':'${sendName}',		// 来信人名字
	'_FoxTEXT':'${body}',			// 原邮件内容
	'_FoxOCCNAME':'${ccName}',		// 来信抄送人名字
	'_FoxOTONAME':'${toName}'			// 来信邮件的收件人
}
/**
 * F:厂家,C:客户,S:陌生人
 */
MAIL_CONTACT_FLAG = {
	FACTORY:'F',
	CUSTOMER:'C',
	STRANGER:'S'
}
/**
 * 邮件详情面板排版位置
 * @type 
 */
MAIL_DETAIL_PANEL_POSITION = {
	RIGHT:'right',
	BOTTOM:'bottom',
	CLOSE:'close'
}
