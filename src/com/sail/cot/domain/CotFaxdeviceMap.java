package com.sail.cot.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name = "cot_faxdevice_map")
public class CotFaxdeviceMap extends com.sail.cot.domain.IdEntity implements
		java.io.Serializable {


	@Column(name = "FAX_DEVICE", length = 20)
	private String faxDevice;

	@Column(name = "IP_ADDR", length = 20)
	private String ipAddr;

	@Column(name = "SHARE_PATH_SEND", length = 1000)
	private String sharePathSend;

	@Column(name = "SHARE_PATH_RECV", length = 1000)
	private String sharePathRecv;
	
	@Column(name = "SERVER_IP_ADDR", length = 20)
	private String serverIpAddr;
	
	@Column(name = "FAX_NBR", length = 20)
	private String faxNbr;
	
	@Column(name = "used_sp", length = 100)
	private String usedSp;

	public CotFaxdeviceMap() {
	}

	public String getFaxDevice() {
		return this.faxDevice;
	}

	public void setFaxDevice(String faxDevice) {
		this.faxDevice = faxDevice;
	}

	public String getIpAddr() {
		return this.ipAddr;
	}

	public void setIpAddr(String ipAddr) {
		this.ipAddr = ipAddr;
	}

	public String getSharePathSend() {
		return this.sharePathSend;
	}

	public void setSharePathSend(String sharePathSend) {
		this.sharePathSend = sharePathSend;
	}

	public String getSharePathRecv() {
		return this.sharePathRecv;
	}

	public void setSharePathRecv(String sharePathRecv) {
		this.sharePathRecv = sharePathRecv;
	}

	public String getServerIpAddr() {
		return serverIpAddr;
	}

	public void setServerIpAddr(String serverIpAddr) {
		this.serverIpAddr = serverIpAddr;
	}

	public String getFaxNbr() {
		return faxNbr;
	}

	public void setFaxNbr(String faxNbr) {
		this.faxNbr = faxNbr;
	}

	public String getUsedSp() {
		return usedSp;
	}

	public void setUsedSp(String usedSp) {
		this.usedSp = usedSp;
	}
}