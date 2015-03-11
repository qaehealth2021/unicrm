/**
 * 
 */
package com.sail.cot.event;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.PropertyUtils;
import org.directwebremoting.WebContextFactory;
import org.hibernate.HibernateException;
import org.hibernate.event.SaveOrUpdateEvent;
import org.hibernate.event.SaveOrUpdateEventListener;
import org.hibernate.persister.entity.EntityPersister;

import com.sail.cot.constants.Constants;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Dec 30, 2011 9:44:04 AM </p>
 * <p>Class Name: MySaveOrUpdateEvent.java </p>
 * @author achui
 *
 */
public class HibernatePreInsertEvent implements SaveOrUpdateEventListener{

	/**
	 * @see 功能描述（必填）：给含有IdentityId属性的对象注入IdentityId的值
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Dec 31, 2011 4:00:20 PM</p>
	 * @param entity
	 * 返回值：void
	 */
	protected Object doInjectIdentity(Object entity,EntityPersister persister,Object[] state){
		boolean writeable = PropertyUtils.isWriteable(entity, "identityId");
		if(writeable){
			try {
				//int index = Arrays.asList(persister.getPropertyNames()).indexOf("identityId");
				//TODO:暂时默认identityId = 1
				Integer identityId = 1;
				HttpServletRequest request = WebContextFactory.get().getHttpServletRequest();
				Cookie[] cookies = request.getCookies();
				for(Cookie cookie :cookies){
					if(Constants.COOKIE_IDENTITY.equalsIgnoreCase(cookie.getName())){
						 identityId = Integer.valueOf(cookie.getValue());
						 break;
					}
				}
				//state[index] = identityId;
				//persister.setPropertyValue(entity, index, identityId, EntityMode.POJO);
				PropertyUtils.setProperty(entity, "identityId", identityId);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return entity;
	}

	/* (non-Javadoc)
	 * @see org.hibernate.event.SaveOrUpdateEventListener#onSaveOrUpdate(org.hibernate.event.SaveOrUpdateEvent)
	 */
	public void onSaveOrUpdate(SaveOrUpdateEvent event)
			throws HibernateException {
//		Object obj = this.doInjectIdentity(event.getObject(), null, null);
//		event.setObject(obj);
	}
}
