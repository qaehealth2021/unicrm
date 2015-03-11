package com.sail.cot.domain;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@SuppressWarnings("serial")
@Entity
@Table(name="cot_identity")
public class CotIdentity extends com.sail.cot.domain.IdEntity implements java.io.Serializable {

    @Column(name="identity_code", nullable=false, length=16)
    private String identityCode;
      
    @Column(name="identity_flag", nullable=false, length=1)
    private String identityFlag;
      
    public CotIdentity() {
    }

    public CotIdentity(String identityCode, String identityFlag) {
        this.identityCode = identityCode;
        this.identityFlag = identityFlag;
    }
    
    public CotIdentity(String identityCode, String identityFlag, Set<CotCompany> cotCompanies) {
        this.identityCode = identityCode;
        this.identityFlag = identityFlag;
    }

   
    public String getIdentityCode() {
        return this.identityCode;
    }
    
    public void setIdentityCode(String identityCode) {
        this.identityCode = identityCode;
    }
    public String getIdentityFlag() {
        return this.identityFlag;
    }
    
    public void setIdentityFlag(String identityFlag) {
        this.identityFlag = identityFlag;
    }
}