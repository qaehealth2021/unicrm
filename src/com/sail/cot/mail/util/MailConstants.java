package com.sail.cot.mail.util;

import com.sail.cot.common.util.ContextUtil;

/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description: 邮件系统常量</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Jan 31, 2012 2:57:28 PM </p>
 * <p>Class Name: Constants.java </p>
 * @author zhao
 *
 */
public class MailConstants {
	/**邮箱账号类型 － 公共*/
	public final static String MAIL_ACCOUNT_TYPE_G = "G";
	/**邮箱账号类型 － 个人*/
	public final static String MAIL_ACCOUNT_TYPE_E = "E";
	
	/**邮箱节点类型 － 收件箱*/
	public final static String MAIL_NODE_TYPE_INBOX = "R";
	/**邮箱节点类型 － 发件箱*/
	public final static String MAIL_NODE_TYPE_SENDING = "F";
	/**邮箱节点类型 － 已发送*/
	public final static String MAIL_NODE_TYPE_SEND = "S";
	/**邮箱节点类型 － 草稿箱*/
	public final static String MAIL_NODE_TYPE_DRATF = "C";
	/**邮箱节点类型 － 废件箱*/
	public final static String MAIL_NODE_TYPE_DEL = "D";
	/**邮箱节点类型 － 待审核*/
	public final static String MAIL_NODE_TYPE_CHECK = "P";
	
	/**邮箱节点标识 － 不可删除*/
	public final static String MAIL_NODE_TAG_NO_DEL = "N";
	
	/**邮件缓存保存关键字*/
	public final static String MAIL_RECEIVE_CACHE_KEY = "MailReceiveCache";
	
	/**邮件类型 － 接收*/
	public final static String MAIL_TYPE_RECIVE = "R";
	/**邮件类型 － 发件中*/
	public final static String MAIL_TYPE_SENDING = "F";
	/**邮件类型 － 已发送*/
	public final static String MAIL_TYPE_SEND = "S";
	/**邮件类型 － 草稿*/
	public final static String MAIL_TYPE_DARTF = "C";
	/**邮件类型 － 审核*/
	public final static String MAIL_TYPE_CHECK = "P";
	
	
	/**邮件插入图片map中的random加上该字符的KEY*/
	public static final String MAIL_SEND_IMAGE_RANDOM = "IMAGE_RANDOM";
	/**邮件发送附件存储名字索引名*/
	public static final String MAIL_SEND_ATTACH_NAME_INDEX_KEY = "nameIndex";
	/**邮件发送附件存储MAP名*/
	public static final String MAIL_SEND_ATTACH_MAP_KEY = "map";
	/**邮件发送附件存储排序名*/
	public static final String MAIL_SEND_ATTACH_SORT_KEY = "attachSort";
	/**邮件上传存放附件的名字所替换的正则*/
	public static final String MAIL_SEND_ATTACH_UPLOAD_RG = "[ #+&']";
	/**线程池大小*/
	public static final int MAIL_EXECUTOR_POOL_SIZE = getProperties4Mail("mail.threadPool",30);
	
	public static final int MAIL_ACCOUNT_N_PER_THREAD = getProperties4Mail("mail.account_n_per_thread" ,1);
	
	public static final int MAIL_AUTO_RECEIVE_INTERVAL = getProperties4Mail("mail.auto_receive_interval" ,30);
	
	/**邮件模板标识-新邮件*/
	public static final String MAIL_TEMPLATE_TAG_NEW = "N";
	/**邮件模板标识-回复邮件*/
	public static final String MAIL_TEMPLATE_TAG_REPLY = "R";
	/**邮件模板标识-转发邮件*/
	public static final String MAIL_TEMPLATE_TAG_FORWARD = "F";
	
	/**邮件模板类型-签名邮件*/
	public static final String MAIL_TEMPLATE_TYPE_SIGNATURE = "S";
	/**邮件模板类型-模板邮件*/
	public static final String MAIL_TEMPLATE_TYPE_TEMPLATE = "T";
	
	public static final String MAIL_FILE_DOWN_URL = "downLoadMailFile.down?path=";
	public static final String MAIL_FILE_DOWN_URL_REGEX = "downLoadMailFile.down\\?path=";
	
	public static final String MAIL_SHARE_ATTACH_PATH = "mail/attach/share/";
	
	//规则文件根路径
	//public static String RuleFileRoot=getRuleFileRoot();
	
	/**
	 * @return 
	 * @see 功能描述（必填）：获取线程池的大小,默认30
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Sep 12, 2012 7:15:09 PM</p>
	 * @return
	 * 返回值：int
	 */
	public static int getProperties4Mail(String key,int defaultVal){
		String obj = ContextUtil.getProperty("mail.properties", key);
		if(obj != null){
			return  Integer.valueOf(obj);
		}
		return defaultVal;
	}
	
	public static final int MAIL_RULE_ACTION_COUNT = 50;
	
}
