/**
 * 
 */
package com.sail.cot.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.map.MultiValueMap;
import org.comet4j.core.CometConnection;
import org.comet4j.core.CometContext;
import org.comet4j.core.CometEngine;

import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
import com.zhao.mail.util.CommonUtil;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:在线员工消息推送服务</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Aug 11, 2011 11:11:13 AM </p>
 * <p>Class Name: OnlineEmpsUtil.java </p>
 * @author achui
 *
 */
public class OnlineEmpCometUtil {
	/**
	 * MultiValueMap
	 * onlineMap:当前在线人数的Map,key：对应员工ID
	 */
	//private static MultiValueMap onlineMap;
	/**
	 * MultiValueMap
	 * connectionMap:保存当前在线连接数的map，可以对应员工ID
	 */
	private static MultiValueMap connectionMap;
	private static OnlineEmpCometUtil instance;
	
	public static OnlineEmpCometUtil getInstance() {
		if (instance == null) {
			instance = new OnlineEmpCometUtil();
			//onlineMap = new MultiValueMap();
			connectionMap = new MultiValueMap();
		}
		return instance;
	}
	public void put(String key, Object value) {
		connectionMap.put(key, value);
	}

	public Object get(String key) {
		return connectionMap.get(key);
	}

	public MultiValueMap getMap() {
		return connectionMap;
	}
	
	public void remove(String key,Object value){
		connectionMap.remove(key, value);
	}

	public void destroy() {
		connectionMap.clear();
		connectionMap = null;
	}
	
	/**
	 * 描述：像指定的员工发消息
	 * @param empId 指定的业务员
	 * @param sendToAll 是否全体发送（只针对在线）
	 * @param msg 消息内容
	 * 返回值：void
	 */
	public void saveAndSendMsg(CotEmps person,String empIds,boolean sendToAll,String msg){
		CometEngine engine = CometContext.getInstance().getEngine();
		Map dto = new HashMap();
		dto.put("person", person);
		dto.put("time", CommonUtil.getFormatTime("yyyy-MM-dd HH:mm:ss",null));
		dto.put("msg", msg);
		if(sendToAll)
			engine.sendToAll(Constants.UNICRM_APP_CHANNEL, dto);
		else {
			if(empIds!=null){
				String[] empIdList = empIds.split(",");
				for(String empId : empIdList ){
					List revList = (List)OnlineEmpCometUtil.getInstance().get(empId.toString());
					if(revList == null) return;
					List<CometConnection> listConnection = new ArrayList<CometConnection>();
					for(int j=0; j<revList.size() ;j++){
						listConnection.add(engine.getConnection(revList.get(j).toString()));
					}
					engine.sendTo(Constants.UNICRM_APP_CHANNEL, listConnection, dto);
				}
			}
		}
	}
}
