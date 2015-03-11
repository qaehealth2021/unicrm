/**
 * 
 */
package com.sail.cot.domain;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * <p>Title: 旗航不锈钢管理系统（QHERP）</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Mar 4, 2011 10:01:17 AM </p>
 * <p>Class Name: ID.java </p>
 * @author achui
 *
 */
@MappedSuperclass
public abstract class IdEntity {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, length = 32)
	//@GenericGenerator(name = "generator", strategy = "com.sail.cot.domain.IDGenerator")
	//@GeneratedValue(generator = "generator")
	//@Column(name = "ID", unique = true, nullable = false, length = 32)

	private Integer id;
	
//	 @Temporal(TemporalType.TIMESTAMP)
//	 @Column(name="add_time", length=19, insertable=false, updatable=false)
//	 private Date addTime;
//	
//	public Date getAddTime() {
//		return addTime;
//	}
//
//	public void setAddTime(Date addTime) {
//		this.addTime = addTime;
//	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
}
