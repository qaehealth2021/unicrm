package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@SuppressWarnings("serial")
@Entity
@Table(name="cot_dept")
public class CotDept extends com.sail.cot.domain.IdEntity implements java.io.Serializable {

	@ManyToOne
	@JoinColumn(name="company_ID")
    private CotCompany companyId;
      
    @Column(name="dept_name", nullable=false, length=50)
    private String deptName;
      
    @Column(name="remark", length=100)
    private String remark;
     
    @Column(name="identity_id")
	private Integer identityId;
    
    public Integer getIdentityId() {
		return identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public CotDept() {
    }

	public CotCompany getCompanyId() {
		return companyId;
	}

	public void setCompanyId(CotCompany companyId) {
		this.companyId = companyId;
	}

	public String getDeptName() {
        return this.deptName;
    }
    
    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }
    public String getRemark() {
        return this.remark;
    }
    
    public void setRemark(String remark) {
        this.remark = remark;
    }

}