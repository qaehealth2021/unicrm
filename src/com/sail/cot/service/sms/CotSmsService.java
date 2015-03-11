/**
 * 
 */
package com.sail.cot.service.sms;

import com.jason.core.exception.DAOException;
import com.jasson.im.api.RPTItem;
import com.sail.cot.common.service.BaseSerivce;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 11, 2012 5:28:46 PM </p>
 * <p>Class Name: CotSmsService.java </p>
 * @author achui
 *
 */
public interface CotSmsService extends BaseSerivce{

	/**
     * 发送短信。
     *
     * @param mobiles 短信发送的所有目的手机号码构成的数组
     * @param content 短信内容(编码为GB)，超过2000个字符部分会被截断
     * @param smID    短信ID，0到99999999中的某一整数。确保唯一后可以用来找到对应的回执、回复
     * @param srcID   终端源地址 
     * @param url     Wap短信的url地址,不能超过100个字符
     * @return 整数。0=成功,其他：失败
     */
	public int sentSM(String[] mobiles, String content, long smID);
	
	public  RPTItem[] getRPTItem(int smId,String mobile);
	
	/**
	 * 保存发送短信
	 * @Method: saveSms
	* @Description: 
	* @param contactIds
	* @param orderNo
	* @param statusId
	* @param remark
	* @param content : void
	* @return 整数。0=成功,其他：失败
	 */
	public int saveSms(Integer[] contactIds, String orderNo,Integer statusId,String remark,String airRemark,String content)throws DAOException;
	
	public boolean saveOtherSms(Integer[] contactIds, String nbrs, String orderNo,Integer statusId,String remark,String airRemark,String content) throws DAOException;
	
	public String sendSms(String mobile,String msg) throws Exception;

}
