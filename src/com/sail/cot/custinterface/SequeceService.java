/**
 * 
 */
package com.sail.cot.custinterface;

import net.sf.json.JSONObject;

import com.jason.core.exception.DAOException;
import com.sail.cot.seq.NoService;

/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:单号设置，如果有单号设置的需要，需要实现该接口</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Sep 16, 2010 5:52:33 PM </p>
 * <p>Class Name: UploadBaseService.java </p>
 * @author zlw
 *
 */
public interface SequeceService extends NoService {

	/**
	 * 描述：获取对应单据的单号
	 * @param obj 传递过来的对象，一般是指表单对象
	 * @param type  单据类型，如order，orderfac等
	 * @param currdate 对应单据的下单时间(可以为null)
	 * @param extraJsonParams 其他额外的参数，可能是充其他表过来，或者通过某种规则生成的，用json表示
	 * 						  json的命名方式按如下规则进行
	 * 						  e.g {
	 * 								"property1":"XXXX" //其中propertyn必须在express中体现,若没体现，则默认不处理
	 * 								"property2":"XXXX" 
	 * 								...
	 * 								"propertyn":"XXXX"
	 * 							  }
	 * @return 对应单据的单号
	 * 返回值：String
	 */
	public String getAllNo(Object obj,String type,String currdate,JSONObject extraJsonParams);
	
	/**
	 * 描述： 当单据保存完后，更新当前序列号
	 * @param type 单据类型，如order,orderfac等
	 * 返回值：void
	 * @throws DAOException 
	 */
	public Integer saveSeq(String type);
	
	/**
	 * @see 功能描述（必填）：获取当前类别的序列号
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:May 14, 2012 10:43:55 AM</p>
	 * @param type
	 * @return
	 * 返回值：Integer
	 */
	public Integer getCurrSeq(String type);
	
	public void saveCurrentSeq(String type,Integer currentSeq);
	
}
