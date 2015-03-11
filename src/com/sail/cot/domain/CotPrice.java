package com.sail.cot.domain;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@SuppressWarnings("serial")
@Entity
@Table(name="FMS_SYSTEMSQUOTE")
public class CotPrice implements java.io.Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "RECID", unique = true, nullable = false, length = 32)
    private String id;//id
	
    @Column(name="CARRIER", length=60, nullable = false)
    private String carrier;//船公司/航空公司
      
   	@Column(name = "POLCODE", length = 60, nullable = false)
    private String polCode;//起运港
    
    @Column(name="PODCODE", length=60, nullable = false)
    private String podCode;//目的港
    
    @Column(name="TWENTYGP", precision = 28, scale = 12, nullable = false)
    private Double twenTygp;//20尺平柜
    
    @Column(name="FORTYGP", precision = 28, scale = 12, nullable = false)
    private Double forTygp;//40尺平柜
    
    @Column(name="FORTYHQ", precision = 28, scale = 12, nullable = false)
    private Double fortyHq;//40尺高柜
    
    @Column(name="ONETS", length=60, nullable = false)
    private String onets;//中转港
    
    @Column(name="TWOTS", length=60, nullable = false)
    private String twots;//中转港
    
    @Column(name="LCL", precision = 28, scale = 12, nullable = false)
    private Double lcl;//拼箱费用
    
    @Column(name="MIN_", precision = 28, scale = 12, nullable = false)
    private Double min;//最低收费
    
    @Column(name="FORTYFIVE", precision = 28, scale = 12, nullable = false)
    private Double fortyFive;//45公斤以上
    
    @Column(name="HUNDRED", precision = 28, scale = 12, nullable = false)
    private Double hundRed;//100公斤以上
    
    @Column(name="THREEHUNDRED", precision = 28, scale = 12, nullable = false)
    private Double threeHundRed;//300公斤以上
    
    @Column(name="FIVEHUNDRED", precision = 28, scale = 12, nullable = false)
    private Double fiveHundRed;//500公斤以上
    
    @Column(name="THOUSAND", precision = 28, scale = 12, nullable = false)
    private Double thouSand;//1000公斤以上
    
    @Column(name="THREETHOUSAND", precision = 28, scale = 12, nullable = false)
    private Double threeThousand;//3000公斤以上
    
    @Column(name="FSC", precision = 28, scale = 12, nullable = false)
    private Double fsc;//燃油附加费
    
    @Column(name="SSC", precision = 28, scale = 12, nullable = false)
    private Double ssc;//战险
    
    @Column(name="THC", precision = 28, scale = 12, nullable = false)
    private Double thc;//码头费用/地面处理费
   
    @Temporal(TemporalType.TIMESTAMP)
   	@Column(name = "VALIDITY", length = 0, nullable = false)
    private Date validity;//报价有效期
    
    @Column(name="REMARKS", length=8000)
    private String remarks;//备注
    
    @Column(name="VENDER", length=20, nullable = false)
    private String vender;//报价供应商
    
    @Column(name="INPUTPEOPLE", length=20, nullable = false)
    private String inputPeople;//报价录入人（后台表存储的是对应的员工编号）
    
    @Temporal(TemporalType.TIMESTAMP)
   	@Column(name = "IPUTDATE", length = 0, nullable = false)
    private Date iputDate;//录入报价的日期
    
    @Column(name="QUOTETYPE", nullable = false)
    private Integer quoteType;//报价类型数字分别代表什么意思需要告知---（0:整柜，1:拼箱，2:空运）
    
    @Column(name="MON", nullable = false)
    private Integer mon;//ETD 开航日期选择
    
    @Column(name="TUE", nullable = false)
    private Integer tue;//ETD 开航日期选择
    
    @Column(name="WED", nullable = false)
    private Integer wed;//ETD 开航日期选择
    
    @Column(name="THU1", nullable = false)
    private Integer thu;//ETD 开航日期选择
    
    @Column(name="FRI1", nullable = false)
    private Integer fri;//ETD 开航日期选择
    
    @Column(name="SAT", nullable = false)
    private Integer sat;//ETD 开航日期选择
    
    @Column(name="SUN", nullable = false)
    private Integer sun;//ETD 开航日期选择
    
    @Column(name="FORTYFIVEHC", precision = 28, scale = 12, nullable = false)
    private Double fortyFiveHc;//45尺柜
    
    @Column(name="FORTYNOR", precision = 28, scale = 12, nullable = false)
    private Double fortyNor;//40冻代平
    
    @Column(name="N", precision = 28, scale = 12, nullable = false)
    private Double nprice;//N级价
    
    @Column(name="THREETS", length=60, nullable = false)
    private String threets;//中转港
    
    @Column(name="CURRENCY", length=3, nullable = false)
    private String currency;//币种
    
    @Column(name="FRE", length=10, nullable = false)
    private String fre;//空运部开航日期
    
    @Column(name="DAYS", length=10, nullable = false)
    private String days;//天数
    
    @Column(name="DESTINATIONCHARGES", length=8000)
    private String destinationCharges;//目的港收费
    
    @Column(name="DESTINATIONAGENT", length=8000)
    private String destinationAgent;//目的港代理
    
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "MODIFIEDDATETIME", length = 0, nullable = false)
    private Date modifiedDateTime;
    
    @Column(name="MODIFIEDBY", length=5, nullable = false)
    private String modifiedBy;
    
    @Temporal(TemporalType.TIMESTAMP)
   	@Column(name = "CREATEDDATETIME", length = 0, nullable = false)
    private Date createdDateTime;
    
    @Column(name="CREATEDBY", length=5, nullable = false)
    private String createdBy;
    
    @Column(name="DATAAREAID", length=4, nullable = false)
    private String dataAreaId;
    
    @Column(name="RECVERSION", nullable = false)
    private Integer recversion;
    
    public CotPrice() {
    }

	public String getCarrier() {
		return carrier;
	}

	public void setCarrier(String carrier) {
		this.carrier = carrier;
	}

	public String getPolCode() {
		return polCode;
	}

	public void setPolCode(String polCode) {
		this.polCode = polCode;
	}

	public String getPodCode() {
		return podCode;
	}

	public void setPodCode(String podCode) {
		this.podCode = podCode;
	}

	public Double getTwenTygp() {
		return twenTygp;
	}

	public void setTwenTygp(Double twenTygp) {
		this.twenTygp = twenTygp;
	}

	public Double getForTygp() {
		return forTygp;
	}

	public void setForTygp(Double forTygp) {
		this.forTygp = forTygp;
	}

	public Double getFortyHq() {
		return fortyHq;
	}

	public void setFortyHq(Double fortyHq) {
		this.fortyHq = fortyHq;
	}

	public String getOnets() {
		return onets;
	}

	public void setOnets(String onets) {
		this.onets = onets;
	}

	public String getTwots() {
		return twots;
	}

	public void setTwots(String twots) {
		this.twots = twots;
	}

	public Double getLcl() {
		return lcl;
	}

	public Double getHundRed() {
		return hundRed;
	}

	public void setHundRed(Double hundRed) {
		this.hundRed = hundRed;
	}

	public Double getThreeHundRed() {
		return threeHundRed;
	}

	public void setThreeHundRed(Double threeHundRed) {
		this.threeHundRed = threeHundRed;
	}

	public Double getFiveHundRed() {
		return fiveHundRed;
	}

	public void setFiveHundRed(Double fiveHundRed) {
		this.fiveHundRed = fiveHundRed;
	}

	public Double getThouSand() {
		return thouSand;
	}

	public void setThouSand(Double thouSand) {
		this.thouSand = thouSand;
	}

	public Double getThreeThousand() {
		return threeThousand;
	}

	public void setThreeThousand(Double threeThousand) {
		this.threeThousand = threeThousand;
	}

	public Double getFsc() {
		return fsc;
	}

	public void setFsc(Double fsc) {
		this.fsc = fsc;
	}

	public Double getSsc() {
		return ssc;
	}

	public void setSsc(Double ssc) {
		this.ssc = ssc;
	}

	public Double getThc() {
		return thc;
	}

	public void setThc(Double thc) {
		this.thc = thc;
	}

	public void setLcl(Double lcl) {
		this.lcl = lcl;
	}

	public Double getMin() {
		return min;
	}

	public void setMin(Double min) {
		this.min = min;
	}

	public Double getFortyFive() {
		return fortyFive;
	}

	public void setFortyFive(Double fortyFive) {
		this.fortyFive = fortyFive;
	}

	public Date getValidity() {
		return validity;
	}

	public void setValidity(Date validity) {
		this.validity = validity;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getVender() {
		return vender;
	}

	public void setVender(String vender) {
		this.vender = vender;
	}

	public String getInputPeople() {
		return inputPeople;
	}

	public void setInputPeople(String inputPeople) {
		this.inputPeople = inputPeople;
	}

	public Date getIputDate() {
		return iputDate;
	}

	public void setIputDate(Date iputDate) {
		this.iputDate = iputDate;
	}

	public Integer getQuoteType() {
		return quoteType;
	}

	public void setQuoteType(Integer quoteType) {
		this.quoteType = quoteType;
	}

	public Integer getMon() {
		return mon;
	}

	public void setMon(Integer mon) {
		this.mon = mon;
	}

	public Integer getTue() {
		return tue;
	}

	public void setTue(Integer tue) {
		this.tue = tue;
	}

	public Integer getWed() {
		return wed;
	}

	public void setWed(Integer wed) {
		this.wed = wed;
	}

	public Integer getThu() {
		return thu;
	}

	public void setThu(Integer thu) {
		this.thu = thu;
	}

	public Integer getFri() {
		return fri;
	}

	public void setFri(Integer fri) {
		this.fri = fri;
	}

	public Integer getSat() {
		return sat;
	}

	public void setSat(Integer sat) {
		this.sat = sat;
	}

	public Integer getSun() {
		return sun;
	}

	public void setSun(Integer sun) {
		this.sun = sun;
	}

	public Double getFortyFiveHc() {
		return fortyFiveHc;
	}

	public void setFortyFiveHc(Double fortyFiveHc) {
		this.fortyFiveHc = fortyFiveHc;
	}

	public Double getFortyNor() {
		return fortyNor;
	}

	public void setFortyNor(Double fortyNor) {
		this.fortyNor = fortyNor;
	}

	public Double getNprice() {
		return nprice;
	}

	public void setNprice(Double nprice) {
		this.nprice = nprice;
	}

	public String getThreets() {
		return threets;
	}

	public void setThreets(String threets) {
		this.threets = threets;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getFre() {
		return fre;
	}

	public void setFre(String fre) {
		this.fre = fre;
	}

	public String getDays() {
		return days;
	}

	public void setDays(String days) {
		this.days = days;
	}

	public String getDestinationCharges() {
		return destinationCharges;
	}

	public void setDestinationCharges(String destinationCharges) {
		this.destinationCharges = destinationCharges;
	}

	public String getDestinationAgent() {
		return destinationAgent;
	}

	public void setDestinationAgent(String destinationAgent) {
		this.destinationAgent = destinationAgent;
	}

	public Date getModifiedDateTime() {
		return modifiedDateTime;
	}

	public void setModifiedDateTime(Date modifiedDateTime) {
		this.modifiedDateTime = modifiedDateTime;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getDataAreaId() {
		return dataAreaId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setDataAreaId(String dataAreaId) {
		this.dataAreaId = dataAreaId;
	}

	public Integer getRecversion() {
		return recversion;
	}

	public void setRecversion(Integer recversion) {
		this.recversion = recversion;
	}


}