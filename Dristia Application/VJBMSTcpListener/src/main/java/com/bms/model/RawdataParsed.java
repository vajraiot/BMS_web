package com.bms.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="rawdataParsed", schema = "smartbms")
//@Table(name="rawdataParsed")
public class RawdataParsed {

	private static final long serialVersionUID = -1259518737699450692L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "rawdataparsed_id")
	private Long id;
	
	@Column(name="rawdata", columnDefinition="TEXT" , nullable=true)
	private String rawdata;
	
	
	
	@Column(name="count" , nullable=true)
	private Integer count;
	
	@Column(name="imeiNumber" , nullable=true)
	private String imeiNumber;
	

	@Column(name="packetType" , nullable=true)
	private String packetType;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="server_time", nullable = true, insertable = true, updatable = false)
	private Date serverTime;
	
	@PrePersist
	  protected void onInsert() {
		serverTime = new Date();
	  }
}
