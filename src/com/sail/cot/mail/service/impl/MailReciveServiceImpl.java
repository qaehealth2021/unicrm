package com.sail.cot.mail.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Flags.Flag;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpSession;

import net.sf.ehcache.Cache;
import net.sf.json.JSONObject;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.fileupload.FileItem;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.common.util.ExceptionStackTracePaser;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.common.util.StringUtil;
import com.sail.cot.common.util.UploadUtil;
import com.sail.cot.domain.CotContact;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotMail;
import com.sail.cot.domain.CotMailAccountCfg;
import com.sail.cot.domain.CotMailAttach;
import com.sail.cot.domain.CotMailGarbageCfg;
import com.sail.cot.domain.CotMailReceiveCache;
import com.sail.cot.domain.CotMailTree;
import com.sail.cot.domain.vo.CotReadMailInfoVO;
import com.sail.cot.mail.service.MailAccountCfgService;
import com.sail.cot.mail.service.MailReciveService;
import com.sail.cot.mail.service.MailTreeService;
import com.sail.cot.mail.util.MailConstants;
import com.sail.cot.mail.util.MailSendUtil;
import com.sun.mail.pop3.POP3Folder;
import com.zhao.mail.analytic.MessageAnalytic;
import com.zhao.mail.entity.IMailAttach;
import com.zhao.mail.entity.IPOP3CachedMethod;
import com.zhao.mail.entity.IReceiveCache;
import com.zhao.mail.pop3.POP3ReciveMessage;
import com.zhao.mail.pop3.POP3Service;
import com.zhao.mail.util.MailCacheUtil;
import com.zhao.mail.util.MailServiceConstants;

@Service("MailReciveService")
public class MailReciveServiceImpl extends BaseServiceImpl implements MailReciveService{
	private Logger logger = Log4WebUtil.getLogger(MailReciveServiceImpl.class);
	private static Map<Integer, Boolean> reciveMap = new HashMap<Integer, Boolean>(); // 控制是否取消接收
	private static Map<Integer,CotReadMailInfoVO> readMailInfo = new HashMap<Integer, CotReadMailInfoVO>();
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailReciveService#recivePOP3Message(java.lang.Integer)
	 */
	@Transactional(propagation=Propagation.NOT_SUPPORTED)  
	public void recivePOP3Message(Integer cfgId) throws ServiceException{
		logger.debug("接收邮件");
		// 获得账号
		CotMailAccountCfg accountCfg = accountCfgService.getReciveAccount(cfgId);
		if(accountCfg == null)
			return ;
		// 获得对应账号收件箱节点
		Integer reciveCfgId = accountCfg.getId();
		Integer inboxNodeId =  treeService.findNodeIdByType(reciveCfgId, MailConstants.MAIL_NODE_TYPE_INBOX);
		if(this.setReciveMap(reciveCfgId))	// 已存在账号在接收，则不重复执行
			return;
		String account = accountCfg.getMailAccount();
		
		logger.info("节点ID:"+inboxNodeId+",账号ID:"+reciveCfgId+",账号："+account+",开始接收邮件");
		POP3Folder folder = null;
		try {
			Integer backDay = accountCfg.getMailBackDay(); // 保留天数
			
			folder = POP3Service.openFolder(accountCfg.getPop3Cfg(), POP3Folder.READ_WRITE);
			logger.info("获得已存在邮件UID");
			CacheMethod cacheMethod = new CacheMethod(this);
			//List<String> uids = MailCacheUtil.getPopUidListByAccount(account);
			List<Message> msgList = POP3ReciveMessage.readNewMessagesByUID(folder,cacheMethod,account);
			
			if (msgList == null) {
				logger.info("服务器没有新邮件");
				return;
			} else {
				logger.info("存在" + msgList.size() + "封新邮件");
				//TODO:邮件大小限制，该地方考虑配置在文件中，或数据库中
				Integer mailMaxSize = 10;
				String mailSize = ContextUtil.getProperty("mail.properties", "mail.attach.size");
				if(mailMaxSize != null){
					mailMaxSize = Integer.valueOf(mailSize);
				}
				logger.info("开始读取所有新邮件");
				
				boolean isBackMail = backDay == null || backDay.intValue() >= -1;	// 备份保存邮件
				
				DateFormat dFormat = new SimpleDateFormat("yyyy-MM-dd");
				int msgSize = msgList.size();
				int newMsgCount = 0; // 读取成功邮件数
				String uid = null;
				Date cacheAddTime = null;
				while(msgList.size()>0) {
					try {
						if(!reciveMap.containsKey(reciveCfgId)){	// 取消接收
							logger.info("取消接收邮件");
							break;
						}
						int index = msgSize - msgList.size();  // 所在位置
						Message msg = msgList.remove(0); // 当前接收邮件
						
						Date addTime = ContextUtil.getCurrentDate();// 邮件插入数据库时间
						cacheAddTime = dFormat.parse(dFormat.format(addTime));	// 缓存添加时间,转成只有年月日
						
						uid = folder.getUID(msg);
//						if(MailCacheUtil.isExistPopUid(uid, account, cacheAddTime))
//							continue;
						logger.info("开始读取一封新邮件");
						CotMail cotMail = null;
						try {
							 cotMail =  (CotMail)MessageAnalytic.get().readBaseInfo((MimeMessage)msg);
						} catch (Exception e) {
							logger.error("邮件接收错误："+e.getMessage());
							// TODO: handle exception
						}
						if(cotMail == null) continue;
						logger.info("邮件大小:" + cotMail.getSize());
						CotReadMailInfoVO readMail = new CotReadMailInfoVO(
								cotMail.getSubject(),cotMail.getSize(),cotMail.getSender(),msgSize,index
						);
						readMailInfo.put(reciveCfgId, readMail);
						// 读取邮件详情
						if (cotMail.getSize() >= mailMaxSize * 1024 * 1024) {
							logger.info("邮件大小超过指定大小");
							cotMail.setMailTag(cotMail.getMailTag() + MailServiceConstants.MAIL_TAG_ERROR);
							cotMail.setErrorMsg("邮件大小超过指定大小");
						} else {
							MessageAnalytic.get().readDetailMailInfo(cotMail,(MimeMessage)msg);
							//TODO：在集群模式下，需要将文件拷贝到文件服务器
							if(ContextUtil.isLoadBalnace()){
								logger.debug("集群模式,拷贝附件到文件服务器");
								//通过上传文件的方式拷贝文件
								String url = ContextUtil.getProperty("common.properties", "TOMCAT_UPLOAD_ADDR");
								Map<String,String> postParams = new HashMap<String, String>();
								postParams.put("uploadPath", "");
								postParams.put("beanName", "MailUpdateService");
								postParams.put("bGenDate", "false");
								if(CollectionUtils.isNotEmpty(cotMail.getAttachs())){
									List uploadFile = new ArrayList();
									for(IMailAttach attach : cotMail.getAttachs()){
										uploadFile.add(MailServiceConstants.MAIL_FILE_BASEPATH+attach.getUrl());
										int idx = attach.getUrl().lastIndexOf("/");
										String uploadPath = attach.getUrl().substring(0,idx);
										postParams.put("uploadPath", uploadPath);
									}
									//EML文件上传到指定服务器
									uploadFile.add(MailServiceConstants.MAIL_FILE_BASEPATH+cotMail.getEmlPath());
									UploadUtil.uploadFile(url, postParams, uploadFile);
								}
								
							}
						}
						
						if(!reciveMap.containsKey(reciveCfgId)){	// 取消接收
							logger.info("取消接收邮件");
							//MailCacheUtil.removePopUidFromCache(uid, account, cacheAddTime);
							break;
						}
						//TODO:执行规则
						Map<String,Integer> idMap = new HashMap<String, Integer>();
						idMap.put("cfgId", reciveCfgId);
						idMap.put("empId", accountCfg.getEmpId().getId());
						this.moveAssignMail(idMap, cotMail);
						// 加入数据库相关信息并保存
						this.saveReciveMail(cotMail, inboxNodeId, addTime);
						
						newMsgCount++; // 新邮件加1
						// 不保留备份，并不是错误接收邮件
						if(!isBackMail && cotMail.getMailTag().indexOf(MailServiceConstants.MAIL_TAG_ERROR)==-1){
							System.out.println("设置删除标志:"+uid);
							msg.setFlag(Flag.DELETED,true);	// 设置为删除标志
							//MailCacheUtil.removePopUidFromCache(uid, account, addTime);
						}else {
							// 将UID保存到数据库表中
							this.saveReceiveCache(account, cotMail.getMsgId(), uid, addTime);
						}
						logger.info("读取一封新邮件结束");
					} catch (Exception e) {
						logger.error("读取一封新邮件失败", e);
						newMsgCount--;
						//MailCacheUtil.removePopUidFromCache(uid, account, cacheAddTime);
					}
				}
				readMailInfo.remove(reciveCfgId);
				logger.info("读取所有新邮件结束,读取到 " + newMsgCount + " 封新邮件");
			}
			
			this.delMessageAndCache(account, backDay, folder);// 设置N天前保存的邮件为删除标记并删除缓存
			
		} catch (Exception e) {
			logger.error("执行接收邮件错误",e);
			throw new ServiceException(e.getMessage());
		}finally{
			logger.info("节点ID:"+inboxNodeId+",账号ID:"+reciveCfgId+",账号："+account+",结束接收邮件");
			if(folder != null){
				try {
					folder.close(true);
				} catch (MessagingException e) {
					logger.error("关闭Foler失败",e);
				}
			}
		}
	}
	
	public Map<String, Object>  remotePOP3Message(Integer cfgId,int start,int limit) throws ServiceException{
		logger.info("远程邮件");
		CotMailAccountCfg accountCfg = accountCfgService.getReciveAccount(cfgId);
		if(accountCfg == null)
			return null;
		POP3Folder folder;
		try {
			folder = POP3Service.openFolder(accountCfg.getPop3Cfg(), POP3Folder.READ_WRITE);
			List<Message> msgList = POP3ReciveMessage.readNewMessagesByUID(folder, null);
			if(msgList == null)
				return null;
//			System.out.println("服务器有"+msgList.size()+"封邮件");
			Map<String, Object> map = new HashMap<String, Object>();
			
			map.put("totalCount", msgList.size());
			
			List<CotMail> cotMails = new ArrayList<CotMail>();
			MimeMessage msg;
			for (int i = start; i < msgList.size() && i < start + limit; i++) {
				msg = (MimeMessage) msgList.get(i);
				CotMail cotMail = (CotMail) MessageAnalytic.get().readBaseInfo(msg);
				cotMail.setId(i+1);
//				System.out.println(i+":"+cotMail.getSubject());
				cotMails.add(cotMail);
				
			}
			map.put("data", cotMails);
			return map;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailReciveService#getReadingMailInfo(java.lang.Integer)
	 */
	public CotReadMailInfoVO getReadingMailInfo(Integer reciveCfgId) {
		return readMailInfo.get(reciveCfgId);
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailReciveService#cancleReciveMail(java.lang.Integer)
	 */
	public void cancleReciveMail(Integer reciveCfgId) {
		logger.debug("执行取消接收邮件方法");
		try {
			// 获得账号
			CotMailAccountCfg accountCfg = accountCfgService.getReciveAccount(reciveCfgId);
			if(accountCfg == null)
				return ;
			reciveMap.remove(reciveCfgId);
		} catch (Exception e) {
			logger.error("执行取消接收邮件方法失败",e);
		}
	}
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailReciveService#initMailList2Cache()
	 */
	@SuppressWarnings("unchecked")
	public void initMailList2Cache() throws ServiceException {
		logger.info("执行初始化邮件缓存方法");
		Cache mailCache = ContextUtil.getCacheManager(MailConstants.MAIL_RECEIVE_CACHE_KEY);
		List<IReceiveCache> list = this.getList("CotMailReceiveCache");
		MailCacheUtil.initMailList2Cache(mailCache, list);
	}
	/**
	 * 
	 * @see 功能描述（必填）：// 设置N天前保存的邮件为删除标记并删除缓存
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 3, 2012 10:03:17 AM</p>
	 * @param account
	 * @param backDay
	 * @param folder
	 * @throws ParseException
	 * @throws DAOException
	 * @throws ServiceException
	 */
	private void delMessageAndCache(String account, Integer backDay,
			POP3Folder folder) throws ParseException, DAOException,
			ServiceException {
		CacheMethod filter = new CacheMethod(this);
		List<String> delMsgIdList = POP3ReciveMessage.delMessageByBackDay(folder,account,backDay,filter);
		if(delMsgIdList != null){
			
			//this.delMailCache(account,delMsgIdList);
			//02A428A44BCB343FF18252324D6386E6D400000000000001
			super.deleteIntListReturnIds(filter.getCachedIds(), "CotMailReceiveCache");
//			for (String delMsgId : delMsgIdList) {
//				MailCacheUtil.removePopUidFromCache(delMsgId, account, null);
//			}
		}
	}
	@Override
	public String upload(FileItem fileItem,String uploadPath,String tbName,
			String id,String field,String fkIdVal,String fkField,boolean doDbOp,String paramJson,boolean isRName,HttpSession session) throws ServiceException{
		String fileName = StringUtil.takeOutFileName(fileItem.getName());

		fileName = MailSendUtil.getRandomAttachName(fileName);
		
		JSONObject jsonObject = JSONObject.fromObject(paramJson);
		Integer nodeId = jsonObject.getInt("nodeId");
			
		String path = MailServiceConstants.MAIL_ATTACH_TEMP_EML_PATH + uploadPath;
		
		File pf = new File(MailServiceConstants.MAIL_FILE_BASEPATH + path);
		if (!pf.exists())
			pf.mkdirs();
		File file = new File(MailServiceConstants.MAIL_FILE_BASEPATH + path + fileName);
		// 上传文件
		try {
			fileItem.write(file);
			InputStream inputStream = new FileInputStream(file);
			//邮件的multpart可能为空
			System.setProperty("mail.mime.multipart.allowempty", "true");
			Session mailSession = Session.getDefaultInstance(System.getProperties(),new Authenticator(){});
			MimeMessage mimeMessage = new MimeMessage(mailSession, inputStream);
			CotMail cotMail = (CotMail) MessageAnalytic.get().readAllMailInfo(mimeMessage);
			// 加入数据库相关信息并保存
			this.saveReciveMail(cotMail, nodeId, ContextUtil.getCurrentDate());
		} catch (Exception e) {
			String msg = ExceptionStackTracePaser.paserStactTrace(e);
			throw new ServiceException("文件上传异常：" + msg);
		}
		// 上传获取文件名
		JSONObject json = new JSONObject();
		json.put("success", true);
		return json.toString();
	}
			
			
	/**
	 * 
	 * @see 功能描述（必填）：加入数据库相关信息并保存
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 3, 2012 9:56:21 AM</p>
	 * @param cotMail
	 * @param inboxNodeId
	 * @param addTime
	 * @throws ServiceException
	 */
	private void saveReciveMail(CotMail cotMail, Integer inboxNodeId,
			Date addTime) throws ServiceException {
		logger.info("正在给邮件" + cotMail.getSubject() + "加入数据库相关信息");
		cotMail.setAddTime(addTime); // 设置加入数据库时间
		if(cotMail.getNodeId() == null || cotMail.getNodeId().getId() == null)
			cotMail.setNodeId(new CotMailTree(inboxNodeId));	// 所属树节点
		cotMail.setMailType(MailConstants.MAIL_TYPE_RECIVE);	// 所属账号ID
		cotMail.setIsRead(false);	// 设计为未读
		
		this.saveOrUpdateObj(cotMail);
		if(cotMail.getCotMailBodyHtml() != null)
			this.saveOrUpdateObj(cotMail.getCotMailBodyHtml());
		if(cotMail.getCotMailBodyText() != null)
			this.saveOrUpdateObj(cotMail.getCotMailBodyText());
		List<IMailAttach> attachList = cotMail.getAttachs();
		if(attachList != null && attachList.size() > 0){
			for (IMailAttach mailAttach : attachList) {
				((CotMailAttach)mailAttach).setCotMail(cotMail);
			}
			this.saveOrUpdateList(attachList);
		}
		
	}
	/**
	 * 
	 * @see 功能描述（必填）：如果已存在账号在接收，则返回true，不存在则加入账号并返回false
	 * <p>返回值：boolean</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 3, 2012 9:06:18 AM</p>
	 * @param cfgId
	 * @return
	 */
	private synchronized boolean setReciveMap(Integer cfgId){
		if(reciveMap.containsKey(cfgId))
			return true;
		reciveMap.put(cfgId, true);
		return false;
	}
	/**
	 * 
	 * @see 功能描述（必填）：保存缓存
	 * <p>返回值：void</p>
	 * @see <p>Author:zhao</p>
	 * @see <p>Create Time:Feb 3, 2012 8:55:51 AM</p>
	 * @param account
	 * @param msgId
	 * @param uid
	 * @param addTime
	 * @throws ServiceException
	 */
	private void saveReceiveCache(String account, String msgId, String uid,Date addTime) throws ServiceException {
		CotMailReceiveCache receiveCache = new CotMailReceiveCache();
		receiveCache.setAddTime(addTime);
		receiveCache.setMailAccount(account);
		
		receiveCache.setMailMsgId(msgId);
		receiveCache.setMailPopUid(uid);
		this.saveOrUpdateObj(receiveCache);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private void delMailCache(String account,List<String> popUidList) throws DAOException, ServiceException{
		if(popUidList == null || popUidList.size()==0 || account == null)
			return ;
		String hql = "delete from CotMailReceiveCache where mailAccount = :mailAccount and mailPopUid in(:mailPopUid)";
		
		Map whereMap = new HashMap();
		whereMap.put("mailAccount", account);
		whereMap.put("mailPopUid", popUidList);
		this.findRecordByHql(hql, whereMap);
	}
	
	@Resource(name="MailAccountCfgService")
	private MailAccountCfgService accountCfgService;
	
	@Resource(name="MailTreeService")
	private MailTreeService treeService;
	/* (non-Javadoc)
	 * @see com.sail.cot.mail.service.MailReciveService#moveAssignMail(java.util.Map, com.sail.cot.domain.CotMail)
	 */
	@Override
	public void moveAssignMail(Map<String, Integer> idMap, CotMail cotMail) {
		logger.debug("执行指派移动邮件更新方法");
		if(idMap == null || cotMail == null)
			return ;
		
		if(idMap.get("empId")==null){
			//logger.info("账号或节点已变更,");
			cotMail.setMailTag(MailServiceConstants.MAIL_TAG_ERROR);
			cotMail.setErrorMsg(cotMail.getErrorMsg()+"(邮件不能指派移动,账号或节点已变更)");
		}else{
			Integer cfgId = idMap.get("cfgId");
			Integer empId = idMap.get("empId");
			boolean isFilter = false;
			cotMail.setCfgId(cfgId);
			//设置关联业务员
			cotMail.setBelongEmpId(new CotEmps(empId));
			Integer delNodeId = treeService.findNodeIdByType(cfgId, MailConstants.MAIL_NODE_TYPE_DEL);
			CotMailGarbageCfg garbageCfg = (CotMailGarbageCfg)super.findUniqueRecordsByHql(" from CotMailGarbageCfg obj where obj.accountId="+cfgId);
			if(garbageCfg != null && garbageCfg.getFilter() != null){
				//执行垃圾规则过滤
				JSONObject json = JSONObject.fromObject(garbageCfg.getFilter());
				String address = json.getString("ACCOUNT");
				String mailServer = json.getString("ACCOUNT_SERVER");
				//发件箱地址的后缀，如achui_1980@163.com的后缀就是163.com
				String mailsubFix = cotMail.getSendUrl().substring(cotMail.getSendUrl().indexOf("@")+1);
				if(address != null && address.indexOf(cotMail.getSendUrl()) > -1){
					//在黑名单中，移动到废件箱
					cotMail.setNodeId(new CotMailTree(delNodeId));
					isFilter = true;
				}else if(mailServer != null && mailServer.indexOf(mailsubFix) > -1){
					cotMail.setNodeId(new CotMailTree(delNodeId));
					isFilter = true;
				}
			}
			if(!isFilter){
				//设置联系人ID和客户ID
				List list = this.getBaseDao().findRecordsByHql("from CotContact obj where obj.contactEmail='"+cotMail.getSendUrl()+"'", null);
				if(CollectionUtils.isNotEmpty(list)){
					CotContact contact = (CotContact)list.get(0);
					cotMail.setContactId(contact);
					cotMail.setCustId(contact.getCustomerId());
					cotMail.setConsignCustId(contact.getCustomerId());
				}
			}
		}
	}
	class CacheMethod implements IPOP3CachedMethod{
		private BaseSerivce baseSerivce;
		private List<Integer> cachedIds = new ArrayList<Integer>();
		public CacheMethod(BaseSerivce baseSerivce){
			this.baseSerivce = baseSerivce;
		}
		@Override
		public boolean isExistMsgId(String account, String msgId) {
			String hql = "from CotMailReceiveCache obj where obj.mailAccount=:mailAccount and obj.mailPopUid=:mailMsgId";
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("mailAccount", account);
			map.put("mailMsgId", msgId);
			List list = this.baseSerivce.findRecordByHql(hql, map);
			if(list == null || list.size() == 0) return false;
			return true;
		}
		@Override
		public List<String> getDeleteMsgIdByDate(String account,Integer backDay) {
			String hql = "from CotMailReceiveCache obj where obj.mailAccount=:mailAccount and obj.addTime <:endTime";
			List<String> msgIds = new ArrayList<String>();
			Calendar calendar = Calendar.getInstance();
			if(backDay != null && backDay != -1){
				//backDay -1表示不删除一直保留
				//当前日期的前backDay天的邮件都要删除，根据接收到系统的时间为准
				calendar.add(Calendar.DATE, (0-backDay+1));
				calendar.set(Calendar.HOUR, 0);
				calendar.set(Calendar.MINUTE, 0);
				calendar.set(Calendar.SECOND, 0);
				calendar.set(Calendar.MILLISECOND,0);
				Map<String,Object> map = new HashMap<String, Object>();
				map.put("mailAccount", account);
				map.put("endTime", calendar.getTime());
				List<CotMailReceiveCache> list = this.baseSerivce.findRecordByHql(hql, map);
				if(CollectionUtils.isNotEmpty(list)){
					for(CotMailReceiveCache cache : list){
						msgIds.add(cache.getMailPopUid());
						this.cachedIds.add(cache.getId());
					}
				}
			}
			return msgIds;
		}
		public List<Integer> getCachedIds() {
			return cachedIds;
		}
		
	}
	
}
