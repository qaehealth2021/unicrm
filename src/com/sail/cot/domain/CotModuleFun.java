package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@SuppressWarnings("serial")
@Entity
@Table(name="cot_module_fun")
public class CotModuleFun extends com.sail.cot.domain.IdEntity implements java.io.Serializable {

    @Column(name="module_ID", nullable=false)
    private Integer moduleId;
      
    @Column(name="fun_name", nullable=false, length=50)
    private String funName;
      
    @Column(name="fun_validurl", length=100)
    private String funValidurl;
      
    @Column(name="fun_icon", length=100)
    private String funIcon;
      
    @Column(name="fun_type", length=16)
    private String funType;

    public CotModuleFun() {
    }


    public Integer getModuleId() {
		return moduleId;
	}

	public void setModuleId(Integer moduleId) {
		this.moduleId = moduleId;
	}


	public String getFunName() {
        return this.funName;
    }
    
    public void setFunName(String funName) {
        this.funName = funName;
    }
    public String getFunValidurl() {
        return this.funValidurl;
    }
    
    public void setFunValidurl(String funValidurl) {
        this.funValidurl = funValidurl;
    }
    public String getFunIcon() {
        return this.funIcon;
    }
    
    public void setFunIcon(String funIcon) {
        this.funIcon = funIcon;
    }


	public String getFunType() {
		return funType;
	}


	public void setFunType(String funType) {
		this.funType = funType;
	}
}