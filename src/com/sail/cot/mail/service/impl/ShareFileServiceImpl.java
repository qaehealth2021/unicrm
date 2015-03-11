/**
 * 
 */
package com.sail.cot.mail.service.impl;

import java.io.File;

import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileItem;
import org.springframework.stereotype.Service;

import com.sail.cot.common.exception.ServiceException;
import com.sail.cot.common.util.ExceptionStackTracePaser;
import com.sail.cot.common.util.StringUtil;
import com.sail.cot.mail.service.ShareFileService;
import com.sail.cot.mail.util.MailConstants;
import com.zhao.mail.util.MailServiceConstants;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 22, 2012 2:43:42 PM </p>
 * <p>Class Name: ShareFileServiceImpl.java </p>
 * @author achui
 *
 */
@Service("ShareFileService")
public class ShareFileServiceImpl implements ShareFileService {

	@Override
	public String getUploadPath(String category, boolean genDateDir) {
		if(category.lastIndexOf("/") != category.length() -1)
			category += "/";
		return category;
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.common.commoninterface.UploadBaseService#upload(org.apache.commons.fileupload.FileItem, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, boolean, java.lang.String, boolean, javax.servlet.http.HttpSession)
	 */
	@Override
	public Object upload(FileItem fileItem, String uploadPath, String tbName,
			String id, String field, String fkIdVal, String fkField,
			boolean doDbOp, String paramJson, boolean isRName,
			HttpSession session) throws ServiceException {
		String fileName = StringUtil.takeOutFileName(fileItem.getName());
		String path = MailConstants.MAIL_SHARE_ATTACH_PATH;
		
		File pf = new File(MailServiceConstants.MAIL_FILE_BASEPATH + path);
		if (!pf.exists())
			pf.mkdirs();
		File file = new File(MailServiceConstants.MAIL_FILE_BASEPATH + path + fileName);
		// 上传文件
		try {
			fileItem.write(file);
		} catch (Exception e) {
			String msg = ExceptionStackTracePaser.paserStactTrace(e);
			throw new ServiceException("文件上传异常：" + msg);
		}
		
		// 上传获取文件名
		JSONObject json = new JSONObject();
		json.put("fileName", fileName);
		json.put("success", true);
		return json.toString();
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.common.commoninterface.UploadBaseService#deleteUploadFile(java.lang.String)
	 */
	@Override
	public String deleteUploadFile(String path) {
		// TODO Auto-generated method stub
		return null;
	}

}
