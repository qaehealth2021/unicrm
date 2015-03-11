/**
 * 
 */
package com.sail.cot.comet;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.comet4j.core.CometConnection;
import org.comet4j.core.event.ConnectEvent;
import org.comet4j.core.listener.ConnectListener;

import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.service.system.emp.CotLoginService;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:上线监听器</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Aug 11, 2011 3:22:38 PM </p>
 * <p>Class Name: LoginListener.java </p>
 * @author achui
 *
 */
public class LoginListener extends ConnectListener{
	@Override
	public boolean handleEvent(ConnectEvent cEvent) {
		CometConnection conn = cEvent.getConn();
		HttpSession session = conn.getRequest().getSession();
		CotEmps emp = (CotEmps)session.getAttribute(Constants.SESSION_EMP);
		System.out.println("======================="+emp.getEmpsId()+"上线了！");
		//缓存当前连接
//		OnlineEmpCometUtil.getInstance().put(emp.getId().toString(), conn.getId());
		CotLoginService serv=(CotLoginService) ContextUtil.getBean("CotLoginService");
//		serv.setLoginEmpCache(emp.getId().toString(),conn.getId(), false,session.getId());
		Map dto = new HashMap();
		dto.put("msg", emp.getEmpsId()+"上线了！");
		cEvent.getTarget().sendToAll(Constants.UNICRM_APP_CHANNEL, dto);
		return true;
	}

}
