/**
 * 
 */
package com.sail.cot.entity;

import java.util.List;

import com.sail.cot.domain.CotModule;

/**
 * 图标对象
 *
 * @Title: 旗航外贸管理软件V8.0
 * @Description:
 * @Copyright: Copyright (c) 2011
 * @Company: 厦门市旗航软件有限公司
 * @Create Time: Nov 17, 2011 3:14:35 PM
 * @Class Name: IconNode.java
 * @author azan
 *
 */
public class IconNode {
	private String picName;//名称
	private String picPath;//路径
	private boolean use;//是否可用
	private List<CotModule> moduleList;//被哪些模块引用
	
	public String getPicName() {
		return picName;
	}
	public void setPicName(String picName) {
		this.picName = picName;
	}
	public boolean isUse() {
		return use;
	}
	public void setUse(boolean use) {
		this.use = use;
	}
	public List<CotModule> getModuleList() {
		return moduleList;
	}
	public void setModuleList(List<CotModule> moduleList) {
		this.moduleList = moduleList;
	}
	public String getPicPath() {
		return picPath;
	}
	public void setPicPath(String picPath) {
		this.picPath = picPath;
	}

	
}
