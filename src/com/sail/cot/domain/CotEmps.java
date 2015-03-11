package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@SuppressWarnings("serial")
@Entity
@Table(name="cot_emps")
public class CotEmps extends com.sail.cot.domain.IdEntity implements java.io.Serializable {
     
	@ManyToOne
	@JoinColumn(name="dept_ID")
    private CotDept deptId;
      
    @Column(name="emps_name", length=20)
    private String empsName;
      
    @Column(name="emp_name_cn", length=20)
    private String empNameCn;
      
    @Column(name="EMPS_PWD", nullable=false, length=20)
    private String empsPwd;
      
    @Column(name="EMPS_ID", nullable=false, length=20)
    private String empsId;
      
    @Column(name="EMPS_STATUS", nullable=false, precision=1, scale=0)
    private Long empsStatus;
      
    @Column(name="EMPS_REMARK", length=200)
    private String empsRemark;
      
    @Column(name="EMPS_PHONE", length=100)
    private String empsPhone;
      
    @Column(name="EMPS_Mobile", length=100)
    private String empsMobile;
     
    @ManyToOne
	@JoinColumn(name="company_id")
    private CotCompany companyId;
    
    @Column(name="identity_id")
	private Integer identityId;
    
    @Column(name="month_sms")
   	private Integer monthSms;
    
    @Column(name="DESK_URL", length=100)
    private String deskUrl;
    
    @Column(name="X_LITE", length=50)
    private String xlite;
    
    @ManyToOne
	@JoinColumn(name="Fax_Map_Id")
    private CotFaxdeviceMap faxMapId;
    
    public Integer getIdentityId() {
		return identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public CotEmps() {
    }

	public CotEmps(Integer id) {
		super.setId(id);
    }
	
    public String getEmpsName() {
        return this.empsName;
    }
    
    public Integer getMonthSms() {
		return monthSms;
	}

	public String getXlite() {
		return xlite;
	}

	public void setXlite(String xlite) {
		this.xlite = xlite;
	}

	public void setMonthSms(Integer monthSms) {
		this.monthSms = monthSms;
	}

	public void setEmpsName(String empsName) {
        this.empsName = empsName;
    }
    public String getEmpNameCn() {
        return this.empNameCn;
    }
    
    public void setEmpNameCn(String empNameCn) {
        this.empNameCn = empNameCn;
    }
    public String getEmpsPwd() {
        return this.empsPwd;
    }
    
    public String getDeskUrl() {
		return deskUrl;
	}

	public void setDeskUrl(String deskUrl) {
		this.deskUrl = deskUrl;
	}

	public void setEmpsPwd(String empsPwd) {
        this.empsPwd = empsPwd;
    }
    public String getEmpsId() {
        return this.empsId;
    }
    
    public void setEmpsId(String empsId) {
        this.empsId = empsId;
    }
    public Long getEmpsStatus() {
        return this.empsStatus;
    }
    
    public void setEmpsStatus(Long empsStatus) {
        this.empsStatus = empsStatus;
    }
    public String getEmpsRemark() {
        return this.empsRemark;
    }
    
    public void setEmpsRemark(String empsRemark) {
        this.empsRemark = empsRemark;
    }
    public String getEmpsPhone() {
        return this.empsPhone;
    }
    
    public void setEmpsPhone(String empsPhone) {
        this.empsPhone = empsPhone;
    }
    public String getEmpsMobile() {
        return this.empsMobile;
    }
    
    public void setEmpsMobile(String empsMobile) {
        this.empsMobile = empsMobile;
    }

	public CotDept getDeptId() {
		return deptId;
	}

	public void setDeptId(CotDept deptId) {
		this.deptId = deptId;
	}

	public CotCompany getCompanyId() {
		return companyId;
	}

	public void setCompanyId(CotCompany companyId) {
		this.companyId = companyId;
	}

	public CotFaxdeviceMap getFaxMapId() {
		return faxMapId;
	}

	public void setFaxMapId(CotFaxdeviceMap faxMapId) {
		this.faxMapId = faxMapId;
	}

}