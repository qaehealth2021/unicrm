/**
 * 
 */
package com.sail.cot.action.fileSystem;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.domain.CotFileSystem;
import com.sail.cot.service.fileSystem.CotFileSystemService;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 30, 2012 5:26:57 PM </p>
 * <p>Class Name: CotFileSystemAction.java </p>
 * @author achui
 *
 */
public class CotFileSystemAction extends AbstractAction{

	
	private Integer parentId;
	private Integer fileTreeId;
	private String uploadEmpId;
	private String fileFlag;
	private Date startTime;
	private Date endTime;
	private CotFileSystem fileSystem;
	
	@Resource(name="CotFileSystemService")
	private CotFileSystemService fileSystemService;
	@Override
	public String query() {
		// TODO Auto-generated method stub
		return "query";
	}

	public String listtree(){
		CotEmps curEmps = super.getCurrEmps();
		Integer fileTreeId = 0;
		if(parentId!= null){
			fileTreeId = parentId;
		}
		jsonString = this.fileSystemService.getFileTreeJson(curEmps.getId(), fileTreeId);
		return Constants.JSONDATA;
	}
	
	public CotFileSystem getFileSystem() {
		return fileSystem;
	}

	public void setFileSystem(CotFileSystem fileSystem) {
		this.fileSystem = fileSystem;
	}

	public Integer getFileTreeId() {
		return fileTreeId;
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

	public void setFileTreeId(Integer fileTreeId) {
		this.fileTreeId = fileTreeId;
	}

	public String getUploadEmpId() {
		return uploadEmpId;
	}

	public void setUploadEmpId(String uploadEmpId) {
		this.uploadEmpId = uploadEmpId;
	}

	public String getFileFlag() {
		return fileFlag;
	}

	public void setFileFlag(String fileFlag) {
		this.fileFlag = fileFlag;
	}

	@SuppressWarnings("unchecked")
	public String list() {
		StringBuffer hql = new StringBuffer();
		hql.append("from CotFileSystem obj where 1=1");
		Map<String,Object> whereMap = new HashMap<String, Object>();
		//树节点id(个人文档/我的共享/他人共享/公告文档  显示所有 .点击其他节点只显示该节点文件)
		if(this.fileTreeId != null && this.fileTreeId!=0){
			hql.append(" and obj.fileTreeId=:fileTreeId");
			whereMap.put("fileTreeId",this.fileTreeId);
		}
		if(this.fileFlag != null && !this.fileFlag.equals("")){
			if(this.fileFlag.equals("MS")){
				//他人共享
				if(this.uploadEmpId != null && this.uploadEmpId.equals("")){
					hql.append(" and obj.fileFlag=:fileFlag");
					whereMap.put("fileFlag",this.fileFlag);
					//去掉我共享的记录
					CotEmps currEmp = this.getCurrEmps();
					//到CotFileSystemShare查询别人共享给我的记录
					List<Integer> ids=this.fileSystemService.findShareToMe(currEmp.getId());
					if(ids.size()==0){
						hql.append(" and 1=0");
					}else{
						hql.append(" and obj.id in (:ids)");
						whereMap.put("ids",ids);
					}
				}else{
					hql.append(" and obj.fileFlag in ('PS','MS')");
				}
			}else{
				hql.append(" and obj.fileFlag=:fileFlag");
				whereMap.put("fileFlag",this.fileFlag);
			}
		}
		if(this.uploadEmpId != null && !this.uploadEmpId.equals("")){
			hql.append(" and obj.updateEmpsId.id=:updateEmpsId");
			whereMap.put("updateEmpsId",Integer.parseInt(this.uploadEmpId));
		}
		
		if(this.startTime != null){
			hql.append(" and obj.addTime >= :startSmsDate");
			whereMap.put("startSmsDate", this.startTime);
		}
		if(this.endTime != null){
			hql.append(" and obj.addTime <= :endSmsDate");
			whereMap.put("endSmsDate", this.endTime);
		}
		if(this.fileSystem != null){
			//文件名称
    		if(fileSystem.getFileName()!= null && !fileSystem.getFileName().trim().equals("")){
    			hql.append(" and obj.fileName like :fileName");
    			whereMap.put("fileName", "%"+fileSystem.getFileName()+"%");
    		}
    		//文件描述
    		if(fileSystem.getFileDesc()!= null && !fileSystem.getFileDesc().trim().equals("")){
    			hql.append(" and obj.fileDesc like :fileDesc");
    			whereMap.put("fileDesc", "%"+fileSystem.getFileDesc()+"%");
    		}
		}
		hql.append(" order by obj.id desc");
		try {
			jsonString = this.getBaseSerivce().findRecords(hql.toString(), whereMap, pageData.getStart(), pageData.getLimit());
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return Constants.JSONDATA;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	
}
