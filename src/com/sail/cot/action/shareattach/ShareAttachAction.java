/**
 * 
 */
package com.sail.cot.action.shareattach;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.io.FileUtils;

import com.sail.cot.common.AbstractAction;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.vo.CotShareFile;
import com.sail.cot.mail.util.MailConstants;
import com.sail.cot.util.GridServerHandler;
import com.zhao.mail.util.MailServiceConstants;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 19, 2012 5:06:41 PM </p>
 * <p>Class Name: ShareAttachAction.java </p>
 * @author achui
 *
 */
public class ShareAttachAction extends AbstractAction{

	@Override
	public String query() {
		return "query";
	}
	
	public String list(){
		
		String sharePath = MailServiceConstants.MAIL_FILE_BASEPATH +MailConstants.MAIL_SHARE_ATTACH_PATH;
		File fileDictioary = new File(sharePath);
		if(!fileDictioary.exists()){
			fileDictioary.mkdir();
		}
		//获取文件夹下面所有的文件
		Iterator<File> iterator = FileUtils.iterateFiles(fileDictioary, null, false);
		List<CotShareFile> list = new ArrayList<CotShareFile>();
		while(iterator.hasNext()){
			CotShareFile shareFile = new CotShareFile();
			File file = iterator.next();
			String path = file.getPath().replace("\\", "/");
			path = path.replace(MailServiceConstants.MAIL_FILE_BASEPATH, "");
			shareFile.setFileName(file.getName());
			shareFile.setFilePath(path);
			shareFile.setFileAbsoutePath(file.getAbsolutePath());
			shareFile.setFileSize(file.length());
			list.add(shareFile);
		}
		GridServerHandler handler = new GridServerHandler();
		handler.setData(list);
		handler.setTotalCount(list.size());
		jsonString = handler.getLoadResponseText();
		return Constants.JSONDATA;
	}
}
