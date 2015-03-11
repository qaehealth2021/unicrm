package com.sail.cot.domain;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@SuppressWarnings("serial")
@Entity
@Table(name="cot_nation")
public class CotNation extends com.sail.cot.domain.IdEntity implements java.io.Serializable {
      
    @Column(name="NATION_SHORT", length=20)
    private String nationShort;
      
    @Column(name="NATION_CN", length=100)
    private String nationCn;
      
    @Column(name="NATION_NAME", length=100)
    private String nationName;
      
    @Column(name="NATION_CODE", length=10)
    private String nationCode;
      
    @Column(name="NATION_REMARK", length=100)
    private String nationRemark;
    
    @ManyToOne
	@JoinColumn(name = "AREA_ID")
	private CotArea areaId;
      

    public CotNation() {
    }

    
    public CotNation(String nationShort, String nationCn, String nationName, String nationCode, String nationRemark, Set<CotProvice> cotProvices) {
        this.nationShort = nationShort;
        this.nationCn = nationCn;
        this.nationName = nationName;
        this.nationCode = nationCode;
        this.nationRemark = nationRemark;
    }

   
    public String getNationShort() {
        return this.nationShort;
    }
    
    public void setNationShort(String nationShort) {
        this.nationShort = nationShort;
    }
    public String getNationCn() {
        return this.nationCn;
    }
    
    public void setNationCn(String nationCn) {
        this.nationCn = nationCn;
    }
    public String getNationName() {
        return this.nationName;
    }
    
    public void setNationName(String nationName) {
        this.nationName = nationName;
    }
    public String getNationCode() {
        return this.nationCode;
    }
    
    public void setNationCode(String nationCode) {
        this.nationCode = nationCode;
    }
    public String getNationRemark() {
        return this.nationRemark;
    }
    
    public CotArea getAreaId() {
		return areaId;
	}


	public void setAreaId(CotArea areaId) {
		this.areaId = areaId;
	}


	public void setNationRemark(String nationRemark) {
        this.nationRemark = nationRemark;
    }
}