package com.sail.cot.domain;

import java.io.File;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.constants.Constants;


@SuppressWarnings("serial")
@Entity
@Table(name="cot_module")
public class CotModule extends com.sail.cot.domain.IdEntity implements java.io.Serializable {

    @Column(name="MODULE_PARENT")
    private Integer parentId;
      
    @Column(name="MODULE_NAME", nullable=false, length=30)
    private String moduleName;
      
    @Column(name="MODULE_URL", nullable=false, length=200)
    private String moduleUrl;
      
    @Column(name="MODULE_IMGURL", length=50)
    private String moduleImgurl;
      
    @Column(name="MODULE_LV", nullable=false, precision=10, scale=0)
    private Long moduleLv;
      
    @Column(name="MODULE_TYPE", nullable=false, length=10)
    private String moduleType;
      
    @Column(name="MODULE_ORDER", precision=10, scale=0)
    private Long moduleOrder;
      
    @Column(name="MODULE_FLAG", nullable=false, length=10)
    private String moduleFlag;
      
    @Column(name="MODULE_VALIDURL", nullable=false, length=100)
    private String moduleValidurl;
    
    @Transient
    private List<CotModule> children;
      
    public CotModule() {
    }

    public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getModuleName() {
        return this.moduleName;
    }
    
    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }
    public String getModuleUrl() {
    	return this.moduleUrl;
    }
    
    public void setModuleUrl(String moduleUrl) {
    	 this.moduleUrl = moduleUrl;
    	
    }
//    public String getModuleImgurl() {
//        return this.moduleImgurl;
//    }
    
    public String getModuleImgurl() {
		if(this.moduleImgurl==null)
			return "common/images/zwtp.png";
    	else{
    		String tomcatUploadServer = "";
    		if(ContextUtil.isLoadBalnace()){
    			tomcatUploadServer = ContextUtil.getTomcatHome();
    		}
    		return tomcatUploadServer + File.separator +Constants.DEFAULT_UPLOAD_PROJ+ File.separator + Constants.ICON + File.separator+this.moduleImgurl;
    	}
	}
    
    public void setModuleImgurl(String moduleImgurl) {
        this.moduleImgurl = moduleImgurl;
    }
    public Long getModuleLv() {
        return this.moduleLv;
    }
    
    public void setModuleLv(Long moduleLv) {
        this.moduleLv = moduleLv;
    }
    public String getModuleType() {
        return this.moduleType;
    }
    
    public void setModuleType(String moduleType) {
        this.moduleType = moduleType;
    }
    public Long getModuleOrder() {
        return this.moduleOrder;
    }
    
    public void setModuleOrder(Long moduleOrder) {
        this.moduleOrder = moduleOrder;
    }
    public String getModuleFlag() {
        return this.moduleFlag;
    }
    
    public void setModuleFlag(String moduleFlag) {
        this.moduleFlag = moduleFlag;
    }
    public String getModuleValidurl() {
        return this.moduleValidurl;
    }
    
    public void setModuleValidurl(String moduleValidurl) {
        this.moduleValidurl = moduleValidurl;
    }

	public List<CotModule> getChildren() {
		return children;
	}

	public void setChildren(List<CotModule> children) {
		this.children = children;
	}
}