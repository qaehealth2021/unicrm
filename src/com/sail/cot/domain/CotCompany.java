package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@SuppressWarnings("serial")
@Entity
@Table(name="cot_company")
public class CotCompany extends com.sail.cot.domain.IdEntity implements java.io.Serializable {

    @Column(name="identity_ID", nullable=false)
    private Integer identityId;
      
    @Column(name="company_name", length=50)
    private String companyName;
      
    @Column(name="company_name_en", length=150)
    private String companyNameEn;
      
    @Column(name="company_short_name", nullable=false, length=50)
    private String companyShortName;
      
    @Column(name="COMPANY_CORPORATION", length=50)
    private String companyCorporation;
      
    @Column(name="comapany_addr", length=100)
    private String comapanyAddr;
      
    @Column(name="company_addr_en", length=100)
    private String companyAddrEn;
      
    @Column(name="company_nbr", length=100)
    private String companyNbr;
      
    @Column(name="company_fax", length=100)
    private String companyFax;
      
    @Column(name="company_post", length=20)
    private String companyPost;
      
    @Column(name="company_web_site", length=100)
    private String companyWebSite;
      
    @Column(name="company_mail", length=100)
    private String companyMail;
      
    @Column(name="remark", length=200)
    private String remark;
      
    @Column(name="company_logo", length=200)
    private String companyLogo;
    
//    @Column(name="fax_ip_addr", length=20)
//    private String faxIpAddr;

    public CotCompany() {
    }

	public String getCompanyName() {
		return companyName;
	}

	public Integer getIdentityId() {
		return identityId;
	}

	public void setIdentityId(Integer identityId) {
		this.identityId = identityId;
	}

	public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    public String getCompanyNameEn() {
        return this.companyNameEn;
    }
    
    public void setCompanyNameEn(String companyNameEn) {
        this.companyNameEn = companyNameEn;
    }
    public String getCompanyShortName() {
        return this.companyShortName;
    }
    
    public void setCompanyShortName(String companyShortName) {
        this.companyShortName = companyShortName;
    }
    public String getCompanyCorporation() {
        return this.companyCorporation;
    }
    
    public void setCompanyCorporation(String companyCorporation) {
        this.companyCorporation = companyCorporation;
    }
    public String getComapanyAddr() {
        return this.comapanyAddr;
    }
    
    public void setComapanyAddr(String comapanyAddr) {
        this.comapanyAddr = comapanyAddr;
    }
    public String getCompanyAddrEn() {
        return this.companyAddrEn;
    }
    
    public void setCompanyAddrEn(String companyAddrEn) {
        this.companyAddrEn = companyAddrEn;
    }
    public String getCompanyNbr() {
        return this.companyNbr;
    }
    
    public void setCompanyNbr(String companyNbr) {
        this.companyNbr = companyNbr;
    }
    public String getCompanyFax() {
        return this.companyFax;
    }
    
    public void setCompanyFax(String companyFax) {
        this.companyFax = companyFax;
    }
    public String getCompanyPost() {
        return this.companyPost;
    }
    
    public void setCompanyPost(String companyPost) {
        this.companyPost = companyPost;
    }
    public String getCompanyWebSite() {
        return this.companyWebSite;
    }
    
    public void setCompanyWebSite(String companyWebSite) {
        this.companyWebSite = companyWebSite;
    }
    public String getCompanyMail() {
        return this.companyMail;
    }
    
    public void setCompanyMail(String companyMail) {
        this.companyMail = companyMail;
    }
    public String getRemark() {
        return this.remark;
    }
    
    public void setRemark(String remark) {
        this.remark = remark;
    }
    public String getCompanyLogo() {
        return this.companyLogo;
    }
    
    public void setCompanyLogo(String companyLogo) {
        this.companyLogo = companyLogo;
    }
}