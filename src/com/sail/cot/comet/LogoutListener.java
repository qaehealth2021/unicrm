/**
 * 
 */
package com.sail.cot.comet;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.comet4j.core.CometConnection;
import org.comet4j.core.event.DropEvent;
import org.comet4j.core.listener.DropListener;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotEmps;
import com.sail.cot.service.system.emp.CotLoginService;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Aug 11, 2011 3:38:53 PM </p>
 * <p>Class Name: LogoutListener.java </p>
 * @author achui
 *
 */
public class LogoutListener extends DropListener {

	/* (non-Javadoc)
	 * @see org.comet4j.event.Listener#handleEvent(org.comet4j.event.Event)
	 */
	@Override
	public boolean handleEvent(DropEvent cEvent) {
		CometConnection conn = cEvent.getConn();
		String connectId = conn.getId();
		HttpSession session = conn.getRequest().getSession();
		CotEmps emp = (CotEmps)session.getAttribute(Constants.SESSION_EMP);
		System.out.println("======================="+emp.getEmpsId()+"下线了！");
//		OnlineEmpCometUtil.getInstance().remove(emp.getId().toString(), connectId);
		Map dto = new HashMap();
		dto.put("msg", emp.getEmpsId()+"下线了！");
		
		CotLoginService serv=(CotLoginService) ContextUtil.getBean("CotLoginService");
//		serv.deleteLoginInfos(session.getId());
//		serv.setLoginEmpCache(emp.getId().toString(),conn.getId(), true,session.getId());
		try {
			serv.logDo(emp,conn.getRequest());
		} catch (DAOException e) {
			e.printStackTrace();
		}
		cEvent.getTarget().sendToAll(Constants.UNICRM_APP_CHANNEL, dto);
		return true;
	}

}
