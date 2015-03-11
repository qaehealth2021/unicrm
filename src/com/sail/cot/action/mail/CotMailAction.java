package com.sail.cot.action.mail;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotMail;
import com.sail.cot.domain.CotMailBodyHtml;
import com.sail.cot.domain.CotMailBodyText;
import com.sail.cot.mail.service.MailReciveService;
import com.sail.cot.mail.service.MailTreeService;
import com.sail.cot.mail.util.MailConstants;
/**
 * 
 * <p>Title: 旗航 MailServer-2.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Feb 13, 2012 3:14:09 PM </p>
 * <p>Class Name: CotMailAction.java </p>
 * @author zhao
 *
 */
@SuppressWarnings("serial")
public class CotMailAction extends AbstractAction{
	private Logger logger = Log4WebUtil.getLogger(CotMailAction.class);
	@Resource(name="MailTreeService")
	private MailTreeService treeService;
	@Resource(name="MailReciveService")
	private MailReciveService reciveService;
	
	private CotMail mail;
	private String nodeSearchStr;
	private Integer accountId;
	private String attachName;
	private boolean showChildMail;
	private String treeLvId;
	private List<String> mailTypes;
	private Date startTime;
	private Date endTime;
	public String query() {
		return "query";
	}
	
	public String queryinfo(){
		return "info";
	}
	
	public String print(){
		return "print";
	}
	
	public List<String> getMailTypes() {
		return mailTypes;
	}

	public void setMailTypes(List<String> mailTypes) {
		this.mailTypes = mailTypes;
	}

	public String remote(){
		
		try {
			Map<String, Object> map = reciveService.remotePOP3Message(accountId,pageData.getStart(),pageData.getLimit());
			JSONObject jsonObject = JSONObject.fromObject(map);
			jsonString = jsonObject.toString();
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}
	
	@SuppressWarnings("unchecked")
	public String body(){
		String hql;
		
		Map<String,Object> whereMap = new HashMap<String, Object>();
		whereMap.put("mailId", mail.getId());
		try {
			String bodyType = mail.getBodyType();
			if("T".equals(bodyType)){
				hql = "from CotMailBodyText obj where obj.mail.id = :mailId";
				List<CotMailBodyText> list = this.getBaseSerivce().findRecordByHql(hql, whereMap);
				jsonString = list.get(0).getBody();
				jsonString = jsonString.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
						.replaceAll("\r\n", "<br />");
			}else{
				hql = "from CotMailBodyHtml obj where obj.mail.id = :mailId";
				List<CotMailBodyHtml> list = this.getBaseSerivce().findRecordByHql(hql, whereMap);
				jsonString = list.get(0).getBody();
			}
		} catch (Exception e) {
		}
		return Constants.JSONDATA;
	}
	
	public String list(){
		StringBuffer hql = new StringBuffer();
		hql.append("from CotMail obj where 1=1");
		//加入IdentityId的约束条件
		super.getIdentityHql(hql);
		
		String sortStr = pageData.getSort();
		
		String dirStr = pageData.getDir();
		
		CotEmps emps = super.getCurrEmps();
		
		
		Map<String,Object> whereMap = new HashMap<String, Object>();
		
		if(mail != null){
			//所有往来邮件
//			if(mail.getNodeId() !=null && mail.getNodeId().getId() == null && mail.getNodeId().getAccountCfgId().getId() == null){
//				if(!"admin".equals(emps.getEmpsId())){
//					whereMap.putAll(this.getBaseSerivce().getPopedomWhereMap("mail.do", emps.getId()));
//					hql.append(" and nodeId.accountCfgId.empId.id in(:empIds)");
//				}
//			}
			if(mail.getNodeId() != null && mail.getNodeId().getAccountCfgId() != null && mail.getNodeId().getAccountCfgId().getId() != null){
				hql.append(" and obj.nodeId.accountCfgId.id = :accountCfgId");
				whereMap.put("accountCfgId", mail.getNodeId().getAccountCfgId().getId());
			}
    		if(mail.getNodeId() != null && mail.getNodeId().getId() != null){
    			if(showChildMail){
    				hql.append(" and obj.nodeId.id in(:nodeIds)");
    				List<Integer> nodeIds = treeService.findChildrenIds(mail.getNodeId().getId());
    				whereMap.put("nodeIds", nodeIds);
    			}else{
    				hql.append(" and obj.nodeId.id = :nodeId");
    				whereMap.put("nodeId", mail.getNodeId().getId());
    			}
    		}
    		if(this.mailTypes != null){
    			//点击收件箱节点是，查询所有往来邮件
    			hql.append(" and obj.mailType in (:mailType)");
    			whereMap.put("mailType",this.mailTypes);
    		}
    		if(mail.getMailType() != null && !mail.getMailType().trim().equals("")){
    			hql.append(" and obj.mailType = :mailType");
    			whereMap.put("mailType", mail.getMailType());
    		}
    		if(mail.getSubject() != null && !mail.getSubject().trim().equals("")){
    			hql.append(" and obj.subject like :subject");
    			whereMap.put("subject", "%"+mail.getSubject()+"%");
    		}
    		if(mail.getSendName() != null && !mail.getSendName().trim().equals("")){
    			hql.append(" and (obj.sendName like :sendName or obj.sendUrl like :sendUrl)");
    			whereMap.put("sendName", "%"+mail.getSendName()+"%");
    			whereMap.put("sendUrl", "%"+mail.getSendName()+"%");
    		}
    		if(mail.getToName() != null && !mail.getToName().trim().equals("")){
    			hql.append(" and (obj.toName like :toName or obj.toUrl like :toUrl)");
    			whereMap.put("toName", "%"+mail.getToName()+"%");
    			whereMap.put("toUrl", "%"+mail.getToName()+"%");
    		}
    		if(startTime != null){
    			hql.append(" and obj.sendTime >= :startSmsDate");
    			whereMap.put("startSmsDate", startTime);
    		}
    		if(endTime != null){
    			hql.append(" and obj.sendTime <= :endSmsDate");
    			whereMap.put("endSmsDate", endTime);
    		}
    		if(StringUtils.isNotEmpty(mail.getOrderNo())){
    			hql.append(" and obj.orderNo=:orderNo");
    			whereMap.put("orderNo",mail.getOrderNo());
    		}
    		if(mail.getCustId() != null && mail.getCustId().getId() != 0){
    			//fix me:如果客户ID不为空，那么就忽略员工的条件，直接查看该客户的邮件
    			//因为客户可以共享给多个业务员，被共享的业务员也可以看到该客户的邮件
    			mail.setBelongEmpId(null);
    			hql.append(" and obj.custId.id=:custId");
    			whereMap.put("custId",mail.getCustId().getId());
    		}
    		if(mail.getBelongEmpId() != null && !mail.getBelongEmpId().equals("")){
    			hql.append(" and obj.belongEmpId.id=:belongEmpId");
    			whereMap.put("belongEmpId",mail.getBelongEmpId().getId());
    		}
    		if(this.treeLvId != null && !"".equals(this.treeLvId)){
    			JSONObject json = JSONObject.fromObject(this.treeLvId);
    			if(json.getInt("area") != -1 && json.getInt("area") != 0){
    				hql.append(" and obj.custId.areaId.id=:areaId");
        			whereMap.put("areaId",json.getInt("area"));
    			}
    			if(json.getInt("country") != -1 && json.getInt("country") != 0){
    				hql.append(" and obj.custId.nationId.id=:country");
        			whereMap.put("country",json.getInt("country"));
    			}
    			if(json.getInt("province") != -1 && json.getInt("province") != 0){
    				hql.append(" and obj.custId.proviceId.id=:province");
        			whereMap.put("province",json.getInt("province"));
    			}
    		}
		}
		if(nodeSearchStr != null && !nodeSearchStr.trim().equals("")){
			hql.append(" and (").append(nodeSearchStr).append(")");
		}
		try {
			logger.info("sort:"+sortStr+",dir:"+dirStr);
			if(sortStr!=null){
				if(sortStr.equals("sender")){
					sortStr = "sendUrl";
				}
				else if(sortStr.equals("to")){
					sortStr = "toUrl";
				}
//				else if(sortStr.equals("custId")){
//					sortStr = "custId.customerShortName";
//				}
			}
			if(sortStr==null)
				sortStr = "sendTime";
			if(dirStr==null)
				dirStr = "DESC";
			
			hql.append(" order by obj."+sortStr+" "+dirStr);
			
			String[] excludes = {"accountCfg"};
			jsonString = this.getBaseSerivce().findRecords(
					hql.toString(), whereMap, pageData.getStart(), pageData.getLimit(),excludes);
		} catch (ServiceException e) {
			logger.error(e);
		}
		return Constants.JSONDATA;
	}
	/**
	 * 历史往来邮件
	 * @return
	 */
	public String dealingsmail(){
		StringBuffer hql = new StringBuffer();
		hql.append("select new CotMail(obj.id,obj.mailType,obj.subject,obj.isContainAttach,obj.sendTime) from CotMail obj where 1=1");
		//加入IdentityId的约束条件
		super.getIdentityHql(hql);
		Map<String,Object> whereMap = new HashMap<String, Object>();
		if(this.accountId != null){
			hql.append(" and obj.nodeId.accountCfgId.id = :accountId");
			whereMap.put("accountId", this.accountId);
		}
		if(mail != null){
			if(mail.getToUrl() != null && !mail.getToUrl().equals("")){
				// 接收历史
				hql.append(" and (obj.mailType = :reciveType");
				hql.append(" and obj.sendUrl like :mailUrl");
				// 发件历史
				hql.append(" or obj.mailType = :sendType");
				hql.append(" and (obj.toUrl like :mailUrl");
				hql.append(" or obj.ccUrl like :mailUrl");
				hql.append(" or obj.bccUrl like :mailUrl))");
				
				whereMap.put("mailUrl", "%" + mail.getToUrl() + "%");
				whereMap.put("reciveType", MailConstants.MAIL_TYPE_RECIVE);
				whereMap.put("sendType", MailConstants.MAIL_TYPE_SEND);
			}
			if(mail.getSubject() != null && !mail.getSubject().trim().equals("")){
				hql.append(" and obj.subject like :subject");
				whereMap.put("subject", "%" + mail.getSubject() + "%");
			}
		}
		try{
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			logger.error(e);
		}
		
		return Constants.JSONDATA;
	}
	/**
	 * 历史往来附件
	 * @return
	 */
	public String dealingsattach(){
		StringBuffer hql = new StringBuffer();
//		{name:'id',type:'int'},
//		{name:"mailId",type:'int'},
//		{name:"name",type:'string'},
//		{name:"size",type:'int'},
//		{name:"url",type:'string'},
//		{name:'sendTime',type:'jsondate'}
		hql.append("select new CotMailAttach(obj.id,obj.cotMail.id,obj.name,obj.size,obj.url,obj.cotMail.sendTime) from CotMailAttach obj where 1=1");
		
		Map<String,Object> whereMap = new HashMap<String, Object>();
		
		String currentIdentityId = this.getCurrentIdentityId();
		if(currentIdentityId != null){
			hql.append(" and obj.cotMail.identityId = "+currentIdentityId);
		}
		
		if(this.accountId != null){
			hql.append(" and obj.cotMail.nodeId.accountCfgId.id = :accountId");
			whereMap.put("accountId", this.accountId);
		}
		if(mail != null){
			if(mail.getToUrl() != null && !mail.getToUrl().equals("")){
				// 接收历史
				hql.append(" and (obj.cotMail.mailType = :reciveType");
				hql.append(" and obj.cotMail.sendUrl like :mailUrl");
				// 发件历史
				hql.append(" or obj.cotMail.mailType = :sendType");
				hql.append(" and (obj.cotMail.toUrl like :mailUrl");
				hql.append(" or obj.cotMail.ccUrl like :mailUrl");
				hql.append(" or obj.cotMail.bccUrl like :mailUrl))");
				
				whereMap.put("mailUrl", "%" + mail.getToUrl() + "%");
				whereMap.put("reciveType", MailConstants.MAIL_TYPE_RECIVE);
				whereMap.put("sendType", MailConstants.MAIL_TYPE_SEND);
			}
			if(this.attachName != null && !this.attachName.trim().equals("")){
				hql.append(" and obj.name like :name");
				whereMap.put("name", "%" + this.attachName + "%");
			}
		}
		try{
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			logger.error(e);
		}
		return Constants.JSONDATA;
	}
	
	public CotMail getMail() {
		return mail;
	}
	public void setMail(CotMail mail) {
		this.mail = mail;
	}

	public String getNodeSearchStr() {
		return nodeSearchStr;
	}

	public void setNodeSearchStr(String nodeSearchStr) {
		this.nodeSearchStr = nodeSearchStr;
	}

	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	public void setAttachName(String attachName) {
		this.attachName = attachName;
	}

	public void setShowChildMail(boolean showChildMail) {
		this.showChildMail = showChildMail;
	}

	public String getTreeLvId() {
		return treeLvId;
	}

	public void setTreeLvId(String treeLvId) {
		this.treeLvId = treeLvId;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	
}
