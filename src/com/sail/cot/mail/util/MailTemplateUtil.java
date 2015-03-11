package com.sail.cot.mail.util;

import org.apache.velocity.VelocityContext;

import com.sail.cot.common.util.ContextUtil;

public class MailTemplateUtil {
	private static MailTemplateUtil templateUtil;
	private MailTemplateUtil(){
	}
	public static MailTemplateUtil get(){
		if(templateUtil == null)
			templateUtil = new MailTemplateUtil();
		return templateUtil;
	}
	
	public void renderDate(VelocityContext context){
		String date = ContextUtil.getCurrentFormateDate("yyyy-MM-dd");
		context.put("date", date);
	}
	
}
