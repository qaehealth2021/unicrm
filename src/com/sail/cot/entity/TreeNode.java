/**
 * 
 */
package com.sail.cot.entity;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.custinterface.TreeParent;

/**
 * <p>Title: Ext+DWR+Spring</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * <p>Company: </p>
 * <p>Create Time: Jul 17, 2008 5:51:07 PM </p>
 * <p>Class Name: TreeNode.java </p>
 * @author achui
 *
 */
public class TreeNode extends BaseTreeNode implements TreeParent{
	private String imgUrl;
	private boolean checked = false;
	public String getImgUrl() {
		if(this.imgUrl==null)
			return "common/images/zwtp.png";
    	else
    		return File.separator +Constants.DEFAULT_UPLOAD_PROJ+ File.separator + Constants.ICON + File.separator+this.imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public boolean getLeafStatus(Object parent) throws ServiceException {
		BaseSerivce baseSerivce = (BaseSerivce)ContextUtil.getBean("BaseService");
		if(parent == null) throw new ServiceException("parent参数不能为空");
		String hql = "from CotModule obj where obj.parentId=:parentId";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("parentId",Integer.valueOf(parent.toString()));
		List res = baseSerivce.findRecordByHql(hql, whereMap);
		return CollectionUtils.isEmpty(res) == true ? true:false;
	}
	public boolean isChecked() {
		return checked;
	}
	public void setChecked(boolean checked) {
		this.checked = checked;
	}   
}