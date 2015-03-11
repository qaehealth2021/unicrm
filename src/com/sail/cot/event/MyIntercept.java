/**
 * 
 */
package com.sail.cot.event;

import java.io.Serializable;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.PropertyUtils;
import org.directwebremoting.WebContextFactory;
import org.hibernate.CallbackException;
import org.hibernate.EmptyInterceptor;
import org.hibernate.type.Type;

import com.sail.cot.constants.Constants;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Jan 3, 2012 11:29:11 AM </p>
 * <p>Class Name: MyIntercept.java </p>
 * @author achui
 *
 */
public class MyIntercept extends EmptyInterceptor{

	@Override
	public boolean onSave(Object entity, Serializable id, Object[] state,
			String[] propertyNames, Type[] types) {
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
		return super.onSave(entity, id, state, propertyNames, types);
	}

	@Override
	public void onCollectionUpdate(Object collection, Serializable key)
			throws CallbackException {
		// TODO Auto-generated method stub
		System.out.println(collection.getClass().getSimpleName()+"key:"+key);
		super.onCollectionUpdate(collection, key);
	}
	
	

}
