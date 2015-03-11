/**
 * 
 */
package com.sail.cot.trigger;

import java.util.Iterator;
import java.util.List;

import net.sf.ehcache.Cache;
import net.sf.ehcache.Element;

import org.quartz.Job;
import org.quartz.JobExecutionContext;

import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.service.system.emp.CotLoginService;

/**
 * <p>
 * Title: 旗航ERP管理系统（QHERP）
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2010
 * </p>
 * <p>
 * Company:
 * </p>
 * <p>
 * Create Time: Nov 25, 2010 11:24:22 AM
 * </p>
 * <p>
 * Class Name: TriggerOnlineJob.java
 * </p>
 * 
 * @author achui
 * 
 */
public class TriggerOnlineJob implements Job{

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.quartz.Job#execute(org.quartz.JobExecutionContext)
	 */
	private CotLoginService cotLoginService;

	public CotLoginService getCotLoginService() {
		if (cotLoginService == null) {
			cotLoginService = (CotLoginService) ContextUtil
					.getBean("CotLoginService");
		}
		return cotLoginService;
	}
//	private ApplicationContext ctx;
//	public void setApplicationContext(ApplicationContext applicationContext) {
//		this.ctx = applicationContext;
//	}
	@Override
	public void execute(JobExecutionContext ctx){
//		CotLoginService cotLoginService = (CotLoginService) this.ctx.getBean("CotLoginService");
		Cache empCache = ContextUtil.getCacheManager("EmpCache");
		List list = empCache.getKeys();
		//System.out.println("***************缓存在线人数:"+list.size());
		Iterator<?> it = list.iterator();
		while (it.hasNext()) {
			String key = (String) it.next();
			Element element = empCache.get(key);
			if (element != null) {
				Integer lastLoginTime = (Integer) element.getObjectValue();
				//System.out.println("-----随机数:"+key);
				//System.out.println("后台调用时间"+new Date(System.currentTimeMillis()));
				System.out.println("当前:" + lastLoginTime);
				if (lastLoginTime < -4) {
					// 删除数据库的登录记录
					this.getCotLoginService().deleteLoginInfos(key);
					// 删除Map中的登录记录
					empCache.remove(key);
					System.out.println("删除在线记录成功");
				} else {
					//System.out.println("-------后台 -1="+ (lastLoginTime - 1));
					Element elementNew = new Element(key, lastLoginTime - 1);
					empCache.put(elementNew);
				}
			}
		}
		//System.out.println("*************后台调用结束");
	}
}
