/*
 * Created on 2005-4-8
 * History:
 *    2005-4-8  龙良华 初次编码实现
 *    2005-4-18 张吉文 整理代码，添加JavaDoc
 */
package com.jasson.im.api;


/**
 * 用于保存一条MT短信的短信回执信息。
 * 
 * @since  JDK 1.4.1
 * @version 2.2
 */

public class RPTItem 
{
	/*回执id*/
	private int id;
	/*MT短信所发送的手机号码。*/
	private String mobile;
	/*MT短信的短信编号。*/
	private long smID;
	/*回执编码。*/
	private int code;
	/*回执的描述信息。*/
	private String desc;
	/** 回执时间 */
	private String rptTime;
	
	
	/**
	 * 获得回执编码。
	 * 
	 * @return int 回执编码。
	 */
	public int getCode() 
	{
		return this.code;
	}
	
	
	/**
	 * 设置回执编码。
	 * 
	 * @param code 回执编码。
	 */
	public void setCode(int code) 
	{   	
		this.code = code;
	}
	
	
	/**
	 * 获得回执的描述信息。
	 * 
	 * @return String 回执的描述信息。
	 */
	public String getDesc() 
	{
		return this.desc;
	}
	
	
	/**
	 * 设置回执的描述信息。
	 * 
	 * @param desc 回执的描述信息。
	 */
	public void setDesc(String desc) 
	{  
		this.desc =  desc;
	}
	
	
	/**
	 * 获得MT短信所发送的手机号码。
	 * 
	 * @return String MT短信所发送的手机号码。
	 */
	public String getMobile() 
	{
		return this.mobile;
	}
	
	
	/**
	 * 设置MT短信所发送的手机号码。 
	 * 
	 * @param mobile MT短信所发送的手机号码。 
	 */
	public void setMobile(String mobile) 
	{
		this.mobile = mobile;
	}
	
	
	/**
	 * 获得MT短信的短信编号。
	 * 
	 * @return long MT短信的短信编号。
	 */
	public long getSmID() 
	{
		return this.smID;
	}
	
	
	/**
	 * 设置MT短信的短信编号。
	 * 
	 * @param smID MT短信的短信编号。
	 */
	public void setSmID(long smID) 
	{
		this.smID = smID;
	}


	/**
	 * 获得回执时间
	 * @return rptTime 回执时间 （格式：yyyy-MM-dd HH:mm:ss）
	 */
	public String getRptTime()
	{
		return rptTime;
	}


	/**
	 * 设置回执时间
	 * @param rptTime
	 */
	public void setRptTime(String rptTime)
	{
		this.rptTime = rptTime;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}
	 
}
