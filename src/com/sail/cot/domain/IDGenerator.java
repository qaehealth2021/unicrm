/**
 * 
 */
package com.sail.cot.domain;

import java.io.Serializable;

import org.apache.commons.lang.RandomStringUtils;
import org.hibernate.engine.SessionImplementor;
import org.hibernate.id.UUIDHexGenerator;

/**
 * <p>Title: 旗航ERP管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2010</p>
 * <p>Company: </p>
 * <p>Create Time: Mar 3, 2011 5:46:14 PM </p>
 * <p>Class Name: IDGenerator.java </p>
 * @author achui
 *
 */
public class IDGenerator extends UUIDHexGenerator{

	@Override
	public Serializable generate(SessionImplementor session, Object obj) {
		//生成以字母开头的UUID
		Serializable id =  super.generate(session, obj);
		String newId = id.toString();
		newId = newId.substring(1);
		newId = RandomStringUtils.randomAlphabetic(1).toLowerCase()+newId;
		return newId;
	}

	
}
