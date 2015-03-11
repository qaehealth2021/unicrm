/**
 * 
 */
package com.sail.cot.service.fileSystem;

import java.util.List;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.service.BaseSerivce;
import com.sail.cot.domain.CotFileSystem;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 30, 2012 6:02:34 PM </p>
 * <p>Class Name: CotFileSystemService.java </p>
 * @author achui
 *
 */
public interface CotFileSystemService extends BaseSerivce{
	
	/**
	 * @see 功能描述（必填）：根据业务员获取对应的文件树
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 31, 2012 9:22:58 AM</p>
	 * @param empsId  所属业务员
	 * @param fileTreeId 文件树Id
	 * @return
	 * 返回值：String
	 */
	public String getFileTreeJson(Integer empsId,Integer fileTreeId);
	
	/**
	 * @see 功能描述（必填）：删除硬盘上的文件
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 31, 2012 3:08:04 PM</p>
	 * @param filePath 文件路径
	 * 返回值：void
	 */
	public void removeDiskFile(String filePath);
	
	/**
	 * 删除文档文件,并删除他在硬盘中的文件
	 * @Method: deleteFile
	* @Description: 
	* @param ids
	* @throws Exception : void
	 */
	public void deleteFile(List<Integer> ids)throws Exception;
	
	public List<CotFileSystem> getCotFileSystemList(List<Integer> ids);
	
	public void saveFileShares(Integer[] fileSystemIds,Integer[] emps) throws DAOException;
	
	public void deleteFileShares(Integer[] fileSystemIds,Integer[] emps) throws DAOException;
	
	public void saveShareCommon(List<Integer> fileSystemIds,boolean flag) throws DAOException;
	
	public List<Integer> findShareToMe(Integer empId);
}
