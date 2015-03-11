/**
 * 
 */
package com.sail.cot.service.fax;

import java.io.UnsupportedEncodingException;
import java.util.List;

import com.jason.core.exception.DAOException;


/**
 * *********************************************
* @Copyright :(C),2008-2010
* @CompanyName :厦门市旗航软件有限公司(www.xmqh.net)
* @Version :1.0
* @Date :2012-10-9
* @author : azan
* @class :CotFaxService.java
* @Description :
 */
public interface CotFaxService {
	
	/**
	 * 返回该员工的服务器路径
	 * @Method: getRealSendFile
	* @Description: 
	* @param sendFile
	* @param empsId
	* @return : String
	 */
	public String getRealSendFile(String sendFile,Integer empsId)throws UnsupportedEncodingException;
	
	/**
	 * 调用存储过程同步 传真数据到员工对应的数据库
	 * @Method: callProc
	* @Description: 
	* @param faxSendId
	* @param empsId
	* @throws DAOException : void
	 */
	public void callProc(Integer faxSendId,Integer empsId)throws DAOException;
	
	/**
	 * 重新发送传真
	 * @Method: saveFaxAndSendAgain
	* @Description: 
	* @param faxSendId : void
	 */
	public void saveFaxAndSendAgain(Integer faxSendId)throws Exception;
	
	/**
	 * // 往订单单号表中插入一条数据,用于关联订单时查找
	 * @Method: saveOrderNo
	* @Description: 
	* @param orderNo : void
	 */
	public void saveOrderNo(String orderNo)throws DAOException;
	
	/**
	 * 关联接收的传真的订单号,客户,状态,备注
	 * @Method: updateFaxrecvs
	* @Description: 
	* @param list<String>
	* @param orderNo
	* @param remark
	* @param customerId
	* @param statusId
	* @throws Exception : void
	 */
	public void updateFaxrecvs(List<String> list,String orderNo,String remark,String airRemark,Integer customerId,Integer statusId,Integer empsId,String pol,String pod)throws Exception;
	
	/**
	 * 发送传真后 保存订单号和调用存储过程
	 * @Method: saveAfterFaxSend
	* @Description: 
	* @param orderNo
	* @param faxSendId
	* @param empsId
	* @throws DAOException : void
	 */
	public void saveAfterFaxSend(String orderNo,Integer faxSendId,Integer empsId)throws DAOException;
	
	/**
	 * 根据客户查找他的联系人的跟进人
	 * @Method: getEmpFromCustId
	* @Description: 
	* @param custId
	* @return : List
	 */
	public List getEmpFromCustId(Integer custId);
	
	/**
	 * 更改传真的 已读标识 
	 * @Method: updateFaxRecvFlag
	* @Description: 
	* @param recvId
	* @param state
	* @return
	* @throws DAOException : boolean
	 */
	public boolean updateFaxRecvFlag(Integer recvId,Integer state) throws DAOException;
}
