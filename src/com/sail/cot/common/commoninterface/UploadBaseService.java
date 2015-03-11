/**
 * 
 */
package com.sail.cot.common.commoninterface;

import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;

import com.sail.cot.common.exception.ServiceException;

/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:上传接口，如果有上传的需要，需要实现该接口</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Sep 16, 2010 5:52:33 PM </p>
 * <p>Class Name: UploadBaseService.java </p>
 * @author achui
 *
 */
public interface UploadBaseService {

	
	/**
	 * 描述：
	 * @param fileItem
	 * @param uploadPath 存放文件的路径
	 * @param tbName 需要保持的表
	 * @param id	主键
	 * @param field 更新字段
	 * @param fkIdVal	关联的外键的值
	 * @param fkField 更新的外键字段
	 * @param doDbOp 是否做数据库操作，false：只做上传操作，不做数据库操作，true需要做数据库操作
	 * 
	 * @return
	 * @throws ServiceException
	 * 返回值：Object
	 */
	public Object upload(FileItem fileItem,String uploadPath,String tbName,
			String id,String field,String fkIdVal,String fkField,boolean doDbOp,String paramJson,boolean isRName,HttpSession session) throws ServiceException;
	
	/**
	 * 描述：获取文件的上传路径
	 * @param category 上传的分类，如客户，就输入cust则就创建一个cust文件夹
	 * @param bGenDateDir 是否按日期来创建文件夹,true:按日期窗，false:直接放在category文件夹下
	 * @return
	 * 返回值：String
	 */
	public String getUploadPath(String category,boolean bGenDateDir);
	
	/**
	 * @see 功能描述（必填）：删除上传的文件
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 22, 2012 3:04:53 PM</p>
	 * @param path 文件路径
	 * @return
	 * 返回值：String
	 */
	public String deleteUploadFile(String path);
}
